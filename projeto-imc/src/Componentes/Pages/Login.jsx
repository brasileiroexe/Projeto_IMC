import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/historico"); // Redireciona para a página de histórico após login bem-sucedido
    } catch (error) {
      setError("Falha no login. Verifique seu e-mail e senha.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/historico"); // Redireciona para a página de histórico após login com Google
    } catch (error) {
      setError("Falha no login com Google. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <p>Insira suas credenciais para acessar sua conta.</p>
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Entrar
        </button>
        <p>Ou</p>
        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleLogin}
        >
          Entrar com Google
        </button>
        <p>
          Não tem uma conta?{" "}
          <a href="/" onClick={() => navigate("/")}>
            Cadastre-se aqui
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
