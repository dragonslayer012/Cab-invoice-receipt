import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Download, MapPin, Car, Clock, CreditCard, Loader2, User } from 'lucide-react';
import { ReceiptData } from './ReceiptForm';
import aadiYogiLogo from 'figma:asset/b824aa98a0ce9ced05a52d8ec22fd0b553cbe481.png';

interface ReceiptPreviewProps {
  data: ReceiptData;
  onDownloadPDF: () => void;
  onPrint: () => void;
  isGeneratingPDF?: boolean;
}

export default function ReceiptPreview({ data, onDownloadPDF, onPrint, isGeneratingPDF = false }: ReceiptPreviewProps) {
  // Helper function to convert string/number to number for calculations
  const toNumber = (value: number | string): number => {
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return value || 0;
  };

  const rideFee = toNumber(data.rideFee);
  const tollFee = toNumber(data.tollFee);
  const airportCharges = toNumber(data.airportCharges);
  const otherCharges = toNumber(data.otherCharges);
  const gstPercentage = toNumber(data.gstPercentage);
  
  const subtotal = rideFee + tollFee + airportCharges + otherCharges;
  const gstAmount = (subtotal * gstPercentage) / 100;
  const totalBill = subtotal + gstAmount;

  // Car SVG Component for PDF visibility
  const CarIcon = ({ size = 24, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block' }}>
      <path 
        d="M5 17h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h1v-5l-2-5H4l-2 5v5h1zm2.5 1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.5-10h2v-2h-2v2z" 
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );

  // Clock SVG Component
  const ClockIcon = ({ size = 20, color = "#6b7280" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block' }}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Action Buttons - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6 print:hidden">
        <Button 
          onClick={onDownloadPDF} 
          disabled={isGeneratingPDF}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-2 text-base sm:text-sm h-12 sm:h-10"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-5 w-5 sm:h-4 sm:w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-5 w-5 sm:h-4 sm:w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* PDF Optimized Receipt - Single Page Layout - HIDDEN */}
      <div 
        id="receipt-pdf"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '595px',
          minHeight: '842px',
          maxHeight: '842px',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: '14px',
          lineHeight: '1.4',
          color: '#1f2937',
          backgroundColor: '#ffffff',
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          boxSizing: 'border-box',
          transform: 'scale(1)',
          transformOrigin: 'top left',
          visibility: 'visible'
        }}
      >
        {/* Header with Logo - Compact */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #1e40af 100%)',
            color: '#ffffff',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={aadiYogiLogo} 
                alt="Aadi Yogi" 
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.3))'
                }}
              />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 2px 0', letterSpacing: '0.5px' }}>
                {data.companyName}
              </h1>
              <p style={{ fontSize: '13px', color: '#fed7aa', margin: 0 }}>
                {data.companyAddress} • {data.mobileNumber}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', color: '#fed7aa', margin: '0 0 2px 0' }}>{data.date}</p>
            <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Invoice #{data.invoiceId}</p>
          </div>
        </div>

        {/* Amount Section - Compact */}
        <div 
          style={{
            background: 'linear-gradient(to right, #fff7ed, #eff6ff)',
            padding: '20px',
            textAlign: 'center',
            borderBottom: '2px solid #e5e7eb'
          }}
        >
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            ₹ {Math.round(totalBill)}
          </div>
          <p style={{ fontSize: '16px', color: '#4b5563', margin: 0 }}>
            Thanks for travelling with us, <span style={{ fontWeight: '600', color: '#c2410c' }}>{data.customerName}</span>
          </p>
        </div>

        {/* Main Content - Optimized Two Columns */}
        <div style={{ display: 'flex', gap: '20px', padding: '20px', height: '400px', boxSizing: 'border-box' }}>
          {/* Left Column - Ride Details */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #fed7aa', paddingBottom: '4px', margin: '0 0 8px 0' }}>
              Ride Details
            </h3>
            
            {/* Driver Info - Compact */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#fff7ed', borderRadius: '6px', border: '1px solid #fed7aa' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                backgroundColor: '#ea580c', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#4b5563', margin: '0 0 1px 0' }}>You rode with</p>
                <p style={{ fontWeight: '600', color: '#1f2937', margin: 0, fontSize: '13px' }}>{data.driverName}</p>
              </div>
            </div>

            {/* Vehicle Info - Compact */}
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '6px', padding: '10px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: '#2563eb', 
                  borderRadius: '6px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 17h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h1v-5l-2-5H4l-2 5v5h1zm2.5 1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#ffffff" stroke="#ffffff" strokeWidth="1"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 1px 0', fontSize: '13px' }}>{data.vehicleType}</p>
                  <p style={{ fontSize: '11px', color: '#4b5563', margin: 0 }}>{data.vehicleRegNo}</p>
                </div>
              </div>
            </div>

            {/* Distance and Time - Compact */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ 
                flex: 1, 
                backgroundColor: '#f9fafb', 
                padding: '8px', 
                borderRadius: '4px', 
                textAlign: 'center',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '2px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="#6b7280" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>Distance</span>
                </div>
                <p style={{ fontWeight: 'bold', color: '#1f2937', margin: 0, fontSize: '12px' }}>- Km</p>
              </div>
              <div style={{ 
                flex: 1, 
                backgroundColor: '#f9fafb', 
                padding: '8px', 
                borderRadius: '4px', 
                textAlign: 'center',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '2px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="#6b7280" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>Duration</span>
                </div>
                <p style={{ fontWeight: 'bold', color: '#1f2937', margin: 0, fontSize: '12px' }}>- Min</p>
              </div>
            </div>

            {/* Trip Route - Compact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '6px', 
                padding: '6px', 
                borderLeft: '3px solid #ea580c', 
                backgroundColor: '#fff7ed',
                borderRadius: '0 4px 4px 0',
                fontSize: '12px'
              }}>
                <div style={{ 
                  width: '14px', 
                  height: '14px', 
                  backgroundColor: '#ea580c', 
                  borderRadius: '50%', 
                  marginTop: '1px',
                  flexShrink: 0
                }}></div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: '500', color: '#c2410c', margin: '0 0 1px 0' }}>FROM</p>
                  <p style={{ color: '#1f2937', margin: 0, fontSize: '11px', lineHeight: '1.2' }}>{data.pickupAddress}</p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '6px', 
                padding: '6px', 
                borderLeft: '3px solid #2563eb', 
                backgroundColor: '#eff6ff',
                borderRadius: '0 4px 4px 0',
                fontSize: '12px'
              }}>
                <div style={{ 
                  width: '14px', 
                  height: '14px', 
                  backgroundColor: '#2563eb', 
                  borderRadius: '2px', 
                  marginTop: '1px',
                  flexShrink: 0
                }}></div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: '500', color: '#1d4ed8', margin: '0 0 1px 0' }}>TO</p>
                  <p style={{ color: '#1f2937', margin: 0, fontSize: '11px', lineHeight: '1.2' }}>{data.dropoffAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bill Details */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #fed7aa', paddingBottom: '4px', margin: '0 0 8px 0' }}>
              Bill Details
            </h3>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #fff7ed 0%, #fefce8 100%)', 
              borderRadius: '6px', 
              padding: '14px', 
              border: '1px solid #fed7aa',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#374151' }}>
                <span>Your Trip</span>
                <span style={{ fontWeight: '600' }}>₹{rideFee.toFixed(2)}</span>
              </div>
              
              {tollFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#374151' }}>
                  <span>Toll Convenience Fee</span>
                  <span style={{ fontWeight: '600' }}>₹{tollFee.toFixed(2)}</span>
                </div>
              )}
              
              {airportCharges > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#374151' }}>
                  <span>Airport Charges</span>
                  <span style={{ fontWeight: '600' }}>₹{airportCharges.toFixed(2)}</span>
                </div>
              )}
              
              {otherCharges > 0 && data.otherChargesDescription && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#374151' }}>
                  <span>{data.otherChargesDescription}</span>
                  <span style={{ fontWeight: '600' }}>₹{otherCharges.toFixed(2)}</span>
                </div>
              )}
              
              <div style={{ borderTop: '1px solid #fed7aa', paddingTop: '6px', marginTop: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#374151' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: '600' }}>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#374151' }}>
                  <span>GST ({gstPercentage}%)</span>
                  <span style={{ fontWeight: '600' }}>₹{gstAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div style={{ borderTop: '2px solid #f59e0b', paddingTop: '10px', marginTop: '10px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  background: 'linear-gradient(to right, #fed7aa, #fef3c7)', 
                  padding: '8px', 
                  borderRadius: '4px',
                  border: '1px solid #f59e0b'
                }}>
                  <span>Total Bill</span>
                  <span>₹{Math.round(totalBill)}</span>
                </div>
                <p style={{ fontSize: '9px', color: '#6b7280', marginTop: '4px', textAlign: 'center', margin: '4px 0 0 0' }}>
                  Includes {data.gstPercentage.toFixed(1)}% Taxes
                </p>
              </div>
            </div>

            {/* Payment Promise */}
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '8px' }}>
              <p style={{ fontSize: '10px', color: '#1d4ed8', margin: 0, lineHeight: '1.3' }}>
                We've fulfilled our promise to take you to destination for pre-agreed Total Fare. Modifying the drop/route can change this fare.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Section - Compact */}
        <div style={{ 
          background: 'linear-gradient(135deg, #7c2d12 0%, #1e3a8a 100%)', 
          color: '#ffffff', 
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="#fed7aa" strokeWidth="2"/>
              <line x1="1" y1="10" x2="23" y2="10" stroke="#fed7aa" strokeWidth="2"/>
            </svg>
            <div>
              <p style={{ color: '#fed7aa', fontSize: '11px', margin: '0 0 1px 0' }}>Payment</p>
              <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Paid by {data.paymentMethod}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>₹{Math.round(totalBill)}</p>
          </div>
        </div>

        {/* Footer - More Compact */}
        <div style={{ 
          background: 'linear-gradient(to right, #fed7aa, #bfdbfe)', 
          padding: '12px',
          fontSize: '10px',
          color: '#4b5563',
          height: '90px',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px', margin: '0 0 4px 0' }}>Invoice Information</p>
              <p style={{ margin: '0 0 2px 0', lineHeight: '1.2' }}>Service Tax Category: Renting of Cab</p>
              <p style={{ margin: '0 0 2px 0', lineHeight: '1.2' }}>Invoice Date: {data.date}</p>
              <p style={{ fontWeight: '600', color: '#1f2937', margin: '4px 0 0 0' }}>Original Tax Invoice</p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px', margin: '0 0 4px 0' }}>Customer Support</p>
              <p style={{ margin: '0 0 2px 0', lineHeight: '1.2' }}>In case of any complaint/grievance against this invoice, write to us at</p>
              <p style={{ fontWeight: '600', color: '#c2410c', margin: '0 0 2px 0' }}>{data.companyName}</p>
              <p style={{ margin: 0, lineHeight: '1.2' }}>Mobile: {data.mobileNumber}</p>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #d1d5db', paddingTop: '6px', fontSize: '9px', color: '#6b7280' }}>
            <p style={{ margin: '0 0 2px 0' }}>
              <strong>Please note:</strong> 1. This invoice is issued on behalf of Transport Service Provider. 
              2. This is an electronically generated invoice and does not require a digital signature.
            </p>
          </div>
        </div>
      </div>

      {/* Screen Display Version - Mobile Responsive */}
      <Card className="bg-white shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Header Section - Mobile Optimized */}
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-blue-800 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/90 to-blue-800/90"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg ring-2 ring-white/30">
                  <img 
                    src={aadiYogiLogo} 
                    alt="Aadi Yogi Shiva" 
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 tracking-wide">{data.companyName}</h1>
                  <p className="text-orange-100 mb-1 text-sm sm:text-base">{data.companyAddress}</p>
                  <p className="text-orange-100 text-sm sm:text-base">Mobile: {data.mobileNumber}</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-orange-100 text-sm">{data.date}</p>
                <p className="text-white font-semibold text-base sm:text-lg">Invoice #{data.invoiceId}</p>
              </div>
            </div>
          </div>

          {/* Amount and Thank You Section - Mobile Optimized */}
          <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center border-b-2 border-orange-200">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">
              ₹ {Math.round(totalBill)}
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Thanks for travelling with us, <span className="font-bold text-orange-700">{data.customerName}</span>
            </p>
          </div>

          {/* Main Content - Mobile Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Left Column - Ride Details */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-orange-200 pb-2 sm:pb-3 flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                Ride Details
              </h3>
              
              {/* Driver Info - Mobile Optimized */}
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">You rode with</p>
                  <p className="font-bold text-gray-800 text-base sm:text-lg">{data.driverName}</p>
                </div>
              </div>

              {/* Vehicle Info - Mobile Optimized */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-5 border border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-10 sm:w-16 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Car className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base sm:text-lg">{data.vehicleType}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{data.vehicleRegNo}</p>
                  </div>
                </div>
              </div>

              {/* Distance and Duration - Mobile Optimized */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center border border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-600">Distance</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">- Km</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center border border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-600">Duration</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">- Min</p>
                </div>
              </div>

              {/* Trip Route - Mobile Optimized */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-xl">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mt-1 shadow-md">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-1">FROM</p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base">{data.pickupAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-xl">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1 shadow-md">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-blue-700 mb-1">TO</p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base">{data.dropoffAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bill Details - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-orange-200 pb-2 sm:pb-3 flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                Bill Details
              </h3>
              
              <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 border border-orange-200 shadow-sm">
                <div className="flex justify-between text-gray-700 text-base sm:text-lg">
                  <span>Your Trip</span>
                  <span className="font-semibold">₹{rideFee.toFixed(2)}</span>
                </div>
                
                {tollFee > 0 && (
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Toll Convenience Fee</span>
                    <span className="font-semibold">₹{tollFee.toFixed(2)}</span>
                  </div>
                )}
                
                {airportCharges > 0 && (
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Airport Charges</span>
                    <span className="font-semibold">₹{airportCharges.toFixed(2)}</span>
                  </div>
                )}
                
                {otherCharges > 0 && data.otherChargesDescription && (
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>{data.otherChargesDescription}</span>
                    <span className="font-semibold">₹{otherCharges.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t-2 border-orange-200 pt-3 sm:pt-4">
                  <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                    <span>GST ({gstPercentage}%)</span>
                    <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t-2 border-orange-300 pt-3 sm:pt-4">
                  <div className="flex justify-between text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-orange-200 to-yellow-200 p-3 sm:p-4 rounded-lg border-2 border-orange-300 shadow-md">
                    <span>Total Bill</span>
                    <span>₹{Math.round(totalBill)}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 text-center">Includes {gstPercentage.toFixed(1)}% Taxes</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 shadow-sm">
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">We've fulfilled our promise to take you to destination for pre-agreed Total Fare. Modifying the drop/route can change this fare.</p>
              </div>
            </div>
          </div>

          {/* Payment Section - Mobile Optimized */}
          <div className="bg-gradient-to-r from-orange-800 via-red-800 to-blue-900 text-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
                <div className="text-center sm:text-left">
                  <p className="text-orange-200 text-sm">Payment</p>
                  <p className="text-lg sm:text-2xl font-bold">Paid by {data.paymentMethod}</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-3xl sm:text-4xl font-bold">₹{Math.round(totalBill)}</p>
              </div>
            </div>
          </div>

          {/* Footer - Mobile Optimized */}
          <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-blue-100 p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <div>
                <p className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Invoice Information</p>
                <p className="mb-1">Service Tax Category: Renting of Cab</p>
                <p className="mb-1">Invoice Date: {data.date}</p>
                <p className="font-bold text-gray-800 mt-2 sm:mt-3">Original Tax Invoice</p>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Customer Support</p>
                <p className="mb-1">In case of any complaint/grievance against this invoice, write to us at</p>
                <p className="font-bold text-orange-700 mb-1">{data.companyName}</p>
                <p>Mobile: {data.mobileNumber}</p>
              </div>
            </div>
            
            <div className="border-t border-orange-200 pt-3 sm:pt-4 text-xs text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700">Please note:</p>
              <p>1. This invoice is issued on behalf of Transport Service Provider.</p>
              <p>2. This is an electronically generated invoice and does not require a digital signature.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}