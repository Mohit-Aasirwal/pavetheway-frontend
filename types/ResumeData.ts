export interface ResumeData {
  full_name: string | undefined;
  title: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  address: string | null;
  objective: string | null;
  portfolio: string | null;
  github: string | null;
  linkedin: string | null;

  // Sections
  education: EducationItem[] | null;
  experience: ExperienceItem[] | null;
  projects: ProjectItem[] | null;
  skills: string[] | null;
  languages: string[] | null;
  organizations: OrganizationItem[] | null;
  coCurricular: string[] | null;
  certifications: CertificationItem[] | null;
  awards: AwardItem[] | null;
  declarations: string | null;
}

// Example supporting types
export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  link?: string;
}

export interface OrganizationItem {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export interface AwardItem {
  title: string;
  issuer: string;
  date: string;
}
