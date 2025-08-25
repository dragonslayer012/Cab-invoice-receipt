import React, { useState } from 'react';
import ReceiptForm, { ReceiptData } from './components/ReceiptForm';
import ReceiptPreview from './components/ReceiptPreview';
import html2pdf from 'html2pdf.js';

export default function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDataChange = (data: ReceiptData) => {
    setReceiptData(data);
  };

  const generatePDF = async () => {
    if (!receiptData) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const element = document.getElementById('receipt-pdf');
      if (!element) {
        throw new Error('Receipt content not found');
      }

      // First, let's try to ensure all images are loaded
      const images = element.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = resolve; // Still resolve on error to not block PDF generation
          setTimeout(resolve, 3000); // Timeout after 3 seconds
        });
      });
      
      await Promise.all(imagePromises);

      // Temporarily make the element visible for PDF generation
      const originalPosition = element.style.position;
      const originalLeft = element.style.left;
      const originalTop = element.style.top;
      const originalZIndex = element.style.zIndex;
      const originalVisibility = element.style.visibility;
      
      // Move element to visible area temporarily
      element.style.position = 'fixed';
      element.style.left = '0';
      element.style.top = '0';
      element.style.zIndex = '10000';
      element.style.visibility = 'visible';
      
      // Wait a bit more for rendering
      await new Promise(resolve => setTimeout(resolve, 1500));

      const opt = {
        margin: [3, 3, 3, 3],
        filename: `Receipt_${receiptData.invoiceId}_${receiptData.customerName || 'Customer'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: 595,
          height: 842,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 595,
          windowHeight: 842,
          letterRendering: true,
          removeContainer: false
        },
        jsPDF: { 
          unit: 'pt', 
          format: 'a4', 
          orientation: 'portrait',
          putOnlyUsedFonts: true,
          floatPrecision: 16
        }
      };

      await html2pdf().set(opt).from(element).save();
      
      // Restore original position
      element.style.position = originalPosition;
      element.style.left = originalLeft;
      element.style.top = originalTop;
      element.style.zIndex = originalZIndex;
      element.style.visibility = originalVisibility;
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Try alternative approach - generate PDF without moving element
      try {
        console.log('Trying alternative PDF generation method...');
        const element = document.getElementById('receipt-pdf');
        if (element) {
          const opt = {
            margin: [10, 10, 10, 10],
            filename: `Receipt_${receiptData.invoiceId}_${receiptData.customerName || 'Customer'}.pdf`,
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { 
              scale: 1.5,
              useCORS: true,
              allowTaint: true,
              backgroundColor: '#ffffff',
              logging: true,
              removeContainer: false
            },
            jsPDF: { 
              unit: 'pt', 
              format: 'a4', 
              orientation: 'portrait'
            }
          };
          
          await html2pdf().set(opt).from(element).save();
        }
      } catch (fallbackError) {
        console.error('Fallback PDF generation also failed:', fallbackError);
        alert('Error generating PDF. Please check the browser console for details and try again.');
      }
      
      // Ensure element is restored even if there's an error
      const element = document.getElementById('receipt-pdf');
      if (element) {
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        element.style.top = '-9999px';
        element.style.zIndex = '';
        element.style.visibility = 'visible';
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleGenerateReceipt = () => {
    if (!receiptData) return;
    
    // Helper function to convert string/number to number for validation
    const toNumber = (value: number | string): number => {
      if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
      }
      return value || 0;
    };
    
    // Validate required fields
    if (!receiptData.customerName.trim()) {
      alert('Please enter customer name');
      return;
    }
    if (!receiptData.pickupAddress.trim()) {
      alert('Please enter pickup address');
      return;
    }
    if (!receiptData.dropoffAddress.trim()) {
      alert('Please enter drop-off address');
      return;
    }
    if (toNumber(receiptData.rideFee) <= 0) {
      alert('Please enter a valid ride fee');
      return;
    }
    
    setShowPreview(true);
    // Auto-generate PDF after a longer delay to ensure preview is fully rendered
    setTimeout(() => {
      console.log('Starting PDF generation...');
      generatePDF();
    }, 1500);
  };

  const handleReset = () => {
    setShowPreview(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-orange-600 to-blue-700 text-white py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">Aadi Yogi Taxi Service</h1>
          <p className="text-center text-orange-100 mt-1 text-sm sm:text-base">Professional Receipt Generator</p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {!showPreview ? (
          <div className="flex justify-center">
            <ReceiptForm 
              onDataChange={handleDataChange}
              onGenerateReceipt={handleGenerateReceipt}
              onReset={handleReset}
            />
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-lg shadow-md p-4 gap-3 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">Receipt Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                ← Back to Form
              </button>
            </div>
            
            {receiptData && (
              <ReceiptPreview 
                data={receiptData}
                onDownloadPDF={generatePDF}
                onPrint={handlePrint}
                isGeneratingPDF={isGeneratingPDF}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}