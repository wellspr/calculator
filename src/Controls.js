import { MdOutlineBackspace } from "react-icons/md";
import { TbSquareRoot } from "react-icons/tb";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);


// Special Icons
const Exponent = () => {
    return <div className="exponential">
        <span className="exponential__base">x</span>
        <span className="exponential__operator">^</span>
        <span className="exponential__exponent">y</span>
    </div>;
};

const Sqrt = () => {
    return <div className="sqrt">
        {/* <span>&radic;</span> */}
        <TbSquareRoot />
    </div>
};

const Minus = () => {
    return <div className="minus">
        <span>-</span>
    </div>
};

const Plus = () => {
    return <div className="plus">
        <span>+</span>
    </div>
};

const Times = () => {
    return <div className="plus">
        <span>*</span>
    </div>
};

const Divide = () => {
    return <div className="plus">
        <span>/</span>
    </div>
};

const Point = () => {
    return <div className="point">
        <span>.</span>
    </div>
};

const Pi = () => {
    return <div className="pi">
        <span>&pi;</span>
    </div>
};

const Euler = () => {
    return <div className="euler">
        <span>e</span>
    </div>
};

const Im = () => {
    return <div className="im">
        <span>i</span>
    </div>
};

const LeftPar = () => {
    return <div className="plus">
        <span>(</span>
    </div>
};

const RightPar = () => {
    return <div className="plus">
        <span>)</span>
    </div>
};


// Digits
const digit = (digit) => {
    return {icon: digit, value: digit, operator: digit, className: digit};
};


// Special operators
const clear = () => {
    return {icon: "C", value: "clear", operator: "", className: "clear"};
};

const backspace = () => {
    return {icon: <MdOutlineBackspace />, value: "backspace", operator: "", className: "backspace"};
};

const exponential = () => {
    return {icon: <Exponent />, value: "exponent", operator: "^", className: "exponential"};
};

const sqrt = () => {
    return {icon: <Sqrt />, value: "sqrt", operator: "sqrt", className: "sqrt"};
};

const minus = () => {
    return {icon: <Minus />, value: "-", operator: "-", className: "minus"};
};

const plus = () => {
    return {icon: <Plus />, value: "+", operator: "+", className: "plus"};
};

const times = () => {
    return {icon: <Times />, value: "*", operator: "*", className: "times"};
};

const divide = () => {
    return {icon: <Divide />, value: "/", operator: "/", className: "divide"};
};

const point = () => {
    return {icon: <Point />, value: ".", operator: ".", className: "point"};
};

const leftPar = () => {
    return {icon: <LeftPar />, value: "(", operator: "(", className: "left-par"};
};

const rightPar = () => {
    return {icon: <RightPar />, value: ")", operator: ")", className: "right-par"};
};


// Constants
const pi = (precision) => {
    return {icon: <Pi />, value: math.round(math.pi, precision), operator: "pi", className: "pi"};
};

const euler = (precision) => {
    return {icon: <Euler />, value: math.round(math.e, precision), operator: "euler", className: "euler"};
};

const imaginary = () => {
    return {icon: <Im />, value: "i", operator: "i", className: "i"};
};


// Control panel
const Controls = ({ handleControls, precision, darkMode }) => {
    return <div className="controls">
        {
            [
                [ clear(), backspace(), leftPar(), rightPar() ],
                [ digit(1), digit(2), digit(3), plus() ], 
                [ digit(4), digit(5), digit(6), minus() ], 
                [ digit(7), digit(8), digit(9), times() ], 
                [ digit(0), point(), imaginary(), divide() ],
                [ euler(precision), pi(precision), sqrt(), exponential()],
                [ ]
            ].map(column => {
                return <div className="controls__row" key={Math.random(1)}>
                {
                    Object.values(column).map(el => {
                        let classNameString = `controls__button controls__button__${el.className}`;
                        if (darkMode) {
                            classNameString += " controls__button__dark-mode";
                        }
                        return <button 
                            key={el.className}
                            className={classNameString}
                            onClick={() => handleControls({ 
                                value: el.value, 
                                operator: el.operator })
                            }
                            >
                            {el.icon}
                        </button>;
                    })
                }
                </div> 
            })
        }
    </div>;
};

export default Controls;
