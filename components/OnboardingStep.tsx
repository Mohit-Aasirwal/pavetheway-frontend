"use client";
import { useState, useEffect } from "react";

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

interface OnboardingStepProps {
  stepKey: string;
  stepType?: string;
  value: string | any[];
  onChange: (value: string | any[]) => void;
  onAddItem?: (item: EducationItem | ExperienceItem | ProjectItem) => void;
}

export default function OnboardingStep({
  stepKey,
  stepType,
  value,
  onChange,
  onAddItem,
}: OnboardingStepProps) {
  const [educationItem, setEducationItem] = useState<EducationItem>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  });
  const [projectItem, setProjectItem] = useState<ProjectItem>({
    name: "",
    description: "",
    technologies: [],
    startDate: "",
    endDate: "",
  });
  const [experienceItem, setExperienceItem] = useState<ExperienceItem>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleEducationChange = (
    field: keyof EducationItem,
    fieldValue: string
  ) => {
    setEducationItem({ ...educationItem, [field]: fieldValue });
  };
  const handleProjectChange = (
    field: keyof ProjectItem,
    fieldValue: string | string[]
  ) => {
    setProjectItem({ ...projectItem, [field]: fieldValue });
  };
  const handleExperienceChange = (
    field: keyof ExperienceItem,
    fieldValue: string
  ) => {
    setExperienceItem({ ...experienceItem, [field]: fieldValue });
  };

  const renderInput = () => {
    if (stepType === "projects") {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={projectItem.name}
              onChange={(e) => handleProjectChange("name", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={projectItem.description}
              onChange={(e) =>
                handleProjectChange("description", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24"
              placeholder="Describe the project and your role"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              value={projectItem.technologies.join(", ")}
              onChange={(e) =>
                handleProjectChange(
                  "technologies",
                  e.target.value.split(",").map((t) => t.trim())
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Technologies used (comma separated)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={projectItem.startDate}
                onChange={(e) =>
                  handleProjectChange("startDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="MM/YYYY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={projectItem.endDate}
                onChange={(e) => handleProjectChange("endDate", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <button
            onClick={() => {
              onAddItem && onAddItem({ ...projectItem });
              setProjectItem({
                name: "",
                description: "",
                technologies: [],
                startDate: "",
                endDate: "",
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Add Project
          </button>
        </div>
      );
    }
    if (stepType === "education") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={educationItem.institution}
                onChange={(e) =>
                  handleEducationChange("institution", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="University name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={educationItem.degree}
                onChange={(e) =>
                  handleEducationChange("degree", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <input
              type="text"
              value={educationItem.field}
              onChange={(e) => handleEducationChange("field", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Computer Science, Business, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={educationItem.startDate}
                onChange={(e) =>
                  handleEducationChange("startDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="MM/YYYY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={educationItem.endDate}
                onChange={(e) =>
                  handleEducationChange("endDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <button
            onClick={() => {
              onAddItem && onAddItem({ ...educationItem });
              setEducationItem({
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Add Education
          </button>
        </div>
      );
    }

    if (stepType === "experience") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={experienceItem.company}
                onChange={(e) =>
                  handleExperienceChange("company", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={experienceItem.position}
                onChange={(e) =>
                  handleExperienceChange("position", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={experienceItem.startDate}
                onChange={(e) =>
                  handleExperienceChange("startDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="MM/YYYY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={experienceItem.endDate}
                onChange={(e) =>
                  handleExperienceChange("endDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={experienceItem.description}
              onChange={(e) =>
                handleExperienceChange("description", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24"
              placeholder="Describe your responsibilities and achievements"
            />
          </div>

          <button
            onClick={() => {
              onAddItem && onAddItem({ ...experienceItem });
              setExperienceItem({
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Add Experience
          </button>
        </div>
      );
    }

    switch (stepKey) {
      case "summary":
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-32"
            placeholder="Write a brief summary of your professional background"
          />
        );

      case "skills":
      case "languages":
      case "certifications":
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-32"
            placeholder="Enter items separated by commas"
          />
        );

      case "awards":
      case "organizations":
      case "coCurricular":
      case "declarations":
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-32"
            placeholder={`Enter your ${stepKey}`}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder={`Enter your ${stepKey}`}
          />
        );
    }
  };

  return <div className="space-y-4">{renderInput()}</div>;
}
