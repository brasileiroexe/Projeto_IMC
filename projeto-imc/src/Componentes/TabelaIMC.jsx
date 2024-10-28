import React from "react";
import "./TabelaIMC.css"; // Importa o arquivo CSS da tabela

function TabelaIMC({ onClose }) {
  return (
    <div className="tabela-imc-container">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h3>Classificação IMC</h3>
      <table className="imc-table">
        <thead>
          <tr>
            <th>IMC (kg/m²)</th>
            <th>Classificação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Menor que 16,9</td>
            <td>Muito abaixo do peso</td>
          </tr>
          <tr>
            <td>17 a 18,4</td>
            <td>Abaixo do peso</td>
          </tr>
          <tr>
            <td>18,5 a 24,9</td>
            <td>Peso normal</td>
          </tr>
          <tr>
            <td>25 a 29,9</td>
            <td>Acima do peso</td>
          </tr>
          <tr>
            <td>30 a 34,9</td>
            <td>Obesidade grau I</td>
          </tr>
          <tr>
            <td>35 a 40</td>
            <td>Obesidade grau II</td>
          </tr>
          <tr>
            <td>Maior que 40</td>
            <td>Obesidade grau III</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TabelaIMC;
