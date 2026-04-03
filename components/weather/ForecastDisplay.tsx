import { ForecastData, ForecastItem } from "@/types/weather";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun 
} from "lucide-react";

interface ForecastDisplayProps {
  data: ForecastData;
}

export function ForecastDisplay({ data }: ForecastDisplayProps) {
  // Group forecast by day
  const dailyForecasts: Record<string, ForecastItem[]> = {};

  if (!data || !data.list) return null;

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    // Use local string to ensure consistent grouping
    const dateKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = [];
    }
    dailyForecasts[dateKey].push(item);
  });

  // Extract the next 5 unique days
  const upcomingDays = Object.entries(dailyForecasts)
    .slice(0, 5)
    .map(([dateKey, items]) => {
      // Find min and max temp for the day
      const temps = items.map(item => item.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      // Find the most prominent weather condition (e.g. by picking the condition at 12:00 PM if available, or just the first item)
      const midDayItem = items.find(i => {
        const h = new Date(i.dt * 1000).getHours();
        return h >= 11 && h <= 15;
      }) || items[Math.floor(items.length / 2)];

      return {
        dateKey,
        minTemp,
        maxTemp,
        weather: midDayItem.weather[0]
      };
    });

  const getWeatherIcon = (id: number, className: string) => {
    if (id >= 200 && id < 300) return <CloudLightning className={className} />;
    if (id >= 300 && id < 500) return <CloudDrizzle className={className} />;
    if (id >= 500 && id < 600) return <CloudRain className={className} />;
    if (id >= 600 && id < 700) return <CloudSnow className={className} />;
    if (id >= 700 && id < 800) return <Cloud className={className} />;
    if (id === 800) return <Sun className={className} />;
    if (id > 800) return <Cloud className={className} />;
    return <Sun className={className} />;
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
      <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-xl">
        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2">
          5-Day Forecast
        </h3>
        
        <div className="flex flex-col gap-4">
          {upcomingDays.map((day, idx) => (
             <div 
               key={idx} 
               className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/10 dark:border-white/5 hover:bg-white/80 dark:hover:bg-black/50 transition-colors"
             >
               <div className="w-28 text-left">
                 <span className="font-medium text-zinc-700 dark:text-zinc-300">
                   {idx === 0 ? "Today" : day.dateKey.split(',')[0]}
                 </span>
               </div>
               
               <div className="flex items-center justify-center flex-1 gap-3">
                 {getWeatherIcon(day.weather.id, "w-6 h-6 text-blue-500")}
                 <span className="text-sm font-medium text-zinc-500 capitalize hidden sm:block w-24 truncate text-left">
                   {day.weather.description}
                 </span>
               </div>
               
               <div className="flex items-center justify-end gap-3 w-32">
                 <span className="font-bold text-zinc-800 dark:text-zinc-200 text-right w-8">{day.maxTemp}°</span>
                 <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-orange-400 opacity-70"></div>
                 <span className="font-medium text-zinc-500 dark:text-zinc-400 text-right w-8">{day.minTemp}°</span>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
