import React, { useState, useRef, useEffect } from 'react';
import FunctionCard from './components/FunctionCard/index';
import useCanvasConnections from './hooks/useCanvasConnections';
import { calculateSequenceResult } from './utils/evaluate';

const functionSequence = [1, 2, 4, 5, 3];

const App: React.FC = () => {
  const [startValue, setStartValue] = useState(2);
  const [result, setResult] = useState(0);
  const [functionList, setFunctionList] = useState([
    'x^2',
    '2*x+4',
    'x-2',
    'x/2',
    'x^2+20',
  ]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useCanvasConnections(functionSequence, cardRefs);

  const updateFunction = (index: number, equation: string) => {
    setFunctionList((prev) => {
      const updated = [...prev];
      updated[index] = equation;
      return updated;
    });
  };

  useEffect(() => {
    setResult(calculateSequenceResult(functionSequence, functionList, startValue));
  }, [startValue, functionList]);

  return (
    <div className="mx-auto p-8 space-y-8 relative">
      <div className="flex items-center">
        <span className="text-black">Input Value</span>
        <input
          type="number"
          value={startValue}
          onChange={(e) => setStartValue(Number(e.target.value))}
          className="ml-2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 w-24"
        />
      </div>

      <div className="relative max-w-[979px]">
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <div className="flex flex-wrap justify-center gap-y-[107px] gap-x-[131px] mb-6">
          {functionList.map((func, index) => (
            <FunctionCard
              key={index}
              index={index}
              equation={func}
              nextFunction={functionSequence[functionSequence.findIndex((val) => val - 1 === index) + 1]}
              onEquationChange={updateFunction}
              ref={(el: any) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-8 text-xl font-semibold text-gray-700">
        Final Result{' '}
        <span className="text-blue-600">
          {isNaN(result) ? 'Invalid Equation' : result}
        </span>
      </div>
    </div>
  );
};

export default App;
