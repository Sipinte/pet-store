import type { IStatus } from "../../../types/pet";

// Ganti ke server kamu sendiri kalau tidak pakai demo server Swagger
export const PET_API_BASE_URL = "https://petstore.swagger.io/v2";

export const PET_ENDPOINTS = {
  base: `${PET_API_BASE_URL}/pet`,
  byId: (id: number) => `${PET_API_BASE_URL}/pet/${id}`,
  byStatus: `${PET_API_BASE_URL}/pet/findByStatus`,
};

export const PET_STATUS_OPTIONS: { label: string; value: IStatus }[] = [
  { label: "Available", value: "available" },
  { label: "Pending", value: "pending" },
  { label: "Sold", value: "sold" },
];

export const PET_STATUS_COLOR: Record<IStatus, string> = {
  available: "#22c55e",
  pending: "#f59e0b",
  sold: "#ef4444",
};