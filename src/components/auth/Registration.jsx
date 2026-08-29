import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";

export default function Registration({ onSwitchToLogin }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...payload } = form;
    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      onSwitchToLogin();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>

      <div>
        <label className="block text-base font-medium text-slate-700 mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          required
          className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700 mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          required
          className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {(localError || error) && <p className="text-red-600 text-sm">{localError || error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 rounded-lg transition disabled:opacity-60"
      >
        {status === "loading" ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin} className="text-teal-700 hover:underline">
          Log in
        </button>
      </p>
    </form>
  );
}