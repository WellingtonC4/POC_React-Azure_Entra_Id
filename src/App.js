import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function App() {
  const { instance, accounts } = useMsal();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setMessage("");

    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      setMessage(`✅ Login realizado com sucesso! Usuário: ${loginResponse.account.username}`);
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setMessage(`❌ Erro na autenticação: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
    setMessage("🔒 Logout realizado.");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>POC Entra ID + App Roles</h1>
      {accounts.length > 0 ? (
        <>
          <p>Bem-vindo, {accounts[0].username}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Autenticando..." : "Login com Entra ID"}
        </button>
      )}
      {message && (
        <div style={{ marginTop: "1rem", fontWeight: "bold", color: "#333" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;