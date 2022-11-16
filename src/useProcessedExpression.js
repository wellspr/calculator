import { evaluate, create, all } from "mathjs";

const config = {};
const math = create(all, config);

export const useProcessedExpression = (expression, precision) => {
    
    let expressionString = "";
    let value = "";
    
    const expressionArray = expression.split("").filter(el => {
        
        if (/[0-9]/.test(el)) {
            return el;
        }
        if (/[-+*/^]/.test(el)) {
            return el;
        }
        if (/[(]/.test(el)) {
            return el;
        }
        if (/[)]/.test(el)) {
            return el;
        }
        if (/[.]/.test(el)) {
            return el;
        }
        if (/[a-z]/.test(el)) {
            return el;
        }
        console.log(el);
        return null;
    });

    Object.values(expressionArray).map(value => {
        return expressionString += value;
    });

    try {
        value = evaluate(expressionString);
        
        console.log(value, typeof(value));
        
        if (typeof(value) === "object") {
            console.log(value.re, value.im);

            // Value is a complex number?
            if (
                    value.re !== undefined 
                    && 
                    value.im !== undefined
                ) {
                value = math.round(value, precision).toString();
            } else {
                value = null;
            }
            
        } else {
            value = math.round(value, precision).toString();
        }
    } catch(e) {}

    return { expressionString, value };
};
