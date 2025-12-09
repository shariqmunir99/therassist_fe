export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

export function validateRequired(value: string | null | undefined): string | undefined {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  if (!email) {
    return 'Email is required';
  }
  if (!isValidEmail(email)) {
    return 'Invalid email address';
  }
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!isStrongPassword(password)) {
    return 'Password must contain uppercase, lowercase, number, and special character';
  }
  return undefined;
}
