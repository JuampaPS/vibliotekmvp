import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock user data for MVP
let mockUser = {
  id: '1',
  email: 'user@example.com',
  stamps: 3,
  totalVisits: 3,
  rewardsEarned: 0,
  lastVisit: new Date('2024-01-15'),
};

export const loyaltyRouter = router({
  getUserLoyalty: publicProcedure.query(() => {
    return mockUser;
  }),
  
  addStamp: publicProcedure
    .input(z.object({ 
      email: z.string().email(),
      visitDate: z.date().optional()
    }))
    .mutation(({ input }) => {
      mockUser.stamps += 1;
      mockUser.totalVisits += 1;
      mockUser.lastVisit = input.visitDate || new Date();
      
      // Check if user earned a reward
      if (mockUser.stamps >= 7) {
        mockUser.rewardsEarned += 1;
        mockUser.stamps = 0; // Reset stamps after earning reward
      }
      
      return mockUser;
    }),
    
  resetStamps: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ input }) => {
      mockUser.stamps = 0;
      return mockUser;
    }),
});
