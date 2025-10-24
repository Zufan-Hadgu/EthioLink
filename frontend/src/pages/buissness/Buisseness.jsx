import React, { useState } from 'react';

const BusinessOnboarding = () => {
  const [step, setStep] = useState(1);

  // --- Utility Components ---

  const Sidebar = () => (
    <div className="w-64 bg-white p-6 border-r border-gray-100 flex-shrink-0">
      <div className="text-xl font-semibold mb-8 text-orange-600">EthioCrowd</div>
      <div className="space-y-4">
        <SidebarLink icon="📊" text="Business Profile" active={true} />
        <SidebarLink icon="⚙️" text="Settings" />
        <SidebarLink icon="❓" text="Help & Support" />
      </div>
      <div className="mt-8 text-xs font-semibold uppercase text-gray-500 tracking-wider">
        Account Management
      </div>
      <div className="mt-4 space-y-4">
        <SidebarLink icon="💳" text="Billing & Payments" />
      </div>
    </div>
  );

  const SidebarLink = ({ icon, text, active = false }) => (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer ${
        active
          ? 'bg-orange-100 text-orange-600 font-semibold'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {text}
    </div>
  );

  const Header = () => (
    <header className="flex justify-end items-center h-16 bg-white px-8 border-b border-gray-100">
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
        className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-semibold ${
          current ? 'bg-orange-600' : 'bg-gray-300 text-gray-600'
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
    <div className="flex items-center space-x-4 mb-10">
      <StepIndicator number={1} title="Business Information" current={currentStep === 1} />
      <div className={`flex-grow h-px ${currentStep > 1 ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
      <StepIndicator number={2} title="Founder & Contact" current={currentStep === 2} />
      <div className={`flex-grow h-px ${currentStep > 2 ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
      <StepIndicator number={3} title="Legal & Verification" current={currentStep === 3} />
    </div>
  );

  // --- Step 1: Business Information Content ---

  const BusinessInformationStep = () => (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Business Information</h2>

      <div className="space-y-6">
        <FormGroup label="Business Name" value="Acme Crowdfunding PLC" placeholder="Enter business name" />
        <FormGroup label="Business Type">
          <select className="form-input" defaultValue="">
            <option value="" disabled>Select Business Type</option>
            <option>PLC</option>
            <option>Sole Proprietorship</option>
            <option>Partnership</option>
          </select>
        </FormGroup>
        <FormGroup label="Industry">
          <select className="form-input" defaultValue="">
            <option value="" disabled>Select Industry</option>
            <option>Tech</option>
            <option>Finance</option>
            <option>Agriculture</option>
          </select>
        </FormGroup>
        <FormGroup label="Business Description">
          <textarea
            className="form-input h-32 resize-none"
            placeholder="Tell us about your business and its mission."
          />
        </FormGroup>

        <div className="pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>
          <div className="text-sm text-gray-500">
            Upload your company logo (max 5MB, PNG/JPG).
          </div>
          {/* Note: In a real app, this would be a file upload component */}
        </div>
      </div>
      
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

  const FormGroup = ({ label, value, placeholder, children }) => (
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
          placeholder={placeholder}
          className="form-input"
        />
      )}
    </div>
  );

  // Define a reusable Tailwind class for form inputs/selects/textareas
  // For the exact style, we'll use a light border, rounded corners, and padding.
  // Note: I'm defining this as a global class for simplicity here, but in a real project,
  // you might use a CSS file or a dedicated form component.
  // In this example, I'll apply the classes directly and use an artificial `form-input` for brevity.
  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-150 ease-in-out text-gray-800";


  return (
    <div className="flex h-screen bg-gray-50 antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-10">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">
            Business Sign-up & Onboarding
          </h1>
          <Stepper currentStep={step} />
          <div className="mt-8">
            {step === 1 && <BusinessInformationStep />}
            {/* You would add components for step 2 and 3 here */}
            {step === 2 && <div>Founder & Contact Form...</div>}
            {step === 3 && <div>Legal & Verification Form...</div>}
          </div>
        </main>
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

export default BusinessOnboarding;