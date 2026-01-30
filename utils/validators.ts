// Frontend validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Must contain at least one special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateTitle = (title: string): boolean => {
  return title.length >= 5 && title.length <= 200;
};

export const validateExcerpt = (excerpt: string): boolean => {
  return excerpt.length >= 10 && excerpt.length <= 500;
};

export const validateContent = (content: string): boolean => {
  return content.length >= 20;
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};

// Form field validators
export interface FormErrors {
  [key: string]: string;
}

export const validateNewsForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.title || data.title.length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }
  if (!data.excerpt || data.excerpt.length < 10) {
    errors.excerpt = 'Excerpt must be at least 10 characters';
  }
  if (!data.content || data.content.length < 20) {
    errors.content = 'Content must be at least 20 characters';
  }
  if (!data.category || data.category.length < 2) {
    errors.category = 'Category is required';
  }
  if (!data.author || data.author.length < 2) {
    errors.author = 'Author name is required';
  }
  if (data.image && !validateUrl(data.image)) {
    errors.image = 'Invalid image URL';
  }

  return errors;
};

export const validateTeacherForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!data.subject || data.subject.length < 2) {
    errors.subject = 'Subject is required';
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number';
  }
  if (data.image && !validateUrl(data.image)) {
    errors.image = 'Invalid image URL';
  }

  return errors;
};

export const validateClubForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name || data.name.length < 3) {
    errors.name = 'Club name must be at least 3 characters';
  }
  if (!data.description || data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  if (data.image && !validateUrl(data.image)) {
    errors.image = 'Invalid image URL';
  }

  return errors;
};

export const validateEventForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.title || data.title.length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }
  if (!data.description || data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }
  if (!data.location || data.location.length < 5) {
    errors.location = 'Location must be at least 5 characters';
  }
  if (data.image && !validateUrl(data.image)) {
    errors.image = 'Invalid image URL';
  }

  return errors;
};

export const validateContactForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number';
  }
  if (!data.subject || data.subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }
  if (!data.message || data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

export const validateLoginForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.username || data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateChangePasswordForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.oldPassword) {
    errors.oldPassword = 'Old password is required';
  }
  
  const passwordValidation = validatePassword(data.newPassword || '');
  if (!passwordValidation.isValid) {
    errors.newPassword = passwordValidation.errors.join(', ');
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
