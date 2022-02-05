import logo from "./logo.svg";
import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FrontendIcon from "./assets/bx_bxl-github.svg";
import BackendIcon from "./assets/bx_bxl-heroku.svg";
import MoreIcon from "./assets/bx_bx-dots-vertical-rounded.svg";
import DarkModeToggle from "react-dark-mode-toggle";

function App() {
  const [ideas, setIdeas] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    axios.get("/db.json").then((res) => {
      console.log(res.data);
      setIdeas(res.data);
    });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={["theme-container", isDarkMode ? "" : "light"].join(" ")}>
      <div className="navbar">
        <div className="logo">logo</div>
        <div className="search-bar">
        <input className="search-bar-input" type="search" />
        </div>
        <div className="rhs-group">
          <div className="mobile-btn" hidden={window.innerWidth > 800}>
            <button className="add-btn circular-btn">+</button>
          </div>
          <button
            hidden={window.innerWidth < 800}
            className={["add-btn", isDarkMode ? "" : "light"].join(" ")}
          >
            Add Idea
          </button>
          <div className="theme-toggler">
            <DarkModeToggle
              onChange={toggleTheme}
              checked={!isDarkMode}
              size={window.innerWidth < 800 ? 80 : 120}
              speed={2}
            />
          </div>
        </div>
      </div>
      <div className="App">
        {[
          ideas.length &&
            ideas.map((idea, index) => {
              return (
                <div
                  className={["card", isDarkMode ? "" : "light"].join(" ")}
                  key={`card-${index}`}
                  // id={idea.id}
                >
                  <div className="app-icon">
                    <img
                      src="https://github.com/favicon.ico"
                      alt="app-icon-placeholder"
                    />
                  </div>
                  <div className="details">
                    <div
                      className={["name", isDarkMode ? "" : "light"].join(" ")}
                    >
                      {idea.name}
                    </div>
                    <div
                      className={[
                        "description",
                        isDarkMode ? "" : "light",
                      ].join(" ")}
                    >
                      {idea.desc}
                    </div>
                    <div className="outward-links">
                      <a href={idea.frontend_link}>
                        <img src={FrontendIcon} alt="frontend-icon" />
                      </a>
                      <a href={idea.backend_link}>
                        <img src={BackendIcon} alt="backend-icon" />
                      </a>
                    </div>
                  </div>
                  <div className="more-options">
                    <img src={MoreIcon} alt="more-options" />
                  </div>
                </div>
              );
            }),
        ]}
      </div>
    </div>
  );
}

export default App;
