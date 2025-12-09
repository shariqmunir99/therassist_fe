import { redirect } from 'next/navigation';
import { getCurrentUser } from './getCurrentUser';

export function withRole(allowedRoles: string[]) {
  return async function <T>(handler: (user: any) => Promise<T>): Promise<T> {
    const user = await getCurrentUser();
    
    if (!user) {
      redirect('/login');
    }
    
    if (!allowedRoles.includes(user.role)) {
      redirect('/unauthorized');
    }
    
    return handler(user);
  };
}

export const withTherapist = withRole(['therapist', 'admin']);
export const withClient = withRole(['client', 'admin']);
export const withAdmin = withRole(['admin']);
