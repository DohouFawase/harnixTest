import React from 'react';
import { Navigate } from 'react-router'; // Assurez-vous que 'react-router-dom' est utilisé correctement

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Récupère les détails de l'utilisateur

    // Vérifie si le token est valide et si l'utilisateur a le rôle requis
    if (!token || !user) {
        // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
        return <Navigate to="/sign-in" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirige si le rôle utilisateur ne correspond pas au rôle requis
        return <Navigate to="/not-authorized" replace />;
    }

    // Si tout est valide, affiche les enfants (les composants protégés)
    return children;
};

export default ProtectedRoute;
