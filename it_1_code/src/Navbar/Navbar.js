import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp, faGears, faChartColumn, faUpRightFromSquare, faFileContract } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

function Navbar() {

    var userName = "Luke";

    function MouseOver(event) {
        event.target.style.color = '#00B4E5';
    }

    function MouseOut(event) {
        event.target.style.color = "white";
    }

    return (
        <div className="navigation-wrapper">
            <nav className="navbar  navbar-expand-lg navbar-light bg-light" id="navbar"
                style={{ backgroundColor: "rgba(42,87,131,1)" }}>
                <img src="https://sp3-data-vis.s3.amazonaws.com/Bluefin_Logo_SP3_TP.png"
                    alt="Transparent Bluefin Logo Full White" style={{ width: "15em" }} />
                <div className="s3-letter-holder">
                    <div className="company-name">
                        {localStorage.getItem("companyName")}
                    </div>
                </div>
                <div className="nav-bar--dropdown">
                    <button
                        className="dropbtn"
                        onMouseOver={MouseOver}
                        onMouseOut={MouseOut}
                    >
                        <div className="button-content">
                            {userName + " "}
                            {<FontAwesomeIcon icon={faCaretDown} />}
                        </div>
                    </button>

                    <div
                        className="dropdown-content"
                        onMouseOver={MouseOver}
                        onMouseOut={MouseOut}
                    >
                        <a className="link-logout" >Sign Out</a>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar;