import React, { useState } from "react";

const accountSettingsNav = [
  { id: "profile", label: "Profile Details", icon: "👤", active: true },
  { id: "preferences", label: "Preferences", icon: "⚙️", active: false },
  { id: "notifications", label: "Notifications", icon: "🔔", active: false },
  { id: "billing", label: "Billing & Subscription", icon: "💳", active: false },
  { id: "security", label: "Security", icon: "🔒", active: false },
];

const InputField = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  type = "text",
  readOnly = false,
}) => (
  <div className="mb-6 max-w-xl">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 
        ${
          readOnly
            ? "bg-gray-100 text-gray-500 cursor-default"
            : "border-gray-300"
        }`}
    />
  </div>
);

const TextAreaField = ({ label, id, value, onChange, placeholder = "" }) => (
  <div className="mb-6 max-w-xl">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="5"
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
    />
  </div>
);

const ProfileDetailsPage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    avatarUrl: "https://via.placeholder.com/150/ff9900/ffffff?text=AW",
    address: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving profile changes:", profile);
    alert("Profile changes saved successfully!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <span className="text-2xl font-bold text-orange-600">EthioLink</span>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search your profile or settings..."
              className="px-3 py-1 border border-gray-300 rounded-md text-sm w-64 focus:ring-orange-500 focus:border-orange-500"
            />
            <button className="text-xl text-gray-600 hover:text-orange-500">
              🔔
            </button>
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={profile.avatarUrl}
              alt="User"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 pr-8 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4 tracking-wider">
            ACCOUNT SETTINGS
          </h3>
          <nav>
            {accountSettingsNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center p-3 my-1 rounded-lg transition duration-150 
                  ${
                    item.active
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Profile Details Content */}
        <main className="flex-grow ml-8 bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-3xl font-medium text-gray-900 mb-8">
            Profile Details
          </h2>

          {/* Avatar Section */}
          <section className="flex items-center space-x-6 mb-10">
            <img
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              src={profile.avatarUrl}
              alt="Avatar"
            />
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition">
                Change Avatar
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded-md hover:bg-red-50 transition">
                Remove
              </button>
            </div>
          </section>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              id="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="e.g. Abebe Wolde"
            />
            <InputField
              label="Email Address"
              id="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="e.g. abebewolde@ethiolink.com"
            />
            <TextAreaField
              label="Bio"
              id="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="e.g. Passionate entrepreneur building solutions..."
            />
            <InputField
              label="Region"
              id="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="e.g. Addis Ababa, Ethiopia"
            />

            <div className="pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* App Footer */}
      <footer className="w-full text-center text-sm text-gray-500 mt-10 p-4 border-t border-gray-200 bg-white">
        {/* Footer content structure */}
      </footer>
    </div>
  );
};

export default ProfileDetailsPage;
