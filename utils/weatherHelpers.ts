import { ForecastData, ForecastItem } from "@/types/weather";

export interface DailyForecast {
  dateKey: string;
  minTemp: number;
  maxTemp: number;
  weather: ForecastItem["weather"][0];
}

export function groupForecastByDay(data: ForecastData): DailyForecast[] {
  if (!data || !data.list) return [];

  const dailyForecasts: Record<string, ForecastItem[]> = {};

  data.list.forEach((item) => {
    // data.city.timezone is shift in seconds from UTC. 
    // item.dt is UNIX timestamp in UTC.
    // So (item.dt + data.city.timezone) * 1000 represents the shifted local time in UTC milliseconds.
    const date = new Date((item.dt + data.city.timezone) * 1000);
    
    const dateKey = date.toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric",
      timeZone: "UTC" // Force reading the shifted time as if it were UTC
    });

    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = [];
    }
    dailyForecasts[dateKey].push(item);
  });

  return Object.entries(dailyForecasts)
    .slice(0, 5)
    .map(([dateKey, items]) => {
      const temps = items.map((item) => item.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      // Find the most prominent weather condition
      const midDayItem = items.find((i) => {
        // Find hour in the target city's timezone
        const date = new Date((i.dt + data.city.timezone) * 1000);
        const h = date.getUTCHours();
        return h >= 11 && h <= 15;
      }) || items[Math.floor(items.length / 2)];

      return {
        dateKey,
        minTemp,
        maxTemp,
        weather: midDayItem.weather[0],
      };
    });
}
