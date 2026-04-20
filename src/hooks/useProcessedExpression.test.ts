/** @jest-environment node */
import { useProcessedExpression } from './useProcessedExpression';
import { describe, expect, test } from '@jest/globals';

describe('useProcessedExpression - Suíte de Segurança e Precisão', () => {
  
  describe('Cálculos Matemáticos Básicos', () => {
    test('deve somar decimais com precisão ajustada', () => {
      const { value } = useProcessedExpression("0.1 + 0.2", 1);
      expect(value).toEqual("0.3");
    });

    test('deve respeitar a ordem das operações (PEMDAS)', () => {
      const { value } = useProcessedExpression("2 + 3 * 4", 0);
      expect(value).toEqual("14");
    });

    test('deve aceitar parênteses', () => {
      const { value } = useProcessedExpression("(2 + 3) * 4", 0);
      expect(value).toEqual("20");
    });
  });

  describe('Segurança e Bloqueios (AST)', () => {
    test('deve bloquear funções fora da whitelist (ex: derivative)', () => {
      const { value } = useProcessedExpression("derivative('x^2', 'x')", 2);
      expect(value).toEqual(""); // O catch captura o erro e retorna valor vazio
    });

    test('deve bloquear atribuição de variáveis', () => {
      const { value } = useProcessedExpression("x = 10", 2);
      expect(value).toEqual("");
    });

    test('deve bloquear acesso a propriedades (Prototype Pollution)', () => {
      const { value } = useProcessedExpression("1.constructor", 2);
      expect(value).toEqual("");
    });

    test('deve bloquear símbolos não autorizados', () => {
      const { value } = useProcessedExpression("window", 2);
      expect(value).toEqual("");
    });
  });

  describe('Sanitização de Input (Regex)', () => {
    test('deve remover caracteres de script e controle', () => {
      const { value } = useProcessedExpression("2 + 2; alert('hack')", 2);
      expect(value).toEqual(""); // Sem ; e '
    });

    test('deve manter vírgulas para funções de múltiplos argumentos', () => {
      const { value } = useProcessedExpression("pow(2, 3)", 0);
      expect(value).toEqual("8");
    });
  });

  describe('Números Complexos e Constantes', () => {
    test('deve formatar corretamente i positivo: 2 + 3i', () => {
      const { value } = useProcessedExpression("2 + 3i", 2);
      expect(value).toEqual("2+3i");
    });

    test('deve formatar corretamente i negativo: 2 - 3i', () => {
      const { value } = useProcessedExpression("2 - 3i", 2);
      expect(value).toEqual("2-3i");
    });

    test('deve retornar apenas a parte imaginária se real for 0', () => {
      const { value } = useProcessedExpression("sqrt(-1)", 0);
      expect(value).toEqual("i");
    });

    test('deve reconhecer a constante pi', () => {
      const { value } = useProcessedExpression("pi", 2);
      expect(value).toEqual("3.14");
    });
  });

  describe('Tratamento de Erros de Sintaxe', () => {
    test('deve lidar com expressões incompletas sem quebrar o app', () => {
      const { value } = useProcessedExpression("2 +", 2);
      expect(value).toEqual("");
    });

    test('deve lidar com parênteses não balanceados', () => {
      const { value } = useProcessedExpression("((2 + 2)", 2);
      expect(value).toEqual("");
    });
  });

  describe('useProcessedExpression - Casos de Borda', () => {
    test('deve tratar divisão por zero adequadamente', () => {
        const { value } = useProcessedExpression("10 / 0", 2);
        // Ajuste o expect para o que você definiu no código (ex: "Infinity" ou "Erro")
        expect(value).toBe("Erro: divisão por zero ou resultado infinito");
    });

    test('deve tratar 0 dividido por 0 como NaN/Erro', () => {
        const { value } = useProcessedExpression("0 / 0", 2);
        expect(value).toBe("Erro: divisão por zero ou resultado infinito");
    });
});
});
