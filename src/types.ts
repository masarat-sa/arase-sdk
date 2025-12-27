/**
 * ARASE SDK Types
 * أنواع البيانات لـ ARASE SDK
 *
 * Type definitions for the ARASE Search API SDK.
 * تعريفات الأنواع لحزمة SDK الخاصة بواجهة برمجة تطبيقات اريز للبحث.
 *
 * @module types
 */

// ================================================
// Client Options | خيارات العميل
// ================================================

/**
 * Configuration options for creating an ARASE client.
 * خيارات التكوين لإنشاء عميل اريز.
 */
export interface AraseClientOptions {
  /**
   * Your ARASE API key. If not provided, will read from ARASE_API_KEY env variable.
   * مفتاح API الخاص بك من اريز. إذا لم يتم توفيره، سيقرأ من متغير البيئة ARASE_API_KEY.
   * @example "arase_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   */
  apiKey?: string;

  /**
   * Custom API base URL (optional - for development).
   * عنوان API مخصص (اختياري - للتطوير).
   * @default "https://arase.masarat.sa/v1"
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds.
   * مهلة الطلب بالميلي ثانية.
   * @default 30000
   */
  timeout?: number;

  /**
   * Allow using API key in browser (not recommended).
   * السماح باستخدام مفتاح API في المتصفح (غير مستحسن).
   * @warning This exposes your API key to end users!
   * @warning هذا يعرض مفتاح API الخاص بك للمستخدمين!
   */
  dangerouslyAllowBrowser?: boolean;
}

// ================================================
// Search Options | خيارات البحث
// ================================================

/**
 * Options for customizing search requests.
 * خيارات لتخصيص طلبات البحث.
 */
export interface SearchOptions {
  /**
   * Search depth level.
   * مستوى عمق البحث.
   * - "basic": Fast search | بحث سريع
   * - "advanced": More comprehensive | أكثر شمولاً
   * - "deep": Multi-step research | بحث متعدد الخطوات
   */
  searchDepth?: "basic" | "advanced" | "deep";

  /**
   * Maximum number of results (1-20).
   * الحد الأقصى لعدد النتائج (1-20).
   * @default 10
   */
  maxResults?: number;

  /**
   * Include AI-generated answer.
   * تضمين إجابة مولدة بالذكاء الاصطناعي.
   */
  includeAnswer?: boolean;

  /**
   * Include raw HTML content of pages.
   * تضمين المحتوى الخام HTML للصفحات.
   */
  includeRawContent?: boolean;

  /**
   * Include image results.
   * تضمين نتائج الصور.
   */
  includeImages?: boolean;

  /**
   * Include video results.
   * تضمين نتائج الفيديوهات.
   */
  includeVideos?: boolean;

  /**
   * Include news articles.
   * تضمين المقالات الإخبارية.
   */
  includeNews?: boolean;

  /**
   * Include map results.
   * تضمين نتائج الخرائط.
   */
  includeMaps?: boolean;

  /**
   * Include place/location results.
   * تضمين نتائج الأماكن/المواقع.
   */
  includePlaces?: boolean;

  /**
   * Include shopping/product results.
   * تضمين نتائج التسوق/المنتجات.
   */
  includeShopping?: boolean;

  /**
   * Include academic/scholarly results.
   * تضمين النتائج الأكاديمية/العلمية.
   */
  includeScholar?: boolean;

  /**
   * Include stock market results.
   * تضمين نتائج سوق الأسهم.
   */
  includeStocks?: boolean;

  /**
   * Include weather forecast results.
   * تضمين نتائج توقعات الطقس.
   */
  includeWeather?: boolean;

  /**
   * Search topic category.
   * فئة موضوع البحث.
   */
  topic?: "general" | "news" | "academic";

  /**
   * Maximum steps for deep search.
   * الحد الأقصى لخطوات البحث العميق.
   */
  maxSteps?: number;

  /**
   * User's location for nearby/local search.
   * موقع المستخدم للبحث القريب/المحلي.
   */
  userLocation?: {
    /** Latitude | خط العرض */
    lat: number;
    /** Longitude | خط الطول */
    lng: number;
  };

  /**
   * Advanced options for specific features.
   * خيارات متقدمة لميزات محددة.
   */
  options?: {
    /** Stock search options | خيارات بحث الأسهم */
    stocks?: {
      /** Include AI summary (+1 request) | تضمين ملخص AI (+1 طلب) */
      summary?: boolean;
    };
    /** Weather search options | خيارات بحث الطقس */
    weather?: {
      /** Include AI summary and advice (+1 request) | تضمين ملخص AI ونصائح (+1 طلب) */
      summary?: boolean;
    };
  };
}

// ================================================
// Search Results | نتائج البحث
// ================================================

/**
 * A single web search result.
 * نتيجة بحث ويب واحدة.
 */
export interface SearchResult {
  /**
   * Result title.
   * عنوان النتيجة.
   */
  title: string;

  /**
   * Result URL.
   * رابط النتيجة.
   */
  url: string;

