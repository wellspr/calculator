import { MdClose } from "react-icons/md";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";

const Config = ({ setPrecision, setShowConfig, className, darkMode, setDarkMode }) => {
    const classNameString = () => {
        let classNameString = "config";

        if (className) {
            classNameString += ` config__${className}`;
        }
        if (darkMode) {
            classNameString += ` config__dark-mode`;
        }
        return classNameString;
    };

    const handlePrecisionChanges = (e) => {
        setPrecision(e.target.value);
    };

    return <div className={classNameString()}>
        <div className="config__header">
            <h2 className="config__header__heading">Configuration</h2>
            <div className="menu">
                <button 
                    className="menu__button"
                    onClick={() => setShowConfig(false)}
                    >
                    <MdClose size={24} />
                </button>
            </div>
        </div>
        
        <div className="config__main">

            <div className="config__main__option config__main__precision">
                <div className="config__main__option__label">Precison:</div> 
                <input
                    className="config__main__precision__input"
                    type={"number"} 
                    defaultValue={5} 
                    min={0} 
                    max={15}
                    onChange={handlePrecisionChanges}
                />
            </div>

            <hr className={`${darkMode?"horizontal-rule__dark-mode":"horizontal-rule"}`} />
            
            <div className="config__main__option config__main__dark-mode">
                <div className="config__main__option__label">Dark Mode: </div>
                <div className="config__main__dark-mode__input">
                    <div 
                        className="config__main__dark-mode__input__on" 
                        onClick={() => setDarkMode(true)}
                        >
                        On
                    </div>
                    <div 
                        className="config__main__dark-mode__input__toggle-icon"
                        onClick={() => setDarkMode(!darkMode)}
                        >
                        {
                            darkMode
                            ?
                            <RiToggleLine size={24} />
                            :
                            <RiToggleFill size={24} />
                        }
                    </div>
                    <div 
                        className="config__main__dark-mode__input__off"
                        onClick={() => setDarkMode(false)}
                        >
                        Off
                    </div>
                </div>
            </div>
        </div>

    </div>;
};

export default Config;