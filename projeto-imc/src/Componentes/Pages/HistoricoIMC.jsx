import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase.js";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./HistoricoIMC.css"; // Importa o CSS da tabela

function HistoricoIMC() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [historicoIMC, setHistoricoIMC] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchIMCData(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchIMCData = async (uid) => {
    try {
      const imcHistoryRef = collection(db, "users", uid, "imcHistory");
      const q = query(imcHistoryRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      let imcData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Limita o histórico a no máximo 8 entradas e remove a mais antiga
      if (imcData.length > 8) {
        const oldestEntry = imcData[imcData.length - 1];
        await deleteDoc(doc(db, "users", uid, "imcHistory", oldestEntry.id));
        imcData = imcData.slice(0, 8);
      }

      setHistoricoIMC(imcData);
    } catch (error) {
      console.error("Erro ao buscar os dados do IMC: ", error);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "imcHistory", entryId));
      setHistoricoIMC(historicoIMC.filter((entry) => entry.id !== entryId));
    } catch (error) {
      console.error("Erro ao excluir a entrada de IMC: ", error);
    }
  };

  return (
    <div className="historico-imc-container">
      <h1 className="historico-imc-title">Histórico de IMC</h1>
      {user ? <p>Bem-vindo {user.email}</p> : <p>Carregando...</p>}

      {historicoIMC.length > 0 ? (
        <div>
          {historicoIMC.map((imcEntry) => (
            <div key={imcEntry.id} style={{ marginBottom: "20px" }}>
              <h3>{new Date(imcEntry.date).toLocaleDateString()}</h3>
              <table className="historico-imc-table">
                <thead>
                  <tr>
                    <th>Altura (m)</th>
                    <th>Peso (kg)</th>
                    <th>IMC</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{imcEntry.height}</td>
                    <td>{imcEntry.weight}</td>
                    <td>{imcEntry.bmi}</td>
                    <td>
                      <button onClick={() => handleDelete(imcEntry.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum dado de IMC encontrado.</p>
      )}
    </div>
  );
}

export default HistoricoIMC;
