import { useState } from "react";
import { IoHeart, IoLogoGithub } from "react-icons/io5";
import Calculator from "./Calculator";
import Config from "./Config";

const App = () => {
    
    const [precision, setPrecision] = useState(5);
    const [showConfig, setShowConfig] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const year = (new Date()).getFullYear();

    return <div className={`${darkMode ? "app app__dark-mode" : "app"}`}> 
        <div className="app__header">
            <h1 className="app__header__heading">Calculator</h1>
            <div className="menu">
                <button 
                    className="menu__button"
                    onClick={() => setShowConfig(true)}
                    >
                    Menu
                </button>
            </div>
        </div>

        <Config 
            setPrecision={setPrecision} 
            setShowConfig={setShowConfig}
            className={showConfig?"show-portal":"hide-portal"}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
        />

        <Calculator precision={precision} darkMode={darkMode} />

        <footer className="footer">
            <p className="footer__copy">
                &copy; {year} - Made with 
                <span className="footer__copy__icon footer__copy__icon--heart">
                    <IoHeart />
                </span> 
                by Paulo Wells.
                <a 
                    href="https://github.com/wellspr/calculator" 
                    target="_blank" 
                    rel="noreferrer"
                    >
                    <span className="footer__copy__icon footer__copy__icon--github">
                        <IoLogoGithub />
                    </span>
                </a>
            </p>
        </footer>
    </div>
};

export default App;
