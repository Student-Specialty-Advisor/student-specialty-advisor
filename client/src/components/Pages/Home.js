import React from "react";
import AuthService from "../../services/AuthService";

function Home() {
  const isLoggedIn = AuthService.isLoggedIn();

  const PublicPage = (
    <div>
      <h1>Welcome to MedTech Student Specialty Advisor (VISITOR)</h1>
    </div>
  );

  const PrivatePage = (
    <div>
      <h1>
        Welcome to MedTech Student Specialty Advisor (MEMBER IS SIGNED IN)
      </h1>
    </div>
  );

  return isLoggedIn ? PrivatePage : PublicPage;
}

export default Home;
