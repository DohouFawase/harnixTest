import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const RatingHistogramChart = () => {
    const [chartData, setChartData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // État pour suivre la barre active

    // Fonction pour récupérer les données
    const fetchData = async () => {
        
        const API_URL = 'http://127.0.0.1:8000/api/ratingDistrubution'; // Correction du nom de l'API

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,// Décommentez si vous utilisez un token
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from API'); // Gestion des erreurs
            }

            const result = await response.json();
            // Transformation des données pour le graphique
            const data = result.map(rating => ({
                name: `Rating ${rating.rating}`,
                count: rating.count,
            }));

            setChartData(data);
        } catch (error) {
            console.error('Error fetching data:', error); // Gestion des erreurs
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Appel unique au chargement

    // Fonction pour obtenir une couleur différente pour chaque barre
    const getColor = (index) => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        return activeIndex === index ? '#FF5733' : colors[index % colors.length]; // Change la couleur si la barre est active
    };

    return (
        <div>
            <h2>Histogramme des Notes</h2>
            {chartData.length > 0 ? ( // Vérification des données
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} animationDuration={1000} animationEasing="ease-in-out">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar 
                            dataKey="count" 
                            animationDuration={500}
                            onMouseEnter={(data, index) => setActiveIndex(index)} // Met à jour l'index actif au survol
                            onMouseLeave={() => setActiveIndex(null)} // Réinitialise l'index actif lorsque la souris quitte
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>Chargement des données...</p> // Message de chargement
            )}
        </div>
    );
};

export default RatingHistogramChart;
