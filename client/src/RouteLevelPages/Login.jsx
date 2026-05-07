import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import firebaseAuthFunction from "../Utils/fireBaseAuth.js";
import { login } from "../ReduxSlice/user/auth&UserSlice.js";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({phone: "",});
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleSendOtp = async (e) => {

    e.preventDefault();

    if (!form.phone) {
      return setError("Phone number is required");
    }
    try {
      setLoading(true);
      setError("");

      const result = await firebaseAuthFunction(form.phone);

      setConfirmationResult(result);
      setOtpSent(true);

    } catch (err) {

      console.log(err);
      setError("Failed to send OTP");

    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      return setError("OTP is required");
    }
    try {

      setLoading(true);
      setError("");

        const result = await confirmationResult.confirm(otp);
        const firebaseToken = await result.user.getIdToken();          
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            token: firebaseToken,
          },
        );
     
      localStorage.setItem("token", res.data.token);
      console.log(res.data.user , "Login User")
      dispatch(login(res.data.user));
      navigate("/");

    } catch (err) {

      console.log(err);

      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid OTP");
      } else {
        setError(
          err?.response?.data?.error || "Login failed"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/images/panoramic/getty_522735456_249841.jpg)",
        }}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-[350px] text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <form
            onSubmit={handleSendOtp}
            className="flex flex-col gap-4"
          >

            <input
              required
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="p-3 rounded bg-white/20 outline-none focus:ring-2 focus:ring-white"
            />

            {otpSent && (
              <input
                required
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-3 rounded bg-white/20 outline-none focus:ring-2 focus:ring-white"
              />
            )}

            {!otpSent ? (
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 cursor-pointer hover:bg-orange-600 transition-all duration-300 p-3 rounded font-semibold"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="bg-green-500 cursor-pointer hover:bg-green-600 transition-all duration-300 p-3 rounded font-semibold"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )}

            {error && (
              <p className="text-red-400 text-center text-sm">
                {error}
              </p>
            )}

            <p className="text-center text-sm mt-4 text-white/80">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-orange-400 cursor-pointer"
              >
                SignUp here
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}