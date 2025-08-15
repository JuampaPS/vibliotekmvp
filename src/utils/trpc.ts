import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/_app';
import superjson from 'superjson';

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // browser should use relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

// tRPC v11 configuration with proper transformer setup
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson, // Required for tRPC v11 compatibility
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson, // Also required in the link
        }),
      ],
    };
  },
  ssr: false, // Set to true if you want to use server-side rendering
});
