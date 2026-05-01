/**
 * In-memory cache utility with TTL (Time-To-Live) support
 * Caches data for 15-30 minutes depending on the data type
 */

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

class CacheManager {
  private cache: Map<string, CacheEntry<unknown>> = new Map();

  /**
   * Get cached data if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cache data with TTL in minutes
   */
  set<T>(key: string, data: T, ttlMinutes: number = 15): void {
    const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
    this.cache.set(key, { data, expiresAt });
  }

  /**
   * Clear specific cache entry
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size for debugging
   */
  getSize(): number {
    return this.cache.size;
  }
}

// Singleton instance
const cacheManager = new CacheManager();

export default cacheManager;

/**
 * Helper function to wrap async functions with caching
 */
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlMinutes: number = 15,
): Promise<T> {
  // Check if data is in cache
  const cached = cacheManager.get<T>(key);
  if (cached !== null) {
    console.log(`[Cache HIT] ${key}`);
    return cached;
  }

  // Fetch fresh data
  console.log(`[Cache MISS] ${key} - Fetching fresh data...`);
  const data = await fetchFn();

  // Store in cache
  cacheManager.set(key, data, ttlMinutes);

  return data;
}
