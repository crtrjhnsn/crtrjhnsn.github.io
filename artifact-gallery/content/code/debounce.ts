/**
 * Creates a debounced version of a function that delays invoking it until
 * after `delay` milliseconds have elapsed since the last call.
 *
 * @param fn    - The function to debounce
 * @param delay - Milliseconds to wait after the last call before invoking
 * @returns A debounced wrapper with a `.cancel()` method
 *
 * @example
 * const onSearch = debounce((query: string) => fetchResults(query), 300);
 * input.addEventListener('input', e => onSearch(e.target.value));
 * // onSearch.cancel() to abort a pending invocation
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(this, args);
    }, delay);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}

// ── Leading-edge variant ──────────────────────────────────────
/**
 * Like debounce, but fires immediately on the first call and suppresses
 * subsequent calls until the delay expires.
 *
 * Useful for button handlers where you want instant feedback but need
 * to prevent double-submits.
 */
export function debounceLeading<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let leadingCalled = false;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (!leadingCalled) {
      fn.apply(this, args);
      leadingCalled = true;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      leadingCalled = false;
    }, delay);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
    leadingCalled = false;
  };

  return debounced;
}
