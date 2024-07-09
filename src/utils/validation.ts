export const validateName = (name: string): string | null => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return "Name should only contain letters and spaces";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

export const isEmailExists = async (email: string): Promise<boolean> => {
  return false;
};

export const validateCredentiall = async (
  email: string,
  password: string
): Promise<string | null> => {
  if (!email || !password) {
    return "Email and password are required";
  }
  if (await isEmailExists(email)) {
    return "Invalid email or password";
  }
  return null;
};
