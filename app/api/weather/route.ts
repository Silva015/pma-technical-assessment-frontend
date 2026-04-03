import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  // Helper function to fetch both current weather and 5-day forecast
  const fetchCombinedData = async (queryParams: string) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${queryParams}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${queryParams}&appid=${apiKey}&units=metric`;

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    if (!weatherRes.ok) throw new Error("Location not found");
    // Forecast failing is rare if weather succeeds, but we handle it just in case:
    if (!forecastRes.ok) throw new Error("Forecast not available for this location");

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    return {
      current: weatherData,
      forecast: forecastData
    };
  };

  // 1. Direct coordinate search (Geolocation)
  if (lat && lon) {
    try {
      const data = await fetchCombinedData(`lat=${lat}&lon=${lon}`);
      return NextResponse.json(data);
    } catch (error: any) {
      console.error("Error fetching weather by coords:", error);
      return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
  }

  // 2. Query search
  if (q) {
    try {
      // Try OpenWeatherMap direct geographic search first
      try {
        const data = await fetchCombinedData(`q=${encodeURIComponent(q)}`);
        return NextResponse.json(data);
      } catch (directError) {
        // Continue to fallback if direct fetch fails
      }

      // If OWM fails (e.g., zip code, landmark), fallback to Nominatim
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`, {
          headers: { "User-Agent": "PMA-Weather-App/1.0" }
        });
        const geoData = await geoRes.json();
        
        if (geoData && geoData.length > 0) {
          const geoLat = geoData[0].lat;
          const geoLon = geoData[0].lon;
          const geoName = geoData[0].name || q; // Fallback name
          
          const fallbackData = await fetchCombinedData(`lat=${geoLat}&lon=${geoLon}`);
          
          // OpenWeatherMap might return an empty name/country for coordinates, inject Nominatim info
          if (!fallbackData.current.name) {
            fallbackData.current.name = geoName;
          }
          if (!fallbackData.current.sys.country) {
            fallbackData.current.sys.country = ""; 
          }
          
          return NextResponse.json(fallbackData);
        }
      } catch (e) {
        console.warn("Geocoding failed, falling back to 404", e);
      }

      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    } catch (error: any) {
      console.error("Error fetching weather by query:", error);
      return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json(
    { error: "Must provide either 'q' or 'lat' and 'lon'" },
    { status: 400 }
  );
}
