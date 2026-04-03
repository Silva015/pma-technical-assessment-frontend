import { useState } from "react";
import { WeatherData, ForecastData } from "@/types/weather";

export function useWeather() {
  const [weatherData, setWeatherData] = useState<{ current: WeatherData; forecast: ForecastData } | null>(null);
  const [loading, setLoading] = useState(false);
  const [geolocating, setGeolocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (url: string) => {
    try {
      setError(null);
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeatherData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setWeatherData(null);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    await fetchWeather(`/api/weather?q=${encodeURIComponent(query)}`);
    setLoading(false);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeather(`/api/weather?lat=${latitude}&lon=${longitude}`);
        setGeolocating(false);
      },
      (geoError) => {
        setGeolocating(false);
        setError("Unable to retrieve your location. " + geoError.message);
      }
    );
  };

  const clearError = () => setError(null);

  return {
    weatherData,
    loading,
    geolocating,
    error,
    handleSearch,
    handleGeolocation,
    clearError,
  };
}
