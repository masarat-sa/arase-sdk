# ARASE SDK

المكتبة الرسمية لـ ARASE - محرك البحث الذكي بالذكاء الاصطناعي.

Official JavaScript/TypeScript SDK for ARASE - AI-powered search engine API.

## Installation | التثبيت

```bash
npm install arase
# or
yarn add arase
# or
pnpm add arase
```

## Quick Start | البداية السريعة

### Option 1: Environment Variable (Recommended) | الخيار 1: متغير البيئة (مستحسن)

```bash
# .env file | ملف .env
ARASE_API_KEY=arase_YOUR_API_KEY
```

```typescript
import { AraseClient } from "arase";

// Automatically reads from ARASE_API_KEY environment variable
// يقرأ تلقائياً من متغير البيئة ARASE_API_KEY
const client = new AraseClient();

const results = await client.search("ما هي رؤية السعودية 2030؟");
console.log(results);
```

### Option 2: Direct API Key | الخيار 2: مفتاح API مباشر

```typescript
import { AraseClient } from "arase";

const client = new AraseClient({ apiKey: "arase_YOUR_API_KEY" });

const results = await client.search("What is Saudi Vision 2030?");
console.log(results);
```

## Environment Variables | متغيرات البيئة

| Variable         | Description               | الوصف                      |
| ---------------- | ------------------------- | -------------------------- |
| `ARASE_API_KEY`  | Your API key (required)   | مفتاح API الخاص بك (مطلوب) |
| `ARASE_BASE_URL` | Custom API URL (optional) | رابط API مخصص (اختياري)    |

## Features | الميزات

### Web Search | بحث الويب

```typescript
const results = await client.search("أفضل المطاعم في الرياض", {
  includeAnswer: true, // إجابة AI
  maxResults: 10,
});

console.log(results.answer); // الإجابة
console.log(results.results); // النتائج
```

### Image Search | بحث الصور

```typescript
const images = await client.searchImages("برج المملكة الرياض");
console.log(images.images);
```

### News Search | بحث الأخبار

```typescript
const news = await client.searchNews("أخبار السعودية اليوم");
console.log(news.news);
```

### Places Search | بحث الأماكن

```typescript
const places = await client.searchPlaces("مقاهي قريبة", {
  userLocation: { lat: 24.7136, lng: 46.6753 }, // الرياض
});
console.log(places.places);
```

### Academic Search | بحث أكاديمي

```typescript
const papers = await client.searchScholar("artificial intelligence");
console.log(papers.scholar);
```

### Stock Market Search | بحث سوق الأسهم

```typescript
// Basic stock search | بحخ بسيط
const stocks = await client.search("كم سعر سهم أرامكو؟", {
  includeStocks: true,
});

if (stocks.stocks) {
  stocks.stocks.results.forEach((stock) => {
    console.log(`${stock.name}: ${stock.price} ${stock.currency}`);
    console.log(`Change: ${stock.changePercent}%`);
  });
}

// With AI summary (+1 request) | مع ملخص AI (+1 طلب)
const stocksWithSummary = await client.search("Compare Aramco vs Al Rajhi", {
  includeStocks: true,
  options: {
    stocks: {
      summary: true,
    },
  },
});

console.log(stocksWithSummary.stocks?.summary);
```

### Weather Search | بحث الطقس

```typescript
// Basic weather | طقس بسيط
const weather = await client.search("الطقس في جدة", {
  includeWeather: true,
});

if (weather.weather) {
  const { location, current, forecast } = weather.weather;
  console.log(`${location.name}: ${current.tempC}°C, ${current.condition}`);

  // Forecast | التوقعات
  forecast.forEach((day) => {
    console.log(`${day.date}: ${day.mintempC}°C - ${day.maxtempC}°C`);
  });
}

// With AI summary and advice (+1 request) | مع ملخص ونصائح AI
const weatherWithSummary = await client.search("Weather in Riyadh", {
  includeWeather: true,
  options: {
    weather: {
      summary: true,
    },
  },
});

console.log(weatherWithSummary.weather?.summary);
console.log(weatherWithSummary.weather?.advice);
```

### Content Extraction | استخراج المحتوى

```typescript
const content = await client.extract("https://example.com/article", {
  includeSummary: true,
});
console.log(content.content);
console.log(content.summary);
```

## Advanced Options | خيارات متقدمة

```typescript
const results = await client.search("query", {
  searchDepth: "deep", // basic | advanced | deep
  maxResults: 20,
  includeAnswer: true,
  includeImages: true,
  includeVideos: true,
  includeNews: true,
  includePlaces: true,
  includeShopping: true,
  includeScholar: true,
  includeStocks: true, // 🆕 Stock market data
  includeWeather: true, // 🆕 Weather forecasts
  topic: "general", // general | news | academic
  maxSteps: 3, // للبحث العميق

  // Optional AI summaries | ملخصات AI اختيارية
  options: {
    stocks: {
      summary: true, // +1 request | +1 طلب
    },
    weather: {
      summary: true, // +1 request | +1 طلب
    },
  },
});
```

## Error Handling | معالجة الأخطاء

```typescript
import { AraseClient, AraseAPIError } from "arase";

try {
  const results = await client.search("query");
} catch (error) {
  if (error instanceof AraseAPIError) {
    console.error(`Error ${error.code}: ${error.message}`);
    console.error(`Status: ${error.status}`);
  }
}
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  SearchOptions,
  SearchResponse,
  SearchResult,
  ImageResult,
  StockResult, // 🆕 New: Stock data types
  StocksResponse, // 🆕 New: Stock response
  WeatherForecast, // 🆕 New: Weather forecast
  WeatherResponse, // 🆕 New: Weather response
  // ... etc
} from "arase";
```

## Links | روابط

- 📖 [Documentation | التوثيق](https://arase.masarat.sa/docs)
- 🎮 [Playground | ساحة التجربة](https://arase.masarat.sa/platform)
- 🔑 [Get API Key | احصل على مفتاح](https://arase.masarat.sa/platform)

## License

MIT
