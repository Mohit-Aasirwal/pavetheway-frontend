// hooks/usePdfExport.ts
import html2pdf from "html2pdf.js";

export const usePdfExport = () => {
  const exportToPdf = (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const opt = {
      margin: 10,
      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#FFFFFF" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return { exportToPdf };
};
