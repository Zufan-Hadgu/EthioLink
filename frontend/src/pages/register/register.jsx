// import React from "react";

// const Register = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
//         {/* Header */}
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
//           Create Your SparkLink Account
//         </h2>
//         <p className="text-gray-600 text-center mb-8">
//           Join our vibrant community of entrepreneurs and supporters.
//         </p>

//         {/* Form */}
//         <form className="space-y-5">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-3 text-gray-400">
//                 <i className="fa-regular fa-user"></i>
//               </span>
//               <input
//                 type="text"
//                 placeholder="Enter your full name or display name"
//                 className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-3 text-gray-400">
//                 <i className="fa-regular fa-envelope"></i>
//               </span>
//               <input
//                 type="email"
//                 placeholder="your.email@example.com"
//                 className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <div className="flex gap-2">
//               <select className="border border-gray-300 rounded-lg py-2.5 px-2 w-1/3 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm">
//                 <option>+251 Ethiopia</option>
//                 <option>+1 USA</option>
//                 <option>+44 UK</option>
//               </select>
//               <div className="relative flex-1">
//                 <span className="absolute left-3 top-3 text-gray-400">
//                   <i className="fa-solid fa-phone"></i>
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="912345678"
//                   className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
//                 />
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               For SMS updates, verification, and payments.
//             </p>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-3 text-gray-400">
//                 <i className="fa-solid fa-lock"></i>
//               </span>
//               <input
//                 type="password"
//                 placeholder="Create a strong password"
//                 className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
//               />
//               <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
//                 <i className="fa-regular fa-eye"></i>
//               </span>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-3 text-gray-400">
//                 <i className="fa-solid fa-lock"></i>
//               </span>
//               <input
//                 type="password"
//                 placeholder="Confirm your password"
//                 className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* User Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               User Role
//             </label>
//             <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-orange-400 focus:outline-none">
//               <option>Select your role</option>
//               <option>Entrepreneur</option>
//               <option>Investor</option>
//               <option>Supporter</option>
//             </select>
//           </div>

//           <p className="text-xs text-gray-500 text-center">
//             By signing up, you agree to our{" "}
//             <a href="#" className="text-blue-600 hover:underline">
//               Terms
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-blue-600 hover:underline">
//               Privacy Policy
//             </a>
//             .
//           </p>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2.5 rounded-lg transition-colors"
//           >
//             Sign Up
//           </button>

//           <div className="flex items-center gap-2">
//             <hr className="flex-1 border-gray-300" />
//             <span className="text-gray-400 text-sm">OR</span>
//             <hr className="flex-1 border-gray-300" />
//           </div>

//           {/* Google Signup */}
//           <button
//             type="button"
//             className="w-full border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             Sign Up with Google
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-xs text-gray-400 mt-8">
//           Made with 💜 by SparkLink
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
// 1. 🟢 IMPORT useNavigate from react-router-dom
import { useNavigate } from "react-router-dom"; 
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
} from "../../utility/fierbase"; // Adjust the path to your firebase.js file

const Register = () => {
  // 2. 🟢 INITIALIZE useNavigate hook
    const navigate = useNavigate();
    
  // 3. State for all form fields and potential error/loading state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("Select your role");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (userRole === "Select your role") {
        setError("Please select a valid user role.");
        setLoading(false);
        return;
    }

    try {
      // 🚀 Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 💾 Step 2: Store additional user data in Firestore
      // Use the Firebase Auth user.uid as the document ID for the 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: fullName,
        email: email, // Duplicate for easy querying, though user.email exists
        phoneNumber: "+251" + phoneNumber, // Example of combining country code
        userRole: userRole,
        createdAt: new Date(),
      });

      // 4. 🟢 Step 3: Conditional Navigation Logic
      console.log("Registration Successful! User UID:", user.uid);

      if (userRole === 'Supporter') {
        // Redirect Supporters to the supporter-specific home page
        navigate('/login'); 
      } else {
        // Redirect all other roles (Entrepreneur, Investor) to the general home page
        navigate('/login'); 
      }
      // NOTE: Ensure your route paths (e.g., '/home', '/supporter-home') are correct in your App.js/router setup.

    } catch (err) {
      console.error("Firebase Registration Error:", err.message);
      // Display a user-friendly error
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

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

        {/* Error Display */}
        {error && (
            <p className="text-red-600 text-center mb-4 p-2 bg-red-100 rounded-lg border border-red-300">
                {error}
            </p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email (Update value and onChange) */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone (Update select and input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg py-2.5 px-2 w-1/3 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm">
                <option value="+251">+251 Ethiopia</option>
                <option value="+1">+1 USA</option>
                <option value="+44">+44 UK</option>
              </select>
              <div className="relative flex-1">
                <span className="absolute left-3 top-3 text-gray-400">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  placeholder="912345678"
                  className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              For SMS updates, verification, and payments.
            </p>
          </div>

          {/* Password (Update value and onChange) */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                <i className="fa-regular fa-eye"></i>
              </span>
            </div>
          </div>

          {/* Confirm Password (Update value and onChange) */}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* User Role (Update value and onChange) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Role
            </label>
            <select 
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
            >
              <option value="Select your role" disabled>Select your role</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Investor">Investor</option>
              <option value="Supporter">Supporter</option>
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
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Signup (Requires separate implementation) */}
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
