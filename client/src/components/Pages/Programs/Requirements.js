function Requirements(props) {
  return (
    <>
      <p>{props.details[props.id][props.section]}</p>
      <a href="/quiz" target="_blank" rel="noreferrer noopener">
        Program Compatibility Quiz ↗
      </a>
    </>
  );
}

export default Requirements;
