import React from "react";
import AuthService from "../../../services/AuthService";
import MemberCard from "../../Team/MemberCard";
import Footer from "../Footer";
import { LinearProgress } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import fetchService from "../../../services/fetchService";
import AchievementsCard from "./AchievementsCard";
import { createAchievementInfo } from "../../../services/achievements";
function Home(props) {
  React.useEffect(() => {
    document.title = "Student Specialty Advisor";
  }, []);

  const isLoggedIn = AuthService.isLoggedIn();

  const PublicPage = () => {
    return (
      <>
        <div className="home-public-head">
          <img className="home-public-head-bg" alt=""></img>
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
          </ul>
        </div>
        <Footer />
      </>
    );
  };

  const PrivatePage = () => {
    const [progress, setProgress] = React.useState(0);
    const [achievementCards, setAchievementCards] = React.useState([]);
    const setupCards = (achievementObject) => {
      const array = [];
      for (const key in achievementObject) {
        if (
          achievementObject[key] === true ||
          achievementObject[key] === false
        ) {
          array.push({
            ...createAchievementInfo(key),
            isCompleted: achievementObject[key],
          });
        }
      }
      setAchievementCards(array);
    };

    const cardsList = achievementCards.map((achievement) => {
      return (
        <AchievementsCard
          key={achievement.title}
          title={achievement.title}
          description={achievement.description}
          isCompleted={achievement.isCompleted}
        />
      );
    });

    const calculateProgress = (achievements) => {
      var completed = 0;
      for (const achievement in achievements) {
        if (achievements[achievement] === true) {
          completed++;
        }
      }
      var total = Object.keys(achievements).length - 3;
      var percentage = (completed / total) * 100;
      return Math.floor(percentage);
    };

    React.useEffect(() => {
      const fetchProgress = async () => {
        const response = await fetchService.doGET(
          "achievements/" + AuthService.getCurrentUser().id
        );
        if (response.success) {
          localStorage.setItem(
            "userAchievements",
            JSON.stringify(response.achievements)
          );
          var progress = calculateProgress(response.achievements);
          setProgress(progress);
          setupCards(response.achievements);
        } else {
          console.log(response.errorObject);
        }
      };

      var storedAchievements = JSON.parse(
        localStorage.getItem("userAchievements")
      );
      if (storedAchievements === null) {
        fetchProgress();
      } else {
        var progress = calculateProgress(storedAchievements);
        setProgress(progress);
        setupCards(storedAchievements);
      }
    }, []);

    return (
      <>
        <div className="home-private">
          <h1>
            Welcome to the family,
            {" " +
              AuthService.getCurrentUser().firstName[0].toUpperCase() +
              AuthService.getCurrentUser().firstName.slice(1)}
            !
          </h1>
          <h2>
            Explore the web app, and your progress points will increase!
            <br />
            At 100%, you will have all the information you need to make the
            right choice!
          </h2>
          <div
            style={{
              display: "flex",
              width: "78%",
              justifyContent: "space-between",
              margin: "auto",
              paddingBottom: "0.5%",
            }}
          >
            <h4>Your progress:</h4>
            <h4>{progress}%</h4>
          </div>
          <div
            style={{
              position: "relative",
              width: "80%",
              margin: "auto",
              backgroundColor: "white",
              paddingRight: "0.4%",
              borderRadius: "25px",
            }}
          >
            <LinearProgress
              className="achievements-progress-bar"
              variant="determinate"
              color="inherit"
              value={progress}
            />
            <EmojiEventsIcon className="achievements-emoji" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "auto",
            marginTop: "5.5vh",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {cardsList}
        </div>
      </>
    );
  };

  return isLoggedIn ? <PrivatePage /> : <PublicPage />;
}

export default Home;
