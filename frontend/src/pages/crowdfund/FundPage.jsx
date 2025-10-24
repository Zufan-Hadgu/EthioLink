import React, { useState } from "react";
import {Link} from 'react-router-dom'

const supportTiers = [
  {
    id: "earlyBird",
    name: "Early Bird Special",
    price: 50,
    description: "Get exclusive early access and a digital thank you.",
    limited: 100,
  },
  {
    id: "supporterPack",
    name: "Supporter Pack",
    price: 100,
    description: "Receive a digital art pack and mention on our website.",
    limited: null,
  },
  {
    id: "foundersCircle",
    name: "Founder's Circle",
    price: 250,
    description: "All previous rewards plus a personalized video message.",
    limited: 20,
  },
];

const paymentMethods = [
  { id: "telebirr", name: "Telebirr", icon: "📞" },
  { id: "cbeBirr", name: "CBE Birr", icon: "🏦" },
  { id: "amole", name: "Amole", icon: "💰" },
  { id: "helloCash", name: "HelloCash", icon: "📱" },
  { id: "flutterwave", name: "Flutterwave", icon: "🌊" },
  { id: "chapa", name: "Chapa", icon: "🔗" },
];

const TierCard = ({ tier, isSelected, onSelect }) => (
  <div
    className={`flex-1 p-5 rounded-lg border-2 cursor-pointer transition duration-200 min-h-[180px] 
      ${
        isSelected
          ? "border-orange-500 shadow-md"
          : "border-gray-200 hover:border-gray-400"
      }`}
    onClick={() => onSelect(tier.id)}
  >
    <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
    <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
    <p className="text-xl font-bold text-orange-500 mb-2">${tier.price}.00</p>
    {tier.limited && (
      <p className="text-xs font-semibold bg-green-500 text-white px-3 py-1 rounded-full inline-block min-w-[80px] text-cente">
        Limited: {tier.limited} left
      </p>
    )}
  </div>
);

const PaymentTile = ({ method, isSelected, onSelect }) => (
  <div
    className={`p-4 rounded-lg border-2 text-center cursor-pointer transition duration-200 
      ${
        isSelected
          ? "border-orange-500 shadow-sm bg-orange-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    onClick={() => onSelect(method.id)}
  >
    <div className="text-2xl mb-1">{method.icon}</div>
    <p className="text-sm font-medium text-gray-700">{method.name}</p>
  </div>
);

const SupportPage = () => {
  const [selectedTierId, setSelectedTierId] = useState(null); // No default tier selected
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState("");

  const selectedTier = supportTiers.find((t) => t.id === selectedTierId);
  const amountToContribute = customAmount
    ? parseFloat(customAmount)
    : selectedTier?.price || 0;
  const isConfirmDisabled = amountToContribute <= 0 || !selectedPaymentId;

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    alert(`Contribution confirmed! Amount: $${amountToContribute}`);
  };

  const profile = { avatarUrl: "https://via.placeholder.com/40" };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      

      <div className="max-w-4xl mx-auto w-full mt-5 px-3">
        <Link to="/"><a
          href="#back"
          className="text-orange-500 hover:text-gray-800 text-sm inline-block mb-1"
        >
          ← Back to Detail
        </a></Link>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full bg-white mt-10 mb-10 p-6 sm:p-10 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
          Support EthioLink Venture
        </h1>

        {/* Selected Tier Summary */}
        <section className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg mb-8">
          <p className="text-base text-gray-700">
            You are supporting:{" "}
            {selectedTier ? (
              <>
                <span className="font-semibold text-gray-900">
                  {selectedTier.name}
                </span>
                <span className="font-bold ml-2">(${selectedTier.price})</span>
              </>
            ) : (
              <span className="text-gray-500">No tier selected</span>
            )}
          </p>
          <button className="flex items-center text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Change Selection →
          </button>
        </section>

        {/* Choose Your Support */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Choose Your Support
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            {supportTiers.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                isSelected={tier.id === selectedTierId}
                onSelect={() => {
                  setSelectedTierId(tier.id);
                  setCustomAmount("");
                }}
              />
            ))}
          </div>
        </section>

        {/* Custom Donation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Or Make a Custom Donation
          </h2>
          <div className="flex max-w-4xl mx-auto  w-full border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 px-4 flex items-center text-gray-500 font-medium">
              $
            </span>
            <input
              type="text"
              placeholder="Enter amount"
              className="flex-1 p-3 focus:outline-none focus:ring-1 focus:ring-orange-500 border-none"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val)) {
                  setCustomAmount(val);
                  if (val) setSelectedTierId(null);
                }
              }}
            />
          </div>
        </section>

        {/* Payment Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Choose Payment Method
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <PaymentTile
                key={method.id}
                method={method}
                isSelected={method.id === selectedPaymentId}
                onSelect={setSelectedPaymentId}
              />
            ))}
          </div>
        </section>

        {/* Legal + Confirm */}
        <section className="text-center">
          <p className="text-xs text-gray-500 mb-4">
            By clicking "Confirm Contribution", you agree to our{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Terms of Service
            </a>{" "}
            and acknowledge our{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <button
            className={`max-w-4xl mx-auto py-2 w-full rounded-md text-white font-semibold transition duration-200 ${
              isConfirmDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            Confirm Contribution
          </button>
        </section>
      </main>
    </div>
  );
};

export default SupportPage;
