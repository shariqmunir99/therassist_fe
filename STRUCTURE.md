# Therassist Frontend - Domain-Driven Design Structure

## 📁 Project Structure

```
therassist_fe/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public pages (no auth required)
│   │   ├── login/
│   │   ├── signup/
│   │   └── therapists/
│   ├── dashboard/                # Protected dashboard
│   │   ├── therapists/           # Therapist-specific pages
│   │   └── clients/              # Client-specific pages
│   ├── api/                      # API routes
│   │   └── auth/[...nextauth]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── modules/                      # Domain-Driven Design Modules
│   ├── therapist/
│   │   ├── api/                  # Backend API calls
│   │   ├── models/               # TypeScript types
│   │   ├── hooks/                # React Query hooks
│   │   └── components/           # Domain-specific components
│   ├── client/
│   ├── session/
│   ├── availability/
│   └── shared/                   # Shared UI components
│       ├── components/
│       │   ├── ui/               # Design system primitives
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   └── NavItem.tsx
│       ├── hooks/
│       ├── utils/
│       └── constants.ts
│
├── lib/                          # Technical infrastructure
│   ├── axios.ts                  # Axios instance with interceptors
│   ├── react-query.ts            # React Query configuration
│   ├── env.ts                    # Environment validation
│   ├── seo.ts                    # SEO utilities
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   └── auth/                     # Authentication layer
│       ├── next-auth.ts
│       ├── getCurrentUser.ts
│       ├── session.ts
│       ├── withRole.ts
│       └── token.ts
│
├── types/                        # Global TypeScript types
│   └── next-auth.d.ts
│
├── config/                       # Configuration files
│   ├── routes.ts                 # Route constants
│   └── constants.ts              # App configuration
│
├── components/                   # Legacy (kept for now)
├── middleware.ts                 # Route protection
└── public/                       # Static assets
```

## 🎯 Architecture Principles

### 1. **Domain-Driven Design (DDD)**
Each feature module (`therapist`, `client`, `session`, `availability`) contains:
- **API Layer**: Backend communication
- **Models**: TypeScript interfaces and types
- **Hooks**: React Query hooks for data fetching
- **Components**: Feature-specific UI components

### 2. **Separation of Concerns**
- **`app/`**: Routing and page layouts (Next.js App Router)
- **`modules/`**: Business logic and domain features
- **`lib/`**: Technical infrastructure (auth, axios, etc.)
- **`config/`**: Configuration and constants

### 3. **Shared Kernel**
`modules/shared/` contains reusable UI components and utilities used across all domains.

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Required Dependencies
```bash
npm install axios @tanstack/react-query next-auth jose zod
```

### Environment Variables
Create a `.env.local` file:
```env
API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Run Development Server
```bash
npm run dev
```

## 📚 Module Usage Examples

### Using Therapist Module
```tsx
import { useTherapist } from '@/modules/therapist/hooks/useTherapist';
import { TherapistCard } from '@/modules/therapist/components/TherapistCard';

export default function TherapistList() {
  const { data, isLoading } = useSearchTherapists({ query: '' });
  
  return (
    <div>
      {data?.data.map(therapist => (
        <TherapistCard key={therapist.id} therapist={therapist} />
      ))}
    </div>
  );
}
```

### Using Session Module
```tsx
import { useSessions } from '@/modules/session/hooks/useSession';
import { SessionCard } from '@/modules/session/components/SessionCard';

export default function SessionList() {
  const { data } = useSessions({ therapistId: 'therapist-id' });
  
  return (
    <div>
      {data?.data.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
```

### Using Shared Components
```tsx
import { Button } from '@/modules/shared/components/ui/Button';
import { Card } from '@/modules/shared/components/ui/Card';
import { Input } from '@/modules/shared/components/ui/Input';

export default function MyForm() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## 🔐 Authentication

### Protecting Routes
The `app/dashboard/layout.tsx` enforces authentication:
```tsx
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return <>{children}</>;
}
```

### Role-Based Access Control
```tsx
import { requireRole } from '@/lib/auth/getCurrentUser';

export default async function TherapistPage() {
  await requireRole(['therapist', 'admin']);
  // Page content
}
```

## 🛣️ Route Structure

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/therapists` - Browse therapists
- `/therapists/[id]` - Therapist profile

### Protected Routes
- `/dashboard` - Dashboard home
- `/dashboard/therapists/clients` - Therapist's clients
- `/dashboard/therapists/sessions` - Therapist's sessions
- `/dashboard/therapists/availability` - Manage availability
- `/dashboard/therapists/settings` - Account settings
- `/dashboard/clients` - Client's sessions

## 📦 Key Features

### API Integration
All API calls use a configured Axios instance (`lib/axios.ts`) with:
- Automatic JWT token injection
- Request/response interceptors
- Error handling
- 401 redirect to login

### React Query
Centralized configuration in `lib/react-query.ts`:
- 5-minute stale time
- Automatic retries
- Optimistic updates

### Type Safety
Full TypeScript coverage with:
- Domain models in each module
- NextAuth type augmentation
- Strict type checking

## 🔄 Migration Notes

### Old Components (Legacy)
The original `components/` folder is preserved but components have been migrated to `modules/shared/components/`.

### Path Aliases
All imports use the `@/` alias:
```tsx
import { Button } from '@/modules/shared/components/ui/Button';
import { useTherapist } from '@/modules/therapist/hooks/useTherapist';
import axios from '@/lib/axios';
```

## 📝 Next Steps

1. **Connect to Backend**: Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. **Implement Auth**: Configure NextAuth providers in `lib/auth/next-auth.ts`
3. **Add Real Data**: Replace dummy data with actual API calls
4. **Styling**: Customize Tailwind classes in components
5. **Testing**: Add unit and integration tests

## 🤝 Contributing

When adding new features:
1. Create a new module in `modules/` if it's a new domain
2. Add to existing modules if extending a feature
3. Use `modules/shared/` for reusable components
4. Keep `lib/` for technical infrastructure only

---

Built with ❤️ using Next.js 14, TypeScript, and Domain-Driven Design
