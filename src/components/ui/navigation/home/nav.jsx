import React from "react";
import { NavLink } from "react-router";

export default function Nav() {
  return (
    <div className="">
      <div className="flex justify-between p-6 px-8">
        <div className="">
          <h1 className="font-bold text-xl">
            <NavLink to={"/"}>Harnix</NavLink>
          </h1>
        </div>
        <div className="bg-black text-white  px-2 py-1  rounded-md  hover:-translate-y-1 hover:scale-10  hover:text-inherent  shadow-md transition ease-in-out delay-150 hover:border-black hover:bg-transparent hover:text-black ">
          <NavLink to={"/sign-in"}>Sign In</NavLink>
        </div>
      </div>
    </div>
  );
}
