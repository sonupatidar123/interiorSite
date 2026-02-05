import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Get token
      const res = await api.post("token/", { username, password });
      const { access, refresh } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // 2. Get user info
      const userRes = await api.get("me/");

      // 3. Check admin
      if (!userRes.data.is_superuser) {
        setError("You are not authorized as admin");
        localStorage.clear();
        return;
      }

      // 4. Save admin state
      localStorage.setItem("is_admin", "true");
      onLogin(userRes.data); // ✅ now works

      // 5. Redirect after auth success
      navigate("/addproject", { replace: true });

    } catch (err) {
      setError("Invalid username or password");
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
