import { useCallback, useEffect, useRef } from 'react';

const useCanvasConnections = (functionSequence: number[], cardRefs: React.RefObject<(HTMLDivElement | null)[]>) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawConnections = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.clientWidth * dpr;
    canvas.height = container.clientHeight * dpr;
    canvas.style.width = `${container.clientWidth}px`;
    canvas.style.height = `${container.clientHeight}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    functionSequence.forEach((index, i) => {
     if(!cardRefs.current) return
      const startCard = cardRefs.current[index - 1];
      const nextIndex = functionSequence[i + 1];
      const endCard = nextIndex ? cardRefs.current[nextIndex - 1] : null;

      if (startCard && endCard) {
        const startRect = startCard.getBoundingClientRect();
        const endRect = endCard.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();

        const startX = startRect.right - parentRect.left - 30;
        const startY = startRect.bottom - parentRect.top - 30;
        const endX = endRect.left - parentRect.left + 30;
        const endY = endRect.bottom - parentRect.top - 30;

        let controlX1 = startX + (endX - startX) * 0.25;
        let controlY1 = startY + 30;
        let controlX2 = startX + (endX - startX) * 0.75;
        let controlY2 = endY + 30;

        if (index === 5 && nextIndex === 3) {
            controlX1 += 50;
            controlY1 -= 100;
            controlX2 += 50;
          }

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
        ctx.strokeStyle = '#0066FF4D';
        ctx.lineWidth = 7;
        ctx.stroke();

        // Draw connection circles
        drawCircle(ctx, startX, startY, '#0066FF', '#DBDBDB');
        drawCircle(ctx, endX, endY, '#0066FF', '#DBDBDB');
      }
    });
  }, [functionSequence, cardRefs]);

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    fillColor: string,
    strokeColor: string
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    drawConnections();
    window.addEventListener('resize', drawConnections);
    return () => window.removeEventListener('resize', drawConnections);
  }, [drawConnections]);

  return canvasRef;
};

export default useCanvasConnections;
