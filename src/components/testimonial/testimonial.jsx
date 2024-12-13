import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

export default function Testimonial() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  // Fonction pour récupérer les données de l'API
  async function getList() {
    const API_URL = 'http://127.0.0.1:8000/api/feedbackGet';
    const myHeaders = new Headers({
      "Content-Type": "application/json",
    });

    try {
      const getData = await fetch(API_URL, {
        method: 'GET',
        headers: myHeaders,
      });

      if (!getData.ok) {
        throw new Error(`HTTP error! Status: ${getData.status}`);
      }

      const getresult = await getData.json();

      // Vérifier si la réponse contient la propriété 'data' et mettre à jour l'état
      if (getresult && Array.isArray(getresult.data)) {
        setFeedbackList(getresult.data.slice(0, 6)); // Extraire le tableau depuis la propriété 'data'
      } else {
        console.error('La réponse API ne contient pas un tableau dans "data":', getresult);
        setFeedbackList([]); // En cas d'erreur, réinitialiser avec un tableau vide
      }

      setLoading(false); // Fin du chargement

    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setLoading(false); // Fin du chargement en cas d'erreur
    }
  }

  useEffect(() => {
    getList();
  }, []); // Charger les données au montage du composant

  // Affichage pendant le chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="testimonial-container">
      <div className="grid grid-cols-3 gap-4">
        {
          feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <motion.div
                key={feedback.id}
                className="shadow rounded-md  space-y-2 h-52 bg-black text-white p-4 flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mt-2">
                  {/* Affichez l'étoile (ou toute autre notation visuelle) */}
                  <span className="ml-2">
                    {Array.from({ length: feedback.rating }, (_, index) => (
                      <span key={index} className="text-yellow-500">★</span>
                    ))}
                  </span>
                </div>
                <h3 className="font-bold">{feedback.name}</h3> {/* Affichez le nom de l'auteur */}
                <p>{feedback.comment}</p> {/* Affichez le commentaire */}
                
              </motion.div>
            ))
          ) : (
            <div>Aucun feedback disponible.</div>
          )
        }
      </div>
    </div>
  );
}
