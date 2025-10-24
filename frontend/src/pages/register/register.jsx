import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Create Your SparkLink Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Join our vibrant community of entrepreneurs and supporters.
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fa-regular fa-user"></i>
              </span>
              <input
                type="text"
                placeholder="Enter your full name or display name"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg py-2.5 px-2 w-1/3 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm">
                <option>+251 Ethiopia</option>
                <option>+1 USA</option>
                <option>+44 UK</option>
              </select>
              <div className="relative flex-1">
                <span className="absolute left-3 top-3 text-gray-400">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  placeholder="912345678"
                  className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              For SMS updates, verification, and payments.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                <i className="fa-regular fa-eye"></i>
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* User Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Role
            </label>
            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-orange-400 focus:outline-none">
              <option>Select your role</option>
              <option>Entrepreneur</option>
              <option>Investor</option>
              <option>Supporter</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign Up
          </button>

          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="w-full border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sign Up with Google
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Made with 💜 by SparkLink
        </p>
      </div>
    </div>
  );
};

export default Register;
