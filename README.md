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

| Variable | Description | الوصف |
|----------|-------------|-------|
| `ARASE_API_KEY` | Your API key (required) | مفتاح API الخاص بك (مطلوب) |
| `ARASE_BASE_URL` | Custom API URL (optional) | رابط API مخصص (اختياري) |

## Features | الميزات

### Web Search | بحث الويب

```typescript
const results = await client.search("أفضل المطاعم في الرياض", {
  includeAnswer: true,  // إجابة AI
  maxResults: 10,
});

console.log(results.answer);  // الإجابة
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
  searchDepth: "deep",       // basic | advanced | deep
  maxResults: 20,
  includeAnswer: true,
  includeImages: true,
  includeVideos: true,
  includeNews: true,
  includePlaces: true,
  includeShopping: true,
  includeScholar: true,
  topic: "general",          // general | news | academic
  maxSteps: 3,               // للبحث العميق
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
  // ... etc
} from "arase";
```

## Links | روابط

- 📖 [Documentation | التوثيق](https://arase.masarat.sa/docs)
- 🎮 [Playground | ساحة التجربة](https://arase.masarat.sa/platform)
- 🔑 [Get API Key | احصل على مفتاح](https://arase.masarat.sa/platform)

## License

MIT
