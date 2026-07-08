export type IStatus = "available" | "pending" | "sold";

export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IPet {
  id: number;
  category?: ICategory;
  name: string;
  photoUrls: string[];
  tags?: ITag[];
  status?: IStatus;
}

// Payload yang dikirim ke PUT /pet (update pet yang sudah ada)
export type IUpdatePetPayload = IPet;

// Payload yang dikirim ke POST /pet (buat pet baru, id belum tentu ada)
export type ICreatePetPayload = Omit<IPet, "id"> & { id?: number };

// Bentuk error yang dibalikin API Swagger Petstore
export interface IPetApiError {
  code: number;
  type: string;
  message: string;
}