function Footer(props) {
  return (
    <div className="public-footer" id={props.id}>
      <br />
      <div className="public-footer-logo"></div>
      <ul>
        <li>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Send feedback
          </a>
        </li>
        <li>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Report an issue
          </a>
        </li>
        <li>
          <a
            href="mailto:studentspecialtyadvisor@outlook.com"
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
