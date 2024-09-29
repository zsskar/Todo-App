import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';
import { httpBatchLink } from '@trpc/client';
import { AppRouter } from '@/server/routers';

export const trpc = createTRPCNext<AppRouter>({
  config: (opts) => ({
    transformer : superjson,
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  }),
  ssr: false,
});
