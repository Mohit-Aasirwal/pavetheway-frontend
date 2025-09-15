"use client";
import { useState, useEffect } from "react";
import OnboardingStep from "@/components/OnboardingStep";
import ResumePreview from "@/components/ResumePreview";
import { useResumeStore } from "@/hooks/ResumeStore";
import { saveResumeData, exportResumePDF } from "@/lib/api";
import { ResumeData } from "@/types/ResumeData"; // adjust path

type StepKey = keyof ResumeData;

interface Step {
  key: StepKey;
  label: string;
  type?:
    | "text"
    | "array"
    | "education"
    | "experience"
    | "projects"
    | "organizations"
    | "certifications"
    | "awards";
}

const steps: Step[] = [
  { key: "full_name", label: "Full Name", type: "text" },
  { key: "title", label: "Professional Title", type: "text" },
  { key: "email", label: "Email Address", type: "text" },
  { key: "phone", label: "Phone Number", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "linkedin", label: "LinkedIn URL", type: "text" },
  { key: "github", label: "GitHub URL", type: "text" },
  { key: "portfolio", label: "Portfolio URL", type: "text" },
  { key: "objective", label: "Objective", type: "text" },
  { key: "education", label: "Education", type: "education" },
  { key: "experience", label: "Work Experience", type: "experience" },
  { key: "skills", label: "Skills", type: "array" },
  { key: "projects", label: "Projects", type: "projects" },
  { key: "languages", label: "Languages", type: "array" },
  { key: "certifications", label: "Certifications", type: "certifications" },
  { key: "awards", label: "Awards", type: "awards" },
  { key: "organizations", label: "Organizations", type: "organizations" },
  { key: "coCurricular", label: "Co-curricular Activities", type: "array" },
  { key: "declarations", label: "Declaration", type: "text" },
];

export default function Home() {
  const { resume, setResume, loadResume } = useResumeStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Load resume data on mount
  useEffect(() => {
    loadResume();
  }, [loadResume]);

  // Auto-save when resume changes
  useEffect(() => {
    const saveData = async () => {
      setIsSaving(true);
      try {
        await saveResumeData(resume);
      } catch (error) {
        console.error("Failed to save resume:", error);
      }
      setIsSaving(false);
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [resume]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      exportResumePDF();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const fieldKey = currentStepData.key;
  const fieldValue = resume[fieldKey as keyof typeof resume];

  // Helper: return proper default type if null
  // Helper: return proper default type if null
  const getDefaultValue = (step: Step): string | any[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (
      [
        "education",
        "experience",
        "projects",
        "organizations",
        "certifications",
        "awards",
        "array",
      ].includes(step.type || "")
    ) {
      return [];
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-full mx-auto h-full">
        {/* Form Section */}
        <div className="bg-white h-full rounded-lg shadow-md p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStepData.label}
            </h2>
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              {isSaving && (
                <span className="ml-4 text-xs text-blue-500">Saving...</span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <OnboardingStep
            stepKey={fieldKey}
            stepType={currentStepData.type}
            value={
              (fieldValue as string | any[]) ?? getDefaultValue(currentStepData) // eslint-disable-line @typescript-eslint/no-explicit-any
            }
            onChange={(value: ResumeData[typeof fieldKey]) =>
              setResume({ ...resume, [fieldKey]: value })
            }
            onAddItem={(item: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
              if (Array.isArray(resume[fieldKey])) {
                const currentItems = resume[fieldKey] as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
                setResume({ ...resume, [fieldKey]: [...currentItems, item] });
              } else {
                setResume({ ...resume, [fieldKey]: [item] as any }); // eslint-disable-line @typescript-eslint/no-explicit-any
              }
            }}
          />

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? "Export PDF" : "Next"}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-md p-4 h-full overflow-y-auto">
          <ResumePreview data={resume as any} /> {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
        </div>
      </div>
    </div>
  );
}
