import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [navBarStyle, setNavBarSyle] = useState<string>(
    "navbarDropdownList scale-0"
  );
  const [hamburgerStyle, setHamburgerStyle] = useState("hamburger");

  const navBarHandler = () => {
    setNavBarSyle(
      navBarStyle === "navbarDropdownList scale-0"
        ? "navbarDropdownList scale-100"
        : "navbarDropdownList scale-0"
    );
    hamburgerHandler();
  };

  const hamburgerHandler = () => {
    setHamburgerStyle(
      hamburgerStyle === "hamburger" ? "hamburger rotate-90" : "hamburger"
    );
  };

  return (
    <div className="flex justify-between items-center p-2 md:w-4/6">
      <Link href="/">
        <h1 className="font-medium text-2xl relative z-20 hover:cursor-pointer">
          NhimSally
        </h1>
      </Link>

      {/* Mobile Nav */}
      <div onClick={navBarHandler} className="group ">
        <IconContext.Provider
          value={{
            color: "rgb(24 24 27)",
            className: "global-class-name 0",
          }}
        >
          <GiHamburgerMenu className={hamburgerStyle} />
        </IconContext.Provider>
        <div className={navBarStyle}>
          <ul className="flex flex-col gap-4 pt-12">
            <Link href="/">
              <li onClick={navBarHandler} className="navbarDropdownListItem ">
                Home
              </li>
            </Link>
            <Link href="/gallery">
              <li onClick={navBarHandler} className="navbarDropdownListItem">
                Galleries
              </li>
            </Link>
            <Link href="/booking">
              <li onClick={navBarHandler} className="navbarDropdownListItem">
                Make A Booking
              </li>
            </Link>
            <Link href="/contact">
              <li onClick={navBarHandler} className="navbarDropdownListItem">
                Contact
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Tablet and desktop Nav */}
      <div className="hidden md:flex">
        <ul className="flex gap-4 ">
          <Link href="/">
            <li className="navbarDropdownListItem">Home</li>
          </Link>
          <Link href="/gallery">
            <li className="navbarStandardListItem">Galleries</li>
          </Link>
          <Link href="/booking">
            <li className="navbarStandardListItem">Make A Booking</li>
          </Link>
          <Link href="/contact">
            <li className="navbarStandardListItem">Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
