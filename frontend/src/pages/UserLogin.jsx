import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/firstBg.png";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import notoLogo from "../assets/notologo.png";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userData = {
        email,
        password,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, userData, {
        withCredentials: true,
      });

      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT — Noto Branding */}
        <div className="hidden md:flex flex-col justify-center px-8">
          <img src={notoLogo} alt="Noto" className="w-40 h-auto" />

          <p className="mt-6 text-lg text-gray-200 max-w-md leading-relaxed">
            Welcome back to Noto. Keep your thoughts organized, accessible, and
            always within reach.
          </p>

          <div className="mt-7 flex items-center gap-3 text-sm text-gray-300">
            <div className="h-px w-10 bg-gray-400/60"></div>
            <span>Simple. Focused. Yours.</span>
          </div>
        </div>

        {/* RIGHT — LOGIN CARD */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-7">
            {/* MOBILE LOGO */}
            <div className="md:hidden text-center mb-6">
              <img src={notoLogo} alt="Noto" className="w-32 mx-auto" />

              <p className="text-gray-300 text-sm -mt-1">
                Your thoughts, organized.
              </p>
            </div>

            {/* HEADING */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Welcome back
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Sign in to continue to your notes.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1.5">
                  Email
                </label>

                <input
                  className="w-full bg-white/5 border border-white/15 text-white text-sm rounded-lg py-2.5 px-3.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-5">
                <label className="block text-sm text-gray-300 mb-1.5">
                  Password
                </label>

                <input
                  className="w-full bg-white/5 border border-white/15 text-white text-sm rounded-lg py-2.5 px-3.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/60 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2.5 transition cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && <FaArrowRightLong className="text-sm" />}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-white/10"></div>

              <span className="px-3 text-xs text-gray-500">OR</span>

              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
              }}
              className="w-full flex items-center justify-center gap-3 border border-white/15 rounded-lg py-2.5 text-white hover:bg-white/10 transition cursor-pointer"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />

              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            {/* REGISTER */}
            <div className="text-center mt-5">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
