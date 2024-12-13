import React, { useState } from "react";
import Modal from "../modal";

const Delete = ({ userId,  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null); // Réinitialise les erreurs
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Récupération du token
      const response = await fetch(`http://localhost:8000/api/deletefeedback/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        } // Ajout du token
      });

      console.log("Response:", response);
      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        throw new Error("Une erreur s'est produite lors de la suppression.");
      }

      // Suppression réussie
      // Callback pour mettre à jour la liste ou notifier l'utilisateur
      handleClose();
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="bg-red-500 text-white p-2 rounded">
        Supprimer Feedback
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <h2 className="text-lg font-bold">Confirmer la suppression</h2>

          {loading && <p>Suppression en cours...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <p className="mt-4">Êtes-vous sûr de vouloir supprimer ce feedback ? Cette action est irréversible.</p>

          <div className="mt-4 flex justify-between">
            <button onClick={handleClose} className="bg-gray-300 p-2 rounded">
              Annuler
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Suppression..." : "Confirmer"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Delete;
