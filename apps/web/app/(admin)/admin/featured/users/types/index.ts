export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profile_image_id?: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profile_image_id?: number;
  status: "active" | "inactive";
};

export type UpdateUserData = Partial<Omit<CreateUserData, "password">> & {
  password?: string;
};
