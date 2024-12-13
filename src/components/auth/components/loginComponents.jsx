import { useState } from "react";
import Input from "../../ui/input/input";
import Button from "../../ui/button/button";
import { NavLink, useNavigate } from "react-router";
import { LiaEyeSlashSolid ,LiaEyeSolid} from "react-icons/lia";
import { SiMaildotru } from "react-icons/si";
export default function LoginComponents() {
  const [eyes, setEyes] = useState(false);
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  async function login() {
    console.log('Submitting data');
    const API_URL = 'http://127.0.0.1:8000/api/login';
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    try {
      const request = await fetch(API_URL, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
      });
  
      if (!request.ok) {
        const errorResponse = await request.json();
        throw new Error(errorResponse.message || `HTTP error! Status: ${request.status}`);
      }
  
      const resultat = await request.json();
      localStorage.setItem('token', JSON.stringify(resultat.token));
      localStorage.setItem('user', JSON.stringify(resultat.user));
      console.log("Réussite :", resultat);
  
      return resultat; // Retourne l'objet contenant le token et l'utilisateur
    } catch (error) {
      console.error("Erreur :", error);
      setErrorMessage(error.message); // Affiche le message d'erreur
      return null; // Échec de la connexion
    }
  }
  

  async function Onsubmite(e) {
    e.preventDefault();
    
    // Réinitialise le message d'erreur avant chaque tentative
    setErrorMessage(""); 
  
    try {
      // Tentative de connexion
      const loginResponse = await login(); // Cela renvoie maintenant l'objet contenant le token et l'utilisateur
    
      if (loginResponse && loginResponse.token) {
        // Enregistre le token dans le localStorage
        localStorage.setItem('token', loginResponse.token);
    
        // Vérifie et enregistre les informations utilisateur
        const user = loginResponse.user;
        if (!user || !user.role) {
          throw new Error("Rôle utilisateur introuvable. Contactez l'administrateur.");
        }
        localStorage.setItem('user', JSON.stringify(user)); // Sauvegarde l'utilisateur dans le localStorage
    
        // Redirection en fonction du rôle utilisateur
        if (user.role === 'admin') {
          navigate('/dashboard'); // Rediriger vers le tableau de bord pour admin
        } else if (user.role === 'user') {
          navigate('/'); // Rediriger vers la page d'accueil pour utilisateur
        } else {
          throw new Error("Accès refusé : Rôle inconnu.");
        }
      } else {
        setErrorMessage("Identifiants invalides. Veuillez vérifier vos informations.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error.message); // Log pour débogage
      setErrorMessage(error.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  }
  
  

  function passwordShow() {
    setEyes(!eyes);
  }

  return (
    <div>
      <div className="">
        <div className="shadow py-8 px-12 rounded-md for">
          <div className="">
            <div className="my-2">
              <h1 className="text-center font-black text-3xl mb-4">
                <strong>Harnix</strong>
              </h1>
              <div className="flex justify-between">
                <p>
                  <NavLink to="/login">Connexion</NavLink>
                </p>
                <p>
                  <NavLink to={'/sign-up'}> Inscription</NavLink>
                </p>
              </div>
            </div>
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>} {/* Affichage du message d'erreur */}
          <form onSubmit={Onsubmite} className="space-y-3">
            <div className="relative">
              <Input
                label={"Email"}
                name={"email"}
                onChange={handleInputChange}
                value={data.email}
                className="border border-gray-200 px-2 p-2 rounded-md w-full md:w-96"
              />
              <div className="cursor-pointer absolute bottom-2 right-2 border-l-2 border-l-gray-200 px-2">
              <SiMaildotru/>
                  
              </div>
            </div>

            <div className="relative">
              <Input
                label={"Mot de Passe"}
                type={eyes ? "text" : "password"}
                name={"password"}
                onChange={handleInputChange}
                value={data.password}
                className="border border-gray-200 px-2 p-2 w-full md:w-96 rounded-md"
              />
              <div
                className="cursor-pointer absolute bottom-2 right-2 border-l-2 border-l-gray-200 px-2"
                onClick={passwordShow}
              >
                {eyes ? <LiaEyeSlashSolid /> : <LiaEyeSolid/>}
              </div>
            </div>

            <Button type="submit" className="bg-blue-600 px-4 py-2 rounded-md text-white hover:shadow-md duration-75 ease-in-out hover:-translate-y-1">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
