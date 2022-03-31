/*import emailIcon from "../../../assets/art/icon/email.png";*/

function AdvisorCard(props) {
  return (
    <li id={props.id}>
      <div></div>
      <p>
        {props.fullname}
        <br />
        {props.profession}
      </p>
      <p id="quote">{props.quote}</p>
    </li>
  );
}

export default AdvisorCard;
