import React from "react"
import Nav from "react"

export default function Footer() {
    return(        
        <footer className="py-5 bg-light fixed">
            <div className="col-md-2 mb-md-0 mb-2 m-3">
                <h5 className="text-uppercase">About Us</h5>
                <ul className="list-unstyled">
                    <li><a href="https://www.linkedin.com/in/josiah-pederson/">Josiah</a></li>
                    <li><a href="https://www.linkedin.com/in/junella-caringal/">Junella</a></li>
                    <li><a href="https://www.linkedin.com/in/karminabarajas/">Karmina</a></li>
                    <li><a href="https://www.linkedin.com/in/william-carter-3b05b7237/">William</a></li>
                </ul>
            </div>

    <div className="footer-copyright text-center py-3">© 2022 packed:
        <a href="https://packed-module-3.gitlab.io/packed/"> packed.io</a>
    </div>
        
        </footer>
    );
}
