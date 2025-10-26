import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from '../../Component/context/AuthContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Custom Data from the User's Initial Request ---
const recentOrders = [
  {
    id: "ETH001",
    name: "Sara Kebede",
    item: "Custom T-Shirt",
    amount: "500 ETB",
    type: "Donation",
  },
  {
    id: "ETH002",
    name: "Abeba Fitsui",
    item: "Handmade Leather Bag",
    amount: "1,200 ETB",
    type: "Reward",
  },
  {
    id: "ETH003",
    name: "Chaltu Lemma",
    item: "Organic Coffee Subscription",
    amount: "350 ETB",
    type: "Donation",
  },
  {
    id: "ETH004",
    name: "Darwit Tesfaye",
    item: "Ethio-Tech Smartwatch",
    amount: "2,500 ETB",
    type: "Donation",
  },
  {
    id: "ETH005",
    name: "Zenawi Hailu",
    item: "Traditional Art Print",
    amount: "800 ETB",
    type: "Pending Shipping",
  },
];

const activeCampaigns = [
  { title: "Sustainable Coffee Farm Expansion", raised: 35000, goal: 50000 },
  { title: "Handmade Leather Goods Collection", raised: 19000, goal: 25000 },
  { title: "Ethio-Tech Smart Home Devices", raised: 70000, goal: 100000 },
];

// --- Helper Component: Recent Orders Table ---
const RecentOrdersTable = () => {


  
  const getTypeStyle = (type) => {
    switch (type) {
      case "Donation":
        return "bg-green-100 text-green-800";
      case "Reward":
        return "bg-blue-100 text-blue-800";
      case "Pending Shipping":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Customer Name", "Item", "Amount", "Type"].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600">
                {order.id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {order.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {order.item}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {order.amount}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeStyle(
                    order.type
                  )}`}
                >
                  {order.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Helper Component: Campaign Progress Card ---
const CampaignProgressCard = ({ title, raised, goal }) => {
  const percentage = Math.round((raised / goal) * 100);

  // Adjusted color logic to match the requested orange-dominant dashboard theme
  let colorClass = "bg-orange-600";
  if (percentage >= 100) {
    colorClass = "bg-green-600"; // Success color
  }

  const formatAmount = (amount) => `$${amount.toLocaleString()}`;

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-100 mb-3 last:mb-0">
      <h4 className="text-sm font-semibold text-gray-800 truncate mb-1">
        {title}
      </h4>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">
          Raised:{" "}
          <strong className="text-gray-700">{formatAmount(raised)}</strong>
        </span>
        <span className="text-gray-500">
          Goal: <strong className="text-gray-700">{formatAmount(goal)}</strong>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>

      {/* Percentage Label */}
      <div className="text-right text-xs font-bold mt-1 text-gray-700">
        {percentage}%
      </div>
    </div>
  );
};

// --- Main Dashboard Component (Combining your structure and the data views) ---

// Dummy data based on the image's "Campaign Views" graph
const chartData = [
  { name: "Mon", views: 8000 },
  { name: "Tue", views: 12500 },
  { name: "Wed", views: 10000 },
  { name: "Thu", views: 15000 },
  { name: "Fri", views: 13000 },
  { name: "Sat", views: 16000 },
  { name: "Sun", views: 18000 },
];

// Helper component for the dashboard statistics cards (as provided by the user)
const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <div className="flex items-end justify-between mt-1">
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      <span
        className={`text-sm font-semibold ${
          change.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {change}
      </span>
    </div>
  </div>
);

const DashboardPage = () => {
  const { userProfile } = useAuth();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  // Check if this is a newly registered business
  useEffect(() => {
    // Check local storage for business registration
    const userProfileData = localStorage.getItem('userProfile');
    if (userProfileData) {
      const profile = JSON.parse(userProfileData);
      if (profile.businessRegistrationCompletedAt) {
        const registrationDate = new Date(profile.businessRegistrationCompletedAt);
        const now = new Date();
        const hoursSinceRegistration = (now - registrationDate) / (1000 * 60 * 60);
        
        // Show welcome message if registered within the last 24 hours
        if (hoursSinceRegistration < 24) {
          setShowWelcomeMessage(true);
        }
      }
    }
  }, []);

  // Dummy data for the stat cards, based on the image's structure
  const stats = [
    { title: "Total Listings", value: "1,248", change: "+12%" },
    { title: "New Leads", value: "450", change: "+8%" },
    { title: "Campaign Clicks", value: "25,600", change: "+21%" },
    { title: "Engagement Rate", value: "18.5%", change: "-1.2%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Welcome Message for New Businesses */}
      {showWelcomeMessage && (
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Welcome to EthioLink!
                </h3>
                <p className="text-green-700 mb-4">
                  Your business registration is complete! You're now ready to start showcasing your products to potential supporters and investors. 
                  Click the button below to upload your first product.
                </p>
                <Link to="/create">
                  <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200">
                    Upload Your First Product
                  </button>
                </Link>
              </div>
            </div>
            <button
              onClick={() => setShowWelcomeMessage(false)}
              className="text-green-600 hover:text-green-800 transition duration-150"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Header/Actions (Matching image style) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Business Dashboard
        </h1>
        <div className="space-x-4">
          <Link to={'/create'}><button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-orange-300 transition-all duration-200" >
            Create New Listing
          </button></Link>
          <button className="px-4 py-2 bg-orange-600 rounded-lg text-sm font-medium text-white hover:bg-orange-700 shadow-md transition-all duration-200">
            Set Up New Campaign
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Graph Card - Campaign Views (Large Card) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Campaign Views Over Time
          </h2>
          <select className="border border-gray-300 rounded-lg p-1 text-sm text-gray-700 focus:ring-orange-500 focus:border-orange-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        {/* The Recharts AreaChart component */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
                formatter={(value) => [
                  new Intl.NumberFormat("en").format(value),
                  "Views",
                ]}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#f97316" // Orange-600
                fillOpacity={1}
                fill="url(#colorViews)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Recent Orders (2/3) and Campaign Progress (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT (2/3): Recent Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">
            Recent Orders 🛒
          </h2>
          <RecentOrdersTable />
        </div>

        {/* RIGHT (1/3): Campaign Progress Cards */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">
            Active Campaigns 🚀
          </h2>
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <CampaignProgressCard key={campaign.title} {...campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
