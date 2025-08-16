import { router } from '../trpc';
import { menuRouter } from './menu';
import { loyaltyRouter } from './loyalty';

export const appRouter = router({
  menu: menuRouter,
  loyalty: loyaltyRouter,
});

export type AppRouter = typeof appRouter;
