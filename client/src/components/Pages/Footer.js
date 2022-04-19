function Footer(props) {
  return (
    <div className="public-footer" id={props.id}>
      <br />
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
            Contact the team
          </a>
        </li>
        <li>
          <a
            href="https://github.com/SEJG2-MYGROUP"
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
