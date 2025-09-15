// hooks/ResumeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProjectItem {
  name: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
}

interface ResumeState {
  resume: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
    education: EducationItem[];
    experience: ExperienceItem[];
    skills: string;
    projects: ProjectItem[];
    languages: string;
    certifications: string;
  };
  setResume: (updates: ResumeState["resume"]) => void;
}

const initialResumeState = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: "",
  languages: "",
  certifications: "",
  awards: "",
  organizations: "",
  coCurricular: "",
  declarations: "",
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resume: initialResumeState,
      setResume: (updates) =>
        set((state) => ({ resume: { ...state.resume, ...updates } })),
    }),
    {
      name: "resume-storage",
      // Add migration to handle old data format
      migrate: (persistedState: ResumeState["resume"], version: number) => {
        if (persistedState && persistedState.resume) {
          // Ensure education and experience are arrays
          if (!Array.isArray(persistedState.resume.education)) {
            persistedState.resume.education = [];
          }
          if (!Array.isArray(persistedState.resume.experience)) {
            persistedState.resume.experience = [];
          }
        }
        return persistedState;
      },
    }
  )
);
