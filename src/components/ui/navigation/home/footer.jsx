import React from "react";
import { NavLink } from "react-router";
import { FaFacebook ,FaYoutube,FaWhatsapp} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
export default function Footer() {
  const copyWrit= new Date().getFullYear();
  console.log(copyWrit)
  
  return (
    <div className="bg-black text-white mt-12 relative">
      <div className="px-8 pt-8">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <h1 className="font-black text-3xl">Harnix </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              consequatur commodi dolore quo obcaecati dolorem magni consectetur
              maxime hic, pariatur quia sequi veniam velit. Vel.
            </p>
          </div>
          <div className="">
            <div className=" grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex flex-col space-y-2 ">
                <h1 className="">Our Company</h1>
                <div className="">
                  <ul className="space-y-2">
                    <li>
                      {" "}
                      <NavLink to={"#"}>Acceuil</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Product</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Carriere</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Contact</NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ">
                <h1 className="font-bold text-lg">Our Company</h1>

                <div className="space-y-2">
                  <ul className="space-y-2">
                    <li>
                      {" "}
                      <NavLink to={"#"}>Acceuil</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Product</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Carriere</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Contact</NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ">
                <h1 className="font-bold text-lg">Conctact us </h1>

                <div className="">
                  <ul className="space-y-2">
                    <li>
                      {" "}
                      <NavLink to={"#"}>FAQS</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>Contact</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink to={"#"}>About us</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-4 items-center">
              <p>{copyWrit} Harnix SaaS Copywrite | all right Reserve</p>
              <div className="">
                <ul className="flex gap-4">
                  <li><NavLink  to={"https://www.facebook.com/harnixsas"}><FaFacebook /></NavLink></li>
                  <li><NavLink><RiTwitterXFill/></NavLink></li>
                  <li><NavLink><IoLogoLinkedin/></NavLink></li>
                  <li><NavLink><FaYoutube /></NavLink></li>
                  <li><NavLink><FaWhatsapp /></NavLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <img src="/hey.png" className="w-[12rem] absolute bottom-0"/> */}
    </div>
  );
}
