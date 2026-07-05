import social_icons from "../../assets/data/socialIcons.js";
import google_play from "../../assets/icons/googleplay.webp";
import app_store from "../../assets/icons/appstore.webp";
import cartrade_tech from "../../assets/icons/cartrade_tech.svg";
import carwale_logo from "../../assets/icons/carwale.svg";
import mobility_logo from "../../assets/icons/mobility.svg";
import bikewale_logo from "../../assets/icons/bikewale.svg";
import cartrade_logo from "../../assets/icons/cartrade.svg"
import olx_logo from "../../assets/icons/olx_2025.svg"
import "./Footer.css";

const popularLocations = ["Kolkata", "Mumbai", "Chennai", "Pune"];
const trendingLocations = ["Bhubaneswar", "Hyderabad", "Chandigarh", "Nashik"];
const aboutLinks = ["About OLX India", "Tech@OLX", "Careers"];
const olxLinks = [
  "Blog",
  "Help",
  "Sitemap",
  "Legal & Privacy information",
  "Vulnerability Disclosure Program",
];
const groupBrands = [
    { id: 1, name: "OLX", icon: olx_logo },
    { id: 2, name: "CarWale", icon: carwale_logo },
    { id: 3, name: "BikeWale", icon: bikewale_logo },
    { id: 4, name: "CarTrade", icon: cartrade_logo },
    { id: 5, name: "Mobility Outlook", icon: mobility_logo }

]
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>POPULAR LOCATIONS</h4>
          <ul>
            {popularLocations.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>TRENDING LOCATIONS</h4>
          <ul>
            {trendingLocations.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>ABOUT US</h4>
          <ul>
            {aboutLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>OLX</h4>
          <ul>
            {olxLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            {social_icons.map((items) => (
              <img
                key={items.name}
                src={items.icon}
                alt={items.name}
                className="social-icon"
              />
            ))}
          </div>

          <div className="app-badges">
            <img
              src={google_play}
            />
            <img
              src={app_store}
              alt="Download on the App Store"
              className="app-badge"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <img
            src={cartrade_tech}
            alt="CarTradeTech Group"
            className="group-logo"
          />

          <div className="divider" />

          <div className="brand-logos">
            {groupBrands.map((b) => (
              <img
                key={b.id}
                src={b.icon}
                alt={b.name}
                className="brand-logo"
              />
            ))}
          </div>
        </div>

        <div className="footer-legal">
          <span className="legal-links">Help - Sitemap</span>
          <span className="copyright">
            All rights reserved © 2006-2026 OLX
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;