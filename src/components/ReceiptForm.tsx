import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Receipt, Sparkles } from 'lucide-react';
import aadiYogiLogo from 'figma:asset/b824aa98a0ce9ced05a52d8ec22fd0b553cbe481.png';

export interface ReceiptData {
  date: string;
  driverName: string;
  customerName: string;
  vehicleType: string;
  vehicleRegNo: string;
  invoiceId: string;
  pickupAddress: string;
  dropoffAddress: string;
  rideFee: number | string;
  tollFee: number | string;
  airportCharges: number | string;
  otherCharges: number | string;
  otherChargesDescription: string;
  gstPercentage: number | string;
  paymentMethod: string;
  companyName: string;
  companyAddress: string;
  mobileNumber: string;
}

interface ReceiptFormProps {
  onDataChange: (data: ReceiptData) => void;
  onGenerateReceipt: () => void;
  onReset: () => void;
}

export default function ReceiptForm({ onDataChange, onGenerateReceipt, onReset }: ReceiptFormProps) {
  // Function to generate a new invoice ID
  const generateNewInvoiceId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const [formData, setFormData] = useState<ReceiptData>({
    date: new Date().toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace(/ /g, ' '),
    driverName: 'Harish Kumar Sharma',
    customerName: '',
    vehicleType: 'Wagnor',
    vehicleRegNo: 'RJ 14 TF 7142',
    invoiceId: Math.floor(100000 + Math.random() * 900000).toString(),
    pickupAddress: '',
    dropoffAddress: '',
    rideFee: '',
    tollFee: '',
    airportCharges: '',
    otherCharges: '',
    otherChargesDescription: '',
    gstPercentage: 18,
    paymentMethod: 'Cash',
    companyName: 'Aadi Yogi Taxi Service',
    companyAddress: 'Hatoj Jaipur Rajasthan',
    mobileNumber: '9529522582'
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleInputChange = (field: keyof ReceiptData, value: string | number) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }).replace(/ /g, ' ');
      handleInputChange('date', formattedDate);
      setIsCalendarOpen(false);
    }
  };

  const handleGenerateNewInvoiceId = () => {
    const newId = generateNewInvoiceId();
    handleInputChange('invoiceId', newId);
  };

  const handleReset = () => {
    const resetData = {
      ...formData,
      customerName: '',
      pickupAddress: '',
      dropoffAddress: '',
      rideFee: 0,
      tollFee: 0,
      airportCharges: 0,
      otherCharges: 0,
      otherChargesDescription: '',
      paymentMethod: 'Cash',
      invoiceId: generateNewInvoiceId(),
    };
    setFormData(resetData);
    onDataChange(resetData);
    onReset();
  };

  useEffect(() => {
    onDataChange(formData);
  }, []);

  return (
    <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
      <CardHeader className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-blue-700 text-white p-0 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/90 to-blue-700/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Main Header Content - Mobile Optimized */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
            {/* Logo and Title Row - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              {/* Mobile Layout: Logo + Icon + Title in one line, greeting below */}
              <div className="flex sm:hidden flex-col items-center w-full">
                {/* Logo + Icon + Title Row - All in one line */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Aadi Yogi Logo */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-lg ring-2 ring-white/30">
                      <img 
                        src={aadiYogiLogo} 
                        alt="Aadi Yogi Shiva" 
                        className="w-full h-full object-contain filter drop-shadow-md"
                      />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
                  </div>
                  
                  {/* Receipt Icon */}
                  <Receipt className="w-5 h-5 text-orange-200" />
                  
                  {/* Title Text */}
                  <CardTitle className="text-lg font-bold tracking-wide">
                    Generate Cab Receipt
                  </CardTitle>
                </div>
                
                {/* Greeting text centered */}
                <div className="text-center">
                  <p className="text-orange-100/90 text-sm leading-relaxed">
                    Welcome! Ready to generate your next receipt?
                  </p>
                </div>
              </div>

              {/* Desktop Layout: Logo separate from Title */}
              <div className="hidden sm:flex items-center justify-center gap-4 w-full">
                {/* Aadi Yogi Logo */}
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-lg ring-2 ring-white/30">
                    <img 
                      src={aadiYogiLogo} 
                      alt="Aadi Yogi Shiva" 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                </div>
                
                {/* Title and Subtitle - Desktop Layout */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-row items-center justify-center sm:justify-start gap-2 mb-1">
                    <Receipt className="w-6 h-6 text-orange-200" />
                    <CardTitle className="text-xl lg:text-2xl font-bold tracking-wide">
                      Generate Cab Receipt
                    </CardTitle>
                  </div>
                  <p className="text-orange-100/90 text-base leading-relaxed">
                    Welcome! Ready to generate your next receipt?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-orange-600 to-blue-700">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Date and Invoice - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-gray-700 font-semibold text-sm sm:text-base">Date of Ride</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-300 focus:border-orange-500 focus:ring-orange-500 hover:bg-orange-50 h-10 sm:h-11 text-sm sm:text-base"
                    onClick={() => setIsCalendarOpen(true)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{formData.date}</span>
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="rounded-md border shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceId" className="text-gray-700 font-semibold text-sm sm:text-base">Invoice ID</Label>
            <Input
              id="invoiceId"
              value={formData.invoiceId}
              onChange={(e) => handleInputChange('invoiceId', e.target.value)}
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Personal Information - Mobile Optimized */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-5 sm:h-6 bg-orange-600 rounded"></div>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="driverName" className="text-gray-700 font-semibold text-sm sm:text-base">Driver's Name</Label>
              <Input
                id="driverName"
                value={formData.driverName}
                onChange={(e) => handleInputChange('driverName', e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-gray-700 font-semibold text-sm sm:text-base">Customer's Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Enter customer name"
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Details - Mobile Optimized */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-5 sm:h-6 bg-blue-700 rounded"></div>
            Vehicle Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType" className="text-gray-700 font-semibold text-sm sm:text-base">Vehicle Type</Label>
              <Input
                id="vehicleType"
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleRegNo" className="text-gray-700 font-semibold text-sm sm:text-base">Vehicle Registration No.</Label>
              <Input
                id="vehicleRegNo"
                value={formData.vehicleRegNo}
                onChange={(e) => handleInputChange('vehicleRegNo', e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Trip Route - Mobile Optimized */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-5 sm:h-6 bg-yellow-600 rounded"></div>
            Trip Route
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickupAddress" className="text-gray-700 font-semibold text-sm sm:text-base">Pickup Address *</Label>
              <Input
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                placeholder="Enter pickup location"
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoffAddress" className="text-gray-700 font-semibold text-sm sm:text-base">Drop-off Address *</Label>
              <Input
                id="dropoffAddress"
                value={formData.dropoffAddress}
                onChange={(e) => handleInputChange('dropoffAddress', e.target.value)}
                placeholder="Enter drop-off location"
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Billing Information - Mobile Optimized */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-5 sm:h-6 bg-amber-600 rounded"></div>
            Billing Information
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {/* Top Row - Mobile Stacked */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="rideFee" className="text-gray-700 font-semibold text-sm sm:text-base">Ride Fee (₹) *</Label>
                <Input
                  id="rideFee"
                  type="number"
                  step="0.01"
                  value={formData.rideFee}
                  onChange={(e) => handleInputChange('rideFee', e.target.value === '' ? '' : e.target.value)}
                  placeholder="Enter ride fee"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tollFee" className="text-gray-700 font-semibold text-sm sm:text-base">Toll Convenience Fee (₹)</Label>
                <Input
                  id="tollFee"
                  type="number"
                  step="0.01"
                  value={formData.tollFee}
                  onChange={(e) => handleInputChange('tollFee', e.target.value === '' ? '' : e.target.value)}
                  placeholder="Enter toll fee"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="airportCharges" className="text-gray-700 font-semibold text-sm sm:text-base">Airport Charges (₹)</Label>
                <Input
                  id="airportCharges"
                  type="number"
                  step="0.01"
                  value={formData.airportCharges}
                  onChange={(e) => handleInputChange('airportCharges', e.target.value === '' ? '' : e.target.value)}
                  placeholder="Enter airport charges"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </div>
            
            {/* Bottom Row - Mobile Stacked */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="otherChargesDescription" className="text-gray-700 font-semibold text-sm sm:text-base">Other Charges Description</Label>
                <Input
                  id="otherChargesDescription"
                  value={formData.otherChargesDescription}
                  onChange={(e) => handleInputChange('otherChargesDescription', e.target.value)}
                  placeholder="e.g., Waiting charges"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherCharges" className="text-gray-700 font-semibold text-sm sm:text-base">Other Charges Amount (₹)</Label>
                <Input
                  id="otherCharges"
                  type="number"
                  step="0.01"
                  value={formData.otherCharges}
                  onChange={(e) => handleInputChange('otherCharges', e.target.value === '' ? '' : e.target.value)}
                  placeholder="Enter other charges"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstPercentage" className="text-gray-700 font-semibold text-sm sm:text-base">GST Percentage (%)</Label>
                <Input
                  id="gstPercentage"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.gstPercentage}
                  onChange={(e) => handleInputChange('gstPercentage', e.target.value === '' ? '' : e.target.value)}
                  placeholder="Enter GST percentage"
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Payment & Company Information - Mobile Optimized */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-5 sm:h-6 bg-blue-700 rounded"></div>
            Payment & Company Information
          </h3>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-gray-700 font-semibold text-sm sm:text-base">Payment Method</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
              <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Net Banking">Net Banking</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Company Information - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-gray-700 font-semibold text-sm sm:text-base">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyAddress" className="text-gray-700 font-semibold text-sm sm:text-base">Company Address</Label>
              <Input
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber" className="text-gray-700 font-semibold text-sm sm:text-base">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Action Buttons - Mobile Optimized */}
        <div className="flex flex-col gap-3 pt-2 sm:pt-4">
          <Button 
            onClick={onGenerateReceipt} 
            className="w-full bg-gradient-to-r from-orange-600 to-blue-700 hover:from-orange-700 hover:to-blue-800 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg h-12 sm:h-14"
          >
            Generate & Download Receipt
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14"
          >
            Clear Form
          </Button>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4 leading-relaxed">
          * Required fields. PDF will be automatically downloaded after generation.
        </p>
      </CardContent>
    </Card>
  );
}