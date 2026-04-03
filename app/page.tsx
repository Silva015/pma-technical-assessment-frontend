"use client";

import { useState } from "react";
import { SearchBar } from "@/components/weather/SearchBar";
import { WeatherDisplay } from "@/components/weather/WeatherDisplay";
import { ForecastDisplay } from "@/components/weather/ForecastDisplay";
import { WeatherData, ForecastData } from "@/types/weather";
import { CloudRain, AlertCircle, MapPinOff, CloudOff, RefreshCcw } from "lucide-react";

export default function Home() {
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

        {/* Graceful Error Handling States */}
        {error && (
          <div className="w-full max-w-md mx-auto mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-red-200/50 dark:border-red-900/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-4 ring-1 ring-red-500/20">
                {error.toLowerCase().includes("not found") ? (
                  <MapPinOff className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                ) : error.toLowerCase().includes("location") ? (
                  <CloudOff className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                )}
              </div>
              
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {error.toLowerCase().includes("not found") 
                  ? "City Not Found" 
                  : error.toLowerCase().includes("location")
                  ? "Location Access Denied"
                  : "Oops! Something went wrong"}
              </h3>
              
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-6 px-4">
                {error.toLowerCase().includes("not found")
                  ? "We couldn't find the location you searched for. Please double-check the spelling or try a broader area."
                  : error.toLowerCase().includes("denied") || error.toLowerCase().includes("unable")
                  ? "We couldn't access your current location. Please ensure location services are enabled in your browser settings."
                  : error}
              </p>

              <button 
                onClick={() => setError(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-full transition-colors text-sm"
              >
                <RefreshCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Successful Data Display */}
        {weatherData && !loading && !geolocating && !error && (
          <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch justify-center mt-8">
            <div className="w-full lg:flex-1 h-full">
              <WeatherDisplay data={weatherData.current} />
            </div>
            <div className="w-full lg:flex-1 h-full">
              <ForecastDisplay data={weatherData.forecast} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
