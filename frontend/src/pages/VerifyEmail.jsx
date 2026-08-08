import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/firstBg.png";
import notoLogo from "../assets/notologo.png";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/api/auth/verify-email",
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        flex
        items-center
        justify-center
        px-6
      "
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="
          w-full
          max-w-md
          bg-black/40
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          shadow-2xl
          p-8
        "
      >
        {/* LOGO */}

        <div className="flex justify-center mb-6">
          <img src={notoLogo} alt="Noto" className="w-24" />
        </div>

        {/* TITLE */}

        <div className="text-center mb-7">
          <h1 className="text-2xl font-semibold text-white">
            Verify your email
          </h1>

          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-sm text-blue-400 mt-1 break-all">{email}</p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-300 mb-2">
            Verification code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="
              w-full
              bg-white/5
              border
              border-white/15
              text-white
              text-center
              text-2xl
              tracking-[0.5em]
              rounded-lg
              py-3
              px-4
              outline-none
              transition
              focus:border-blue-500
              focus:ring-1
              focus:ring-blue-500
            "
          />

          {/* ERROR */}

          {error && (
            <p className="text-red-400 text-xs mt-3 text-center">{error}</p>
          )}

          {/* VERIFY BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-5
              bg-blue-600
              hover:bg-blue-500
              disabled:bg-blue-600/50
              text-white
              font-medium
              rounded-lg
              py-2.5
              transition
              cursor-pointer
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </form>

        {/* BACK */}

        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/register")}
            className="
              text-sm
              text-gray-500
              hover:text-gray-300
              transition
              cursor-pointer
            "
          >
            Use a different email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
