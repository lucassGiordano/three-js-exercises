import { useEffect, useRef } from 'react'; // <--- ESTA LÍNEA ES LA QUE FALTA
import { inicializarEntorno } from './main';

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const limpiarEntorno = inicializarEntorno(canvasRef.current);
    return () => {
      if (limpiarEntorno) limpiarEntorno();
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

