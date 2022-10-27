import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-2 md:w-4/6">
      <Link href="/">
        <h1 className="font-medium text-2xl relative z-20 hover:cursor-pointer">
          NhimSally
        </h1>
      </Link>
      {/* Mobile Nav */}
      <div className="group">
        <IconContext.Provider
          value={{ color: "rgb(24 24 27)", className: "global-class-name" }}
        >
          <GiHamburgerMenu className="hamburger" />
        </IconContext.Provider>
        <div
          className="navbarDropdownList  fixed w-screen h-screen top-0 left-0 p-2 bg-white flex text-center items-start justify-center
    transition-all duration-300 scale-0 origin-top-right group-hover:scale-100 z-10;"
        >
          <ul className="flex flex-col gap-4 pt-12">
            <Link href="/gallery">
              <li className="navbarDropdownListItem">Galleries</li>
            </Link>
            <Link href="/booking">
              <li className="navbarDropdownListItem">Make A Booking</li>
            </Link>
            <Link href="/contact">
              <li className="navbarDropdownListItem">Contact</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Tablet and desktop Nav */}
      <div className="hidden md:flex">
        <ul className="flex gap-4 ">
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
