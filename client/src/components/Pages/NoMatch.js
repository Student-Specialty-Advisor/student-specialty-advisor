import React from "react";
import noMatchImage from "../../assets/art/gif/404.gif";
import { useMediaQuery } from "@mui/material";
function NoMatch() {
  React.useEffect(() => {
    document.title = "404 - Student Specialty Advisor";
  }, []);
  const isMobile = useMediaQuery("(max-width:1080px)");

  return (
    <div className="no-match-container">
      <img src={noMatchImage} alt="" draggable="false"></img>
      <div className="no-match-text-container">
        <h1>404</h1>
        {!isMobile && (
          <>
            <h2>UH OH! You're lost.</h2>
            <p>
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click on the navigation bar to get some
              directions.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default NoMatch;
