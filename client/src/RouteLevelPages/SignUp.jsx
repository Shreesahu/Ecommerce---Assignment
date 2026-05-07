import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import firebaseAuthFunction from "../Utils/fireBaseAuth.js";
import { login } from "../ReduxSlice/user/auth&UserSlice.js";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!form.fullName || !form.mobile) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const result = await firebaseAuthFunction(form.mobile);

      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP + Signup
  const handleVerifyOtp = async () => {
    if (!otp) {
      return setError("OTP is required");
    }

    try {
      setLoading(true);
      setError("");

      const result = await confirmationResult.confirm(otp);
      console.log(result, "user Verified Acknowledgement");

      const firebaseToken = await result.user.getIdToken();

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          token: firebaseToken,
          fullName: form.fullName,
        },
      );

      localStorage.setItem("token", res.data.token);

      dispatch(login(res.data.user));

      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid OTP");
      } else {
        setError(err?.response?.data?.error || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-[350px] text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <input
              required
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              className="p-3 rounded bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            />

            {/* Phone */}
            <input
              required
              type="tel"
              placeholder="Phone Number"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value,
                })
              }
              className="p-3 rounded bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            />

            {/* OTP */}
            {otpSent && (
              <input
                required
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-3 rounded bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              />
            )}

            {/* Button */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full cursor-pointer text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 p-3 rounded font-semibold"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full cursor-pointer text-white bg-green-500 hover:bg-green-600 transition-all duration-300 p-3 rounded font-semibold"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-center text-sm">{error}</p>
            )}

            {/* Redirect */}
            <p className="text-center text-sm mt-4 text-white/80">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-orange-400 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
