import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css"; // Importando o arquivo de CSS

function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleCadastro = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMsg("Cadastro realizado com sucesso!");
      navigate("/historico"); // Redireciona para a página de histórico após o cadastro
    } catch (error) {
      setMsg("Erro ao cadastrar. Tente novamente.");
      console.error(error);
    }
  };

  // Função para login/cadastro com Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setMsg("Autenticado com Google!");
      navigate("/historico"); // Redireciona para a página de histórico após o login
    } catch (error) {
      setMsg("Erro ao fazer login com Google. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form">
        <h1>Cadastro</h1>
        <p>
          Crie sua conta para acessar a calculadora de IMC e acompanhar seu
          histórico.
        </p>
        <label>E-mail:</label>
        <input
          type="email"
          placeholder="seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha:</label>
        <input
          type="password"
          placeholder="sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleCadastro}>
          Cadastrar
        </button>

        {/* Botão de cadastro/login com Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-signin-button"
        >
          Cadastrar com Google
        </button>

        <p>
          Ja tem uma Conta?{" "}
          <a href="/login" onClick={() => navigate("/login")}>
            Ir para Login
          </a>
        </p>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}

// Exportação no nível superior, fora de qualquer bloco de código
export default Cadastro;
