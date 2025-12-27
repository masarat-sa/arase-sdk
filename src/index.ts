/**
 * ARASE SDK - Official JavaScript/TypeScript SDK
 * حزمة اريز - مكتبة JavaScript/TypeScript الرسمية
 *
 * The official SDK for integrating ARASE Search API into your applications.
 * الحزمة الرسمية لدمج واجهة برمجة تطبيقات اريز للبحث في تطبيقاتك.
 *
 * @packageDocumentation
 * @see https://arase.masarat.sa/docs
 *
 * @example
 * ```typescript
 * // Import the client | استيراد العميل
 * import { AraseClient } from "arase";
 *
 * // Create a client instance | إنشاء نسخة من العميل
 * const client = new AraseClient({ apiKey: "arase_YOUR_API_KEY" });
 *
 * // Search the web | البحث في الويب
 * const results = await client.search("What is Saudi Vision 2030?");
 * // أو بالعربية
 * const results = await client.search("ما هي رؤية السعودية 2030؟");
 *
 * console.log(results.answer);  // AI-generated answer | الإجابة المولدة بالذكاء الاصطناعي
 * console.log(results.results); // Web results | نتائج الويب
 * ```
 */

// Main client class | الفئة الرئيسية للعميل
export { AraseClient, AraseAPIError } from "./client";

// Type definitions | تعريفات الأنواع
export type {
  // Client options | خيارات العميل
  AraseClientOptions,

  // Search options and response | خيارات واستجابة البحث
  SearchOptions,
  SearchResponse,

  // Result types | أنواع النتائج
  SearchResult,
  ImageResult,
  VideoResult,
  NewsResult,
  PlaceResult,
  ShoppingResult,
  ScholarResult,
  StockResult,
  StocksResponse,
  WeatherForecast,
  WeatherResponse,

  // Extract options and response | خيارات واستجابة الاستخراج
  ExtractOptions,
  ExtractResponse,

  // Error type | نوع الخطأ
  AraseError,
} from "./types";
