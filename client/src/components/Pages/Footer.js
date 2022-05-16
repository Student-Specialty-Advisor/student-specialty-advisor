function Footer(props) {
  return (
    <div className="public-footer" id={props.id}>
      <div className="public-footer-logo"></div>
      <ul>
        <li>
          <a
            href="https://forms.gle/NXtPETbeWrwZ223p8"
            target="_blank"
            rel="noreferrer noopener"
          >
            Send feedback
          </a>
        </li>
        <li>
          <a
            href="https://forms.gle/222PYbZPwL5AKXnP7"
            target="_blank"
            rel="noreferrer noopener"
          >
            Report an issue
          </a>
        </li>
        <li>
          <a
            href="mailto: studentspecialtyadvisor@outlook.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Contact us
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Student-Specialty-Advisor/student-specialty-advisor"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub Page
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
