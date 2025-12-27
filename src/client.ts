/**
 * ARASE Client
 * العميل الرئيسي لـ ARASE API
 *
 * The main client for interacting with ARASE Search API.
 * العميل الرئيسي للتفاعل مع واجهة برمجة تطبيقات اريز للبحث.
 *
 * @module AraseClient
 * @see https://arase.masarat.sa/docs
 */

import type {
  AraseClientOptions,
  SearchOptions,
  SearchResponse,
  ExtractOptions,
  ExtractResponse,
  AraseError,
} from "./types";

const DEFAULT_BASE_URL = "https://arase.masarat.sa/v1";
const DEFAULT_TIMEOUT = 30000;

/**
 * Get environment variable (works in Node.js and edge runtimes).
 * الحصول على متغير البيئة (يعمل في Node.js و edge runtimes).
 *
 * @internal
 */
function getEnvVar(name: string): string | undefined {
  // Node.js environment | بيئة Node.js
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  return undefined;
}

export class AraseClient {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  /**
   * Create a new ARASE client instance.
   * إنشاء نسخة جديدة من عميل اريز.
   *
   * @param options - Client configuration options | خيارات تكوين العميل
   * @throws {Error} When API key is not provided and not found in environment | عندما لا يتم توفير مفتاح API ولا يوجد في البيئة
   *
   * @example
   * ```typescript
   * // Option 1: Pass API key directly | الخيار 1: تمرير مفتاح API مباشرة
   * const client = new AraseClient({ apiKey: "arase_YOUR_API_KEY" });
   *
   * // Option 2: Use environment variable (recommended) | الخيار 2: استخدام متغير البيئة (مستحسن)
   * // Set ARASE_API_KEY in your .env file | قم بتعيين ARASE_API_KEY في ملف .env
   * const client = new AraseClient();
   * ```
   */
  constructor(options: AraseClientOptions = {}) {
    // Try to get API key from options or environment variable
    // محاولة الحصول على مفتاح API من الخيارات أو متغير البيئة
    const apiKey = options.apiKey || getEnvVar("ARASE_API_KEY");

    if (!apiKey) {
      throw new Error(
        "API key is required. Pass it as an option or set ARASE_API_KEY environment variable.\n" +
          "مفتاح API مطلوب. قم بتمريره كخيار أو قم بتعيين متغير البيئة ARASE_API_KEY."
      );
    }

    // Warning: Using API key in browser exposes it to users
    // تحذير: استخدام مفتاح API في المتصفح يعرضه للمستخدمين
    if (typeof window !== "undefined" && !options.dangerouslyAllowBrowser) {
      console.warn(
        "[ARASE] Warning: Using API key in browser exposes it to users. " +
          "Use server-side requests instead, or set { dangerouslyAllowBrowser: true } to suppress this warning.\n" +
          "[اريز] تحذير: استخدام مفتاح API في المتصفح يعرضه للمستخدمين. " +
          "استخدم طلبات الخادم بدلاً من ذلك، أو قم بتعيين { dangerouslyAllowBrowser: true } لإخفاء هذا التحذير."
      );
    }

    this.apiKey = apiKey;
    this.baseUrl =
      options.baseUrl || getEnvVar("ARASE_BASE_URL") || DEFAULT_BASE_URL;
    this.timeout = options.timeout || DEFAULT_TIMEOUT;
  }

  /**
   * Internal HTTP request method.
   * طريقة طلب HTTP الداخلية.
   *
   * @internal
   */
  private async request<T>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = (await response.json().catch(() => ({}))) as AraseError;
        throw new AraseAPIError(
          error.message || `HTTP ${response.status}`,
          error.code || "UNKNOWN_ERROR",
          response.status
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof AraseAPIError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new AraseAPIError(
          "Request timeout | انتهت مهلة الطلب",
          "TIMEOUT",
          408
        );
      }

