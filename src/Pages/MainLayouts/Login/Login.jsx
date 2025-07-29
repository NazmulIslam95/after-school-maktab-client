import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";
import Footer from "./../../../Components/Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  // FaFacebook,
  FaGoogle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Login = () => {
  const { signin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signin(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        if (loggedUser) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Successfully Logged In",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <Navbar />
      <Banner title="Login" subTitle="Login" />

      <div className="flex items-center justify-center px-4 py-10 bg-white">
        <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-10 shadow-lg">
          <h1 className="text-3xl font-semibold">LogIn</h1>
          <form onSubmit={handleLogin} action="#" className="space-y-6">
            <div className="space-y-2 text-sm text-zinc-700">
              <label htmlFor="username_2" className="block font-medium">
                Email
              </label>
              <input
                required
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none"
                id="username_2"
                placeholder="Enter Your Email"
                name="email"
                type="email"
              />
            </div>
            <div className="space-y-2 text-sm text-zinc-700">
              <label htmlFor="password_2" className="block font-medium">
                Password
              </label>
              <input
                required
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none"
                id="password_2"
                placeholder="Enter password"
                name="password"
                type="password"
              />
              <div className="flex justify-end text-xs">
                <Link
                  to="/forgot-password"
                  className="text-zinc-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 px-6 font-medium tracking-wide text-black bg-purple-400 rounded shadow-md transition hover:bg-purple-700 focus:outline-none flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-black mr-2"
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
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-700">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold underline">
              Signup
            </Link>
          </p>
{/* 
          <div className="my-8 flex items-center">
            <hr className="flex-1 border-gray-400" />
            <div className="mx-4 text-gray-400">OR</div>
            <hr className="flex-1 border-gray-400" />
          </div> */}

          {/* <div className="flex justify-center space-x-4 *:border hover:*:bg-zinc-400/20">
            <button
              aria-label="Log in with Google"
              className="rounded-full p-3"
            >
              <FaGoogle className="h-6 w-6" />
            </button>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
