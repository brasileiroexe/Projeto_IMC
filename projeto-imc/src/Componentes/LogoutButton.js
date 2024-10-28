import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Importação do Firebase para realizar o logout
import "./LogoutButton.css";
const LogoutButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout realizado com sucesso, agora redireciona para a página de login
        navigate("/login");
      })
      .catch((error) => {
        // Trate erros de logout, se houver
        console.error("Erro ao sair:", error);
      });
  };

  return (
    <button className="logoutbutton" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
