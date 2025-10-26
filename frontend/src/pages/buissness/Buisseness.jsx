import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Component/context/AuthContext';

// --- Utility Components ---

// Reusable Tailwind classes for form inputs
const inputClasses =
  "w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800";
const fileInputClasses =
  "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer transition-all duration-200";

const StepIndicator = ({ number, title, current }) => (
  <div className="flex items-center">
    {" "}
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${current ? "bg-orange-600 text-white shadow-md" : "bg-gray-200 text-gray-500"
        }`}
    >
      {number}   {" "}
    </div>
    {" "}
    <span
      className={`ml-2 text-sm font-medium ${current ? "text-gray-800" : "text-gray-500"
        } hidden sm:block`}
    >
      {title}   {" "}
    </span>
    {" "}
  </div>
);

const Stepper = ({ currentStep }) => (
  <div className="flex items-center space-x-4 mb-10 border-b border-gray-200 pb-6 w-full max-w-[800px] mx-auto">
    {" "}
    <StepIndicator
      number={1}
      title="Business Information"
      current={currentStep === 1}
    />
    {" "}
    <div
      className={`flex-grow h-px transition-all duration-300 ${currentStep > 1 ? "bg-orange-600" : "bg-gray-300"
        }`}
    ></div>
    {" "}
    <StepIndicator
      number={2}
      title="Founder & Contact"
      current={currentStep === 2}
    />
    {" "}
  </div>
);


// --- Step 1 Component (Business Information) ---
const BusinessInformationStep = ({ setStep, formData, setFormData }) => (
  <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
    {" "}
    <h2 className="text-2xl font-bold mb-8 text-gray-800">
      Business Information
    </h2>
    {" "}
    <div className="space-y-6">
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Name
        </label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          placeholder="Enter your business name"
          className={inputClasses}
          required
        />
      </div>
      
      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Type
        </label>
        <select 
          className={inputClasses}
          value={formData.businessType}
          onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
          required
        >
          <option value="" disabled>Select Business Type</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          <option value="PLC">PLC</option>
          <option value="LLC">LLC</option>
          <option value="Partnership">Partnership</option>
        </select>
      </div>
      
      {/* Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <select 
          className={inputClasses}
          value={formData.industry}
          onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
          required
        >
          <option value="" disabled>Select Industry</option>
          <option value="Technology">Technology</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      {/* Business Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Description
        </label>
        <textarea
          className={`${inputClasses} h-32 resize-none`}
          placeholder="Tell us about your business and its mission."
          value={formData.businessDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
          required
        />
      </div>
    </div>
    {/* Navigation Buttons */}   {" "}
    <div className="flex justify-between mt-10">
      {" "}
      <button
        onClick={() => console.log("This is the first step!")}
        className="text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
        disabled
      >
        Back      {" "}
      </button>
      {" "}
      <button
        onClick={() => setStep(2)}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!formData.businessName || !formData.businessType || !formData.industry || !formData.businessDescription}
      >
        Next      {" "}
      </button>
      {" "}
    </div>
    {" "}
  </div>
);

// --- Step 2 Component (Founder & Contact) ---
const FounderContactStep = ({ setStep, formData, setFormData, onSubmit, loading, error }) => (
  <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
    {" "}
    <h2 className="text-2xl font-bold mb-8 text-gray-800">
      Founder & Contact Details
    </h2>
    
    {/* Error Display */}
    {error && (
      <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    )}
    
    <div className="space-y-6">
      {/* Founder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Founder's Full Name
        </label>
        <input
          type="text"
          value={formData.founderName}
          onChange={(e) => setFormData(prev => ({ ...prev, founderName: e.target.value }))}
          placeholder="Jane Doe"
          className={inputClasses}
          required
        />
      </div>
      
      {/* Founder Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Founder's Title
        </label>
        <input
          type="text"
          value={formData.founderTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, founderTitle: e.target.value }))}
          placeholder="CEO / Managing Director"
          className={inputClasses}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Contact Email
          </label>
          <input
            type="email"
            value={formData.businessEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, businessEmail: e.target.value }))}
            placeholder="contact@acme.com"
            className={inputClasses}
            required
          />
        </div>
        
        {/* Business Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Phone Number
          </label>
          <input
            type="tel"
            value={formData.businessPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, businessPhone: e.target.value }))}
            placeholder="+251 912345678"
            className={inputClasses}
            required
          />
        </div>
      </div>
      
      {/* Primary Business Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Business Location
        </label>
        <input
          type="text"
          value={formData.businessLocation}
          onChange={(e) => setFormData(prev => ({ ...prev, businessLocation: e.target.value }))}
          placeholder="Addis Ababa, Ethiopia"
          className={inputClasses}
          required
        />
      </div>
    </div>
    {/* Navigation Buttons */}   {" "}
    <div className="flex justify-between mt-10">
      {" "}
      <button
        onClick={() => setStep(1)} // Go back to Step 1
        className="text-gray-500 font-medium py-2 px-4 rounded-lg hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
      >
        Back      {" "}
      </button>
      {" "}
      <button
        onClick={onSubmit} // Submit the form
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || !formData.founderName || !formData.founderTitle || !formData.businessEmail || !formData.businessPhone || !formData.businessLocation}
      >
        {loading ? 'Submitting...' : 'Complete Registration'}
      </button>
      {" "}
    </div>
    {" "}
  </div>
);


// --- Main Business Onboarding Component ---

export default function BusinessOnboarding() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: '',
    businessType: '',
    industry: '',
    businessDescription: '',
    
    // Step 2: Founder & Contact
    founderName: '',
    founderTitle: '',
    businessEmail: '',
    businessPhone: '',
    businessLocation: ''
  });

  // Handle form submission - save to local storage
  const handleSubmit = () => {
    setError(null);
    setLoading(true);

    try {
      // Prepare business data
      const businessData = {
        ...formData,
        registrationDate: new Date().toISOString(),
        status: 'active'
      };

      // Save to local storage
      localStorage.setItem('businessRegistration', JSON.stringify(businessData));
      
      // Also save to user profile in local storage
      const userProfile = {
        businessRegistered: true,
        businessRegistrationCompletedAt: new Date().toISOString()
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));

      console.log("Business registration completed successfully and saved to local storage!");
      
      // Redirect to business dashboard
      navigate('/b');

    } catch (err) {
      console.error("Error registering business:", err);
      setError(`Failed to register business: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BusinessInformationStep setStep={setStep} formData={formData} setFormData={setFormData} />;
      case 2:
        return <FounderContactStep setStep={setStep} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} loading={loading} error={error} />;
      default:
        return <div>Step Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 antialiased flex flex-col">
      {/* Main Content Area (Full width and centered) */}     {" "}
      <div className="flex-1 flex flex-col overflow-hidden">
        {" "}
        <main className="flex-1 overflow-y-auto pt-10 px-6 sm:px-10 pb-20">
          {" "}
          <div className="w-full flex flex-col items-start max-w-[800px] mx-auto">
            {" "}
            <h1 className="text-3xl font-bold mb-10 text-gray-800 text-center w-full">
              Business Sign-up & Onboarding            {" "}
            </h1>
            <Stepper currentStep={step} />
            {" "}
            <div className="mt-8 w-full flex justify-center">
              {renderStep()}           {" "}
            </div>
            {" "}
          </div>
          {" "}
        </main>
        {/* Footer/Legal part */}       {" "}
        <footer className="h-12 bg-white border-t border-gray-100 flex items-center justify-between px-10 text-sm text-gray-500 flex-shrink-0">
          <div>Legal</div>         {" "}
          <div className="flex space-x-4">
            <span>in</span>              <span>twitter</span>
            <span>facebook</span>         {" "}
          </div>
          {" "}
        </footer>
        {" "}
      </div>
      {/* Inject the form-input style */}     {" "}
    </div>
  );
}

