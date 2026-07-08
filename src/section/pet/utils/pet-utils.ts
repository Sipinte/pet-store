import { PET_ENDPOINTS } from "../constant/pet.constant";
import type {
  IPet,
  IUpdatePetPayload,
  ICreatePetPayload,
  IStatus,
  IPetApiError,
} from "../../../types/pet";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let error: IPetApiError = {
      code: res.status,
      type: "error",
      message: res.statusText,
    };
    try {
      error = await res.json();
    } catch {
      // body bukan JSON, pakai fallback di atas
    }
    throw error;
  }
  return res.json() as Promise<T>;
}

export async function updatePet(payload: IUpdatePetPayload): Promise<IPet> {
  const res = await fetch(PET_ENDPOINTS.base, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<IPet>(res);
}

export async function addPet(payload: ICreatePetPayload): Promise<IPet> {
  const res = await fetch(PET_ENDPOINTS.base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<IPet>(res);
}

export async function getPetById(id: number): Promise<IPet> {
  const res = await fetch(PET_ENDPOINTS.byId(id));
  return handleResponse<IPet>(res);
}

export async function findPetsByStatus(status: IStatus): Promise<IPet[]> {
  const url = `${PET_ENDPOINTS.byStatus}?status=${status}`;
  const res = await fetch(url);
  return handleResponse<IPet[]>(res);
}

export async function deletePet(id: number): Promise<void> {
  const res = await fetch(PET_ENDPOINTS.byId(id), { method: "DELETE" });
  if (!res.ok) {
    throw { code: res.status, type: "error", message: res.statusText } as IPetApiError;
  }
}