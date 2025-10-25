import React, { useState } from "react";

// --- Utility Components ---

// Reusable Tailwind classes for form inputs
const inputClasses =
  "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-150 ease-in-out text-gray-800";
const fileInputClasses =
  "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer";

const StepIndicator = ({ number, title, current }) => (
  <div className="flex items-center">
    {" "}
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold ${current ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
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
      className={`flex-grow h-px ${currentStep > 1 ? "bg-orange-600" : "bg-gray-300"
        }`}
    ></div>
    {" "}
    <StepIndicator
      number={2}
      title="Founder & Contact"
      current={currentStep === 2}
    />
    {" "}
    <div
      className={`flex-grow h-px ${currentStep > 2 ? "bg-orange-600" : "bg-gray-300"
        }`}
    ></div>
    {" "}
    <StepIndicator
      number={3}
      title="Legal & Verification"
      current={currentStep === 3}
    />
    {" "}
  </div>
);

const FormGroup = ({ label, type = "text", value, placeholder, children }) => (
  <div>
    {" "}
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}   {" "}
    </label>
    {" "}
    {children ? (
      children
    ) : (
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className={type === "file" ? fileInputClasses : "form-input"}
      />
    )}
    {" "}
  </div>
);

// --- Step 1 Component (Business Information) ---
const BusinessInformationStep = ({ setStep }) => (
  <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
    {" "}
    <h2 className="text-2xl font-bold mb-8 text-gray-800">
      Business Information
    </h2>
    {" "}
    <div className="space-y-6">
      {/* Existing forms */}
      <FormGroup label="Business Name" value="Acme Crowdfunding PLC" />
      {" "}
      <FormGroup label="Business Type">
        {" "}
        <select className="form-input" defaultValue="PLC">
          {" "}
          <option value="" disabled>
            Select Business Type
          </option>
          <option>Sole Proprietorship</option>         {" "}
          <option value="PLC">PLC</option>       {" "}
        </select>
        {" "}
      </FormGroup>
      {" "}
      <FormGroup label="Industry">
        {" "}
        <select className="form-input" defaultValue="Tech">
          {" "}
          <option value="" disabled>
            Select Industry
          </option>
          <option value="Tech">Tech</option>         {" "}
          <option>Finance</option>       {" "}
        </select>
        {" "}
      </FormGroup>
      {" "}
      <FormGroup label="Business Description">
        {" "}
        <textarea
          className="form-input h-32 resize-none"
          placeholder="Tell us about your business and its mission."
        />
        {" "}
      </FormGroup>
      {" "}
    </div>
    {/* Navigation Buttons */}   {" "}
    <div className="flex justify-between mt-10">
      {" "}
      <button
        onClick={() => console.log("This is the first step!")}
        className="text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
        disabled
      >
        Back      {" "}
      </button>
      {" "}
      <button
        onClick={() => setStep(2)}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out"
      >
        Next      {" "}
      </button>
      {" "}
    </div>
    {" "}
  </div>
);

// --- Step 2 Component (Founder & Contact) ---
const FounderContactStep = ({ setStep }) => (
  <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
    {" "}
    <h2 className="text-2xl font-bold mb-8 text-gray-800">
      Founder & Contact Details
    </h2>
    {" "}
    <div className="space-y-6">
      {/* Founder Name */}
      <FormGroup label="Founder's Full Name" placeholder="Jane Doe" />
      {/* Founder Title */}
      {" "}
      <FormGroup
        label="Founder's Title"
        placeholder="CEO / Managing Director"
      />
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Email */}
        {" "}
        <FormGroup
          label="Business Contact Email"
          type="email"
          placeholder="contact@acme.com"
        />
        {/* Business Phone */}
        {" "}
        <FormGroup
          label="Business Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
        {" "}
      </div>
      {/* Primary Business Location */}
      {" "}
      <FormGroup
        label="Primary Business Location"
        placeholder="123 Main St, City, Country"
      />
      {" "}
    </div>
    {/* Navigation Buttons */}   {" "}
    <div className="flex justify-between mt-10">
      {" "}
      <button
        onClick={() => setStep(1)} // Go back to Step 1
        className="text-gray-500 font-medium py-2 px-4 rounded-lg hover:text-gray-700 transition duration-150 ease-in-out"
      >
        Back      {" "}
      </button>
      {" "}
      <button
        onClick={() => setStep(3)} // Move to next step
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out"
      >
        Next      {" "}
      </button>
      {" "}
    </div>
    {" "}
  </div>
);

// --- Step 3 Component (Legal & Verification) ---
const LegalVerificationStep = ({ setStep }) => (
  <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
    {" "}
    <h2 className="text-2xl font-bold mb-8 text-gray-800">
      Legal & Verification
    </h2>
    {" "}
    <div className="space-y-6">
      {/* Official Registration Number */}
      {" "}
      <FormGroup
        label="Official Company Registration Number"
        placeholder="e.g., UK company number: 12345678"
      />
      {/* Tax Identification Number (TIN) Upload */}     {" "}
      <div>
        {" "}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Tax Identification Number (TIN) Certificate 📄
          {" "}
        </label>
        {" "}
        <FormGroup type="file">
          {" "}
          <input
            type="file"
            className={fileInputClasses}
            accept=".pdf,.jpg,.png"
          />
          {" "}
        </FormGroup>
        {" "}
        <p className="mt-1 text-xs text-gray-500">
          Accepted formats: PDF, JPG, PNG. Max size: 10MB.        {" "}
        </p>
        {" "}
      </div>
      <hr className="border-t border-gray-200" />     {" "}
      {/* Bank Account Details */}
      {" "}
      <FormGroup
        label="Business Bank Account Name"
        placeholder="Acme Crowdfunding PLC"
      />
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {" "}
        <FormGroup
          label="IBAN/Account Number"
          placeholder="GB98 BARC 2000 0012 3456 78"
        />
        <FormGroup label="SWIFT/BIC Code" placeholder="BARCGB22" />     {" "}
      </div>
      {/* Compliance Check */}     {" "}
      <div className="flex items-start pt-4">
        {" "}
        <input
          id="compliance"
          type="checkbox"
          className="mt-1 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
        />
        {" "}
        <label
          htmlFor="compliance"
          className="ml-3 block text-sm text-gray-700"
        >
          I confirm that the business is compliant with all local tax
          and legal regulations.        {" "}
        </label>
        {" "}
      </div>
      {" "}
    </div>
    {/* Navigation Buttons */}   {" "}
    <div className="flex justify-between mt-10">
      {" "}
      <button
        onClick={() => setStep(2)} // Go back to Step 2
        className="text-gray-500 font-medium py-2 px-4 rounded-lg hover:text-gray-700 transition duration-150 ease-in-out"
      >
        Back      {" "}
      </button>
      {" "}
      <button
        onClick={() => console.log("SUBMITTING FORM...")} // Final submission
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out"
      >
        Submit & Complete      {" "}
      </button>
      {" "}
    </div>
    {" "}
  </div>
);

// --- Main Business Onboarding Component ---

export default function BusinessOnboarding() {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BusinessInformationStep setStep={setStep} />;
      case 2:
        return <FounderContactStep setStep={setStep} />;
      case 3:
        return <LegalVerificationStep setStep={setStep} />;
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
      <style jsx global>{`
        .form-input {
          ${inputClasses}
        }
      `}</style>
      {" "}
    </div>
  );
}

