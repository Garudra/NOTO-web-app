import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/firstBg.png";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import notoLogo from "../assets/notologo.png";
const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      await axios.post("http://localhost:3000/api/auth/register", formData, {
        withCredentials: true,
      });

      navigate("/verify-email", {
        state: {
          email,
        },
      });
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
        <div className="hidden md:flex flex-col justify-center px-8">
          <img
            className="text-6xl font-bold tracking-tight text-white"
            src={notoLogo}
          />

          <p className="mt-14 text-lg text-gray-200 max-w-md leading-relaxed">
            Organize your thoughts, manage your notes, and keep everything
            important in one place.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-gray-300">
            <div className="h-px w-12 bg-gray-400"></div>
            <span>Simple. Focused. Yours.</span>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-7">
            <div className="md:hidden text-center mb-6">
              <img className="text-4xl font-bold text-white" src={notoLogo} />
              <p className="text-gray-300 text-sm -mt-15">
                Your thoughts, organized.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Create your account
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Start organizing your notes today.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1.5">
                  Name
                </label>

                <input
                  className="w-full bg-white/5 border border-white/15 text-white text-sm rounded-lg py-2.5 px-3.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1.5">
                  Password
                </label>

                <input
                  className="w-full bg-white/5 border border-white/15 text-white text-sm rounded-lg py-2.5 px-3.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-300 mb-1.5">
                  Profile picture
                  <span className="text-gray-500 ml-1">(optional)</span>
                </label>

                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  className="w-full text-gray-300 text-sm border border-white/15 rounded-lg py-2 px-3 bg-white/5 file:mr-3 file:border-0 file:bg-white/10 file:text-white file:px-3 file:py-1.5 file:rounded-md file:cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-2.5 transition cursor-pointer"
              >
                Create account
                <FaArrowRightLong className="text-sm" />
              </button>
            </form>

            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-white/10"></div>

              <span className="px-3 text-xs text-gray-500">OR</span>

              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:3000/api/auth/google";
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

            <div className="text-center mt-5">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
