import { Link, useLocation, useNavigate } from "react-router-dom";
import Banner from "../../../Components/Banner/Banner";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const from = location.state?.from || "/";

  const handleSignup = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNo = form.phone.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        updateUser(name, phoneNo)
          .then(() => {
            // eslint-disable-next-line no-unused-vars
            const user = result.user;
            const userInfo = {
              name,
              email,
              PhoneNo: phoneNo,
              password: password,
              referredBy: referralCode || null,
            };

            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Signup Successful!",
                    showConfirmButton: true,
                  });
                  navigate(from, { replace: true });
                }
                setIsLoading(false);
              })
              .catch((error) => {
                console.error("Signup Error:", error);
                Swal.fire(
                  "Error!",
                  error.response?.data?.message || "Signup failed",
                  "error"
                );
                setIsLoading(false);
              });
          })
          .catch((error) => {
            console.error("Profile Update Error:", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Auth Error:", error);
        Swal.fire("Error!", error.message, "error");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <Banner title="Sign Up" subTitle="SignUp" />
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-10 shadow-lg">
          <div className="flex flex-col space-y-1">
            <h3 className="text-3xl font-bold tracking-tight">Sign Up</h3>
            <p className="text-sm text-zinc-500">
              Please fill in the form to create an account.
            </p>
          </div>
          <div>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                  id="name"
                  placeholder="Enter Your Name"
                  name="name"
                  type="text"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                />
              </div>
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                  id="phone"
                  placeholder="Enter your phone number"
                  name="phone"
                  type="tel"
                />
              </div>
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700"
                  htmlFor="referralCode"
                >
                  Referral Code (Optional)
                </label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                  id="referralCode"
                  placeholder="Enter Referral Code (If Any)"
                  name="referralCode"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700"
                  htmlFor="password_"
                >
                  Password
                </label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                  id="password_"
                  placeholder="password"
                  name="password"
                  type="password"
                />
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
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
          <p className="text-center text-sm text-zinc-700">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
