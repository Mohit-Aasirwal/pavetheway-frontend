"use client";
import { useState, useEffect } from "react";
import OnboardingStep from "@/components/OnboardingStep";
import ResumePreview from "@/components/ResumePreview";
import { useResumeStore } from "@/hooks/ResumeStore";
import { saveResumeData, exportResumePDF } from "@/lib/api";

const steps = [
  { key: "name", label: "Full Name" },
  { key: "title", label: "Professional Title" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "location", label: "Location" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "github", label: "GitHub URL" },
  { key: "portfolio", label: "Portfolio URL" },
  { key: "summary", label: "Professional Summary" },
  { key: "education", label: "Education", type: "education" },
  { key: "experience", label: "Work Experience", type: "experience" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects", type: "projects" },
  { key: "languages", label: "Languages" },
  { key: "certifications", label: "Certifications" },
  { key: "awards", label: "Awards" },
  { key: "organizations", label: "Organizations" },
  { key: "coCurricular", label: "Co-curricular Activities" },
  { key: "declarations", label: "Declaration" },
];

export default function Home() {
  const { resume, setResume, loadResume } = useResumeStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Load resume data on mount
  useEffect(() => {
    loadResume();
  }, []);

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
      setCurrentStep(currentStep + 1);
    } else {
      exportResumePDF();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

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
              ></div>
            </div>
          </div>

          <OnboardingStep
            stepKey={currentStepData.key}
            stepType={currentStepData.type}
            value={
              resume[currentStepData.key as keyof typeof resume] ||
              (currentStepData.type ? [] : "")
            }
            onChange={(value) =>
              setResume({ ...resume, [currentStepData.key]: value })
            }
            onAddItem={(item) => {
              const field = currentStepData.key;
              const currentItems = Array.isArray(resume[field])
                ? resume[field]
                : [];
              setResume({ ...resume, [field]: [...currentItems, item] });
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
          <ResumePreview data={resume} />
        </div>
      </div>
    </div>
  );
}
