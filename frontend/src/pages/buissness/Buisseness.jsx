import React, { useState } from 'react';
// Assuming your Sidebar component is exported as default or named export from './Sidebar'
import Sidebar from './SideBar'; 
// If your file is named 'Buisseness.jsx', you'd export default function Buisseness() { ... }

// --- Utility Components (Defined here for the main UI) ---

// Reusable Tailwind classes for form inputs
const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-150 ease-in-out text-gray-800";

const Header = () => (
  <header className="flex justify-end items-center h-16 bg-white px-8 border-b border-gray-100 flex-shrink-0">
    <nav className="flex space-x-6 text-sm font-medium text-gray-600">
      <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1">Dashboard</a>
      <a href="#" className="hover:text-gray-800">Listings</a>
      <a href="#" className="hover:text-gray-800">Campaigns</a>
      <a href="#" className="hover:text-gray-800">Orders</a>
    </nav>
    <div className="ml-6 flex items-center space-x-4">
      <span className="text-gray-400">🔔</span>
      <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
          {/* Placeholder for user image */}
      </div>
    </div>
  </header>
);

const StepIndicator = ({ number, title, current }) => (
  <div className="flex items-center">
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold ${
        current ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
      }`}
    >
      {number}
    </div>
    <span
      className={`ml-2 text-sm font-medium ${
        current ? 'text-gray-800' : 'text-gray-500'
      } hidden sm:block`}
    >
      {title}
    </span>
  </div>
);

const Stepper = ({ currentStep }) => (
  // Adjusted spacing and layout for the Stepper to look exactly like the image
  <div className="flex items-center space-x-4 mb-10 border-b border-gray-200 pb-6 w-full max-w-[800px] mx-auto">
    <StepIndicator number={1} title="Business Information" current={currentStep === 1} />
    <div className={`flex-grow h-px ${currentStep > 1 ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
    <StepIndicator number={2} title="Founder & Contact" current={currentStep === 2} />
    <div className={`flex-grow h-px ${currentStep > 2 ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
    <StepIndicator number={3} title="Legal & Verification" current={currentStep === 3} />
  </div>
);

const FormGroup = ({ label, value, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children ? (
      children
    ) : (
      <input
        type="text"
        defaultValue={value}
        className="form-input"
      />
    )}
  </div>
);

const BusinessInformationStep = ({ setStep }) => (
  <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-8 text-gray-800">Business Information</h2>

    <div className="space-y-6">
      {/* Business Name */}
      <FormGroup label="Business Name" value="Acme Crowdfunding PLC" />

      {/* Business Type (Select) */}
      <FormGroup label="Business Type">
        <select className="form-input" defaultValue="">
          <option value="" disabled>Select Business Type</option>
          <option>PLC</option>
          {/* ... other options */}
        </select>
      </FormGroup>

      {/* Industry (Select) */}
      <FormGroup label="Industry">
        <select className="form-input" defaultValue="">
          <option value="" disabled>Select Industry</option>
          <option>Tech</option>
          {/* ... other options */}
        </select>
      </FormGroup>

      {/* Business Description (Textarea) */}
      <FormGroup label="Business Description">
        <textarea
          className="form-input h-32 resize-none"
          placeholder="Tell us about your business and its mission."
        />
      </FormGroup>

      {/* Company Logo */}
      <div className="pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Logo
        </label>
        <div className="text-sm text-gray-500">
          Upload your company logo (max 5MB, PNG/JPG).
        </div>
      </div>
    </div>
    
    {/* Navigation Buttons */}
    <div className="flex justify-between mt-10">
      <button
        onClick={() => console.log('Back clicked')}
        className="text-gray-500 font-medium py-2 px-4 rounded-lg hover:text-gray-700"
      >
        Back
      </button>
      <button
        onClick={() => setStep(2)} // Move to next step
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out"
      >
        Next
      </button>
    </div>
  </div>
);


// --- Main Business Onboarding Component ---

export default function BusinessOnboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex h-screen bg-gray-50 antialiased">
      {/* 1. Sidebar - Imported Component */}
      <Sidebar />
      
      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pt-10 px-10">
          <div className="w-full flex flex-col items-start max-w-[800px] mx-auto">
            
            <h1 className="text-3xl font-bold mb-10 text-gray-800">
              Business Sign-up & Onboarding
            </h1>
            
            <Stepper currentStep={step} />
            
            <div className="mt-8 w-full flex justify-center">
              {step === 1 && <BusinessInformationStep setStep={setStep} />}
              {/* Placeholder for other steps */}
              {step === 2 && <div>Founder & Contact Form...</div>}
              {step === 3 && <div>Legal & Verification Form...</div>}
            </div>
            
          </div>
        </main>
        
        {/* Footer/Legal part shown in the bottom of your image */}
        <footer className="h-12 bg-white border-t border-gray-100 flex items-center justify-between px-10 text-sm text-gray-500 flex-shrink-0">
          <div>Legal</div>
          <div className="flex space-x-4">
              {/* Social Icons Placeholder */}
              <span>in</span>
              <span>twitter</span>
              <span>facebook</span>
          </div>
        </footer>
      </div>
      
      {/* Inject the form-input style for this example */}
      <style jsx global>{`
        .form-input {
          ${inputClasses}
        }
      `}</style>
    </div>
  );
};