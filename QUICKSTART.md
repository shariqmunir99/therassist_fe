# Quick Start Guide - Therassist Frontend

## ✅ Structure Implementation Complete

The Domain-Driven Design structure has been successfully implemented with dummy data!

## 📂 What Was Created

### 1. **Modules (Domain-Driven Design)**
✅ `modules/therapist/` - Therapist domain
  - API endpoints: getTherapist, updateTherapist, searchTherapists
  - Models: Therapist types
  - Hooks: useTherapist, useUpdateTherapist, useSearchTherapists
  - Components: TherapistCard, TherapistProfileForm

✅ `modules/client/` - Client domain
  - API: getClient
  - Models: Client types
  - Hooks: useClient, useClientProfile
  - Components: ClientCard

✅ `modules/session/` - Session domain
  - API: uploadSession, getSessions, getTranscription
  - Models: Session types
  - Hooks: useSessions, useUploadSession, useTranscription
  - Components: SessionCard

✅ `modules/availability/` - Availability domain
  - API: getAvailability
  - Models: Availability types
  - Hooks: useAvailability, useMyAvailability
  - Components: AvailabilityCalendar

✅ `modules/shared/` - Shared components
  - UI Components: Button, Card, Input, Modal
  - Hooks: useDebounce, useIsClient
  - Utils: date, formatter, validations
  - Constants: App-wide constants

### 2. **Infrastructure Layer**
✅ `lib/axios.ts` - Axios instance with auth interceptors
✅ `lib/react-query.ts` - React Query configuration
✅ `lib/env.ts` - Environment validation
✅ `lib/seo.ts` - SEO utilities
✅ `lib/auth/` - Complete authentication layer
  - next-auth.ts - NextAuth configuration
  - getCurrentUser.ts - Server-side auth
  - session.ts - Session helpers
  - withRole.ts - RBAC utilities
  - token.ts - JWT helpers

### 3. **App Routes (Next.js)**
✅ `app/(public)/` - Public pages
  - login/page.tsx
  - signup/page.tsx
  - therapists/page.tsx
  - therapists/[id]/page.tsx

✅ `app/dashboard/` - Protected dashboard
  - Dashboard home with stats
  - Therapist pages: clients, sessions, availability, settings
  - Client pages: sessions

✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API route

### 4. **Configuration**
✅ `types/next-auth.d.ts` - NextAuth type augmentation
✅ `config/routes.ts` - Route constants
✅ `config/constants.ts` - App configuration
✅ `.env.example` - Environment variables template

### 5. **Documentation**
✅ `STRUCTURE.md` - Complete architecture documentation
✅ This quick start guide

## 🚀 Next Steps

### 1. Install Required Dependencies
```bash
npm install axios @tanstack/react-query next-auth jose zod
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env.local` and update:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
API_URL=http://localhost:8000
NEXTAUTH_SECRET=generate-a-secret-here
```

### 3. Update Root Layout
Update `app/layout.tsx` to include React Query provider:
```tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

### 4. Test the Structure
```bash
npm run dev
```

Visit:
- http://localhost:3000 - Home page
- http://localhost:3000/login - Login page
- http://localhost:3000/therapists - Browse therapists
- http://localhost:3000/dashboard - Dashboard (requires auth)

## 📝 How to Use Each Module

### Example: Using Therapist Module
```tsx
'use client';

import { useSearchTherapists } from '@/modules/therapist/hooks/useTherapist';
import { TherapistCard } from '@/modules/therapist/components/TherapistCard';

export default function TherapistsPage() {
  const { data, isLoading } = useSearchTherapists({
    specialization: 'Anxiety'
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {data?.data.map((therapist) => (
        <TherapistCard 
          key={therapist.id} 
          therapist={therapist}
          onViewProfile={(id) => router.push(`/therapists/${id}`)}
        />
      ))}
    </div>
  );
}
```

### Example: Using Session Module
```tsx
'use client';

import { useSessions } from '@/modules/session/hooks/useSession';
import { SessionCard } from '@/modules/session/components/SessionCard';

export default function SessionsPage() {
  const { data } = useSessions({ therapistId: 'current-user-id' });

  return (
    <div className="space-y-4">
      {data?.data.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
```

### Example: Using Shared Components
```tsx
import { Button } from '@/modules/shared/components/ui/Button';
import { Card } from '@/modules/shared/components/ui/Card';
import { Input } from '@/modules/shared/components/ui/Input';
import { Modal } from '@/modules/shared/components/ui/Modal';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card variant="elevated">
        <Input label="Email" type="email" />
        <Button onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>Modal content here</p>
      </Modal>
    </>
  );
}
```

## 🔐 Authentication Examples

### Server Component (Protected Page)
```tsx
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return <div>Welcome, {user.name}!</div>;
}
```

### Role-Based Access
```tsx
import { requireRole } from '@/lib/auth/getCurrentUser';

export default async function TherapistOnlyPage() {
  const user = await requireRole(['therapist']);
  
  // Only therapists can see this
  return <div>Therapist Dashboard</div>;
}
```

## 🎨 Styling

All components use Tailwind CSS. Customize in `app/globals.css` or component classes.

## 📦 File Organization Rules

### When to Create New Files

1. **New Domain Feature** → Create in `modules/[domain]/`
2. **New Shared Component** → Add to `modules/shared/components/`
3. **New Utility Function** → Add to `modules/shared/utils/`
4. **New API Route** → Add to `app/api/`
5. **New Page** → Add to `app/` with appropriate route group

### Import Path Convention
Always use `@/` alias:
```tsx
// ✅ Correct
import { Button } from '@/modules/shared/components/ui/Button';
import { useTherapist } from '@/modules/therapist/hooks/useTherapist';

// ❌ Avoid
import { Button } from '../../../modules/shared/components/ui/Button';
```

## 🐛 Common Issues

### Issue: "Module not found"
**Solution**: Make sure you're using `@/` imports and paths are correct in `tsconfig.json`

### Issue: Authentication not working
**Solution**: 
1. Check `NEXTAUTH_SECRET` is set in `.env.local`
2. Verify API endpoint in `lib/auth/next-auth.ts`
3. Ensure backend returns correct user object

### Issue: React Query not working
**Solution**: Wrap app in `QueryClientProvider` in root layout

## 📚 Additional Resources

- See `STRUCTURE.md` for detailed architecture documentation
- Check individual module READMEs (coming soon)
- Review dummy data in components for API response structure

## ✨ What's Next?

1. **Connect to Real Backend**: Update API endpoints in module API files
2. **Implement Real Auth**: Configure NextAuth with your auth provider
3. **Add Validation**: Enhance forms with proper validation
4. **Add Tests**: Write unit and integration tests
5. **Optimize**: Add loading states, error boundaries, and performance optimizations

---

🎉 **You're all set!** The structure is ready with dummy data. Start replacing dummy data with real API calls!
