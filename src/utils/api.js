import { API_BASE_URL } from "../config";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Simple fetch wrapper with base URL and retry for cold starts/timeouts
export async function apiFetch(
  path,
  options = {},
  { retries = 2, backoffMs = 1500 } = {}
) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      // Consider 502/503/504 as potentially cold-start and retryable
      if ([502, 503, 504].includes(res.status)) {
        lastError = new Error(`Upstream unavailable: ${res.status}`);
      } else {
        return res;
      }
    } catch (err) {
      lastError = err;
    }
    if (attempt < retries) {
      await sleep(backoffMs * (attempt + 1));
    }
  }
  throw lastError || new Error("Request failed");
}
