import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock events data for MVP
const mockEvents = [
  {
    id: '1',
    title: 'Vinprovning med Sommelier',
    description: 'Upplev en exklusiv vinprovning med vår expert sommelier. Prova handplockade viner från hela världen.',
    date: new Date('2024-02-15T18:00:00'),
    duration: '2 timmar',
    price: 295,
    maxAttendees: 20,
    currentAttendees: 12,
    location: 'Vibliotek, Stockholm',
    image: '/wine-tasting.jpg',
    isActive: true,
  },
  {
    id: '2',
    title: 'Sommarmat & Rosé',
    description: 'En kväll med lätt sommarinspirerad mat och utsökta rosé-viner. Perfekt för en romantisk kväll.',
    date: new Date('2024-06-20T19:00:00'),
    duration: '3 timmar',
    price: 395,
    maxAttendees: 25,
    currentAttendees: 8,
    location: 'Vibliotek, Stockholm',
    image: '/summer-food.jpg',
    isActive: true,
  },
  {
    id: '3',
    title: 'Julfest & Glögg',
    description: 'Fira julen med traditionell svensk julmat och varm glögg. Inkluderar live musik.',
    date: new Date('2024-12-10T17:00:00'),
    duration: '4 timmar',
    price: 450,
    maxAttendees: 30,
    currentAttendees: 0,
    location: 'Vibliotek, Stockholm',
    image: '/christmas-party.jpg',
    isActive: true,
  },
];

export const eventsRouter = router({
  getUpcomingEvents: publicProcedure.query(() => {
    const now = new Date();
    return mockEvents
      .filter(event => event.date > now && event.isActive)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }),
  
  getEventById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return mockEvents.find(event => event.id === input.id);
    }),
    
  getActiveEvents: publicProcedure.query(() => {
    return mockEvents.filter(event => event.isActive);
  }),
});
