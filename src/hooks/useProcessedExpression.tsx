import {
    create,
    // Funções básicas
    addDependencies,
    subtractDependencies,
    multiplyDependencies,
    divideDependencies,
    // Funções avançadas
    powDependencies,
    sqrtDependencies,
    logDependencies,
    log2Dependencies,
    log10Dependencies,
    expDependencies,
    // Funções trigonométricas
    sinDependencies,
    cosDependencies,
    tanDependencies,
    // Funçẽs trigonométricas inversas
    asinDependencies,
    acosDependencies,
    atanDependencies,
    // Funções hiperbólicas
    sinhDependencies,
    coshDependencies,
    tanhDependencies,
    // Funções hiperbólicas inversas
    asinhDependencies,
    acoshDependencies,
    atanhDependencies,
    // Funções matemáticas
    numberDependencies,
    eDependencies,
    iDependencies,
    piDependencies,
    // Funções de avaliação
    parseDependencies,
    compileDependencies,
    evaluateDependencies,
    // + Funções de verificação de nós
    isFunctionNode,
    isSymbolNode,
    isAssignmentNode,
    isAccessorNode,
    isObjectNode,
    isIndexNode,
} from "mathjs";

import type { ResultSet, Complex } from "mathjs";

const math = create({});

math.import([
    // Funções básicas
    addDependencies,
    subtractDependencies,
    multiplyDependencies,
    divideDependencies,
    // Funções avançadas
    powDependencies,
    sqrtDependencies,
    logDependencies,
    log2Dependencies,
    log10Dependencies,
    expDependencies,
    // Funções trigonométricas
    sinDependencies,
    cosDependencies,
    tanDependencies,
    // Funçẽs trigonométricas inversas
    asinDependencies,
    acosDependencies,
    atanDependencies,
    // Funções hiperbólicas
    sinhDependencies,
    coshDependencies,
    tanhDependencies,
    // Funções hiperbólicas inversas
    asinhDependencies,
    acoshDependencies,
    atanhDependencies,
    // Funções matemáticas
    numberDependencies,
    eDependencies,
    iDependencies,
    piDependencies,
    // Funções de avaliação
    parseDependencies,
    compileDependencies,
    evaluateDependencies,
]);

const evaluate = (expression: string): ResultSet => {
    const node = math.parse(expression);

    const allowedFunctions = [
        "sin",
        "cos",
        "tan",
        "asin",
        "acos",
        "atan",
        "sinh",
        "cosh",
        "tanh",
        "asinh",
        "acosh",
        "atanh",
        "log",
        "log2",
        "log10",
        "exp",
        "sqrt",
        "pow",
        "abs",
    ];

    node.traverse((node) => {
        if (isFunctionNode(node)) {
            const functionName = node.fn.name;

            if (!allowedFunctions.includes(functionName)) {
                console.log("Function not allowed: ", functionName);
                throw new Error(
                    `Function "${functionName}" is not allowed in the expression.`,
                );
            }
        }

        if (isSymbolNode(node)) {
            const functionName = node.name;

            const allowedSymbols = ["i", "e", "pi"];
            // Se não for um símbolo permitido E não for o nome de uma função que está sendo chamada
            if (
                !allowedSymbols.includes(functionName) &&
                !allowedFunctions.includes(functionName)
            ) {
                // Isso impede o uso de variáveis não definidas
                throw new Error(`Símbolo "${functionName}" não permitido.`);
            }
        }

        if (isAssignmentNode(node)) {
            throw new Error("Atribuição de variáveis não é permitida.");
        }

        if (isAccessorNode(node)) {
            throw new Error("Acesso a propriedades não é permitido.");
        }

        if (isObjectNode(node) || isIndexNode(node)) {
            throw new Error(
                "Estruturas de dados complexas não são permitidas.",
            );
        }
    });
    return node.compile().evaluate();
};

export const useProcessedExpression = (
    expression: string,
    precision: number,
) => {

    let value = "";

    if (expression.length > 500) {
        return { expressionString: "", value: "Expressão muito longa" };
    }

    const expressionString = expression.replace(
        /[^a-zA-Z0-9+\-*/^().,\s]/g,
        "",
    );
    
    try {
        const result = evaluate(expressionString).entries[0];

        if (result === undefined || result === null) {
            value = "";
            return { expressionString, value };
        }

        if (typeof result === "number") {
            value = math.round(Number(result), precision).toString();
            return { expressionString, value };
        }

        if (typeof result === "object" && "re" in result && "im" in result) {
            const complexResult = result as Complex;
            const roundedRe = math.round(complexResult.re, precision);
            const roundedIm = math.round(complexResult.im, precision);

            if (roundedRe !== 0) {
                value += `${roundedRe}`;
            }

            if (roundedIm === 0) {
                if (roundedRe === 0) {
                    value = "0";
                }

                return { expressionString, value };
            }

            if (roundedIm < 0) {
                value += "-";
            } else {
                value += "+";
            }

            if (math.abs(roundedIm) === 1) {
                value += `i`;
            } else {
                value += `${math.abs(roundedIm)}i`;
            }

            return { expressionString, value };
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log("Expression error: ", e.message);
        } else {
            console.log("Expression error: ", e);
        }
    }

    return { expressionString, value };
};
