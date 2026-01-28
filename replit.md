# بايتون (Baython) - Python Learning App

## Overview

Baython is a beginner-friendly Python learning mobile application designed for Arabic speakers. The app makes programming accessible through a playful, approachable design with full RTL (right-to-left) support. It features lessons, coding exercises, progress tracking, and user profiles - all in Arabic with a friendly learning companion theme.

The project is built as an Expo React Native application with an Express.js backend, targeting iOS, Android, and web platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Expo SDK 54 with React Native 0.81
- **Navigation**: React Navigation v7 with a hybrid structure:
  - Root Stack Navigator (main container)
  - Bottom Tab Navigator (4 tabs: Lessons, Practice, Progress, Profile)
  - Nested Stack Navigators per tab for screen-level navigation
- **State Management**: 
  - TanStack React Query for server state
  - Local component state with React hooks
  - AsyncStorage for persistent user data (completed lessons, exercises, profile settings)
- **Styling**: Custom theme system with light/dark mode support, RTL layout enforced via I18nManager
- **Animations**: React Native Reanimated for smooth interactions
- **Typography**: Tajawal Arabic font family loaded via expo-font

### Backend Architecture
- **Runtime**: Express.js v5 on Node.js
- **API Design**: REST endpoints prefixed with `/api`
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Defined in `shared/schema.ts` using Drizzle's pgTable
- **Storage Layer**: Abstracted storage interface in `server/storage.ts` with in-memory implementation (can be swapped for database)

### Directory Structure
```
client/           # React Native app code
  components/     # Reusable UI components
  screens/        # Screen components
  navigation/     # React Navigation setup
  hooks/          # Custom React hooks
  constants/      # Theme, colors, spacing
  data/           # Static lesson/exercise data
  lib/            # API client utilities
server/           # Express backend
  routes.ts       # API route definitions
  storage.ts      # Data access layer
  templates/      # HTML templates
shared/           # Shared types and schemas
  schema.ts       # Drizzle database schema
```

### Key Design Decisions

1. **Monorepo Structure**: Client and server share types via `@shared` path alias, ensuring type safety across the stack.

2. **Path Aliases**: `@/` maps to `client/`, `@shared/` maps to `shared/` - configured in both TypeScript and Babel.

3. **RTL-First Design**: The app forces RTL layout globally for Arabic language support. All UI components respect this direction.

4. **Local-First Data**: Lessons and exercises are currently stored as static data in `client/data/lessons.ts`. Progress is persisted locally with AsyncStorage.

5. **Platform-Adaptive UI**: Components use Platform.select() for iOS/Android/web differences, particularly for blur effects and keyboard handling.

## External Dependencies

### Third-Party Services & APIs
- **Database**: PostgreSQL (requires DATABASE_URL environment variable)
- **Fonts**: Google Fonts (Tajawal family) via @expo-google-fonts

### Key NPM Packages
- **expo**: Core mobile framework
- **drizzle-orm**: Database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Data fetching and caching
- **react-native-reanimated**: Animation library
- **@react-navigation/***: Navigation framework
- **expo-haptics**: Touch feedback
- **@react-native-async-storage/async-storage**: Local persistence

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required for database operations)
- `EXPO_PUBLIC_DOMAIN`: API server domain for client requests
- `REPLIT_DEV_DOMAIN`: Development domain (Replit-specific)

### Build & Development
- Development: `npm run expo:dev` (client) + `npm run server:dev` (server)
- Database migrations: `npm run db:push`
- Production build: `npm run expo:static:build` + `npm run server:build`