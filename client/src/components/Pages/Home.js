import React from "react";
import AuthService from "../../services/AuthService";
import MemberCard from "../Team/MemberCard";
import Footer from "./Footer";

function Home(props) {
  React.useEffect(() => {
    document.title = "Student Specialty Advisor";
  }, []);

  const isLoggedIn = AuthService.isLoggedIn();

  const PublicPage = () => {
    return (
      <>
        <div className="home-public-head">
          <h1>Student Specialty Advisor</h1>
          <h2>By Students, For Students.</h2>
          <br />
          <p>
            Free, Reliable & Safe. Let us help you get things done. Join the
            family now!
          </p>
          <button
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            Sign Up For Free
          </button>
          <br /> <br /> <br />
          <p>“Good Advice Is Beyond All Price”</p>
        </div>
        <div className="home-public-mid">
          <h1>All the info you need in one place.</h1>
          <br />
          <p>
            Choosing a specialty might define your future career. We & the SMU
            community will help you pick a decision you will not regret.
          </p>
        </div>
        <br /> <br /> <br />
        <div className="home-public-mid-img"></div>
        <div className="home-public-mid-other">
          <h1>So.. What is it?</h1>
          <p>
            Student Specialty Advisor is a free service, delivered as a
            web-based multifeatured app to SMU students.
            <br />
            <br />
            We believe that with what this project provides, choosing a
            specialty has never been easier.
            <br />
            <br />
            Gone are the days of "I am not sure", "I don't know the difference"
            & "What if".
          </p>
        </div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <div className="home-public-mid-other-img">
          <div id="side-a"></div>
          <div id="side-b"></div>
        </div>
        <div className="home-public-bot">
          <h1>Access multiple features at any time!</h1>
          <ul className="feature-img">
            <li id="featureOne"></li>
            <li id="featureTwo"></li>
            <li id="featureThree"></li>
            <li id="featureFour"></li>
          </ul>
          <ul className="feature-desc">
            <li id="featureOne">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li id="featureTwo">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li id="featureThree">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li id="featureFour">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
        </div>
        <div className="home-public-team">
          <h1>Cooking the website with love:</h1>
          <ul>
            <MemberCard
              fullname="Aymen HAMMAMI"
              email="contact"
              fb="https://www.facebook.com"
              github="https://www.github.com"
            />
            <MemberCard
              fullname="Youssef AYDI"
              email="contact"
              fb="https://www.facebook.com"
              github="https://www.github.com"
            />
            <MemberCard
              fullname="Aziz MAAZOUZ"
              email="contact"
              fb="https://www.facebook.com"
              github="https://www.github.com"
            />
            <MemberCard
              fullname="Mahdi KLOUZ"
              email="contact"
              fb="https://www.facebook.com"
              github="https://www.github.com"
            />
            <MemberCard
              fullname="Amir MEKNI"
              email="contact"
              fb="https://www.facebook.com"
              github="https://www.github.com"
            />
          </ul>
        </div>
        <Footer />
      </>
    );
  };

  const PrivatePage = () => {
    return (
      <>
        <div className="home-private">
          <h1>
            Hey there, {AuthService.getCurrentUser().firstName}! <br />
            Welcome to MedTech Student Specialty Advisor!
          </h1>
        </div>
      </>
    );
  };

  return isLoggedIn ? <PrivatePage /> : <PublicPage />;
}

export default Home;
