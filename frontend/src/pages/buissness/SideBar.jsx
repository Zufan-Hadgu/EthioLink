import React from 'react';
// Import the necessary icons from @mui/icons-material
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // For Business Profile
import SettingsIcon from '@mui/icons-material/Settings';     // For Settings
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // For Help & Support
import CreditCardIcon from '@mui/icons-material/CreditCard';   // For Billing & Payments

// --- Updated SidebarLink Component ---
const SidebarLink = ({ IconComponent, text, active = false }) => (
  <div
    className={`flex items-center p-3 rounded-lg cursor-pointer ${
      active
        ? 'bg-orange-100 text-orange-600 font-semibold'
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {/* Use the passed IconComponent instead of a string icon */}
    <span className="mr-3">
      <IconComponent className="w-5 h-5" /> {/* Tailwind for size adjustment */}
    </span>
    {text}
  </div>
);

// --- Updated Sidebar Component ---
const Sidebar = () => (
  <div className="w-64 bg-white p-6 border-r border-gray-100 flex-shrink-0">
   
    <div className="space-y-4">
      {/* Replace icon="📊" with IconComponent={AccountBoxIcon} */}
      <SidebarLink IconComponent={AccountBoxIcon} text="Business Profile" active={true} />
      {/* Replace icon="⚙️" with IconComponent={SettingsIcon} */}
      <SidebarLink IconComponent={SettingsIcon} text="Settings" />
      {/* Replace icon="❓" with IconComponent={HelpOutlineIcon} */}
      <SidebarLink IconComponent={HelpOutlineIcon} text="Help & Support" />
    </div>
    <div className="mt-8 text-xs font-semibold uppercase text-gray-500 tracking-wider">
      Account Management
    </div>
    <div className="mt-4 space-y-4">
      {/* Replace icon="💳" with IconComponent={CreditCardIcon} */}
      <SidebarLink IconComponent={CreditCardIcon} text="Billing & Payments" />
    </div>
  </div>
);

 export default Sidebar;