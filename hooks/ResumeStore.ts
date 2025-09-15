import { create } from "zustand";
import { fetchResumeData } from "@/lib/api";

interface ResumeState {
  resume: Partial<ResumeData>;
  setResume: (resume: Partial<ResumeData>) => void;
  loadResume: () => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: {},
  setResume: (resume) => set({ resume }),
  loadResume: async () => {
    try {
      const data = await fetchResumeData();
      set({ resume: data });
    } catch (error) {
      console.error("Failed to load resume:", error);
    }
  },
}));
