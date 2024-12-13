import React, { useState } from "react";
import Modal from "../modal"; // Réutilise le même composant Modal

const ResponseFeedback = ({ userId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState({
    response: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Vérifie si le champ "response" est vide
    if (!data.response.trim()) {
      setError("La réponse ne peut pas être vide.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/feedback/${userId}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ response: data.response }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Erreur lors de l'envoi de la réponse.");
      }

      setTimeout(() => {
        window.location.reload();
      }, 1000)

      setSuccess("Réponse envoyée avec succès !");
      setData({ response: "" }); // Réinitialise le formulaire
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-lg font-bold">Répondre au Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <textarea
          name="response"
          value={data.response}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Écrivez votre réponse ici..."
          rows="4"
          disabled={loading}
        ></textarea>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 p-2 rounded"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ResponseFeedback;
