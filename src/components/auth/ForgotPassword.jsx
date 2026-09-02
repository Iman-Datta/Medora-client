import { useState } from "react";

export default function ForgotPassword({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up forgotPassword API call once backend endpoint is ready
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Forgot Password</h1>

      {submitted ? (
        <div className="space-y-4">
          <p className="text-slate-700 text-base">
            If an account exists for <strong>{email}</strong>, we've sent a link to reset your password. Please check your inbox.
          </p>
          <button onClick={onSwitchToLogin} className="text-teal-700 hover:underline text-sm">
            Back to log in
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-slate-600 text-base">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <div>
            <label className="block text-base font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 rounded-lg transition"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm text-slate-600">
            Remembered your password?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-teal-700 hover:underline">
              Log in
            </button>
          </p>
        </form>
      )}
    </div>
  );
}