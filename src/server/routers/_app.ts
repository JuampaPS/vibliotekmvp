import { router } from '../trpc';
import { menuRouter } from './menu';
import { loyaltyRouter } from './loyalty';
import { rewardsRouter } from './rewards';
import { eventsRouter } from './events';

export const appRouter = router({
  menu: menuRouter,
  loyalty: loyaltyRouter,
  rewards: rewardsRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