      throw new AraseAPIError(
        error instanceof Error
          ? error.message
          : "Unknown error | خطأ غير معروف",
        "NETWORK_ERROR",
        0
      );
    }
  }

  /**
   * Search the web using ARASE AI.
   * البحث في الويب باستخدام اريز AI.
   *
   * @param query - The search query | استعلام البحث
   * @param options - Search options | خيارات البحث
   * @returns Search results | نتائج البحث
   *
   * @example
   * ```typescript
   * // Simple search | بحث بسيط
   * const results = await client.search("What is Saudi Vision 2030?");
   * const results = await client.search("ما هي رؤية السعودية 2030؟");
   *
   * // Advanced search with options | بحث متقدم مع خيارات
   * const results = await client.search("Best restaurants in Riyadh", {
   *   includeAnswer: true,   // Include AI answer | تضمين إجابة AI
   *   includePlaces: true,   // Include places | تضمين الأماكن
   *   maxResults: 10         // Max results | عدد النتائج القصوى
   * });
   * ```
   */
  async search(
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResponse> {
    return this.request<SearchResponse>("/search", {
      query,
      search_depth: options.searchDepth,
      max_results: options.maxResults,
      include_answer: options.includeAnswer,
      include_raw_content: options.includeRawContent,
      include_images: options.includeImages,
      include_videos: options.includeVideos,
      include_news: options.includeNews,
      include_maps: options.includeMaps,
      include_places: options.includePlaces,
      include_shopping: options.includeShopping,
      include_scholar: options.includeScholar,
      include_stocks: options.includeStocks,
      include_weather: options.includeWeather,
      topic: options.topic,
      max_steps: options.maxSteps,
      user_location: options.userLocation,
      options: options.options,
    });
  }

  /**
   * Extract content from a webpage.
   * استخراج محتوى من صفحة ويب.
   *
   * @param url - The URL to extract content from | رابط الصفحة لاستخراج المحتوى منها
   * @param options - Extract options | خيارات الاستخراج
   * @returns Extracted content | المحتوى المستخرج
   *
   * @example
   * ```typescript
   * // Simple extraction | استخراج بسيط
   * const content = await client.extract("https://example.com/article");
   *
   * // Extraction with summary | استخراج مع تلخيص
   * const content = await client.extract("https://example.com/article", {
   *   includeSummary: true  // Include AI summary | تضمين تلخيص AI
   * });
   * ```
   */
  async extract(
    url: string,
    options: ExtractOptions = {}
  ): Promise<ExtractResponse> {
    return this.request<ExtractResponse>("/search", {
      mode: "extract",
      url,
      include_summary: options.includeSummary,
    });
  }

  /**
   * Search for images.
   * البحث عن الصور.
   *
   * @param query - The search query | استعلام البحث
   * @param maxResults - Maximum number of results (default: 10) | عدد النتائج القصوى (افتراضي: 10)
   * @returns Search results with images | نتائج البحث مع الصور
   */
  async searchImages(query: string, maxResults = 10): Promise<SearchResponse> {
    return this.search(query, {
      includeImages: true,
      maxResults,
    });
  }

  /**
   * Search for videos.
   * البحث عن الفيديوهات.
   *
   * @param query - The search query | استعلام البحث
   * @param maxResults - Maximum number of results (default: 10) | عدد النتائج القصوى (افتراضي: 10)
   * @returns Search results with videos | نتائج البحث مع الفيديوهات
   */
  async searchVideos(query: string, maxResults = 10): Promise<SearchResponse> {
    return this.search(query, {
      includeVideos: true,
      maxResults,
    });
  }

  /**
   * Search for news articles.
   * البحث عن المقالات الإخبارية.
   *
   * @param query - The search query | استعلام البحث
   * @param maxResults - Maximum number of results (default: 10) | عدد النتائج القصوى (افتراضي: 10)
   * @returns Search results with news | نتائج البحث مع الأخبار
   */
  async searchNews(query: string, maxResults = 10): Promise<SearchResponse> {
    return this.search(query, {
      includeNews: true,
      maxResults,
    });
  }

  /**
   * Search for places and locations.
   * البحث عن الأماكن والمواقع.
   *
   * @param query - The search query | استعلام البحث
   * @param options - Additional options | خيارات إضافية
   * @param options.maxResults - Maximum number of results | عدد النتائج القصوى
   * @param options.userLocation - User's location for nearby search | موقع المستخدم للبحث القريب
   * @returns Search results with places | نتائج البحث مع الأماكن
   *
   * @example
   * ```typescript
   * // Search places near Riyadh | البحث عن أماكن قريبة من الرياض
   * const places = await client.searchPlaces("restaurants", {
   *   userLocation: { lat: 24.7136, lng: 46.6753 }
   * });
   * ```
   */
  async searchPlaces(
    query: string,
    options: {
      maxResults?: number;
      userLocation?: { lat: number; lng: number };
    } = {}
  ): Promise<SearchResponse> {
    return this.search(query, {
      includePlaces: true,
      maxResults: options.maxResults || 10,
      userLocation: options.userLocation,
    });
  }

  /**
   * Search for academic papers and research.
   * البحث عن الأوراق الأكاديمية والأبحاث.
   *
   * @param query - The search query | استعلام البحث
   * @param maxResults - Maximum number of results (default: 10) | عدد النتائج القصوى (افتراضي: 10)
   * @returns Search results with academic papers | نتائج البحث مع الأوراق الأكاديمية
   *
   * @example
   * ```typescript
   * // Search for AI research | البحث عن أبحاث الذكاء الاصطناعي
   * const papers = await client.searchScholar("artificial intelligence");
   * ```
   */
  async searchScholar(query: string, maxResults = 10): Promise<SearchResponse> {
    return this.search(query, {
      includeScholar: true,
      topic: "academic",
      maxResults,
    });
  }
}

/**
 * ARASE API Error class.
 * فئة خطأ واجهة برمجة تطبيقات اريز.
 *
 * Thrown when an API request fails.
 * يتم طرحها عند فشل طلب API.
 *
 * @example
 * ```typescript
 * try {
 *   const results = await client.search("query");
 * } catch (error) {
 *   if (error instanceof AraseAPIError) {
 *     console.error(`Error ${error.code}: ${error.message}`);
 *     // Handle specific error codes | التعامل مع رموز خطأ محددة
 *     if (error.code === "RATE_LIMITED") {
 *       // Wait and retry | انتظر وأعد المحاولة
 *     }
 *   }
 * }
 * ```
 */
export class AraseAPIError extends Error {
  /** Error code | رمز الخطأ */
  code: string;
  /** HTTP status code | رمز حالة HTTP */
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "AraseAPIError";
    this.code = code;
    this.status = status;
  }
}
