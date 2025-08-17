import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

const Login = () => {
  const { signin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const result = await signin(email, password);
      const loggedUser = result.user;

      if (loggedUser) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          text: "You have been logged in successfully",
          showConfirmButton: false,
          timer: 1500,
          background: "#f8fafc",
          backdrop: `
            rgba(0,0,0,0.5)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email address.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many failed attempts. Account temporarily disabled. Reset password or try again later.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
      }

      setError(errorMessage);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        showConfirmButton: true,
        background: "#f8fafc",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner title="Login" subTitle="Welcome back" />

      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Login to Your Account
            </h1>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-red-800">
                  <RxCrossCircled />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>Sign in</>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't Have an Account?
                </span>
              </div>
            </div>

            <div className="mt-6 ">
              <Link>
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                  Create a New Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
