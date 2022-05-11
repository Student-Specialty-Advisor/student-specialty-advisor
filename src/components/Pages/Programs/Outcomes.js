function Outcomes(props) {
  return (
    <>
      <p>{props.details[props.id][props.section]}</p>
      <a
        href="https://www.abet.org/accreditation/accreditation-criteria/criteria-for-accrediting-engineering-programs-2019-2020/#GC3"
        target="_blank"
        rel="noreferrer noopener"
      >
        What's ABET Student Outcomes? ↗
      </a>
    </>
  );
}

export default Outcomes;
