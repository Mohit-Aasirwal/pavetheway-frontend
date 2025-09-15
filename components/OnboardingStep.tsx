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
  value: string | any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  onChange: (value: string | any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onAddItem?: (item: EducationItem | ExperienceItem | ProjectItem) => void;
  onUpdateItem?: (
    index: number,
    item: EducationItem | ExperienceItem | ProjectItem
  ) => void;
  onDeleteItem?: (index: number) => void;
}

export default function OnboardingStep({
  stepKey,
  stepType,
  value,
  onChange,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const items = Array.isArray(value) ? value : [];
    const item = items[index];

    if (stepType === "education") {
      setEducationItem(item as EducationItem);
    } else if (stepType === "projects") {
      setProjectItem(item as ProjectItem);
    } else if (stepType === "experience") {
      setExperienceItem(item as ExperienceItem);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && onUpdateItem) {
      if (stepType === "education") {
        onUpdateItem(editingIndex, educationItem);
      } else if (stepType === "projects") {
        onUpdateItem(editingIndex, projectItem);
      } else if (stepType === "experience") {
        onUpdateItem(editingIndex, experienceItem);
      }
    }
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEducationItem({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    });
    setProjectItem({
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
    });
    setExperienceItem({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleDelete = (index: number) => {
    if (onDeleteItem) {
      onDeleteItem(index);
    }
  };

  const renderExistingItems = () => {
    if (!Array.isArray(value) || value.length === 0) {
      return null;
    }

    return (
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-gray-700">
          Existing {stepType}:
        </h4>
        {value.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-md bg-gray-50"
          >
            {stepType === "education" && (
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {(item as EducationItem).degree} in{" "}
                      {(item as EducationItem).field}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {(item as EducationItem).institution}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(item as EducationItem).startDate} -{" "}
                      {(item as EducationItem).endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {stepType === "projects" && (
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {(item as ProjectItem).name}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {(item as ProjectItem).description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Technologies:{" "}
                      {(item as ProjectItem).technologies?.join(", ")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(item as ProjectItem).startDate} -{" "}
                      {(item as ProjectItem).endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {stepType === "experience" && (
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {(item as ExperienceItem).position}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {(item as ExperienceItem).company}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(item as ExperienceItem).description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(item as ExperienceItem).startDate} -{" "}
                      {(item as ExperienceItem).endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderInput = () => {
    if (stepType === "projects") {
      return (
        <div className="space-y-4">
          {renderExistingItems()}

          <h4 className="text-sm font-medium text-gray-700">
            {editingIndex !== null ? "Edit Project:" : "Add New Project:"}
          </h4>

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
              />
            </div>
          </div>

          <div className="flex space-x-2">
            {editingIndex !== null ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
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
            )}
          </div>
        </div>
      );
    }

    if (stepType === "education") {
      return (
        <div className="space-y-4">
          {renderExistingItems()}

          <h4 className="text-sm font-medium text-gray-700">
            {editingIndex !== null ? "Edit Education:" : "Add New Education:"}
          </h4>

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
              />
            </div>
          </div>

          <div className="flex space-x-2">
            {editingIndex !== null ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
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
            )}
          </div>
        </div>
      );
    }

    if (stepType === "experience") {
      return (
        <div className="space-y-4">
          {renderExistingItems()}

          <h4 className="text-sm font-medium text-gray-700">
            {editingIndex !== null ? "Edit Experience:" : "Add New Experience:"}
          </h4>

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

          <div className="flex space-x-2">
            {editingIndex !== null ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
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
            )}
          </div>
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