  /**
   * Result content/snippet.
   * محتوى/مقتطف النتيجة.
   */
  content: string;

  /**
   * Relevance score (0-1).
   * درجة الصلة (0-1).
   */
  score?: number;

  /**
   * Publication date.
   * تاريخ النشر.
   */
  publishedDate?: string;

  /**
   * Source/domain name.
   * اسم المصدر/النطاق.
   */
  source?: string;

  /**
   * Raw HTML content (if requested).
   * المحتوى الخام HTML (إذا طُلب).
   */
  rawContent?: string;
}

/**
 * An image search result.
 * نتيجة بحث صورة.
 */
export interface ImageResult {
  /** Image title | عنوان الصورة */
  title: string;
  /** Full image URL | رابط الصورة الكاملة */
  imageUrl: string;
  /** Thumbnail image URL | رابط الصورة المصغرة */
  thumbnailUrl: string;
  /** Source page URL | رابط الصفحة المصدر */
  sourceUrl?: string;
  /** Image width in pixels | عرض الصورة بالبكسل */
  width?: number;
  /** Image height in pixels | ارتفاع الصورة بالبكسل */
  height?: number;
}

/**
 * A video search result.
 * نتيجة بحث فيديو.
 */
export interface VideoResult {
  /** Video title | عنوان الفيديو */
  title: string;
  /** Video URL | رابط الفيديو */
  url: string;
  /** Thumbnail URL | رابط الصورة المصغرة */
  thumbnailUrl: string;
  /** Video duration | مدة الفيديو */
  duration?: string;
  /** Platform (YouTube, etc.) | المنصة (يوتيوب، إلخ) */
  platform?: string;
  /** Channel name | اسم القناة */
  channel?: string;
  /** View count | عدد المشاهدات */
  views?: string;
  /** Video description | وصف الفيديو */
  description?: string;
}

/**
 * A news article search result.
 * نتيجة بحث مقال إخباري.
 */
export interface NewsResult {
  /** Article title | عنوان المقال */
  title: string;
  /** Article URL | رابط المقال */
  url: string;
  /** Article content/snippet | محتوى/مقتطف المقال */
  content: string;
  /** News source | المصدر الإخباري */
  source?: string;
  /** Publication date | تاريخ النشر */
  publishedDate?: string;
  /** Article image URL | رابط صورة المقال */
  imageUrl?: string;
}

/**
 * A place/location search result.
 * نتيجة بحث مكان/موقع.
 */
export interface PlaceResult {
  /** Place name | اسم المكان */
  title: string;
  /** Address | العنوان */
  address: string;
  /** Latitude | خط العرض */
  latitude?: number;
  /** Longitude | خط الطول */
  longitude?: number;
  /** Rating (0-5) | التقييم (0-5) */
  rating?: number;
  /** Number of reviews | عدد التقييمات */
  ratingCount?: number;
  /** Place type/category | نوع/فئة المكان */
  type?: string;
  /** Phone number | رقم الهاتف */
  phone?: string;
  /** Website URL | رابط الموقع الإلكتروني */
  website?: string;
  /** Opening hours | ساعات العمل */
  hours?: string;
}

/**
 * A shopping/product search result.
 * نتيجة بحث تسوق/منتج.
 */
export interface ShoppingResult {
  /** Product name | اسم المنتج */
  title: string;
  /** Product URL | رابط المنتج */
  url: string;
  /** Price (formatted) | السعر (منسق) */
  price?: string;
  /** Store/merchant name | اسم المتجر/البائع */
  source?: string;
  /** Product image URL | رابط صورة المنتج */
  imageUrl?: string;
  /** Product rating | تقييم المنتج */
  rating?: number;
}

/**
 * An academic/scholarly search result.
 * نتيجة بحث أكاديمي/علمي.
 */
export interface ScholarResult {
  /** Paper title | عنوان البحث */
  title: string;
  /** Paper URL | رابط البحث */
  url: string;
  /** Abstract/snippet | الملخص/المقتطف */
  snippet?: string;
  /** Authors list | قائمة المؤلفين */
  authors?: string[];
  /** Publication year | سنة النشر */
  year?: string;
  /** Citation count | عدد الاستشهادات */
  citations?: number;
}

/**
 * A stock market result.
 * نتيجة سوق الأسهم.
 */
export interface StockResult {
  /** Stock symbol | رمز السهم */
  symbol: string;
  /** Company name | اسم الشركة */
  name: string;
  /** Current price | السعر الحالي */
  price: number;
  /** Currency | العملة */
  currency: string;
  /** Price change | تغيير السعر */
  change: number;
  /** Change percentage | نسبة التغيير */
  changePercent: number;
  /** Trading volume | حجم التداول */
  volume?: number;
}

/**
 * Stock search response.
 * استجابة بحث الأسهم.
 */
export interface StocksResponse {
  /** Query intent | نية الاستعلام */
  queryIntent?: string;
  /** Market type | نوع السوق */
  market?: string;
  /** Stock results | نتائج الأسهم */
  results: StockResult[];
  /** AI-generated summary (optional) | ملخص AI (اختياري) */
  summary?: string;
}

