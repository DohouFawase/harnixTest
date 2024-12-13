import { useState } from "react";
import Input from "../../ui/input/input";
import Button from "../../ui/button/button";
import { NavLink,useNavigate } from "react-router";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaEyeSlashSolid ,LiaEyeSolid} from "react-icons/lia";
import { SiMaildotru } from "react-icons/si";
export default function RegisterComponents() {
  const [eyes, setEyes] = useState(false);
  function passwordShow() {
    setEyes(!eyes);
  }

  const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
console.log(data)
    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };  

      async function registerd(params) {
        console.log('sublited danat')
        const API_URL = 'http://127.0.0.1:8000/api/register'
        const myHeaders = new Headers();
        myHeaders.append(  "Content-Type", "application/json")
        try {
          const request = await fetch(API_URL, {
            method:'POST',
            headers:myHeaders,
            body:JSON.stringify(data),
            mode: "cors", 
            cache: "no-cache",
            credentials: "same-origin",
          });

          if(!request.ok) {
            throw new Error(`HTTP error! Status: ${request.status}`);
          }
          const resultat = await request.json();
          localStorage.setItem('user', JSON.stringify(resultat))
          console.log("Réussite :", resultat);
        } catch (error) {
          console.error("Erreur :", error);
        }
      }
  async function Onsubmite (e) {
    e.preventDefault()
    console.log("hello word")

    const RefiterdData = await registerd()

    if(RefiterdData) {
      navigate('/sign-in')
    }
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
                  <NavLink>Inscription</NavLink>
                </p>

                <p>
                  <NavLink> Connexion</NavLink>
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={Onsubmite} action="" className="space-y-3">
            <div className="relative">
              <Input
                label={"Nom"}
                name={"name"}
                value={data.name}
                onChange={handleInputChange}
                className="border border-gray-200  w-full md:w-96 px-2 p-2 rounded-md"
              />
              <div className="cursor-pointer absolute bottom-2  right-2 border-l-2 border-l-gray-200 px-2">
              <FaRegUserCircle />
              </div>
            </div>

            <div className="relative">
              <Input
                label={"Email"}
                name={"email"}
                value={data.email}
                onChange={handleInputChange}
                className="border border-gray-200 px-2 p-2 w-full md:w-96 rounded-md"
              />
              <div className="cursor-pointer absolute bottom-2 right-2 border-l-2 border-l-gray-200 px-2">
              <SiMaildotru/>

              </div>
            </div>

            <div className="relative">
              <Input
                label={"Mots de Passe"}
                type={eyes ? "text" : "password"}
                name={"password"}
                value={data.password}
                onChange={handleInputChange}
                className="border border-gray-200 w-full md:w-96 px-2 p-2 rounded-md"
              />

              <div
                className="cursor-pointer absolute bottom-2 right-2 border-l-2 border-l-gray-200 px-2"
                onClick={passwordShow}
              >
               {eyes ?  <LiaEyeSolid/> : <LiaEyeSlashSolid />}

              </div>
            </div>
            <Button type="submit" className="bg-blue-600 px-4 py-2 rounded-md text-white hover:shadow-md duration-75 ease-in-out hover:-translate-y-1">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
