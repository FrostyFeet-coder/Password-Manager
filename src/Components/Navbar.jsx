import React from 'react'

function Navbar() {
    return (
      <nav className="bg-violet-500 ">
        <div className="mycontainer flex justify-between items-center  px-4 py-5 h-14">
          <div className="logo font-bold text-white text-2xl">
            <span className="text-black ">&lt;</span>
            Password Manager
            <span className="text-black "> / &gt;</span>
          </div>
          {/* <ul>
            <li className="flex gap-6 mr-[-6rem]">
              <a className="hover:font-bold text-2xl" href="#">
                Home
              </a>
              <a className="hover:font-bold text-2xl" href="#">
                About
              </a>
              <a className="hover:font-bold text-2xl" href="#">
                Contact
              </a>
            </li>
          </ul> */}
          <button className="text-white bg-violet-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1">
            <img
              className="invert  w-10 p-1 rounded-full"
              src="/icons/github.png"
              alt="github logo"
            />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </div>
      </nav>
    );
}

export default Navbar