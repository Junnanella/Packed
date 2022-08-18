import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGitlab } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
  return (
    <footer className="py-3 mt-5 bg-light fixed">
      <h2 className="nav justify-content-center"> About Us </h2>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="https://josiahpederson.com/">Josiah</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.linkedin.com/in/junella-caringal/">Junella</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.linkedin.com/in/karminabarajas/">Karmina</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.linkedin.com/in/williamacarter/">William</a>
        </li>
      </ul>
      <div className="footer-copyright text-center py-3">
        ©2022 packed
        <a className="footer-link-color p-2" href="https://gitlab.com/packed-module-3/packed">
          <FontAwesomeIcon icon={faSquareGitlab} />
        </a>
      </div>
    </footer>
  );
}
