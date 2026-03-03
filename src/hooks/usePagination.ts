import { useState, useCallback } from 'react';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export function usePagination(initialPage = 1, initialLimit = ITEMS_PER_PAGE) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goToPage = useCallback((p: number) => setPage(p), []);
  const changeLimit = useCallback((l: number) => {
    setLimit(l);
    setPage(1);
  }, []);
  const reset = useCallback(() => setPage(1), []);

  return { page, limit, nextPage, prevPage, goToPage, changeLimit, reset };
}
