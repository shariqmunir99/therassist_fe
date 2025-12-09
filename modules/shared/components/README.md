# Shared Authentication Components

This directory contains reusable components for authentication pages (login/signup) that follow the Therassist design system.

## Components

### Logo
A reusable logo component that displays the spa icon in the brand blue color.

```tsx
import { Logo } from '@/modules/shared/components/Logo';

<Logo className="mb-4" />
```

**Props:**
- `className?: string` - Additional CSS classes
- `iconClassName?: string` - Additional CSS classes for the icon

### UserTypeToggle
A segmented control for switching between Therapist and Client user types.

```tsx
import { UserTypeToggle } from '@/modules/shared/components';

<UserTypeToggle
  value={userType}
  onChange={setUserType}
/>
```

**Props:**
- `value: 'Therapist' | 'Client'` - Current selected value
- `onChange: (value: 'Therapist' | 'Client') => void` - Change handler
- `className?: string` - Additional CSS classes

### FormInput
A styled input component with icon support that wraps shadcn's Input component.

```tsx
import { FormInput } from '@/modules/shared/components';

<FormInput
  leftIcon="mail"
  rightIcon="visibility"
  onRightIconClick={() => toggleVisibility()}
  placeholder="Enter your email"
  type="email"
/>
```

**Props:**
- Extends all native input props
- `leftIcon?: string` - Material Symbols icon name for left side
- `rightIcon?: string` - Material Symbols icon name for right side
- `onRightIconClick?: () => void` - Click handler for right icon

### SocialButton
A button component for social login (Google/Apple) with proper branding.

```tsx
import { SocialButton } from '@/modules/shared/components';

<SocialButton provider="google">
  Continue with Google
</SocialButton>

<SocialButton provider="apple">
  Continue with Apple
</SocialButton>
```

**Props:**
- Extends all button props
- `provider: 'google' | 'apple'` - Social provider type
- `children: React.ReactNode` - Button text

## Design System

### Colors
- Primary: `#005A9C`
- Secondary: `#E6F0F8`
- Accent: `#8E8E93`
- Text: `#1D1D1F`
- Background: `#FFFFFF`

### Form Validation
All forms use:
- `react-hook-form` for form state management
- `zod` for schema validation
- `@hookform/resolvers` for integration
- Shadcn's Form components for accessibility

### Example Usage in Pages

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Logo, UserTypeToggle, FormInput, SocialButton } from '@/modules/shared/components';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  userType: z.enum(['Therapist', 'Client']),
});

export default function AuthPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'Therapist',
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <Logo />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Form fields here */}
        </form>
      </Form>
      <SocialButton provider="google">Continue with Google</SocialButton>
    </div>
  );
}
```

## Icons
Uses Material Symbols Outlined icons. Icon names:
- `person` - User profile
- `mail` - Email
- `lock` - Password
- `visibility` / `visibility_off` - Password visibility toggle
- `spa` - Logo icon

## Notes
- All components use Tailwind CSS for styling
- Forms are fully accessible with proper ARIA attributes
- Password fields include visibility toggle
- Responsive design for mobile and desktop
