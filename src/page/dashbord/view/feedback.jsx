import React, { useEffect, useState } from "react";
import Input from "../../../components/ui/input/input";
import Afficher from "../../../components/ui/modal/content/afficher";
import Delete from "../../../components/ui/modal/content/delete";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.name.toLowerCase().includes(filter.toLowerCase()) ||
    feedback.email.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const indexOfLastFeedback = currentPage * itemsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupération du token
        const response = await fetch("http://127.0.0.1:8000/api/feedbackGet", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajout du token ici
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFeedbacks(data.data); // Ajustez en fonction de la structure de votre réponse API
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xl">Liste des Feedback</h1>
        <Input
          className="p-2 rounded-lg border border-gray-300"
          placeholder="Filtrer par nom ou email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {currentFeedbacks.length > 0 ? (
          <>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg table-responsive">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Nom</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Rating</th>
                  <th className="py-2 px-4 text-left">Statut</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentFeedbacks.map((feedback) => (
                  <tr key={feedback.id} className="text-center border-b">
                    <td className="py-2 px-4">{feedback.id}</td>
                    <td className="py-2 px-4">{feedback.name}</td>
                    <td className="py-2 px-4">{feedback.email}</td>
                    <td className="py-2 px-4">
                      {Array.from({ length: feedback.rating }, (_, index) => (
                        <span key={index} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </td>
                    <td className="py-2 px-4">
                      <span className="text-green-100 bg-green-600 px-2 rounded-full">
                        {feedback.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex gap-2 items-center justify-center">
                        <Afficher userId={feedback.id} />
                        <Delete userId={feedback.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded`}
              >
                Précédent
              </button>
              <span>Page {currentPage} sur {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded`}
              >
                Suivant
              </button>
            </div>
          </>
        ) : (
          "Aucun Feedback Disponible"
        )}
      </div>
    </div>
  );
};

export default Feedback;
