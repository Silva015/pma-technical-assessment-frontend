"use client";

import { useState } from "react";
import { SearchBar } from "../components/weather/SearchBar";
import { WeatherDisplay } from "../components/weather/WeatherDisplay";
import { WeatherData } from "../types/weather";
import { CloudRain, AlertCircle } from "lucide-react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
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
    } catch (err: any) {
      setError(err.message);
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

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-blue-500/30">
      
      {/* Background Ornaments */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <main className="relative flex-1 flex flex-col items-center p-6 sm:p-12 md:p-24 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl mb-6 ring-1 ring-black/5 dark:ring-white/10">
            <CloudRain className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Weather<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">App</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Real-time weather conditions, dynamically presented based on your location or search.
          </p>
        </div>

        <div className="w-full z-10">
          <SearchBar 
            onSearch={handleSearch} 
            onGeolocation={handleGeolocation} 
            loading={loading}
            geolocating={geolocating}
          />
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {weatherData && !loading && !geolocating && (
          <WeatherDisplay data={weatherData} />
        )}
      </main>
    </div>
  );
}
