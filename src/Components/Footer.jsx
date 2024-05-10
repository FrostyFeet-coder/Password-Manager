import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center  w-full fixed-bottom-0" >
      <div className="logo font-bold text-white text-2xl">
        <span className="text-black ">&lt;</span>
        Password Manager
        <span className="text-black "> / &gt;</span>
      </div>
      <div className="flex justify-center items-center">
        {" "}
        Created with <img
          className="w-7 mx-2"
          src="icons/heart.jpg"
          alt=""
        />{" "}
        by Ansh Wasan{" "}
      </div>
    </div>
  );
};

export default Footer;
