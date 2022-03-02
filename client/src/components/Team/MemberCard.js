import emailIcon from "../../assets/art/icon/email.png";
import githubIcon from "../../assets/art/icon/github.png";
import fbIcon from "../../assets/art/icon/fb.jpg";

function MemberCard(props) {
  return (
    <li id={props.id}>
      <div></div>
      <p>{props.fullname}</p>
      <a href={props.email} target="_blank" rel="noreferrer noopener">
        <img src={emailIcon} alt={props.fullname}></img>
      </a>
      <a href={props.github} target="_blank" rel="noreferrer noopener">
        <img src={githubIcon} alt={props.fullname}></img>
      </a>
      <a href={props.fb} target="_blank" rel="noreferrer noopener">
        <img src={fbIcon} alt={props.fullname}></img>
      </a>
    </li>
  );
}

export default MemberCard;
