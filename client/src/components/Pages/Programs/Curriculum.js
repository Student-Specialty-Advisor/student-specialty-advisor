function Curriculum(props) {
  const course = props.details[props.id][props.section].map((c) => {
    return (
      <div className="course-container" key={props.id + c.subject}>
        <p className="course-title">
          <strong>Subject: </strong>
          {c.subject}
        </p>
        <div className="course-body">
          <p>
            <strong>Description: </strong>
            {c.desc}
          </p>
          <p>
            <strong>When: </strong>
            {c.when}
          </p>
        </div>
      </div>
    );
  });
  return course;
}

export default Curriculum;
