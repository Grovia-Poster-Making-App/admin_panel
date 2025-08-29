import React, { useContext } from "react";
import ThemeContext from "../../../../store/themeContext";
import classes from "./ThemeBox.module.scss";

function ThemeBox() {
  // const [theme, setTheme] = useState("light");
  const themeCtx = useContext(ThemeContext);
  let theme = themeCtx.theme;

  return (
    <div className={classes.themeBox} onClick={() => themeCtx.toggleTheme()}>
      <div
        className={`${classes.themeBox__icon} ${
          theme === "dark" ? classes.darkMode : ""
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 17.6859L18.5 18.5M20 12H21M18.5 5.5L17.6859 6.31412M6.31412 17.6859L5.5 18.5M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default ThemeBox;
