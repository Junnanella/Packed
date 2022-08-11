import React from "react"


export default function Footer() {
  return (
    <footer className="py-3 mt-5 bg-light fixed">
      <h1 className="nav justify-content-center"> About Us </h1>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="https://josiah-pederson.github.io/personal-site/">Josiah</a>
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
      <a className="footer-link-color" href="https://gitlab.com/packed-module-3/packed">
        <div className="footer-copyright text-center py-3">©2022 packed</div>
      </a>
    </footer>
  );
}
