import React from "react"


export default function Footer() {
    return(        
    <footer className="py-5 bg-light fixed">
    <h1 className="nav justify-content-center"> About Us </h1>
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <a className="nav-link active" href="https://www.linkedin.com/in/josiah-pederson/">Josiah</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/junella-caringal/">Junella</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/karminabarajas/">Karmina</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/william-carter-3b05b7237/">William</a>
        </li>
    </ul>
        <div className="footer-copyright text-center py-3">© 2022 packed:
            <a href="https://packed-module-3.gitlab.io/packed/"> packed.io</a>
        </div>
    </footer>
    );
}
