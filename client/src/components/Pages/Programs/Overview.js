import { NavLink } from "react-router-dom";

function Overview(props) {
  return (
    <>
      <p>{props.details[props.id][props.section]}</p>
      {props.id === "se" ? (
        <NavLink to="/videos/se">
          {"Watch the introductory video about Software Engineering ↗"}
        </NavLink>
      ) : null}
      {props.id === "cse" ? (
        <NavLink to="/videos/cse">
          {"Watch the introductory video about Computer Systems Engineering ↗"}
        </NavLink>
      ) : null}
      {props.id === "re" ? (
        <NavLink to="/videos/re">
          {"Watch the introductory video about Renewable Energy Engineering ↗"}
        </NavLink>
      ) : null}
    </>
  );
}

export default Overview;
