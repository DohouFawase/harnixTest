import { useState, useEffect } from 'react';

export default function FeedbackCount() {
    const [stat, setStat] = useState([]); // État pour stocker les statistiques
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Fonction asynchrone pour récupérer les données de l'API
    async function fetchStatistics() {
        const API_URL = "http://127.0.0.1:8000/api/ratingDistrubution"; // URL de l'API
        const token = localStorage.getItem("token"); // Récupération du token

        if (!token) {
            setError("Le token d'authentification est manquant.");
            return; // Sortir si le token est manquant
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json'); // En-tête pour le type de contenu
        myHeaders.append('Authorization', `Bearer ${token}`); // En-tête pour le token

        try {
            // Effectuer la requête GET à l'API
            const response = await fetch(API_URL, {
                method: "GET",
                headers: myHeaders,
            });

            // Vérifier si la réponse est correcte
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }

            // Convertir la réponse en JSON et mettre à jour l'état
            const result = await response.json();
            setStat(result);
        } catch (error) {
            console.error("Erreur lors de la récupération des statistiques :", error); // Afficher l'erreur dans la console
            setError("Impossible de récupérer les statistiques. Vérifiez l'API ou le token.");
        }
    }

    // Utilisation de useEffect pour appeler fetchStatistics lors du montage du composant
    useEffect(() => {
        fetchStatistics();
    }, []); // Le tableau vide [] signifie que cela s'exécute une fois lors du montage du composant

    // Calculer le total des feedbacks
    const totalFeedback = stat.reduce((total, item) => total + item.count, 0);

    return (
        <div>
            <div className="space-y-2 shadow-md px-4 pe-1.5 py-2 rounded-lg">
                <p className="font-bold text-md">Feedback Total</p>
                {error ? (
                    <p className="text-red-500 font-bold">{error}</p>
                ) : (
                    <p className="font-bold text-xl">{totalFeedback || 0}</p>
                )}
            </div>
        </div>
    );
}
