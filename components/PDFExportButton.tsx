"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PDFExportButtonProps {
  previewElementId: string;
}

export default function PDFExportButton({ previewElementId }: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById(previewElementId);
      if (!element) {
        console.error("Preview element not found");
        alert("Preview element not found. Please ensure there is content to export.");
        return;
      }

      // Check if element has content
      if (!element.textContent || element.textContent.trim() === "Your markdown preview will appear here...") {
        alert("No content to export. Please add some markdown content first.");
        return;
      }

      // Create a clone of the element for PDF rendering
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Apply PDF-optimized styles to the clone
      clone.style.width = "794px"; // A4 width in pixels at 96 DPI
      clone.style.padding = "40px";
      clone.style.backgroundColor = "#ffffff";
      clone.style.color = "#1f2937";
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.visibility = "visible";
      clone.style.opacity = "1";
      clone.style.overflow = "visible";
      clone.style.maxWidth = "none";
      clone.style.maxHeight = "none";
      
      // Ensure all child elements are visible and properly styled
      const allElements = clone.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.visibility = "visible";
        htmlEl.style.opacity = "1";
        // Remove any overflow hidden that might clip content
        if (htmlEl.style.overflow === "hidden") {
          htmlEl.style.overflow = "visible";
        }
      });
      
      document.body.appendChild(clone);

      // Wait a bit for styles to apply and content to render
      await new Promise(resolve => setTimeout(resolve, 200));

      // Log for debugging
      console.log("Cloning element for PDF:", {
        width: clone.offsetWidth,
        height: clone.offsetHeight,
        scrollWidth: clone.scrollWidth,
        scrollHeight: clone.scrollHeight,
        textContent: clone.textContent?.substring(0, 100),
      });

      // Capture the element as canvas
      const canvas = await html2canvas(clone, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher scale for better quality
        logging: true, // Enable logging to see what's happening
        useCORS: true,
        allowTaint: true,
        width: clone.scrollWidth || clone.offsetWidth || 794,
        height: clone.scrollHeight || clone.offsetHeight || 1123,
        windowWidth: clone.scrollWidth || clone.offsetWidth || 794,
        windowHeight: clone.scrollHeight || clone.offsetHeight || 1123,
      });

      // Remove clone
      document.body.removeChild(clone);

      // Check if canvas has content
      console.log("Canvas created:", {
        width: canvas.width,
        height: canvas.height,
      });

      if (canvas.width === 0 || canvas.height === 0) {
        alert("Failed to capture content. The preview might be empty.");
        return;
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const imgScaledWidth = pdfWidth;
      const imgScaledHeight = imgHeight * ratio;

      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png");

      // Add first page
      let heightLeft = imgScaledHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgScaledWidth, imgScaledHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgScaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgScaledWidth, imgScaledHeight);
        heightLeft -= pdfHeight;
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
      pdf.save(`markdown-preview-${timestamp}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert(`Failed to export PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting}
      className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-[#e0e0e0] px-2 py-1 text-xs border border-[#5a5a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      style={{ fontFamily: 'inherit' }}
    >
      {isExporting ? "Exporting..." : "Save as PDF"}
    </button>
  );
}

