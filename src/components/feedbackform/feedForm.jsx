import { useState } from "react";
import Input from "../ui/input/input";
import Button from "../ui/button/button";
import Textarea from "../ui/textarea/textarea";

export default function FeedForm() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    product_service: "",
    rating: 0,
    comment: "",
  });

  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  function validation() {
    let err = {};

    if (!feedback.name || feedback.name.trim() === "") {
      err.name = "Le champ nom est obligatoire.";
    }

    if (!feedback.email || !/^\S+@\S+\.\S+$/.test(feedback.email)) {
      err.email = "Le champ email est invalide.";
    }

    if (!feedback.product_service || feedback.product_service.trim() === "") {
      err.product_service = "Le champ produit/service est obligatoire.";
    }

    if (!feedback.comment || feedback.comment.trim() === "") {
      err.comment = "Le champ commentaire est obligatoire.";
    }

    if (feedback.rating <= 0) {
      err.rating = "Veuillez donner une note supérieure à 0.";
    }

    setError(err);
    return Object.keys(err).length === 0;
  }

  const handleRating = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  async function CreateFeedback(feedback) {
    const API_URL = "http://127.0.0.1:8000/api/postFeedback";
    const myHeaders = new Headers({
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      throw error;
    }
  }

  async function handleSubmite(e) {
    e.preventDefault();

    if (validation()) {
      try {
        await CreateFeedback(feedback);
        setSuccessMessage("Votre feedback a été soumis avec succès !");

        setFeedback({
          name: "",
          email: "",
          product_service: "",
          rating: 0,
          comment: "",
        });

        setError({});
      } catch (error) {
        console.error("Erreur lors de l'envoi du feedback :", error.message);
      }
    } else {
      console.log("Validation échouée, formulaire non envoyé.");
    }
  }

  const getInputClass = (fieldName) => {
    if (error[fieldName]) {
      return "border-red-500";
    } else if (feedback[fieldName] && !error[fieldName]) {
      return "border-green-500";
    }
    return "border-gray-300";
  };

  return (
    <div>
      {successMessage && (
        <div className="text-green-500 text-center mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmite}>
        <div className="mb-4 text-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`cursor-pointer text-xl ${
                i < feedback.rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-3">
            <Input
              label={"Nom"}
              name={"name"}
              value={feedback.name}
              className={`p-2 px-2 rounded-lg border outline-none ${getInputClass(
                "name"
              )}`}
              onChange={handleInputChange}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>

          <div className="mb-3">
            <Input
              label={"Email"}
              name={"email"}
              className={`p-2 px-2 rounded-lg border outline-none ${getInputClass(
                "email"
              )}`}
              value={feedback.email}
              onChange={handleInputChange}
            />

            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <Input
            label={"Produit/Service"}
            name={"product_service"}
            className={`p-2 px-2 rounded-lg border outline-none ${getInputClass(
              "product_service"
            )}`}
            value={feedback.product_service}
            onChange={handleInputChange}
          />

          {error.product_service && (
            <p className="text-red-500 text-sm">{error.product_service}</p>
          )}
        </div>

        <div className="">
          <Textarea
            label={"Commentaire"}
            name={"comment"}
            value={feedback.comment}
            onChange={handleInputChange}
            className={`h-[15rem] p-2 px-2 rounded-lg border outline-none ${getInputClass(
              "comment"
            )}`}
          />
          {error.comment && (
            <p className="text-red-500 text-sm">{error.comment}</p>
          )}
        </div>

        <div className="mt-3">
          <Button
            type="submit"
            className="bg-blue-400 text-white p-2 px-4 rounded-md"
          >
            Envoyez
          </Button>
        </div>
      </form>
    </div>
  );
}
