import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { jwtDecode } from "jwt-decode";


function App() {
  const { instance, accounts } = useMsal();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setMessage("");

    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const decodedToken = jwtDecode(loginResponse.idToken);
      const userRoles = decodedToken.roles || [];

      setRoles(userRoles);
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
    setRoles([]);
    setMessage("🔒 Logout realizado.");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>POC Entra ID + App Roles</h1>

      {accounts.length > 0 ? (
        <>
          <p>Bem-vindo, {accounts[0].username}</p>

          {/* Menus baseados nas roles */}
          {roles.includes("Admin") && (
            <div style={{ margin: "1rem 0" }}>
              <h3>Menu Administrativo</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>📁 Gerenciar usuários</li>
                <li>📊 Relatórios administrativos</li>
              </ul>
            </div>
          )}

          {roles.includes("Financeiro") && (
            <div style={{ margin: "1rem 0" }}>
              <h3>Menu Financeiro</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>💰 Consultar extratos</li>
                <li>📈 Relatórios financeiros</li>
              </ul>
            </div>
          )}

          {roles.length === 0 && (
            <p style={{ color: "red" }}>⚠️ Nenhuma role atribuída a este usuário.</p>
          )}

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