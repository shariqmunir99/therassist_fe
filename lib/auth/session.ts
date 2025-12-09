import { getServerSession } from 'next-auth';
import { authOptions } from './next-auth';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getAccessToken() {
  const session = await getSession();
  return session?.accessToken || null;
}
