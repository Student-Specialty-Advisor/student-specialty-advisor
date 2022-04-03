import emailIcon from "../../../assets/art/icon/email.png";
import linkedinIcon from "../../../assets/art/icon/linkedin.png";

function AdvisorCard(props) {
  return (
    <li id={props.id} style={props.style}>
      <div
        className="picture-container"
        style={{ backgroundImage: "url(" + props.picture + ")" }}
      >
        <div className="picture-overlay">
          <a href={props.email} target="_blank" rel="noreferrer noopener">
            <img id="email" src={emailIcon} alt=""></img>
          </a>
          <a href={props.linkedin} target="_blank" rel="noreferrer noopener">
            <img id="linkedin" src={linkedinIcon} alt=""></img>
          </a>
        </div>
      </div>
      <div className="description-container">
        <p>
          <strong>{props.fullname}</strong>
          <br />
          {props.profession}
        </p>
        <p id="quote">{props.quote}</p>
      </div>
    </li>
  );
}

export default AdvisorCard;
