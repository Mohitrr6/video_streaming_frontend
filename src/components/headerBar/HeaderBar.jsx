import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./HeaderBar.css";

const HeaderBar = ({ onLoginClick, onSignupClick }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const showLogo = location.pathname.startsWith("/watch");

  return (
    <div className="header-bar">
      {showLogo && (
        <div className="header-bar__brand" aria-label="StreamZ home logo" onClick={() => navigate("/")}>
          <div className="header-bar__brand-mark">S</div>
          <span className="header-bar__brand-text">StreamZ</span>
        </div>
      )}

      <div className="header-bar__search">
        <SearchBar />
      </div>

      {!isLoggedIn && (
        <div className="header-bar__actions">
          <button className="header-bar__login-btn" onClick={onLoginClick}>
            Login
          </button>
          <button className="header-bar__signup-btn" onClick={onSignupClick}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderBar;