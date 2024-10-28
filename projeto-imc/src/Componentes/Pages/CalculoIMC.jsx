import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../../Firebase.js";
import { db } from "../../Firebase.js";
import TabelaIMC from "./../TabelaIMC.jsx"; // Importa a Tabela de Classificação
import "./CalculoIMC.css";

function CalculoIMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setIMC] = useState(null);
  const [msg, setMsg] = useState("");
  const [showTabela, setShowTabela] = useState(false); // Controla a exibição da tabela

  const calcularIMC = async () => {
    if (!peso || !altura) {
      setMsg("Por favor, preencha todos os campos.");
      return;
    }

    const calculo = (peso / (altura * altura)).toFixed(2);
    setIMC(calculo);
    setShowTabela(true); // Exibe a tabela após o cálculo

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "users", user.uid, "imcHistory"), {
          weight: peso,
          height: altura,
          bmi: calculo,
          date: new Date().toISOString(),
        });
        setMsg("IMC calculado e salvo no histórico!");
      } else {
        setMsg("Por favor, faça login para salvar o histórico.");
      }
    } catch (error) {
      console.error(error);
      setMsg("Erro ao salvar o histórico.");
    }
  };

  return (
    <div className="calculadora-imc-container">
      <h2>Calcular IMC</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Peso (kg)"
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          placeholder="Altura (m)"
          onChange={(e) => setAltura(e.target.value)}
        />
      </div>
      <button onClick={calcularIMC} className="calcular-button">
        Calcular IMC
      </button>
      {imc && <p>Seu IMC é: {imc}</p>}
      <p>{msg}</p>

      {/* Exibe a tabela de classificação IMC */}
      {showTabela && <TabelaIMC onClose={() => setShowTabela(false)} />}
    </div>
  );
}

export default CalculoIMC;
