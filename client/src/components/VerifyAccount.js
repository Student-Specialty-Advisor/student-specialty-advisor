import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import Loading from "./Loading";
import { StyledButton } from "./Basic Elements/StyledBasicElements";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
function VerifyAccount(props) {
  let { id } = useParams();
  const [success, setIsSuccess] = React.useState(false);
  const [error, setIsError] = React.useState(false);
  const [noResponse, setNoResponse] = React.useState(false);
  React.useEffect(() => {
    AuthService.verifyAccount(id)
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setNoResponse(true);
      });
  }, [id]);

  return (
    <div
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
      {!error && !success && !noResponse ? <Loading /> : null}
      {error ? (
        <>
          <CancelIcon sx={{ color: "red", fontSize: 70 }} />
          <h2>Verification wasn't approved !</h2>
          <p>Verification email is invalid or expired</p>
        </>
      ) : null}
      {success ? (
        <>
          <CheckCircleIcon sx={{ color: "green", fontSize: 70 }} />
          <h2>Verification was approved</h2>
          <p>You can now access to your account !</p>
          <br />
          <StyledButton
            variant="contained"
            size="large"
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Continue to login
          </StyledButton>
        </>
      ) : null}
      {noResponse ? (
        <>
          <SignalWifiConnectedNoInternet4Icon
            sx={{ color: "orange", fontSize: 70 }}
          />
          <h2>Opps ... We are having trouble getting to the server</h2>
          <p>
            Please try again Later ! <br /> If the problem persists , please
            contact us :
          </p>

          <a
            href="mailto:studentspecialtyadvisor@outlook.com"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              color: "var(--myblue)",
            }}
          >
            studentspecialtyadvisor@outlook.com
          </a>
        </>
      ) : null}
    </div>
  );
}

export default VerifyAccount;
