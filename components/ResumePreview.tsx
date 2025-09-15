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
  technologies: string[];
  startDate: string;
  endDate: string;
}

interface ResumeData {
  full_name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  objective: string;
  education: EducationItem[] | string;
  experience: ExperienceItem[] | string;
  projects: ProjectItem[] | string;
  skills: string;
  languages: string;
  certifications: string;
  awards: string;
  organizations: string;
  coCurricular: string;
  declarations: string;
}

interface ResumePreviewProps {
  data: Partial<ResumeData>;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const formatDateRange = (start: string, end: string) => {
    if (!start && !end) return "";
    return `${start} - ${end}`;
  };

  // Safely get education array
  const getEducationArray = () => {
    if (!data.education) return [];
    if (Array.isArray(data.education)) return data.education;
    return [];
  };

  // Safely get experience array
  const getExperienceArray = () => {
    if (!data.experience) return [];
    if (Array.isArray(data.experience)) return data.experience;
    return [];
  };

  // Safely get projects array
  const getProjectsArray = () => {
    if (!data.projects) return [];
    if (Array.isArray(data.projects)) return data.projects;
    return [];
  };

  const educationItems = getEducationArray();
  const experienceItems = getExperienceArray();
  const projectItems = getProjectsArray();

  return (
    <div
      id="resume-content"
      className="resume-preview p-4 text-xs leading-tight bg-white text-black print:bg-white print:text-black print:text-base print:leading-relaxed"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-black print:text-2xl print:leading-tight">
          {data.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-800 print:text-base print:font-medium">
          {data.title || "Professional Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-1 text-gray-800 print:text-sm">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-1 text-gray-800 print:text-sm">
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && <span>• {data.github}</span>}
          {data.portfolio && <span>• {data.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.objective && (
        <section className="mb-3">
          <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
            SUMMARY
          </h2>
          <p className="text-justify print:text-sm break-words">
            {data.objective}
          </p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          {/* Education */}
          {educationItems.length > 0 && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                EDUCATION
              </h2>
              {educationItems.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="font-semibold print:text-sm">
                    {edu.degree}
                  </div>
                  <div className="text-gray-600 print:text-sm">{edu.field}</div>
                  <div className="font-medium print:text-sm">
                    {edu.institution}
                  </div>
                  <div className="text-gray-500 text-xs print:text-sm">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-1 py-0.5 rounded text-xs print:text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                LANGUAGES
              </h2>
              <div className="print:text-sm">{data.languages}</div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                CERTIFICATIONS
              </h2>
              <div className="print:text-sm">{data.certifications}</div>
            </section>
          )}

          {/* Awards */}
          {data.awards && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                AWARDS
              </h2>
              <div className="print:text-sm">{data.awards}</div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Experience */}
          {experienceItems.length > 0 && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                EXPERIENCE
              </h2>
              {experienceItems.map((exp, index) => (
                <div key={index} className="mb-2">
                  <div className="font-semibold print:text-sm">
                    {exp.position}
                  </div>
                  <div className="font-medium print:text-sm">{exp.company}</div>
                  <div className="text-gray-500 text-xs print:text-sm">
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </div>
                  <div className="mt-1 print:text-sm">{exp.description}</div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projectItems.length > 0 && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                PROJECTS
              </h2>
              {projectItems.map((project, index) => (
                <div key={index} className="mb-2">
                  <div className="font-semibold print:text-sm">
                    {project.name}
                  </div>
                  <div className="text-gray-500 text-xs print:text-sm">
                    {formatDateRange(project.startDate, project.endDate)}
                  </div>
                  <div className="mt-1 print:text-sm">
                    {project.description}
                  </div>
                  {project.technologies && (
                    <div className="mt-1 text-gray-600 print:text-sm">
                      <span className="font-medium">Technologies: </span>
                      {project.technologies.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Organizations */}
          {data.organizations && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                ORGANIZATIONS
              </h2>
              <div className="print:text-sm">{data.organizations}</div>
            </section>
          )}

          {/* Co-curricular Activities */}
          {data.coCurricular && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                CO-CURRICULAR ACTIVITIES
              </h2>
              <div className="print:text-sm">{data.coCurricular}</div>
            </section>
          )}

          {/* Declarations */}
          {data.declarations && (
            <section className="mb-3">
              <h2 className="text-sm font-bold border-b border-gray-300 pb-1 mb-1 print:text-base print:font-semibold">
                DECLARATION
              </h2>
              <div className="print:text-sm">{data.declarations}</div>
            </section>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="w-fit rounded-md cursor-pointer font-bold p-2 print:hidden bg-blue-200 hover:bg-blue-300 transition-colors"
          onClick={() => window.print()}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
