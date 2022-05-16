function Opportunities(props) {
  return (
    <>
      <p style={{ width: "90%", lineHeight: "200%" }}>
        These are some industries you could potentially work in:
        <br />
        {props.details[props.id][props.section]}
      </p>
    </>
  );
}

export default Opportunities;
