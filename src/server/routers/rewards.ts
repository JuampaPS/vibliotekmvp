import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock rewards data for MVP
const mockRewards = [
  {
    id: '1',
    title: 'Välkomstkaffe',
    description: 'Få en gratis kaffe vid ditt första besök!',
    type: 'welcome',
    isActive: true,
    validUntil: new Date('2024-12-31'),
    image: '/coffee-icon.svg',
  },
  {
    id: '2',
    title: 'Vinprovning',
    description: 'Exklusiv vinprovning med vår sommelier. 20% rabatt för medlemmar.',
    type: 'event',
    isActive: true,
    validUntil: new Date('2024-02-28'),
    image: '/wine-icon.svg',
  },
  {
    id: '3',
    title: 'Gratis Lunch',
    description: 'Efter 10 stämplar får du en gratis lunch eller tapas!',
    type: 'loyalty',
    isActive: true,
    validUntil: new Date('2024-12-31'),
    image: '/lunch-icon.svg',
  },
];

export const rewardsRouter = router({
  getActiveRewards: publicProcedure.query(() => {
    return mockRewards.filter(reward => reward.isActive);
  }),
  
  getRewardById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return mockRewards.find(reward => reward.id === input.id);
    }),
});
