import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock user data for the stamp card system
const mockUser = {
  id: 'user_123',
  name: 'Juampa',
  stamps: 3,
  totalLunches: 23,
  checkInDates: ['2025-08-12', '2025-08-13', '2025-08-15'],
  level: 'Brons' // Brons, Silver, Guld
};

export const loyaltyRouter = router({
  // Get user stamp card information
  getUserStamps: publicProcedure.query(() => {
    return {
      user: mockUser,
      maxStamps: 10,
      progress: (mockUser.stamps / 10) * 100
    };
  }),

  // Add a stamp (simulate eating lunch)
  addStamp: publicProcedure
    .input(z.object({
      date: z.string().optional()
    }))
    .mutation(({ input }) => {
      if (mockUser.stamps < 10) {
        mockUser.stamps += 1;
        const checkInDate = input.date || new Date().toISOString().split('T')[0];
        mockUser.checkInDates.unshift(checkInDate);
        mockUser.totalLunches += 1;

        // Update level based on total lunches
        if (mockUser.totalLunches >= 20) {
          mockUser.level = 'Guld';
        } else if (mockUser.totalLunches >= 10) {
          mockUser.level = 'Silver';
        } else {
          mockUser.level = 'Brons';
        }

        return {
          success: true,
          stamps: mockUser.stamps,
          level: mockUser.level,
          message: `Stämpel tillagt! Du har nu ${mockUser.stamps} av 10 stämplar.`
        };
      }

      return {
        success: false,
        message: 'Stämpelkortet är fullt! Lös in din gratis lunch först.'
      };
    }),

  // Redeem free lunch
  redeemLunch: publicProcedure.mutation(() => {
    if (mockUser.stamps >= 10) {
      mockUser.stamps = 0; // Reset stamps
      return {
        success: true,
        message: 'Gratis lunch inlöst! Stämpelkortet har återställts.',
        stamps: mockUser.stamps
      };
    }

    return {
      success: false,
      message: 'Du behöver 10 stämplar för att lösa in en gratis lunch.'
    };
    })
});

export type LoyaltyRouter = typeof loyaltyRouter;
