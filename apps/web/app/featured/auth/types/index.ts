export interface PetParentUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  avatar?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: PetParentUser;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface LoginError {
  message: string;
  field?: string;
}

export interface SocialAuthProvider {
  id: "google" | "facebook" | "apple";
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

export interface AuthFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

export interface AuthContainerProps {
  redirectTo?: string;
  mode?: "login" | "register";
}
