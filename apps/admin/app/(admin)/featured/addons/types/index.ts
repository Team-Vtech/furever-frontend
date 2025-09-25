export type Addon = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type CreateAddonData = {
  name: string;
  description: string;
  status: "active" | "inactive";
};

export type UpdateAddonData = Partial<CreateAddonData>;