/**
 * Weather forecast for a single day.
 * توقعات الطقس ليوم واحد.
 */
export interface WeatherForecast {
  /** Date | التاريخ */
  date: string;
  /** Maximum temperature (Celsius) | الحرارة العظمى (مئوية) */
  maxtempC: number;
  /** Minimum temperature (Celsius) | الحرارة الصغرى (مئوية) */
  mintempC: number;
  /** Weather condition | حالة الطقس */
  condition: string;
}

/**
 * Weather search response.
 * استجابة بحث الطقس.
 */
export interface WeatherResponse {
  /** Location info | معلومات الموقع */
  location: {
    /** City/location name | اسم المدينة/الموقع */
    name: string;
    /** Country | الدولة */
    country: string;
  };
  /** Current weather | الطقس الحالي */
  current: {
    /** Temperature (Celsius) | الحرارة (مئوية) */
    tempC: number;
    /** Weather condition | حالة الطقس */
    condition: string;
    /** Humidity percentage | نسبة الرطوبة */
    humidity: number;
    /** Wind speed (km/h) | سرعة الرياح (كم/س) */
    windKph: number;
  };
  /** Forecast days | أيام التوقعات */
  forecast: WeatherForecast[];
  /** AI-generated summary (optional) | ملخص AI (اختياري) */
  summary?: string;
  /** AI-generated advice (optional) | نصائح AI (اختيارية) */
  advice?: string;
}

// ================================================
// Search Response | استجابة البحث
// ================================================

/**
 * The response from a search request.
 * الاستجابة من طلب البحث.
 */
export interface SearchResponse {
  /** Original search query | استعلام البحث الأصلي */
  query: string;
  /** Web search results | نتائج بحث الويب */
  results: SearchResult[];
  /** AI-generated answer | إجابة مولدة بالذكاء الاصطناعي */
  answer?: string;
  /** Image results | نتائج الصور */
  images?: ImageResult[];
  /** Video results | نتائج الفيديوهات */
  videos?: VideoResult[];
  /** News results | نتائج الأخبار */
  news?: NewsResult[];
  /** Map results | نتائج الخرائط */
  maps?: PlaceResult[];
  /** Place results | نتائج الأماكن */
  places?: PlaceResult[];
  /** Shopping results | نتائج التسوق */
  shopping?: ShoppingResult[];
  /** Academic results | نتائج الأبحاث الأكاديمية */
  scholar?: ScholarResult[];
  /** Stock market results | نتائج سوق الأسهم */
  stocks?: StocksResponse;
  /** Weather forecast results | نتائج توقعات الطقس */
  weather?: WeatherResponse;
  /**
   * Response metadata.
   * بيانات وصفية للاستجابة.
   */
  meta?: {
    /** Response time in ms | وقت الاستجابة بالملي ثانية */
    responseTime: number;
    /** Credit usage info | معلومات استخدام الرصيد */
    credits: {
      /** Credits used | الرصيد المستخدم */
      cost: number;
      /** Remaining credits | الرصيد المتبقي */
      remaining: number;
    };
  };
}

// ================================================
// Extract Options | خيارات الاستخراج
// ================================================

/**
 * Options for content extraction.
 * خيارات لاستخراج المحتوى.
 */
export interface ExtractOptions {
  /**
   * Include AI-generated summary.
   * تضمين تلخيص مولد بالذكاء الاصطناعي.
   */
  includeSummary?: boolean;
}

/**
 * The response from a content extraction request.
 * الاستجابة من طلب استخراج المحتوى.
 */
export interface ExtractResponse {
  /** The extracted URL | الرابط المستخرج */
  url: string;
  /** Extracted content (clean text) | المحتوى المستخرج (نص نظيف) */
  content: string;
  /** AI-generated summary | التلخيص المولد بالذكاء الاصطناعي */
  summary?: string;
  /** Whether extraction was successful | هل نجح الاستخراج */
  success: boolean;
  /**
   * Response metadata.
   * بيانات وصفية للاستجابة.
   */
  meta?: {
    /** Response time in ms | وقت الاستجابة بالملي ثانية */
    responseTime: number;
    /** Credit usage info | معلومات استخدام الرصيد */
    credits: {
      /** Credits used | الرصيد المستخدم */
      cost: number;
      /** Remaining credits | الرصيد المتبقي */
      remaining: number;
    };
  };
}

// ================================================
// Errors | الأخطاء
// ================================================

/**
 * Error response from the API.
 * استجابة الخطأ من واجهة البرمجة.
 */
export interface AraseError {
  /**
   * Error code (e.g., "RATE_LIMITED", "INVALID_API_KEY").
   * رمز الخطأ (مثل: "RATE_LIMITED"، "INVALID_API_KEY").
   */
  code: string;

  /**
   * Human-readable error message.
   * رسالة خطأ قابلة للقراءة.
   */
  message: string;

  /**
   * Additional error details.
   * تفاصيل إضافية للخطأ.
   */
  details?: Record<string, unknown>;
}
