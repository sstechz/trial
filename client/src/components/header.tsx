import { Typography, Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";

import "./header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { destroyLogin } from "../store/loginSlice";
import { destroyRegistered } from "../store/registeredSlice";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    if (token !== "") {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else setShow("show");
    } else setShow("top");
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${show} ${mobileMenu ? "mobileView" : ""}`}>
      <ul className="menuItems">
        <li className="menuItem" onClick={() => navigate("/")}>
          Home
        </li>
        <li className="menuItem">Sports Arena</li>
        <li className="menuItem">Discussions</li>
        <li className="menuItem">About</li>
        <li className="menuItem">Testimonials</li>
        <li className="menuItem">Contact</li>
        <li
          className="menuItem user"
          onClick={() => {
            if (isLogin) {
              dispatch(destroyLogin());
              dispatch(destroyRegistered());
              setIsLogin(false);
            }
            navigate("/login");
          }}
        >
          {isLogin ? "Logout" : "Login"}
        </li>
      </ul>
      <div className="mobileMenuItems">
        {mobileMenu ? (
          <VscChromeClose
            onClick={() => {
              setMobileMenu(false);
            }}
          />
        ) : (
          <SlMenu
            onClick={() => {
              setMobileMenu(true);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
