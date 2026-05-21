import { useCallback, useEffect, useState } from "react";

export function useAsync(task, deps = [], options = {}) {
  const [data, setData] = useState(options.initialData ?? null);
  const [loading, setLoading] = useState(Boolean(options.immediate ?? true));
  const [error, setError] = useState(null);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await task(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    if (options.immediate === false) return;
    run().catch(() => {});
  }, [run, options.immediate]);

  return { data, setData, loading, error, run };
}
