"use client";

import { useWeather } from "@/hooks/useWeather";
import { SearchBar } from "@/components/weather/SearchBar";
import { WeatherDisplay } from "@/components/weather/WeatherDisplay";
import { ForecastDisplay } from "@/components/weather/ForecastDisplay";
import { AlertCircle, MapPinOff, CloudOff, RefreshCcw } from "lucide-react";

export function WeatherDashboard() {
  const {
    weatherData,
    loading,
    geolocating,
    error,
    handleSearch,
    handleGeolocation,
    clearError,
  } = useWeather();

  return (
    <>
      <div className="w-full z-10">
        <SearchBar 
          onSearch={handleSearch} 
          onGeolocation={handleGeolocation} 
          loading={loading}
          geolocating={geolocating}
        />
      </div>

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
              onClick={clearError}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-full transition-colors text-sm"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      )}

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
    </>
  );
}
