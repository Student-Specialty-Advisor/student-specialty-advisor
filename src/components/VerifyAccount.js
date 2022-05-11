import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Redirect, useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import Loading from "./Loading";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
function VerifyAccount(props) {
  let { id } = useParams();
  const [success, setIsSuccess] = React.useState(false);
  const [error, setIsError] = React.useState(false);
  const [noResponse, setNoResponse] = React.useState(false);
  const [redirectCounter, setRedirectCounter] = React.useState(5);
  const countdownRef = React.useRef(null);

  const isLoggedIn = AuthService.isLoggedIn();

  const startCountdown = () => {
    var interval = setInterval(() => {
      setRedirectCounter((prev) => {
        if (prev > 0) {
          if (prev - 1 === 0) {
            clearInterval(interval);
          }
          return prev - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    countdownRef.current = interval;
  };

  const redirectCountdown =
    redirectCounter === 0 ? (
      success ? (
        <Redirect to="/login"></Redirect>
      ) : (
        <Redirect to="/"></Redirect>
      )
    ) : (
      <p>
        <strong>
          Redirecting you to {success ? "login page" : "home page"} in{" "}
          {redirectCounter}..
        </strong>
      </p>
    );

  React.useEffect(() => {
    document.title = "Verification - Student Specialty Advisor";
    return () => {
      clearInterval(countdownRef);
    };
  }, []);

  React.useEffect(() => {
    AuthService.verifyAccount(id)
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
        startCountdown();
      })
      .catch((error) => {
        setNoResponse(true);
        startCountdown();
      });
  }, [id]);

  return isLoggedIn ? (
    <Redirect to="/"></Redirect>
  ) : (
    <div
      className="verification-page"
      style={{
        width: "100%",
        height: "100vh",
        zIndex: "15",
        position: "fixed",
        backgroundColor: "var(--mybgcolor)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "var(--mydarkerblue)",
        textAlign: "center",
      }}
    >
      {error ? (
        <>
          <CancelIcon sx={{ color: "red", fontSize: 70 }} />
          <h2>Verification wasn't approved!</h2>
          <p>
            This verification link is invalid.
            <br /> Make sure you clicked on the right link.
            <br />
            Having difficulties verifying your account?
            <br />
            <a
              href="mailto: studentspecialtyadvisor@outlook.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Contact us!
            </a>
          </p>
          {redirectCountdown}
        </>
      ) : null}
      {success ? (
        <>
          <CheckCircleIcon sx={{ color: "green", fontSize: 70 }} />
          <h2>Verification was approved!</h2>
          <p>You now have access to your account!</p>
          {redirectCountdown}
        </>
      ) : null}
      {noResponse ? (
        <>
          <SignalWifiConnectedNoInternet4Icon
            sx={{ color: "orange", fontSize: 70 }}
          />
          <h2>Oops.. :( We are having trouble getting to the server!</h2>
          <p>
            Please try again later!
            <br />
            If the problem persists, please{" "}
            <a
              href="mailto: studentspecialtyadvisor@outlook.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              contact us!
            </a>
          </p>
          {redirectCountdown}
        </>
      ) : null}
      {!error && !success && !noResponse ? <Loading /> : null}
    </div>
  );
}

export default VerifyAccount;
