import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { IPet, IUpdatePetPayload } from "../../../types/pet";
import { getPetById, updatePet as updatePetApi } from "../utils/pet-utils";

interface IPetContextValue {
  pet: IPet | null;
  loading: boolean;
  error: string | null;
  fetchPet: (id: number) => Promise<void>;
  savePet: (payload: IUpdatePetPayload) => Promise<void>;
}

const PetContext = createContext<IPetContextValue | undefined>(undefined);

export function PetProvider({ children }: { children: ReactNode }) {
  const [pet, setPet] = useState<IPet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPet = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPetById(id);
      setPet(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengambil data pet");
    } finally {
      setLoading(false);
    }
  }, []);

  const savePet = useCallback(async (payload: IUpdatePetPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updatePetApi(payload);
      setPet(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan pet");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PetContext.Provider value={{ pet, loading, error, fetchPet, savePet }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const ctx = useContext(PetContext);
  if (!ctx) {
    throw new Error("usePetContext harus dipakai di dalam PetProvider");
  }
  return ctx;
}