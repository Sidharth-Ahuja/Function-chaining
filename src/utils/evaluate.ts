export const evaluateEquation = (equation: string, x: number): number => {
    try {
      return Function('x', `return ${equation.replace('^', '**')};`)(x);
    } catch {
      throw new Error('Invalid Equation');
    }
  };
  
  export const calculateSequenceResult = (functionSequence: number[], functionList: string[], startValue: number): number => {
    let currentValue = startValue;
  
    functionSequence.forEach((index) => {
      const equation = functionList[index - 1];
      try {
        currentValue = evaluateEquation(equation, currentValue);
      } catch {
        currentValue = NaN;
      }
    });
  
    return currentValue;
  };
  