import React from "react"


export default function Footer() {
    return(        
    <footer className="py-5 bg-light fixed">
    <h1 className="nav justify-content-center"> About Us </h1>
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/josiah-pederson/"target="_blank">Josiah</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/junella-caringal/"target="_blank">Junella</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/karminabarajas/"target="_blank">Karmina</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/williamacarter/"target="_blank">William</a>
        </li>
    </ul>
        <div className="footer-copyright text-center py-3">© 2022 packed:
            <a href="https://packed-module-3.gitlab.io/packed/"> packed.io</a>
        </div>
    </footer>
    );
}
