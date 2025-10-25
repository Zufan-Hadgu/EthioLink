// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SocialSignInButton = ({ provider, icon }) => (
//   <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-150">
//     <span className="text-lg">{icon}</span>
//     <span>{provider}</span>
//   </button>
// );

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (email && password) {
//       console.log("Attempting login with:", { email, password, rememberMe });
//       alert(`Logging in as ${email}...`);
//     } else {
//       alert("Please enter both email and password.");
//     }
//   };

//   // Temporary fake avatar until profile is defined
//   const profile = { avatarUrl: "https://via.placeholder.com/40" };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
    

//       {/* Centered Login Box */}
//       <div className="flex-grow flex items-start justify-center px-4 mt-20">
//         <div className="bg-white p-8 sm:p-10 rounded-xl border border-gray-200  w-full max-w-sm">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
//             Welcome Back
//           </h1>
//           <p className="text-sm text-gray-600 mb-8 text-center">
//             Enter your credentials to access your account.
//           </p>

//           <form onSubmit={handleLogin} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//               />
//             </div>

//             {/* Remember Me / Forgot Password */}
//             <div className="flex justify-between items-center text-sm pt-1">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
//                 />
//                 <label htmlFor="remember" className="ml-2 text-gray-700">
//                   Remember me
//                 </label>
//               </div>
//               <a
//                 href="#forgot"
//                 className="text-orange-500 hover:text-orange-600 text-sm font-medium"
//               >
//                 Forgot Password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full py-3 mt-4 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-200"
//             >
//               Log In
//             </button>
//           </form>

//           {/* Separator */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           {/* Social Buttons */}
//           <div className="flex space-x-3">
//             <SocialSignInButton provider="GitHub" icon="🐙" />
//             <SocialSignInButton provider="Google" icon="G" />
//           </div>

//           {/* Sign Up Link */}
//           <div className="text-center text-sm text-gray-600 mt-8">
//             Don’t have an account?{" "}
//             <a
//               href="#signup"
//               className="text-orange-500 hover:text-orange-600 font-semibold"
//             >
//               Sign Up
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 🟢 1. IMPORT FIREBASE FUNCTIONS
import { 
    auth, 
    db, 
    signInWithEmailAndPassword, 
    doc, 
    getDoc 
} from "../../utility/fierbase"; // Adjust the path to your firebase.js file

const SocialSignInButton = ({ provider, icon }) => (
  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-150">
    <span className="text-lg">{icon}</span>
    <span>{provider}</span>
  </button>
);

const LoginPage = () => {
    const navigate = useNavigate(); // 🟢 2. Initialize useNavigate
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    // 🟢 3. Add state for error and loading
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Basic form validation check (already included in the form's 'required' but good for logic)
        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            // 1. 🚀 Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Login successful. User UID:", user.uid); // Log success

            // 2. 💾 Fetch the user's role from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            let userRole = null;
            if (userDoc.exists()) {
                userRole = userDoc.data().userRole; 
            } else {
                console.warn("User document not found. Redirecting to general home.");
            }

            // 3. 🚦 Conditional Navigation
            if (userRole === 'Supporter') {
                navigate('/');
            } else {
                navigate('/home'); 
            }

        } catch (err) {
            console.error("Firebase Login Error:", err.message);
            // Handle common Firebase auth errors
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
                setError('Invalid email or password. Please try again.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Temporary fake avatar until profile is defined
    const profile = { avatarUrl: "https://via.placeholder.com/40" };

    return (
      <div className="min-h-screen bg-white flex flex-col">
        
        {/* Centered Login Box */}
        <div className="flex-grow flex items-start justify-center px-4 mt-20">
          <div className="bg-white p-8 sm:p-10 rounded-xl border border-gray-200  w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600 mb-8 text-center">
              Enter your credentials to access your account.
            </p>

            {/* 🟢 9. Error Display */}
            {error && (
                <p className="text-red-600 text-center mb-4 p-2 bg-red-100 rounded-lg border border-red-300 text-sm">
                    {error}
                </p>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex justify-between items-center text-sm pt-1">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>
                <a
                  href="#forgot"
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-200 disabled:opacity-50"
                disabled={loading} // 🟢 Disable button while loading
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex space-x-3">
              <SocialSignInButton provider="GitHub" icon="🐙" />
              <SocialSignInButton provider="Google" icon="G" />
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600 mt-8">
              Don’t have an account?{" "}
              <a
                href="#signup"
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LoginPage;