import emailIcon from "../../assets/art/icon/email.png";
import linkedinIcon from "../../assets/art/icon/linkedin.png";

function AdvisorCard(props) {
  return (
    <div className="advisor-card">
      <img src={props.picture} className="picture" alt=""></img>
      <p className="advisor-info">
        <strong>{props.fullname}</strong>
        <br />
        {props.profession}
        <br />
        Advisor for {props.specialty}
      </p>
      <div className="card-overlay">
        <div style={{ marginLeft: "7%", marginRight: "7%" }}>
          '{props.quote}'
        </div>
        <div style={{ display: "flex", gap: "10%" }}>
          <a
            href={"mailto: " + props.email}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="icon" src={emailIcon} alt=""></img>
          </a>
          <a href={props.linkedin} target="_blank" rel="noreferrer noopener">
            <img className="icon" src={linkedinIcon} alt=""></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdvisorCard;
