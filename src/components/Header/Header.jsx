import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"

export const Header = () => {
  return (
    <header className="w-screen px-6 py-2 flex justify-center items-center">
      <div className="w-24">
        <NavLink to="/">
        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" width="160" height="40" title="Flipkart"/>
        </NavLink>
      </div>
      <div className="mr-auto w-2/5 mx-4">
        <input
          type="text"
          className="bg-blue-50 border border-slate-700 rounded-md w-full"
          placeholder="Search Products..."
        />
      </div>
      <nav>
        <ul className="flex justify-center items-center">
          <Operation link="/login" name="Login" />
          <Operation link="/registration" name="Registration" />
          <Operation link="/cart" name="Cart" />
          <Operation link="/becomeASeller" name="Become a Seller" />
          <Operation link="/..." name="..." />
        </ul>
      </nav>
    </header>
  );
};

export function Operation({ link, name }) {
  return (
    <li
      className="mx-2 px-2 py-1 hover:bg-blue-500 rounded-md hover:text-slate-50
      text-center"
    >
      <NavLink to={link}>{name}</NavLink>
    </li>
  );
}

// export const Operation1 =()=>{

// }
