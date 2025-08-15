# Vibliotek Loyalty & Daily Menu App - MVP

A mobile-first loyalty application for Vibliotek restaurant, featuring a prominent daily menu display, loyalty card system, and exclusive rewards.

## 🎯 Features

### 1. **Daily Menu (Dagens Lunch) - Priority Feature**
- **Prominent display** on the home screen
- **Automatic data fetching** from tRPC backend
- **Complete meal information**: dish name, description, price (135 kr)
- **Included items**: salad, bread, and coffee
- **Allergen information** and dietary details
- **Vibliotek-inspired design** with black & white palette and circular accents

### 2. **Loyalty Card System**
- **Visual punch card** with 10 stamps required for rewards
- **Interactive stamp collection** with animations
- **Progress tracking** and statistics
- **Reward notification** when 10 stamps are collected
- **Free lunch or tapas** as the main reward

### 3. **Rewards & Offers**
- **Welcome reward**: Free coffee for new members
- **Special promotions**: Wine tasting events, seasonal offers
- **Loyalty-based rewards**: Earned through stamp collection
- **Exclusive member benefits**

### 4. **Events & Special Occasions**
- **Wine tasting nights** with sommelier
- **Seasonal events** (summer food & rosé, Christmas celebrations)
- **Booking system** with availability tracking
- **Member discounts** and early access

### 5. **Onboarding Flow**
- **Simple email signup** process
- **Welcome reward explanation**
- **App functionality overview**
- **Smooth user experience**

### 6. **Navigation & UI**
- **Minimalist tab bar** with 5 main sections
- **Mobile-first responsive design**
- **Smooth animations** and transitions
- **Vibliotek brand consistency**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibliotek-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── DailyMenu.tsx   # Daily lunch menu (priority feature)
│   ├── LoyaltyCard.tsx # Loyalty system with punch card
│   ├── Rewards.tsx     # Special offers and promotions
│   ├── Events.tsx      # Events and special occasions
│   ├── Onboarding.tsx  # User signup and welcome flow
│   └── Navigation.tsx  # Tab-based navigation
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper with tRPC
│   ├── index.tsx       # Main application page
│   └── api/trpc/       # tRPC API endpoints
├── server/             # tRPC backend
│   ├── routers/        # API route definitions
│   ├── context.ts      # Server context
│   └── trpc.ts         # tRPC initialization
├── utils/              # Utility functions
│   └── trpc.ts         # tRPC client configuration
└── styles/             # Global styles
    └── globals.css     # TailwindCSS and custom styles
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Black (#000000) - Main brand color
- **Secondary**: White (#FFFFFF) - Background and contrast
- **Accents**: Gray scale for text and subtle elements
- **Highlights**: Green for success states, red for warnings

### **Typography**
- **Display**: Playfair Display (serif) - Headings and titles
- **Body**: Inter (sans-serif) - Body text and UI elements

### **Visual Elements**
- **Circular accents**: Small black dots for brand consistency
- **Borders**: 2px black borders for strong visual definition
- **Shadows**: Subtle shadows for depth and hierarchy
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Technical Implementation

### **Frontend Stack**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Icon library

### **Backend & API**
- **tRPC v11** - End-to-end type-safe APIs
- **Zod** - Schema validation
- **SuperJSON** - Data transformation (dates, complex types)

### **Data Management**
- **React Query** - Server state management
- **tRPC React Query** - Type-safe data fetching
- **Local Storage** - User preferences and onboarding state

## 📱 Mobile-First Features

### **Responsive Design**
- **Mobile-optimized** layouts and interactions
- **Touch-friendly** buttons and navigation
- **Optimized spacing** for small screens
- **Gesture support** for smooth interactions

### **Performance**
- **Lazy loading** of components
- **Optimized animations** for mobile devices
- **Efficient re-renders** with React best practices
- **Minimal bundle size** for fast loading

## 🔄 Future Enhancements

### **Menu Integration**
- **Web scraping** from Vibliotek's actual lunch menu URL
- **Real-time updates** for daily menu changes
- **Menu history** and favorites
- **Dietary preferences** and filtering

### **Admin Panel**
- **Menu management** interface
- **Event creation** and management
- **User analytics** and insights
- **Reward system** administration

### **Advanced Features**
- **Push notifications** for menu updates
- **QR code scanning** for loyalty stamps
- **Social sharing** of rewards and events
- **Integration** with POS systems

## 🧪 Development Notes

### **Mock Data**
The MVP currently uses mock data for demonstration. In production:
- Replace mock data with real API calls
- Implement proper error handling
- Add loading states and skeleton screens
- Implement proper user authentication

### **Testing**
- Add unit tests for components
- Integration tests for tRPC procedures
- E2E tests for user flows
- Performance testing for mobile devices

### **Deployment**
- Configure environment variables
- Set up CI/CD pipeline
- Optimize for production builds
- Monitor performance and errors

## 📋 Setup Checklist

- [x] Project structure and dependencies
- [x] tRPC backend setup with routers
- [x] Daily menu component (priority feature)
- [x] Loyalty card system with animations
- [x] Rewards and offers display
- [x] Events and special occasions
- [x] Onboarding flow with email signup
- [x] Navigation and routing
- [x] Responsive design and animations
- [x] Vibliotek brand integration

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Ensure TypeScript types are properly defined
3. Test on mobile devices for responsive behavior
4. Maintain the minimalist design aesthetic
5. Prioritize user experience and performance

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

**Built with ❤️ for Vibliotek - Where exceptional dining meets modern technology**
