import React from 'react'
import { Link } from 'react-router';
import "../App.css";

function Footer() {
  return (
    <div>
          {/* <!-- FOOTER --> */}
    <footer className="site-footer">
        <div className="footer-container">
            <div className="footer-col">
                <div className="logo">
                    <span className="logo-evang">EVANG</span><span className="logo-adi">ADI</span>
                </div>
                <div className="social-icons">
                    <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                    <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                    <Link href="#"><i className="fa-brands fa-youtube"></i></Link>
                </div>
            </div>
            <div className="footer-col">
                <h3>Useful Link</h3>
                <ul>
                    <li><Link href="#">How it works</Link></li>
                    <li><Link href="#">Terms of Service</Link></li>
                    <li><Link href="#">Privacy policy</Link></li>
                </ul>
            </div>
            <div className="footer-col">
                <h3>Contact Info</h3>
                <p>Evangadi Networks</p>
                <p>support@evangadi.com</p>
                <p>+1-202-555-0146</p>
            </div>
        </div>
    </footer>

    </div>
  )
}

export default Footer
