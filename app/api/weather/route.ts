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

  // 1. Direct coordinate search (Geolocation)
  if (lat && lon) {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) {
        return NextResponse.json({ error: data.message || "Failed to fetch weather data" }, { status: response.status });
      }
      return NextResponse.json(data);
    } catch (error) {
      console.error("Error fetching weather by coords:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  // 2. Query search
  if (q) {
    try {
      // Try OpenWeatherMap direct geographic search first
      const directUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${apiKey}&units=metric`;
      const directRes = await fetch(directUrl);
      
      if (directRes.ok) {
        const data = await directRes.json();
        return NextResponse.json(data);
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
          
          const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLon}&appid=${apiKey}&units=metric`;
          const fallbackRes = await fetch(fallbackUrl);
          const fallbackData = await fallbackRes.json();
          
          if (fallbackRes.ok) {
            // OpenWeatherMap might return an empty name/country for coordinates, inject Nominatim info
            if (!fallbackData.name) {
              fallbackData.name = geoName;
            }
            if (!fallbackData.sys.country) {
              fallbackData.sys.country = ""; 
            }
            return NextResponse.json(fallbackData);
          }
        }
      } catch (e) {
        console.warn("Geocoding failed, falling back to 404", e);
      }

      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    } catch (error) {
      console.error("Error fetching weather by query:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json(
    { error: "Must provide either 'q' or 'lat' and 'lon'" },
    { status: 400 }
  );
}
