import React from "react";
import { NavLink, useNavigate } from "react-router";


export default function Header() {
  const navigate = useNavigate();

  async function logout() {
    const token = localStorage.getItem("token"); // Récupération du token
    const user = localStorage.getItem("user"); // Récupération du token

    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Suppression du token dans le localStorage
        localStorage.removeItem("token");
        console.log("Déconnexion réussie");
        // Redirection ou message à l'utilisateur
        navigate('/sign-in');
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
    }
  }

  return (
    <div className="w-full border-b-2">
      <div className="p-3">
        <div className="flex justify-end">
          <div>
            <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
