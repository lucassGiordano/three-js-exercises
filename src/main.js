import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Esta es la función que exportamos para que React la use
export function inicializarEntorno(canvasElement) {
  if (!canvasElement) return;

  // 1. El Renderizador (El motor que dibuja)
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño del recuadro en pixeles

  // 2. La Escena (El espacio 3D vacío)
  const scene = new THREE.Scene();
  

  // 3. La Cámara (Los ojos del entorno)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  camera.position.setZ(20);


  //creamos forma geometrica
   const geometry = new THREE.TorusGeometry(10,3,16,100)
   //Creamos el material
   const material = new THREE.MeshStandardMaterial({ color: 0x301934});
   //Unimos el objeto y el material
   const torus = new THREE.Mesh(geometry, material);

   scene.add(torus)

  const pointLight = new THREE.PointLight(0xffffff,100);
  pointLight.position.set(8, 8, 8);

  const ambientLight = new THREE.AmbientLight(0xffffff, 40);

  scene.add(pointLight,ambientLight)

  const lightHelper = new THREE.PointLightHelper(pointLight);

  scene.add(lightHelper);

  const gridHelper= new THREE.GridHelper(200,50);

  scene.add(gridHelper);

  const controls = new OrbitControls(camera, renderer.domElement);

  Array(200).fill().forEach(() => crearEstrellas(scene, 400));

     // 4. El bucle de renderizado (Obligatorio para que Three.js dibuje el entorno)
  let animationFrameId;
  const animate = () => {
    //requestAnimationFrame ejecuta el bucle
    animationFrameId = requestAnimationFrame(animate);
    
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    // Le pide al motor que dibuje la escena vacía a través de la camara
    renderer.render(scene, camera);
  };
  animate();

  // Devolvemos la función para detener la animación si el componente se destruye
  return () => {
    cancelAnimationFrame(animationFrameId);
    renderer.dispose();
  };
}

function crearEstrellas(scene, numeroDeEstrellas){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(numeroDeEstrellas));

  star.position.set(x, y, z);
  scene.add(star);
}
