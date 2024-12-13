import React, { useState } from "react";
import Modal from "../modal";
import ResponseFeedback from "../content/responseFeedack"; // Assurez-vous d'avoir ce composant

const Afficher = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResponseOpen, setIsResponseOpen] = useState(false); // État pour le modal de réponse
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
    fetchFeedback();
  };

  const handleClose = () => {
    setIsOpen(false);
    setFeedback(null);
    setError(null);
  };

  const handleResponseOpen = () => {
    setIsResponseOpen(true);
  };

  const handleResponseClose = () => {
    setIsResponseOpen(false);
  };

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Récupération du token
      const response = await fetch(`http://localhost:8000/api/feedbackGet/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Ajout du token
        },
      });


      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        throw new Error("Une erreur s'est produite lors de la récupération des données.");
      }
      const data = await response.json();
      setFeedback(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="bg-blue-500 text-white p-2 rounded">
        Afficher Détails
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <h2 className="text-lg font-bold">Détails du Feedback</h2>

          {loading && <p>Chargement des données...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {feedback && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Nom :</strong> {feedback.name}
              </p>
              <p>
                <strong>Email :</strong> {feedback.email}
              </p>
              <p>
                <strong>Rating :</strong> {feedback.rating}
              </p>
              <p>
                <strong>Statut :</strong> {feedback.status}
              </p>
              <div className="flex items-center justify-center">
                <p className="w-64">{feedback.comment}</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <button onClick={handleClose} className="bg-gray-300 p-2 rounded">
              Fermer
            </button>
            <button
              onClick={handleResponseOpen}
              className="bg-gray-300 p-2 rounded"
            >
              Répondre
            </button>
          </div>
        </Modal>
      )}

      {isResponseOpen && (
        <ResponseFeedback
          userId={userId}
          onClose={handleResponseClose} // Ferme le modal après soumission ou annulation
        />
      )}
    </div>
  );
};

export default Afficher;
