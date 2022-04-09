function Opportunities(props) {
  return (
    <>
      <p style={{ width: "90%", lineHeight: "200%" }}>
        <strong>These are some possible industries you could work in:</strong>
        <br />
        {props.details[props.id][props.section]}
      </p>
    </>
  );
}

export default Opportunities;
