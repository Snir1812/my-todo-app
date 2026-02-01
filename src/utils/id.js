// ID helper — prefer crypto.randomUUID(); fallback for older browsers
// Returns a stable unique string suitable for client-only IDs.
function genId() {
  try {
    if (typeof crypto?.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch (_) {
    // ignore and fall back
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Named export (explicit)
export { genId };
