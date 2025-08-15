import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock data for MVP - in production this would fetch from Vibliotek's website
const mockMenuData = {
  dish: "Grillad Lax med Citron & Dill",
  description: "Färsk lax grillad med citron, dill och en lätt sås. Serveras med saisonens grönsaker.",
  price: 135,
  includes: ["Sallad", "Bröd", "Kaffe"],
  date: new Date(),
  allergens: ["Fisk"],
  vegetarian: false,
};

export const menuRouter = router({
  getDailyMenu: publicProcedure.query(() => {
    return mockMenuData;
  }),
  
  // Future: Add procedure to fetch from actual website
  // fetchFromWebsite: publicProcedure
  //   .input(z.object({ url: z.string().url() }))
  //   .query(async ({ input }) => {
  //     // Implementation to scrape Vibliotek's lunch menu
  //     // This would require proper web scraping setup
  //   }),
});
