import { useRef, useEffect, useState } from "react";
import { IonButton, IonCard, IonCardContent } from "@ionic/react";

interface SignaturePadProps {
  onSave: (signature: string) => void;
  title?: string;
}

export function SignaturePad({
  onSave,
  title = "Customer Signature",
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        setContext(ctx);
      }
    }
  }, []);

  const startDrawing = (
    e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!context || !canvasRef.current) return;
    setIsDrawing(true);

    const rect = canvasRef.current.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (
    e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveSignature = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL();
    onSave(dataUrl);
  };

  return (
    <IonCard>
      <IonCardContent>
        <div style={{ marginBottom: "10px" }}>
          <strong>{title}</strong>
        </div>
        <canvas
          ref={canvasRef}
          width={300}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
            touchAction: "none",
          }}
        />
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <IonButton size="small" color="light" onClick={clearCanvas}>
            Clear
          </IonButton>
          <IonButton size="small" onClick={saveSignature}>
            Save Signature
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
}
