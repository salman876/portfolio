import { QueryFunction } from '@tanstack/react-query';
import { default as Axios, CancelToken } from 'axios';

export function attachRequestCancellation<T, PageParam = string>(
  request: (cancelToken: CancelToken, pageParam: PageParam) => Promise<T> | T,
): QueryFunction<T> {
  return ({ signal, pageParam }) => {
    const cancelToken = Axios.CancelToken;
    const source = cancelToken.source();
    const promise = request(source.token, pageParam as PageParam);

    signal?.addEventListener('abort', () => {
      source.cancel('Query was cancelled by React Query');
    });

    return promise;
  };
}
