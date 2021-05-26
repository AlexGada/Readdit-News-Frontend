import React from "react";
import { Link } from "@reach/router";

const Title = () => {
  return (
    <header className="Title">
      <Link to="/">
        <h1 className="Title-header">READDIT NEWS</h1>
      </Link>
      <div className="avatar">
        <img
          src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
          alt="weegembump"
          className="avatarImage"
        />
        <br />
        <p className="username">
          Logged in as <br></br> weegembump
        </p>
      </div>
    </header>
  );
};
export default Title;
