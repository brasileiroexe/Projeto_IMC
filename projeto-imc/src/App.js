import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./Firebase"; // Assumindo que o Firebase está configurado corretamente
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Importação do Firebase para realizar o logout

import Cadastro from "./Componentes/Pages/Cadastro";
import HistoricoIMC from "./Componentes/Pages/HistoricoIMC";
import Login from "./Componentes/Pages/Login";
import LogoutButton from "./Componentes/LogoutButton";
import Navbar from "./Componentes/Navbar";
import Home from "./Componentes/Pages/Home";
import SobreNos from "./Componentes/Pages/SobreNos";
import CalculoIMC from "./Componentes/Pages/CalculoIMC";

function App() {
  const [user, setUser] = useState(null);

  // Função que detecta mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Limpar o listener quando o componente for desmontado
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Saude e Bem estar</h1>
          <h2>Calculadora de Indice de Massa Corporal</h2>
        </header>
        {user && <Navbar />}

        <Routes>
          {/* Se o usuário estiver logado, redireciona para a página de histórico */}
          <Route
            path="/"
            element={user ? <Navigate to="/historico" /> : <Cadastro />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/historico" /> : <Login />}
          />

          <Route exact path="/home" element={<Home />} />
          <Route exact path="/calculo" element={<CalculoIMC />} />
          <Route exact path="/sobre-nos" element={<SobreNos />} />
          <Route exact path="/historico" element={<HistoricoIMC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
