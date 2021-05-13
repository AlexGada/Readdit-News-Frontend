import React from "react";
import Avatar from "@material-ui/core/Avatar";

const Title = () => {
  return (
    <header className="Title">
      <h1 className="Title-header">READDIT NEWS</h1>
      <div className="avatar">
        <Avatar
          className="avatar"
          alt="weegembump"
          src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
        />
        <br />
        <p>Logged in as weegembump</p>
      </div>
    </header>
  );
};
export default Title;
