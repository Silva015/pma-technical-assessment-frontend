# PMA Technical Assessment - Weather App 🌦️

A premium, modern weather application built with Next.js (App Router), React, and Tailwind CSS. This application dynamically displays real-time weather conditions and a robust 5-day forecast based on your location or search query.

## 🌟 Features

- **Real-Time Weather Data**: Get the latest current weather conditions, including temperature, humidity, visibility, pressure, and wind speed.
- **5-Day Forecast**: View a dynamically generated grouping of weather over the next 5 days. Forecasts strictly respect the target city's actual timezones rather than the user's browser context.
- **Interactive Search & Geolocation**: Seamlessly search by querying freely (e.g. city names, zip codes) or automatically use your browser's geolocation to grab immediate local weather context.
- **Graceful Error Handling**: Elegant visual fallbacks implemented for location access denial, unknown search combinations, and network failures.
- **API Proxy Routing & Caching**: External API requests run through secured Next.js API Routes (`app/api/weather/route.ts`). Responses are strictly optimized with `Cache-Control` (`stale-while-revalidate`), dramatically reducing OpenWeatherMap API limit-strikes.

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (Version 18+) installed along with a package manager like `yarn` or `npm`.

### 2. Install Project Dependencies

*(Note: Node.js applications specify their requirements natively in the `package.json` config. You do not need a custom pip `requirements.txt` file).*

To install everything automatically, run:

```bash
yarn install
# or
npm install
```

### 3. Setup Environment Configuration

In order to fetch weather data without exposing credentials to the client, you must provide your OpenWeatherMap API Key in the server scope.

Create a `.env.local` file at the root of the project and add your API key:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run the Development Server

Start the interactive development server:

```bash
yarn dev
# or 
npm run dev
```

The application will be immediately running on **[http://localhost:3000](http://localhost:3000)**! 

---

## 📦 Requirements & Tech Stack Overview

*(Detailed list of libraries configured in `package.json` that will be installed on `yarn install`)*

**Framework & Core:**
- [`next`](https://nextjs.org/) (v16.2.2) - The underlying React meta-framework.
- [`react`](https://react.dev/) & [`react-dom`](https://react.dev/) (v19.2.4) - The core UI libraries.

**Styling & UI Toolkit:**
- [`tailwindcss`](https://tailwindcss.com/) (v4) - Atomic, utility-first CSS framework.
- [`lucide-react`](https://lucide.dev/) - Beautiful, consistent icon pack.
- [`clsx`](https://github.com/lukeed/clsx) & [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) - Dynamic style combinations.
- [`radix-ui`](https://www.radix-ui.com/) & `shadcn` - Headless primitives for stable accessible component foundations.

**Linting & TypeScript:**
- `typescript` (v5) - Statically typed configuration.
- `eslint` - Javascript alignment standards.
