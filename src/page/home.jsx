import { useState } from "react";
import { NavLink } from "react-router";
import FeedForm from "../components/feedbackform/feedForm";
  
import HeroImage from "../assets/image/aze.jpg"
export default function HomePage() {
  return (
    <>
      <div className="px-8 my-6">
        <div className="grid grid-cols-2 items-center">
        <div className="px-8 flex  flex-col  space-y-2">
            <h1 className="font-bold text-[2.5rem] title">
              {" "}
              <strong>Votre avis compte vraiment !</strong>
            </h1>
            <p className="">
              Aidez-nous à améliorer nos produits et services en partageant
              votre expérience. Nous vous écoutons !
            </p>

            <div className="py-4">
              <NavLink className="bg-blue-600 text-white px-4 py-2 rounded-md hover:shadow ">
                Donner mon avis
              </NavLink>
            </div>
          </div>

          <div className="">

            <img src={HeroImage} alt="" />
          </div>
        
        </div>


        <div className="px-8 mt-8">
          <div className="">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Partagez votre expérience
            </h2>
          </div>

          <FeedForm />
        </div>
      </div>
    </>
  );
}
