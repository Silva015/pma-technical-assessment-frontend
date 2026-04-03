"use client";

import { WeatherData } from "../../types/weather";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Gauge
} from "lucide-react";

interface WeatherDisplayProps {
  data: WeatherData;
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  const { name, weather, main, wind, visibility, sys } = data;
  const condition = weather[0];

  const getWeatherIcon = (id: number) => {
    if (id >= 200 && id < 300) return <CloudLightning className="w-24 h-24 text-yellow-500" />;
    if (id >= 300 && id < 500) return <CloudDrizzle className="w-24 h-24 text-blue-400" />;
    if (id >= 500 && id < 600) return <CloudRain className="w-24 h-24 text-blue-500" />;
    if (id >= 600 && id < 700) return <CloudSnow className="w-24 h-24 text-blue-200" />;
    if (id >= 700 && id < 800) return <Cloud className="w-24 h-24 text-gray-400" />;
    if (id === 800) return <Sun className="w-24 h-24 text-yellow-400" />;
    if (id > 800) return <Cloud className="w-24 h-24 text-gray-300" />;
    return <Sun className="w-24 h-24 text-yellow-500" />;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "from-blue-600 to-blue-300";
    if (temp < 15) return "from-blue-400 to-teal-300";
    if (temp < 25) return "from-green-400 to-yellow-300";
    if (temp < 32) return "from-yellow-400 to-orange-400";
    return "from-orange-500 to-red-500";
  };

  const gradientClass = getTemperatureColor(main.temp);

  return (
    <div className="w-full max-w-xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500`}></div>
      <div className="relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">
              {name}{sys.country ? `, ${sys.country}` : ''}
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 capitalize mt-1 font-medium">
              {condition.description}
            </p>
          </div>
          <div className="flex items-center justify-center p-4 bg-white/40 dark:bg-black/20 rounded-full shadow-inner">
            {getWeatherIcon(condition.id)}
          </div>
        </div>

        {/* Main Temp */}
        <div className="flex justify-center sm:justify-start items-baseline mb-10">
          <span className="text-7xl sm:text-8xl font-black text-zinc-800 dark:text-zinc-100 tracking-tighter">
            {Math.round(main.temp)}°
          </span>
          <span className="text-2xl text-zinc-500 dark:text-zinc-400 ml-2 font-medium">C</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/10 dark:border-white/5 hover:bg-white/80 dark:hover:bg-black/50 transition-colors">
            <Thermometer className="w-6 h-6 text-orange-500 mb-2" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Feels Like</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{Math.round(main.feels_like)}°</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/10 dark:border-white/5 hover:bg-white/80 dark:hover:bg-black/50 transition-colors">
            <Wind className="w-6 h-6 text-teal-500 mb-2" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Wind</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{Math.round(wind.speed * 3.6)} km/h</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/10 dark:border-white/5 hover:bg-white/80 dark:hover:bg-black/50 transition-colors">
            <Droplets className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Humidity</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/10 dark:border-white/5 hover:bg-white/80 dark:hover:bg-black/50 transition-colors">
            <Gauge className="w-6 h-6 text-purple-500 mb-2" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Pressure</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
