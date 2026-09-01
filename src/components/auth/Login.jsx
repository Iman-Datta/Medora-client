import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

export default function Login({ onSwitchToRegister, onSwitchToForgot }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Log In</h1>

      <div>
        <label className="block text-base font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 rounded-lg transition disabled:opacity-60"
      >
        {status === "loading" ? "Logging in..." : "Log In"}
      </button>

      <div className="flex justify-between text-sm text-teal-700">
        <button type="button" onClick={onSwitchToRegister} className="hover:underline">
          Create account
        </button>
        <button type="button" onClick={onSwitchToForgot} className="hover:underline">
          Forgot password?
        </button>
      </div>
    </form>
  );
}