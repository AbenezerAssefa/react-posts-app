import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.avif";
import LogoFallback from "../images/logo.jpg";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);

  const closeNavHandler = () => {
    setIsNavShowing(!isNavShowing);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img
            src={Logo}
            alt="Navbar Logo"
            onClick={closeNavHandler}
            onError={(e) => (e.target.src = LogoFallback)}
          />
        </Link>
        {isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to={"/profile/username"} onClick={closeNavHandler}>
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/create"} onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to={"/logout"} onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        <button className="nav__toggle-btn" onClick={closeNavHandler}>
          {isNavShowing ? (
            <CloseIcon style={{ color: "#1976D2" }} />
          ) : (
            <MenuIcon style={{ color: "#1976D2" }} />
          )}
        </button>
        {/* {isNavShowing ? <CloseIcon /> : <MenuIcon />} */}
      </div>
    </nav>
  );
};

export default Header;
