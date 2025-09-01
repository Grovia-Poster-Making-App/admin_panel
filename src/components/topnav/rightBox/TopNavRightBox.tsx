import React from "react";
import Profile from "./profile/Profile";
import classes from "./TopNavRightBox.module.scss";

function TopNavRightBox() {
  return (
    <div className={classes.topNav__right}>
      <Profile />
    </div>
  );
}

export default TopNavRightBox;
