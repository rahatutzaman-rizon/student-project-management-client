const cache = {};

export async function fetchWithCache(url, cacheTime = 5 * 60 * 1000) {
  const now = Date.now();
  if (cache[url] && now - cache[url].timestamp < cacheTime) {
    return cache[url].data;
  }

  const response = await fetch(url);
  const data = await response.json();
  cache[url] = { data, timestamp: now };
  return data;
}

