import emailIcon from "../../../assets/art/icon/email.png";

function AdvisorCard(props) {
  return (
    <li id={props.id}>
      <div></div>
      <p>{props.fullname}</p>
      <p>{props.profession}</p>
      <p>{props.quote}</p>
    </li>
  );
}

export default AdvisorCard;
