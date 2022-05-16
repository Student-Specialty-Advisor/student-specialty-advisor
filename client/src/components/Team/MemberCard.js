import emailIcon from "../../assets/art/icon/email.png";
import githubIcon from "../../assets/art/icon/github.png";

function MemberCard(props) {
  return (
    <li>
      <div id={props.id}></div>
      <p>{props.fullname}</p>
      <a
        href={"mailto: " + props.email}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src={emailIcon} alt=""></img>
      </a>
      <a href={props.github} target="_blank" rel="noreferrer noopener">
        <img src={githubIcon} alt=""></img>
      </a>
    </li>
  );
}

export default MemberCard;
