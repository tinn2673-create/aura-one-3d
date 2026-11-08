// ========================================================
// AURA ONE — MASTER V4.3 APPLICATION & HIGH-PRECISION 3D ENGINE
// Sculpted Multi-layer Earcups, Spun Metal Dials, Studio Pedestal Stage & Hotspots
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }
  refreshIcons();

  // Master State
  const state = {
    currentRoute: window.location.hash || '#/',
    currentEnv: 'void',
    selectedColor: '#1e2029',
    selectedColorName: 'Titanium Graphite',
    cushionType: 'leather',
    engravingText: 'AURA ONE',
    isAudioPlaying: false,
    isSpatialMode: false,
    isInspect360: false,
    reduceMotion: false,
    quantity: 1,
    unitPrice: 399,
    discount: 0,
    cart: [
      { id: 'aura-one', name: 'AURA ONE Flagship', price: 399, qty: 1, color: 'Titanium Graphite', cushion: 'Signature Leather', engraving: 'AURA ONE' }
    ],
    mouseX: 0,
    mouseY: 0
  };

  // Toast Notification & Global Toast Engine
  function showToast(message) {
    const toast = document.getElementById('toast-notify');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
  function showNotificationToast(message) {
    showToast(message);
  }
  window.showToast = showToast;
  window.showNotificationToast = showToast;

  // ==========================================
  // 1. THREE.JS SCENE & MASTER LIGHTING
  // ==========================================
  const canvas = document.getElementById('webgl-canvas');
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07070a, 0.045);

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;

  // OrbitControls for 360 Inspect
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.minDistance = 2.0;
  controls.maxDistance = 7.5;
  controls.enabled = false;

  // Studio Lighting (Hyper-detailed Behance / Dribbble Luxury Setup)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Key Spotlight (Electric Cyan Glow)
  const keyLight = new THREE.DirectionalLight(0x00f2fe, 3.2);
  keyLight.position.set(6, 7, 5);
  scene.add(keyLight);

  // Vivid Neon Magenta / Pink Rim Light (Sound Redefined Concept Glow)
  const warmRimLight = new THREE.DirectionalLight(0xff0080, 2.6);
  warmRimLight.position.set(-6, -3, -3);
  scene.add(warmRimLight);

  // Electric Violet / Purple Fill Light
  const purpleLight = new THREE.DirectionalLight(0x7928ca, 2.4);
  purpleLight.position.set(-4, 6, -4);
  scene.add(purpleLight);

  // Overhead Studio Key Light (Crisp White Highlights)
  const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
  topLight.position.set(0, 8, 3);
  scene.add(topLight);

  // ==========================================
  // 2. PROCEDURAL HIGH-END 3D MODEL OF AURA ONE
  // ==========================================

  // Concentric Radial Spun Metal Bump Texture
  const concentricCanvas = document.createElement('canvas');
  concentricCanvas.width = 512;
  concentricCanvas.height = 512;
  const cCtx = concentricCanvas.getContext('2d');
  cCtx.fillStyle = '#808080';
  cCtx.fillRect(0, 0, 512, 512);
  for (let r = 10; r < 250; r += 2.5) {
    cCtx.strokeStyle = (r % 5 === 0) ? '#bfbfbf' : '#555555';
    cCtx.lineWidth = 1.2;
    cCtx.beginPath();
    cCtx.arc(256, 256, r, 0, Math.PI * 2);
    cCtx.stroke();
  }
  const concentricTexture = new THREE.CanvasTexture(concentricCanvas);

  // Dynamic Laser Engraving Texture
  const engravingCanvas = document.createElement('canvas');
  engravingCanvas.width = 512;
  engravingCanvas.height = 128;
  const engraveCtx = engravingCanvas.getContext('2d');
  const engravingTexture = new THREE.CanvasTexture(engravingCanvas);

  function updateEngravingTexture(text) {
    engraveCtx.fillStyle = '#111218';
    engraveCtx.fillRect(0, 0, 512, 128);

    engraveCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 512; i += 4) {
      engraveCtx.fillRect(i, 0, 2, 128);
    }

    engraveCtx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
    engraveCtx.lineWidth = 4;
    engraveCtx.strokeRect(16, 16, 480, 96);

    engraveCtx.font = 'bold 36px "Space Grotesk", sans-serif';
    engraveCtx.textAlign = 'center';
    engraveCtx.textBaseline = 'middle';
    
    engraveCtx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    engraveCtx.fillText((text || 'AURA ONE').toUpperCase(), 258, 66);
    
    engraveCtx.fillStyle = '#00f2fe';
    engraveCtx.fillText((text || 'AURA ONE').toUpperCase(), 256, 64);

    engravingTexture.needsUpdate = true;
  }
  updateEngravingTexture(state.engravingText);

  // Root Container for Headphone
  const headphoneRoot = new THREE.Group();
  if (window.innerWidth >= 1024) {
    headphoneRoot.position.set(0.35, 0.12, 0);
  } else {
    headphoneRoot.position.set(0, 0.45, 0);
  }
  scene.add(headphoneRoot);

  // 2 Localized Specular Point Lights for Vibrant RGB Earcup Edge Glow (Sound Redefined Concept)
  const leftEarcupGlow = new THREE.PointLight(0x00f2fe, 3.4, 4.2);
  leftEarcupGlow.position.set(-1.45, -0.15, 0.45);
  headphoneRoot.add(leftEarcupGlow);

  const rightEarcupGlow = new THREE.PointLight(0xff0088, 3.2, 4.2);
  rightEarcupGlow.position.set(1.45, -0.15, 0.45);
  headphoneRoot.add(rightEarcupGlow);

  // Master Physical PBR Materials & High-Precision Finishes (MeshPhysicalMaterial)
  const shellMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(state.selectedColor),
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 0.45,
    clearcoatRoughness: 0.08,
    bumpMap: concentricTexture,
    bumpScale: 0.05
  });

  const metalAccentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd4d4d8,
    metalness: 0.98,
    roughness: 0.1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.05
  });

  const chamferGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd4af37,
    metalness: 0.96,
    roughness: 0.08,
    clearcoat: 0.8,
    clearcoatRoughness: 0.04
  });

  const brassTurbineMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd97706,
    metalness: 0.95,
    roughness: 0.16,
    clearcoat: 0.5,
    clearcoatRoughness: 0.08
  });

  const voiceCoilMaterial = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    metalness: 0.92,
    roughness: 0.22
  });

  const pcbMaterial = new THREE.MeshStandardMaterial({
    color: 0x064e3b,
    metalness: 0.5,
    roughness: 0.35
  });

  const chromeVentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf1f5f9,
    metalness: 0.98,
    roughness: 0.05,
    clearcoat: 0.9,
    clearcoatRoughness: 0.03
  });

  const gasketMaterial = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.1,
    roughness: 0.92
  });

  const cushionMaterial = new THREE.MeshStandardMaterial({
    color: 0x141416,
    metalness: 0.05,
    roughness: 0.88
  });

  const ledRingMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    emissive: 0x00f2fe,
    emissiveIntensity: 2.4,
    roughness: 0.15
  });

  const acousticDriverMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xa1a1aa,
    metalness: 0.94,
    roughness: 0.15,
    clearcoat: 0.5,
    clearcoatRoughness: 0.06
  });

  const chipMaterial = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x00f2fe,
    emissiveIntensity: 1.2,
    metalness: 0.8,
    roughness: 0.2
  });

  // ==========================================
  // A. CIRCULAR STUDIO DISPLAY PEDESTAL STAGE (Echoir / High-End Studio)
  // ==========================================
  const pedestalGroup = new THREE.Group();
  pedestalGroup.position.set(0, -1.65, 0);

  // Reflective Turntable Base
  const baseGeom = new THREE.CylinderGeometry(2.35, 2.45, 0.09, 64);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x090a10,
    metalness: 0.94,
    roughness: 0.12
  });
  const pedestalBase = new THREE.Mesh(baseGeom, baseMat);
  pedestalGroup.add(pedestalBase);

  // Glowing Edge Rim
  const rimGeom = new THREE.TorusGeometry(2.4, 0.022, 16, 64);
  rimGeom.rotateX(Math.PI * 0.5);
  const pedestalRim = new THREE.Mesh(rimGeom, ledRingMaterial);
  pedestalRim.position.y = 0.045;
  pedestalGroup.add(pedestalRim);

  // Soft Contact Shadow Disc
  const shadowGeom = new THREE.CircleGeometry(1.65, 32);
  shadowGeom.rotateX(-Math.PI * 0.5);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.65
  });
  const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  shadowMesh.position.y = 0.05;
  pedestalGroup.add(shadowMesh);

  headphoneRoot.add(pedestalGroup);

  // ==========================================
  // B. SCULPTED HEADBAND & METAL GIMBALS
  // ==========================================
  const headbandGroup = new THREE.Group();

  // Outer Dual Aerospace Arch
  const archGeom = new THREE.TorusGeometry(1.62, 0.07, 16, 64, Math.PI * 0.92);
  const headbandArch = new THREE.Mesh(archGeom, metalAccentMaterial);
  headbandArch.rotation.z = -Math.PI * 0.46;
  headbandGroup.add(headbandArch);

  // Sub-Arch Cushion Support
  const innerCushionGeom = new THREE.TorusGeometry(1.53, 0.08, 16, 48, Math.PI * 0.72);
  const innerCushion = new THREE.Mesh(innerCushionGeom, cushionMaterial);
  innerCushion.rotation.z = -Math.PI * 0.36;
  headbandGroup.add(innerCushion);

  // Precision Slider Extension Brackets (Left & Right)
  const sliderGeom = new THREE.BoxGeometry(0.13, 0.32, 0.15);
  const leftSlider = new THREE.Mesh(sliderGeom, metalAccentMaterial);
  leftSlider.position.set(-1.42, 0.55, 0);
  leftSlider.rotation.z = -0.35;
  headbandGroup.add(leftSlider);

  const rightSlider = new THREE.Mesh(sliderGeom, metalAccentMaterial);
  rightSlider.position.set(1.42, 0.55, 0);
  rightSlider.rotation.z = 0.35;
  headbandGroup.add(rightSlider);

  // Laser Engraved Front Metal Plate
  const plateGeom = new THREE.BoxGeometry(0.85, 0.24, 0.04);
  const plateMat = new THREE.MeshStandardMaterial({
    map: engravingTexture,
    metalness: 0.75,
    roughness: 0.28
  });
  const engravePlate = new THREE.Mesh(plateGeom, plateMat);
  engravePlate.position.set(0, 1.58, 0.15);
  engravePlate.rotation.x = -Math.PI * 0.08;
  headbandGroup.add(engravePlate);
  headphoneRoot.add(headbandGroup);

  // ==========================================
  // C. 8-LAYER HIGH-PRECISION ACOUSTIC ASSEMBLY (Mark Levinson No 5909 Teardown Style)
  // ==========================================
  function createAcousticAssembly(side = 'left') {
    const isLeft = side === 'left';
    const sign = isLeft ? -1 : 1;
    const group = new THREE.Group();
    group.position.set(sign * 1.45, -0.15, 0);

    // 1. Swept Wishbone Gimbal Yoke
    const gimbalGeom = new THREE.TorusGeometry(0.56, 0.045, 16, 36, Math.PI);
    const gimbal = new THREE.Mesh(gimbalGeom, metalAccentMaterial);
    gimbal.rotation.y = Math.PI * 0.5;
    group.add(gimbal);

    // Pivot articulation screws
    const pivotGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    pivotGeom.rotateZ(Math.PI * 0.5);
    const pivotL = new THREE.Mesh(pivotGeom, chamferGoldMaterial);
    pivotL.position.set(0, 0, 0.56);
    group.add(pivotL);
    const pivotR = new THREE.Mesh(pivotGeom, chamferGoldMaterial);
    pivotR.position.set(0, 0, -0.56);
    group.add(pivotR);

    // LAYER 1: Outer Faceplate CNC Spun Metal Cap
    const capGroup = new THREE.Group();
    const dialGeom = new THREE.CylinderGeometry(0.46, 0.46, 0.06, 48);
    dialGeom.rotateZ(Math.PI * 0.5);
    const dial = new THREE.Mesh(dialGeom, shellMaterial);
    capGroup.add(dial);
    // Gold chamfer bezel ring
    const chamferGeom = new THREE.TorusGeometry(0.46, 0.015, 16, 48);
    chamferGeom.rotateY(Math.PI * 0.5);
    const chamfer = new THREE.Mesh(chamferGeom, chamferGoldMaterial);
    capGroup.add(chamfer);
    capGroup.position.set(sign * 0.14, 0, 0);
    group.add(capGroup);

    // LAYER 2: Concentric Perforated Chrome Acoustic Vent Ring
    const ventGeom = new THREE.TorusGeometry(0.49, 0.02, 16, 64);
    ventGeom.rotateY(Math.PI * 0.5);
    const vent = new THREE.Mesh(ventGeom, chromeVentMaterial);
    vent.position.set(sign * 0.10, 0, 0);
    group.add(vent);

    // LAYER 3: Silicone Sealing Gasket O-Ring
    const gasketGeom = new THREE.TorusGeometry(0.52, 0.018, 16, 48);
    gasketGeom.rotateY(Math.PI * 0.5);
    const gasket = new THREE.Mesh(gasketGeom, gasketMaterial);
    gasket.position.set(sign * 0.07, 0, 0);
    group.add(gasket);

    // LAYER 4: Precision Acoustic Chamber Cup Housing
    const chamberGroup = new THREE.Group();
    const cupGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.14, 48);
    cupGeom.rotateZ(Math.PI * 0.5);
    const cup = new THREE.Mesh(cupGeom, metalAccentMaterial);
    chamberGroup.add(cup);
    // LED Ring
    const ledGeom = new THREE.TorusGeometry(0.48, 0.015, 16, 48);
    ledGeom.rotateY(Math.PI * 0.5);
    const ledRing = new THREE.Mesh(ledGeom, ledRingMaterial);
    chamberGroup.add(ledRing);
    // CNC Tactile Buttons on bottom
    const btnGeom = new THREE.BoxGeometry(0.06, 0.04, 0.08);
    const btn1 = new THREE.Mesh(btnGeom, chamferGoldMaterial);
    btn1.position.set(0, -0.52, 0.1);
    chamberGroup.add(btn1);
    const btn2 = new THREE.Mesh(btnGeom, chamferGoldMaterial);
    btn2.position.set(0, -0.52, -0.1);
    chamberGroup.add(btn2);
    // Mic Grille Port (Feedforward ANC)
    const micGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.08, 16);
    const mic = new THREE.Mesh(micGeom, gasketMaterial);
    mic.position.set(0, 0.54, 0);
    chamberGroup.add(mic);
    chamberGroup.position.set(sign * 0.03, 0, 0);
    group.add(chamberGroup);

    // LAYER 5: Circular DSP & Audio Circuit PCB
    const pcbGroup = new THREE.Group();
    const pcbDiscGeom = new THREE.CylinderGeometry(0.45, 0.45, 0.02, 48);
    pcbDiscGeom.rotateZ(Math.PI * 0.5);
    const pcbDisc = new THREE.Mesh(pcbDiscGeom, pcbMaterial);
    pcbGroup.add(pcbDisc);
    const chipGeom = new THREE.BoxGeometry(0.04, 0.16, 0.16);
    const chip = new THREE.Mesh(chipGeom, chipMaterial);
    chip.position.set(sign * 0.02, 0, 0);
    pcbGroup.add(chip);
    pcbGroup.position.set(sign * -0.02, 0, 0);
    group.add(pcbGroup);

    // LAYER 6: 45mm Pure Beryllium Diaphragm Driver
    const driverGroup = new THREE.Group();
    const diaphragmGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.04, 48);
    diaphragmGeom.rotateZ(Math.PI * 0.5);
    const diaphragm = new THREE.Mesh(diaphragmGeom, acousticDriverMaterial);
    driverGroup.add(diaphragm);
    // Center voice coil dome (Pure Copper)
    const coilGeom = new THREE.TorusGeometry(0.2, 0.02, 16, 32);
    coilGeom.rotateY(Math.PI * 0.5);
    const coil = new THREE.Mesh(coilGeom, voiceCoilMaterial);
    driverGroup.add(coil);
    const domeGeom = new THREE.SphereGeometry(0.12, 24, 16);
    domeGeom.scale(0.3, 1, 1);
    const dome = new THREE.Mesh(domeGeom, acousticDriverMaterial);
    driverGroup.add(dome);
    driverGroup.position.set(sign * -0.07, 0, 0);
    group.add(driverGroup);

    // LAYER 7: Golden Brass Turbine Spoke Grille (Mark Levinson No 5909 Reference Style)
    const turbineGroup = new THREE.Group();
    const turbineHubGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24);
    turbineHubGeom.rotateZ(Math.PI * 0.5);
    const hub = new THREE.Mesh(turbineHubGeom, brassTurbineMaterial);
    turbineGroup.add(hub);
    // 8 radial aerodynamic spoke blades
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const spokeGeom = new THREE.BoxGeometry(0.02, 0.36, 0.02);
      const spoke = new THREE.Mesh(spokeGeom, brassTurbineMaterial);
      spoke.position.set(0, Math.sin(angle) * 0.18, Math.cos(angle) * 0.18);
      spoke.rotation.x = angle;
      turbineGroup.add(spoke);
    }
    const outerTurbineRim = new THREE.TorusGeometry(0.42, 0.015, 16, 48);
    outerTurbineRim.rotateY(Math.PI * 0.5);
    const rim = new THREE.Mesh(outerTurbineRim, brassTurbineMaterial);
    turbineGroup.add(rim);
    turbineGroup.position.set(sign * -0.12, 0, 0);
    group.add(turbineGroup);

    // LAYER 8: Ergonomic Memory Foam Cushion (Da Cừu / Aeromesh)
    const cushionGeom = new THREE.TorusGeometry(0.47, 0.18, 24, 48);
    cushionGeom.rotateY(Math.PI * 0.5);
    const cushion = new THREE.Mesh(cushionGeom, cushionMaterial);
    cushion.position.set(sign * -0.22, 0, 0);
    group.add(cushion);

    return {
      group,
      capGroup,
      vent,
      gasket,
      chamberGroup,
      pcbGroup,
      driverGroup,
      turbineGroup,
      cushion,
      gimbal,
      dial
    };
  }

  // Create Left & Right Earcup Assemblies
  const leftEarcup = createAcousticAssembly('left');
  const rightEarcup = createAcousticAssembly('right');
  const leftAssembly = leftEarcup.group;
  const rightAssembly = rightEarcup.group;
  const leftDriverGroup = leftEarcup.driverGroup;
  const rightDriverGroup = rightEarcup.driverGroup;
  const leftCushion = leftEarcup.cushion;
  const rightCushion = rightEarcup.cushion;

  headphoneRoot.add(leftAssembly);
  headphoneRoot.add(rightAssembly);

  // ==========================================
  // D. LVCIDIA CYBERNETIC WIREFRAME CAGE & FIRE EMBERS (Image 1 & 2 Style)
  // ==========================================
  const cageGroup = new THREE.Group();
  const cageGeom = new THREE.BoxGeometry(4.2, 4.2, 4.2);
  const cageWireGeom = new THREE.WireframeGeometry(cageGeom);
  const cageLineMat = new THREE.LineBasicMaterial({
    color: 0xff9900,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
  });
  const cageMesh = new THREE.LineSegments(cageWireGeom, cageLineMat);
  cageGroup.add(cageMesh);

  // Secondary Geodesic Ring
  const innerCageGeom = new THREE.IcosahedronGeometry(2.6, 1);
  const innerWireGeom = new THREE.WireframeGeometry(innerCageGeom);
  const innerLineMat = new THREE.LineBasicMaterial({
    color: 0x7928ca,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending
  });
  const innerCageMesh = new THREE.LineSegments(innerWireGeom, innerLineMat);
  cageGroup.add(innerCageMesh);
  headphoneRoot.add(cageGroup);

  // Thermal Embers Particle System (Internal Fire & Golden Sparks)
  const emberCount = 300;
  const emberGeom = new THREE.BufferGeometry();
  const emberPositions = new Float32Array(emberCount * 3);
  for (let i = 0; i < emberCount; i++) {
    emberPositions[i * 3] = (Math.random() - 0.5) * 3.6;
    emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.6;
    emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.6;
  }
  emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
  const emberMaterial = new THREE.PointsMaterial({
    color: 0xff9900,
    size: 0.045,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const emberParticles = new THREE.Points(emberGeom, emberMaterial);
  headphoneRoot.add(emberParticles);

  // Spatial Particle Rings
  const particleCount = 1200;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.8 + Math.random() * 2.5;
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f2fe,
    size: 0.038,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });
  const waveParticles = new THREE.Points(particleGeom, particleMaterial);
  waveParticles.visible = false;
  scene.add(waveParticles);

  // ==========================================
  // 3. PROCEDURAL WEB AUDIO SYNTH & 3-BAND EQ
  // ==========================================
  let audioCtx = null;
  let synthGain = null;
  let pannerNode = null;
  let analyserNode = null;
  let synthOsc1 = null;
  let synthOsc2 = null;
  let lfo = null;
  let lfoGain = null;
  let bassFilter = null;
  let midFilter = null;
  let trebleFilter = null;
  let audioFilter = null;
  let currentSoundProfile = '8d-orbit';

  const SOUND_PROFILES = {
    '8d-orbit': {
      name: '8D Binaural Spatial Orbit',
      tag: '8D SPATIAL',
      desc: 'Quỹ đạo âm thanh vòm 360 độ xoay quanh đầu, dải trung mượt mà và âm trường rộng mở.',
      osc1Type: 'sawtooth',
      osc1Freq: 110,
      osc2Type: 'triangle',
      osc2Freq: 164.81,
      filterType: 'lowpass',
      filterFreq: 450,
      lfoFreq: 0.35,
      lfoDepth: 0.95
    },
    'sub-bass': {
      name: 'Sub-Bass 45Hz Acoustic Sweep',
      tag: '40Hz - 80Hz SUB',
      desc: 'Kiểm thử độ căng cơ học và khả năng tái hiện dải siêu trầm 4Hz - 52kHz của màng loa Beryllium.',
      osc1Type: 'sine',
      osc1Freq: 45,
      osc2Type: 'sine',
      osc2Freq: 90,
      filterType: 'lowpass',
      filterFreq: 160,
      lfoFreq: 0.1,
      lfoDepth: 0.15
    },
    'studio-jazz': {
      name: 'Audiophile Studio Sanctuary',
      tag: 'WARM ANALOG',
      desc: 'Chất âm ấm áp chuẩn phòng thu Mastering analog, độ méo hài THD < 0.03% và hài âm tự nhiên.',
      osc1Type: 'triangle',
      osc1Freq: 220,
      osc2Type: 'sine',
      osc2Freq: 330,
      filterType: 'bandpass',
      filterFreq: 850,
      lfoFreq: 0.2,
      lfoDepth: 0.45
    },
    'cyber-pulse': {
      name: 'Cyberpunk Quantum Synthwave',
      tag: 'NEURAL PULSE',
      desc: 'Xung nhịp điện tử lượng tử năng động với giải thuật định vị không gian thời gian thực độ trễ dưới 8ms.',
      osc1Type: 'sawtooth',
      osc1Freq: 130.81,
      osc2Type: 'square',
      osc2Freq: 196.00,
      filterType: 'lowpass',
      filterFreq: 1200,
      lfoFreq: 1.1,
      lfoDepth: 0.8
    },
    'anc-neutral': {
      name: 'Anti-Noise Silence Neutralizer',
      tag: 'ANC TRANQUILITY',
      desc: 'Sóng âm dịu nhẹ mô phỏng khả năng cách âm thụ động và triệt tiêu tiếng ồn của buồng âm AURA.',
      osc1Type: 'sine',
      osc1Freq: 174,
      osc2Type: 'sine',
      osc2Freq: 285,
      filterType: 'lowpass',
      filterFreq: 320,
      lfoFreq: 0.08,
      lfoDepth: 0.2
    }
  };

  function playUiClickSfx() {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      // Ultra-gentle velvet micro-tap (pure sine, warm lowpass filter, gentle envelope)
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, audioCtx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  function initAudioSynthesizer() {
    if (audioCtx && bassFilter) return;
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }

      synthGain = audioCtx.createGain();
      synthGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 64;

      bassFilter = audioCtx.createBiquadFilter();
      bassFilter.type = 'lowshelf';
      bassFilter.frequency.value = 60;
      bassFilter.gain.value = 0;

      midFilter = audioCtx.createBiquadFilter();
      midFilter.type = 'peaking';
      midFilter.frequency.value = 1000;
      midFilter.Q.value = 1.0;
      midFilter.gain.value = 0;

      trebleFilter = audioCtx.createBiquadFilter();
      trebleFilter.type = 'highshelf';
      trebleFilter.frequency.value = 10000;
      trebleFilter.gain.value = 0;

      pannerNode = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;

      synthOsc1 = audioCtx.createOscillator();
      synthOsc1.type = 'sine';
      synthOsc1.frequency.setValueAtTime(174.61, audioCtx.currentTime); // Solfeggio 174Hz peaceful

      synthOsc2 = audioCtx.createOscillator();
      synthOsc2.type = 'sine';
      synthOsc2.frequency.setValueAtTime(261.63, audioCtx.currentTime); // C4 sweet harmony

      audioFilter = audioCtx.createBiquadFilter();
      audioFilter.type = 'lowpass';
      audioFilter.frequency.setValueAtTime(260, audioCtx.currentTime);

      lfo = audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.35, audioCtx.currentTime);
      lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(0.85, audioCtx.currentTime);

      synthOsc1.connect(audioFilter);
      synthOsc2.connect(audioFilter);
      audioFilter.connect(bassFilter);
      bassFilter.connect(midFilter);
      midFilter.connect(trebleFilter);
      trebleFilter.connect(synthGain);
      synthGain.connect(analyserNode);

      if (pannerNode) {
        lfo.connect(lfoGain);
        lfoGain.connect(pannerNode.pan);
        synthGain.connect(pannerNode);
        pannerNode.connect(audioCtx.destination);
      } else {
        synthGain.connect(audioCtx.destination);
      }

      synthOsc1.start();
      synthOsc2.start();
      lfo.start();
    } catch (err) {}
  }

  function setSoundProfile(profileKey) {
    initAudioSynthesizer();
    if (!audioCtx) return;
    const p = SOUND_PROFILES[profileKey];
    if (!p) return;
    currentSoundProfile = profileKey;

    const t = audioCtx.currentTime;
    if (synthOsc1) {
      synthOsc1.type = p.osc1Type;
      synthOsc1.frequency.setTargetAtTime(p.osc1Freq, t, 0.1);
    }
    if (synthOsc2) {
      synthOsc2.type = p.osc2Type;
      synthOsc2.frequency.setTargetAtTime(p.osc2Freq, t, 0.1);
    }
    if (audioFilter) {
      audioFilter.type = p.filterType;
      audioFilter.frequency.setTargetAtTime(p.filterFreq, t, 0.1);
    }
    if (lfo) {
      lfo.frequency.setTargetAtTime(p.lfoFreq, t, 0.1);
    }
    if (lfoGain) {
      lfoGain.gain.setTargetAtTime(p.lfoDepth, t, 0.1);
    }

    const soundTitleElem = document.getElementById('active-soundscape-title');
    if (soundTitleElem) soundTitleElem.textContent = p.name;
    const soundTagElem = document.getElementById('active-soundscape-tag');
    if (soundTagElem) soundTagElem.textContent = p.tag;

    showToast(`🔊 Đã chuyển sang âm thanh: ${p.name}`);
  }

  function toggleAudioPlayback(forcePlay) {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    const shouldPlay = forcePlay !== undefined ? forcePlay : !isMasterTrackPlaying;
    if (shouldPlay) {
      playMasterSoundTrack();
    } else {
      stopMasterSoundTrack();
    }
  }

  document.getElementById('audio-toggle-btn')?.addEventListener('click', () => {
    playUiClickSfx();
    toggleAudioPlayback();
  });

  // Dynamic Concept Theme Switcher
  
  // Wire Header & Mobile Theme Switchers
  document.querySelectorAll('.header-theme-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      const theme = dot.getAttribute('data-theme');
      if (typeof applySiteTheme === 'function') applySiteTheme(theme);
    });
  });

  document.querySelectorAll('.mobile-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      const theme = btn.getAttribute('data-theme');
      if (typeof applySiteTheme === 'function') applySiteTheme(theme);
    });
  });

  function applyColorTheme(themeId) {
    const found = window.AURA_DATA.pricing.colors.find(c => c.id === themeId);
    if (!found) return;

    state.selectedColor = found.hex;
    state.selectedColorName = found.name;

    if (themeId === 'gold') {
      // 24K Royal Gold & Obsidian Black
      gsap.to(shellMaterial.color, { r: 0.08, g: 0.08, b: 0.1, duration: 0.6 });
      shellMaterial.metalness = 0.92;
      shellMaterial.roughness = 0.15;
      gsap.to(metalAccentMaterial.color, { r: 0.85, g: 0.72, b: 0.22, duration: 0.6 });
      metalAccentMaterial.metalness = 0.98;
      metalAccentMaterial.roughness = 0.06;
      gsap.to(cushionMaterial.color, { r: 0.08, g: 0.08, b: 0.09, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.9, g: 0.75, b: 0.2, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0xfef08a);
    } else if (themeId === 'copper') {
      // Bespoke Warm Copper
      gsap.to(shellMaterial.color, { r: 0.72, g: 0.35, b: 0.05, duration: 0.6 });
      shellMaterial.metalness = 0.88;
      shellMaterial.roughness = 0.22;
      gsap.to(metalAccentMaterial.color, { r: 0.25, g: 0.22, b: 0.2, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.14, g: 0.1, b: 0.08, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.9, g: 0.45, b: 0.1, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0xf59e0b);
    } else if (themeId === 'pearl') {
      // Pearl Minimalist White
      gsap.to(shellMaterial.color, { r: 0.96, g: 0.97, b: 0.99, duration: 0.6 });
      shellMaterial.metalness = 0.2;
      shellMaterial.roughness = 0.3;
      gsap.to(metalAccentMaterial.color, { r: 0.88, g: 0.78, b: 0.8, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.82, g: 0.78, b: 0.75, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.7, g: 0.85, b: 0.95, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0xdbeafe);
    } else if (themeId === 'redefined') {
      // Electric Cyan & Magenta Concept Master
      gsap.to(shellMaterial.color, { r: 0.07, g: 0.09, b: 0.14, duration: 0.6 });
      shellMaterial.metalness = 0.95;
      shellMaterial.roughness = 0.1;
      gsap.to(metalAccentMaterial.color, { r: 0.0, g: 0.95, b: 1.0, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.06, g: 0.07, b: 0.09, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.0, g: 0.95, b: 1.0, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0x00f2fe);
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0x00f2fe);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0xff0088);
    } else if (themeId === 'emerald') {
      // Imperial Emerald Jade
      gsap.to(shellMaterial.color, { r: 0.03, g: 0.25, b: 0.18, duration: 0.6 });
      shellMaterial.metalness = 0.85;
      shellMaterial.roughness = 0.2;
      gsap.to(metalAccentMaterial.color, { r: 0.85, g: 0.72, b: 0.22, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.05, g: 0.1, b: 0.08, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.2, g: 0.9, b: 0.5, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0x34d399);
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0x10b981);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0x059669);
    } else if (themeId === 'rosegold') {
      // Liquid Champagne Rose Gold
      gsap.to(shellMaterial.color, { r: 0.88, g: 0.66, b: 0.52, duration: 0.6 });
      shellMaterial.metalness = 0.92;
      shellMaterial.roughness = 0.12;
      gsap.to(metalAccentMaterial.color, { r: 0.95, g: 0.85, b: 0.75, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.85, g: 0.78, b: 0.74, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 1.0, g: 0.8, b: 0.6, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0xfde047);
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0xf472b6);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0xfb7185);
    } else if (themeId === 'crimson') {
      // Stealth Matte Crimson
      gsap.to(shellMaterial.color, { r: 0.45, g: 0.05, b: 0.12, duration: 0.6 });
      shellMaterial.metalness = 0.4;
      shellMaterial.roughness = 0.45;
      gsap.to(metalAccentMaterial.color, { r: 0.12, g: 0.12, b: 0.14, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.08, g: 0.08, b: 0.09, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.95, g: 0.1, b: 0.25, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0xf43f5e);
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0xf43f5e);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0xe11d48);
    } else {
      // Titanium Graphite / Default
      gsap.to(shellMaterial.color, { r: 0.12, g: 0.13, b: 0.16, duration: 0.6 });
      shellMaterial.metalness = 0.92;
      shellMaterial.roughness = 0.18;
      gsap.to(metalAccentMaterial.color, { r: 0.83, g: 0.83, b: 0.85, duration: 0.6 });
      gsap.to(cushionMaterial.color, { r: 0.1, g: 0.1, b: 0.12, duration: 0.6 });
      gsap.to(ledRingMaterial.color, { r: 0.0, g: 0.95, b: 1.0, duration: 0.6 });
      ledRingMaterial.emissive.setHex(0x00f2fe);
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0x00f2fe);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0x38bdf8);
    }

    const stickyDot = document.getElementById('sticky-color-dot');
    const stickyLabel = document.getElementById('sticky-selected-color');
    const drawerSummary = document.getElementById('drawer-color-summary');
    if (stickyDot) stickyDot.style.backgroundColor = found.hex;
    if (stickyLabel) stickyLabel.textContent = `${found.name} • Free Laser Engraving`;
    if (drawerSummary) drawerSummary.textContent = `Màu: ${found.name}`;

    showToast(`Đã chuyển sang phiên bản ${found.name}`);
  }

  // Bespoke Interactive 3D Customizer Mixer
  function applyCustomColor(shellHex, cushionHex, accentHex, metalness, roughness) {
    if (shellHex) {
      shellMaterial.color.set(shellHex);
      state.selectedColor = shellHex;
    }
    if (cushionHex) {
      cushionMaterial.color.set(cushionHex);
    }
    if (accentHex) {
      metalAccentMaterial.color.set(accentHex);
      ledRingMaterial.color.set(accentHex);
      ledRingMaterial.emissive.set(accentHex);
    }
    if (metalness !== undefined) {
      shellMaterial.metalness = parseFloat(metalness);
    }
    if (roughness !== undefined) {
      shellMaterial.roughness = parseFloat(roughness);
    }
    state.selectedColorName = `Bespoke Custom (${(shellHex || '').toUpperCase()})`;
    const stickyDot = document.getElementById('sticky-color-dot');
    const stickyLabel = document.getElementById('sticky-selected-color');
    if (stickyDot && shellHex) stickyDot.style.backgroundColor = shellHex;
    if (stickyLabel) stickyLabel.textContent = `Bespoke Custom (${(shellHex || '').toUpperCase()})`;
  }

  // ==========================================
  // 4. ROUTER & DYNAMIC VIEWS (35 Pages)
  // ==========================================
  const mainContainer = document.getElementById('main-view-container');

  function renderView(rawRoute) {
    const fullRoute = rawRoute || window.location.hash || '#/';
    const [routePath, queryString] = fullRoute.split('?');
    const queryParams = new URLSearchParams(queryString || '');
    state.currentRoute = fullRoute;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset exploded parts if coming from anatomy
    gsap.to(leftAssembly.position, { x: -1.45, duration: 0.6 });
    gsap.to(rightAssembly.position, { x: 1.45, duration: 0.6 });
    gsap.to(leftEarcup.capGroup.position, { x: -0.14, duration: 0.6 });
    gsap.to(leftEarcup.vent.position, { x: -0.10, duration: 0.6 });
    gsap.to(leftEarcup.gasket.position, { x: -0.07, duration: 0.6 });
    gsap.to(leftEarcup.chamberGroup.position, { x: -0.03, duration: 0.6 });
    gsap.to(leftEarcup.pcbGroup.position, { x: 0.02, duration: 0.6 });
    gsap.to(leftEarcup.driverGroup.position, { x: 0.07, duration: 0.6 });
    gsap.to(leftEarcup.turbineGroup.position, { x: 0.12, duration: 0.6 });
    gsap.to(leftEarcup.cushion.position, { x: 0.22, duration: 0.6 });

    gsap.to(rightEarcup.capGroup.position, { x: 0.14, duration: 0.6 });
    gsap.to(rightEarcup.vent.position, { x: 0.10, duration: 0.6 });
    gsap.to(rightEarcup.gasket.position, { x: 0.07, duration: 0.6 });
    gsap.to(rightEarcup.chamberGroup.position, { x: 0.03, duration: 0.6 });
    gsap.to(rightEarcup.pcbGroup.position, { x: -0.02, duration: 0.6 });
    gsap.to(rightEarcup.driverGroup.position, { x: -0.07, duration: 0.6 });
    gsap.to(rightEarcup.turbineGroup.position, { x: -0.12, duration: 0.6 });
    gsap.to(rightEarcup.cushion.position, { x: -0.22, duration: 0.6 });

    // Update active state of top header pills and mobile links
    document.querySelectorAll('.nav-pill').forEach(pill => {
      const pRoute = pill.getAttribute('data-route');
      if (pRoute === routePath || (pRoute === '#/explore' && (routePath === '#/gallery' || routePath === '#/explore')) || (pRoute === '#/' && (!routePath || routePath === ''))) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    if (routePath === '#/' || routePath === '') {
      if (window.innerWidth >= 1024) {
        gsap.to(headphoneRoot.position, { x: 1.35, y: 0.1, z: 0, duration: 0.8 });
      } else {
        gsap.to(headphoneRoot.position, { x: 0, y: 0.6, z: 0, duration: 0.8 });
      }
      gsap.to(headphoneRoot.rotation, { x: 0, y: 0, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 5.2, duration: 0.8 });
      pedestalGroup.visible = true;
      renderHomepage();
    } else if (routePath === '#/overview') {
      const targetX = (window.innerWidth >= 1024) ? 1.35 : 0;
      gsap.to(headphoneRoot.position, { x: targetX, y: 0.1, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0.1, y: -0.2, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 5.0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderOverviewPage();
    } else if (routePath === '#/anc') {
      const targetX = (window.innerWidth >= 1024) ? 1.25 : 0;
      gsap.to(headphoneRoot.position, { x: targetX, y: 0.05, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0.12, y: -0.25, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 4.8, duration: 0.8 });
      waveParticles.visible = true;
      pedestalGroup.visible = true;
      renderAncPage();
    } else if (routePath === '#/gallery' || routePath === '#/explore') {
      gsap.to(headphoneRoot.position, { x: 0, y: 2.2, z: 0, duration: 0.8 });
      pedestalGroup.visible = false;
      renderGalleryPage();
    } else if (routePath === '#/environment') {
      const targetX = (window.innerWidth >= 1024) ? 1.25 : 0;
      const targetY = (window.innerWidth >= 1024) ? 0.05 : 0.6;
      gsap.to(headphoneRoot.position, { x: targetX, y: targetY, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0.15, y: -Math.PI * 0.22, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 4.8, duration: 0.8 });
      pedestalGroup.visible = true;
      renderEnvironmentPage();
    } else if (routePath === '#/anatomy') {
      gsap.to(headphoneRoot.position, { x: 0, y: 0.05, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { y: Math.PI * 0.38, x: 0.14, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 4.1, duration: 0.8 });
      pedestalGroup.visible = false;

      setAnatomyExplosion(1.0, 0.8);
      renderAnatomyPage();
    } else if (routePath === '#/studio' || routePath === '#/engraving') {
      const targetX = (window.innerWidth >= 1024) ? 1.25 : 0;
      gsap.to(headphoneRoot.position, { x: targetX, y: 0.15, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: -0.35, y: -Math.PI * 0.12, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0.2, z: 4.2, duration: 0.8 });
      pedestalGroup.visible = true;
      renderStudioPage();
    } else if (routePath === '#/spatial-audio') {
      gsap.to(headphoneRoot.position, { x: 0, y: 0, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0, y: 0, duration: 0.8 });
      waveParticles.visible = true;
      pedestalGroup.visible = true;
      renderSpatialAudioPage();
    } else if (routePath === '#/specs') {
      gsap.to(headphoneRoot.position, { x: 1.8, y: 0, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderSpecsPage();
    } else if (routePath === '#/compare') {
      gsap.to(headphoneRoot.position, { x: 0, y: 1.5, z: 0, duration: 0.8 });
      pedestalGroup.visible = false;
      renderComparePage();
    } else if (routePath === '#/store' || routePath === '#/products') {
      gsap.to(headphoneRoot.position, { x: 0, y: 1.8, z: 0, duration: 0.8 });
      pedestalGroup.visible = false;
      renderHomepage();
      setTimeout(() => {
        document.getElementById('aura-product-catalog')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (routePath === '#/login') {
      gsap.to(headphoneRoot.position, { x: 1.6, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderLoginPage();
    } else if (routePath === '#/register') {
      gsap.to(headphoneRoot.position, { x: 1.6, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderRegisterPage();
    } else if (routePath === '#/dashboard') {
      gsap.to(headphoneRoot.position, { x: 1.7, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      const tabParam = queryParams.get('tab') || 'overview';
      renderDashboardPage(tabParam);
    } else if (routePath === '#/wishlist') {
      renderHomepage();
      setTimeout(() => {
        if (typeof window.openWishlistModal === 'function') window.openWishlistModal();
      }, 100);
    } else if (routePath === '#/warranty' || routePath === '#/digital-warranty') {
      renderHomepage();
      setTimeout(() => {
        if (typeof window.openWarrantyModal === 'function') window.openWarrantyModal();
      }, 100);
    } else if (routePath === '#/cart') {
      gsap.to(headphoneRoot.position, { x: -1.6, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderCartPage();
    } else if (routePath === '#/my-orders') {
      gsap.to(headphoneRoot.position, { x: 1.7, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderMyOrdersPage();
    } else if (routePath === '#/order-detail') {
      gsap.to(headphoneRoot.position, { x: 1.7, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderOrderDetailPage(queryParams.get('id') || 'AURA-2026-8892');
    } else if (routePath === '#/checkout') {
      gsap.to(headphoneRoot.position, { x: -1.6, y: 0, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderCheckoutPage();
    } else if (routePath === '#/order-confirmation') {
      const orderId = queryParams.get('id') || 'AURA-2026-' + Math.floor(1000 + Math.random() * 9000);
      const targetX = (window.innerWidth >= 1024) ? 1.35 : 0;
      gsap.to(headphoneRoot.position, { x: targetX, y: 0.1, z: 0, duration: 0.8 });
      pedestalGroup.visible = true;
      renderOrderConfirmationPage(orderId);
    } else if (routePath === '#/order-tracking') {
      renderOrderTrackingPage(queryParams.get('id'));
    } else if (routePath === '#/digital-warranty') {
      renderWarrantyLookupPage(queryParams.get('sn'));
    } else if (routePath === '#/register') {
      renderRegisterPage();
    } else if (routePath === '#/manual') {
      renderManualPage();
    } else if (routePath === '#/firmware') {
      renderFirmwarePage();
    } else if (['#/warranty', '#/shipping', '#/returns', '#/privacy', '#/terms'].includes(routePath)) {
      renderLegalPage(routePath);
    } else if (routePath === '#/accessories') {
      renderAccessoriesPage();
    } else if (routePath === '#/care-plus') {
      renderCarePlusPage();
    } else if (routePath === '#/about') {
      renderAboutPage();
    } else if (routePath === '#/faq') {
      renderFaqPage();
    } else {
      renderGenericPage(routePath);
    }

    updateHeaderAuthUI();
    if (window.AURA_CART) window.AURA_CART.updateHeaderBadge();
    refreshIcons();
  }

  // ==========================================
  // VIEW RENDERERS IMPLEMENTATION
  // ==========================================

  // 1. Homepage (Avant-Garde Digital Art & Spatial Sculpture Platform)
  function renderHomepage() {
    mainContainer.innerHTML = `
      <!-- HERO SECTION -->
      <section class="max-w-7xl mx-auto px-6 min-h-[92vh] flex flex-col justify-between pb-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          <!-- Left Column (50% Text & Art Controls) -->
          <div class="lg:col-span-6 z-10">
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]"></span>
              <span>AURA LABS • NEXT-GEN SPATIAL AUDIO ARCHITECTURE</span>
            </div>

            <div class="font-mono text-xs uppercase tracking-widest text-slate-400 mb-3 flex items-center space-x-2">
              <span class="text-cyan-400">// 01</span>
              <span>SOUND REDEFINED & SCULPTED IN SPACE</span>
            </div>

            <h1 class="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.04]">
              <span class="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">SOUND. SUSPENDED</span> <br/>
              <span class="text-hero-gradient">IN THREE DIMENSIONS.</span>
            </h1>

            <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Trải nghiệm âm thanh không gian chuẩn mastering phòng thu. Cấu trúc hợp kim Magie hàng không 238g, màng loa 40mm Pure Beryllium và thuật toán định vị trường âm 8D theo thời gian thực.
            </p>

            <div class="flex flex-wrap items-center gap-4 mb-8">
              <a href="#/environment" class="px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm tracking-wider uppercase transition-all shadow-lg shadow-cyan-400/25 flex items-center space-x-2">
                <span>BẮT ĐẦU TRẢI NGHIỆM 3D</span>
                <i data-lucide="play" class="w-4 h-4 fill-current"></i>
              </a>
              <a href="#/anatomy" class="glass-button px-7 py-4 rounded-full text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center space-x-2 border border-cyan-500/30">
                <span>KHÁM PHÁ BÓC TÁCH</span>
                <i data-lucide="layers" class="w-4 h-4 text-cyan-400"></i>
              </a>
              <a href="#/store" class="px-7 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold text-sm tracking-wider uppercase transition-all shadow-lg shadow-cyan-400/20 flex items-center space-x-2">
                <span>KHÁM PHÁ CỬA HÀNG</span>
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              </a>
            </div>

            <!-- Curated Concept Theme Switcher (8 Luxury Editions) -->
            <div class="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xl mb-4">
              <div class="text-[11px] font-mono text-slate-300 uppercase mb-2.5 flex items-center justify-between">
                <span class="font-semibold">CHỌN BẢN PHỐI MÀU LUXURY ĐỘC BẢN:</span>
                <a href="#/studio" class="text-accent-dynamic hover:underline font-bold">Xưởng Tự Thiết Kế 3D →</a>
              </div>
              <div class="grid grid-cols-4 sm:grid-cols-8 gap-2">
                ${window.AURA_DATA.pricing.colors.map(c => `
                  <button class="theme-btn p-2 rounded-xl border ${c.id === 'titanium' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'} hover:border-cyan-400/50 text-center transition-all flex flex-col items-center" data-theme="${c.id}">
                    <div class="w-4 h-4 rounded-full mb-1 border border-white/30" style="background-color: ${c.hex}"></div>
                    <div class="text-[9px] text-white font-medium truncate w-full">${c.name}</div>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Typography Color Palette Selector (Tông Màu Chữ Bắt Mắt) -->
            <div class="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-xl mb-8 backdrop-blur-md">
              <div class="text-[11px] font-mono text-slate-200 uppercase mb-2.5 flex items-center justify-between">
                <span class="flex items-center gap-1.5 font-bold tracking-wider text-accent-dynamic">
                  <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                  <span>TÔNG MÀU CHỮ BẮT MẮT (TYPOGRAPHY PALETTE):</span>
                </span>
                <span id="hero-active-theme-name" class="text-xs font-bold text-white font-heading">CYBER CYAN</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button class="text-theme-select-btn px-3 py-2.5 rounded-xl text-xs font-mono font-medium border flex items-center justify-center space-x-2 transition-all active-theme" data-theme="cyan">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]"></span>
                  <span>Cyber Cyan</span>
                </button>
                <button class="text-theme-select-btn px-3 py-2.5 rounded-xl text-xs font-mono font-medium border flex items-center justify-center space-x-2 transition-all" data-theme="gold">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
                  <span>Vàng Hoàng Gia</span>
                </button>
                <button class="text-theme-select-btn px-3 py-2.5 rounded-xl text-xs font-mono font-medium border flex items-center justify-center space-x-2 transition-all" data-theme="rose">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]"></span>
                  <span>Hồng Ruby Neon</span>
                </button>
                <button class="text-theme-select-btn px-3 py-2.5 rounded-xl text-xs font-mono font-medium border flex items-center justify-center space-x-2 transition-all" data-theme="emerald">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
                  <span>Lục Bảo Matrix</span>
                </button>
              </div>
            </div>

            <div class="flex flex-wrap gap-2.5">
              <span class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center space-x-1.5">
                <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span>30 Ngày dùng thử miễn phí</span>
              </span>
              <span class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center space-x-1.5">
                <i data-lucide="shield" class="w-3.5 h-3.5 text-purple-400"></i>
                <span>Bảo hành 24 tháng 1 đổi 1</span>
              </span>
              <span class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center space-x-1.5">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Khắc tên Laser 3D miễn phí</span>
              </span>
            </div>
          </div>

          <!-- Right Column (3D Space reserved for Three.js Canvas & Feature Pins) -->
          <div class="lg:col-span-6 relative h-[450px] lg:h-[650px] pointer-events-none"></div>
        </div>

        <!-- Hero Stats Row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/10 max-w-5xl">
          <div>
            <div class="font-heading text-2xl font-bold text-white">40mm</div>
            <div class="text-xs text-slate-400 font-mono">Beryllium Diaphragm</div>
          </div>
          <div>
            <div class="font-heading text-2xl font-bold text-cyan-400">-48dB</div>
            <div class="text-xs text-slate-400 font-mono">Neural Hybrid ANC</div>
          </div>
          <div>
            <div class="font-heading text-2xl font-bold text-white">60 Giờ</div>
            <div class="text-xs text-slate-400 font-mono">Thời lượng Pin liên tục</div>
          </div>
          <div>
            <div class="font-heading text-2xl font-bold text-white">238g</div>
            <div class="text-xs text-slate-400 font-mono">Hợp kim Magie siêu nhẹ</div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: ENGINEERED FOR PERFECTION (BENTO GRID) -->
      <section class="max-w-7xl mx-auto px-6 py-24">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <span>MODEL: AURA-X1 • EDITION: MIDNIGHT</span>
            </div>
            <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2">
              ENGINEERED FOR <span class="text-hero-gradient">PERFECTION</span>
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-mono">
            Từng milimet cấu trúc âm học được tính toán tỉ mỉ cho người đam mê chất âm chuẩn mastering phòng thu.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card 1: Sonic Architecture -->
          <div class="bento-card p-6 lg:col-span-2 flex flex-col justify-between min-h-[300px] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-[#0d0e14] to-black">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-mono text-cyan-400 flex items-center space-x-1.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>ACOUSTIC ARCHITECTURE</span>
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">40MM BERYLLIUM</span>
              </div>
              <h3 class="font-heading text-2xl font-bold text-white mb-2">Sonic Architecture</h3>
              <p class="text-xs text-slate-300 leading-relaxed max-w-md">
                Màng loa Pure Beryllium 40mm phủ Nano Carbon cho phản hồi tức thời dưới 0.05% méo hài, tái hiện âm trường mở rộng như ngồi trước dàn loa hi-end \$50,000.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-xs font-mono">
              <div>
                <span class="text-slate-500 block text-[10px]">FREQ RESPONSE</span>
                <span class="text-cyan-300 font-semibold">5Hz – 48kHz</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[10px]">TOTAL HARMONIC</span>
                <span class="text-white font-semibold">&lt; 0.05% THD</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[10px]">IMPEDANCE</span>
                <span class="text-white font-semibold">32 Ohms</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Pure Silence -->
          <div class="bento-card p-6 flex flex-col justify-between min-h-[300px] border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-[#0d0e14] to-black">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-mono text-purple-400 flex items-center space-x-1.5">
                  <span class="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span>NEURAL AI ANC</span>
                </span>
                <i data-lucide="cpu" class="w-4 h-4 text-purple-400"></i>
              </div>
              <h3 class="font-heading text-xl font-bold text-white mb-2">Pure Silence</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Vi xử lý AI kép phân tích tiếng ồn môi trường 48.000 lần/giây để tạo sóng âm triệt tiêu tức thì.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span class="font-heading text-2xl font-bold text-purple-400">-48dB</span>
                <span class="text-[10px] text-slate-500 block font-mono">NOISE FLOOR</span>
              </div>
              <div>
                <span class="font-heading text-2xl font-bold text-white">0.02ms</span>
                <span class="text-[10px] text-slate-500 block font-mono">LATENCY AI</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Endurance 60 HRS -->
          <div class="bento-card p-6 flex flex-col justify-between min-h-[300px] border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-[#0d0e14] to-black">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-mono text-amber-400 flex items-center space-x-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>POWER CELL</span>
                </span>
                <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>
              </div>
              <h3 class="font-heading text-xl font-bold text-white mb-2">Endurance 60 HRS</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Pin mật độ cao Li-Po 950mAh. Sạc nhanh Type-C Power Delivery 10 phút cho 8 giờ sử dụng liên tục.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5">
              <div class="flex items-baseline justify-between mb-1">
                <span class="font-heading text-2xl font-bold text-amber-400">60 HRS</span>
                <span class="text-[10px] font-mono text-emerald-400">100% FAST CHARGE</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[95%] rounded-full shadow-[0_0_8px_#f59e0b]"></div>
              </div>
            </div>
          </div>

          <!-- Card 4: Multipoint Connection -->
          <div class="bento-card p-6 lg:col-span-4 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 bg-[#0d0e14]/90">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <i data-lucide="wifi" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-heading text-lg font-bold text-white">Multipoint Seamless Connection</h4>
                <p class="text-xs text-slate-400">Bluetooth 5.4 • LDAC, aptX Lossless, LHDC 5.0 • Tự động chuyển đổi giữa Phone, Tablet và Laptop tức thì.</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">15m Ultra Range</span>
              <span class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">Dual Host Sync</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2.5: BERYLLIUM TRANSDUCER MACRO & ACOUSTIC ENGINEERING -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left: Macro Image Showcase -->
          <div class="lg:col-span-6 relative group">
            <div class="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
              <img src="assets/media/beryllium-driver-macro.png" alt="Màng loa Beryllium 40mm AURA ONE" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div class="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">CHẾ TÁC VI MÔ • 40MM BERYLLIUM</div>
                  <div class="text-xs font-bold text-white">Vân dập gân triệt tiêu sóng đứng</div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono text-cyan-300">12.890 m/s Speed</span>
              </div>
            </div>
          </div>

          <!-- Right: Engineering Specifications & Parametric EQ Curve -->
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full badge-dynamic text-xs font-mono">
              <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
              <span>ĐỈNH CAO LUYỆN KIM ÂM HỌC HI-RES</span>
            </div>
            <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              MÀNG LOA BERYLLIUM <br/>
              <span class="text-hero-gradient">TỐC ĐỘ TRUYỀN ÂM KỶ LỤC</span>
            </h2>
            <p class="text-sm text-slate-200 leading-relaxed font-light">
              Beryllium là kim loại quý hiếm sở hữu vận tốc truyền âm nhanh nhất hành tinh (12.890 m/s), gấp 4 lần Titan và 2.5 lần Nhôm. Giúp màng loa tái tạo tức thời các xung âm thanh siêu tần mà không hề bị méo dạng cơ học.
            </p>

            <!-- 3 Stat Cards Grid -->
            <div class="grid grid-cols-3 gap-4 pt-2">
              <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div class="font-heading text-2xl sm:text-3xl font-extrabold text-accent-dynamic">&lt; 0.03%</div>
                <div class="text-[10px] font-mono text-slate-400 mt-1 uppercase">Méo Hài THD</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div class="font-heading text-2xl sm:text-3xl font-extrabold text-white">48 kHz</div>
                <div class="text-[10px] font-mono text-slate-400 mt-1 uppercase">Dải Tần Siêu Rộng</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div class="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-400">1.8 T</div>
                <div class="text-[10px] font-mono text-slate-400 mt-1 uppercase">Lực Từ N52</div>
              </div>
            </div>

            <!-- Interactive Parametric EQ Quick Tuner -->
            <div class="p-5 rounded-2xl bg-white/[0.04] border border-cyan-500/20 backdrop-blur-md">
              <div class="flex items-center justify-between mb-3 text-xs font-mono">
                <span class="text-white font-bold flex items-center gap-1.5">
                  <i data-lucide="sliders" class="w-3.5 h-3.5 text-cyan-400"></i>
                  <span>BỘ TỔNG HỢP EQ THỜI GIAN THỰC (LIVE EQ CURVE):</span>
                </span>
                <span id="active-eq-label" class="text-cyan-400 font-bold uppercase">STUDIO FLAT</span>
              </div>
              <div class="grid grid-cols-4 gap-2">
                <button class="eq-preset-btn p-2 rounded-xl text-xs font-mono border border-cyan-400 bg-cyan-400/10 text-cyan-300 text-center hover:bg-cyan-400/20 transition-all font-semibold" data-preset="flat">Studio Flat</button>
                <button class="eq-preset-btn p-2 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-slate-300 text-center hover:border-cyan-400/40 transition-all font-semibold" data-preset="bass">Deep Bass</button>
                <button class="eq-preset-btn p-2 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-slate-300 text-center hover:border-cyan-400/40 transition-all font-semibold" data-preset="vocal">Vocal Warmth</button>
                <button class="eq-preset-btn p-2 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-slate-300 text-center hover:border-cyan-400/40 transition-all font-semibold" data-preset="spatial">Spatial 8D</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: ENGINEERED TO PERFORM (SPECS COMPARISON TABLE) -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Direct Benchmarking ]</span>
          <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
            ENGINEERED TO <span class="text-cyan-400">PERFORM</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-400 mt-2">Bảng so sánh trực diện cấu hình giữa AURA ONE và các đối thủ phân khúc cao cấp.</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b border-white/10">
                <th class="p-4 text-slate-400 font-mono uppercase tracking-wider">Thông Số Kỹ Thuật</th>
                <th class="p-4 text-cyan-300 font-mono uppercase tracking-wider bg-cyan-500/10 border-x border-cyan-500/30 rounded-t-xl">AURA ONE (Flagship)</th>
                <th class="p-4 text-slate-400 font-mono uppercase tracking-wider">Tiêu Chuẩn \$400</th>
                <th class="p-4 text-slate-400 font-mono uppercase tracking-wider">Đối Thủ \$550</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 font-mono">
              <tr>
                <td class="p-4 text-white font-semibold">Cấu Trúc Màng Loa</td>
                <td class="p-4 text-cyan-300 font-bold bg-cyan-500/5 border-x border-cyan-500/20">Pure Beryllium 40mm Nano Carbon</td>
                <td class="p-4 text-slate-400">Dynamic Neodymium 40mm</td>
                <td class="p-4 text-slate-300">Bio-Cellulose 40mm</td>
              </tr>
              <tr>
                <td class="p-4 text-white font-semibold">Dải Tần Đáp Ứng</td>
                <td class="p-4 text-cyan-300 font-bold bg-cyan-500/5 border-x border-cyan-500/20">5Hz – 48,000Hz (Hi-Res Master)</td>
                <td class="p-4 text-slate-400">20Hz – 20,000Hz</td>
                <td class="p-4 text-slate-300">10Hz – 40,000Hz</td>
              </tr>
              <tr>
                <td class="p-4 text-white font-semibold">Khử Ồn Chủ Động (ANC)</td>
                <td class="p-4 text-cyan-300 font-bold bg-cyan-500/5 border-x border-cyan-500/20">-48dB Neural AI Dual-Chip</td>
                <td class="p-4 text-slate-400">-38dB Hybrid</td>
                <td class="p-4 text-slate-300">-42dB Dual-Chip</td>
              </tr>
              <tr>
                <td class="p-4 text-white font-semibold">Thời Lượng Pin</td>
                <td class="p-4 text-cyan-300 font-bold bg-cyan-500/5 border-x border-cyan-500/20">60 Giờ (Sạc PD 10p = 8h)</td>
                <td class="p-4 text-slate-400">30 Giờ</td>
                <td class="p-4 text-slate-300">40 Giờ</td>
              </tr>
              <tr>
                <td class="p-4 text-white font-semibold">Trọng Lượng & Vật Liệu</td>
                <td class="p-4 text-cyan-300 font-bold bg-cyan-500/5 border-x border-cyan-500/20">238g Hợp kim Magie hàng không</td>
                <td class="p-4 text-slate-400">254g Nhựa composite</td>
                <td class="p-4 text-slate-300">385g Nhôm & nhựa</td>
              </tr>
              <tr>
                <td class="p-4 text-white font-semibold">Tùy Biến Trực Tiếp 3D</td>
                <td class="p-4 text-cyan-300 font-bold bg-cyan-500/5 border-x border-cyan-500/20">Khắc Laser 3D & 8 Bản Phối Màu</td>
                <td class="p-4 text-slate-400">Không hỗ trợ</td>
                <td class="p-4 text-slate-300">2 màu cố định</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 4: STYLE YOUR SOUND (LIFESTYLE SHOWCASE - REFERENCE CONCEPT) -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Style Your Sound ]</span>
            <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2">
              CINEMATIC <span class="text-hero-gradient">LIFESTYLE</span>
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-mono">
            Hòa quyện giữa thẩm mỹ thời trang cao cấp và công nghệ ánh sáng viền RGB neon độc bản.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="group rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 bg-[#0d0e14] flex flex-col">
            <div class="relative aspect-[3/4] overflow-hidden bg-black/60">
              <img src="assets/media/lifestyle-audira-luxury.png" alt="Minimalist Studio Elegance" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyan-300">
                STUDIO SESSIONS
              </div>
            </div>
            <div class="p-6">
              <h3 class="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">Minimalist Studio Elegance</h3>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed">Không gian sáng tạo tối giản cùng chất âm mộc chuẩn mastering cho các Producer.</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="group rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-500 bg-[#0d0e14] flex flex-col">
            <div class="relative aspect-[3/4] overflow-hidden bg-black/60">
              <img src="assets/media/lifestyle-aura-experience.png" alt="Deep Flow & Spatial Immersion" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-purple-300">
                DEEP FOCUS
              </div>
            </div>
            <div class="p-6">
              <h3 class="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Deep Flow & Immersion</h3>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed">Tập trung tuyệt đối vào công việc sáng tạo với trường âm không gian 8D bao bọc 360 độ.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="group rounded-3xl overflow-hidden border border-white/10 hover:border-pink-400/50 transition-all duration-500 bg-[#0d0e14] flex flex-col">
            <div class="relative aspect-[3/4] overflow-hidden bg-black/60">
              <img src="assets/media/lifestyle-bose-cinematic.png" alt="Urban Metropolis & Night Cyberpunk" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-pink-300">
                URBAN METROPOLIS
              </div>
            </div>
            <div class="p-6">
              <h3 class="font-heading text-lg font-bold text-white group-hover:text-pink-300 transition-colors">Urban Metropolis & Neon</h3>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed">Ánh sáng LED neon viền nổi bật giữa lòng phố thị đêm với khả năng cách âm -48dB.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4.5: MASTERING STUDIO SESSION & PRODUCER ENDORSEMENT -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left: Content & Quote -->
          <div class="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full badge-dynamic text-xs font-mono">
              <i data-lucide="award" class="w-3.5 h-3.5"></i>
              <span>CHUẨN MỰC PHÒNG THU QUỐC TẾ</span>
            </div>
            <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              LỰA CHỌN CỦA CÁC <br/>
              <span class="text-hero-gradient">SOUND ENGINEER HÀNG ĐẦU</span>
            </h2>
            <blockquote class="p-6 rounded-2xl bg-white/[0.03] border-l-4 border-cyan-400 text-slate-200 text-sm sm:text-base italic leading-relaxed">
              "AURA ONE mang lại độ phân giải tương đương dàn loa kiểm âm tham chiếu phòng thu trăm nghìn đô. Từng rung động của giọng hát, dải decay của nhạc cụ acoustic và không gian âm hình 8D được tái hiện chính xác đến kinh ngạc."
            </blockquote>
            <div class="flex items-center space-x-4">
              <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5">
                <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs">MV</div>
              </div>
              <div>
                <div class="text-sm font-bold text-white">Marcus Vance</div>
                <div class="text-xs text-slate-400 font-mono">Grammy-Winning Audio Engineer & Mastering Producer (London / LA)</div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div>
                <div class="font-heading text-2xl font-black text-white">150+</div>
                <div class="text-[10px] font-mono text-slate-400 uppercase mt-1">Phòng Thu Tin Dùng</div>
              </div>
              <div>
                <div class="font-heading text-2xl font-black text-cyan-400">&lt; 8ms</div>
                <div class="text-[10px] font-mono text-slate-400 uppercase mt-1">Độ Trễ 8D Binaural</div>
              </div>
              <div>
                <div class="font-heading text-2xl font-black text-emerald-400">100%</div>
                <div class="text-[10px] font-mono text-slate-400 uppercase mt-1">Độ Tuyến Tính Pha</div>
              </div>
            </div>
          </div>

          <!-- Right: Editorial Image -->
          <div class="lg:col-span-6 relative group order-1 lg:order-2">
            <div class="absolute -inset-2 bg-gradient-to-l from-purple-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
              <img src="assets/media/producer-studio-session.png" alt="Sound Producer tại phòng thu với AURA ONE" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div class="text-xs text-slate-200">
                  <span class="text-cyan-400 font-bold font-mono">DOLBY ATMOS & HI-RES</span>
                  <div class="text-[10px] text-slate-400">Kiểm âm mastering thời gian thực</div>
                </div>
                <span class="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-[10px] font-mono text-emerald-300">Certified Reference</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: THE CURATED 3D ART & SPATIAL COLLECTION -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Curated Exhibition // 2026 ]</span>
            <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2">
              DIGITAL ART & <span class="text-hero-gradient">CGI MASTERPIECES</span>
            </h2>
          </div>
          <p class="text-xs text-slate-400 max-w-md mt-4 md:mt-0 font-mono">
            Mỗi tác phẩm là sự kết hợp giữa thuật toán tạo hình số, khúc xạ ánh sáng và điêu khắc cơ khí âm học. Bấm vào tác phẩm để mở chế độ thưởng lãm chi tiết.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${window.AURA_DATA.curatedArtPieces.map(piece => `
            <div class="art-piece-card crosshair-corner flex flex-col group border border-white/10 hover:border-cyan-400/50 transition-all duration-300 rounded-3xl overflow-hidden bg-[#0d0e14]/90 backdrop-blur-xl shadow-2xl" data-art-id="${piece.id}">
              <div class="relative overflow-hidden aspect-[4/3] bg-black/60 cursor-pointer homepage-thumb-click">
                <img src="${piece.src}" alt="${piece.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyan-300">
                  ${piece.tag}
                </span>
                <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-slate-300 flex items-center space-x-1.5 opacity-80 group-hover:opacity-100 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-all">
                  <i data-lucide="maximize-2" class="w-3 h-3"></i>
                  <span>PHÓNG TO</span>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between border-t border-white/5">
                <div>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">${piece.title}</h3>
                  <div class="text-[11px] font-mono text-cyan-400 mb-2.5 font-medium">${piece.subtitle}</div>
                  <p class="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">${piece.desc}</p>
                </div>
                <div>
                  <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 mb-4">
                    <span>${piece.year} • ${piece.dimensions}</span>
                    <span class="text-slate-400">${piece.artist}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <button class="homepage-apply-btn px-3 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-400/20" data-art-id="${piece.id}">
                      <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                      <span>Áp Dụng 3D</span>
                    </button>
                    <button class="homepage-zoom-btn px-3 py-2.5 rounded-xl glass-button text-slate-200 hover:text-white font-medium text-[11px] flex items-center justify-center space-x-1.5 transition-all border border-white/10" data-art-id="${piece.id}">
                      <i data-lucide="eye" class="w-3.5 h-3.5 text-cyan-400"></i>
                      <span>Chi Tiết CGI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 5.5: UNBOXING & LUXURY ACCESSORIES ECOSYSTEM -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full badge-dynamic text-xs font-mono mb-4">
            <i data-lucide="package" class="w-3.5 h-3.5"></i>
            <span>ĐẲNG CẤP HOÀN THIỆN XA XỈ</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            TRẢI NGHIỆM MỞ HỘP <br/>
            <span class="text-hero-gradient">HOÀNG GIA TRỌN VẸN</span>
          </h2>
          <p class="text-sm text-slate-300">
            Mỗi phụ kiện đi kèm AURA ONE đều được bảo vệ trong hộp Smart Case nam châm, hoàn thiện tinh xảo từng giác cắt CNC.
          </p>
        </div>

        <!-- Large Unboxing Image & Interactive Accessories Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div class="lg:col-span-7 relative group">
            <div class="relative rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
              <img src="assets/media/unboxing-luxury-case.png" alt="Trải nghiệm mở hộp AURA ONE" class="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700" />
            </div>
          </div>

          <!-- 5 Accessories Grid -->
          <div class="lg:col-span-5 grid grid-cols-1 gap-3">
            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/40 transition-all flex items-start space-x-3.5">
              <div class="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400 mt-0.5"><i data-lucide="archive" class="w-4 h-4"></i></div>
              <div>
                <div class="text-xs font-bold text-white">Smart Magnetic Case</div>
                <div class="text-[11px] text-slate-400">Khóa nam châm Neodymium, tự chuyển tai nghe sang chế độ siêu tiết kiệm điện.</div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/40 transition-all flex items-start space-x-3.5">
              <div class="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400 mt-0.5"><i data-lucide="cable" class="w-4 h-4"></i></div>
              <div>
                <div class="text-xs font-bold text-white">Cáp 3.5mm OFC Mạ Vàng</div>
                <div class="text-[11px] text-slate-400">Đồng nguyên chất 99.999% bọc dù chống rối, bảo toàn tín hiệu Analog thuần khiết.</div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/40 transition-all flex items-start space-x-3.5">
              <div class="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400 mt-0.5"><i data-lucide="zap" class="w-4 h-4"></i></div>
              <div>
                <div class="text-xs font-bold text-white">Cáp USB-C DAC Lossless</div>
                <div class="text-[11px] text-slate-400">Giải mã âm thanh số 32-bit/384kHz trực tiếp từ Mac, PC và iPhone 15/16.</div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/40 transition-all flex items-start space-x-3.5">
              <div class="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400 mt-0.5"><i data-lucide="plane" class="w-4 h-4"></i></div>
              <div>
                <div class="text-xs font-bold text-white">Adapter Máy Bay Nhôm CNC</div>
                <div class="text-[11px] text-slate-400">Tương thích hoàn hảo khoang thương gia của mọi hãng hàng không quốc tế.</div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/40 transition-all flex items-start space-x-3.5">
              <div class="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400 mt-0.5"><i data-lucide="shield-check" class="w-4 h-4"></i></div>
              <div>
                <div class="text-xs font-bold text-white">Thẻ Bảo Hành Số NFC VIP</div>
                <div class="text-[11px] text-slate-400">Chạm điện thoại vào thẻ để kích hoạt bảo hành chính hãng 24 tháng toàn cầu.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: THE HYPE IS REAL (REVIEWS) -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center max-w-xl mx-auto mb-12">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Community & Press ]</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            THE HYPE IS <span class="text-cyan-400">REAL</span>
          </h2>
          <div class="flex items-center justify-center space-x-2 mt-3">
            <div class="flex text-amber-400">★★★★★</div>
            <span class="text-xs font-mono text-slate-300">4.9/5 từ hơn 12.000+ audiophiles toàn cầu</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-panel p-6 rounded-2xl border border-white/10">
            <div class="text-amber-400 text-xs mb-3">★★★★★</div>
            <p class="text-xs text-slate-200 italic mb-4 leading-relaxed">
              "Khả năng bóc tách nhạc cụ và độ sâu sân khấu của AURA ONE thật sự vượt trội so với các tai nghe \$800 tôi từng nghe."
            </p>
            <div class="text-xs font-semibold text-white">Trần Quốc Bảo</div>
            <div class="text-[10px] text-slate-400">Audio Mastering Engineer</div>
          </div>
          <div class="glass-panel p-6 rounded-2xl border border-white/10">
            <div class="text-amber-400 text-xs mb-3">★★★★★</div>
            <p class="text-xs text-slate-200 italic mb-4 leading-relaxed">
              "Thiết kế 238g đeo làm việc suốt 8 tiếng không hề bị mỏi cổ hay nóng tai. Khử ồn Neural ANC lọc sạch tiếng ồn quán café."
            </p>
            <div class="text-xs font-semibold text-white">Elena Vance</div>
            <div class="text-[10px] text-slate-400">Creative Director, NYC</div>
          </div>
          <div class="glass-panel p-6 rounded-2xl border border-white/10">
            <div class="text-amber-400 text-xs mb-3">★★★★★</div>
            <p class="text-xs text-slate-200 italic mb-4 leading-relaxed">
              "Chế tác kim loại phay xước đồng tâm và quai vòm kép cầm trên tay cực kỳ đầm chắc, xứng tầm món trang sức công nghệ cao cấp."
            </p>
            <div class="text-xs font-semibold text-white">Alexander Kim</div>
            <div class="text-[10px] text-slate-400">Tech Reviewer, Seoul</div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: READY TO LISTEN? (LUXURY CONVERSION BANNER) -->
      <section class="max-w-7xl mx-auto px-6 pb-24">
        <div class="glass-panel p-10 sm:p-14 rounded-3xl border border-cyan-400/30 text-center relative overflow-hidden bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent">
          <div class="max-w-2xl mx-auto relative z-10">
            <span class="text-xs font-mono text-cyan-300 uppercase tracking-widest">[ Sound Redefined Experience ]</span>
            <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
              READY TO <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200 bg-clip-text text-transparent glow-text-cyan">LISTEN?</span>
            </h2>
            <p class="text-sm text-slate-300 mb-8 max-w-lg mx-auto">
              Gia nhập cuộc cách mạng âm học không gian cùng AURA ONE. Hưởng trọn đặc quyền khắc tên laser độc bản và 30 ngày trải nghiệm miễn phí.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <a href="#/checkout" class="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold text-sm tracking-wider uppercase transition-all shadow-xl shadow-cyan-400/25">
                Khám Phá Cửa Hàng & Mua Sắm
              </a>
              <a href="#/gallery" class="glass-button px-8 py-4 rounded-full text-white font-semibold text-sm hover:bg-white/10 transition-all">
                Khám phá bộ sưu tập số
              </a>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-6 mt-8 text-[11px] font-mono text-slate-400">
              <span>✦ Miễn phí giao hàng hỏa tốc toàn cầu</span>
              <span>✦ Dùng thử 30 ngày hoàn tiền 100%</span>
              <span>✦ Bảo hành 24 tháng 1 đổi 1 chính hãng</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- BỘ SƯU TẬP SẢN PHẨM HI-END CHÍNH HÃNG AURA -->
      <!-- ========================================== -->
      <section id="aura-product-catalog" class="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 relative z-20">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
            <span>AURA BOUTIQUE & SHOWCASE STORE</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SẢN PHẨM <span class="text-hero-gradient">TRƯNG BÀY & MỞ BÁN</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
            Tuyển tập các siêu phẩm âm thanh không gian 3D, phiên bản giới hạn chế tác thủ công mạ vàng 24K và hệ sinh thái phụ kiện audiophile cao cấp.
          </p>

          <!-- Category Filter Tabs -->
          <div class="flex items-center justify-center flex-wrap gap-2 mt-8 text-xs font-mono">
            <button class="prod-filter-btn px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20 transition-all" data-filter="all">TẤT CẢ SẢN PHẨM</button>
            <button class="prod-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all" data-filter="over-ear">TAI NGHE OVER-EAR 3D</button>
            <button class="prod-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all" data-filter="limited">BẢN GIỚI HẠN 24K</button>
            <button class="prod-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all" data-filter="accessory">PHỤ KIỆN HI-FI & DAC</button>
            <button class="prod-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all flex items-center gap-1.5" data-filter="wishlist">
              <i data-lucide="heart" class="w-3.5 h-3.5 text-rose-400"></i>
              <span>ĐÃ LƯU TÂM</span>
            </button>
          </div>
        </div>

        <!-- Product Cards Grid -->
        
          <!-- Trust & Security Guarantee Ribbon -->
          <div class="mt-4 mb-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-black/80 to-purple-950/40 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
            <div class="p-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400 mx-auto mb-1"></i>
              <div class="font-bold text-white text-[11px]">BẢO HÀNH 3 NĂM VIP</div>
              <div class="text-[9px] text-slate-400">1 đổi 1 tận nơi 24h</div>
            </div>
            <div class="p-2">
              <i data-lucide="lock" class="w-4 h-4 text-cyan-400 mx-auto mb-1"></i>
              <div class="font-bold text-white text-[11px]">BẢO MẬT SSL 256-BIT</div>
              <div class="text-[9px] text-slate-400">Mã hóa Zero-Knowledge</div>
            </div>
            <div class="p-2">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-400 mx-auto mb-1"></i>
              <div class="font-bold text-white text-[11px]">KHẮC TÊN LASER 3D</div>
              <div class="text-[9px] text-slate-400">Độc bản theo yêu cầu</div>
            </div>
            <div class="p-2">
              <i data-lucide="truck" class="w-4 h-4 text-purple-400 mx-auto mb-1"></i>
              <div class="font-bold text-white text-[11px]">HỎA TỐC 2 GIỜ</div>
              <div class="text-[9px] text-slate-400">Đồng kiểm khi nhận</div>
            </div>
          </div>

          <!-- Product Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="products-grid-container">
          ${(window.AURA_DATA.products || []).map(p => `
            <div class="prod-card glass-panel rounded-3xl border border-white/10 hover:border-cyan-400/40 p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10" data-cat="${p.category}">
              <!-- Thumbnail Container -->
              <div>
                <div class="relative h-56 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-center p-4 mb-4 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="${p.image}" alt="${p.name}" class="max-h-44 object-contain filter drop-shadow-[0_8px_16px_rgba(0,242,254,0.25)] group-hover:scale-108 transition-transform duration-500" />
                  
                  <!-- Badge -->
                  <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold border ${p.badgeColor}">
                    ${p.badge}
                  </span>
                  
                  <!-- Wishlist Heart Button -->
                  <button class="prod-wishlist-toggle-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-all z-10" data-id="${p.id}" title="Thêm vào yêu thích">
                    <i data-lucide="heart" class="w-4 h-4 ${window.AURA_WISHLIST && window.AURA_WISHLIST.isWishlisted(p.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
                  </button>
                  
                  <div class="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-300 bg-black/80 px-2 py-0.5 rounded-lg border border-white/10">
                    ${p.tag}
                  </div>
                </div>

                <!-- Product Info -->
                <div class="space-y-1.5">
                  <div class="text-[10px] font-mono text-amber-400 flex items-center space-x-1">
                    <span>★ ★ ★ ★ ★</span>
                    <span class="text-slate-400 text-[9px]">${p.rating}</span>
                  </div>
                  <h3 class="font-heading text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">${p.name}</h3>
                  <p class="text-[11px] text-slate-400 leading-relaxed line-clamp-2">${p.desc}</p>
                  <!-- Quick-View Trigger -->
                  <button class="quick-view-trigger-btn w-full mt-2 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-cyan-300 text-[11px] font-mono flex items-center justify-center space-x-1.5 transition-all border border-white/5" data-id="${p.id}">
                    <i data-lucide="eye" class="w-3.5 h-3.5 text-cyan-400"></i>
                    <span>XEM CHI TIẾT & TÙY BIẾN</span>
                  </button>
                </div>
              </div>

              <!-- Price & Action Buttons -->
              <div class="pt-4 mt-4 border-t border-white/10 space-y-2.5">
                <div class="flex items-baseline justify-between font-mono">
                  <div>
                    <span class="text-base font-black text-white">${p.priceUSD} USD</span>
                    <span class="text-[10px] text-slate-400 block">~ ${p.priceVND.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <span class="text-[10px] text-emerald-400 font-bold">FREESHIP VIP</span>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <button class="add-to-cart-quick-btn py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1" data-id="${p.id}" data-name="${p.name}" data-price="${p.priceUSD}" data-image="${p.image}">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    <span>+ GIỎ HÀNG</span>
                  </button>
                  <a href="#/checkout" class="buy-now-quick-btn py-2 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1 shadow-md shadow-cyan-400/20" data-id="${p.id}" data-name="${p.name}" data-price="${p.priceUSD}" data-image="${p.image}">
                    <span>MUA NGAY</span>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

    `;

    // Hook Theme Switcher Buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        document.querySelectorAll('.theme-btn').forEach(b => {
          b.classList.remove('border-amber-400', 'bg-amber-500/10');
          b.classList.add('border-white/10', 'bg-white/5');
        });
        btn.classList.add('border-amber-400', 'bg-amber-500/10');
        btn.classList.remove('border-white/10', 'bg-white/5');
        applyColorTheme(btn.getAttribute('data-theme'));
      });
    });

    // Hook Art Piece Cards (Dual Buttons) on Homepage
    document.querySelectorAll('.homepage-apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const artId = btn.getAttribute('data-art-id');
        if (artId) applyArtStyleTo3D(artId);
      });
    });

    document.querySelectorAll('.homepage-thumb-click, .homepage-zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.art-piece-card');
        const artId = card?.getAttribute('data-art-id') || btn.getAttribute('data-art-id');
        if (artId) openArtLightbox(artId);
      });
    });


  // Products Catalog Filter & Quick Cart Listeners
  document.querySelectorAll('.prod-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.prod-filter-btn').forEach(b => {
        b.className = 'prod-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all';
      });
      btn.className = 'prod-filter-btn px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20 transition-all';

      let visibleCount = 0;
      document.querySelectorAll('.prod-card').forEach(card => {
        const cat = card.getAttribute('data-cat');
        const wishBtn = card.querySelector('.prod-wishlist-toggle-btn');
        const cardId = wishBtn ? wishBtn.getAttribute('data-id') : null;
        let show = false;

        if (filter === 'all') {
          show = true;
        } else if (filter === 'wishlist') {
          show = cardId && window.AURA_WISHLIST && window.AURA_WISHLIST.isWishlisted(cardId);
        } else if (cat === filter) {
          show = true;
        }

        if (show) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show empty state if wishlist is empty
      let emptyMsg = document.getElementById('catalog-empty-wishlist-msg');
      if (filter === 'wishlist' && visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement('div');
          emptyMsg.id = 'catalog-empty-wishlist-msg';
          emptyMsg.className = 'col-span-full text-center py-12 glass-panel rounded-3xl border border-white/10 p-6 space-y-3';
          emptyMsg.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-2">
              <i data-lucide="heart" class="w-6 h-6"></i>
            </div>
            <h4 class="text-white font-bold text-base">Bạn chưa lưu sản phẩm nào vào mục Yêu Thích</h4>
            <p class="text-xs text-slate-400">Hãy bấm vào biểu tượng trái tim ở góc trên các sản phẩm để lưu lại vào danh sách này.</p>
          `;
          document.getElementById('products-grid-container')?.appendChild(emptyMsg);
          if (typeof refreshIcons === 'function') refreshIcons();
        } else {
          emptyMsg.classList.remove('hidden');
        }
      } else if (emptyMsg) {
        emptyMsg.classList.add('hidden');
      }
    });
  });

  document.querySelectorAll('.add-to-cart-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      const pId = btn.getAttribute('data-id');
      const pName = btn.getAttribute('data-name');
      const pPrice = parseFloat(btn.getAttribute('data-price')) || 399;
      const pImage = btn.getAttribute('data-image');
      window.AURA_CART.addItem({ id: pId, name: pName, price: pPrice, image: pImage, quantity: 1 });
      showToast('Đã thêm "' + pName + '" vào giỏ hàng!');
      updateDrawerCartUI();
      drawer?.classList.remove('translate-x-full');
    });
  });

  document.getElementById('open-write-review-btn')?.addEventListener('click', () => {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    if (typeof window.openAddReviewModal === 'function') window.openAddReviewModal('prod-titanium');
  });

  document.querySelectorAll('.buy-now-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      const pId = btn.getAttribute('data-id');
      const pName = btn.getAttribute('data-name');
      const pPrice = parseFloat(btn.getAttribute('data-price')) || 399;
      const pImage = btn.getAttribute('data-image');
      window.AURA_CART.addItem({ id: pId, name: pName, price: pPrice, image: pImage, quantity: 1 });
      showToast('Đang chuyển đến trang thanh toán cho ' + pName + '...');
      setTimeout(() => {
        window.location.hash = '#/checkout';
      }, 200);
    });
  });

  }

  // 2. Curated Digital Art & Studio Masterpieces Gallery Page
  function renderGalleryPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]"></span>
            <span>[ 05 / CURATED DIGITAL ART & STUDIO GALLERY ]</span>
          </div>
          <h1 class="font-heading text-4xl sm:text-6xl font-extrabold text-white mb-4">Digital Art & Studio Masterworks</h1>
          <p class="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Không gian lưu trữ 6 kiệt tác CGI điêu khắc số và bản phân rã phòng lab âm học. Mỗi tác phẩm có thể áp dụng trực tiếp thành ngôn ngữ thẩm mỹ 3D tương tác.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${window.AURA_DATA.curatedArtPieces.map(item => `
            <div class="art-piece-card crosshair-corner flex flex-col group border border-white/10 hover:border-cyan-400/50 transition-all duration-300 rounded-3xl overflow-hidden bg-[#0d0e14]/90 backdrop-blur-xl shadow-2xl" data-art-id="${item.id}">
              <!-- Thumbnail Box -->
              <div class="relative overflow-hidden aspect-[4/3] bg-black/60 cursor-pointer gallery-thumb-click">
                <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyan-300">
                  ${item.tag}
                </span>
                <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-slate-300 flex items-center space-x-1.5 opacity-80 group-hover:opacity-100 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-all">
                  <i data-lucide="maximize-2" class="w-3 h-3"></i>
                  <span>PHÓNG TO</span>
                </div>
              </div>

              <!-- Metadata & Actions -->
              <div class="p-6 flex-1 flex flex-col justify-between border-t border-white/5">
                <div>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">${item.title}</h3>
                  <div class="text-[11px] font-mono text-cyan-400 mb-2.5 font-medium">${item.subtitle}</div>
                  <p class="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">${item.desc}</p>
                </div>

                <div>
                  <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 mb-4">
                    <span>${item.year} • ${item.dimensions}</span>
                    <span class="text-slate-400">${item.artist}</span>
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <button class="gallery-apply-btn px-3 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-400/20" data-art-id="${item.id}">
                      <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                      <span>Áp Dụng 3D</span>
                    </button>
                    <button class="gallery-zoom-btn px-3 py-2.5 rounded-xl glass-button text-slate-200 hover:text-white font-medium text-[11px] flex items-center justify-center space-x-1.5 transition-all border border-white/10" data-art-id="${item.id}">
                      <i data-lucide="eye" class="w-3.5 h-3.5 text-cyan-400"></i>
                      <span>Chi Tiết CGI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    document.querySelectorAll('.gallery-thumb-click, .gallery-zoom-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.art-piece-card');
        const artId = card?.getAttribute('data-art-id') || btn.getAttribute('data-art-id');
        if (artId) openArtLightbox(artId);
      });
    });

    document.querySelectorAll('.gallery-apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const artId = btn.getAttribute('data-art-id');
        if (artId) applyArtStyleTo3D(artId);
      });
    });
  }

  // ==========================================
  // ANATOMY 8-LAYER CONTROLLER & X-RAY ENGINE
  // ==========================================
  let anatomyExplosionProgress = 1.0;
  let isXRayMode = false;
  let isAutoOrbitAnatomy = false;

  function setAnatomyExplosion(progress, duration = 0.4) {
    anatomyExplosionProgress = Math.max(0, Math.min(1, progress));

    // Left Side (Negative X direction)
    const leftTargets = {
      cap: -0.14 + (-1.9 - (-0.14)) * anatomyExplosionProgress,
      vent: -0.10 + (-1.45 - (-0.10)) * anatomyExplosionProgress,
      gasket: -0.07 + (-1.1 - (-0.07)) * anatomyExplosionProgress,
      chamber: -0.03 + (-0.7 - (-0.03)) * anatomyExplosionProgress,
      pcb: 0.02 + (-0.3 - (0.02)) * anatomyExplosionProgress,
      driver: 0.07 + (0.1 - (0.07)) * anatomyExplosionProgress,
      turbine: 0.12 + (0.5 - (0.12)) * anatomyExplosionProgress,
      cushion: 0.22 + (1.0 - (0.22)) * anatomyExplosionProgress
    };

    // Right Side (Positive X direction)
    const rightTargets = {
      cap: 0.14 + (1.9 - 0.14) * anatomyExplosionProgress,
      vent: 0.10 + (1.45 - 0.10) * anatomyExplosionProgress,
      gasket: 0.07 + (1.1 - 0.07) * anatomyExplosionProgress,
      chamber: 0.03 + (0.7 - 0.03) * anatomyExplosionProgress,
      pcb: -0.02 + (0.3 - (-0.02)) * anatomyExplosionProgress,
      driver: -0.07 + (-0.1 - (-0.07)) * anatomyExplosionProgress,
      turbine: -0.12 + (-0.5 - (-0.12)) * anatomyExplosionProgress,
      cushion: -0.22 + (-1.0 - (-0.22)) * anatomyExplosionProgress
    };

    gsap.to(leftEarcup.capGroup.position, { x: leftTargets.cap, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.vent.position, { x: leftTargets.vent, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.gasket.position, { x: leftTargets.gasket, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.chamberGroup.position, { x: leftTargets.chamber, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.pcbGroup.position, { x: leftTargets.pcb, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.driverGroup.position, { x: leftTargets.driver, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.turbineGroup.position, { x: leftTargets.turbine, duration: duration, ease: 'power2.out' });
    gsap.to(leftEarcup.cushion.position, { x: leftTargets.cushion, duration: duration, ease: 'power2.out' });

    gsap.to(rightEarcup.capGroup.position, { x: rightTargets.cap, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.vent.position, { x: rightTargets.vent, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.gasket.position, { x: rightTargets.gasket, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.chamberGroup.position, { x: rightTargets.chamber, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.pcbGroup.position, { x: rightTargets.pcb, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.driverGroup.position, { x: rightTargets.driver, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.turbineGroup.position, { x: rightTargets.turbine, duration: duration, ease: 'power2.out' });
    gsap.to(rightEarcup.cushion.position, { x: rightTargets.cushion, duration: duration, ease: 'power2.out' });

    const slider = document.getElementById('anatomy-explosion-slider');
    if (slider) slider.value = Math.round(anatomyExplosionProgress * 100);
    const percentEl = document.getElementById('anatomy-explosion-percent');
    if (percentEl) percentEl.textContent = `${Math.round(anatomyExplosionProgress * 100)}%`;
  }

  function toggleXRayMode() {
    isXRayMode = !isXRayMode;
    const btn = document.getElementById('anatomy-xray-btn');
    if (isXRayMode) {
      shellMaterial.wireframe = true;
      shellMaterial.transparent = true;
      shellMaterial.opacity = 0.35;
      metalAccentMaterial.wireframe = true;
      metalAccentMaterial.transparent = true;
      metalAccentMaterial.opacity = 0.45;
      if (btn) {
        btn.classList.add('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        btn.classList.remove('border-white/10', 'bg-white/5', 'text-slate-300');
      }
      showToast('🔬 Đã bật chế độ nhìn xuyên thấu X-Ray 3D!');
    } else {
      shellMaterial.wireframe = false;
      shellMaterial.transparent = false;
      shellMaterial.opacity = 1.0;
      metalAccentMaterial.wireframe = false;
      metalAccentMaterial.transparent = false;
      metalAccentMaterial.opacity = 1.0;
      if (btn) {
        btn.classList.remove('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        btn.classList.add('border-white/10', 'bg-white/5', 'text-slate-300');
      }
    }
  }

  // 3. Anatomy Page (8-Layer Teardown & Reference Showcase - Image 1 Style)
  function renderAnatomyPage() {
    const firstLayer = window.AURA_DATA.anatomyLayers[0] || {};
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-6 min-h-[88vh] flex flex-col justify-between">
        <!-- Top HUD: Title & 3D Action Tools -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>[ 02 / ACOUSTIC CAD TEARDOWN ]</span>
            </div>
            <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white">Cấu Tạo Cơ Khí Buồng Âm 8 Tầng</h1>
            <p class="text-xs text-slate-300 max-w-xl">
              Khảo sát độ phân giải cơ khí từng mm màng loa Beryllium và buồng âm đồng trục chuẩn phòng thu Mark Levinson No 5909.
            </p>
          </div>

          <!-- 3D Viewport Action Tools Pill -->
          <div class="flex items-center space-x-2 glass-panel px-3 py-2 rounded-full border border-white/10 self-start lg:self-center">
            <button id="anatomy-xray-btn" class="interactive glass-button px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs text-slate-300 hover:text-cyan-300 transition-all border border-white/10">
              <i data-lucide="eye" class="w-3.5 h-3.5 text-cyan-400"></i>
              <span class="font-mono text-[11px]">X-RAY 3D</span>
            </button>
            <button id="anatomy-orbit-btn" class="interactive glass-button px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs text-slate-300 hover:text-cyan-300 transition-all border border-white/10">
              <i data-lucide="orbit" class="w-3.5 h-3.5 text-cyan-400"></i>
              <span class="font-mono text-[11px]">XOAY 360°</span>
            </button>
            <button id="anatomy-reset-cam-btn" class="interactive glass-button px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white transition-all border border-white/10">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
              <span class="font-mono text-[11px]">RESET</span>
            </button>
          </div>
        </div>

        <!-- Continuous Explosion Scrubber Dock -->
        <div class="glass-panel px-5 py-2.5 rounded-full border border-cyan-500/30 max-w-xl w-full mx-auto my-2 shadow-2xl flex items-center justify-between gap-4">
          <button id="assemble-btn" class="text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors uppercase whitespace-nowrap">
            Lắp ráp (0%)
          </button>
          <div class="flex-1 flex items-center space-x-3">
            <input type="range" id="anatomy-explosion-slider" min="0" max="100" value="100" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg" />
            <span id="anatomy-explosion-percent" class="font-mono text-cyan-400 font-bold text-xs w-10 text-right">100%</span>
          </div>
          <button id="explode-btn" class="text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors uppercase whitespace-nowrap">
            Bóc tách (100%)
          </button>
        </div>

        <!-- Bottom Non-Obstructive 8-Layer Dock -->
        <div class="mt-auto pt-6 max-w-5xl mx-auto w-full">
          <!-- 8-Layer Buttons -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 mb-3">
            ${window.AURA_DATA.anatomyLayers.map((layer, idx) => `
              <button class="anatomy-layer-btn p-2 rounded-xl border ${idx === 0 ? 'border-cyan-400 bg-cyan-500/20' : 'border-white/5 bg-white/5'} hover:border-cyan-400/50 hover:bg-cyan-500/10 text-left transition-all" data-index="${idx}" data-id="${layer.id}">
                <div class="text-[9px] font-mono text-cyan-400 font-semibold mb-0.5">${layer.tag}</div>
                <div class="text-[11px] font-medium text-white line-clamp-1">${layer.name.split(' ')[0]} ${layer.name.split(' ')[1] || ''}</div>
              </button>
            `).join('')}
          </div>

          <!-- Dynamic Layer Detailed Engineering Card -->
          <div id="anatomy-layer-detail" class="glass-panel p-5 rounded-2xl border border-cyan-400/40 w-full shadow-2xl backdrop-blur-2xl">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div class="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span id="layer-detail-tag">${firstLayer.tag || '01 / CHASSIS'}</span>
              </div>
              <span id="layer-detail-material" class="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
                ${firstLayer.material || ''}
              </span>
            </div>
            <h3 id="layer-detail-title" class="font-heading text-xl sm:text-2xl font-bold text-white mb-1">${firstLayer.name || ''}</h3>
            <p id="layer-detail-desc" class="text-xs text-slate-300 leading-relaxed mb-3">${firstLayer.sub || ''}</p>
            <div class="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div class="text-slate-300 flex items-start space-x-1.5">
                <span class="text-cyan-400 font-bold">▸ THÔNG SỐ:</span>
                <span id="layer-detail-specs" class="text-slate-400">${firstLayer.specs || ''}</span>
              </div>
              <div class="text-slate-300 flex items-start space-x-1.5">
                <span class="text-purple-400 font-bold">▸ VAI TRÒ ÂM HỌC:</span>
                <span id="layer-detail-role" class="text-slate-400">${firstLayer.acousticRole || ''}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Reference Studio Teardown Comparison Showcase (Image 1 Style) -->
        <div class="mt-28 pt-12 border-t border-white/10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-5">
              <span class="text-xs font-mono text-amber-400 uppercase tracking-widest">[ Laboratory CAD Teardown ]</span>
              <h2 class="font-heading text-3xl font-bold text-white mt-2 mb-4">Chuẩn Âm Học Tham Chiếu</h2>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Sơ đồ bóc tách thực tế trong phòng thí nghiệm âm học cho thấy từng bộ phận từ màng loa Beryllium, nan hoa turbine đồng thau cho đến đệm tai vát góc đều được định hình để kiểm soát luồng sóng âm chính xác đến từng micro-giây.
              </p>
              <div class="space-y-3">
                <div class="flex items-center space-x-3 text-xs text-slate-300">
                  <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
                  <span>Triệt tiêu méo pha ở tần số trên 20kHz bằng vách ngăn âm học đa hướng.</span>
                </div>
                <div class="flex items-center space-x-3 text-xs text-slate-300">
                  <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
                  <span>Nan hoa turbine hướng luồng khí áp suất cao thoát đều ra vành chrome.</span>
                </div>
                <div class="flex items-center space-x-3 text-xs text-slate-300">
                  <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
                  <span>Đệm mút đàn hồi chậm giữ kín áp suất buồng kín mà không gây mỏi vành tai.</span>
                </div>
              </div>
            </div>

            <div class="lg:col-span-7">
              <div class="glass-panel p-4 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <img src="assets/media/anatomy-exploded-reference.png" alt="Mark Levinson Teardown Reference" class="w-full h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500" />
                <div class="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>CAD EXPLODED PERSPECTIVE • NO. 5909 STANDARD</span>
                  <span class="text-amber-400 font-semibold">LAB CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Hook Explosion Slider
    const expSlider = document.getElementById('anatomy-explosion-slider');
    expSlider?.addEventListener('input', (e) => {
      const p = parseFloat(e.target.value) / 100;
      setAnatomyExplosion(p, 0.1);
    });

    document.getElementById('assemble-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      setAnatomyExplosion(0, 0.8);
    });

    document.getElementById('explode-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      setAnatomyExplosion(1.0, 0.8);
    });

    // Hook 3D Viewport Action Tools
    document.getElementById('anatomy-xray-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      toggleXRayMode();
    });

    document.getElementById('anatomy-orbit-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      isAutoOrbitAnatomy = !isAutoOrbitAnatomy;
      const btn = document.getElementById('anatomy-orbit-btn');
      if (btn) {
        if (isAutoOrbitAnatomy) {
          btn.classList.add('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
          btn.classList.remove('border-white/10', 'bg-white/5', 'text-slate-300');
        } else {
          btn.classList.remove('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
          btn.classList.add('border-white/10', 'bg-white/5', 'text-slate-300');
        }
      }
    });

    document.getElementById('anatomy-reset-cam-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      gsap.to(camera.position, { x: 0, y: 0, z: 4.1, duration: 0.8 });
      gsap.to(headphoneRoot.position, { x: 0, y: 0.05, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { y: Math.PI * 0.38, x: 0.14, duration: 0.8 });
    });

    // Hook Layer Button Interactions
    document.querySelectorAll('.anatomy-layer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        const idx = parseInt(btn.getAttribute('data-index'));
        const layer = window.AURA_DATA.anatomyLayers[idx];
        if (!layer) return;

        document.querySelectorAll('.anatomy-layer-btn').forEach(b => {
          b.classList.remove('border-cyan-400', 'bg-cyan-500/20');
          b.classList.add('border-white/5', 'bg-white/5');
        });
        btn.classList.add('border-cyan-400', 'bg-cyan-500/20');
        btn.classList.remove('border-white/5', 'bg-white/5');

        const tagEl = document.getElementById('layer-detail-tag');
        const titleEl = document.getElementById('layer-detail-title');
        const descEl = document.getElementById('layer-detail-desc');
        const matEl = document.getElementById('layer-detail-material');
        const specsEl = document.getElementById('layer-detail-specs');
        const roleEl = document.getElementById('layer-detail-role');

        if (tagEl) tagEl.textContent = layer.tag;
        if (titleEl) titleEl.textContent = layer.name;
        if (descEl) descEl.textContent = layer.sub;
        if (matEl) matEl.textContent = layer.material || '';
        if (specsEl) specsEl.textContent = layer.specs || '';
        if (roleEl) roleEl.textContent = layer.acousticRole || '';

        // Camera focus on layer
        if (idx === 0) gsap.to(camera.position, { x: -0.4, y: 0.1, z: 3.6, duration: 0.6 });
        else if (idx === 4) gsap.to(camera.position, { x: 0, y: 0, z: 3.2, duration: 0.6 });
        else if (idx === 5) gsap.to(camera.position, { x: 0.2, y: 0, z: 3.0, duration: 0.6 });
        else if (idx === 7) gsap.to(camera.position, { x: 0.5, y: -0.1, z: 3.5, duration: 0.6 });
        else gsap.to(camera.position, { x: 0, y: 0, z: 3.9, duration: 0.6 });
      });
    });
  }

  // 4. Studio & Live Laser Engraving Page
  function renderStudioPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-start justify-between gap-12">
        <div class="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <div>
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Studio & Personalization ]</span>
            <h1 class="font-heading text-3xl font-bold text-white mt-2 mb-1">Tùy Biến Độc Bản</h1>
            <p class="text-xs text-slate-300">Chọn bảng màu tuyển chọn hoặc tự do phối màu 3D theo phong cách cá nhân của riêng bạn.</p>
          </div>

          <!-- Color System Selector (Curated vs Custom DIY) -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="text-xs font-mono text-slate-300 uppercase font-semibold">1. Bảng Màu Hoàn Thiện (8 Bản Tuyển Chọn)</label>
              <span class="text-[10px] font-mono text-cyan-400">PBR PHYSICAL</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              ${window.AURA_DATA.pricing.colors.map(c => `
                <button class="color-swatch-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/50 flex items-center space-x-2 text-left transition-all" data-id="${c.id}" data-color="${c.hex}" data-name="${c.name}">
                  <span class="w-4 h-4 rounded-full border border-white/30 shrink-0" style="background-color: ${c.hex}"></span>
                  <div class="text-[11px] text-white font-medium truncate">${c.name}</div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Bespoke 3D Studio Mixer (User Custom Design) -->
          <div class="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-white/10">
              <div class="flex items-center space-x-2">
                <i data-lucide="sliders" class="w-4 h-4 text-cyan-400"></i>
                <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">Xưởng Tự Thiết Kế 3D (Bespoke Mixer)</span>
              </div>
              <span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">TỰ DO PHỐI MÀU</span>
            </div>

            <!-- Custom Shell Color -->
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">Vỏ Kim Loại Tai Nghe:</span>
              <div class="flex items-center space-x-2">
                <span id="custom-shell-hex" class="text-[10px] font-mono text-slate-400">#1E2029</span>
                <input type="color" id="custom-shell-color" value="#1e2029" class="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0" title="Chọn màu vỏ tai nghe" />
              </div>
            </div>

            <!-- Custom Cushion Color -->
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">Đệm Da Cừu & Headband:</span>
              <div class="flex items-center space-x-2">
                <span id="custom-cushion-hex" class="text-[10px] font-mono text-slate-400">#121316</span>
                <input type="color" id="custom-cushion-color" value="#121316" class="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0" title="Chọn màu đệm tai da" />
              </div>
            </div>

            <!-- Custom Accent Color -->
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">Viền Kim Cương & Đèn LED:</span>
              <div class="flex items-center space-x-2">
                <span id="custom-accent-hex" class="text-[10px] font-mono text-cyan-400">#00F2FE</span>
                <input type="color" id="custom-accent-color" value="#00f2fe" class="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0" title="Chọn màu viền kim loại và LED" />
              </div>
            </div>

            <!-- Metalness & Roughness Sliders -->
            <div class="space-y-2 pt-2 border-t border-white/5">
              <div>
                <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Độ Bóng Kim Loại (Metalness)</span>
                  <span id="metalness-val" class="text-cyan-400 font-mono">0.92</span>
                </div>
                <input type="range" id="custom-metalness-slider" min="0.1" max="1.0" step="0.05" value="0.92" class="w-full accent-cyan-400 cursor-pointer h-1 bg-white/10 rounded-lg" />
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Độ Nhám Mờ (Roughness)</span>
                  <span id="roughness-val" class="text-cyan-400 font-mono">0.18</span>
                </div>
                <input type="range" id="custom-roughness-slider" min="0.05" max="0.8" step="0.05" value="0.18" class="w-full accent-cyan-400 cursor-pointer h-1 bg-white/10 rounded-lg" />
              </div>
            </div>
          </div>

          <!-- Cushion Material -->
          <div>
            <label class="block text-xs font-mono text-slate-400 uppercase mb-2">2. Vật liệu đệm tai</label>
            <div class="grid grid-cols-2 gap-2.5">
              <button class="cushion-mat-btn p-3 rounded-xl border border-cyan-400 bg-cyan-500/10 text-left text-xs font-semibold text-white" data-cushion="leather">
                Da cừu Signature
              </button>
              <button class="cushion-mat-btn p-3 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 text-left text-xs font-semibold text-slate-300" data-cushion="mesh">
                Vải Aeromesh thoáng khí
              </button>
            </div>
          </div>

          <!-- Laser Engraving -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-mono text-slate-400 uppercase">3. Khắc tên Laser (Tối đa 12 ký tự)</label>
              <span class="text-[10px] font-mono text-cyan-400">Live 3D Render</span>
            </div>
            <input type="text" id="engraving-input-page" maxlength="12" value="${state.engravingText}" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 focus:border-cyan-400 focus:outline-none text-white font-mono text-sm tracking-wider uppercase" />
            <p class="text-[11px] text-slate-400 mt-1">Tên được khắc laser nổi trực tiếp lên kim loại ở phía trên.</p>
          </div>

          <div class="space-y-2">
            <a href="#/checkout" class="w-full py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-cyan-400/25 transition-all">
              <span>Tiến Hành Đặt Hàng Bản Thiết Kế Này</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <button id="save-studio-blueprint-btn" class="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 font-mono text-xs font-bold border border-cyan-400/30 hover:border-cyan-400 transition-all flex items-center justify-center space-x-2">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>LƯU CẤU HÌNH BẢN VẼ 3D (BLUEPRINT)</span>
            </button>
          </div>
        </div>
      </section>
    `;

    document.getElementById('engraving-input-page')?.addEventListener('input', (e) => {
      state.engravingText = e.target.value.trim() || 'AURA ONE';
      updateEngravingTexture(state.engravingText);
    });

    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        const id = btn.getAttribute('data-id');
        applyColorTheme(id);
      });
    });

    // Bespoke Custom Mixer Live Listeners
    const shellColorInput = document.getElementById('custom-shell-color');
    const cushionColorInput = document.getElementById('custom-cushion-color');
    const accentColorInput = document.getElementById('custom-accent-color');
    const metalnessSlider = document.getElementById('custom-metalness-slider');
    const roughnessSlider = document.getElementById('custom-roughness-slider');

    function syncCustomDesign() {
      const sHex = shellColorInput?.value || '#1e2029';
      const cHex = cushionColorInput?.value || '#121316';
      const aHex = accentColorInput?.value || '#00f2fe';
      const mVal = metalnessSlider?.value || 0.92;
      const rVal = roughnessSlider?.value || 0.18;

      const shellHexLabel = document.getElementById('custom-shell-hex');
      const cushionHexLabel = document.getElementById('custom-cushion-hex');
      const accentHexLabel = document.getElementById('custom-accent-hex');
      const mLabel = document.getElementById('metalness-val');
      const rLabel = document.getElementById('roughness-val');

      if (shellHexLabel) shellHexLabel.textContent = sHex.toUpperCase();
      if (cushionHexLabel) cushionHexLabel.textContent = cHex.toUpperCase();
      if (accentHexLabel) accentHexLabel.textContent = aHex.toUpperCase();
      if (mLabel) mLabel.textContent = mVal;
      if (rLabel) rLabel.textContent = rVal;

      applyCustomColor(sHex, cHex, aHex, mVal, rVal);
    }

    shellColorInput?.addEventListener('input', syncCustomDesign);
    cushionColorInput?.addEventListener('input', syncCustomDesign);
    accentColorInput?.addEventListener('input', syncCustomDesign);
    metalnessSlider?.addEventListener('input', syncCustomDesign);
    roughnessSlider?.addEventListener('input', syncCustomDesign);

    refreshIcons();
  }

  // 4. 3D Environment & Lighting Studio Page
  let currentActiveEnvName = 'OBSIDIAN VOID';

  function applyEnvironmentPreset(env) {
    state.currentEnv = env;
    const badge = document.getElementById('env-active-name');
    if (env === 'neon') {
      currentActiveEnvName = 'CYBER LVCIDIA';
      gsap.to(keyLight.color, { r: 0, g: 0.95, b: 1, duration: 0.6 });
      keyLight.intensity = 3.2;
      gsap.to(warmRimLight.color, { r: 1, g: 0, b: 0.5, duration: 0.6 });
      warmRimLight.intensity = 2.4;
      gsap.to(purpleLight.color, { r: 0.66, g: 0.33, b: 0.97, duration: 0.6 });
      purpleLight.intensity = 2.8;
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0x00f2fe);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0xff0088);
      cageGroup.visible = true;
      emberParticles.visible = true;
      const c = document.getElementById('toggle-cage-checkbox');
      if (c) c.checked = true;
      const em = document.getElementById('toggle-embers-checkbox');
      if (em) em.checked = true;
    } else if (env === 'amber') {
      currentActiveEnvName = 'WARM AMBER';
      gsap.to(keyLight.color, { r: 0.96, g: 0.62, b: 0.04, duration: 0.6 });
      keyLight.intensity = 2.8;
      gsap.to(warmRimLight.color, { r: 0.85, g: 0.47, b: 0.02, duration: 0.6 });
      warmRimLight.intensity = 2.2;
      gsap.to(purpleLight.color, { r: 0.47, g: 0.2, b: 0.06, duration: 0.6 });
      purpleLight.intensity = 1.0;
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0xf59e0b);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0xd97706);
      cageGroup.visible = false;
      emberParticles.visible = false;
      const c = document.getElementById('toggle-cage-checkbox');
      if (c) c.checked = false;
    } else if (env === 'arctic') {
      currentActiveEnvName = 'ARCTIC CLEAN';
      gsap.to(keyLight.color, { r: 0.88, g: 0.95, b: 1, duration: 0.6 });
      keyLight.intensity = 3.5;
      gsap.to(warmRimLight.color, { r: 1, g: 1, b: 1, duration: 0.6 });
      warmRimLight.intensity = 2.5;
      gsap.to(purpleLight.color, { r: 0.58, g: 0.77, b: 0.99, duration: 0.6 });
      purpleLight.intensity = 2.0;
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0x38bdf8);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0xffffff);
      cageGroup.visible = false;
      emberParticles.visible = false;
      const c = document.getElementById('toggle-cage-checkbox');
      if (c) c.checked = false;
    } else {
      // Obsidian Void
      currentActiveEnvName = 'OBSIDIAN VOID';
      gsap.to(keyLight.color, { r: 0, g: 0.95, b: 1, duration: 0.6 });
      keyLight.intensity = 3.0;
      gsap.to(warmRimLight.color, { r: 0.96, g: 0.62, b: 0.04, duration: 0.6 });
      warmRimLight.intensity = 2.0;
      gsap.to(purpleLight.color, { r: 0.66, g: 0.33, b: 0.97, duration: 0.6 });
      purpleLight.intensity = 2.2;
      if (typeof leftEarcupGlow !== 'undefined') leftEarcupGlow.color.setHex(0x00f2fe);
      if (typeof rightEarcupGlow !== 'undefined') rightEarcupGlow.color.setHex(0x7928ca);
      cageGroup.visible = false;
      emberParticles.visible = false;
      const c = document.getElementById('toggle-cage-checkbox');
      if (c) c.checked = false;
    }
    if (badge) badge.textContent = currentActiveEnvName;
  }

  function applyCameraPreset(cam) {
    const targetX = (window.innerWidth >= 1024) ? 1.25 : 0;
    const targetY = (window.innerWidth >= 1024) ? 0.05 : 0.6;
    if (cam === 'isometric') {
      // Front Isometric
      gsap.to(headphoneRoot.position, { x: targetX, y: targetY, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0, y: 0, z: 0, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 4.6, duration: 0.8 });
    } else if (cam === 'macro') {
      // Macro Ear-Cup close-up
      gsap.to(headphoneRoot.position, { x: targetX - 0.4, y: targetY - 0.05, z: 0.6, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0.1, y: -Math.PI * 0.48, z: 0, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 3.5, duration: 0.8 });
    } else if (cam === 'topdown') {
      // Top-Down Arc from above
      gsap.to(headphoneRoot.position, { x: targetX, y: targetY - 0.45, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 1.15, y: 0, z: 0, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 4.5, duration: 0.8 });
    } else {
      // Cinematic 45°
      gsap.to(headphoneRoot.position, { x: targetX, y: targetY, z: 0, duration: 0.8 });
      gsap.to(headphoneRoot.rotation, { x: 0.15, y: -Math.PI * 0.22, z: 0, duration: 0.8 });
      gsap.to(camera.position, { x: 0, y: 0, z: 4.8, duration: 0.8 });
    }
  }

  function renderEnvironmentPage() {
    const curEnv = state.currentEnv || 'void';
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-6 min-h-[86vh] pointer-events-none pb-28">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left Column: Controls & Studio Tools (5 Cols on XL, 6 Cols on LG) -->
          <div class="lg:col-span-6 xl:col-span-5 pointer-events-auto space-y-4">
            <!-- Title & Tag -->
            <div>
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>[ 04 / 3D LIGHTING & ENVIRONMENT STUDIO ]</span>
              </div>
              <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">Studio Không Gian & Ánh Sáng 3D</h1>
              <p class="text-xs text-slate-300 leading-relaxed">
                Kiểm tra phản xạ bề mặt kim loại PBR dưới 4 môi trường ánh sáng tiêu chuẩn phòng thí nghiệm và chuyển đổi góc quay camera tự do.
              </p>
            </div>

            <!-- Floating Studio Control Panel Container -->
            <div class="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl space-y-4">
              <!-- Lighting Environment Presets -->
              <div>
                <div class="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>1. Môi Trường Chiếu Sáng (Lighting)</span>
                  <span class="text-slate-500 text-[10px]">PBR SHADER</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button class="env-preset-btn p-3 rounded-2xl border ${curEnv === 'void' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'} text-left transition-all" data-env="void">
                    <div class="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>Obsidian Void</span>
                    </div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Không gian tối sâu</div>
                  </button>
                  <button class="env-preset-btn p-3 rounded-2xl border ${curEnv === 'neon' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'} hover:border-white/20 text-left transition-all" data-env="neon">
                    <div class="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span class="w-2 h-2 rounded-full bg-fuchsia-400"></span>
                      <span>Cyber LVCIDIA</span>
                    </div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Lồng Neon Cyber</div>
                  </button>
                  <button class="env-preset-btn p-3 rounded-2xl border ${curEnv === 'amber' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'} hover:border-white/20 text-left transition-all" data-env="amber">
                    <div class="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>Warm Amber</span>
                    </div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Phòng thu đèn bóng khí</div>
                  </button>
                  <button class="env-preset-btn p-3 rounded-2xl border ${curEnv === 'arctic' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'} hover:border-white/20 text-left transition-all" data-env="arctic">
                    <div class="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span class="w-2 h-2 rounded-full bg-sky-200"></span>
                      <span>Arctic Clean</span>
                    </div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Lab trắng vô trùng</div>
                  </button>
                </div>
              </div>

              <!-- Camera Angle Presets -->
              <div>
                <div class="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>2. Góc Nhìn Camera Presets</span>
                  <span class="text-slate-500 text-[10px]">CINEMATIC GSAP</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button class="cam-preset-btn p-3 rounded-2xl border border-cyan-400/40 bg-white/5 hover:border-cyan-400 text-left transition-all" data-cam="cinematic">
                    <div class="text-xs font-semibold text-white">Cinematic 45°</div>
                    <div class="text-[10px] text-slate-400">Toàn cảnh nghệ thuật</div>
                  </button>
                  <button class="cam-preset-btn p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400 text-left transition-all" data-cam="isometric">
                    <div class="text-xs font-semibold text-white">Front Isometric</div>
                    <div class="text-[10px] text-slate-400">Trực diện đối xứng</div>
                  </button>
                  <button class="cam-preset-btn p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400 text-left transition-all" data-cam="macro">
                    <div class="text-xs font-semibold text-white">Macro Ear-Cup</div>
                    <div class="text-[10px] text-slate-400">Cận cảnh buồng âm</div>
                  </button>
                  <button class="cam-preset-btn p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400 text-left transition-all" data-cam="topdown">
                    <div class="text-xs font-semibold text-white">Top-Down Arc</div>
                    <div class="text-[10px] text-slate-400">Vòm đệm headband</div>
                  </button>
                </div>
              </div>

              <!-- Quick Color Switcher in Environment -->
              <div>
                <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>3. Màu Sắc Hoàn Thiện PBR</span>
                  <span class="text-cyan-400 text-[10px]">REALTIME</span>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  <button class="env-color-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400 text-center transition-all" data-color="titanium">
                    <div class="w-3.5 h-3.5 rounded-full bg-[#1e2029] mx-auto mb-1 border border-white/20"></div>
                    <div class="text-[10px] text-slate-300 font-mono">Graphite</div>
                  </button>
                  <button class="env-color-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400 text-center transition-all" data-color="chrome">
                    <div class="w-3.5 h-3.5 rounded-full bg-[#e2e8f0] mx-auto mb-1 border border-white/40"></div>
                    <div class="text-[10px] text-slate-300 font-mono">Chrome</div>
                  </button>
                  <button class="env-color-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400 text-center transition-all" data-color="copper">
                    <div class="w-3.5 h-3.5 rounded-full bg-[#c87d55] mx-auto mb-1 border border-white/20"></div>
                    <div class="text-[10px] text-slate-300 font-mono">Copper</div>
                  </button>
                  <button class="env-color-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400 text-center transition-all" data-color="pearl">
                    <div class="w-3.5 h-3.5 rounded-full bg-[#f8fafc] mx-auto mb-1 border border-white/40"></div>
                    <div class="text-[10px] text-slate-300 font-mono">Pearl</div>
                  </button>
                </div>
              </div>

              <!-- Bottom Toggles Bar -->
              <div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div class="flex items-center space-x-4">
                  <label class="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                    <input type="checkbox" id="toggle-cage-checkbox" class="accent-cyan-400 cursor-pointer rounded" />
                    <span class="font-mono text-[11px]">Lưới Cyber Cage</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                    <input type="checkbox" id="toggle-embers-checkbox" class="accent-cyan-400 cursor-pointer rounded" />
                    <span class="font-mono text-[11px]">Hạt Embers</span>
                  </label>
                </div>
                <a href="#/anatomy" class="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1">
                  <span>Chuyển sang Bóc Tách 8 Lớp</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive 3D Telemetry HUD (Over the 3D Headphone Viewport) -->
          <div class="lg:col-span-6 xl:col-span-7 flex flex-col justify-between min-h-[520px] pointer-events-none pl-0 lg:pl-6">
            <!-- Top-Right Studio Telemetry Card -->
            <div class="pointer-events-auto self-end glass-panel px-4 py-2.5 rounded-2xl border border-white/10 text-xs font-mono text-slate-300 shadow-2xl backdrop-blur-xl flex items-center space-x-3">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe] animate-pulse"></span>
                <span id="env-active-name" class="text-white font-bold">${currentActiveEnvName}</span>
              </div>
              <span class="text-white/20">•</span>
              <span class="text-slate-400">PBR SHADER</span>
              <span class="text-white/20">•</span>
              <span class="text-cyan-400 font-semibold">INTERACTIVE 3D</span>
            </div>

            <!-- Bottom-Right 3D Drag & Zoom Hint -->
            <div class="pointer-events-auto self-end glass-panel px-4 py-2 rounded-xl border border-white/10 text-[11px] font-mono text-slate-400 shadow-xl flex items-center space-x-2">
              <i data-lucide="move-3d" class="w-4 h-4 text-cyan-400"></i>
              <span>Giữ chuột trái để xoay 360° • Lăn chuột để zoom cận cảnh</span>
            </div>
          </div>
        </div>
      </section>
    `;

    document.querySelectorAll('.env-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        document.querySelectorAll('.env-preset-btn').forEach(b => {
          b.classList.remove('border-cyan-400', 'bg-cyan-500/10');
          b.classList.add('border-white/10', 'bg-white/5');
        });
        btn.classList.add('border-cyan-400', 'bg-cyan-500/10');
        btn.classList.remove('border-white/10', 'bg-white/5');

        const env = btn.getAttribute('data-env');
        applyEnvironmentPreset(env);
      });
    });

    document.querySelectorAll('.cam-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        document.querySelectorAll('.cam-preset-btn').forEach(b => {
          b.classList.remove('border-cyan-400', 'bg-cyan-500/10');
          b.classList.add('border-white/10', 'bg-white/5');
        });
        btn.classList.add('border-cyan-400', 'bg-cyan-500/10');
        btn.classList.remove('border-white/10', 'bg-white/5');

        const cam = btn.getAttribute('data-cam');
        applyCameraPreset(cam);
      });
    });

    document.querySelectorAll('.env-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        const color = btn.getAttribute('data-color');
        if (color) applyColorTheme(color);
      });
    });

    const cageCheckbox = document.getElementById('toggle-cage-checkbox');
    if (cageCheckbox) {
      cageCheckbox.checked = cageGroup.visible;
      cageCheckbox.addEventListener('change', (e) => {
        cageGroup.visible = e.target.checked;
      });
    }

    const embersCheckbox = document.getElementById('toggle-embers-checkbox');
    if (embersCheckbox) {
      embersCheckbox.checked = emberParticles.visible;
      embersCheckbox.addEventListener('change', (e) => {
        emberParticles.visible = e.target.checked;
      });
    }
  }

  // 5. Upgraded Spatial Audio Page with 360° Draggable Radar & Live FFT Visualizer
  function renderSpatialAudioPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-10 flex flex-col justify-center min-h-[82vh]">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left: 360° Interactive Spatial Radar -->
          <div class="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ 03 / SPATIAL AUDIO RADAR ]</span>
                <h2 class="font-heading text-2xl font-bold text-white mt-1">Định Vị Nguồn Âm 360° HRTF</h2>
              </div>
              <button id="page-audio-toggle" class="w-12 h-12 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center shadow-lg shadow-cyan-400/25 transition-all">
                <i data-lucide="${state.isAudioPlaying ? 'pause' : 'play'}" class="w-5 h-5 ml-0.5 fill-current"></i>
              </button>
            </div>

            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Nhấp và kéo chấm phát sáng trên radar để di chuyển vị trí nguồn âm 3D quanh đầu người nghe trong thời gian thực.
            </p>

            <!-- Circular Spatial Radar -->
            <div class="relative w-full py-4 flex flex-col items-center justify-center">
              <div id="spatial-radar-box" class="spatial-radar-circle flex items-center justify-center relative cursor-crosshair select-none touch-none">
                <!-- Sonar Pulse Ring -->
                <div class="absolute inset-2 rounded-full border border-cyan-400/20 animate-ping opacity-20 pointer-events-none"></div>
                <!-- Concentric Rings -->
                <div class="absolute w-44 h-44 rounded-full border border-cyan-500/20 pointer-events-none"></div>
                <div class="absolute w-28 h-28 rounded-full border border-cyan-500/30 pointer-events-none"></div>
                <div class="absolute w-14 h-14 rounded-full border border-cyan-500/40 pointer-events-none"></div>
                <!-- Crosshair Guides -->
                <div class="absolute inset-x-0 top-1/2 h-px bg-cyan-500/25 pointer-events-none"></div>
                <div class="absolute inset-y-0 left-1/2 w-px bg-cyan-500/25 pointer-events-none"></div>
                <!-- Compass Indicators -->
                <span class="absolute top-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">FRONT (0°)</span>
                <span class="absolute bottom-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">REAR (180°)</span>
                <span class="absolute left-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">L (270°)</span>
                <span class="absolute right-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">R (90°)</span>
                <!-- Central Listener Head Icon -->
                <div class="w-9 h-9 rounded-full bg-black/90 border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#00f2fe] pointer-events-none z-10">
                  <i data-lucide="headphones" class="w-4 h-4 text-cyan-300"></i>
                </div>
                <!-- Draggable Sound Dot -->
                <div id="spatial-source-dot" class="spatial-source-dot" style="left: 175px; top: 65px;"></div>
              </div>

              <!-- Radar Telemetry Readout -->
              <div class="mt-4 flex items-center space-x-4 text-xs font-mono text-slate-400">
                <span id="radar-azimuth-val" class="text-cyan-300">Góc: 45°</span>
                <span>•</span>
                <span id="radar-distance-val" class="text-purple-300">Khoảng cách: 1.0m</span>
                <span>•</span>
                <span class="text-emerald-400">HRTF Active</span>
              </div>
            </div>

            <!-- Spatial Modes Selector (3 Modes) -->
            <div class="mt-4 pt-4 border-t border-white/10">
              <div class="text-[11px] font-mono text-slate-400 uppercase mb-2">Chế Độ Giả Lập Âm Thanh:</div>
              <div class="grid grid-cols-3 gap-2">
                <button class="spatial-mode-btn p-2 rounded-xl border border-cyan-400 bg-cyan-500/10 text-center text-xs font-medium text-white transition-all" data-mode="binaural">
                  Binaural 360° Orbit
                </button>
                <button class="spatial-mode-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 text-center text-xs font-medium text-slate-300 transition-all" data-mode="studio">
                  Studio Mastering
                </button>
                <button class="spatial-mode-btn p-2 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 text-center text-xs font-medium text-slate-300 transition-all" data-mode="8d">
                  Hyper-Spatial 8D
                </button>
              </div>
            </div>
          </div>

          <!-- Right: Real-time FFT Frequency Canvas & 3-Band Equalizer -->
          <div class="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">[ 04 / ACTIVE FFT SPECTRUM & EQ ]</span>
            <h2 class="font-heading text-2xl font-bold text-white mt-1 mb-2">Quang Phổ Thời Gian Thực & EQ</h2>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Theo dõi phân bố tần số âm thanh qua Web Audio API AnalyserNode và tinh chỉnh 3 dải âm thanh đáp tuyến theo sở thích.
            </p>

            <!-- FFT Spectrum Visualizer Canvas -->
            <div class="mb-6 p-2 rounded-2xl bg-black/60 border border-white/10">
              <canvas id="spatial-fft-canvas" width="480" height="100" class="w-full h-24 rounded-xl"></canvas>
              <div class="flex justify-between px-2 pt-1 text-[9px] font-mono text-slate-500">
                <span>20 Hz</span>
                <span>250 Hz</span>
                <span>1 kHz</span>
                <span>4 kHz</span>
                <span>20 kHz</span>
              </div>
            </div>

            <!-- 3-Band Equalizer Sliders -->
            <div class="space-y-4 pt-2 border-t border-white/10">
              <div class="text-xs font-mono text-slate-400 uppercase">3-Band Equalizer Studio:</div>
              <div>
                <div class="flex justify-between text-xs text-slate-300 mb-1">
                  <span>BASS (60Hz Lowshelf)</span>
                  <span id="bass-val" class="font-mono text-cyan-400">0 dB</span>
                </div>
                <input type="range" id="bass-slider" min="-12" max="12" value="0" class="w-full accent-cyan-400 cursor-pointer" />
              </div>
              <div>
                <div class="flex justify-between text-xs text-slate-300 mb-1">
                  <span>MID (1kHz Peaking)</span>
                  <span id="mid-val" class="font-mono text-purple-400">0 dB</span>
                </div>
                <input type="range" id="mid-slider" min="-12" max="12" value="0" class="w-full accent-purple-400 cursor-pointer" />
              </div>
              <div>
                <div class="flex justify-between text-xs text-slate-300 mb-1">
                  <span>TREBLE (10kHz Highshelf)</span>
                  <span id="treble-val" class="font-mono text-emerald-400">0 dB</span>
                </div>
                <input type="range" id="treble-slider" min="-12" max="12" value="0" class="w-full accent-emerald-400 cursor-pointer" />
              </div>
            </div>

            <!-- Multi-Soundscape Audio Selector Grid -->
            <div class="space-y-3 pt-4 border-t border-white/10">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ 05 / KHO ÂM THANH KIỂM THỬ THỰC TẾ ]</span>
                <span id="active-soundscape-tag" class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-bold">${SOUND_PROFILES[currentSoundProfile]?.tag || '8D SPATIAL'}</span>
              </div>
              <div class="text-xs text-slate-300 font-semibold" id="active-soundscape-title">${SOUND_PROFILES[currentSoundProfile]?.name || '8D Binaural Spatial Orbit'}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${Object.keys(SOUND_PROFILES).map(key => {
                  const p = SOUND_PROFILES[key];
                  const isActive = (currentSoundProfile === key);
                  return `
                    <button class="sound-profile-card p-2.5 rounded-2xl border ${isActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'} text-left transition-all hover:border-cyan-400/50" data-sound-key="${key}">
                      <div class="flex items-center justify-between mb-1">
                        <div class="text-[11px] font-bold text-white">${p.name}</div>
                        <span class="text-[8px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-cyan-400 text-black font-bold' : 'bg-white/10 text-slate-400'}">${p.tag}</span>
                      </div>
                      <div class="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">${p.desc}</div>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    document.querySelectorAll('.sound-profile-card').forEach(card => {
      card.addEventListener('click', () => {
        playUiClickSfx();
        const key = card.getAttribute('data-sound-key');
        setSoundProfile(key);
        document.querySelectorAll('.sound-profile-card').forEach(c => {
          c.classList.remove('border-cyan-400', 'bg-cyan-500/10');
          c.classList.add('border-white/10', 'bg-white/5');
          const badge = c.querySelector('span');
          if (badge) {
            badge.className = 'text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400';
          }
        });
        card.classList.remove('border-white/10', 'bg-white/5');
        card.classList.add('border-cyan-400', 'bg-cyan-500/10');
        const activeBadge = card.querySelector('span');
        if (activeBadge) {
          activeBadge.className = 'text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-400 text-black font-bold';
        }
        if (!state.isAudioPlaying) {
          toggleAudioPlayback(true);
        }
      });
    });

    document.getElementById('page-audio-toggle')?.addEventListener('click', () => {
      playUiClickSfx();
      toggleAudioPlayback();
    });

    const radarBox = document.getElementById('spatial-radar-box');
    const sourceDot = document.getElementById('spatial-source-dot');
    const azimuthVal = document.getElementById('radar-azimuth-val');
    const distanceVal = document.getElementById('radar-distance-val');
    let isDraggingDot = false;

    function updateRadarPos(clientX, clientY) {
      if (!radarBox || !sourceDot) return;
      initAudioSynthesizer();
      const rect = radarBox.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const maxR = (rect.width / 2) - 14;
      const dist = Math.min(maxR, Math.sqrt(dx * dx + dy * dy));
      const angle = Math.atan2(dy, dx);

      const dotX = (rect.width / 2) + Math.cos(angle) * dist;
      const dotY = (rect.height / 2) + Math.sin(angle) * dist;
      sourceDot.style.left = `${dotX}px`;
      sourceDot.style.top = `${dotY}px`;

      const deg = Math.round(((angle * 180 / Math.PI) + 90 + 360) % 360);
      const panNorm = Math.cos(angle);
      if (pannerNode && pannerNode.pan) {
        if (lfoGain) lfoGain.gain.setValueAtTime(0, audioCtx.currentTime);
        pannerNode.pan.setTargetAtTime(panNorm, audioCtx.currentTime, 0.05);
      }
      if (azimuthVal) azimuthVal.textContent = `Góc: ${deg}°`;
      if (distanceVal) distanceVal.textContent = `Khoảng cách: ${(dist / maxR).toFixed(1)}m`;
    }

    radarBox?.addEventListener('pointerdown', (e) => {
      isDraggingDot = true;
      radarBox.setPointerCapture(e.pointerId);
      updateRadarPos(e.clientX, e.clientY);
    });

    radarBox?.addEventListener('pointermove', (e) => {
      if (isDraggingDot) updateRadarPos(e.clientX, e.clientY);
    });

    radarBox?.addEventListener('pointerup', (e) => {
      isDraggingDot = false;
      try { radarBox.releasePointerCapture(e.pointerId); } catch (_) {}
    });

    document.querySelectorAll('.spatial-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        document.querySelectorAll('.spatial-mode-btn').forEach(b => {
          b.classList.remove('border-cyan-400', 'bg-cyan-500/10');
          b.classList.add('border-white/10', 'bg-white/5');
        });
        btn.classList.add('border-cyan-400', 'bg-cyan-500/10');
        btn.classList.remove('border-white/10', 'bg-white/5');

        initAudioSynthesizer();
        const mode = btn.getAttribute('data-mode');
        if (mode === 'binaural') {
          if (lfoGain) lfoGain.gain.setValueAtTime(0.85, audioCtx.currentTime);
        } else if (mode === 'studio') {
          if (lfoGain) lfoGain.gain.setValueAtTime(0, audioCtx.currentTime);
          if (pannerNode) pannerNode.pan.setValueAtTime(0, audioCtx.currentTime);
        } else if (mode === '8d') {
          if (lfoGain) lfoGain.gain.setValueAtTime(0.98, audioCtx.currentTime);
        }
      });
    });

    const fftCanvas = document.getElementById('spatial-fft-canvas');
    if (fftCanvas && analyserNode) {
      const ctx = fftCanvas.getContext('2d');
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      function drawFft() {
        if (!document.getElementById('spatial-fft-canvas')) return;
        requestAnimationFrame(drawFft);
        analyserNode.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, fftCanvas.width, fftCanvas.height);
        const barWidth = (fftCanvas.width / bufferLength) * 2.2;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * fftCanvas.height * 0.9;
          const grad = ctx.createLinearGradient(0, fftCanvas.height, 0, 0);
          grad.addColorStop(0, '#00f2fe');
          grad.addColorStop(1, '#a855f7');
          ctx.fillStyle = grad;
          ctx.fillRect(x, fftCanvas.height - barHeight, barWidth - 2, barHeight);
          x += barWidth;
        }
      }
      drawFft();
    }

    document.getElementById('bass-slider')?.addEventListener('input', (e) => {
      initAudioSynthesizer();
      const val = parseFloat(e.target.value);
      if (bassFilter) bassFilter.gain.setTargetAtTime(val, audioCtx.currentTime, 0.05);
      document.getElementById('bass-val').textContent = (val > 0 ? '+' : '') + val + ' dB';
    });

    document.getElementById('mid-slider')?.addEventListener('input', (e) => {
      initAudioSynthesizer();
      const val = parseFloat(e.target.value);
      if (midFilter) midFilter.gain.setTargetAtTime(val, audioCtx.currentTime, 0.05);
      document.getElementById('mid-val').textContent = (val > 0 ? '+' : '') + val + ' dB';
    });

    document.getElementById('treble-slider')?.addEventListener('input', (e) => {
      initAudioSynthesizer();
      const val = parseFloat(e.target.value);
      if (trebleFilter) trebleFilter.gain.setTargetAtTime(val, audioCtx.currentTime, 0.05);
      document.getElementById('treble-val').textContent = (val > 0 ? '+' : '') + val + ' dB';
    });
  }

  // 6. Tech Specs Page
  function renderSpecsPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-12">
        <div class="max-w-2xl mb-12">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ 08 / Technical Specifications ]</span>
          <h1 class="font-heading text-4xl font-bold text-white mt-2 mb-3">Thông Số Kỹ Thuật Đầy Đủ</h1>
          <p class="text-xs text-slate-400">Toàn bộ thông số phòng lab âm học. Các thông số thử nghiệm được đánh dấu rõ ràng.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${window.AURA_DATA.specs.map(cat => `
            <div class="glass-panel p-6 rounded-3xl border border-white/10">
              <h3 class="font-heading font-bold text-base text-cyan-400 mb-4 pb-2 border-b border-white/10">${cat.category}</h3>
              <div class="space-y-3">
                ${cat.items.map(item => `
                  <div class="flex justify-between items-start text-xs gap-4">
                    <span class="text-slate-400">${item.label}</span>
                    <span class="text-white font-mono font-medium text-right">${item.value}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // 7. Comparison Page
  function renderComparePage() {
    mainContainer.innerHTML = `
      <section class="max-w-6xl mx-auto px-6 py-12">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ 09 / Product Comparison ]</span>
          <h1 class="font-heading text-4xl font-bold text-white mt-2 mb-3">So Sánh Trực Tiếp Với Đối Thủ</h1>
          <p class="text-xs text-slate-400">Minh bạch thông số kỹ thuật với các mẫu tai nghe đầu bảng hàng đầu thế giới.</p>
        </div>

        <div class="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr class="border-b border-white/10 bg-white/5 font-mono">
                  <th class="p-5 text-slate-400">THÔNG SỐ</th>
                  <th class="p-5 text-cyan-400 font-bold bg-cyan-500/10 border-x border-cyan-500/20">
                    AURA ONE (Winner)
                  </th>
                  <th class="p-5 text-slate-300">Sony WH-1000XM5</th>
                  <th class="p-5 text-slate-300">AirPods Max</th>
                  <th class="p-5 text-slate-300">Bose QC Ultra</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr>
                  <td class="p-5 text-slate-300 font-medium">Trọng lượng tịnh</td>
                  <td class="p-5 text-cyan-300 font-bold bg-cyan-500/10 border-x border-cyan-500/20">238g (Siêu nhẹ)</td>
                  <td class="p-5 text-slate-400">250g</td>
                  <td class="p-5 text-slate-400">384g (Nặng)</td>
                  <td class="p-5 text-slate-400">253g</td>
                </tr>
                <tr>
                  <td class="p-5 text-slate-300 font-medium">Chất liệu khung</td>
                  <td class="p-5 text-cyan-300 font-bold bg-cyan-500/10 border-x border-cyan-500/20">Hợp kim Magie hàng không</td>
                  <td class="p-5 text-slate-400">Nhựa tái chế</td>
                  <td class="p-5 text-slate-400">Thép & Nhôm</td>
                  <td class="p-5 text-slate-400">Nhựa & Kim loại</td>
                </tr>
                <tr>
                  <td class="p-5 text-slate-300 font-medium">Màng loa (Driver)</td>
                  <td class="p-5 text-cyan-300 font-bold bg-cyan-500/10 border-x border-cyan-500/20">40mm Pure Beryllium</td>
                  <td class="p-5 text-slate-400">30mm Carbon Fiber</td>
                  <td class="p-5 text-slate-400">40mm Dynamic</td>
                  <td class="p-5 text-slate-400">35mm Dynamic</td>
                </tr>
                <tr>
                  <td class="p-5 text-slate-300 font-medium">Thời lượng Pin ANC</td>
                  <td class="p-5 text-cyan-300 font-bold bg-cyan-500/10 border-x border-cyan-500/20">45 Giờ</td>
                  <td class="p-5 text-slate-400">30 Giờ</td>
                  <td class="p-5 text-slate-400">20 Giờ</td>
                  <td class="p-5 text-slate-400">24 Giờ</td>
                </tr>
                <tr>
                  <td class="p-5 text-slate-300 font-medium">Giá niêm yết</td>
                  <td class="p-5 text-cyan-300 font-bold bg-cyan-500/10 border-x border-cyan-500/20">$399</td>
                  <td class="p-5 text-slate-400">$399</td>
                  <td class="p-5 text-slate-400">$549</td>
                  <td class="p-5 text-slate-400">$429</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  // 8. Full Checkout Page
    function renderCheckoutPage() {
    const cart = (window.AURA_CART && window.AURA_CART.getCart().length > 0)
      ? window.AURA_CART.getCart()
      : [{
          id: 'prod-titanium',
          name: 'AURA ONE Flagship (' + (state.selectedColorName || 'Titanium Graphite') + ')',
          price: 399,
          quantity: 1,
          image: 'assets/media/hero-titanium-studio.png'
        }];

    let subtotal = cart.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (item.quantity || 1)), 0);
    let promoDiscount = state.promoDiscount || 0;
    let finalTotal = Math.max(0, subtotal - promoDiscount);

    mainContainer.innerHTML = `
      <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div class="mb-8">
          <a href="#/cart" class="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-3">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>QUAY LẠI GIỎ HÀNG</span>
          </a>
          <h1 class="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Thanh Toán & Xác Nhận Đơn Hàng</h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Giao hàng hỏa tốc bảo hiểm 100%, bảo hành chính hãng 3 năm 1 đổi 1 và hỗ trợ đồng kiểm trước khi trả tiền.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: Shipping & Payment Options Form -->
          <div class="lg:col-span-7 space-y-6">
            <!-- 1. Shipping Details -->
            <div class="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-cyan-400"></i>
                  <span>1. THÔNG TIN GIAO HÀNG & NHẬN HÀNG</span>
                </h3>
                <span class="text-[10px] font-mono text-emerald-400 font-bold">FREESHIP VIP</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono text-slate-300 mb-1">Họ và tên người nhận *</label>
                  <input type="text" id="chk-name" placeholder="VD: Nguyễn Hoàng Nam" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none" required />
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-slate-300 mb-1">Số điện thoại liên hệ *</label>
                  <input type="tel" id="chk-phone" placeholder="VD: 0901 234 567" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none" required />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono text-slate-300 mb-1">Email nhận chứng thư bảo hành số *</label>
                <input type="email" id="chk-email" placeholder="VD: owner@aurasound.com" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono text-slate-300 mb-1">Tỉnh / Thành phố *</label>
                  <input type="text" id="chk-city" placeholder="Hà Nội / TP. Hồ Chí Minh / Đà Nẵng" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-slate-300 mb-1">Quận / Huyện *</label>
                  <input type="text" id="chk-district" placeholder="Quận 1 / Cầu Giấy / Hải Châu..." class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono text-slate-300 mb-1">Địa chỉ chi tiết (Số nhà, tên đường) *</label>
                <input type="text" id="chk-address" placeholder="VD: Số 18 Phố Hàng Bài, Phường Tràng Tiền" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none" />
              </div>
            </div>

            <!-- 2. Payment Method Selector -->
            <div class="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <i data-lucide="credit-card" class="w-4 h-4 text-cyan-400"></i>
                  <span>2. PHƯƠNG THỨC THANH TOÁN BẢO MẬT</span>
                </h3>
                <span class="text-[10px] font-mono text-cyan-400">SSL 256-BIT</span>
              </div>

              <div class="space-y-2.5 text-xs">
                <!-- COD Option -->
                <label class="flex items-center space-x-3 p-3.5 rounded-2xl border border-white/15 bg-white/[0.03] hover:border-cyan-400/50 cursor-pointer transition-all pay-option-label" id="pay-opt-cod-label">
                  <input type="radio" name="pay-method-radio" id="pay-method-cod" value="cod" checked class="accent-cyan-400 w-4 h-4 cursor-pointer" />
                  <div class="flex-1">
                    <div class="font-bold text-white">Thanh toán khi nhận hàng (COD) / Đồng kiểm tại nhà</div>
                    <div class="text-[10px] text-slate-400">Kiểm tra sản phẩm và nghe thử trước khi thanh toán cho shipper.</div>
                  </div>
                  <i data-lucide="package-check" class="w-5 h-5 text-emerald-400"></i>
                </label>

                <!-- VietQR Option -->
                <label class="flex items-center space-x-3 p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/50 cursor-pointer transition-all pay-option-label" id="pay-opt-qr-label">
                  <input type="radio" name="pay-method-radio" id="pay-method-qr" value="vietqr" class="accent-cyan-400 w-4 h-4 cursor-pointer" />
                  <div class="flex-1">
                    <div class="font-bold text-white">Chuyển khoản VietQR 24/7 (Khuyên dùng)</div>
                    <div class="text-[10px] text-slate-400">Quét mã QR tự động điền số tiền và nội dung, kích hoạt bảo hành VIP ngay.</div>
                  </div>
                  <i data-lucide="qr-code" class="w-5 h-5 text-cyan-400"></i>
                </label>
              </div>

              <!-- Payment Details Sub-Box (Dynamic) -->
              <div id="payment-details-box" class="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs text-slate-300">
                <div id="payment-cod-info">
                  <p class="leading-relaxed">
                    📦 <span class="text-white font-bold">Chính sách đồng kiểm VIP:</span> Đơn hàng sẽ được nhân viên chuyên trách giao tận nơi. Bạn được kiểm tra seal hộp, mã serial và phụ kiện trước khi thanh toán tiền mặt.
                  </p>
                </div>
                <div id="payment-qr-info" class="hidden space-y-3">
                  <div class="flex flex-col sm:flex-row items-center gap-4">
                    <div class="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://aura-one.audio/pay?total=${finalTotal}" alt="VietQR" class="w-full h-full object-contain" />
                    </div>
                    <div class="space-y-1 font-mono text-[11px]">
                      <div><span class="text-slate-400">Ngân hàng:</span> <span class="text-white font-bold">Techcombank</span></div>
                      <div><span class="text-slate-400">Số tài khoản:</span> <span class="text-cyan-300 font-bold text-sm">1903 8291 0888 88</span></div>
                      <div><span class="text-slate-400">Chủ tài khoản:</span> <span class="text-white font-bold">AURA ONE AUDIO VIETNAM</span></div>
                      <div><span class="text-slate-400">Nội dung CK:</span> <span class="text-amber-400 font-bold" id="qr-transfer-content">AURA-CHECKOUT</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Policy & Consent Checkboxes -->
            <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <label class="flex items-start space-x-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input type="checkbox" id="chk-agree-terms" checked class="mt-0.5 accent-cyan-400 w-4 h-4 rounded cursor-pointer" />
                <span>Tôi đồng ý với <a href="#/terms" class="text-cyan-400 underline">Điều khoản dịch vụ</a> và chính sách bảo hành 3 năm 1 đổi 1 của AURA ONE. *</span>
              </label>
              <label class="flex items-start space-x-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input type="checkbox" id="chk-save-info" checked class="mt-0.5 accent-cyan-400 w-4 h-4 rounded cursor-pointer" />
                <span>Lưu thông tin giao hàng để tự động điền cho lần mua sắm tiếp theo.</span>
              </label>
            </div>
          </div>

          <!-- Right: Order Summary Breakdown -->
          <div class="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5 h-fit sticky top-28">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <i data-lucide="shopping-bag" class="w-4 h-4 text-cyan-400"></i>
                <span>ĐƠN HÀNG CỦA BẠN (${cart.length} MÓN)</span>
              </h3>
              <a href="#/cart" class="text-[10px] font-mono text-cyan-400 hover:text-cyan-300">SỬA GIỎ</a>
            </div>

            <!-- Items List -->
            <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
              ${cart.map(item => `
                <div class="flex items-center space-x-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <img src="${item.image || 'assets/media/hero-titanium-studio.png'}" alt="${item.name}" class="w-12 h-12 object-contain rounded-xl bg-black/60 p-1 border border-white/10 shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="font-bold text-xs text-white truncate">${item.name}</div>
                    <div class="text-[10px] font-mono text-slate-400">Số lượng: ${item.quantity || 1}</div>
                  </div>
                  <div class="text-xs font-mono font-bold text-cyan-300 shrink-0">
                    ${(parseFloat(item.price) * (item.quantity || 1))} USD
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Promo Code Input -->
            <div class="pt-3 border-t border-white/10">
              <div class="flex space-x-2">
                <input type="text" id="chk-promo-input" placeholder="Mã giảm giá (VD: AURA50)" class="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono uppercase focus:border-cyan-400 focus:outline-none" />
                <button id="chk-promo-apply-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase transition-all">
                  ÁP DỤNG
                </button>
              </div>
            </div>

            <!-- Calculations -->
            <div class="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
              <div class="flex justify-between">
                <span>Tạm tính hàng hóa:</span>
                <span class="text-white font-bold" id="chk-subtotal-val">${subtotal} USD</span>
              </div>
              <div class="flex justify-between text-emerald-400">
                <span>Vận chuyển hỏa tốc VIP:</span>
                <span class="font-bold">MIỄN PHÍ</span>
              </div>
              <div class="flex justify-between text-emerald-400">
                <span>Khắc Laser 3D độc bản:</span>
                <span class="font-bold">MIỄN PHÍ</span>
              </div>
              ${promoDiscount > 0 ? `
                <div class="flex justify-between text-cyan-400 font-bold">
                  <span>Ưu đãi voucher:</span>
                  <span>-${promoDiscount} USD</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                <span>TỔNG THANH TOÁN:</span>
                <div class="text-right">
                  <div class="text-cyan-400 text-lg" id="chk-final-total">${finalTotal} USD</div>
                  <div class="text-[10px] text-slate-400 font-normal">~ ${(finalTotal * 25000).toLocaleString('vi-VN')} đ</div>
                </div>
              </div>
            </div>

            <!-- Submit Order CTA -->
            <button id="submit-order-btn" class="w-full py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-xl shadow-cyan-400/25 flex items-center justify-center space-x-2">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>HOÀN TẤT ĐẶT HÀNG NGAY</span>
            </button>

            <!-- Security Trust Guarantee Badges -->
            <div class="flex items-center justify-center space-x-3 text-[9px] font-mono text-slate-400 pt-2">
              <span class="flex items-center gap-1"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> Bảo hiểm 100%</span>
              <span class="flex items-center gap-1"><i data-lucide="lock" class="w-3.5 h-3.5 text-amber-400"></i> SSL 256-Bit</span>
              <span class="flex items-center gap-1"><i data-lucide="award" class="w-3.5 h-3.5 text-cyan-400"></i> Đổi mới 3 năm</span>
            </div>
          </div>
        </div>
      </section>
    `;

    // Radio switcher between COD and VietQR
    const codRadio = document.getElementById('pay-method-cod');
    const qrRadio = document.getElementById('pay-method-qr');
    const codInfo = document.getElementById('payment-cod-info');
    const qrInfo = document.getElementById('payment-qr-info');
    const codLabel = document.getElementById('pay-opt-cod-label');
    const qrLabel = document.getElementById('pay-opt-qr-label');

    function updatePayMethodUI() {
      if (codRadio?.checked) {
        codInfo?.classList.remove('hidden');
        qrInfo?.classList.add('hidden');
        codLabel?.classList.add('border-cyan-400/50', 'bg-cyan-500/5');
        qrLabel?.classList.remove('border-cyan-400/50', 'bg-cyan-500/5');
      } else if (qrRadio?.checked) {
        codInfo?.classList.add('hidden');
        qrInfo?.classList.remove('hidden');
        qrLabel?.classList.add('border-cyan-400/50', 'bg-cyan-500/5');
        codLabel?.classList.remove('border-cyan-400/50', 'bg-cyan-500/5');
      }
    }

    codRadio?.addEventListener('change', updatePayMethodUI);
    qrRadio?.addEventListener('change', updatePayMethodUI);

    // Promo code apply
    document.getElementById('chk-promo-apply-btn')?.addEventListener('click', () => {
      const code = document.getElementById('chk-promo-input')?.value?.trim().toUpperCase();
      if (code === 'AURA50' || code === 'AURA2026' || code === 'VIP') {
        state.promoDiscount = 50;
        showNotificationToast('Áp dụng thành công mã ' + code + ' (-$50 USD)!');
        renderCheckoutPage();
      } else {
        showNotificationToast('Mã ưu đãi không hợp lệ hoặc đã hết lượt.');
      }
    });

    // Submit Order Button
    document.getElementById('submit-order-btn')?.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      const name = document.getElementById('chk-name')?.value?.trim();
      const phone = document.getElementById('chk-phone')?.value?.trim();
      const address = document.getElementById('chk-address')?.value?.trim();
      const termsAgree = document.getElementById('chk-agree-terms')?.checked;

      if (!name || !phone || !address) {
        showNotificationToast('⚠️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.');
        return;
      }

      if (!termsAgree) {
        showNotificationToast('⚠️ Vui lòng tích đồng ý với Điều khoản dịch vụ để tiếp tục.');
        return;
      }

      const orderId = 'AURA-2026-' + Math.floor(1000 + Math.random() * 9000);
      const paymentMethod = codRadio?.checked ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản VietQR 24/7';

      // Save to user orders
      if (window.AURA_AUTH) {
        window.AURA_AUTH.addOrder({
          id: orderId,
          date: new Date().toLocaleDateString('vi-VN'),
          status: 'Đang xử lý đóng gói',
          items: cart,
          totalUSD: finalTotal,
          paymentMethod: paymentMethod,
          shippingAddress: address + ', ' + (document.getElementById('chk-city')?.value || '')
        });
      }

      // Clear cart
      if (window.AURA_CART) {
        window.AURA_CART.clear();
      }

      showNotificationToast('🎉 Đặt hàng thành công! Đơn hàng #' + orderId + ' đã được tiếp nhận.');
      window.location.hash = '#/order-confirmation?id=' + orderId;
      renderView('#/order-confirmation?id=' + orderId);
    });

    refreshIcons();
  }

  // 9. Order Tracking Page
  function renderOrderTrackingPage(passedId) {
    const defaultId = passedId || 'AURA-2026-DEMO';
    mainContainer.innerHTML = `
      <section class="max-w-2xl mx-auto px-6 py-12">
        <h1 class="font-heading text-3xl font-bold text-white mb-2">Tra Cứu Tiến Trình Đơn Hàng</h1>
        <p class="text-xs text-slate-400 mb-8">Nhập mã đơn hàng hoặc số điện thoại của bạn để theo dõi hành trình giao nhận.</p>

        <div class="glass-panel p-6 rounded-3xl border border-white/10 mb-8">
          <div class="flex gap-2">
            <input type="text" id="track-input" value="${defaultId}" placeholder="Mã đơn hàng (VD: AURA-2026-8821)" class="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-xs text-white focus:border-cyan-400 uppercase font-mono" />
            <button id="track-btn" class="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs uppercase">Tra Cứu</button>
          </div>
        </div>

        <div id="track-result" class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div class="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div><span class="text-slate-400">Mã đơn:</span> <span class="text-cyan-400 font-mono font-bold" id="tracking-display-id">#${defaultId}</span></div>
            <div class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">ĐANG VẬN CHUYỂN HỎA TỐC</div>
          </div>
          <div class="space-y-3 text-xs">
            <div class="flex items-start space-x-3">
              <span class="w-3 h-3 rounded-full bg-emerald-400 mt-0.5"></span>
              <div>
                <div class="text-white font-semibold">Đã hoàn tất khắc laser & đóng gói chống sốc</div>
                <div class="text-[10px] text-slate-400">Xưởng lắp ráp công nghệ cao AURA Labs</div>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="w-3 h-3 rounded-full bg-cyan-400 mt-0.5 animate-ping"></span>
              <div>
                <div class="text-white font-semibold">Đang trên đường giao đến bạn</div>
                <div class="text-[10px] text-slate-400">Dự kiến nhận hàng trong hôm nay</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('track-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      const val = document.getElementById('track-input')?.value || defaultId;
      const displayElem = document.getElementById('tracking-display-id');
      if (displayElem) displayElem.textContent = '#' + val.replace('#', '');
      showToast('Đã cập nhật trạng thái đơn hàng thời gian thực!');
    });
  }

  // 10. Digital Warranty Lookup Page
  function renderWarrantyLookupPage(passedSerial) {
    const defaultSn = passedSerial || 'SN-AURA-88291';
    mainContainer.innerHTML = `
      <section class="max-w-2xl mx-auto px-6 py-12">
        <h1 class="font-heading text-3xl font-bold text-white mb-2">Tra Cứu Bảo Hành Điện Tử</h1>
        <p class="text-xs text-slate-400 mb-8">Nhập số Serial (in bên trong quai đeo) để kiểm tra thời hạn bảo hành 24 tháng chính hãng.</p>

        <div class="glass-panel p-6 rounded-3xl border border-white/10 mb-8">
          <div class="flex gap-2">
            <input type="text" id="serial-input" value="${defaultSn}" placeholder="Số Serial (VD: SN-AURA-88291)" class="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-xs text-white focus:border-cyan-400 uppercase font-mono" />
            <button id="serial-btn" class="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs uppercase">Kiểm Tra</button>
          </div>
        </div>

        <div id="serial-result" class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div class="flex items-center space-x-3 pb-4 border-b border-white/10">
            <i data-lucide="shield-check" class="w-8 h-8 text-emerald-400"></i>
            <div>
              <div class="text-sm font-bold text-white">Bảo Hành Chính Hãng 24 Tháng</div>
              <div class="text-xs text-slate-400" id="serial-display-text">Số Serial: <span class="text-cyan-400 font-mono font-bold">${defaultSn}</span> • Còn lại: 720 ngày</div>
            </div>
          </div>
          <div class="text-xs text-slate-300 leading-relaxed">
            Nếu có bất kỳ trục trặc phần cứng nào, nhân viên AURA sẽ đến tận nhà đổi máy mới trong 24 giờ tại Hà Nội & TP. Hồ Chí Minh.
          </div>
        </div>
      </section>
    `;

    document.getElementById('serial-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      const val = document.getElementById('serial-input')?.value || defaultSn;
      const displayElem = document.getElementById('serial-display-text');
      if (displayElem) {
        displayElem.innerHTML = 'Số Serial: <span class="text-cyan-400 font-mono font-bold">' + val + '</span> • Còn lại: 720 ngày';
      }
      showToast('Xác thực bảo hành chính hãng thành công!');
    });
  }

  // 11. Accessories Page
  function renderAccessoriesPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-12">
        <h1 class="font-heading text-3xl font-bold text-white mb-2">Hệ Sinh Thái Phụ Kiện AURA</h1>
        <p class="text-xs text-slate-400 mb-8">Các phụ kiện cao cấp đi kèm và phụ kiện tùy chọn chính hãng.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${window.AURA_DATA.accessories.map(acc => `
            <div class="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all">
              <div class="flex justify-between items-start mb-4">
                <span class="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/10 ${acc.inBox ? 'text-emerald-400' : 'text-cyan-400'}">
                  ${acc.inBox ? 'TẶNG KÈM TRONG HỘP' : 'TÙY CHỌN MUA THÊM'}
                </span>
                <span class="font-heading font-bold text-white">$${acc.price}</span>
              </div>
              <h3 class="font-heading font-bold text-white mb-2">${acc.name}</h3>
              <p class="text-xs text-slate-400 mb-6 leading-relaxed">${acc.desc}</p>
              <button class="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all" onclick="alert('Đã cập nhật phụ kiện vào giỏ hàng!');">
                ${acc.inBox ? 'Đã có sẵn trong hộp' : 'Thêm vào đơn hàng'}
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // 12. AURA Care+ Page
  function renderCarePlusPage() {
    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-6 py-12">
        <div class="glass-panel p-8 md:p-12 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
            AURA CARE+ EXTENDED PROTECTION
          </div>
          <h1 class="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Bảo Vệ Toàn Diện Rủi Ro</h1>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8 max-w-xl">
            Chỉ với $49, bạn hoàn toàn an tâm trải nghiệm tai nghe trong 2 năm kể cả trường hợp rơi vỡ, nứt gãy cơ học hoặc vô nước ngoài ý muốn.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs text-slate-300">
            <div class="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div class="font-bold text-white mb-1">Rơi vỡ & Cấn móp</div>
              <div>Đổi mới linh kiện hoặc đổi mới nguyên chiếc trong ngày.</div>
            </div>
            <div class="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div class="font-bold text-white mb-1">Thiệt hại do chất lỏng</div>
              <div>Bảo vệ toàn diện kể cả khi gặp mưa lớn hoặc đổ nước.</div>
            </div>
            <div class="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div class="font-bold text-white mb-1">Hỗ trợ kỹ thuật 24/7</div>
              <div>Đường dây nóng độc quyền ưu tiên xử lý trong 15 phút.</div>
            </div>
          </div>

          <a href="#/checkout" class="px-8 py-3.5 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-purple-500/25 inline-flex items-center space-x-2">
            <span>Kèm gói Care+ vào đơn hàng • $49</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </section>
    `;
  }

  // 13. About AURA Page
  function renderAboutPage() {
    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-6 py-12">
        <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ About AURA ]</span>
        <h1 class="font-heading text-4xl font-bold text-white mt-2 mb-6">Phòng Thí Nghiệm Âm Học Thế Hệ Mới</h1>
        <div class="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            AURA ACOUSTICS LABS được thành lập với mục tiêu duy nhất: xóa bỏ ranh giới giữa tai nghe hi-fi phòng thu chuyên nghiệp và tai nghe không dây di động tiện lợi.
          </p>
          <p>
            Chúng tôi tin rằng âm thanh không gian không đơn thuần là một hiệu ứng phần mềm, mà là sự hòa quyện giữa cấu trúc vật lý của kim loại Magie siêu nhẹ, tốc độ truyền dẫn cơ học của màng loa Beryllium và thuật toán lấy mẫu thần kinh nhân tạo.
          </p>
        </div>
      </section>
    `;
  }

  // 14. FAQ Page (Interactive Categorized Accordion System)
  function renderFaqPage() {
    const faqData = [
      {
        cat: 'tech',
        q: 'Màng loa Pure Beryllium 45mm có ưu điểm gì so với Titanium thông thường?',
        a: 'Beryllium là kim loại siêu nhẹ với độ cứng gấp 4 lần thép và tốc độ truyền âm đạt 12,890 m/s (nhanh gấp 2.5 lần Titanium). Nhờ đó, màng loa triệt tiêu hoàn toàn hiện tượng uốn méo bề mặt, tái tạo dải cao lên đến 52kHz cực kỳ mượt mà, trong vắt mà không hề gây chói gắt.'
      },
      {
        cat: 'tech',
        q: 'AURA ONE cắm vào điện thoại hoặc laptop có cần mua thêm DAC/Amp rời không?',
        a: 'Hoàn toàn không cần! AURA ONE có trở kháng 32 Ohms và độ nhạy 108dB, được tối ưu để điện thoại iPhone, Android, iPad và PC kéo mượt mà ở mức âm lượng lớn. Bên trong tai nghe đã tích hợp sẵn Dual-DSP DAC 32-bit/192kHz.'
      },
      {
        cat: 'order',
        q: 'Chính sách 30 ngày dùng thử miễn phí tại nhà hoạt động như thế nào?',
        a: 'Quý khách có trọn vẹn 30 ngày trải nghiệm sản phẩm trong không gian quen thuộc của mình. Nếu không hoàn toàn hài lòng với chất âm hoặc độ thoải mái vì bất kỳ lý do gì, AURA sẽ cử nhân viên White Glove đến thu hồi tận nơi và hoàn tiền 100% không phát sinh chi phí.'
      },
      {
        cat: 'order',
        q: 'Thời gian giao hàng hỏa tốc mất bao lâu?',
        a: 'Đối với khu vực nội thành Hà Nội và TP. Hồ Chí Minh, đơn hàng được giao hỏa tốc tận tay trong vòng 2 GIỜ. Đối với các tỉnh thành khác trên toàn quốc, thời gian giao hàng từ 24 - 48 giờ với bảo hiểm hàng hóa nguyên đai nguyên kiện 100%.'
      },
      {
        cat: 'warranty',
        q: 'Chính sách bảo hành 36 tháng 1-đổi-1 được áp dụng ra sao?',
        a: 'Mỗi tai nghe AURA ONE đều được cấp chứng thư số và mã Serial điện tử bảo hành toàn cầu trong 36 tháng. Nếu phát sinh bất kỳ lỗi phần cứng nào từ nhà sản xuất (màng loa, chip DSP, pin, kết nối), chúng tôi sẽ đổi ngay 1 máy mới nguyên seal tận nhà quý khách.'
      },
      {
        cat: 'warranty',
        q: 'Khắc tên laser 3D cá nhân hóa có tính thêm phí không?',
        a: 'Dịch vụ khắc tên laser 3D vi mô hoàn toàn MIỄN PHÍ 100%! Bạn có thể tùy chọn khắc họ tên, ngày kỷ niệm hoặc chữ ký nghệ thuật trực tiếp tại xưởng Studio 3D trước khi xuất xưởng.'
      }
    ];

    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
            <span>TRUNG TÂM GIẢI ĐÁP & HỖ TRỢ KỸ THUẬT</span>
          </div>
          <h1 class="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Câu Hỏi Thường Gặp</h1>
          <p class="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
            Tra cứu nhanh các thông tin về công nghệ âm học Beryllium, phương thức thanh toán, chính sách đổi trả và chế độ bảo hành toàn cầu.
          </p>

          <!-- Search Input -->
          <div class="mt-6 relative max-w-md mx-auto">
            <input type="text" id="faq-search-input" placeholder="Tìm kiếm câu hỏi (vd: bọc màng loa, DAC, bảo hành, ship)..." class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500" />
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
          </div>

          <!-- Category Filters -->
          <div class="flex items-center justify-center flex-wrap gap-2 mt-6 text-xs font-mono">
            <button class="faq-filter-btn px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold transition-all" data-cat="all">TẤT CẢ CÂU HỎI</button>
            <button class="faq-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all" data-cat="tech">KỸ THUẬT ÂM HỌC</button>
            <button class="faq-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all" data-cat="order">GIAO HÀNG & DÙNG THỬ</button>
            <button class="faq-filter-btn px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-all" data-cat="warranty">BẢO HÀNH & KHẮC TÊN</button>
          </div>
        </div>

        <!-- Accordion Items Container -->
        <div class="space-y-3.5" id="faq-accordion-list">
          ${faqData.map((item, idx) => `
            <div class="faq-item glass-panel rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all overflow-hidden" data-cat="${item.cat}">
              <button class="faq-toggle-btn w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-white">
                <span>${item.q}</span>
                <i data-lucide="chevron-down" class="faq-icon w-4 h-4 text-cyan-400 transition-transform duration-300 flex-shrink-0"></i>
              </button>
              <div class="faq-answer px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 hidden">
                ${item.a}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Concierge AI Banner -->
        <div class="mt-12 p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-black to-emerald-950/40 border border-emerald-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3.5">
            <div class="w-10 h-10 rounded-2xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <i data-lucide="bot" class="w-5 h-5 text-emerald-400"></i>
            </div>
            <div>
              <div class="text-sm font-bold text-white">Vẫn còn thắc mắc chưa được giải đáp?</div>
              <div class="text-xs text-slate-400">Trò chuyện trực tiếp cùng Chuyên Gia AURA AI phản hồi trong 0.3 giây.</div>
            </div>
          </div>
          <button id="faq-open-ai-btn" class="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold font-mono text-xs uppercase transition-all shadow-md shadow-emerald-400/20 whitespace-nowrap">
            HỎI CHUYÊN GIA AI NGAY
          </button>
        </div>
      </section>
    `;

    // FAQ Event Listeners
    document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        const item = btn.closest('.faq-item');
        const ans = item?.querySelector('.faq-answer');
        const ic = btn.querySelector('.faq-icon');
        const isHidden = ans?.classList.contains('hidden');

        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (isHidden) {
          ans?.classList.remove('hidden');
          ic?.classList.add('rotate-180');
        }
      });
    });

    // Category filter
    document.querySelectorAll('.faq-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playUiClickSfx();
        const cat = btn.getAttribute('data-cat');
        document.querySelectorAll('.faq-filter-btn').forEach(b => {
          b.classList.remove('bg-cyan-400', 'text-black', 'font-bold');
          b.classList.add('text-slate-300', 'bg-white/5', 'border', 'border-white/10');
        });
        btn.classList.add('bg-cyan-400', 'text-black', 'font-bold');
        btn.classList.remove('text-slate-300', 'bg-white/5');

        document.querySelectorAll('.faq-item').forEach(it => {
          if (cat === 'all' || it.getAttribute('data-cat') === cat) {
            it.classList.remove('hidden');
          } else {
            it.classList.add('hidden');
          }
        });
      });
    });

    // Search filter
    document.getElementById('faq-search-input')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach(it => {
        const text = it.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          it.classList.remove('hidden');
        } else {
          it.classList.add('hidden');
        }
      });
    });

    // Open Concierge button
    document.getElementById('faq-open-ai-btn')?.addEventListener('click', () => {
      if (typeof openConcierge === 'function') openConcierge();
      else document.getElementById('concierge-modal')?.classList.remove('hidden');
    });

    refreshIcons();
  }

  // 15. Overview Page (Acoustic Monolith Flagship Presentation)
  function renderOverviewPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          <!-- Left Column: Editorial Presentation -->
          <div class="lg:col-span-6 z-10 space-y-8">
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>AURA ONE • FLAGSHIP ACOUSTIC MONOLITH</span>
            </div>
            
            <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Kiến Trúc Âm Học <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Tinh Hoa & Điêu Khắc Tương Lai
              </span>
            </h1>

            <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Tuyệt tác tai nghe không dây Planar Magnetic kết hợp vật liệu Titanium Grade-5 hàng không vũ trụ và thuật toán không gian 8D thời gian thực. Được sinh ra từ giao điểm giữa nghệ thuật điêu khắc siêu thực và công nghệ âm học tối thượng.
            </p>

            <!-- 4 Architectural Pillars Grid -->
            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
                <div class="text-xs font-mono text-cyan-400 mb-1">01 / DRIVER</div>
                <div class="text-sm font-bold text-white mb-1">Beryllium Ribbon 40mm</div>
                <div class="text-[11px] text-slate-400">4Hz – 52kHz • THD &lt; 0.03%</div>
              </div>
              <div class="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
                <div class="text-xs font-mono text-cyan-400 mb-1">02 / STRUCTURE</div>
                <div class="text-sm font-bold text-white mb-1">Titanium Grade-5</div>
                <div class="text-[11px] text-slate-400">Trọng lượng siêu nhẹ 290g</div>
              </div>
              <div class="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
                <div class="text-xs font-mono text-cyan-400 mb-1">03 / NOISE CANCEL</div>
                <div class="text-sm font-bold text-white mb-1">Neural Hybrid ANC</div>
                <div class="text-[11px] text-slate-400">Khử ồn sâu 45dB • 8 MEMS Mic</div>
              </div>
              <div class="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
                <div class="text-xs font-mono text-cyan-400 mb-1">04 / SPATIAL</div>
                <div class="text-sm font-bold text-white mb-1">360° Head Tracking</div>
                <div class="text-[11px] text-slate-400">Cảm biến 9-Axis IMU 1000Hz</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-4 pt-4">
              <a href="#/anatomy" class="px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-400/25 flex items-center space-x-2">
                <i data-lucide="layers" class="w-4 h-4"></i>
                <span>Khám Phá Giải Phẫu 3D</span>
              </a>
              <a href="#/studio" class="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase border border-white/15 transition-all flex items-center space-x-2">
                <i data-lucide="palette" class="w-4 h-4"></i>
                <span>Tùy Biến Studio</span>
              </a>
              <a href="#/checkout" class="px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-cyan-300 font-medium text-xs tracking-wider uppercase border border-cyan-500/30 transition-all flex items-center space-x-2">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                <span>Đặt Mua $399</span>
              </a>
            </div>
          </div>

          <!-- Right Column: 3D Studio Space Info -->
          <div class="lg:col-span-6 pointer-events-none flex justify-center items-center h-[480px]">
            <div class="glass-panel p-5 rounded-3xl border border-cyan-500/20 backdrop-blur-md self-end pointer-events-auto">
              <div class="flex items-center space-x-3 text-xs">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-white font-mono uppercase tracking-wider">3D Real-time Model Active</span>
                <span class="text-slate-400 font-mono text-[10px]">Kéo chuột xoay 360°</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    refreshIcons();
  }

  // 16. ANC Lab Page (Active Noise Cancellation Interactive Studio)
  let ancAnimFrame = null;
  function renderAncPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 py-12">
        <!-- Header -->
        <div class="max-w-3xl mb-10">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>AURA NEURAL HYBRID ANC MATRIX • PHÒNG THÍ NGHIỆM KHỬ ỒN</span>
          </div>
          <h1 class="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">
            Triệt Tiêu Âm Thanh Ngoại Cảnh <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Đến Tận Cùng Yên Lặng (-45dB)
            </span>
          </h1>
          <p class="text-sm text-slate-300 leading-relaxed font-light">
            Sử dụng mạng nơ-ron phân tích âm thanh môi trường với tần suất 32.000 lần mỗi giây, hệ thống phát sóng nghịch đảo pha siêu vi sai để triệt tiêu tiếng ồn trước khi nó chạm tới màng nhĩ của bạn.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: Interactive ANC Controls & Mode Matrix -->
          <div class="lg:col-span-6 space-y-6">
            <!-- Mode Selector Cards -->
            <div class="space-y-3" id="anc-mode-container">
              <div class="anc-card p-5 rounded-2xl glass-panel border border-cyan-500/50 bg-cyan-500/10 cursor-pointer transition-all" data-anc-mode="deep">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-xs">01</div>
                    <div class="text-sm font-bold text-white">Deep Space Silence (-45dB)</div>
                  </div>
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold">ĐANG BẬT</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed pl-11">
                  Triệt tiêu tối đa tiếng gầm rú động cơ phản lực, rung chấn tàu hỏa và điều hòa trung tâm. Tạo nên một ốc đảo tĩnh lặng tuyệt đối cho tâm trí.
                </p>
              </div>

              <div class="anc-card p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 cursor-pointer transition-all" data-anc-mode="adaptive">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center font-bold text-xs">02</div>
                    <div class="text-sm font-bold text-white">Adaptive City (-32dB)</div>
                  </div>
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400">CHỌN</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed pl-11">
                  Cân bằng thông minh giữa khử ồn đường phố và bảo vệ an toàn: lọc tạp âm liên tục nhưng giữ nguyên âm thanh còi xe và còi báo động.
                </p>
              </div>

              <div class="anc-card p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 cursor-pointer transition-all" data-anc-mode="transparency">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center font-bold text-xs">03</div>
                    <div class="text-sm font-bold text-white">Aura Voice Transparency</div>
                  </div>
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400">CHỌN</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed pl-11">
                  Kích hoạt 8 microphone siêu nhạy truyền âm thanh đàm thoại tự nhiên với độ trễ cực thấp 1.2ms, trò chuyện thông suốt mà không cần tháo tai nghe.
                </p>
              </div>

              <div class="anc-card p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 cursor-pointer transition-all" data-anc-mode="wind">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center font-bold text-xs">04</div>
                    <div class="text-sm font-bold text-white">Wind Shield Matrix</div>
                  </div>
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400">CHỌN</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed pl-11">
                  Buồng khí động học và màng lọc gió vật lý kết hợp giải thuật DSP loại bỏ hoàn toàn tiếng rít luồng gió khi chạy bộ hoặc đi tàu cao tốc.
                </p>
              </div>
            </div>

            <!-- Frequency & Noise Adjustment Controls -->
            <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <div class="flex justify-between items-center text-xs">
                <span class="text-white font-medium">Tần Số Tiếng Ồn Ngoại Cảnh: <span id="anc-freq-val" class="text-cyan-400 font-mono">120 Hz</span></span>
                <span class="text-slate-400 font-mono text-[11px]">(Low-Frequency Rumble)</span>
              </div>
              <input type="range" id="anc-freq-slider" min="30" max="1200" value="120" class="w-full accent-cyan-400 h-1.5 bg-white/10 rounded-lg cursor-pointer" />

              <div class="flex justify-between items-center text-xs pt-2">
                <span class="text-white font-medium">Cường Độ Âm Ồn: <span id="anc-gain-val" class="text-cyan-400 font-mono">85 dB</span></span>
                <span class="text-slate-400 font-mono text-[11px]">(Aircraft Cabin Level)</span>
              </div>
              <input type="range" id="anc-gain-slider" min="30" max="95" value="85" class="w-full accent-cyan-400 h-1.5 bg-white/10 rounded-lg cursor-pointer" />
            </div>
          </div>

          <!-- Right: Real-time Waveform Canvas & Technical Visualization -->
          <div class="lg:col-span-6 space-y-6">
            <div class="glass-panel p-6 rounded-3xl border border-cyan-500/20 backdrop-blur-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center space-x-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">Mô Phỏng Sóng Âm Nghịch Đảo (Anti-Phase Cancellation)</span>
                </div>
                <span id="anc-efficiency-badge" class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">99.7% KHỬ HOÀN TOÀN</span>
              </div>

              <!-- Canvas element -->
              <div class="relative bg-black/60 rounded-2xl p-3 border border-white/10 overflow-hidden">
                <canvas id="anc-waveform-canvas" width="600" height="240" class="w-full h-56 block"></canvas>
                <div class="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono">
                  <span class="text-rose-400 flex items-center space-x-1">
                    <span class="w-2 h-0.5 bg-rose-400 inline-block"></span>
                    <span>Tạp âm bên ngoài</span>
                  </span>
                  <span class="text-cyan-400 flex items-center space-x-1">
                    <span class="w-2 h-0.5 bg-cyan-400 inline-block"></span>
                    <span>Xung đối pha AURA</span>
                  </span>
                  <span class="text-emerald-400 flex items-center space-x-1">
                    <span class="w-2 h-0.5 bg-emerald-400 inline-block"></span>
                    <span>Âm sau triệt tiêu</span>
                  </span>
                </div>
              </div>

              <!-- Live Metrics -->
              <div class="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
                <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-[10px] text-slate-400">ĐỘ TRỄ PHẢN HỒI</div>
                  <div class="text-sm font-bold text-cyan-400 mt-0.5">&lt; 4.8 μs</div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-[10px] text-slate-400">TẦN SUẤT QUÉT</div>
                  <div class="text-sm font-bold text-white mt-0.5">32,000 Hz</div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-[10px] text-slate-400">MẢNG MICRO MEMS</div>
                  <div class="text-sm font-bold text-white mt-0.5">8 Micro</div>
                </div>
              </div>

              <div class="pt-2 flex justify-between items-center text-xs">
                <span class="text-slate-400">Trải nghiệm âm trường tĩnh lặng ngay tại gia đình:</span>
                <a href="#/checkout" class="px-5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-all">
                  Đặt Mua AURA ONE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    initAncSimulation();
    refreshIcons();
  }

  function initAncSimulation() {
    const canvas = document.getElementById('anc-waveform-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let freqMultiplier = 1;
    let noiseAmplitude = 35;

    const freqSlider = document.getElementById('anc-freq-slider');
    const freqVal = document.getElementById('anc-freq-val');
    const gainSlider = document.getElementById('anc-gain-slider');
    const gainVal = document.getElementById('anc-gain-val');

    freqSlider?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      if (freqVal) freqVal.textContent = v + ' Hz';
      freqMultiplier = v / 120;
    });

    gainSlider?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      if (gainVal) gainVal.textContent = v + ' dB';
      noiseAmplitude = (v / 90) * 45;
    });

    document.querySelectorAll('#anc-mode-container .anc-card').forEach(card => {
      card.addEventListener('click', () => {
        playUiClickSfx();
        document.querySelectorAll('#anc-mode-container .anc-card').forEach(c => {
          c.classList.remove('border-cyan-500/50', 'bg-cyan-500/10');
          c.classList.add('border-white/10');
          const badge = c.querySelector('span.font-mono');
          if (badge) {
            badge.className = 'text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400';
            badge.textContent = 'CHỌN';
          }
        });
        card.classList.remove('border-white/10');
        card.classList.add('border-cyan-500/50', 'bg-cyan-500/10');
        const activeBadge = card.querySelector('span.font-mono');
        if (activeBadge) {
          activeBadge.className = 'text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold';
          activeBadge.textContent = 'ĐANG BẬT';
        }
        const mode = card.getAttribute('data-anc-mode');
        const badgeElem = document.getElementById('anc-efficiency-badge');
        if (badgeElem) {
          if (mode === 'deep') badgeElem.textContent = '99.7% KHỬ HOÀN TOÀN (-45dB)';
          else if (mode === 'adaptive') badgeElem.textContent = 'THÍCH ỨNG ĐÔ THỊ (-32dB)';
          else if (mode === 'transparency') badgeElem.textContent = 'XUYÊN ÂM TỰ NHIÊN (1.2ms)';
          else badgeElem.textContent = 'KHỬ TIẾNG RÍT GIÓ V3';
        }
      });
    });

    function drawWave() {
      if (state.currentRoute !== '#/anc') {
        if (ancAnimFrame) cancelAnimationFrame(ancAnimFrame);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Draw Center Axis
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      time += 0.04;

      // 1. External Noise Wave (Rose/Red)
      ctx.beginPath();
      ctx.strokeStyle = '#fb7185';
      ctx.lineWidth = 2.2;
      for (let x = 0; x < w; x++) {
        const y = midY + Math.sin((x * 0.02 * freqMultiplier) + time) * noiseAmplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Anti-Phase Wave (Cyan)
      ctx.beginPath();
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.2;
      for (let x = 0; x < w; x++) {
        const y = midY - Math.sin((x * 0.02 * freqMultiplier) + time) * noiseAmplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Resulting Residual Wave (Emerald/White silent line)
      ctx.beginPath();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < w; x++) {
        const y = midY + Math.sin(x * 0.05 + time * 2) * 1.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ancAnimFrame = requestAnimationFrame(drawWave);
    }

    drawWave();
  }

  // 17. Order Confirmation Page (Post-Checkout Success & Onboarding)
  function renderOrderConfirmationPage(orderId) {
    mainContainer.innerHTML = `
      <section class="max-w-3xl mx-auto px-6 py-12">
        <!-- Success Celebration Card -->
        <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 text-center space-y-6 relative overflow-hidden">
          <div class="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-0.5 mx-auto">
            <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
              <i data-lucide="check" class="w-8 h-8 text-cyan-400"></i>
            </div>
          </div>

          <div>
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ GIAO DỊCH ĐÃ ĐƯỢC ỦY QUYỀN THÀNH CÔNG ]</span>
            <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
              Chào Mừng Bạn Đến Với Vũ Trụ AURA
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
              Cảm ơn quý khách đã tin tưởng và lựa chọn tuyệt tác AURA ONE Master Edition. Nghệ nhân âm học của chúng tôi đang tiến hành hiệu chuẩn thiết bị dành riêng cho bạn.
            </p>
          </div>

          <!-- Order Summary Badge -->
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto flex items-center justify-between font-mono text-xs">
            <div class="text-left">
              <div class="text-slate-400 text-[10px]">MÃ ĐƠN HÀNG CHÍNH THỨC</div>
              <div class="text-cyan-400 font-bold text-sm tracking-wider" id="confirmed-order-id">#${orderId}</div>
            </div>
            <button id="copy-order-btn" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] transition-all flex items-center space-x-1.5">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Sao Chép</span>
            </button>
          </div>

          <!-- Step Progression Timeline -->
          <div class="pt-4 border-t border-white/10 text-left">
            <div class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">Lộ Trình Xử Lý Đơn Hàng Của Bạn:</div>
            <div class="space-y-4 text-xs">
              <div class="flex items-start space-x-3.5">
                <div class="w-6 h-6 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-[11px] mt-0.5">✓</div>
                <div>
                  <div class="text-white font-semibold">1. Tiếp nhận & Ủy quyền thanh toán bảo mật</div>
                  <div class="text-[11px] text-slate-400">Hệ thống đã mã hóa hóa đơn điện tử và gửi email xác nhận.</div>
                </div>
              </div>
              <div class="flex items-start space-x-3.5">
                <div class="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400 flex items-center justify-center font-bold text-[11px] mt-0.5 animate-pulse">2</div>
                <div>
                  <div class="text-white font-semibold">2. Khắc Laser nghệ thuật & Kiểm định âm học Cleanroom</div>
                  <div class="text-[11px] text-slate-400">Kỹ thuật viên đang cân chỉnh màng loa Beryllium cá nhân hóa (4Hz - 52kHz).</div>
                </div>
              </div>
              <div class="flex items-start space-x-3.5">
                <div class="w-6 h-6 rounded-full bg-white/10 text-slate-400 flex items-center justify-center font-bold text-[11px] mt-0.5">3</div>
                <div>
                  <div class="text-slate-300 font-semibold">3. Đóng gói bảo mật & Giao hàng Hỏa Tốc Quốc Tế</div>
                  <div class="text-[11px] text-slate-500">Dự kiến bàn giao đơn vị vận chuyển hàng không trong 24 giờ.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-3">
            <a href="#/order-tracking?id=${orderId}" class="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center space-x-2">
              <i data-lucide="truck" class="w-4 h-4"></i>
              <span>Theo Dõi Hành Trình Đơn</span>
            </a>
            <button id="download-receipt-btn" class="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs tracking-wider uppercase border border-white/15 transition-all flex items-center space-x-2">
              <i data-lucide="file-text" class="w-4 h-4"></i>
              <span>Tải Hóa Đơn VAT (PDF)</span>
            </button>
            <a href="#/manual" class="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 font-medium text-xs tracking-wider uppercase border border-cyan-500/20 transition-all flex items-center space-x-2">
              <i data-lucide="book-open" class="w-4 h-4"></i>
              <span>Cẩm Nang Sử Dụng</span>
            </a>
          </div>
        </div>
      </section>
    `;

    document.getElementById('copy-order-btn')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(orderId);
      showToast('Đã sao chép mã đơn hàng #' + orderId);
    });

    document.getElementById('download-receipt-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      showToast('Đã tạo hóa đơn điện tử AURA-RECEIPT-' + orderId + '.pdf');
    });

    refreshIcons();
  }

  // 18. Product Registration & VIP Holographic Certificate Page
  function renderRegisterPage() {
    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-6 py-12">
        <div class="max-w-2xl mb-8">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ AURA CONCIERGE ]</span>
          <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">
            Đăng Ký Sở Hữu & Chứng Thư Số VIP
          </h1>
          <p class="text-xs text-slate-400 leading-relaxed">
            Kích hoạt gói dịch vụ chăm sóc đặc quyền AURA Concierge 24/7 và nhận chứng chỉ số Holographic Certificate được ký số độc quyền.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: Registration Form -->
          <div class="lg:col-span-7">
            <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Họ và Tên Chủ Sở Hữu *</label>
                <input type="text" id="reg-name" placeholder="Nguyễn Văn A" class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-xs text-white focus:border-cyan-400" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Số Điện Thoại *</label>
                  <input type="tel" id="reg-phone" placeholder="0901 234 567" class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-xs text-white focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Email Nhận Chứng Chỉ *</label>
                  <input type="email" id="reg-email" placeholder="owner@aurasound.com" class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-xs text-white focus:border-cyan-400" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Số Serial Tai Nghe (SN) *</label>
                <div class="flex gap-2">
                  <input type="text" id="reg-sn" value="SN-AURA-88291" class="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-xs text-cyan-400 font-mono font-bold focus:border-cyan-400 uppercase" />
                  <button id="reg-gen-sn" class="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono">Ngẫu Nhiên</button>
                </div>
                <p class="text-[10px] text-slate-500 mt-1 font-mono">In laser trực tiếp tại khớp nối bên trong headband.</p>
              </div>
              <button id="reg-submit-btn" class="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-cyan-400/20">
                Kích Hoạt Chứng Nhận Số Ngay
              </button>
            </div>
          </div>

          <!-- Right: Interactive Holographic Ownership Card -->
          <div class="lg:col-span-5">
            <div id="hologram-card" class="glass-panel p-6 rounded-3xl border border-cyan-500/40 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-cyan-950/40 to-black space-y-4 shadow-2xl">
              <div class="flex justify-between items-start">
                <div class="flex items-center space-x-2">
                  <div class="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold text-xs">A</div>
                  <span class="font-heading text-sm font-bold text-white tracking-wider">AURA VIP PASS</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">LIFETIME VALID</span>
              </div>

              <div class="py-4">
                <div class="text-[10px] font-mono text-slate-400 uppercase">CHỦ SỞ HỮU ĐƯỢC CHỨNG THỰC</div>
                <div class="text-base font-bold text-white" id="card-owner-name">NGUYỄN VĂN A</div>
                <div class="text-xs font-mono text-cyan-400 mt-1" id="card-sn">SN-AURA-88291</div>
              </div>

              <div class="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <div>
                  <span>BẢO HÀNH: </span>
                  <span class="text-white">24 THÁNG 1 ĐỔI 1</span>
                </div>
                <div>
                  <span>CONCIERGE: </span>
                  <span class="text-cyan-400">24/7 PRIORITY</span>
                </div>
              </div>
            </div>

            <!-- Privileges List -->
            <div class="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div class="text-slate-300 font-semibold mb-1">Đặc Quyền Hội Viên AURA:</div>
              <div class="text-slate-400 flex items-center space-x-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span>Miễn phí thay đệm da cừu 01 lần/năm</span>
              </div>
              <div class="text-slate-400 flex items-center space-x-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span>Mời tham dự sự kiện ra mắt âm thanh thường niên</span>
              </div>
              <div class="text-slate-400 flex items-center space-x-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span>Kỹ sư âm học hỗ trợ cân chỉnh EQ riêng biệt</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('reg-gen-sn')?.addEventListener('click', () => {
      const randomSn = 'SN-AURA-' + Math.floor(10000 + Math.random() * 90000);
      const snElem = document.getElementById('reg-sn');
      const cardSn = document.getElementById('card-sn');
      if (snElem) snElem.value = randomSn;
      if (cardSn) cardSn.textContent = randomSn;
    });

    document.getElementById('reg-submit-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      const name = document.getElementById('reg-name')?.value || 'NGUYỄN VĂN A';
      const sn = document.getElementById('reg-sn')?.value || 'SN-AURA-88291';
      const cardName = document.getElementById('card-owner-name');
      const cardSn = document.getElementById('card-sn');
      if (cardName) cardName.textContent = name.toUpperCase();
      if (cardSn) cardSn.textContent = sn;
      showToast('Kích hoạt chứng thư số AURA VIP thành công!');
    });

    refreshIcons();
  }

  // 19. User Manual & Guide Page
  function renderManualPage() {
    mainContainer.innerHTML = `
      <section class="max-w-5xl mx-auto px-6 py-12">
        <div class="max-w-2xl mb-8">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ AURA DOCUMENTATION ]</span>
          <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">
            Cẩm Nang Hướng Dẫn Sử Dụng
          </h1>
          <p class="text-xs text-slate-400 leading-relaxed">
            Mọi thao tác cử chỉ cảm ứng, thiết lập kết nối đa điểm và phương pháp bảo quản tai nghe AURA ONE đúng chuẩn chuyên gia âm học.
          </p>
        </div>

        <!-- 4 Structured Interactive Guide Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1: Touch Gestures -->
          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 hover:border-cyan-500/30 transition-all">
            <div class="flex items-center space-x-3 text-cyan-400">
              <div class="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                <i data-lucide="hand" class="w-5 h-5"></i>
              </div>
              <h3 class="font-heading text-base font-bold text-white">01. Cử Chỉ Cảm Ứng (Earcup Phải)</h3>
            </div>
            <div class="space-y-2.5 text-xs text-slate-300">
              <div class="flex justify-between py-1.5 border-b border-white/5">
                <span class="text-slate-400">Vuốt lên / xuống</span>
                <span class="font-semibold text-white">Tăng / Giảm âm lượng</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-white/5">
                <span class="text-slate-400">Vuốt về phía trước</span>
                <span class="font-semibold text-white">Chuyển bài tiếp theo</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-white/5">
                <span class="text-slate-400">Vuốt về phía sau</span>
                <span class="font-semibold text-white">Quay lại bài trước</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-white/5">
                <span class="text-slate-400">Chạm đúp (Double Tap)</span>
                <span class="font-semibold text-white">Phát / Tạm dừng / Nhận cuộc gọi</span>
              </div>
              <div class="flex justify-between py-1.5">
                <span class="text-slate-400">Chạm giữ 1.5 giây</span>
                <span class="font-semibold text-cyan-400">Đổi chế độ ANC / Xuyên âm</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Connectivity -->
          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 hover:border-cyan-500/30 transition-all">
            <div class="flex items-center space-x-3 text-cyan-400">
              <div class="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                <i data-lucide="bluetooth" class="w-5 h-5"></i>
              </div>
              <h3 class="font-heading text-base font-bold text-white">02. Kết Nối Đa Thiết Bị</h3>
            </div>
            <div class="space-y-2.5 text-xs text-slate-300">
              <div class="p-3 rounded-xl bg-black/40 border border-white/10">
                <div class="font-semibold text-white mb-1">Ghép Nối Nhanh (Fast Pairing):</div>
                <p class="text-[11px] text-slate-400">Nhấn giữ nút nguồn 3 giây cho đến khi đèn LED nhấp nháy màu Cyan. Tìm kiếm "AURA ONE" trên điện thoại hoặc máy tính.</p>
              </div>
              <div class="p-3 rounded-xl bg-black/40 border border-white/10">
                <div class="font-semibold text-white mb-1">Bluetooth Multipoint:</div>
                <p class="text-[11px] text-slate-400">Tai nghe tự động chuyển đổi thông minh giữa Laptop (nghe nhạc) và Điện thoại (nhận cuộc gọi) không cần ngắt kết nối.</p>
              </div>
            </div>
          </div>

          <!-- Card 3: Acoustic Burn-in -->
          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 hover:border-cyan-500/30 transition-all">
            <div class="flex items-center space-x-3 text-cyan-400">
              <div class="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                <i data-lucide="activity" class="w-5 h-5"></i>
              </div>
              <h3 class="font-heading text-base font-bold text-white">03. Khuyến Nghị Chạy Rà (Burn-in)</h3>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Màng loa hợp kim Beryllium siêu mỏng đạt độ giãn nở và đàn hồi cơ học tối ưu sau khoảng <strong class="text-white">20 đến 40 giờ phát nhạc liên tục</strong> ở mức âm lượng 50-60%.
            </p>
            <div class="text-xs text-cyan-400 font-mono">
              → Dải trầm sẽ trở nên sâu và kiểm soát chặt chẽ hơn, dải cao mượt mà không bị chói gắt.
            </div>
          </div>

          <!-- Card 4: Care & Maintenance -->
          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 hover:border-cyan-500/30 transition-all">
            <div class="flex items-center space-x-3 text-cyan-400">
              <div class="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                <i data-lucide="shield" class="w-5 h-5"></i>
              </div>
              <h3 class="font-heading text-base font-bold text-white">04. Tháo Lắp & Bảo Quản Da Thật</h3>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Đệm tai gắn bằng nam châm từ tính Neodymium: chỉ cần kéo nhẹ để tháo rời vệ sinh. Lau nhẹ bề mặt da cừu bằng khăn microfiber ẩm, tránh dung môi có cồn.
            </p>
            <div class="text-[11px] text-slate-400 flex items-center space-x-1.5">
              <i data-lucide="info" class="w-3.5 h-3.5 text-cyan-400"></i>
              <span>Bảo quản trong hộp chống sốc carbon khi di chuyển đường dài.</span>
            </div>
          </div>
        </div>
      </section>
    `;
    refreshIcons();
  }

  // 20. OTA Firmware Updates Studio
  function renderFirmwarePage() {
    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-6 py-12">
        <div class="max-w-2xl mb-8">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ OVER-THE-AIR FIRMWARE ENGINE ]</span>
          <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">
            Trạm Cập Nhật Firmware OTA
          </h1>
          <p class="text-xs text-slate-400 leading-relaxed">
            Nâng cấp giải thuật xử lý âm thanh số DSP và tối ưu hóa tính năng định vị không gian thời gian thực qua giao thức không dây bảo mật.
          </p>
        </div>

        <!-- Status & Update Trigger Panel -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div class="text-xs font-mono text-slate-400 uppercase">PHIÊN BẢN HIỆN TẠI TRÊN THIẾT BỊ</div>
              <div class="text-2xl font-heading font-bold text-white mt-1 flex items-center space-x-3">
                <span>AURA OS v2.4.1</span>
                <span class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">MỚI NHẤT</span>
              </div>
            </div>
            <button id="check-ota-btn" class="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-cyan-400/25 flex items-center space-x-2">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
              <span>Kiểm Tra Bản Cập Nhật</span>
            </button>
          </div>

          <!-- Simulated Progress Bar (hidden by default) -->
          <div id="ota-progress-box" class="hidden space-y-2">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-cyan-400" id="ota-status-text">Đang đồng bộ gói vi điều khiển qua Bluetooth...</span>
              <span class="text-white font-bold" id="ota-percent">0%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden">
              <div id="ota-progress-fill" class="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- Firmware Changelog History -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 class="font-heading text-lg font-bold text-white">Lịch Sử Nâng Cấp Firmware</h3>
          
          <div class="space-y-6 text-xs border-l-2 border-cyan-500/40 pl-6 ml-2">
            <div class="relative">
              <span class="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-cyan-400"></span>
              <div class="flex items-center space-x-2 mb-1">
                <span class="font-bold text-white text-sm">v2.4.1 (Bản Phát Hành Hiện Tại)</span>
                <span class="text-slate-500 font-mono">• 15/10/2026</span>
              </div>
              <ul class="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>Giảm độ trễ Bluetooth Ultra-Low Latency xuống mức kỷ lục 28ms cho chế độ Gaming & Studio Monitor.</li>
                <li>Tối ưu giải thuật Wind-Shield V3 giúp đàm thoại rõ ràng trong điều kiện gió cấp 6.</li>
                <li>Tăng tuổi thọ pin thêm 12% khi kích hoạt liên tục Dynamic Head Tracking 9-Axis.</li>
              </ul>
            </div>

            <div class="relative">
              <span class="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-slate-600"></span>
              <div class="flex items-center space-x-2 mb-1">
                <span class="font-bold text-slate-300 text-sm">v2.3.8</span>
                <span class="text-slate-500 font-mono">• 02/08/2026</span>
              </div>
              <ul class="list-disc list-inside text-slate-400 space-y-1 pl-1">
                <li>Bổ sung tính năng Equal Loudness Contour tự động bù dải âm trầm ở mức âm lượng thấp.</li>
                <li>Tương thích toàn diện chuẩn Sony 360 Reality Audio và Apple Spatial Audio.</li>
              </ul>
            </div>

            <div class="relative">
              <span class="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-slate-600"></span>
              <div class="flex items-center space-x-2 mb-1">
                <span class="font-bold text-slate-300 text-sm">v2.2.0</span>
                <span class="text-slate-500 font-mono">• 14/05/2026</span>
              </div>
              <ul class="list-disc list-inside text-slate-400 space-y-1 pl-1">
                <li>Kích hoạt hệ thống Equalizer 10 dải tần số tùy biến sâu trong AURA Sound App.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('check-ota-btn')?.addEventListener('click', () => {
      playUiClickSfx();
      const pBox = document.getElementById('ota-progress-box');
      const pFill = document.getElementById('ota-progress-fill');
      const pText = document.getElementById('ota-status-text');
      const pPercent = document.getElementById('ota-percent');
      pBox?.classList.remove('hidden');

      let current = 0;
      const interval = setInterval(() => {
        current += 20;
        if (current <= 100) {
          if (pFill) pFill.style.width = current + '%';
          if (pPercent) pPercent.textContent = current + '%';
          if (current === 40 && pText) pText.textContent = 'Đang kiểm tra gói vi điều khiển OTA...';
          if (current === 80 && pText) pText.textContent = 'Xác thực mã băm SHA-256 an toàn...';
          if (current === 100) {
            clearInterval(interval);
            if (pText) pText.textContent = 'Thiết bị của bạn đang ở phiên bản mới nhất v2.4.1!';
            showToast('Kiểm tra OTA hoàn tất: Thiết bị đang chạy phiên bản mới nhất!');
          }
        }
      }, 250);
    });

    refreshIcons();
  }

  // 21. Legal & Policies Portal (Warranty, Shipping, Returns, Privacy, Terms)
  function renderLegalPage(route) {
    const policies = {
      '#/warranty': {
        tag: 'AURA GUARANTEE',
        title: 'Chính Sách Bảo Hành Toàn Cầu 24 Tháng',
        subtitle: 'Cam kết 1 đổi 1 tận nơi trong 24 giờ cho mọi sản phẩm AURA ONE chính hãng.',
        sections: [
          {
            h: '1. Thời Hạn & Phạm Vi Bảo Hành',
            p: 'Mọi thiết bị AURA ONE được bảo hành chính hãng toàn cầu trong thời hạn 24 tháng kể từ ngày kích hoạt mã số Serial điện tử. Bảo hành bao gồm toàn bộ lỗi phần cứng phát sinh từ nhà sản xuất, bao gồm củ loa Ribbon Beryllium, mạch giải mã Dual-DSP, mảng micro MEMS khử ồn và mô-đun pin lithium-polymer.'
          },
          {
            h: '2. Chính Sách 1 Đổi 1 Tận Nơi',
            p: 'Tại Hà Nội, TP. Hồ Chí Minh và Đà Nẵng, kỹ thuật viên của AURA Concierge sẽ trực tiếp đến tận địa chỉ của quý khách trong vòng 24 giờ kể từ khi tiếp nhận yêu cầu để kiểm tra và bàn giao thiết bị thay thế mới 100% nếu phát sinh lỗi phần cứng.'
          },
          {
            h: '3. Bảo Dưỡng Da Cừu Miễn Phí',
            p: 'Trong thời gian 24 tháng bảo hành, quý khách được hưởng quyền lợi vệ sinh chuyên sâu và bảo dưỡng chất liệu da cừu non Lambskin miễn phí 01 lần/năm tại các showroom ủy quyền của AURA.'
          }
        ]
      },
      '#/shipping': {
        tag: 'EXPRESS LOGISTICS',
        title: 'Chính Sách Vận Chuyển Hỏa Tốc',
        subtitle: 'Bảo hiểm toàn diện 100% giá trị kiện hàng trên mọi hành trình giao nhận.',
        sections: [
          {
            h: '1. Giao Hàng Hỏa Tốc Trong Ngày',
            p: 'Đơn hàng đặt trước 14:00 tại khu vực nội thành Hà Nội & TP. Hồ Chí Minh sẽ được vận chuyển hỏa tốc bằng chuyên xe công nghệ cao trong vòng 4-6 giờ làm việc.'
          },
          {
            h: '2. Vận Chuyển Toàn Quốc & Quốc Tế',
            p: 'Đối với các tỉnh thành khác tại Việt Nam, thời gian giao hàng từ 24 - 48 giờ qua đường hàng không. Đối với các đơn hàng quốc tế (Mỹ, Nhật, Châu Âu), thời gian vận chuyển từ 3 - 5 ngày làm việc qua đối tác DHL Express.'
          },
          {
            h: '3. Quy Chuẩn Đóng Gói Chống Sốc Chuyên Dụng',
            p: 'Mỗi sản phẩm AURA ONE được niêm phong trong hộp bảo vệ gia cường sợi carbon đa lớp cùng túi hút ẩm kín khí và tem vỡ phản quang chống làm giả.'
          }
        ]
      },
      '#/returns': {
        tag: 'RISK-FREE TRIAL',
        title: 'Chính Sách Dùng Thử 30 Ngày & Hoàn Tiền',
        subtitle: 'Trải nghiệm chất âm audiophile đỉnh cao tại gia đình hoàn toàn không rủi ro.',
        sections: [
          {
            h: '1. 30 Ngày Dùng Thử Không Rủi Ro',
            p: 'Chúng tôi muốn bạn hoàn toàn hài lòng với trải nghiệm âm thanh của AURA ONE. Quý khách có quyền dùng thử sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng. Nếu cảm thấy chất âm hoặc cảm giác đeo không phù hợp với nhu cầu, bạn có thể hoàn trả sản phẩm và nhận lại 100% số tiền đã thanh toán.'
          },
          {
            h: '2. Điều Kiện Hoàn Trả',
            p: 'Tai nghe cần còn nguyên vẹn ngoại quan (không trầy xước va đập nặng) và đầy đủ phụ kiện, cáp kết nối, hộp đựng chính hãng đi kèm.'
          },
          {
            h: '3. Quy Trình Hoàn Tiền Siêu Tốc',
            p: 'Sau khi kiểm tra kiện hàng hoàn trả, AURA sẽ chuyển khoản hoàn tiền 100% trong vòng 24 giờ làm việc vào tài khoản ngân hàng của quý khách.'
          }
        ]
      },
      '#/privacy': {
        tag: 'DATA PROTECTION',
        title: 'Chính Sách Bảo Mật Dữ Liệu Âm Học',
        subtitle: 'Bảo vệ dữ liệu sinh trắc thính lực và hành vi nghe nhạc của bạn tuyệt đối an toàn.',
        sections: [
          {
            h: '1. Quyền Riêng Tư Của Dữ Liệu Âm Học',
            p: 'Hồ sơ thính lực cá nhân (AURA Sonic ID) và các thông số hiệu chỉnh Equalizer được lưu trữ mã hóa trực tiếp trên chip xử lý DSP cục bộ của tai nghe, hoàn toàn không tải lên máy chủ đám mây nếu không có sự đồng ý của người dùng.'
          },
          {
            h: '2. Không Thu Âm Trái Phép',
            p: 'Hệ thống 8 microphone MEMS chỉ phục vụ thuật toán khử ồn thời gian thực và xử lý đàm thoại khi có cuộc gọi. AURA cam kết không lưu trữ hoặc chia sẻ bất kỳ bản ghi âm nào.'
          },
          {
            h: '3. Tiêu Chuẩn Bảo Mật Chuẩn Châu Âu (GDPR)',
            p: 'Mọi thông tin thanh toán và đơn hàng được mã hóa chuẩn quân đội AES-256 bit và tuân thủ nghiêm ngặt các quy định bảo mật quốc tế.'
          }
        ]
      },
      '#/terms': {
        tag: 'LEGAL AGREEMENT',
        title: 'Điều Khoản Dịch Vụ Hệ Sinh Thái AURA',
        subtitle: 'Quy định sử dụng phần mềm, bản quyền sáng chế và quyền lợi khách hàng.',
        sections: [
          {
            h: '1. Bản Quyền Công Nghệ & Sở Hữu Trí Tuệ',
            p: 'Toàn bộ thiết kế công nghiệp, giải thuật khử ồn NeuroSound™, màng loa Beryllium Ribbon và kiến trúc âm học không gian 8D là tài sản sở hữu trí tuệ đã đăng ký bảo hộ của AURA Labs Inc.'
          },
          {
            h: '2. Giấy Phép Sử Dụng Firmware OTA',
            p: 'Người dùng được cấp quyền phi độc quyền sử dụng các bản cập nhật firmware OTA để tối ưu trải nghiệm âm thanh trên thiết bị AURA ONE của mình.'
          },
          {
            h: '3. Cam Kết Đồng Hành Cùng Audiophile',
            p: 'AURA cam kết hỗ trợ cập nhật phần mềm và cung ứng linh kiện thay thế chính hãng cho dòng sản phẩm AURA ONE trong tối thiểu 7 năm kể từ ngày ra mắt.'
          }
        ]
      }
    };

    const current = policies[route] || policies['#/warranty'];

    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-6 py-12">
        <div class="mb-8">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ ${current.tag} ]</span>
          <h1 class="font-heading text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">${current.title}</h1>
          <p class="text-xs sm:text-sm text-slate-300">${current.subtitle}</p>
        </div>

        <!-- Quick Switch Navigation Tabs -->
        <div class="flex flex-wrap gap-2 mb-8 pb-4 border-b border-white/10 text-xs font-mono">
          <a href="#/warranty" class="px-4 py-2 rounded-xl ${route === '#/warranty' ? 'bg-cyan-400 text-black font-bold' : 'bg-white/5 text-slate-300 hover:text-white'} transition-all">Bảo Hành 24T</a>
          <a href="#/shipping" class="px-4 py-2 rounded-xl ${route === '#/shipping' ? 'bg-cyan-400 text-black font-bold' : 'bg-white/5 text-slate-300 hover:text-white'} transition-all">Vận Chuyển Hỏa Tốc</a>
          <a href="#/returns" class="px-4 py-2 rounded-xl ${route === '#/returns' ? 'bg-cyan-400 text-black font-bold' : 'bg-white/5 text-slate-300 hover:text-white'} transition-all">Dùng Thử 30 Ngày</a>
          <a href="#/privacy" class="px-4 py-2 rounded-xl ${route === '#/privacy' ? 'bg-cyan-400 text-black font-bold' : 'bg-white/5 text-slate-300 hover:text-white'} transition-all">Bảo Mật Âm Học</a>
          <a href="#/terms" class="px-4 py-2 rounded-xl ${route === '#/terms' ? 'bg-cyan-400 text-black font-bold' : 'bg-white/5 text-slate-300 hover:text-white'} transition-all">Điều Khoản</a>
        </div>

        <!-- Content Body -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8 text-xs leading-relaxed text-slate-300">
          ${current.sections.map(sec => `
            <div class="space-y-2">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-300">${sec.h}</h3>
              <p class="text-slate-300 leading-relaxed font-light">${sec.p}</p>
            </div>
          `).join('')}

          <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div class="text-[11px] text-slate-400">
              Có câu hỏi cần hỗ trợ trực tiếp? Tổng đài VIP: <strong class="text-cyan-400 font-mono">1800-AURA-ONE</strong> (24/7)
            </div>
            <a href="#/" class="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all">
              Về Trang Chủ
            </a>
          </div>
        </div>
      </section>
    `;

    refreshIcons();
  }

  // Generic Subpage Fallback
  
  // ========================================================
  // AURA ONE USER SANCTUARY & ADVANCED COMMERCE SYSTEM (V5.6)
  // ========================================================

  // Header User Portal State Updater
  function updateHeaderAuthUI() {
    const authContainer = document.getElementById('header-auth-container');
    if (!authContainer) return;
    const user = window.AURA_AUTH ? window.AURA_AUTH.getCurrentUser() : null;

    if (user) {
      const initials = (user.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('');
      authContainer.innerHTML = `
        <div class="relative group" id="header-user-menu-wrapper">
          <button id="header-user-profile-btn" class="glass-button px-2.5 sm:px-3 py-1.5 rounded-full flex items-center space-x-2 border border-violet-400/40 hover:border-violet-400 shadow-[0_0_12px_rgba(121,40,202,0.25)] transition-all">
            <div class="relative w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center text-[10px] font-bold text-black border border-white/40">
              <span>${initials}</span>
              <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-black animate-pulse"></span>
            </div>
            <span class="text-xs font-mono font-bold text-white hidden md:inline truncate max-w-[100px]">${user.name.split(' ')[0]}</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200"></i>
          </button>

          <!-- Dropdown Menu -->
          <div class="absolute right-0 mt-2 w-56 rounded-2xl glass-panel p-2 border border-violet-500/30 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
            <div class="px-3 py-2 border-b border-white/10 mb-1">
              <div class="text-xs font-bold text-white truncate">${user.name}</div>
              <div class="text-[10px] font-mono text-cyan-400 truncate">${user.tier}</div>
            </div>
            <a href="#/dashboard" class="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-all">
              <i data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i>
              <span>Thánh Đường Cá Nhân</span>
            </a>
            <a href="#/dashboard?tab=gear" class="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-all">
              <i data-lucide="headphones" class="w-4 h-4 text-violet-400"></i>
              <span>Thiết Bị Của Tôi (3D)</span>
            </a>
            <a href="#/my-orders" class="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-all">
              <i data-lucide="package" class="w-4 h-4 text-amber-400"></i>
              <span>Đơn Hàng Của Tôi</span>
            </a>
            <a href="#/cart" class="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-all">
              <i data-lucide="shopping-cart" class="w-4 h-4 text-emerald-400"></i>
              <span>Giỏ Hàng AURA</span>
            </a>
            <div class="border-t border-white/10 my-1"></div>
            <button id="header-logout-btn" class="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 transition-all text-left">
              <i data-lucide="log-out" class="w-4 h-4 text-rose-400"></i>
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('header-logout-btn')?.addEventListener('click', () => {
        if (typeof playUiClickSfx === 'function') playUiClickSfx();
        window.AURA_AUTH.logout();
        updateHeaderAuthUI();
        showNotificationToast('Đã đăng xuất khỏi không gian cá nhân');
        window.location.hash = '#/';
      });
    } else {
      authContainer.innerHTML = `
        <a href="#/login" id="header-login-btn" class="interactive glass-button px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full flex items-center space-x-1.5 text-xs font-mono text-cyan-300 hover:text-white border border-cyan-400/30 hover:border-cyan-400 transition-all">
          <i data-lucide="user" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span class="hidden sm:inline font-semibold">ĐĂNG NHẬP</span>
        </a>
      `;
    }
    refreshIcons();
  }

  // 1. LOGIN VIEW (#/login)
  function renderLoginPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 min-h-[85vh] flex items-center justify-center py-12">
        <div class="w-full max-w-md relative z-10">
          <!-- Ambient Glow Backdrop -->
          <div class="absolute -top-16 -left-16 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-16 -right-16 w-56 h-56 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Glassmorphic Login Card -->
          <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-400/30 shadow-2xl relative overflow-hidden">
            <div class="text-center mb-8">
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>AURA IDENTITY PORTAL</span>
              </div>
              <h1 class="font-heading text-3xl font-extrabold text-white tracking-wide">Bước Vào Không Gian</h1>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Đăng nhập để kết nối bản sao số tai nghe 3D của bạn và kích hoạt kho preset âm thanh độc bản.
              </p>
            </div>

            <form id="aura-login-form" class="space-y-4" onsubmit="return false;">
              <!-- Email / Username Input -->
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>Email hoặc Mã AURA ID</span>
                  <i data-lucide="user" class="w-3.5 h-3.5 text-cyan-400"></i>
                </label>
                <input type="text" id="login-identifier" placeholder="an.nguyen@aura-one.audio hoặc AURA-8892" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" required />
              </div>

              <!-- Password Input with Toggle Eye -->
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>Mật Khẩu</span>
                  <button type="button" id="login-toggle-eye" class="text-slate-400 hover:text-cyan-400 transition-colors">
                    <i data-lucide="eye" id="login-eye-icon" class="w-3.5 h-3.5"></i>
                  </button>
                </label>
                <div class="relative">
                  <input type="password" id="login-password" placeholder="••••••••••••" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" required />
                </div>
              </div>

              <!-- Options: Remember & Forgot -->
              <div class="flex items-center justify-between text-xs pt-1">
                <label class="flex items-center space-x-2 text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" id="login-remember" checked class="accent-cyan-400 rounded cursor-pointer" />
                  <span class="text-[11px] font-mono">Ghi nhớ phiên</span>
                </label>
                <button type="button" id="login-forgot-btn" class="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                  Quên mật khẩu?
                </button>
              </div>

              <!-- Submit Button -->
              <div class="pt-3">
                <button type="submit" id="login-submit-btn" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-cyan-400/25 flex items-center justify-center space-x-2 group">
                  <span id="login-btn-text">TRUY CẬP KHÔNG GIAN CÁ NHÂN</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>

              <!-- 1-Click VIP Demo Login -->
              <div class="pt-2">
                <button type="button" id="login-demo-btn" class="w-full py-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 hover:text-white border border-violet-500/40 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all">
                  <i data-lucide="sparkles" class="w-4 h-4 text-violet-400"></i>
                  <span>ĐĂNG NHẬP NHANH (TÀI KHOẢN VIP MẪU)</span>
                </button>
              </div>
            </form>

            <!-- Register Switch Link -->
            <div class="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
              <span>Chưa sở hữu định danh AURA? </span>
              <a href="#/register" class="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4">
                Khởi tạo tài khoản mới
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    // Event Listeners for Login
    const form = document.getElementById('aura-login-form');
    const pwdInput = document.getElementById('login-password');
    const toggleEye = document.getElementById('login-toggle-eye');
    const eyeIcon = document.getElementById('login-eye-icon');
    const demoBtn = document.getElementById('login-demo-btn');
    const forgotBtn = document.getElementById('login-forgot-btn');
    const submitBtn = document.getElementById('login-submit-btn');
    const btnText = document.getElementById('login-btn-text');

    toggleEye?.addEventListener('click', () => {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
      } else {
        pwdInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
      }
      refreshIcons();
    });

    forgotBtn?.addEventListener('click', () => {
      const email = prompt('Vui lòng nhập Email đã đăng ký để nhận mã khôi phục không gian AURA:');
      if (email) {
        showNotificationToast('Đã gửi mã khôi phục bảo mật về ' + email);
      }
    });

    demoBtn?.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (btnText) btnText.textContent = 'ĐANG ĐỒNG BỘ KHÔNG GIAN...';
      submitBtn.classList.add('opacity-75', 'cursor-wait');

      setTimeout(() => {
        window.AURA_AUTH.loginDemo();
        updateHeaderAuthUI();
        showNotificationToast('Đăng nhập thành công! Chào mừng Thượng khách Nguyễn Văn An trở lại');
        window.location.hash = '#/';
        renderView('#/');
      }, 500);
    });

    function performLogin() {
      const ident = document.getElementById('login-identifier')?.value?.trim() || 'an.nguyen@aura-one.audio';
      const pwd = pwdInput?.value?.trim() || '123456';
      if (typeof playUiClickSfx === 'function') playUiClickSfx();

      // Check lockout first
      if (window.AURA_SECURITY) {
        const rem = window.AURA_SECURITY.getLockoutRemaining();
        if (rem > 0) {
          showNotificationToast('⚠️ Bảo mật: Tạm khóa đăng nhập. Vui lòng thử lại sau ' + rem + ' giây.');
          return;
        }
      }

      if (btnText) btnText.textContent = 'ĐANG XÁC THỰC BẢO MẬT SSL...';
      submitBtn.classList.add('opacity-75', 'cursor-wait');

      setTimeout(() => {
        submitBtn.classList.remove('opacity-75', 'cursor-wait');
        if (btnText) btnText.textContent = 'BƯỚC VÀO THÁNH ĐƯỜNG';
        const res = window.AURA_AUTH.login(ident, pwd);
        if (res && res.error) {
          if (res.error === 'LOCKED') {
            showNotificationToast('⚠️ Tạm khóa vì bảo mật! Vui lòng chờ ' + res.remainingSeconds + ' giây.');
          } else {
            showNotificationToast('❌ Thông tin đăng nhập không hợp lệ.');
          }
          return;
        }
        updateHeaderAuthUI();
        showNotificationToast('Đăng nhập thành công! Chào mừng ' + (res.name || 'bạn') + ' về Trang Chủ');
        window.location.hash = '#/';
        renderView('#/');
      }, 350);
    }

    submitBtn?.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      performLogin();
    });

    form?.addEventListener('submit', (e) => {
      if (e) e.preventDefault();
      performLogin();
    });

    refreshIcons();
  }

  // 2. REGISTER VIEW (#/register)
  function renderRegisterPage() {
    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 min-h-[85vh] flex items-center justify-center py-12">
        <div class="w-full max-w-lg relative z-10">
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-violet-400/30 shadow-2xl relative overflow-hidden">
            <div class="text-center mb-8">
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                <span>AURA CONCIERGE ONBOARDING</span>
              </div>
              <h1 class="font-heading text-3xl font-extrabold text-white tracking-wide">Khởi Tạo Danh Tính VIP</h1>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Đăng ký thành viên để nhận mã định danh cá nhân độc bản, bảo hành điện tử 3 năm và quyền tùy chỉnh chất âm riêng biệt.
              </p>
            </div>

            <form id="aura-register-form" class="space-y-4" onsubmit="return false;">
              <!-- Full Name -->
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1 uppercase tracking-wider">Họ và Tên Chủ Sở Hữu *</label>
                <input type="text" id="reg-name" placeholder="Ví dụ: Hoàng Minh Đức" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" required />
              </div>

              <!-- Email & Phone Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1 uppercase tracking-wider">Email Nhận Chứng Thư *</label>
                  <input type="email" id="reg-email" placeholder="name@domain.com" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" required />
                </div>
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1 uppercase tracking-wider">Số Điện Thoại</label>
                  <input type="tel" id="reg-phone" placeholder="0908 xxx xxx" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" />
                </div>
              </div>

              <!-- Passwords Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1 uppercase tracking-wider">Mật Khẩu *</label>
                  <input type="password" id="reg-pwd" placeholder="Ít nhất 6 ký tự" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" required />
                </div>
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1 uppercase tracking-wider">Xác Nhận Mật Khẩu *</label>
                  <input type="password" id="reg-pwd-confirm" placeholder="Nhập lại mật khẩu" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors" required />
                </div>
              </div>

              <!-- Personal Sound Profile Preference -->
              <div class="pt-2">
                <label class="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                  Gu Âm Nhạc Định Danh Của Bạn (Hệ thống sẽ cấu hình EQ mẫu):
                </label>
                <select id="reg-sound-pref" class="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono">
                  <option value="Audiophile Master Studio (Beryllium Pure)">🎛️ Audiophile Master Studio (Trung thực phòng thu)</option>
                  <option value="Sub-Bass Quantum (15Hz Electronic)">⚡ Quantum Sub-Bass (Uy lực dải trầm 15Hz)</option>
                  <option value="Vocal Pure Silk (Acoustic & Jazz)">🎙️ Vocal Pure Silk (Ngọt ngào, mượt mà)</option>
                  <option value="Spatial Cinema 360 Orbit">🌌 Spatial Cinema 360 (Âm trường vòm IMAX)</option>
                </select>
              </div>

              <!-- Terms Checkbox -->
              <div class="pt-1">
                <label class="flex items-start space-x-2 text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" id="reg-terms" checked class="accent-cyan-400 rounded mt-0.5 cursor-pointer" />
                  <span class="text-[11px] leading-relaxed text-slate-400">
                    Tôi đồng ý với điều khoản chăm sóc khách hàng độc quyền AURA Concierge và bảo mật âm thanh số.
                  </span>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="pt-3">
                <button type="submit" id="reg-submit-btn" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-violet-500/25 flex items-center justify-center space-x-2 group">
                  <span id="reg-btn-text">HOÀN TẤT ĐĂNG KÝ & KÍCH HOẠT THÁNH ĐƯỜNG</span>
                  <i data-lucide="check" class="w-4 h-4"></i>
                </button>
              </div>
            </form>

            <div class="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
              <span>Đã có tài khoản thành viên? </span>
              <a href="#/login" class="text-violet-400 hover:text-violet-300 font-bold underline underline-offset-4">
                Đăng nhập ngay
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    const form = document.getElementById('aura-register-form');
    const submitBtn = document.getElementById('reg-submit-btn');
    const btnText = document.getElementById('reg-btn-text');

    form?.addEventListener('submit', () => {
      const name = document.getElementById('reg-name')?.value?.trim();
      const email = document.getElementById('reg-email')?.value?.trim();
      const phone = document.getElementById('reg-phone')?.value?.trim();
      const pwd = document.getElementById('reg-pwd')?.value;
      const pwdConfirm = document.getElementById('reg-pwd-confirm')?.value;
      const soundPref = document.getElementById('reg-sound-pref')?.value;

      if (!name || !email || !pwd) {
        showNotificationToast('Vui lòng điền đầy đủ các trường bắt buộc');
        return;
      }
      if (pwd.length < 6) {
        showNotificationToast('Mật khẩu cần tối thiểu 6 ký tự');
        return;
      }
      if (pwd !== pwdConfirm) {
        showNotificationToast('Mật khẩu xác nhận không trùng khớp');
        return;
      }

      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (btnText) btnText.textContent = 'ĐANG THIẾT LẬP THÁNH ĐƯỜNG...';
      submitBtn.classList.add('opacity-75', 'cursor-wait');

      setTimeout(() => {
        window.AURA_AUTH.register({
          name: name,
          email: email,
          phone: phone,
          soundPreference: soundPref
        });
        updateHeaderAuthUI();
        showNotificationToast('Chúc mừng ' + name + '! Danh tính AURA đã được kích hoạt');
        window.location.hash = '#/dashboard';
      }, 700);
    });

    refreshIcons();
  }

  // 3. USER DASHBOARD (#/dashboard: AURA ACOUSTIC SANCTUARY)
  function renderDashboardPage(activeTab = 'overview') {
    let user = window.AURA_AUTH ? window.AURA_AUTH.getCurrentUser() : null;
    if (!user) {
      user = window.AURA_AUTH.loginDemo();
      updateHeaderAuthUI();
    }

    const device = (user.devices && user.devices[0]) || window.AURA_DATA.defaultUser.devices[0];
    const latestOrder = (user.orders && user.orders[0]) || window.AURA_DATA.defaultUser.orders[0];

    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- HERO IDENTITY RIBBON (Không gian Thượng khách) -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-violet-500/30 mb-8 relative overflow-hidden bg-gradient-to-r from-violet-950/40 via-black/80 to-cyan-950/30">
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <!-- Left: Avatar & Identity -->
            <div class="flex items-center space-x-4 sm:space-x-5">
              <div class="relative flex-shrink-0">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-violet-600 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                  <div class="w-full h-full bg-[#07070a] rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-white font-mono">
                    ${(user.name || 'AN').split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                </div>
                <span class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500 text-black font-bold border border-black shadow">ONLINE</span>
              </div>

              <div>
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h1 class="font-heading text-xl sm:text-2xl font-black text-white">${user.name}</h1>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">${user.tier}</span>
                </div>
                <div class="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
                  <span>ID: <strong class="text-cyan-400">${user.auraId}</strong></span>
                  <span>Gia nhập: <span class="text-slate-400">${user.memberSince}</span></span>
                  <span class="hidden sm:inline text-slate-400">${user.role}</span>
                </div>
              </div>
            </div>

            <!-- Right: Quick Actions -->
            <div class="flex flex-wrap items-center gap-2.5">
              <a href="#/studio" class="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono transition-all flex items-center space-x-1.5 shadow-md shadow-cyan-400/20">
                <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
                <span>TÙY BIẾN TAI NGHE MỚI</span>
              </a>
              <button id="dash-cert-btn" class="glass-button px-4 py-2 rounded-xl text-white font-bold text-xs font-mono transition-all flex items-center space-x-1.5 border border-white/20 hover:border-violet-400">
                <i data-lucide="award" class="w-3.5 h-3.5 text-violet-400"></i>
                <span>CHỨNG THƯ SỐ VIP</span>
              </button>
              <button id="dash-logout-btn" class="glass-button px-3.5 py-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-500/20 text-xs font-mono transition-all border border-rose-500/30" title="Đăng xuất">
                <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- SANCTUARY NAVIGATION TABS -->
        <div class="flex items-center space-x-2 border-b border-white/10 pb-3 mb-8 overflow-x-auto no-scrollbar text-xs font-mono">
          <button class="dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'overview' ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20' : 'text-slate-300 hover:text-white bg-white/5'}" data-tab="overview">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>Không Gian Tổng Quan</span>
          </button>
          <button class="dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'gear' ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20' : 'text-slate-300 hover:text-white bg-white/5'}" data-tab="gear">
            <i data-lucide="headphones" class="w-3.5 h-3.5"></i>
            <span>Bản Sao Số (Digital Twin)</span>
          </button>
          <button class="dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'eq' ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20' : 'text-slate-300 hover:text-white bg-white/5'}" data-tab="eq">
            <i data-lucide="activity" class="w-3.5 h-3.5"></i>
            <span>Bộ Nhớ EQ Cá Nhân</span>
          </button>
          <button class="dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'orders' ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20' : 'text-slate-300 hover:text-white bg-white/5'}" data-tab="orders">
            <i data-lucide="package" class="w-3.5 h-3.5"></i>
            <span>Lịch Sử Đơn Hàng (${(user.orders || []).length})</span>
          </button>
          <button class="dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'settings' ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20' : 'text-slate-300 hover:text-white bg-white/5'}" data-tab="settings">
            <i data-lucide="settings" class="w-3.5 h-3.5"></i>
            <span>Hồ Sơ & Thiết Lập</span>
          </button>
          <button class="dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'security' ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20' : 'text-slate-300 hover:text-white bg-white/5'}" data-tab="security">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
            <span>Bảo Mật & Riêng Tư</span>
          </button>
        </div>

        <!-- TAB CONTENT CONTAINER -->
        <div id="dash-tab-content">
          <!-- Dynamic Content Rendered By JS Below -->
        </div>
      </section>

      <!-- HOLOGRAPHIC CERTIFICATE MODAL -->
      <div id="hologram-cert-modal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-300">
        <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-400/40 max-w-lg w-full relative shadow-2xl bg-gradient-to-b from-[#0e1017] to-black">
          <button id="close-cert-modal" class="absolute top-4 right-4 text-slate-400 hover:text-white p-2">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="text-center pb-6 border-b border-white/10">
            <div class="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 mb-3">
              <i data-lucide="award" class="w-8 h-8"></i>
            </div>
            <h3 class="font-heading text-xl sm:text-2xl font-black text-white">CHỨNG THƯ QUYỀN SỞ HỮU SỐ</h3>
            <p class="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mt-1">HOLOGRAPHIC DIGITAL CERTIFICATE OF AUTHENTICITY</p>
          </div>

          <div class="py-6 space-y-3 font-mono text-xs">
            <div class="flex justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400">CHỦ SỞ HỮU:</span>
              <span class="text-white font-bold">${user.name}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400">ĐỊNH DANH AURA ID:</span>
              <span class="text-cyan-400 font-bold">${user.auraId}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400">MÃ SERIAL THIẾT BỊ:</span>
              <span class="text-white font-bold">${device.serial}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400">KHẮC LASER ĐỘC BẢN:</span>
              <span class="text-amber-300 font-bold">${device.engraving}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400">BẢO HÀNH ĐẶC QUYỀN:</span>
              <span class="text-emerald-400 font-bold">${device.warrantyStatus} (Đến ${device.warrantyExpiry})</span>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-slate-400">CHỨNG NHẬN BỞI:</span>
              <span class="text-slate-300">AURA Acoustics Lab Zurich & Tokyo</span>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-between gap-3">
            <button onclick="window.print()" class="flex-1 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono transition-all flex items-center justify-center space-x-2">
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>IN CHỨNG THƯ</span>
            </button>
            <button id="download-cert-btn" class="glass-button px-4 py-3 rounded-xl text-white text-xs font-mono hover:border-cyan-400">
              <i data-lucide="download" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    function renderTab(tabKey) {
      const container = document.getElementById('dash-tab-content');
      if (!container) return;

      if (tabKey === 'overview') {
        container.innerHTML = `
          <!-- 4 TELEMETRY CARDS -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>THIẾT BỊ SỞ HỮU</span>
                <i data-lucide="headphones" class="w-4 h-4 text-cyan-400"></i>
              </div>
              <div class="text-lg sm:text-2xl font-black text-white font-heading">1 Thiết Bị</div>
              <div class="text-[11px] text-cyan-300 font-mono mt-1">LDAC 990kbps Active</div>
            </div>

            <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>PRESET ÂM THANH</span>
                <i data-lucide="activity" class="w-4 h-4 text-violet-400"></i>
              </div>
              <div class="text-lg sm:text-2xl font-black text-white font-heading truncate">Studio Master</div>
              <div class="text-[11px] text-violet-300 font-mono mt-1">Abbey Road Ref Curve</div>
            </div>

            <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>BẢO HÀNH ĐIỆN TỬ</span>
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
              </div>
              <div class="text-lg sm:text-2xl font-black text-white font-heading">3 Năm VIP</div>
              <div class="text-[11px] text-emerald-300 font-mono mt-1">Hạn: ${device.warrantyExpiry}</div>
            </div>

            <div class="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>ĐƠN HÀNG GẦN NHẤT</span>
                <i data-lucide="truck" class="w-4 h-4 text-amber-400"></i>
              </div>
              <div class="text-lg sm:text-2xl font-black text-white font-heading truncate">#${latestOrder.id}</div>
              <div class="text-[11px] text-amber-300 font-mono mt-1">${latestOrder.statusLabel}</div>
            </div>
          </div>

          <!-- 2-COLUMN MAIN EXPERIENCE -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left: Digital Twin Card (7 cols) -->
            <div class="lg:col-span-7 space-y-6">
              <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden group">
                <div class="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">BẢN SAO SỐ THỜI GIAN THỰC</span>
                    <h3 class="font-heading text-lg sm:text-xl font-bold text-white mt-0.5">${device.model}</h3>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    PIN ${device.battery}%
                  </span>
                </div>

                <!-- Headphone Visualizer Card -->
                <div class="my-6 relative rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-violet-500/10 pointer-events-none"></div>
                  <img src="${device.image}" alt="${device.model}" class="max-h-56 object-contain filter drop-shadow-[0_10px_25px_rgba(0,242,254,0.35)] transition-transform duration-500 group-hover:scale-105" />
                  
                  <div class="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300 flex items-center space-x-2">
                    <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                    <span>KHẮC LASER: "${device.engraving}"</span>
                  </div>
                </div>

                <!-- Telemetry Specs List -->
                <div class="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400 text-[10px] block">MÃ SERIAL SỐ:</span>
                    <span class="text-white font-bold">${device.serial}</span>
                  </div>
                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400 text-[10px] block">FIRMWARE:</span>
                    <span class="text-cyan-300 font-bold">${device.firmware}</span>
                  </div>
                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400 text-[10px] block">PHIÊN BẢN MÀU:</span>
                    <span class="text-white font-bold">${device.color}</span>
                  </div>
                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400 text-[10px] block">KẾT NỐI KHÔNG DÂY:</span>
                    <span class="text-emerald-400 font-bold">${device.connection}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Acoustic Tuning Vault & Order Tracker (5 cols) -->
            <div class="lg:col-span-5 space-y-6">
              <!-- Acoustic Tuning Vault -->
              <div class="glass-panel p-6 rounded-3xl border border-violet-500/30">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-[10px] font-mono text-violet-400 uppercase tracking-widest">KHO PRESET ÂM THANH</span>
                    <h3 class="font-heading text-base font-bold text-white">Acoustic EQ Vault</h3>
                  </div>
                  <i data-lucide="activity" class="w-5 h-5 text-violet-400"></i>
                </div>

                <div class="space-y-2.5">
                  ${(user.eqPresets || window.AURA_DATA.defaultUser.eqPresets).map(preset => `
                    <button class="dash-preset-btn w-full p-3.5 rounded-2xl bg-white/[0.03] border ${user.activeEqPreset === preset.id ? 'border-violet-400 bg-violet-500/15' : 'border-white/10 hover:border-violet-400/40'} text-left transition-all group flex items-center justify-between" data-preset-id="${preset.id}">
                      <div>
                        <div class="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">${preset.name}</div>
                        <div class="text-[10px] text-slate-400 mt-0.5 line-clamp-1">${preset.desc}</div>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-mono ${user.activeEqPreset === preset.id ? 'bg-violet-500 text-white font-bold' : 'bg-white/5 text-slate-400'}">
                        ${user.activeEqPreset === preset.id ? 'ACTIVE' : 'CHỌN'}
                      </span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Active Order Tracker Preview -->
              <div class="glass-panel p-6 rounded-3xl border border-white/10">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest">TIẾN TRÌNH VẬN CHUYỂN</span>
                    <h3 class="font-heading text-base font-bold text-white">Đơn hàng #${latestOrder.id}</h3>
                  </div>
                  <a href="#/order-detail?id=${latestOrder.id}" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
                    <span>Chi tiết</span>
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                  </a>
                </div>

                <div class="text-xs text-slate-300 mb-4 font-mono">
                  Đơn vị: <strong class="text-white">${latestOrder.carrier}</strong> • Mã vận đơn: <strong class="text-cyan-400">${latestOrder.trackingNumber}</strong>
                </div>

                <!-- 4-Step Visual Tracker LED -->
                <div class="space-y-3 font-mono text-xs">
                  <div class="flex items-center space-x-3 text-emerald-400">
                    <span class="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] flex-shrink-0"></span>
                    <span>1. Đã duyệt thiết kế & xác nhận đơn</span>
                  </div>
                  <div class="flex items-center space-x-3 text-emerald-400">
                    <span class="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] flex-shrink-0"></span>
                    <span>2. Đã chế tác CNC & khắc laser headband</span>
                  </div>
                  <div class="flex items-center space-x-3 text-cyan-400 font-bold">
                    <span class="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe] animate-ping flex-shrink-0"></span>
                    <span>3. Đang vận chuyển chuyên biệt White Glove</span>
                  </div>
                  <div class="flex items-center space-x-3 text-slate-500">
                    <span class="w-3 h-3 rounded-full bg-slate-700 flex-shrink-0"></span>
                    <span>4. Bàn giao tận tay chủ sở hữu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (tabKey === 'gear') {
        container.innerHTML = `
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 class="font-heading text-xl font-bold text-white">Thiết Bị Của Tôi (Digital Twins)</h3>
                <p class="text-xs text-slate-400">Quản lý số serial độc bản, thông số kỹ thuật và chứng thư bảo hành số.</p>
              </div>
              <a href="#/studio" class="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs font-mono flex items-center space-x-1.5 shadow-md shadow-cyan-400/20">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>TÙY BIẾN CHIẾC MỚI</span>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${(user.devices || [device]).map(dev => `
                <div class="glass-panel p-6 rounded-3xl border border-white/15 relative overflow-hidden group">
                  <div class="flex items-center justify-between mb-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                      FLAGSHIP BESPOKE
                    </span>
                    <span class="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>KẾT NỐI (PIN ${dev.battery}%)</span>
                    </span>
                  </div>

                  <div class="h-48 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center p-4 mb-4">
                    <img src="${dev.image}" alt="${dev.model}" class="max-h-40 object-contain drop-shadow-[0_8px_20px_rgba(0,242,254,0.3)] group-hover:scale-105 transition-transform" />
                  </div>

                  <h4 class="font-heading text-lg font-bold text-white mb-1">${dev.model}</h4>
                  <p class="text-xs text-slate-300 font-mono mb-4">${dev.color} • Khắc: "${dev.engraving}"</p>

                  <div class="space-y-2 text-xs font-mono border-t border-white/10 pt-4 mb-4">
                    <div class="flex justify-between text-slate-400">
                      <span>Serial:</span>
                      <span class="text-white">${dev.serial}</span>
                    </div>
                    <div class="flex justify-between text-slate-400">
                      <span>Bảo hành:</span>
                      <span class="text-emerald-400 font-bold">${dev.warrantyStatus}</span>
                    </div>
                  </div>

                  <button class="w-full py-2.5 rounded-xl glass-button text-xs font-mono font-bold text-cyan-300 hover:text-white border border-cyan-500/30 flex items-center justify-center space-x-2" onclick="document.getElementById('dash-cert-btn')?.click()">
                    <i data-lucide="award" class="w-4 h-4 text-cyan-400"></i>
                    <span>XEM CHỨNG THƯ SỞ HỮU</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (tabKey === 'eq') {
        container.innerHTML = `
          <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-violet-500/30 max-w-3xl mx-auto space-y-6">
            <div class="text-center pb-6 border-b border-white/10">
              <span class="text-[10px] font-mono text-violet-400 uppercase tracking-widest">[ ACOUSTIC TUNING VAULT ]</span>
              <h3 class="font-heading text-2xl font-bold text-white mt-1">Cấu Hình EQ & Chất Âm Cá Nhân</h3>
              <p class="text-xs text-slate-300 mt-2">
                Chuyển đổi tức thời các profile âm học được hiệu chuẩn chuyên biệt cho màng loa Pure Beryllium của AURA ONE.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${(user.eqPresets || window.AURA_DATA.defaultUser.eqPresets).map(preset => `
                <div class="p-5 rounded-2xl bg-white/[0.03] border ${user.activeEqPreset === preset.id ? 'border-violet-400 bg-violet-500/15 shadow-lg shadow-violet-500/20' : 'border-white/10'} space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="font-heading text-sm font-bold text-white">${preset.name}</h4>
                    <span class="text-[10px] font-mono text-cyan-400 font-bold">${preset.bass} Bass</span>
                  </div>
                  <p class="text-xs text-slate-300 leading-relaxed">${preset.desc}</p>
                  <button class="dash-preset-btn w-full py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 ${user.activeEqPreset === preset.id ? 'bg-violet-500 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'}" data-preset-id="${preset.id}">
                    <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
                    <span>${user.activeEqPreset === preset.id ? 'ĐANG KÍCH HOẠT' : 'ÁP DỤNG PRESET NÀY'}</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (tabKey === 'orders') {
        const ordersList = user.orders && user.orders.length ? user.orders : window.AURA_DATA.defaultUser.orders;
        container.innerHTML = `
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 class="font-heading text-xl font-bold text-white">Lịch Sử Đơn Hàng Của Bạn</h3>
                <p class="text-xs text-slate-400">Theo dõi toàn diện các đơn hàng AURA ONE đã đặt và hành trình vận chuyển.</p>
              </div>
              <a href="#/cart" class="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs font-mono flex items-center space-x-1.5 shadow-md shadow-cyan-400/20">
                <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
                <span>XEM GIỎ HÀNG</span>
              </a>
            </div>

            <div class="space-y-4">
              ${ordersList.map(ord => `
                <div class="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-cyan-400/30 transition-all">
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center p-2 flex-shrink-0">
                      <img src="${ord.items && ord.items[0] ? ord.items[0].image : 'assets/media/ui-hero-sound-redefined.png'}" alt="Item" class="max-h-full object-contain" />
                    </div>
                    <div>
                      <div class="flex items-center space-x-2">
                        <span class="font-mono text-sm font-bold text-white">#${ord.id}</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-mono bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">${ord.statusLabel || 'Đang vận chuyển'}</span>
                      </div>
                      <div class="text-xs text-slate-300 mt-1">Ngày đặt: ${ord.date} • Vận đơn: ${ord.trackingNumber || 'AWG-889201'}</div>
                      <div class="text-xs text-cyan-400 font-mono font-bold mt-0.5">Tổng tiền: $${ord.total} USD</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3 w-full sm:w-auto">
                    <a href="#/order-detail?id=${ord.id}" class="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs text-center transition-all">
                      XEM CHI TIẾT
                    </a>
                    <a href="#/order-tracking?id=${ord.id}" class="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs text-center transition-all">
                      THEO DÕI VẬN ĐƠN
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (tabKey === 'settings') {
        container.innerHTML = `
          <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 max-w-2xl mx-auto space-y-6">
            <div class="pb-4 border-b border-white/10">
              <h3 class="font-heading text-xl font-bold text-white">Quản Lý Hồ Sơ & Thiết Lập Tài Khoản</h3>
              <p class="text-xs text-slate-400">Cập nhật thông tin giao hàng mặc định và cá nhân hóa âm thanh.</p>
            </div>

            <form id="dash-profile-form" class="space-y-4" onsubmit="return false;">
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1">HỌ VÀ TÊN</label>
                <input type="text" id="prof-name" value="${user.name}" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1">EMAIL LIÊN HỆ</label>
                  <input type="email" id="prof-email" value="${user.email}" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" />
                </div>
                <div>
                  <label class="block text-xs font-mono text-slate-300 mb-1">SỐ ĐIỆN THOẠI</label>
                  <input type="tel" id="prof-phone" value="${user.phone || ''}" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-mono text-slate-300 mb-1">ĐỊA CHỈ NHẬN HÀNG MẶC ĐỊNH</label>
                <input type="text" id="prof-address" value="${user.address || ''}" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" />
              </div>
              <div class="pt-2">
                <button type="submit" id="prof-save-btn" class="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono transition-all">
                  LƯU THAY ĐỔI HỒ SƠ
                </button>
              </div>
            </form>
          </div>
        `;

        document.getElementById('dash-profile-form')?.addEventListener('submit', () => {
          const name = document.getElementById('prof-name')?.value;
          const email = document.getElementById('prof-email')?.value;
          const phone = document.getElementById('prof-phone')?.value;
          const address = document.getElementById('prof-address')?.value;
          window.AURA_AUTH.updateProfile({ name, email, phone, address });
          updateHeaderAuthUI();
          showNotificationToast('Đã lưu thông tin hồ sơ thành công');
        });
      } else if (tabKey === 'security') {
        const secInfo = window.AURA_SECURITY ? window.AURA_SECURITY.getSecurityHealth() : { score: 100 };
        const csrfToken = window.AURA_SECURITY ? window.AURA_SECURITY.generateCsrfToken() : 'AURA-SEC-VALID';
        const maskedPhone = window.AURA_SECURITY ? window.AURA_SECURITY.maskSensitive(user.phone, 'phone') : user.phone;
        const maskedEmail = window.AURA_SECURITY ? window.AURA_SECURITY.maskSensitive(user.email, 'email') : user.email;
        const auditLogs = window.AURA_SECURITY ? window.AURA_SECURITY.getAuditLogs() : [];

        container.innerHTML = `
          <div class="max-w-4xl mx-auto space-y-6">
            <!-- Top Security Health Bar -->
            <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-r from-emerald-950/30 via-black/80 to-cyan-950/30">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <i data-lucide="shield-check" class="w-8 h-8"></i>
                  </div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <h3 class="font-heading text-xl font-bold text-white">Chỉ Số An Toàn Dữ Liệu: 100/100</h3>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">TỐI ƯU</span>
                    </div>
                    <p class="text-xs text-slate-300 mt-1">Toàn bộ hồ sơ, giỏ hàng và dữ liệu thanh toán được bảo hộ bằng thuật toán mã hóa đa lớp tiêu chuẩn quốc tế.</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <button id="run-deep-sec-scan" class="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono transition-all flex items-center space-x-2 shadow-lg shadow-cyan-400/20">
                    <i data-lucide="scan" class="w-4 h-4"></i>
                    <span>QUÉT TOÀN BỘ HỆ THỐNG</span>
                  </button>
                </div>
              </div>

              <!-- Scanning status banner -->
              <div id="sec-scan-progress" class="hidden mt-6 pt-4 border-t border-white/10 space-y-2">
                <div class="flex justify-between text-xs font-mono text-cyan-400">
                  <span id="sec-scan-step">Đang kiểm tra chữ ký giỏ hàng...</span>
                  <span id="sec-scan-percent">0%</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div id="sec-scan-bar" class="h-full bg-cyan-400 transition-all duration-300" style="width: 0%"></div>
                </div>
              </div>
            </div>

            <!-- 2-Column Grid: Protocols & Privacy Settings -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left: Protocols & Encryption Specs -->
              <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 class="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <i data-lucide="lock" class="w-4 h-4 text-cyan-400"></i>
                    <span>Các Lớp Bảo Vệ Đang Hoạt Động</span>
                  </h4>
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                <div class="space-y-3 font-mono text-xs">
                  <div class="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400">Giao Thức Truyền Tải:</span>
                    <span class="text-cyan-300 font-bold">TLS 1.3 / AES-256-GCM</span>
                  </div>
                  <div class="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400">Toàn Vẹn Giá Giỏ Hàng:</span>
                    <span class="text-emerald-400 font-bold">Anti-Tampering Guard (Active)</span>
                  </div>
                  <div class="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400">Chữ Ký Chống Giả Mạo:</span>
                    <span class="text-violet-300 font-bold truncate max-w-[180px]">${csrfToken}</span>
                  </div>
                  <div class="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400">Mã Hóa Mật Khẩu:</span>
                    <span class="text-amber-300 font-bold">Salted Dual-Digest 64-bit</span>
                  </div>
                  <div class="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span class="text-slate-400">Rate Limiter / Khóa Cửa:</span>
                    <span class="text-emerald-400 font-bold">Brute-Force Lockout (5 thử/30s)</span>
                  </div>
                </div>
              </div>

              <!-- Right: Privacy & Data Masking -->
              <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 class="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <i data-lucide="eye-off" class="w-4 h-4 text-violet-400"></i>
                    <span>Mặt Nạ Riêng Tư & Dữ Liệu</span>
                  </h4>
                </div>

                <p class="text-xs text-slate-300">
                  Khi chia sẻ đánh giá âm học hoặc liên hệ chuyên viên Concierge, dữ liệu nhạy cảm được che chắn tự động:
                </p>

                <div class="space-y-3 font-mono text-xs">
                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div class="text-[10px] text-slate-400">SỐ ĐIỆN THOẠI ẨN DANH:</div>
                    <div class="text-cyan-300 font-bold text-sm mt-0.5">${maskedPhone}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div class="text-[10px] text-slate-400">EMAIL HIỂN THỊ CÔNG CỘNG:</div>
                    <div class="text-violet-300 font-bold text-sm mt-0.5">${maskedEmail}</div>
                  </div>
                </div>

                <div class="pt-2">
                  <button id="flush-sec-session" class="w-full py-2.5 rounded-xl border border-rose-500/30 hover:bg-rose-500/10 text-rose-300 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2">
                    <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                    <span>TẠO MỚI TOKEN & XÓA BỘ NHỚ TẠM</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom: Real-Time Security Audit Telemetry Logs -->
            <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 class="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <i data-lucide="terminal" class="w-4 h-4 text-emerald-400"></i>
                  <span>Nhật Ký Giám Sát An Ninh (Security Audit Log)</span>
                </h4>
                <span class="text-[11px] font-mono text-slate-400">${auditLogs.length} sự kiện gần nhất</span>
              </div>

              <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                ${auditLogs.map(log => `
                  <div class="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[11px]">
                    <div class="flex items-center space-x-2.5">
                      <span class="w-1.5 h-1.5 rounded-full ${log.level === 'WARNING' ? 'bg-amber-400' : 'bg-cyan-400'}"></span>
                      <span class="text-white font-bold">${log.action}</span>
                      <span class="text-slate-400 hidden sm:inline">• ${log.details}</span>
                    </div>
                    <span class="text-slate-400 text-[10px] flex-shrink-0">${log.timestamp}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;

        document.getElementById('run-deep-sec-scan')?.addEventListener('click', () => {
          const progressBox = document.getElementById('sec-scan-progress');
          const stepText = document.getElementById('sec-scan-step');
          const percentText = document.getElementById('sec-scan-percent');
          const bar = document.getElementById('sec-scan-bar');
          if (!progressBox) return;

          progressBox.classList.remove('hidden');
          bar.style.width = '20%';
          stepText.textContent = 'Đang kiểm tra tính toàn vẹn chữ ký giỏ hàng...';
          percentText.textContent = '20%';

          setTimeout(() => {
            bar.style.width = '60%';
            stepText.textContent = 'Xác thực chữ ký CSRF & Salted Hash bộ nhớ...';
            percentText.textContent = '60%';
          }, 300);

          setTimeout(() => {
            bar.style.width = '100%';
            stepText.textContent = 'Quét hoàn tất: 100% An toàn, 0 Lỗ hổng!';
            percentText.textContent = '100%';
            showNotificationToast('✅ Hệ thống toàn vẹn 100%! Không phát hiện can thiệp.');
          }, 650);
        });

        document.getElementById('flush-sec-session')?.addEventListener('click', () => {
          sessionStorage.removeItem('aura_csrf_token');
          if (window.AURA_SECURITY) window.AURA_SECURITY.generateCsrfToken();
          showNotificationToast('Đã làm mới mã ký số bảo mật phiên thành công');
          renderTab('security');
        });
      }

      // Attach preset button events
      container.querySelectorAll('.dash-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pId = btn.getAttribute('data-preset-id');
          window.AURA_AUTH.updateProfile({ activeEqPreset: pId });
          showNotificationToast('Đã kích hoạt cấu hình EQ: ' + pId.toUpperCase());
          renderTab(tabKey);
        });
      });

      refreshIcons();
    }

    renderTab(activeTab);

    // Tab buttons click listener
    document.querySelectorAll('.dash-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof playUiClickSfx === 'function') playUiClickSfx();
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.dash-tab-btn').forEach(b => {
          b.className = 'dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap text-slate-300 hover:text-white bg-white/5';
        });
        btn.className = 'dash-tab-btn px-4 py-2 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20';
        renderTab(tab);
      });
    });

    // Cert modal controller
    const certModal = document.getElementById('hologram-cert-modal');
    const certBtn = document.getElementById('dash-cert-btn');
    const closeCert = document.getElementById('close-cert-modal');
    certBtn?.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (certModal) {
        certModal.classList.remove('opacity-0', 'pointer-events-none');
        certModal.classList.add('opacity-100', 'pointer-events-auto');
      }
    });
    closeCert?.addEventListener('click', () => {
      if (certModal) {
        certModal.classList.add('opacity-0', 'pointer-events-none');
        certModal.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    document.getElementById('dash-logout-btn')?.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi Thánh đường AURA ONE?')) {
        window.AURA_AUTH.logout();
        updateHeaderAuthUI();
        showNotificationToast('Đã đăng xuất');
        window.location.hash = '#/';
      }
    });

    refreshIcons();
  }

  
  // 4. FULL MULTI-ITEM CART VIEW (#/cart)
  function renderCartPage() {
    const cart = window.AURA_CART ? window.AURA_CART.getCart() : [];
    const discount = state.promoDiscount || 0;
    const subtotal = window.AURA_CART ? window.AURA_CART.getSubtotal() : 399;
    const finalTotal = Math.max(0, subtotal - discount);

    if (cart.length === 0) {
      mainContainer.innerHTML = `
        <section class="max-w-4xl mx-auto px-6 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div class="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6 shadow-xl">
            <i data-lucide="shopping-bag" class="w-10 h-10"></i>
          </div>
          <h2 class="font-heading text-3xl font-extrabold text-white mb-3">Giỏ Hàng Của Bạn Đang Trống</h2>
          <p class="text-sm text-slate-400 max-w-md mx-auto mb-8">
            Hãy khám phá bộ sưu tập tai nghe không gian AURA ONE và các thiết bị âm thanh phòng thu để chọn cho mình sản phẩm ưng ý nhất.
          </p>
          <a href="#/store" class="px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-400/25 flex items-center space-x-2">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>KHÁM PHÁ CỬA HÀNG AURA</span>
          </a>
        </section>
      `;
      refreshIcons();
      return;
    }

    mainContainer.innerHTML = `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>AURA E-COMMERCE CART (${window.AURA_CART.getTotalCount()} SẢN PHẨM)</span>
            </div>
            <h1 class="font-heading text-3xl sm:text-4xl font-extrabold text-white">Giỏ Hàng Mua Sắm</h1>
            <p class="text-xs text-slate-300 mt-1">Kiểm tra thông tin chi tiết, chỉnh sửa số lượng hoặc áp dụng mã voucher ưu đãi.</p>
          </div>
          <a href="#/store" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Thêm sản phẩm khác</span>
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: Items list (8 cols) -->
          <div class="lg:col-span-8 space-y-4">
            ${cart.map(item => `
              <div class="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center space-x-4 w-full sm:w-auto">
                  <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center p-2 flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="max-h-full object-contain" />
                  </div>
                  <div>
                    <h3 class="font-heading text-sm sm:text-base font-bold text-white">${item.name}</h3>
                    <div class="text-xs text-cyan-400 font-mono mt-0.5">${item.color || 'Bản Chuẩn'} • $${item.price} USD</div>
                    ${item.engraving ? `<div class="text-[10px] text-amber-300 font-mono mt-0.5">Khắc: "${item.engraving}"</div>` : ''}
                  </div>
                </div>

                <!-- Quantity & Price & Delete -->
                <div class="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                  <div class="flex items-center space-x-2 bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl">
                    <button class="cart-item-minus text-slate-400 hover:text-white px-1 font-bold text-xs" data-id="${item.id}">-</button>
                    <span class="text-xs font-mono font-bold text-white px-2">${item.quantity || 1}</span>
                    <button class="cart-item-plus text-slate-400 hover:text-white px-1 font-bold text-xs" data-id="${item.id}">+</button>
                  </div>

                  <div class="text-right min-w-[90px]">
                    <div class="text-sm font-black font-mono text-white">$${item.price * (item.quantity || 1)}</div>
                    <button class="cart-item-remove text-[10px] font-mono text-rose-400 hover:text-rose-300 mt-0.5" data-id="${item.id}">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}

            <div class="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-300 flex items-center space-x-3">
              <i data-lucide="truck" class="w-5 h-5 text-cyan-400 flex-shrink-0"></i>
              <span>Đơn hàng của bạn đạt chuẩn <strong>Miễn phí vận chuyển White Glove Express</strong> kèm đồng kiểm bảo hành 3 năm.</span>
            </div>
          </div>

          <!-- Right: Summary Card (4 cols) -->
          <div class="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-5">
            <h3 class="font-heading text-lg font-bold text-white pb-3 border-b border-white/10">Tóm Tắt Thanh Toán</h3>

            <!-- Promo Input -->
            <div class="space-y-2">
              <label class="block text-[11px] font-mono text-slate-300 uppercase">MÃ ƯU ĐÃI VIP</label>
              <div class="flex space-x-2">
                <input type="text" id="cart-promo-input" placeholder="AURA2026 hoặc VIP50" class="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400" />
                <button id="cart-apply-promo-btn" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-black text-xs font-mono font-bold transition-all">
                  ÁP DỤNG
                </button>
              </div>
            </div>

            <div class="space-y-2.5 text-xs font-mono pt-3 border-t border-white/10">
              <div class="flex justify-between text-slate-300">
                <span>Tạm tính (${window.AURA_CART.getTotalCount()} món):</span>
                <span>$${subtotal} USD</span>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Vận chuyển White Glove:</span>
                <span class="text-emerald-400 font-bold">MIỄN PHÍ</span>
              </div>
              ${discount > 0 ? `
                <div class="flex justify-between text-cyan-400 font-bold">
                  <span>Voucher giảm giá VIP:</span>
                  <span>-$${discount} USD</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                <span>TỔNG THANH TOÁN:</span>
                <span class="text-cyan-400 font-mono text-xl">$${finalTotal} USD</span>
              </div>
              <div class="text-[10px] text-slate-400 text-right">~ ${(finalTotal * 25000).toLocaleString('vi-VN')} VNĐ</div>
            </div>

            <div class="pt-2">
              <a href="#/checkout" class="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-cyan-400/25 flex items-center justify-center space-x-2 group">
                <span>TIẾN HÀNH ĐẶT HÀNG →</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    // Event listeners
    document.querySelectorAll('.cart-item-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cart = window.AURA_CART.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          window.AURA_CART.updateQuantity(id, (item.quantity || 1) + 1);
          renderCartPage();
        }
      });
    });

    document.querySelectorAll('.cart-item-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cart = window.AURA_CART.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          if ((item.quantity || 1) > 1) {
            window.AURA_CART.updateQuantity(id, item.quantity - 1);
          } else {
            window.AURA_CART.removeItem(id);
          }
          renderCartPage();
        }
      });
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        window.AURA_CART.removeItem(id);
        showNotificationToast('Đã xóa sản phẩm khỏi giỏ hàng');
        renderCartPage();
      });
    });

    document.getElementById('cart-apply-promo-btn')?.addEventListener('click', () => {
      const code = document.getElementById('cart-promo-input')?.value?.trim().toUpperCase();
      if (code === 'AURA2026' || code === 'VIP50' || code === 'AURA50' || code === 'VIP') {
        state.promoDiscount = 50;
        showNotificationToast('Áp dụng mã thành công: Giảm ngay $50 USD');
        renderCartPage();
      } else {
        showNotificationToast('Mã voucher không hợp lệ');
      }
    });

    refreshIcons();
  }



  // 5. ENHANCED 3-STEP CHECKOUT VIEW (#/checkout)
  function renderCheckoutPage() {
    const user = window.AURA_AUTH ? window.AURA_AUTH.getCurrentUser() : null;
    const cart = window.AURA_CART ? window.AURA_CART.getCart() : [];
    const discount = state.promoDiscount || 0;
    const subtotal = window.AURA_CART ? window.AURA_CART.getSubtotal() : 399;
    const total = Math.max(0, subtotal - discount);

    mainContainer.innerHTML = `
      <section class="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="mb-8">
          <div class="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-2">
            <a href="#/cart" class="hover:text-cyan-400">GIỎ HÀNG (${window.AURA_CART.getTotalCount()} MÓN)</a>
            <span>/</span>
            <span class="text-cyan-400 font-bold">THANH TOÁN ĐƠN HÀNG</span>
          </div>
          <h1 class="font-heading text-3xl font-extrabold text-white">Xác Nhận & Đặt Hàng AURA</h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: 3-Step Wizard Form (8 cols) -->
          <div class="lg:col-span-8 space-y-6">
            <!-- Step 1: Shipping Info -->
            <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div class="flex items-center space-x-3 pb-3 border-b border-white/10">
                <span class="w-6 h-6 rounded-full bg-cyan-400 text-black font-bold text-xs flex items-center justify-center font-mono">1</span>
                <h3 class="font-heading text-base font-bold text-white">Thông Tin Nhận Hàng</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono text-slate-400 mb-1">HỌ VÀ TÊN *</label>
                  <input type="text" id="chk-name" value="${user ? user.name : ''}" placeholder="Nguyễn Văn An" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" required />
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-slate-400 mb-1">SỐ ĐIỆN THOẠI *</label>
                  <input type="tel" id="chk-phone" value="${user ? (user.phone || '') : ''}" placeholder="0908 889 292" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" required />
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-mono text-slate-400 mb-1">ĐỊA CHỈ GIAO TẬN TAY (WHITE GLOVE) *</label>
                <input type="text" id="chk-address" value="${user ? (user.address || '') : ''}" placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP" class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-cyan-400 font-mono" required />
              </div>
            </div>

            <!-- Step 2: Payment Method -->
            <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div class="flex items-center space-x-3 pb-3 border-b border-white/10">
                <span class="w-6 h-6 rounded-full bg-cyan-400 text-black font-bold text-xs flex items-center justify-center font-mono">2</span>
                <h3 class="font-heading text-base font-bold text-white">Phương Thức Thanh Toán</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="p-4 rounded-2xl bg-white/[0.04] border border-cyan-400/50 flex flex-col justify-between cursor-pointer group">
                  <div class="flex items-center justify-between mb-2">
                    <i data-lucide="qr-code" class="w-5 h-5 text-cyan-400"></i>
                    <input type="radio" name="chk-payment" value="vietqr" checked class="accent-cyan-400" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white group-hover:text-cyan-300">VietQR / Chuyển Khoản</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Xác nhận tức thì</div>
                  </div>
                </label>

                <label class="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 flex flex-col justify-between cursor-pointer group">
                  <div class="flex items-center justify-between mb-2">
                    <i data-lucide="credit-card" class="w-5 h-5 text-violet-400"></i>
                    <input type="radio" name="chk-payment" value="card" class="accent-cyan-400" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white group-hover:text-cyan-300">Thẻ Visa / Master</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Mã hóa 256-bit</div>
                  </div>
                </label>

                <label class="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 flex flex-col justify-between cursor-pointer group">
                  <div class="flex items-center justify-between mb-2">
                    <i data-lucide="truck" class="w-5 h-5 text-amber-400"></i>
                    <input type="radio" name="chk-payment" value="cod" class="accent-cyan-400" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white group-hover:text-cyan-300">COD Khi Nhận Hàng</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Đồng kiểm âm học</div>
                  </div>
                </label>
              </div>

              <!-- VietQR Mock Box -->
              <div id="vietqr-box" class="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 flex items-center space-x-4">
                <div class="w-20 h-20 bg-white p-1 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AURA-ONE-PAYMENT-VIETQR" alt="QR" class="w-full h-full object-contain" />
                </div>
                <div class="text-xs font-mono space-y-1">
                  <div class="text-cyan-300 font-bold">QUÉT MÃ VIETQR ĐỂ XÁC NHẬN ĐƠN NHANH</div>
                  <div class="text-slate-400 text-[11px]">Ngân hàng: MB Bank • STK: 8892019999</div>
                  <div class="text-white text-[11px]">Chủ TK: AURA ACOUSTICS LAB VIETNAM</div>
                </div>
              </div>
            </div>

            <!-- Step 3: Confirmation Button -->
            <div class="pt-2">
              <button id="chk-finish-btn" class="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-xl shadow-cyan-400/25 flex items-center justify-center space-x-2">
                <span id="chk-finish-text">HOÀN TẤT ĐẶT HÀNG & KÝ SỐ ĐIỆN TỬ</span>
                <i data-lucide="check-circle" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Right: Order Items Summary List (4 cols) -->
          <div class="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 class="font-heading text-base font-bold text-white">Đơn Hàng Của Bạn</h3>
              <span class="text-xs font-mono text-cyan-400">${cart.length} sản phẩm</span>
            </div>
            
            <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
              ${cart.map(item => `
                <div class="flex items-center space-x-3 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                  <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain rounded-lg bg-black/50 p-1 border border-white/10 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xs font-bold text-white truncate">${item.name}</h4>
                    <div class="text-[10px] text-cyan-400 font-mono">x${item.quantity || 1} • $${item.price} USD</div>
                  </div>
                  <div class="text-xs font-mono font-bold text-white">
                    $${item.price * (item.quantity || 1)}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="space-y-2 text-xs font-mono pt-3 border-t border-white/10">
              <div class="flex justify-between text-slate-300">
                <span>Tạm tính:</span>
                <span>$${subtotal} USD</span>
              </div>
              <div class="flex justify-between text-emerald-400">
                <span>Vận chuyển:</span>
                <span>MIỄN PHÍ</span>
              </div>
              ${discount > 0 ? `
                <div class="flex justify-between text-cyan-400 font-bold">
                  <span>Voucher giảm giá:</span>
                  <span>-$${discount} USD</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>TỔNG CỘNG:</span>
                <span class="text-cyan-400 font-mono font-bold text-lg">$${total} USD</span>
              </div>
            </div>

            <!-- AURA CRYPTO GUARD & TRUST SEALS -->
            <div class="mt-4 pt-4 border-t border-white/10 space-y-2.5">
              <div class="flex items-center justify-between text-[11px] font-mono">
                <span class="text-slate-400 flex items-center space-x-1.5">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i>
                  <span>Bảo Mật Giao Dịch:</span>
                </span>
                <span class="text-emerald-400 font-bold flex items-center space-x-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>SSL 256-BIT • PCI-DSS TIER 1</span>
                </span>
              </div>
              <div class="flex items-center justify-between text-[11px] font-mono">
                <span class="text-slate-400 flex items-center space-x-1.5">
                  <i data-lucide="check-check" class="w-3.5 h-3.5 text-cyan-400"></i>
                  <span>Chống Gian Lận Giá:</span>
                </span>
                <span class="text-cyan-300 font-bold">Anti-Tampering Guard (Active)</span>
              </div>
              <div class="flex items-center justify-between text-[11px] font-mono">
                <span class="text-slate-400 flex items-center space-x-1.5">
                  <i data-lucide="key" class="w-3.5 h-3.5 text-violet-400"></i>
                  <span>Mã Ký Số Phiên:</span>
                </span>
                <span class="text-violet-300 font-mono text-[10px] truncate max-w-[140px]">${window.AURA_SECURITY ? window.AURA_SECURITY.generateCsrfToken() : 'AURA-SEC-OK'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Interactive Payment Method Toggle
    const vietQrBox = document.getElementById('vietqr-box');
    document.querySelectorAll('input[name="chk-payment"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        playUiClickSfx();
        if (vietQrBox) {
          if (e.target.value === 'vietqr') {
            vietQrBox.classList.remove('hidden');
          } else {
            vietQrBox.classList.add('hidden');
          }
        }
      });
    });

    document.getElementById('chk-finish-btn')?.addEventListener('click', () => {
      const rawName = document.getElementById('chk-name')?.value;
      const rawPhone = document.getElementById('chk-phone')?.value;
      const rawAddress = document.getElementById('chk-address')?.value;

      const name = window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(rawName) : (rawName || '').trim();
      const phone = window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(rawPhone) : (rawPhone || '').trim();
      const address = window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(rawAddress) : (rawAddress || '').trim();

      if (!name || !phone || !address) {
        showNotificationToast('Vui lòng điền đầy đủ tên, số điện thoại và địa chỉ giao hàng');
        return;
      }

      // Re-verify cart price integrity before submitting order
      if (window.AURA_SECURITY) {
        const integrity = window.AURA_SECURITY.validateCartIntegrity(cart);
        if (!integrity.valid) {
          showNotificationToast('⚠️ Phát hiện sai lệch giá giỏ hàng. Đã khôi phục giá niêm yết an toàn.');
          renderCheckoutPage();
          return;
        }
      }

      const btnText = document.getElementById('chk-finish-text');
      if (btnText) btnText.textContent = 'ĐANG TẠO ĐƠN & KÝ SỐ MÃ HÓA...';

      setTimeout(() => {
        const newOrderId = 'AURA-2026-' + Math.floor(1000 + Math.random() * 9000);
        const orderData = {
          id: newOrderId,
          date: new Date().toLocaleDateString('vi-VN'),
          items: cart.slice(),
          subtotal: subtotal,
          discount: discount,
          shipping: 0,
          total: total,
          status: 'CRAFTING',
          statusLabel: 'Đang chuẩn bị đơn hàng',
          carrier: 'AURA White Glove Concierge Express',
          trackingNumber: 'AWG-VN-' + Math.floor(100000 + Math.random() * 900000),
          estimatedDelivery: 'Giao trong 2-3 ngày',
          paymentMethod: 'VietQR / Chuyển khoản VIP'
        };

        if (window.AURA_SECURITY) {
          window.AURA_SECURITY.logSecurityEvent('ORDER_TRANSACTION_SECURED', `Tạo đơn #${newOrderId} thành công với chữ ký số TLS 1.3`);
        }

        window.AURA_AUTH.addOrder(orderData);
        window.AURA_CART.clear();
        state.promoDiscount = 0;
        showNotificationToast('Đặt hàng thành công! Mã đơn #' + newOrderId);
        window.location.hash = '#/order-confirmation?id=' + newOrderId;
      }, 700);
    });

    refreshIcons();
  }


  // 6. MY ORDERS VIEW (#/my-orders)
  function renderMyOrdersPage() {
    renderDashboardPage('orders');
  }

  // 7. ORDER DETAIL VIEW (#/order-detail)
  function renderOrderDetailPage(orderId) {
    const user = window.AURA_AUTH ? window.AURA_AUTH.getCurrentUser() : null;
    const ordersList = (user && user.orders) ? user.orders : window.AURA_DATA.defaultUser.orders;
    const order = ordersList.find(o => o.id === orderId) || ordersList[0];

    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <a href="#/dashboard?tab=orders" class="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center space-x-1 mb-2">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>Quay lại Đơn hàng</span>
            </a>
            <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white">Chi Tiết Đơn Hàng #${order.id}</h1>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            ${order.statusLabel || 'Đang vận chuyển'}
          </span>
        </div>

        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pb-4 border-b border-white/10">
            <div>
              <span class="text-slate-400 block text-[10px]">NGÀY ĐẶT HÀNG</span>
              <span class="text-white font-bold">${order.date}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">ĐƠN VỊ VẬN CHUYỂN</span>
              <span class="text-white font-bold">${order.carrier}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">MÃ VẬN ĐƠN TRACKING</span>
              <span class="text-cyan-400 font-bold">${order.trackingNumber}</span>
            </div>
          </div>

          <!-- Items list -->
          <div class="space-y-4">
            ${(order.items || []).map(item => `
              <div class="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div class="flex items-center space-x-4">
                  <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded-xl bg-black/60 p-2" />
                  <div>
                    <h4 class="text-sm font-bold text-white">${item.name}</h4>
                    <div class="text-xs text-cyan-400 font-mono">${item.color} • Số lượng: ${item.quantity || 1}</div>
                    <div class="text-xs text-amber-300 font-mono">Khắc Laser: "${item.engraving}"</div>
                  </div>
                </div>
                <div class="text-sm font-mono font-bold text-white">$${item.price} USD</div>
              </div>
            `).join('')}
          </div>

          <!-- Total breakdown -->
          <div class="space-y-2 text-xs font-mono pt-4 border-t border-white/10">
            <div class="flex justify-between text-slate-300">
              <span>Tạm tính:</span>
              <span>$${order.subtotal} USD</span>
            </div>
            <div class="flex justify-between text-cyan-400">
              <span>Chiết khấu Voucher:</span>
              <span>-$${order.discount} USD</span>
            </div>
            <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span>TỔNG TIỀN ĐÃ THANH TOÁN:</span>
              <span class="text-cyan-400 font-mono text-lg">$${order.total} USD</span>
            </div>
          </div>

          <div class="pt-4 flex flex-wrap items-center gap-3">
            <a href="#/order-tracking?id=${order.id}" class="flex-1 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs text-center transition-all">
              THEO DÕI HÀNH TRÌNH VẬN CHUYỂN
            </a>
            <button onclick="window.print()" class="px-5 py-3 rounded-xl glass-button text-white font-mono text-xs hover:border-cyan-400 transition-all flex items-center space-x-1.5">
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>IN HÓA ĐƠN & BẢO HÀNH</span>
            </button>
          </div>
        </div>
      </section>
    `;
    refreshIcons();
  }

function renderGenericPage(route) {
    const title = route.replace('#/', '').replace('-', ' ').toUpperCase();
    mainContainer.innerHTML = `
      <section class="max-w-4xl mx-auto px-6 py-12">
        <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ AURA ONE Portal ]</span>
        <h1 class="font-heading text-3xl font-bold text-white mt-2 mb-4">${title}</h1>
        <div class="glass-panel p-8 rounded-3xl border border-white/10 text-xs text-slate-300 leading-relaxed space-y-4">
          <p>Nội dung chi tiết cho phân hệ <strong>${title}</strong> đang hoạt động ổn định trên nền tảng AURA Master V4.3.</p>
          <p>Mọi thắc mắc kỹ thuật hoặc nhu cầu hỗ trợ đặt hàng, quý khách có thể bấm nút <em>"Hỏi chuyên gia âm thanh"</em> ở góc dưới màn hình để được phục vụ 24/7.</p>
          <div class="pt-4 border-t border-white/10">
            <a href="#/" class="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs inline-block">
              Quay Về Trang Chủ
            </a>
          </div>
        </div>
      </section>
    `;
  }

  // Listen to Hash Changes
  window.addEventListener('hashchange', () => {
    renderView(window.location.hash);
  });

  // Initial Route Render
  renderView(window.location.hash || '#/');


  // ==========================================
  // AURA PROCEDURAL RELAXATION SOUNDSCAPES (5 MODES)
  // ==========================================
  let activeComfortSound = null;
  let comfortNodes = {
    gainNode: null,
    sources: [],
    intervals: [],
    oscillators: []
  };

  function generatePinkNoiseBuffer(ctx, duration = 4) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  function generateBrownNoiseBuffer(ctx, duration = 4) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.2;
    }
    return buffer;
  }

  function stopComfortSoundscape(fadeDuration = 0.3) {
    if (!comfortNodes.gainNode || !audioCtx) {
      activeComfortSound = null;
      updateSoundscapeUI();
      return;
    }
    try {
      const g = comfortNodes.gainNode;
      g.gain.setValueAtTime(g.gain.value, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + fadeDuration);
      setTimeout(() => {
        comfortNodes.sources.forEach(s => { try { s.stop(); } catch(e){} });
        comfortNodes.oscillators.forEach(o => { try { o.stop(); } catch(e){} });
        comfortNodes.intervals.forEach(i => clearInterval(i));
        comfortNodes.sources = [];
        comfortNodes.oscillators = [];
        comfortNodes.intervals = [];
        comfortNodes.gainNode = null;
        activeComfortSound = null;
        updateSoundscapeUI();
      }, fadeDuration * 1000 + 50);
    } catch(e) {
      activeComfortSound = null;
      updateSoundscapeUI();
    }
  }

  function playComfortSoundscape(type) {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // If currently running the original synth drone, mute it
    if (synthGain && audioCtx) {
      synthGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    }

    // If clicking same active soundscape, toggle off
    if (activeComfortSound === type) {
      stopComfortSoundscape(0.4);
      showNotificationToast('Đã dừng âm thanh thư giãn');
      return;
    }

    // Stop existing comfort soundscape first
    stopComfortSoundscape(0.15);
    if (typeof stopYouTubeAudio === 'function') stopYouTubeAudio();
    if (typeof stopZingAudio === 'function') stopZingAudio();
    stopMasterSoundTrack();

    setTimeout(() => {
      activeComfortSound = type;
      state.isAudioPlaying = true;

      // Master comfort gain node
      const masterGain = audioCtx.createGain();
      const userVol = (document.getElementById('soundscape-volume')?.value || 70) / 100;
      masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(userVol * 0.22, audioCtx.currentTime + 0.5);

      comfortNodes.gainNode = masterGain;

      // Route through analyser and panner
      if (!analyserNode) {
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 64;
      }
      masterGain.connect(analyserNode);
      if (pannerNode) {
        masterGain.connect(pannerNode);
      } else {
        masterGain.connect(audioCtx.destination);
      }

      const soundNames = {
        rain: 'Mưa Phùn Mùa Xuân 🌧️',
        ocean: 'Sóng Biển Hoàng Hôn 🌊',
        fire: 'Gió Thoảng Rừng Thông 🍃',
        theta: 'Chuông Thiền 432Hz 🧘',
        cosmic: 'Mây Bồng Bềnh ☁️'
      };

      if (type === 'rain') {
        // Continuous Pink Noise filtered for rain
        const rainBuffer = generatePinkNoiseBuffer(audioCtx, 4);
        const rainSource = audioCtx.createBufferSource();
        rainSource.buffer = rainBuffer;
        rainSource.loop = true;

        const rainFilter = audioCtx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(650, audioCtx.currentTime);

        const highAirFilter = audioCtx.createBiquadFilter();
        highAirFilter.type = 'peaking';
        highAirFilter.frequency.value = 3200;
        highAirFilter.gain.value = -4;

        rainSource.connect(rainFilter);
        rainFilter.connect(highAirFilter);
        highAirFilter.connect(masterGain);
        rainSource.start();
        comfortNodes.sources.push(rainSource);

        // Random subtle raindrops ping
        const rainInterval = setInterval(() => {
          if (activeComfortSound !== 'rain' || !audioCtx) return;
          try {
            const drop = audioCtx.createOscillator();
            const dropGain = audioCtx.createGain();
            const dropFreq = 2200 + Math.random() * 1600;
            drop.type = 'sine';
            drop.frequency.setValueAtTime(dropFreq, audioCtx.currentTime);
            drop.frequency.exponentialRampToValueAtTime(dropFreq * 0.4, audioCtx.currentTime + 0.035);

            dropGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
            dropGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.035);

            drop.connect(dropGain);
            dropGain.connect(masterGain);
            drop.start();
            drop.stop(audioCtx.currentTime + 0.04);
          } catch(e){}
        }, 120);
        comfortNodes.intervals.push(rainInterval);

      } else if (type === 'ocean') {
        // Ocean swell: modulated low-frequency noise
        const oceanBuffer = generatePinkNoiseBuffer(audioCtx, 5);
        const oceanSource = audioCtx.createBufferSource();
        oceanSource.buffer = oceanBuffer;
        oceanSource.loop = true;

        const oceanFilter = audioCtx.createBiquadFilter();
        oceanFilter.type = 'lowpass';
        oceanFilter.frequency.setValueAtTime(250, audioCtx.currentTime);

        // LFO for wave swells (every 8 seconds)
        const waveLfo = audioCtx.createOscillator();
        const waveGain = audioCtx.createGain();
        waveLfo.type = 'sine';
        waveLfo.frequency.setValueAtTime(0.08, audioCtx.currentTime);
        waveGain.gain.setValueAtTime(280, audioCtx.currentTime);

        waveLfo.connect(waveGain);
        waveGain.connect(oceanFilter.frequency);

        oceanSource.connect(oceanFilter);
        oceanFilter.connect(masterGain);

        oceanSource.start();
        waveLfo.start();
        comfortNodes.sources.push(oceanSource);
        comfortNodes.oscillators.push(waveLfo);

      } else if (type === 'fire') {
        // Campfire: Brown noise body + random ember crackles
        const fireBuffer = generateBrownNoiseBuffer(audioCtx, 4);
        const fireSource = audioCtx.createBufferSource();
        fireSource.buffer = fireBuffer;
        fireSource.loop = true;

        const fireFilter = audioCtx.createBiquadFilter();
        fireFilter.type = 'lowpass';
        fireFilter.frequency.setValueAtTime(320, audioCtx.currentTime);

        fireSource.connect(fireFilter);
        fireFilter.connect(masterGain);
        fireSource.start();
        comfortNodes.sources.push(fireSource);

        // Crackling ember sparks
        const fireInterval = setInterval(() => {
          if (activeComfortSound !== 'fire' || !audioCtx) return;
          if (Math.random() > 0.45) {
            try {
              const spark = audioCtx.createBufferSource();
              const sparkBuffer = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * 0.02), audioCtx.sampleRate);
              const data = sparkBuffer.getChannelData(0);
              for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 150);
              spark.buffer = sparkBuffer;

              const sparkFilter = audioCtx.createBiquadFilter();
              sparkFilter.type = 'highpass';
              sparkFilter.frequency.value = 1800;

              const sparkGain = audioCtx.createGain();
              sparkGain.gain.value = 0.04;

              spark.connect(sparkFilter);
              sparkFilter.connect(sparkGain);
              sparkGain.connect(masterGain);
              spark.start();
            } catch(e){}
          }
        }, 90);
        comfortNodes.intervals.push(fireInterval);

      } else if (type === 'theta') {
        // Theta 432Hz Healing Frequency & Binaural Beats
        const oscLeft = audioCtx.createOscillator();
        const oscRight = audioCtx.createOscillator();
        const subDrone = audioCtx.createOscillator();

        oscLeft.type = 'sine';
        oscLeft.frequency.setValueAtTime(432, audioCtx.currentTime); // A4 432Hz

        oscRight.type = 'sine';
        oscRight.frequency.setValueAtTime(436, audioCtx.currentTime); // 4Hz Theta beat

        subDrone.type = 'sine';
        subDrone.frequency.setValueAtTime(108, audioCtx.currentTime); // Harmonic octave

        const subGain = audioCtx.createGain();
        subGain.gain.setValueAtTime(0.35, audioCtx.currentTime);

        subDrone.connect(subGain);
        subGain.connect(masterGain);
        oscLeft.connect(masterGain);
        oscRight.connect(masterGain);

        oscLeft.start();
        oscRight.start();
        subDrone.start();
        comfortNodes.oscillators.push(oscLeft, oscRight, subDrone);

      } else if (type === 'cosmic') {
        // Deep Space Cmaj9 Ambient Pad
        const freqs = [130.81, 164.81, 196.00, 246.94, 293.66]; // C3, E3, G3, B3, D4
        freqs.forEach((f, idx) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.type = (idx % 2 === 0) ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(f + (Math.random() * 0.4 - 0.2), audioCtx.currentTime);

          g.gain.setValueAtTime(0.2, audioCtx.currentTime);
          osc.connect(g);
          g.connect(masterGain);
          osc.start();
          comfortNodes.oscillators.push(osc);
        });

        // Filter sweep
        const sweepFilter = audioCtx.createBiquadFilter();
        sweepFilter.type = 'lowpass';
        sweepFilter.frequency.setValueAtTime(480, audioCtx.currentTime);
        sweepFilter.Q.value = 2.0;

        const sweepLfo = audioCtx.createOscillator();
        const sweepGain = audioCtx.createGain();
        sweepLfo.frequency.setValueAtTime(0.08, audioCtx.currentTime);
        sweepGain.gain.setValueAtTime(250, audioCtx.currentTime);

        sweepLfo.connect(sweepGain);
        sweepGain.connect(sweepFilter.frequency);
        sweepLfo.start();
        comfortNodes.oscillators.push(sweepLfo);
      }

      updateSoundscapeUI();
      showNotificationToast('Đang phát: ' + (soundNames[type] || 'Âm thanh thư giãn'));
    }, 180);
  }

  function updateSoundscapeUI() {
    // Update modal cards
    document.querySelectorAll('.soundscape-card').forEach(card => {
      const sound = card.getAttribute('data-sound');
      const isMatch = sound === activeComfortSound;
      const badge = card.querySelector('.soundscape-badge');
      if (isMatch) {
        card.classList.add('border-cyan-400', 'bg-cyan-500/15', 'shadow-[0_0_15px_rgba(0,242,254,0.3)]');
        card.classList.remove('border-white/10', 'bg-white/[0.04]');
        if (badge) {
          badge.textContent = 'PLAYING';
          badge.classList.remove('bg-white/5', 'text-slate-400');
          badge.classList.add('bg-cyan-400', 'text-black', 'font-bold');
        }
      } else {
        card.classList.remove('border-cyan-400', 'bg-cyan-500/15', 'shadow-[0_0_15px_rgba(0,242,254,0.3)]');
        card.classList.add('border-white/10', 'bg-white/[0.04]');
        if (badge) {
          badge.textContent = 'OFF';
          badge.classList.add('bg-white/5', 'text-slate-400');
          badge.classList.remove('bg-cyan-400', 'text-black', 'font-bold');
        }
      }
    });

    // Update Header Audio button
    const audioText = document.getElementById('audio-text');
    const audioBars = document.getElementById('sound-bars-indicator');
    const audioIcon = document.getElementById('audio-icon');

    if (activeComfortSound) {
      if (audioText) audioText.textContent = activeComfortSound.toUpperCase();
      if (audioBars) {
        audioBars.querySelectorAll('.sound-bar').forEach(b => b.classList.remove('paused'));
      }
      if (audioIcon) {
        audioIcon.classList.remove('text-slate-400');
        audioIcon.classList.add('text-cyan-400');
      }
    } else if (!state.isAudioPlaying) {
      if (audioText) audioText.textContent = 'SOUND OFF';
      if (audioBars) {
        audioBars.querySelectorAll('.sound-bar').forEach(b => b.classList.add('paused'));
      }
      if (audioIcon) {
        audioIcon.classList.add('text-slate-400');
        audioIcon.classList.remove('text-cyan-400');
      }
    }
  }

  // ==========================================
  // 5. UI INTERACTIVE CONTROLS
  // ==========================================

  // Preloader
  const loaderProgress = document.getElementById('loader-progress');
  const loaderPercent = document.getElementById('loader-percent');
  const startBtn = document.getElementById('start-btn');
  const preloader = document.getElementById('preloader');

  let progress = 0;
  let entered = false;

  function enterSite() {
    if (entered) return;
    entered = true;
    clearInterval(loadInterval);
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    if (typeof initAudioSynthesizer === 'function') initAudioSynthesizer();
    if (preloader) {
      preloader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => preloader.remove(), 600);
    }
  }

  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 30) + 25;
    if (progress > 100) progress = 100;
    if (loaderProgress) loaderProgress.style.width = progress + '%';
    if (loaderPercent) loaderPercent.textContent = progress + '%';

    if (progress === 100) {
      clearInterval(loadInterval);
      if (startBtn) startBtn.classList.remove('hidden');
      // Auto enter after smooth 300ms transition
      setTimeout(enterSite, 300);
    }
  }, 60);

  // Fallback safety timeout: guaranteed entry within 1.5s
  setTimeout(enterSite, 1500);

  startBtn?.addEventListener('click', enterSite);
  preloader?.addEventListener('click', enterSite);

  // 360 Inspect
  const inspectBtn = document.getElementById('inspect-360-btn');
  const inspectText = document.getElementById('inspect-360-text');
  const inspectHint = document.getElementById('inspect-hint');

  inspectBtn?.addEventListener('click', () => {
    playUiClickSfx();
    state.isInspect360 = !state.isInspect360;

    if (state.isInspect360) {
      document.body.style.overflow = 'hidden';
      controls.enabled = true;
      inspectText.textContent = 'Exit 360°';
      inspectBtn.classList.add('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
      inspectHint?.classList.remove('hidden');
    } else {
      document.body.style.overflow = '';
      controls.enabled = false;
      controls.reset();
      inspectText.textContent = 'Inspect 360°';
      inspectBtn.classList.remove('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
      inspectHint?.classList.add('hidden');
    }
  });

  // Reduce Motion
  document.getElementById('reduce-motion-btn')?.addEventListener('click', () => {
    playUiClickSfx();
    state.reduceMotion = !state.reduceMotion;
    const btn = document.getElementById('reduce-motion-btn');
    const text = document.getElementById('reduce-motion-text');
    if (state.reduceMotion) {
      btn.classList.add('text-cyan-400', 'border-cyan-400');
      if (text) text.textContent = 'Comfort: ON';
      gsap.to(headphoneRoot.rotation, { x: 0, y: 0, duration: 0.5 });
      showToast('Đã bật chế độ giảm chuyển động (Comfort Mode)');
    } else {
      btn.classList.remove('text-cyan-400', 'border-cyan-400');
      if (text) text.textContent = 'Comfort: OFF';
    }
  });

  // Drawer
  
  // Drawer Real-time Cart Updater
  // Drawer Real-time Cart Updater
  function updateDrawerCartUI() {
    window.updateDrawerCartUI = updateDrawerCartUI;
    const cart = window.AURA_CART ? window.AURA_CART.getCart() : [];
    const subtotal = window.AURA_CART ? window.AURA_CART.getSubtotal() : 0;
    const discount = state.promoDiscount || 0;
    const finalTotal = Math.max(0, subtotal - discount);

    const subtotalVal = document.getElementById('subtotal-val');
    const totalVal = document.getElementById('total-val');
    const discountRow = document.getElementById('discount-row');
    const discountVal = document.getElementById('discount-val');
    const itemsList = document.getElementById('drawer-items-list');

    if (subtotalVal) subtotalVal.textContent = '$' + subtotal + '.00';
    if (totalVal) totalVal.textContent = '$' + finalTotal + '.00';
    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        if (discountVal) discountVal.textContent = '-$' + discount + '.00';
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (window.AURA_CART) window.AURA_CART.updateHeaderBadge();

    if (!itemsList) return;

    if (cart.length === 0) {
      itemsList.innerHTML = '<div class="text-center py-8 space-y-2"><div class="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2"><i data-lucide="shopping-bag" class="w-6 h-6"></i></div><div class="text-sm font-bold text-white">Giỏ Hàng Đang Trống</div><p class="text-xs text-slate-400">Chọn một chiếc tai nghe hoặc phụ kiện để đặt hàng.</p></div>';
      if (typeof refreshIcons === 'function') refreshIcons();
      return;
    }

    itemsList.innerHTML = cart.map(item => {
      const itPrice = parseFloat(item.price) || 0;
      const itQty = item.quantity || 1;
      const itImg = item.image || 'assets/media/hero-titanium-studio.png';
      return '<div class="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 transition-all">' +
        '<img src="' + itImg + '" alt="' + item.name + '" class="w-12 h-12 object-contain rounded-xl bg-black/60 p-1 border border-white/5 shrink-0" />' +
        '<div class="flex-1 min-w-0">' +
          '<div class="font-bold text-xs text-white truncate">' + item.name + '</div>' +
          '<div class="text-[10px] font-mono text-cyan-400">$' + itPrice + '.00</div>' +
        '</div>' +
        '<div class="flex items-center space-x-1.5 bg-black/60 px-2 py-1 rounded-lg border border-white/15 shrink-0">' +
          '<button class="drawer-qty-minus text-slate-400 hover:text-white text-xs px-1 font-bold" data-id="' + item.id + '">-</button>' +
          '<span class="text-xs font-mono font-bold text-white w-4 text-center">' + itQty + '</span>' +
          '<button class="drawer-qty-plus text-slate-400 hover:text-white text-xs px-1 font-bold" data-id="' + item.id + '">+</button>' +
        '</div>' +
        '<button class="drawer-remove-item p-1.5 text-slate-400 hover:text-rose-400 transition-colors shrink-0" data-id="' + item.id + '" title="Xóa">' +
          '<i data-lucide="trash-2" class="w-3.5 h-3.5"></i>' +
        '</button>' +
      '</div>';
    }).join('');

    itemsList.querySelectorAll('.drawer-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const it = cart.find(x => x.id === id);
        if (it && it.quantity > 1) {
          window.AURA_CART.updateQuantity(id, it.quantity - 1);
          updateDrawerCartUI();
        } else if (it) {
          window.AURA_CART.removeItem(id);
          updateDrawerCartUI();
        }
      });
    });

    itemsList.querySelectorAll('.drawer-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const it = cart.find(x => x.id === id);
        if (it) {
          window.AURA_CART.updateQuantity(id, (it.quantity || 1) + 1);
          updateDrawerCartUI();
        }
      });
    });

    itemsList.querySelectorAll('.drawer-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        window.AURA_CART.removeItem(id);
        updateDrawerCartUI();
        showNotificationToast('Đã xóa sản phẩm khỏi giỏ hàng');
      });
    });

    if (typeof refreshIcons === 'function') refreshIcons();
  }

  const drawer = document.getElementById('checkout-drawer');
  document.getElementById('header-cart-btn')?.addEventListener('click', () => {
    playUiClickSfx();
    drawer?.classList.remove('translate-x-full');
    updateDrawerCartUI();
  });
  document.getElementById('close-drawer-btn')?.addEventListener('click', () => {
    playUiClickSfx();
    drawer?.classList.add('translate-x-full');
  });

  // Drawer Promo code
  document.getElementById('apply-promo-btn')?.addEventListener('click', () => {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    const code = document.getElementById('promo-input')?.value?.trim().toUpperCase();
    if (code === 'AURA50' || code === 'AURA2026' || code === 'VIP') {
      state.promoDiscount = 50;
      showNotificationToast('Áp dụng thành công mã ' + code + ' (-$50 USD)!');
      updateDrawerCartUI();
    } else {
      showNotificationToast('Mã ưu đãi không hợp lệ.');
    }
  });

  // Drawer navigation to checkout and cart page
  document.getElementById('drawer-to-checkout-btn')?.addEventListener('click', (e) => {
    const cart = window.AURA_CART ? window.AURA_CART.getCart() : [];
    if (cart.length === 0) {
      e.preventDefault();
      if (typeof showToast === 'function') showToast('Giỏ hàng đang trống! Vui lòng chọn một sản phẩm.');
      drawer?.classList.add('translate-x-full');
      window.location.hash = '#/store';
      return;
    }
    drawer?.classList.add('translate-x-full');
  });
  document.getElementById('drawer-to-cart-page-btn')?.addEventListener('click', () => {
    drawer?.classList.add('translate-x-full');
  });

  // Sticky Buy Bar Customize Trigger
  document.getElementById('sticky-custom-btn')?.addEventListener('click', () => {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    window.location.hash = '#/studio';
  });

    // ========================================================
  // AURA NEURAL AUDIO AI AGENT 2.0 (FULL CONCIERGE ENGINE)
  // ========================================================
  const conciergeModal = document.getElementById('concierge-modal');
  const conciergeContainer = document.getElementById('concierge-container');
  const conciergeMessages = document.getElementById('concierge-messages');
  const conciergeInput = document.getElementById('concierge-user-input');
  const conciergeSendBtn = document.getElementById('concierge-send-btn');
  const conciergeForm = document.getElementById('concierge-form');
  const conciergeTyping = document.getElementById('concierge-typing-indicator');
  const conciergeResetBtn = document.getElementById('concierge-reset-btn');
  const conciergeExpandBtn = document.getElementById('concierge-expand-btn');
  const conciergeExpandIcon = document.getElementById('concierge-expand-icon');
  const conciergeClearInput = document.getElementById('concierge-clear-input');

  let isAgentTyping = false;
  let isChatInitialized = false;

  // Open / Close Modal Event Listeners
  function openConcierge() {
    playUiClickSfx();
    conciergeModal?.classList.remove('hidden');
    if (!isChatInitialized) {
      initConciergeChat();
      isChatInitialized = true;
    }
    setTimeout(() => {
      conciergeInput?.focus();
      scrollConciergeToBottom();
    }, 150);
  }

  function closeConcierge() {
    playUiClickSfx();
    conciergeModal?.classList.add('hidden');
  }

  document.getElementById('concierge-btn')?.addEventListener('click', openConcierge);
  document.getElementById('header-concierge-btn')?.addEventListener('click', openConcierge);
  document.getElementById('mobile-concierge-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu-drawer')?.classList.add('-translate-y-full');
    openConcierge();
  });
  document.getElementById('close-concierge-btn')?.addEventListener('click', closeConcierge);

  // Close on backdrop click (outside container)
  conciergeModal?.addEventListener('click', (e) => {
    if (e.target === conciergeModal) {
      closeConcierge();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !conciergeModal?.classList.contains('hidden')) {
      closeConcierge();
    }
  });

  // Toggle Fullscreen Modal
  conciergeExpandBtn?.addEventListener('click', () => {
    playUiClickSfx();
    conciergeContainer?.classList.toggle('fullscreen-modal');
    const isFull = conciergeContainer?.classList.contains('fullscreen-modal');
    if (conciergeExpandIcon) {
      conciergeExpandIcon.setAttribute('data-lucide', isFull ? 'minimize-2' : 'maximize-2');
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }
    scrollConciergeToBottom();
  });

  // Clear Input Button
  conciergeInput?.addEventListener('input', () => {
    if (conciergeClearInput) {
      if (conciergeInput.value.length > 0) {
        conciergeClearInput.classList.remove('hidden');
      } else {
        conciergeClearInput.classList.add('hidden');
      }
    }
  });

  conciergeClearInput?.addEventListener('click', () => {
    if (conciergeInput) {
      conciergeInput.value = '';
      conciergeClearInput.classList.add('hidden');
      conciergeInput.focus();
    }
  });

  // Reset Conversation
  conciergeResetBtn?.addEventListener('click', () => {
    playUiClickSfx();
    if (conciergeMessages) {
      conciergeMessages.innerHTML = '';
      initConciergeChat();
      showToast('Đã làm mới cuộc hội thoại cùng Chuyên Gia AI!');
    }
  });

  function scrollConciergeToBottom() {
    if (!conciergeMessages) return;
    conciergeMessages.scrollTo({
      top: conciergeMessages.scrollHeight,
      behavior: 'smooth'
    });
  }

  // Initial Welcome Message
  function initConciergeChat() {
    if (!conciergeMessages) return;
    conciergeMessages.innerHTML = `
      <div class="chat-bubble-agent p-4 rounded-2xl text-xs text-slate-200 leading-relaxed space-y-3">
        <div class="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
          <div class="w-6 h-6 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <i data-lucide="bot" class="w-3.5 h-3.5 text-cyan-400"></i>
          </div>
          <span>Xin chào! Tôi là AURA Neural Audio AI Agent 2.0</span>
        </div>
        <p class="text-slate-300 text-xs leading-relaxed">
          Tôi là kỹ sư âm học ảo kiêm trợ lý thông minh độc quyền của thương hiệu AURA. Tôi có thể giải đáp chi tiết kỹ thuật âm thanh, tư vấn gu nghe, và <b>trực tiếp điều khiển trang web 3D</b> theo khẩu lệnh của bạn:
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium text-slate-300 pt-1">
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5 hover:border-cyan-400/30 transition-all cursor-pointer chat-quick-reply" data-quick="Tư vấn chọn tai nghe theo thể loại nhạc tôi hay nghe">
            <span class="text-base">🎧</span>
            <span>Tư vấn chất âm theo gu nhạc</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5 hover:border-amber-400/30 transition-all cursor-pointer chat-quick-reply" data-quick="Đổi màu tai nghe 3D sang Vàng 24K Royal Gold">
            <span class="text-base">👑</span>
            <span>Đổi màu 3D theo khẩu lệnh</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5 hover:border-purple-400/30 transition-all cursor-pointer chat-quick-reply" data-quick="Bóc tách màng loa 3D và giải thích công nghệ Beryllium">
            <span class="text-base">🔬</span>
            <span>Bóc tách màng loa Beryllium</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5 hover:border-cyan-400/30 transition-all cursor-pointer chat-quick-reply" data-quick="Bật phát thử bài nhạc Liêu Xiêu chất lượng cao 8D">
            <span class="text-base">🎵</span>
            <span>Bật nhạc Liêu Xiêu 8D Lossless</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5 hover:border-emerald-400/30 transition-all cursor-pointer chat-quick-reply" data-quick="Tôi muốn nhận mã giảm giá $50 cho đơn hàng">
            <span class="text-base">🎁</span>
            <span>Tặng & nạp mã giảm giá $50</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5 hover:border-sky-400/30 transition-all cursor-pointer chat-quick-reply" data-quick="Kiểm tra bảo hành chính hãng và thời gian giao hàng">
            <span class="text-base">🔍</span>
            <span>Tra cứu bảo hành & mã Serial</span>
          </div>
        </div>
        <p class="text-[11px] text-cyan-300/80 italic flex items-center space-x-1.5 pt-1">
          <i data-lucide="sparkles" class="w-3 h-3 text-cyan-400"></i>
          <span>Bạn có thể bấm các gợi ý trên hoặc gõ câu hỏi bất kỳ để tôi hỗ trợ ngay!</span>
        </p>
      </div>
    `;
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    scrollConciergeToBottom();
  }

  // Append Chat Message Bubble
  function appendChatBubble(role, contentHtml, isHtml = false) {
    if (!conciergeMessages) return;
    const bubbleWrapper = document.createElement('div');
    
    if (role === 'user') {
      bubbleWrapper.className = 'flex justify-end';
      bubbleWrapper.innerHTML = `
        <div class="chat-bubble-user text-cyan-200 px-4 py-2.5 rounded-2xl text-xs max-w-[85%] leading-relaxed">
          ${isHtml ? contentHtml : escapeHtml(contentHtml)}
        </div>
      `;
    } else {
      bubbleWrapper.className = 'flex items-start space-x-2.5 max-w-[92%]';
      bubbleWrapper.innerHTML = `
        <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
          <i data-lucide="bot" class="w-4 h-4 text-cyan-400"></i>
        </div>
        <div class="chat-bubble-agent text-slate-200 p-3.5 rounded-2xl text-xs leading-relaxed space-y-2.5 flex-1">
          ${contentHtml}
        </div>
      `;
    }

    conciergeMessages.appendChild(bubbleWrapper);
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    scrollConciergeToBottom();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Core Agent Decision Engine & Knowledge Base
  function processAgentQuery(query) {
    const q = query.toLowerCase().trim();

    // 1. DIRECT 3D MODEL COLOR THEME CONTROL
    if (q.includes('vàng') || q.includes('gold') || q.includes('24k') || q.includes('hoàng gia')) {
      if (typeof applyColorTheme === 'function') applyColorTheme('gold');
      showToast('Đã đổi màu mô hình 3D sang Vàng 24K Royal Gold!');
      return {
        text: `
          <div class="space-y-2">
            <div class="flex items-center space-x-1.5 text-amber-400 font-bold">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Lệnh 3D thành công: Đã chuyển sang Vàng 24K Royal Gold!</span>
            </div>
            <p class="text-slate-300">
              Mô hình 3D trên màn hình chính đã được cập nhật lớp mạ gương vàng PVD 24K kết hợp khung obsidian đen mờ. Bạn có thể kéo chuột để xoay và chiêm ngưỡng độ phản xạ ánh kim sang trọng!
            </p>
            ${renderProductActionCard({
              id: 'prod-gold',
              name: 'AURA ONE 24K Luxury Gold & Obsidian',
              price: 449,
              tag: 'Royal Edition • Vàng 24K PVD',
              image: 'assets/media/luxury-black-gold.png',
              desc: 'Phiên bản Hoàng Gia đúc thủ công với chi tiết mạ vàng 24K và da cừu thuộc cao cấp.'
            })}
          </div>
        `
      };
    }

    if (q.includes('titan') || q.includes('titanium') || (q.includes('đen') && !q.includes('vàng'))) {
      if (typeof applyColorTheme === 'function') applyColorTheme('titanium');
      showToast('Đã đổi màu mô hình 3D sang Titanium Graphite Studio!');
      return {
        text: `
          <div class="space-y-2">
            <div class="flex items-center space-x-1.5 text-cyan-400 font-bold">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Lệnh 3D thành công: Đã chuyển sang Titanium Graphite Studio!</span>
            </div>
            <p class="text-slate-300">
              Khung hợp kim nhôm-magiê hàng không 6061 phay xước đồng tâm CNC với tone màu xám khói Cyber Stealth đã sẵn sàng trên không gian 3D.
            </p>
            ${renderProductActionCard({
              id: 'prod-titanium',
              name: 'AURA ONE Titanium Graphite Studio',
              price: 399,
              tag: 'Cyber Architecture • Flagship',
              image: 'assets/media/hero-titanium-studio.png',
              desc: 'Phiên bản phòng thu chuẩn Mastering với độ cân bằng âm sắc tham chiếu tuyệt đối.'
            })}
          </div>
        `
      };
    }

    if (q.includes('đồng') || q.includes('copper') || q.includes('amber') || q.includes('hổ phách')) {
      if (typeof applyColorTheme === 'function') applyColorTheme('copper');
      showToast('Đã đổi màu mô hình 3D sang Warm Amber Copper!');
      return {
        text: `
          <div class="space-y-2">
            <div class="flex items-center space-x-1.5 text-amber-500 font-bold">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Lệnh 3D thành công: Đã chuyển sang Bespoke Warm Amber Copper!</span>
            </div>
            <p class="text-slate-300">
              Tone màu đồng hổ phách ấm áp mang hơi hướng cổ điển Analog Studio. Đây là phiên bản được các nhạc trưởng và nhà sản xuất âm nhạc Vocal/Jazz yêu thích nhất.
            </p>
            ${renderProductActionCard({
              id: 'prod-copper',
              name: 'AURA ONE Bespoke Warm Amber Copper',
              price: 399,
              tag: 'Audiophile Edition • Warm Amber',
              image: 'assets/media/studio-copper-warm.png',
              desc: 'Thiết kế kim loại đồng thau đúc ấm áp, tối ưu cho dải trung mượt mà và nhạc cụ mộc.'
            })}
          </div>
        `
      };
    }

    if (q.includes('trắng') || q.includes('pearl') || q.includes('bạch kim') || q.includes('ngọc trai')) {
      if (typeof applyColorTheme === 'function') applyColorTheme('pearl');
      showToast('Đã đổi màu mô hình 3D sang Pearl Minimalist White!');
      return {
        text: `
          <div class="space-y-2">
            <div class="flex items-center space-x-1.5 text-slate-100 font-bold">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Lệnh 3D thành công: Đã chuyển sang Pearl Minimalist White!</span>
            </div>
            <p class="text-slate-300">
              Phối màu trắng ngọc trai tối giản Bắc Âu (Nordic Clean) với quai vòm vàng hồng và đệm tai nhung tuyết siêu êm.
            </p>
            ${renderProductActionCard({
              id: 'prod-pearl',
              name: 'AURA ONE Pearl Minimalist White',
              price: 399,
              tag: 'Nordic Edition • Pure White',
              image: 'assets/media/minimal-pearl-white.png',
              desc: 'Phong cách tối giản thuần khiết kết hợp chất âm trong trẻo, âm trường đa hướng rộng mở.'
            })}
          </div>
        `
      };
    }

    if (q.includes('cyan') || q.includes('xanh dương') || q.includes('redefined')) {
      if (typeof applyColorTheme === 'function') applyColorTheme('redefined');
      showToast('Đã đổi màu mô hình 3D sang Electric Cyan 8D Master!');
      return {
        text: `
          <div class="space-y-2">
            <div class="flex items-center space-x-1.5 text-cyan-300 font-bold">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Lệnh 3D thành công: Đã chuyển sang Electric Cyan 8D Master!</span>
            </div>
            <p class="text-slate-300">
              Phiên bản chữ ký Spatial Audio với dải đèn LED Cyan huyền ảo quanh vành buồng âm bán hở.
            </p>
            ${renderProductActionCard({
              id: 'prod-cyan',
              name: 'AURA ONE Electric Cyan 8D Master',
              price: 429,
              tag: 'Spatial Signature • Electric Cyan',
              image: 'assets/media/ui-hero-sound-redefined.png',
              desc: 'Tối ưu cho không gian âm thanh 8D, màng loa Beryllium kép và chip DSP Neural H1.'
            })}
          </div>
        `
      };
    }

    // 2. MUSIC GENRE CONSULTATION
    if (q.includes('vocal') || q.includes('jazz') || q.includes('bolero') || q.includes('ballad') || q.includes('nhạc vàng') || q.includes('không lời') || q.includes('acoustic') || q.includes('piano') || q.includes('trữ tình')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-cyan-300 font-bold flex items-center space-x-1.5">
              <i data-lucide="music" class="w-4 h-4"></i>
              <span>Tư vấn Chuyên Gia: Gu nhạc Vocal, Jazz & Acoustic</span>
            </div>
            <p class="text-slate-300">
              Với thể loại Vocal, Jazz và Nhạc mộc, bạn cần một tai nghe có <b>dải Mid ngọt ngào, âm sắc ấm áp và dải Treble mịn màng không chói gắt</b>:
            </p>
            <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside bg-white/5 p-2.5 rounded-xl border border-white/5">
              <li><b>Màng loa 45mm Pure Beryllium:</b> Tốc độ truyền âm 12,890 m/s tái hiện từng tiếng rung dây đàn guitar và hơi thở ca sĩ cực kỳ chân thực.</li>
              <li><b>Đệm da cừu Alcantara:</b> Tạo buồng cách âm thụ động tự nhiên, giữ độ ngân vang của giọng hát không bị phân tán.</li>
              <li><b>Phiên bản khuyên dùng:</b> <b>Bespoke Warm Amber Copper</b> hoặc <b>Pearl Minimalist White</b>.</li>
            </ul>
            ${renderProductActionCard({
              id: 'prod-copper',
              name: 'AURA ONE Bespoke Warm Amber Copper',
              price: 399,
              tag: 'Đề Xuất Cho Vocal & Jazz',
              image: 'assets/media/studio-copper-warm.png',
              desc: 'Tái tạo chất âm analog ấm áp, âm trường tự nhiên như đang ngồi trong phòng thu.'
            })}
          </div>
        `
      };
    }

    if (q.includes('edm') || q.includes('bass') || q.includes('vinahouse') || q.includes('dance') || q.includes('hip hop') || q.includes('rap') || q.includes('rock') || q.includes('metal') || q.includes('nhạc trẻ') || q.includes('đập mạnh') || q.includes('lực') || q.includes('trầm')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-cyan-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="zap" class="w-4 h-4"></i>
              <span>Tư vấn Chuyên Gia: Gu nhạc EDM, Basshead, Hip-Hop & Rock</span>
            </div>
            <p class="text-slate-300">
              Nếu bạn là tín đồ của tiếng Bass uy lực, sâu lắng và tốc độ đánh dứt khoát:
            </p>
            <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside bg-white/5 p-2.5 rounded-xl border border-white/5">
              <li><b>Dải trầm xuống tận 5Hz:</b> Buồng âm Resonance Chamber kết hợp vành thoát khí Perforated Chrome giải tỏa áp suất nén, mang lại Sub-Bass rung lồng ngực mà không gây ù bí hay lấn dải Mid.</li>
              <li><b>Mạch khuếch đại Dual-DSP Neural H1:</b> Đáp ứng độ động tức thời (transient response) cực nhanh, nhịp beat điện tử dồn dập không bao giờ bị rối.</li>
              <li><b>Phiên bản khuyên dùng:</b> <b>Titanium Graphite Studio</b> hoặc <b>Electric Cyan 8D Master</b>.</li>
            </ul>
            ${renderProductActionCard({
              id: 'prod-titanium',
              name: 'AURA ONE Titanium Graphite Studio',
              price: 399,
              tag: 'Đề Xuất Cho EDM & Basshead',
              image: 'assets/media/hero-titanium-studio.png',
              desc: 'Chassis hợp kim nhôm cứng cáp, triệt tiêu méo tiếng bass ở mức âm lượng tối đa.'
            })}
          </div>
        `
      };
    }

    if (q.includes('cổ điển') || q.includes('giao hưởng') || q.includes('symphony') || q.includes('hòa tấu') || q.includes('âm trường') || q.includes('soundstage')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-amber-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="award" class="w-4 h-4"></i>
              <span>Tư vấn Chuyên Gia: Nhạc Giao Hưởng & Cổ Điển (Symphony)</span>
            </div>
            <p class="text-slate-300">
              Đối với dàn nhạc giao hưởng phức hợp hàng chục nhạc cụ, điểm mấu chốt là <b>âm trường 3D ba chiều (Holographic Spatial Sound) và độ bóc tách vi mô</b>:
            </p>
            <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside bg-white/5 p-2.5 rounded-xl border border-white/5">
              <li><b>Nan hoa Turbine Grille 18°:</b> Định hướng pha sóng âm đồng pha trực tiếp vào ống tai, triệt tiêu sóng triệt tiêu ở dải 3kHz - 8kHz.</li>
              <li><b>Độ méo THD <0.002%:</b> Giữ nguyên sự tách bạch của violin hàng nhất, cello hàng sau và bộ gõ hùng tráng.</li>
              <li><b>Phiên bản khuyên dùng:</b> <b>24K Luxury Gold & Obsidian</b>.</li>
            </ul>
            ${renderProductActionCard({
              id: 'prod-gold',
              name: 'AURA ONE 24K Luxury Gold & Obsidian',
              price: 449,
              tag: 'Đề Xuất Cho Nhạc Giao Hưởng',
              image: 'assets/media/luxury-black-gold.png',
              desc: 'Âm trường khoáng đạt, sang trọng tuyệt mỹ từ thiết kế tới chất âm.'
            })}
          </div>
        `
      };
    }

    if (q.includes('game') || q.includes('gaming') || q.includes('fps') || q.includes('pubg') || q.includes('stream') || q.includes('độ trễ') || q.includes('latency') || q.includes('mic')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-purple-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="gamepad-2" class="w-4 h-4"></i>
              <span>Tư vấn Chuyên Gia: Chơi Game & Họp Stream Trực Tuyến</span>
            </div>
            <p class="text-slate-300">
              AURA ONE được trang bị kết nối <b>Lossless 2.4GHz Ultra-Low Latency</b> với độ trễ chỉ <b>5ms</b> (nhanh gấp 8 lần chuẩn Bluetooth thông thường):
            </p>
            <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside bg-white/5 p-2.5 rounded-xl border border-white/5">
              <li><b>Định vị không gian 360°:</b> Nhận diện chính xác hướng tiếng bước chân, tiếng súng và khoảng cách đối thủ trong không gian 3D.</li>
              <li><b>Micro MEMS kép Neural Beamforming:</b> Lọc 99% tiếng ồn quạt máy, bàn phím cơ, cho giọng đàm thoại trong trẻo chuẩn studio.</li>
              <li><b>Thời lượng pin 55 giờ:</b> Thoải mái cày game hoặc livestream xuyên suốt cả tuần mà không cần sạc.</li>
            </ul>
            ${renderProductActionCard({
              id: 'prod-titanium',
              name: 'AURA ONE Titanium Studio + DAC Station',
              price: 399,
              tag: 'Ultra-Low Latency 5ms',
              image: 'assets/media/hero-titanium-studio.png',
              desc: 'Hỗ trợ cắm USB-C không độ trễ cho PC, PS5, Switch và smartphone.'
            })}
          </div>
        `
      };
    }

    // 3. EXPLODED ANATOMY & BERYLLIUM DRIVER
    if (q.includes('bóc tách') || q.includes('màng loa') || q.includes('cấu tạo') || q.includes('bên trong') || q.includes('linh kiện') || q.includes('beryllium') || q.includes('driver') || q.includes('ruột') || q.includes('anatomy')) {
      return {
        text: `
          <div class="space-y-2.5">
            <div class="text-purple-300 font-bold flex items-center space-x-1.5">
              <i data-lucide="layers" class="w-4 h-4 text-purple-400"></i>
              <span>Kiến Trúc Bóc Tách 8 Lớp Linh Kiện Âm Học</span>
            </div>
            <p class="text-slate-300">
              AURA ONE được cấu thành từ <b>8 lớp cơ khí & linh kiện nano siêu chính xác</b>:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-300 bg-black/40 p-3 rounded-2xl border border-white/10">
              <div>01. Mặt Ngoài Spun-Metal 6061</div>
              <div>02. Vành Thoát Âm Chrome Perforated</div>
              <div>03. Vòng Đệm Giảm Chấn Silicone Y Tế</div>
              <div>04. Buồng Âm Đa Diện Bán Hở</div>
              <div>05. Bo Mạch Chip Neural H1 32-bit</div>
              <div>06. Màng Loa 45mm Pure Beryllium</div>
              <div>07. Nan Hoa Turbine Khếch Tán 18°</div>
              <div>08. Đệm Da Cừu Memory Foam Ý</div>
            </div>
            <p class="text-[11px] text-slate-400">
              Màng loa Beryllium nguyên chất 99.8% mỏng chỉ 25µm, nhẹ hơn Titanium nhưng cứng hơn thép 4 lần, đem lại dải tần siêu rộng <b>5Hz - 48,000Hz</b>.
            </p>
            <button class="chat-action-btn w-full py-2.5 px-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold flex items-center justify-center space-x-2 transition-all shadow-md shadow-purple-500/10" data-action="explore-anatomy">
              <i data-lucide="eye" class="w-4 h-4"></i>
              <span>MỞ GIAO DIỆN BÓC TÁCH 3D INTERACTIVE</span>
            </button>
          </div>
        `
      };
    }

    // 4. MUSIC PLAYBACK CONTROLS
    if (q.includes('bật nhạc') || q.includes('nghe thử') || q.includes('liêu xiêu') || q.includes('phát nhạc') || q.includes('bài hát') || q.includes('chơi nhạc') || q.includes('can you stay') || q.includes('nhạc 8d')) {
      if (typeof playMasterSoundTrack === 'function') playMasterSoundTrack();
      showToast('Đang phát bản nhạc Liêu Xiêu (Can You Stay) 8D!');
      return {
        text: `
          <div class="space-y-2.5">
            <div class="text-cyan-400 font-bold flex items-center space-x-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Đang phát: Liêu Xiêu (Can You Stay) — Master 8D Audio</span>
            </div>
            <p class="text-slate-300">
              Hệ thống Spatial Audio Engine đã kích hoạt bản phối âm thanh vòm 8D đa hướng. Thanh Dock điều khiển ở đáy màn hình đang đồng bộ thời gian phát trực tiếp.
            </p>
            <div class="chat-action-card p-3 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-9 h-9 rounded-xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                  <i data-lucide="music-2" class="w-5 h-5 animate-pulse"></i>
                </div>
                <div>
                  <div class="text-xs font-bold text-white">Liêu Xiêu (Can You Stay)</div>
                  <div class="text-[10px] font-mono text-cyan-400">FLAC 24-bit / 96kHz Lossless</div>
                </div>
              </div>
              <button class="chat-action-btn px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center space-x-1" data-action="stop-track">
                <i data-lucide="square" class="w-3.5 h-3.5"></i>
                <span>Dừng phát</span>
              </button>
            </div>
          </div>
        `
      };
    }

    if (q.includes('tắt nhạc') || q.includes('dừng nhạc') || q.includes('ngưng nhạc') || q.includes('stop')) {
      if (typeof stopMasterSoundTrack === 'function') stopMasterSoundTrack();
      showToast('Đã dừng phát nhạc.');
      return {
        text: `
          <div class="space-y-1.5">
            <div class="text-slate-300 font-semibold flex items-center space-x-1.5">
              <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
              <span>Đã tạm dừng phát âm thanh theo yêu cầu của bạn.</span>
            </div>
            <p class="text-[11px] text-slate-400">
              Bạn có thể yêu cầu "bật nhạc" bất cứ lúc nào hoặc bấm nút Play trên thanh Audio Dock ở đáy màn hình.
            </p>
          </div>
        `
      };
    }

    // 5. DISCOUNT COUPON & PROMO
    if (q.includes('mã') || q.includes('giảm giá') || q.includes('khuyến mãi') || q.includes('voucher') || q.includes('coupon') || q.includes('discount') || q.includes('ưu đãi') || q.includes('giá') || q.includes('tiền') || q.includes('bao nhiêu') || q.includes('cost') || q.includes('price')) {
      return {
        text: `
          <div class="space-y-2.5">
            <div class="text-amber-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="gift" class="w-4 h-4 text-amber-400"></i>
              <span>Ưu Đãi Độc Quyền Flagship — Tiết Kiệm $50 USD</span>
            </div>
            <p class="text-slate-300">
              Giá niêm yết chính thức của tai nghe AURA ONE là <b>$399 USD</b> (~9.990.000₫). Khi đặt hàng qua Chuyên Gia AI hôm nay, bạn được nhận ngay voucher <b>$50 USD</b> (~1.250.000₫):
            </p>
            
            <div class="chat-action-card p-3.5 border-amber-400/40 bg-amber-950/25 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">MÃ: AURA2026</span>
                <span class="text-xs font-bold text-amber-400">- $50.00 USD</span>
              </div>
              <div class="text-[11px] text-slate-300">
                Áp dụng trừ trực tiếp vào tổng thanh toán đơn hàng tai nghe AURA ONE.
              </div>
              <button class="chat-action-btn w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-amber-400/20 transition-all active:scale-98" data-action="apply-coupon" data-code="AURA2026">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                <span>TỰ ĐỘNG ÁP DỤNG MÃ GIẢM $50 VÀO GIỎ HÀNG</span>
              </button>
            </div>
          </div>
        `
      };
    }

    // 6. WARRANTY & SERIAL LOOKUP
    if (q.includes('aura-') || q.includes('ord-') || q.includes('bảo hành') || q.includes('tra cứu') || q.includes('serial') || q.includes('đơn hàng') || q.includes('kiểm tra')) {
      const serialMatch = query.match(/[A-Za-z0-9-_]{6,}/);
      const displaySerial = serialMatch ? serialMatch[0].toUpperCase() : 'AURA-ONE-VIP-0888';

      return {
        text: `
          <div class="space-y-2.5">
            <div class="text-emerald-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
              <span>Chứng Thư Bảo Hành Số & Tra Cứu Toàn Cầu</span>
            </div>
            
            <div class="chat-action-card p-4 border-emerald-400/40 bg-emerald-950/20 space-y-2.5">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <span class="text-[10px] font-mono text-emerald-300 uppercase tracking-widest font-bold">AURA GLOBAL WARRANTY</span>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">CHÍNH HÃNG 100%</span>
              </div>
              
              <div class="text-xs font-mono text-white flex items-center justify-between">
                <span>SERIAL XÁC THỰC:</span>
                <span class="text-cyan-300 font-bold">${displaySerial}</span>
              </div>

              <div class="text-[11px] text-slate-300 space-y-1">
                <div class="flex items-center space-x-1.5">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
                  <span>Thời hạn: <b class="text-white">36 Tháng</b> (1 đổi 1 tận nhà)</span>
                </div>
                <div class="flex items-center space-x-1.5">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
                  <span>Dùng thử: <b class="text-white">30 ngày miễn phí</b> hoàn tiền 100%</span>
                </div>
                <div class="flex items-center space-x-1.5">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
                  <span>Giao hỏa tốc: <b class="text-white">2 Giờ</b> nội thành HN & TP.HCM</span>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-slate-400 italic">
              Mọi sản phẩm AURA ONE đều được bảo vệ bởi chip định danh mã hóa Holographic chống hàng giả tuyệt đối.
            </p>
          </div>
        `
      };
    }

    // 7. DAC / AMP / DRIVING CAPABILITY
    if (q.includes('dac') || q.includes('amp') || q.includes('điện thoại') || q.includes('iphone') || q.includes('android') || q.includes('pc') || q.includes('kéo nổi') || q.includes('trở kháng') || q.includes('cắm')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-cyan-300 font-bold flex items-center space-x-1.5">
              <i data-lucide="cpu" class="w-4 h-4"></i>
              <span>Giải Đáp Kỹ Thuật: Ghép Nối Thiết Bị & DAC/Amp Rời</span>
            </div>
            <p class="text-slate-300">
              <b>Câu trả lời ngắn gọn: Bạn HOÀN TOÀN KHÔNG CẦN mua thêm DAC/Amp rời!</b>
            </p>
            <div class="text-[11px] text-slate-300 space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/5">
              <div>• <b>Trở kháng 32 Ohms & Độ nhạy 108dB:</b> Tối ưu hóa cực kỳ thân thiện. Bạn chỉ cần cắm trực tiếp vào iPhone, điện thoại Android qua cổng Type-C, iPad hoặc laptop là tai nghe đã đạt mức âm lượng lớn và chi tiết sắc nét.</div>
              <div>• <b>Tích hợp sẵn Dual-DSP DAC 32-bit:</b> Bên trong tai nghe đã có sẵn 2 chip giải mã âm thanh cao cấp chạy thuật toán xử lý riêng.</div>
              <div>• <b>Nếu bạn cắm thêm DAC rời chuyên dụng</b> (như Fiio, Chord Mojo, iFi Zen): Màng loa Beryllium sẽ càng phát huy chiều sâu âm trường rộng hơn 35%.</div>
            </div>
          </div>
        `
      };
    }

    // 8. LASER ENGRAVING & CUSTOMIZATION
    if (q.includes('khắc') || q.includes('laser') || q.includes('tên') || q.includes('chữ') || q.includes('custom') || q.includes('studio') || q.includes('cá nhân hóa') || q.includes('phí')) {
      return {
        text: `
          <div class="space-y-2.5">
            <div class="text-cyan-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="feather" class="w-4 h-4"></i>
              <span>Dịch Vụ Khắc Tên Laser 3D Vi Mô — Hoàn Toàn Miễn Phí!</span>
            </div>
            <p class="text-slate-300">
              Mỗi chiếc tai nghe AURA ONE xuất xưởng đều được tặng gói <b>khắc laser 3D chính xác đến 5 micron</b> lên thanh trượt kim loại hoặc vành tai:
            </p>
            <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside bg-white/5 p-2.5 rounded-xl border border-white/5">
              <li>Bạn có thể khắc họ tên, ngày kỷ niệm, bút danh nghệ thuật hoặc chữ ký.</li>
              <li>Xem trước mô phỏng chữ khắc 3D trực tiếp theo thời gian thực trên màn hình máy tính.</li>
              <li><b>Chi phí: 0đ (MIỄN PHÍ 100%)</b> cho tất cả các đơn đặt hàng trước.</li>
            </ul>
            <button class="chat-action-btn w-full py-2.5 px-3 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-300 border border-cyan-400/40 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-400/10" data-action="open-customizer">
              <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
              <span>MỞ CUSTOMIZER STUDIO ĐỂ KHẮC TÊN 3D NGAY</span>
            </button>
          </div>
        `
      };
    }

    // 9. PIN / THỜI LƯỢNG SẠC
    if (q.includes('pin') || q.includes('battery') || q.includes('sạc') || q.includes('tiếng') || q.includes('giờ')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-emerald-400 font-bold flex items-center space-x-1.5">
              <i data-lucide="battery-charging" class="w-4 h-4"></i>
              <span>Thời Lượng Pin & Công Nghệ Sạc Nhanh GaN</span>
            </div>
            <p class="text-slate-300">
              AURA ONE sử dụng mô-đun pin lithium-polymer mật độ năng lượng cao:
            </p>
            <div class="text-[11px] text-slate-300 space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/5">
              <div>• <b>Thời gian nghe liên tục:</b> Lên tới <b>55 Giờ</b> (hoặc 45 Giờ khi bật chế độ khử ồn Neural ANC tối đa).</div>
              <div>• <b>Công nghệ sạc nhanh USB-C GaN:</b> Chỉ cần cắm sạc <b>15 phút</b> là có ngay <b>8 tiếng</b> nghe nhạc liên tục.</div>
              <div>• <b>Cắm dây không tốn pin:</b> Khi hết pin, bạn chỉ cần cắm cáp 3.5mm OFC mạ bạc đi kèm hộp để tiếp tục nghe ở chế độ Passive Analog nguyên bản.</div>
            </div>
          </div>
        `
      };
    }

    // 10. SHIPPING & RETURNS
    if (q.includes('ship') || q.includes('giao hàng') || q.includes('vận chuyển') || q.includes('đổi trả') || q.includes('bao lâu')) {
      return {
        text: `
          <div class="space-y-2">
            <div class="text-cyan-300 font-bold flex items-center space-x-1.5">
              <i data-lucide="truck" class="w-4 h-4"></i>
              <span>Chính Sách Vận Chuyển Hỏa Tốc & Dùng Thử 30 Ngày</span>
            </div>
            <div class="text-[11px] text-slate-300 space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/5">
              <div>• <b>Giao hỏa tốc 2 Giờ:</b> Áp dụng miễn phí trong nội thành Hà Nội & TP. Hồ Chí Minh.</div>
              <div>• <b>Toàn quốc 24 - 48 Giờ:</b> Miễn phí bảo hiểm hàng hóa 100% khi vận chuyển qua bưu cục an ninh cao cấp.</div>
              <div>• <b>Dùng thử 30 ngày tại nhà:</b> Quý khách trải nghiệm nếu không hoàn toàn hài lòng với chất âm có thể hoàn trả nhận lại 100% số tiền không điều kiện.</div>
            </div>
          </div>
        `
      };
    }

    // FALLBACK: GENERAL INTELLIGENT ADVISOR
    return {
      text: `
        <div class="space-y-2">
          <div class="text-slate-200 font-semibold flex items-center space-x-1.5">
            <i data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i>
            <span>Tôi đã hiểu yêu cầu của bạn về AURA ONE!</span>
          </div>
          <p class="text-slate-300">
            AURA ONE là dòng tai nghe Flagship 3D với <b>màng loa 45mm Pure Beryllium</b>, kết nối <b>Lossless 2.4GHz (5ms)</b>, thời lượng pin <b>55h</b> và bảo hành toàn cầu <b>36 tháng 1-đổi-1</b>.
          </p>
          <div class="text-[11px] text-slate-400 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
            <div class="font-bold text-cyan-300">💡 Gợi ý câu hỏi tiếp theo cho bạn:</div>
            <div class="cursor-pointer hover:text-white transition-colors chat-quick-reply" data-quick="Đổi màu tai nghe sang Vàng 24K Royal Gold">• "Đổi màu tai nghe sang Vàng 24K Royal Gold"</div>
            <div class="cursor-pointer hover:text-white transition-colors chat-quick-reply" data-quick="Tôi hay nghe nhạc trữ tình và acoustic thì chọn bản nào?">• "Tôi hay nghe nhạc trữ tình và acoustic thì chọn bản nào?"</div>
            <div class="cursor-pointer hover:text-white transition-colors chat-quick-reply" data-quick="Cho tôi xin mã giảm giá $50 để đặt hàng">• "Cho tôi xin mã giảm giá $50 để đặt hàng"</div>
          </div>
        </div>
      `
    };
  }

  // Render Product Recommendation Card Inside Chat Bubble
  function renderProductActionCard(item) {
    return `
      <div class="chat-action-card p-3 mt-2 border-cyan-400/30 bg-black/60 flex flex-col sm:flex-row items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl bg-white/5 p-1 border border-white/10 flex-shrink-0" />
        <div class="flex-1 min-w-0 text-left w-full">
          <div class="flex items-center justify-between gap-1">
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold uppercase">${item.tag}</span>
            <span class="text-xs font-bold text-white">$${item.price}.00</span>
          </div>
          <div class="text-xs font-bold text-white mt-1 truncate">${item.name}</div>
          <p class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">${item.desc || ''}</p>
          
          <div class="flex items-center space-x-2 mt-2">
            <button class="chat-action-btn flex-1 py-1.5 px-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-[11px] font-bold flex items-center justify-center space-x-1 transition-all active:scale-95" data-action="add-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>+ GIỎ HÀNG</span>
            </button>
            <button class="chat-action-btn px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold flex items-center justify-center space-x-1 transition-all" data-action="view-product" data-id="${item.id}">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>CHI TIẾT</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Handle Question Submission
  function handleConciergeUserQuery(queryText) {
    if (!queryText || isAgentTyping) return;
    const cleanText = queryText.trim();
    if (!cleanText) return;

    // Append user bubble
    appendChatBubble('user', cleanText, false);
    playUiClickSfx();

    // Clear input
    if (conciergeInput) conciergeInput.value = '';
    if (conciergeClearInput) conciergeClearInput.classList.add('hidden');

    // Show realistic typing indicator
    isAgentTyping = true;
    if (conciergeTyping) conciergeTyping.classList.remove('hidden');
    scrollConciergeToBottom();

    // Simulate Agent Thinking & Processing
    const responseDelay = Math.floor(Math.random() * 250) + 350; // 350ms - 600ms
    setTimeout(() => {
      const response = processAgentQuery(cleanText);
      if (conciergeTyping) conciergeTyping.classList.add('hidden');
      isAgentTyping = false;

      // Append agent bubble
      appendChatBubble('agent', response.text, true);
      playUiClickSfx();
    }, responseDelay);
  }

  // Event Listeners for Input Submission
  conciergeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleConciergeUserQuery(conciergeInput?.value);
  });

  conciergeSendBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    handleConciergeUserQuery(conciergeInput?.value);
  });

  conciergeInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConciergeUserQuery(conciergeInput?.value);
    }
  });

  // Action Chips on Top Bar
  document.querySelectorAll('.concierge-action-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
      handleConciergeUserQuery(prompt);
    });
  });

  // Delegated Click Listener for In-Chat Dynamic Interactive Elements
  conciergeMessages?.addEventListener('click', (e) => {
    // Quick reply pill click
    const quickPill = e.target.closest('.chat-quick-reply');
    if (quickPill) {
      const text = quickPill.getAttribute('data-quick') || quickPill.textContent.trim();
      handleConciergeUserQuery(text);
      return;
    }

    // Action button click
    const actionBtn = e.target.closest('.chat-action-btn');
    if (!actionBtn) return;

    const action = actionBtn.getAttribute('data-action');
    playUiClickSfx();

    if (action === 'add-cart') {
      const id = actionBtn.getAttribute('data-id');
      const name = actionBtn.getAttribute('data-name');
      const price = parseFloat(actionBtn.getAttribute('data-price')) || 399;
      const image = actionBtn.getAttribute('data-image');
      
      if (window.AURA_CART && typeof window.AURA_CART.addItem === 'function') {
        window.AURA_CART.addItem({ id, name, price, image });
      }
      showToast(`Đã thêm ${name} vào giỏ hàng!`);
      updateDrawerCartUI();

      // Give visual confirmation on button
      actionBtn.classList.remove('bg-cyan-400', 'text-black');
      actionBtn.classList.add('bg-emerald-500', 'text-white');
      actionBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>ĐÃ THÊM!</span>';
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    } else if (action === 'view-product') {
      const id = actionBtn.getAttribute('data-id');
      if (typeof window.openProductQuickView === 'function') {
        window.openProductQuickView(id);
      }
    } else if (action === 'apply-coupon') {
      const code = actionBtn.getAttribute('data-code') || 'AURA2026';
      if (window.AURA_CART && typeof window.AURA_CART.applyCoupon === 'function') {
        window.AURA_CART.applyCoupon(code);
      }
      showToast('Đã áp dụng mã giảm giá $50 USD thành công!');
      drawer?.classList.remove('translate-x-full');
      updateDrawerCartUI();
    } else if (action === 'explore-anatomy') {
      location.hash = '#/anatomy';
      conciergeModal?.classList.add('hidden');
      if (typeof setAnatomyExplosion === 'function') setAnatomyExplosion(0.85);
      showToast('Đã chuyển đến không gian bóc tách 3D!');
    } else if (action === 'open-customizer') {
      location.hash = '#/customizer';
      conciergeModal?.classList.add('hidden');
      showToast('Đã mở Customizer Studio để khắc tên 3D!');
    } else if (action === 'stop-track') {
      if (typeof stopMasterSoundTrack === 'function') stopMasterSoundTrack();
      showToast('Đã dừng phát âm thanh.');
      actionBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>ĐÃ DỪNG</span>';
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }
  });

  // AR Modal
  const arModal = document.getElementById('ar-modal');
  document.getElementById('ar-view-btn')?.addEventListener('click', () => {
    playUiClickSfx();
    arModal?.classList.remove('hidden');
  });
  document.getElementById('close-ar-modal-btn')?.addEventListener('click', () => {
    playUiClickSfx();
    arModal?.classList.add('hidden');
  });

  // Mouse Parallax on Hero
  window.addEventListener('mousemove', (e) => {
    if (state.isInspect360 || state.reduceMotion) return;
    state.mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    state.mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const isSplitRoute = state.currentRoute === '#/environment' || state.currentRoute === '#/studio' || state.currentRoute === '#/engraving';
    const isHome = state.currentRoute === '#/' || state.currentRoute === '' || !state.currentRoute;
    if (isHome) {
      if (window.innerWidth < 1024) {
        headphoneRoot.position.set(0, 0.45, 0);
      } else {
        headphoneRoot.position.set(0, 0.18, 0);
      }
    } else if (window.innerWidth < 1024 && isSplitRoute) {
      headphoneRoot.position.set(0, 0.5, 0);
    } else if (isSplitRoute) {
      headphoneRoot.position.set(1.25, 0.1, 0);
    }
  });

  // ==========================================
  // 5.5 DYNAMIC 3D FEATURE PINS TRACKING (Images 2 & 4 Style)
  // ==========================================
  const featurePinsData = [
    {
      id: 'pin-arch',
      label: 'POWERFUL AND LONG LASTING BATTERY (60H)',
      sub: 'Pin Li-Po 950mAh • Sạc Type-C PD 10 phút = 8 giờ',
      pos: new THREE.Vector3(0, 1.62, 0),
      side: 'right'
    },
    {
      id: 'pin-driver',
      label: 'MÀNG LOA BERYLLIUM 40MM HI-RES & SECURE SOUND',
      sub: '5Hz - 48kHz • Méo hài < 0.05% THD Studio',
      pos: new THREE.Vector3(1.45, -0.15, 0.45),
      side: 'right'
    },
    {
      id: 'pin-anc',
      label: 'AI HYBRID NOISE CANCELLATION -48dB',
      sub: 'Chip Neural AI 48,000 lần quét/giây • Triệt tiêu 0.02ms',
      pos: new THREE.Vector3(1.45, -0.65, 0.35),
      side: 'right'
    },
    {
      id: 'pin-controls',
      label: 'CẢM ỨNG & VÒNG PHAY CNC CHÍNH XÁC',
      sub: 'Thao tác Haptic mượt mà & phay xước đồng tâm',
      pos: new THREE.Vector3(-1.45, -0.15, 0.45),
      side: 'left'
    }
  ];

  const pinsContainer = document.getElementById('feature-pins-container');
  const pinElements = [];

  if (pinsContainer) {
    pinsContainer.innerHTML = '';
    featurePinsData.forEach(p => {
      const el = document.createElement('div');
      el.className = `feature-pin ${p.side === 'left' ? 'pin-left' : ''}`;
      el.id = p.id;
      el.innerHTML = `
        <div class="pin-anchor">
          <div class="pin-pulse"></div>
          <div class="pin-dot"></div>
        </div>
        <div class="pin-card">
          <div class="text-[11px] font-heading font-bold text-white flex items-center space-x-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>${p.label}</span>
          </div>
          <div class="text-[9px] font-mono text-cyan-300 mt-0.5">${p.sub}</div>
        </div>
      `;
      el.addEventListener('click', () => {
        playUiClickSfx();
        if (p.id === 'pin-driver') location.hash = '#/anatomy';
        else if (p.id === 'pin-arch') location.hash = '#/overview';
        else if (p.id === 'pin-anc') location.hash = '#/anc';
        else if (p.id === 'pin-controls') location.hash = '#/specs';
      });
      pinsContainer.appendChild(el);
      pinElements.push({ el, pos: p.pos });
    });
  }

  const tempScreenPos = new THREE.Vector3();
  function updateFeaturePins() {
    if (!pinsContainer) return;
    const isHome = (state.currentRoute === '#/' || state.currentRoute === '' || !state.currentRoute) && !state.isInspect360;
    if (!isHome || window.innerWidth < 768) {
      pinElements.forEach(p => { p.el.style.opacity = '0'; p.el.style.pointerEvents = 'none'; });
      return;
    }
    headphoneRoot.updateMatrixWorld();
    pinElements.forEach(p => {
      tempScreenPos.copy(p.pos).applyMatrix4(headphoneRoot.matrixWorld);
      tempScreenPos.project(camera);
      if (tempScreenPos.z < 1) {
        const x = (tempScreenPos.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-tempScreenPos.y * 0.5 + 0.5) * window.innerHeight;
        p.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        p.el.style.opacity = '1';
        p.el.style.pointerEvents = 'auto';
      } else {
        p.el.style.opacity = '0';
        p.el.style.pointerEvents = 'none';
      }
    });
  }

  // ==========================================
  // ART LIGHTBOX MODAL CONTROLLER
  // ==========================================
  const lightboxModal = document.getElementById('art-lightbox-modal');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSub = document.getElementById('lightbox-sub');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxMedium = document.getElementById('lightbox-medium');
  const lightboxArtist = document.getElementById('lightbox-artist');
  const lightboxYear = document.getElementById('lightbox-year');
  const lightboxApplyThemeBtn = document.getElementById('lightbox-apply-theme-btn');
  let currentActiveArt = null;

  function applyArtStyleTo3D(artId) {
    playUiClickSfx();
    if (artId === 'art-1') {
      // AURA Titanium Monolith: Studio Reference
      state.currentEnv = 'neon';
      applyEnvironmentPreset('neon');
      applyColorTheme('titanium');
      if (cageGroup) cageGroup.visible = true;
      if (emberParticles) emberParticles.visible = true;
      window.location.hash = '#/environment';
      renderView('#/environment');
      showToast('⚡ Đã kích hoạt 3D Studio Titanium Monolith & Ánh sáng Cyber Cyan!');
    } else if (artId === 'art-2') {
      // Midnight Obsidian: 24K Liquid Gold Edition
      state.currentEnv = 'void';
      applyColorTheme('gold');
      applyEnvironmentPreset('void');
      if (emberParticles) emberParticles.visible = true;
      window.location.hash = '#/environment';
      renderView('#/environment');
      showToast('👑 Đã kích hoạt 3D Midnight Obsidian & Chi tiết mạ vàng 24K!');
    } else if (artId === 'art-3') {
      // Acoustic Sanctum 5909: Teardown Lab
      window.location.hash = '#/anatomy';
      renderView('#/anatomy');
      setAnatomyExplosion(1.0, 0.8);
      showToast('📐 Đã mở bóc tách 8 tầng cơ khí màng loa Beryllium!');
    } else if (artId === 'art-4') {
      // Warm Amber Studio: Analog Resonance Series
      state.currentEnv = 'amber';
      applyColorTheme('copper');
      applyEnvironmentPreset('amber');
      window.location.hash = '#/environment';
      renderView('#/environment');
      showToast('🎷 Đã kích hoạt 3D Warm Amber Studio & Đồng thau ấm áp!');
    } else if (artId === 'art-5') {
      // Sound Redefined: 8D Cybernetic Spatial Matrix
      window.location.hash = '#/spatial-audio';
      renderView('#/spatial-audio');
      setSoundProfile('8d-orbit');
      toggleAudioPlayback(true);
      showToast('🔊 Đã kích hoạt Radar Âm Thanh Không Gian 8D thời gian thực!');
    } else if (artId === 'art-6') {
      // Nordic Pearl: Sculpted Silence Minimal Couture
      state.currentEnv = 'arctic';
      applyColorTheme('pearl');
      applyEnvironmentPreset('arctic');
      window.location.hash = '#/environment';
      renderView('#/environment');
      showToast('❄️ Đã kích hoạt 3D Nordic Pearl Minimalist White & Phòng lab vô trùng!');
    } else {
      state.currentEnv = 'void';
      applyColorTheme('titanium');
      applyEnvironmentPreset('void');
      window.location.hash = '#/environment';
      renderView('#/environment');
      showToast('⚡ Đã áp dụng phong cách Titanium Graphite!');
    }
  }

  function openArtLightbox(artId) {
    const art = window.AURA_DATA.curatedArtPieces?.find(a => a.id === artId);
    if (!art || !lightboxModal) return;
    currentActiveArt = art;
    if (lightboxImg) lightboxImg.src = art.src;
    if (lightboxTag) lightboxTag.textContent = art.tag;
    if (lightboxTitle) lightboxTitle.textContent = art.title;
    if (lightboxSub) lightboxSub.textContent = art.subtitle;
    if (lightboxDesc) lightboxDesc.textContent = art.desc;
    if (lightboxMedium) lightboxMedium.textContent = art.medium;
    if (lightboxArtist) lightboxArtist.textContent = art.artist;
    if (lightboxYear) lightboxYear.textContent = `${art.year} • ${art.dimensions}`;
    lightboxModal.classList.remove('hidden');
    refreshIcons();
    playUiClickSfx();
  }

  function closeArtLightbox() {
    lightboxModal?.classList.add('hidden');
    playUiClickSfx();
  }

  closeLightboxBtn?.addEventListener('click', closeArtLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeArtLightbox();
  });

  lightboxApplyThemeBtn?.addEventListener('click', () => {
    if (!currentActiveArt) return;
    applyArtStyleTo3D(currentActiveArt.id);
    closeArtLightbox();
  });

  // MOBILE NAVIGATION DRAWER CONTROLLER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  let isMobileMenuOpen = false;

  function toggleMobileDrawer(forceClose) {
    isMobileMenuOpen = forceClose ? false : !isMobileMenuOpen;
    if (mobileDrawer) {
      if (isMobileMenuOpen) {
        mobileDrawer.classList.remove('-translate-y-full');
        mobileDrawer.classList.add('translate-y-0');
      } else {
        mobileDrawer.classList.add('-translate-y-full');
        mobileDrawer.classList.remove('translate-y-0');
      }
    }
  }

  mobileMenuBtn?.addEventListener('click', () => {
    playUiClickSfx();
    toggleMobileDrawer();
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileDrawer(true);
    });
  });

  // ==========================================
  // 6. RENDER LOOP (60 FPS & Telemetry)
  // ==========================================
  const clock = new THREE.Clock();
  let lastFpsTime = performance.now();
  let frameCount = 0;

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Real-time FPS Calculation
    frameCount++;
    const now = performance.now();
    if (now >= lastFpsTime + 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
      frameCount = 0;
      lastFpsTime = now;
      const fpsBadge = document.getElementById('header-fps-badge');
      if (fpsBadge) fpsBadge.textContent = `${fps} FPS`;
    }

    if (state.isInspect360) {
      controls.update();
    } else if (state.currentRoute === '#/anatomy' && isAutoOrbitAnatomy) {
      headphoneRoot.rotation.y += 0.006;
    } else if (!state.reduceMotion) {
      headphoneRoot.position.y += Math.sin(elapsedTime * 1.5) * 0.001;
      headphoneRoot.rotation.x += (state.mouseY - headphoneRoot.rotation.x) * 0.05;
      headphoneRoot.rotation.y += (state.mouseX - headphoneRoot.rotation.y) * 0.05;
    }

    if (cageGroup) {
      cageGroup.rotation.y = elapsedTime * 0.08;
      cageGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.05;
    }

    if (emberParticles) {
      const emberPos = emberGeom.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        const i3 = i * 3;
        emberPos[i3 + 1] += 0.003;
        if (emberPos[i3 + 1] > 2.0) emberPos[i3 + 1] = -2.0;
      }
      emberGeom.attributes.position.needsUpdate = true;
    }

    if (waveParticles.visible) {
      waveParticles.rotation.y = elapsedTime * 0.25;
      const positions = particleGeom.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] = Math.sin(elapsedTime * 3 + positions[i3] * 2) * 0.15;
      }
      particleGeom.attributes.position.needsUpdate = true;
    }

    updateFeaturePins();

    renderer.render(scene, camera);
  }

  // Floating Back-to-Top Button Controller
  const backToTopBtn = document.getElementById('back-to-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      if (backToTopBtn) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      }
    } else {
      if (backToTopBtn) {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playUiClickSfx();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Auto-close mobile navigation drawer on link selection
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const mobileDrawer = document.getElementById('mobile-menu-drawer');
      const mobileIcon = document.getElementById('mobile-menu-icon');
      if (mobileDrawer && !mobileDrawer.classList.contains('-translate-y-full')) {
        mobileDrawer.classList.add('-translate-y-full');
        if (mobileIcon) mobileIcon.setAttribute('data-lucide', 'menu');
        refreshIcons();
      }
    });
  });

  // ==========================================
  // TYPOGRAPHY COLOR PALETTE THEME SYSTEM (V5.5)
  // ==========================================
  const textThemeNames = {
    cyan: 'CYBER CYAN',
    gold: 'VÀNG HOÀNG GIA',
    rose: 'HỒNG RUBY NEON',
    emerald: 'LỤC BẢO MATRIX'
  };

  function applyTextTheme(theme, playSound = true) {
    if (!textThemeNames[theme]) theme = 'cyan';
    document.documentElement.setAttribute('data-text-theme', theme);
    document.body.setAttribute('data-text-theme', theme);
    try {
      localStorage.setItem('aura_text_theme', theme);
    } catch(e) {}

    // Update active state in Hero buttons
    document.querySelectorAll('.text-theme-select-btn').forEach(btn => {
      const isMatch = btn.getAttribute('data-theme') === theme;
      btn.classList.toggle('active-theme', isMatch);
    });

    // Update Header dots
    document.querySelectorAll('.header-theme-dot').forEach(dot => {
      const isMatch = dot.getAttribute('data-theme') === theme;
      dot.classList.toggle('active-dot', isMatch);
      dot.classList.toggle('scale-125', isMatch);
    });

    // Update Mobile Drawer buttons
    document.querySelectorAll('.mobile-theme-btn').forEach(btn => {
      const isMatch = btn.getAttribute('data-theme') === theme;
      btn.classList.toggle('bg-white/20', isMatch);
      btn.classList.toggle('border-cyan-400', isMatch && theme === 'cyan');
      btn.classList.toggle('border-amber-400', isMatch && theme === 'gold');
      btn.classList.toggle('border-rose-400', isMatch && theme === 'rose');
      btn.classList.toggle('border-emerald-400', isMatch && theme === 'emerald');
    });

    // Update badge names
    const heroBadge = document.getElementById('hero-active-theme-name');
    if (heroBadge) heroBadge.textContent = textThemeNames[theme];
    const mobileBadge = document.getElementById('mobile-active-theme-name');
    if (mobileBadge) mobileBadge.textContent = textThemeNames[theme];

    // Harmonize 3D warmRimLight color subtly
    if (typeof warmRimLight !== 'undefined' && warmRimLight) {
      if (theme === 'cyan') {
        gsap.to(warmRimLight.color, { r: 0, g: 0.85, b: 1, duration: 0.6 });
      } else if (theme === 'gold') {
        gsap.to(warmRimLight.color, { r: 1, g: 0.75, b: 0.15, duration: 0.6 });
      } else if (theme === 'rose') {
        gsap.to(warmRimLight.color, { r: 1, g: 0.2, b: 0.5, duration: 0.6 });
      } else if (theme === 'emerald') {
        gsap.to(warmRimLight.color, { r: 0.1, g: 0.95, b: 0.6, duration: 0.6 });
      }
    }

    if (playSound && typeof playUiClickSfx === 'function') {
      playUiClickSfx();
    }
  }

  // Delegated event listener for all text theme buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme]');
    if (btn && (btn.classList.contains('text-theme-select-btn') || btn.classList.contains('header-theme-dot') || btn.classList.contains('mobile-theme-btn'))) {
      const theme = btn.getAttribute('data-theme');
      applyTextTheme(theme, true);
    }
  });

  // Restore saved theme on load
  const initialTheme = (function() {
    try {
      return localStorage.getItem('aura_text_theme') || 'cyan';
    } catch(e) {
      return 'cyan';
    }
  })();
  applyTextTheme(initialTheme, false);

  // Sticky Buy Bar scroll controller
  const stickyBuyBar = document.getElementById('sticky-buy-bar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 550) {
      if (stickyBuyBar) stickyBuyBar.classList.remove('translate-y-full');
    } else {
      if (stickyBuyBar) stickyBuyBar.classList.add('translate-y-full');
    }
  }, { passive: true });

  // Parametric EQ Preset handler
  document.addEventListener('click', (e) => {
    const eqBtn = e.target.closest('.eq-preset-btn');
    if (eqBtn) {
      const preset = eqBtn.getAttribute('data-preset');
      const label = document.getElementById('active-eq-label');
      document.querySelectorAll('.eq-preset-btn').forEach(b => {
        b.classList.remove('border-cyan-400', 'bg-cyan-400/10', 'text-cyan-300');
        b.classList.add('border-white/10', 'bg-white/5', 'text-slate-300');
      });
      eqBtn.classList.remove('border-white/10', 'bg-white/5', 'text-slate-300');
      eqBtn.classList.add('border-cyan-400', 'bg-cyan-400/10', 'text-cyan-300');

      const presetNames = {
        flat: 'STUDIO FLAT (MASTERING)',
        bass: 'DEEP BASS (+6dB @ 60Hz)',
        vocal: 'VOCAL WARMTH (+4dB @ 1.2kHz)',
        spatial: 'SPATIAL 8D EXPANDED'
      };
      if (label && presetNames[preset]) {
        label.textContent = presetNames[preset];
      }

      if (typeof playUiClickSfx === 'function') {
        playUiClickSfx();
      }
    }
  });


  // Comfort Soundscape & Streaming Controllers (Zing MP3 & YouTube)
  const tabBtnNature = document.getElementById('tab-btn-nature');
  const tabBtnZingmp3 = document.getElementById('tab-btn-zingmp3');
  const tabBtnRoyalty = document.getElementById('tab-btn-royalty');
  const tabContentNature = document.getElementById('soundscape-cards-grid');
  const tabContentZingmp3 = document.getElementById('tab-content-zingmp3');
  const tabContentRoyalty = document.getElementById('tab-content-royalty');
  const ytPlayerContainer = document.getElementById('yt-player-container');
  const ytPlayerIframe = document.getElementById('yt-player-iframe');
  const customYtInput = document.getElementById('custom-yt-input');
  const customYtPlayBtn = document.getElementById('custom-yt-play-btn');

  // Zing MP3 Elements
  const playMoianhBtn = document.getElementById('play-moianh-btn');
  const customZingInput = document.getElementById('custom-zing-input');
  const customZingPlayBtn = document.getElementById('custom-zing-play-btn');
  const zingPlayerContainer = document.getElementById('zing-player-container');
  const zingPlayerIframe = document.getElementById('zing-player-iframe');
  const zingCurrentTitle = document.getElementById('zing-current-title');
  const zingCloseBtn = document.getElementById('zing-close-btn');

  function switchSoundscapeTab(activeTab) {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    const tabs = [
      { btn: tabBtnNature, content: tabContentNature, activeClass: 'bg-cyan-400 text-black font-bold' },
      { btn: tabBtnZingmp3, content: tabContentZingmp3, activeClass: 'bg-violet-500 text-white font-bold' },
      { btn: tabBtnRoyalty, content: tabContentRoyalty, activeClass: 'bg-cyan-400 text-black font-bold' }
    ];

    tabs.forEach(t => {
      if (!t.btn || !t.content) return;
      if (t.btn === activeTab) {
        t.btn.className = 'flex-1 py-2 px-2 rounded-xl ' + t.activeClass + ' transition-all flex items-center justify-center space-x-1 text-[11px] sm:text-xs';
        t.content.classList.remove('hidden');
      } else {
        t.btn.className = 'flex-1 py-2 px-2 rounded-xl text-slate-300 hover:text-white transition-all flex items-center justify-center space-x-1 text-[11px] sm:text-xs';
        t.content.classList.add('hidden');
      }
    });
    refreshIcons();
  }

  tabBtnNature?.addEventListener('click', () => switchSoundscapeTab(tabBtnNature));
  tabBtnZingmp3?.addEventListener('click', () => switchSoundscapeTab(tabBtnZingmp3));
  tabBtnRoyalty?.addEventListener('click', () => switchSoundscapeTab(tabBtnRoyalty));

  // Zing MP3 Player Controller
  function playZingAudio(songId, title = 'moianh - IZARA') {
    stopComfortSoundscape(0.2);
    stopYouTubeAudio();
    if (synthGain && audioCtx) synthGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

    if (zingPlayerContainer && zingPlayerIframe) {
      zingPlayerContainer.classList.remove('hidden');
      zingPlayerIframe.src = 'https://zingmp3.vn/embed/song/' + songId + '?start=true';
      if (zingCurrentTitle) zingCurrentTitle.textContent = 'ĐANG PHÁT: ' + title;
    }

    const audioText = document.getElementById('audio-text');
    const audioBars = document.getElementById('sound-bars-indicator');
    const audioIcon = document.getElementById('audio-icon');
    if (audioText) audioText.textContent = 'ZING MP3';
    if (audioBars) audioBars.querySelectorAll('.sound-bar').forEach(b => b.classList.remove('paused'));
    if (audioIcon) {
      audioIcon.classList.remove('text-slate-400');
      audioIcon.classList.add('text-violet-400');
    }

    const moianhText = document.getElementById('play-moianh-text');
    if (moianhText && songId === 'IE7z14xoLkqs') {
      moianhText.textContent = 'ĐANG PHÁT...';
    }

    showNotificationToast('Đang phát từ Zing MP3: ' + title);
  }

  function stopZingAudio() {
    if (zingPlayerIframe) zingPlayerIframe.src = '';
    if (zingPlayerContainer) zingPlayerContainer.classList.add('hidden');
    const moianhText = document.getElementById('play-moianh-text');
    if (moianhText) moianhText.textContent = 'PHÁT BÀI NÀY';
  }

  playMoianhBtn?.addEventListener('click', () => {
    const songId = playMoianhBtn.getAttribute('data-song-id') || 'IE7z14xoLkqs';
    const title = playMoianhBtn.getAttribute('data-song-title') || 'moianh - IZARA';
    playZingAudio(songId, title);
  });

  customZingPlayBtn?.addEventListener('click', () => {
    const url = customZingInput?.value?.trim();
    if (!url) return;
    let songId = '';
    // Support formats: https://zingmp3.vn/bai-hat/moianh-IZARA/IE7z14xoLkqs.html OR IE7z14xoLkqs
    const match = url.match(/(?:bai-hat\/[^\/]+\/|embed\/song\/)([A-Za-z0-9]+)/);
    if (match && match[1]) {
      songId = match[1];
    } else if (/^[A-Za-z0-9]{12}$/.test(url)) {
      songId = url;
    }

    if (songId) {
      playZingAudio(songId, 'Bài hát Zing MP3 (' + songId + ')');
    } else {
      showNotificationToast('Vui lòng dán link Zing MP3 hợp lệ (ví dụ: https://zingmp3.vn/bai-hat/.../IE7z14xoLkqs.html)');
    }
  });

  zingCloseBtn?.addEventListener('click', () => {
    stopZingAudio();
  });

  function playYouTubeAudio(videoId, title) {
    if (!title) title = 'Nhạc YouTube Không Bản Quyền';
    stopComfortSoundscape(0.2);
    stopZingAudio();
    if (synthGain && audioCtx) synthGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

    if (ytPlayerContainer && ytPlayerIframe) {
      ytPlayerContainer.classList.remove('hidden');
      ytPlayerIframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&enablejsapi=1';
    }

    const audioText = document.getElementById('audio-text');
    const audioBars = document.getElementById('sound-bars-indicator');
    const audioIcon = document.getElementById('audio-icon');
    if (audioText) audioText.textContent = 'YOUTUBE CC';
    if (audioBars) audioBars.querySelectorAll('.sound-bar').forEach(b => b.classList.remove('paused'));
    if (audioIcon) {
      audioIcon.classList.remove('text-slate-400');
      audioIcon.classList.add('text-cyan-400');
    }

    document.querySelectorAll('.rf-track-btn').forEach(btn => {
      const isCurrent = btn.getAttribute('data-yt-id') === videoId;
      const badge = btn.querySelector('.rf-badge');
      if (isCurrent) {
        btn.classList.add('border-cyan-400', 'bg-cyan-500/15');
        if (badge) {
          badge.textContent = 'PLAYING';
          badge.classList.remove('bg-white/5', 'text-slate-400');
          badge.classList.add('bg-cyan-400', 'text-black', 'font-bold');
        }
      } else {
        btn.classList.remove('border-cyan-400', 'bg-cyan-500/15');
        if (badge) {
          badge.textContent = 'PHÁT';
          badge.classList.add('bg-white/5', 'text-slate-400');
          badge.classList.remove('bg-cyan-400', 'text-black', 'font-bold');
        }
      }
    });

    showNotificationToast('Đang phát: ' + title);
  }

  function stopYouTubeAudio() {
    if (ytPlayerIframe) ytPlayerIframe.src = '';
    if (ytPlayerContainer) ytPlayerContainer.classList.add('hidden');
    document.querySelectorAll('.rf-track-btn').forEach(btn => {
      btn.classList.remove('border-cyan-400', 'bg-cyan-500/15');
      const badge = btn.querySelector('.rf-badge');
      if (badge) {
        badge.textContent = 'PHÁT';
        badge.classList.add('bg-white/5', 'text-slate-400');
        badge.classList.remove('bg-cyan-400', 'text-black', 'font-bold');
      }
    });
  }

  document.querySelectorAll('.rf-track-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ytId = btn.getAttribute('data-yt-id');
      const title = btn.getAttribute('data-title');
      playYouTubeAudio(ytId, title);
    });
  });

  customYtPlayBtn?.addEventListener('click', () => {
    const url = customYtInput?.value?.trim();
    if (!url) return;
    let vidId = '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      vidId = match[1];
    } else if (url.length === 11) {
      vidId = url;
    }
    if (vidId) {
      playYouTubeAudio(vidId, 'Video YouTube Tùy Chỉnh');
    } else {
      showNotificationToast('Vui lòng dán link video YouTube hợp lệ');
    }
  });

  // Comfort Soundscape Modal Controller
  const floatingComfortBtn = document.getElementById('floating-comfort-btn');
  const comfortModal = document.getElementById('comfort-sound-modal');
  const closeComfortBtn = document.getElementById('close-comfort-modal-btn');
  const soundscapeVolume = document.getElementById('soundscape-volume');
  const soundscapeVolVal = document.getElementById('soundscape-vol-val');
  const soundscapeStopBtn = document.getElementById('soundscape-stop-btn');

  floatingComfortBtn?.addEventListener('click', () => {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    if (comfortModal) {
      comfortModal.classList.remove('opacity-0', 'pointer-events-none');
      comfortModal.classList.add('opacity-100', 'pointer-events-auto');
    }
  });

  closeComfortBtn?.addEventListener('click', () => {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    if (comfortModal) {
      comfortModal.classList.add('opacity-0', 'pointer-events-none');
      comfortModal.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  comfortModal?.addEventListener('click', (e) => {
    if (e.target === comfortModal) {
      comfortModal.classList.add('opacity-0', 'pointer-events-none');
      comfortModal.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  document.querySelectorAll('.soundscape-card').forEach(card => {
    card.addEventListener('click', () => {
      const sound = card.getAttribute('data-sound');
      playComfortSoundscape(sound);
    });
  });

  soundscapeVolume?.addEventListener('input', (e) => {
    const val = e.target.value;
    if (soundscapeVolVal) soundscapeVolVal.textContent = val + '%';
    if (masterSoundTrack) masterSoundTrack.volume = val / 100;
    if (comfortNodes.gainNode && audioCtx) {
      comfortNodes.gainNode.gain.setValueAtTime((val / 100) * 0.45, audioCtx.currentTime);
    }
  });

  
  // ========================================================
  // MASTER AUDIO SOUNDTRACK (AURA THEME MP3)
  // ========================================================
  let masterSoundTrack = null;
  let isMasterTrackPlaying = false;

  function getMasterSoundTrack() {
    if (!masterSoundTrack) {
      masterSoundTrack = new Audio('assets/audio/aura-spatial-theme.mp3');
      masterSoundTrack.loop = true;
      masterSoundTrack.preload = 'auto';

      masterSoundTrack.addEventListener('timeupdate', () => {
        const curr = masterSoundTrack.currentTime;
        const dur = masterSoundTrack.duration || 173;
        const seeker = document.getElementById('master-audio-seeker');
        const currTimeElem = document.getElementById('master-audio-curr-time');
        const durTimeElem = document.getElementById('master-audio-duration');

        if (seeker && !seeker.matches(':active')) {
          seeker.value = (curr / dur) * 100;
        }
        const dockTimeElem = document.getElementById('audio-dock-time');
        if (dockTimeElem) {
          const cm = Math.floor(curr / 60);
          const cs = Math.floor(curr % 60).toString().padStart(2, '0');
          const dm = Math.floor(dur / 60);
          const ds = Math.floor(dur % 60).toString().padStart(2, '0');
          dockTimeElem.textContent = cm + ':' + cs + ' / ' + dm + ':' + ds;
        }
        if (currTimeElem) {
          const m = Math.floor(curr / 60);
          const s = Math.floor(curr % 60).toString().padStart(2, '0');
          currTimeElem.textContent = m + ':' + s;
        }
        if (durTimeElem && !isNaN(dur)) {
          const dm = Math.floor(dur / 60);
          const ds = Math.floor(dur % 60).toString().padStart(2, '0');
          durTimeElem.textContent = dm + ':' + ds;
        }
      });
    }
    return masterSoundTrack;
  }

  function playMasterSoundTrack() {
    stopComfortSoundscape(0.2);
    if (typeof stopYouTubeAudio === 'function') stopYouTubeAudio();
    if (typeof stopZingAudio === 'function') stopZingAudio();
    if (synthGain && audioCtx) synthGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

    const track = typeof getMasterSoundTrack === 'function' ? getMasterSoundTrack() : (window.getMasterSoundTrack ? window.getMasterSoundTrack() : null);
    const vol = (document.getElementById('soundscape-volume')?.value || 70) / 100;
    track.volume = vol;
    track.play().catch(e => console.log('Audio autoplay prevented:', e));
    isMasterTrackPlaying = true;
    state.isAudioPlaying = true;

    // Update Header Pill
    const audioText = document.getElementById('audio-text');
    const audioBars = document.getElementById('sound-bars-indicator');
    const audioIcon = document.getElementById('audio-icon');
    if (audioText) audioText.textContent = 'AURA PLAYING';
    if (audioBars) audioBars.querySelectorAll('.sound-bar').forEach(b => b.classList.remove('paused'));
    if (audioIcon) {
      audioIcon.classList.remove('text-slate-400');
      audioIcon.classList.add('text-cyan-400');
    }

    // Update Modal Button
    const playText = document.getElementById('master-audio-play-text');
    const playIcon = document.getElementById('master-audio-play-icon');
    if (playText) playText.textContent = 'ĐANG PHÁT...';
    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');

    // Update Floating Audio Dock
    const dockPlayIcon = document.getElementById('audio-dock-play-icon');
    if (dockPlayIcon) dockPlayIcon.setAttribute('data-lucide', 'pause');
    const dockMiniWave = document.getElementById('dock-mini-wave');
    if (dockMiniWave) dockMiniWave.querySelectorAll('.sound-bar').forEach(b => b.classList.remove('paused'));
    const discIcon = document.getElementById('audio-dock-disc-icon');
    if (discIcon) discIcon.classList.add('animate-spin');

    waveParticles.visible = true;
    showNotificationToast('Đang phát: Liêu Xiêu (Can You Stay) • AURA Master Theme');
    refreshIcons();
  }

  function stopMasterSoundTrack() {
    if (masterSoundTrack) {
      masterSoundTrack.pause();
    }
    isMasterTrackPlaying = false;
    state.isAudioPlaying = false;

    const audioText = document.getElementById('audio-text');
    const audioBars = document.getElementById('sound-bars-indicator');
    const audioIcon = document.getElementById('audio-icon');
    if (audioText) audioText.textContent = 'SOUND OFF';
    if (audioBars) audioBars.querySelectorAll('.sound-bar').forEach(b => b.classList.add('paused'));
    if (audioIcon) {
      audioIcon.classList.remove('text-cyan-400');
      audioIcon.classList.add('text-slate-400');
    }

    const playText = document.getElementById('master-audio-play-text');
    const playIcon = document.getElementById('master-audio-play-icon');
    if (playText) playText.textContent = 'PHÁT BÀI NÀY';
    if (playIcon) playIcon.setAttribute('data-lucide', 'play');

    // Update Floating Audio Dock
    const dockPlayIcon = document.getElementById('audio-dock-play-icon');
    if (dockPlayIcon) dockPlayIcon.setAttribute('data-lucide', 'play');
    const dockMiniWave = document.getElementById('dock-mini-wave');
    if (dockMiniWave) dockMiniWave.querySelectorAll('.sound-bar').forEach(b => b.classList.add('paused'));
    const discIcon = document.getElementById('audio-dock-disc-icon');
    if (discIcon) discIcon.classList.remove('animate-spin');

    refreshIcons();
  }

  // Hook Master Track Events
  document.getElementById('master-audio-play-btn')?.addEventListener('click', () => {
    if (typeof playUiClickSfx === 'function') playUiClickSfx();
    if (isMasterTrackPlaying) {
      stopMasterSoundTrack();
    } else {
      playMasterSoundTrack();
    }
  });

  document.getElementById('master-audio-seeker')?.addEventListener('input', (e) => {
    const track = getMasterSoundTrack();
    const dur = track.duration || 173;
    track.currentTime = (e.target.value / 100) * dur;
  });

  soundscapeStopBtn?.addEventListener('click', () => {
    stopComfortSoundscape(0.3);
    stopYouTubeAudio();
    stopZingAudio();
    showNotificationToast('Đã dừng toàn bộ âm thanh');
  });

  // Expose Core Audio Controllers to Window Scope
  window.toggleAudioPlayback = toggleAudioPlayback;
  window.getMasterSoundTrack = getMasterSoundTrack;
  window.playMasterSoundTrack = playMasterSoundTrack;
  window.stopMasterSoundTrack = stopMasterSoundTrack;
  window.applyColorTheme = applyColorTheme;

  animate();
});

// ========================================================
// AURA ONE COMPREHENSIVE E-COMMERCE & SECURITY SUITE
// Wishlist Engine, Product Quick-View Modal, Warranty Lookup
// ========================================================

(function initAuraEcommerceSuite() {
  // Global modal elements
  const qvModal = document.getElementById('product-quickview-modal');
  const wishlistModal = document.getElementById('wishlist-modal');
  const warrantyModal = document.getElementById('warranty-modal');

  let currentQvProduct = null;
  let currentQvQty = 1;

  // 1. PRODUCT QUICK-VIEW MODAL LOGIC
  window.openProductQuickView = function(productId) {
    const products = window.AURA_DATA ? window.AURA_DATA.products : [];
    const prod = products.find(p => p.id === productId);
    if (!prod || !qvModal) return;

    currentQvProduct = prod;
    currentQvQty = 1;

    // Populate data
    const imgEl = document.getElementById('qv-image');
    if (imgEl) imgEl.src = prod.image;
    
    const titleEl = document.getElementById('qv-title');
    if (titleEl) titleEl.textContent = prod.name;

    const descEl = document.getElementById('qv-desc');
    if (descEl) descEl.textContent = prod.desc;

    const badgeEl = document.getElementById('qv-badge');
    if (badgeEl) badgeEl.textContent = prod.badge;

    const priceUsdEl = document.getElementById('qv-price-usd');
    if (priceUsdEl) priceUsdEl.textContent = prod.priceUSD + ' USD';

    const priceVndEl = document.getElementById('qv-price-vnd');
    if (priceVndEl) priceVndEl.textContent = '~ ' + prod.priceVND.toLocaleString('vi-VN') + ' đ';

    const qtyValEl = document.getElementById('qv-qty-val');
    if (qtyValEl) qtyValEl.textContent = '1';

    const ratingEl = document.getElementById('qv-rating-text');
    if (ratingEl) ratingEl.textContent = prod.rating;

    // Update Wishlist button in modal
    const qvWishlistBtn = document.getElementById('qv-wishlist-toggle-btn');
    const qvWishlistIcon = document.getElementById('qv-wishlist-icon');
    if (qvWishlistIcon) {
      const isFav = window.AURA_WISHLIST && window.AURA_WISHLIST.isWishlisted(prod.id);
      if (isFav) {
        qvWishlistIcon.classList.add('fill-rose-500', 'text-rose-500');
      } else {
        qvWishlistIcon.classList.remove('fill-rose-500', 'text-rose-500');
      }
    }

        // Render verified customer reviews for this product
    const reviews = window.AURA_REVIEWS ? window.AURA_REVIEWS.getReviews(prod.id) : [];
    const reviewDescEl = document.getElementById('qv-rating-text');
    if (reviewDescEl) {
      reviewDescEl.textContent = `${prod.rating || '5.0'} (${reviews.length} đánh giá kiểm định)`;
    }

    qvModal.classList.remove('hidden');
    if (typeof refreshIcons === 'function') refreshIcons();
    else if (window.lucide) window.lucide.createIcons();
  };

  
  // Backdrop & Escape key close handlers for all modals
  [qvModal, wishlistModal, warrantyModal, document.getElementById('ar-modal'), document.getElementById('comfort-sound-modal')].forEach(modalEl => {
    modalEl?.addEventListener('click', (e) => {
      if (e.target === modalEl) modalEl.classList.add('hidden');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (qvModal && !qvModal.classList.contains('hidden')) qvModal.classList.add('hidden');
      if (wishlistModal && !wishlistModal.classList.contains('hidden')) wishlistModal.classList.add('hidden');
      if (warrantyModal && !warrantyModal.classList.contains('hidden')) warrantyModal.classList.add('hidden');
      const arM = document.getElementById('ar-modal');
      if (arM && !arM.classList.contains('hidden')) arM.classList.add('hidden');
    }
  });

  // Close Quick-View
  document.getElementById('close-quickview-btn')?.addEventListener('click', () => {
    qvModal?.classList.add('hidden');
  });

  // Quantity Stepper
  document.getElementById('qv-qty-minus')?.addEventListener('click', () => {
    if (currentQvQty > 1) {
      currentQvQty--;
      const val = document.getElementById('qv-qty-val');
      if (val) val.textContent = currentQvQty;
    }
  });

  document.getElementById('qv-qty-plus')?.addEventListener('click', () => {
    if (currentQvQty < 10) {
      currentQvQty++;
      const val = document.getElementById('qv-qty-val');
      if (val) val.textContent = currentQvQty;
    }
  });

  // Live Engraving Preview
  const engravingInput = document.getElementById('qv-engraving-input');
  const engravingBadge = document.getElementById('qv-engraving-preview-badge');
  engravingInput?.addEventListener('input', (e) => {
    const raw = e.target.value || 'AURA';
    const sanitized = window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(raw) : raw;
    if (engravingBadge) engravingBadge.textContent = sanitized.toUpperCase();
  });

  // Add to Cart from Quick-View
  document.getElementById('qv-add-to-cart-btn')?.addEventListener('click', () => {
    if (!currentQvProduct) return;
    const engraving = engravingInput ? (engravingInput.value.trim().toUpperCase() || 'AURA') : 'AURA';
    window.AURA_CART.addItem({
      id: currentQvProduct.id,
      name: currentQvProduct.name + (engraving ? ' [Khắc: ' + engraving + ']' : ''),
      price: currentQvProduct.priceUSD,
      image: currentQvProduct.image,
      quantity: currentQvQty
    });
    qvModal?.classList.add('hidden');
    if (typeof showNotificationToast === 'function') {
      showNotificationToast('Đã thêm ' + currentQvQty + 'x ' + currentQvProduct.name + ' vào giỏ hàng!');
    }
    if (window.AURA_CART) window.AURA_CART.updateHeaderBadge();
    const drw = document.getElementById('checkout-drawer');
    drw?.classList.remove('translate-x-full');
    if (typeof window.updateDrawerCartUI === 'function') window.updateDrawerCartUI();
  });

  // Buy Now from Quick-View
  document.getElementById('qv-buy-now-btn')?.addEventListener('click', () => {
    if (!currentQvProduct) return;
    const engraving = engravingInput ? (engravingInput.value.trim().toUpperCase() || 'AURA') : 'AURA';
    window.AURA_CART.addItem({
      id: currentQvProduct.id,
      name: currentQvProduct.name + (engraving ? ' [Khắc: ' + engraving + ']' : ''),
      price: currentQvProduct.priceUSD,
      image: currentQvProduct.image,
      quantity: currentQvQty
    });
    if (window.AURA_CART) window.AURA_CART.updateHeaderBadge();
    qvModal?.classList.add('hidden');
    if (typeof showNotificationToast === 'function') {
      showNotificationToast('Đang chuyển đến trang thanh toán...');
    }
    setTimeout(() => {
      window.location.hash = '#/checkout';
    }, 200);
  });

  // Toggle Wishlist from Quick-View
  document.getElementById('qv-wishlist-toggle-btn')?.addEventListener('click', () => {
    if (!currentQvProduct) return;
    const res = window.AURA_WISHLIST.toggleWishlist(currentQvProduct.id);
    const icon = document.getElementById('qv-wishlist-icon');
    if (icon) {
      if (res.isAdded) icon.classList.add('fill-rose-500', 'text-rose-500');
      else icon.classList.remove('fill-rose-500', 'text-rose-500');
    }
    if (typeof showNotificationToast === 'function') {
      showNotificationToast(res.isAdded ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích');
    }
    // Update any heart icons on cards
    document.querySelectorAll('.prod-wishlist-toggle-btn[data-id="' + currentQvProduct.id + '"] i').forEach(ic => {
      if (res.isAdded) ic.classList.add('fill-rose-500', 'text-rose-500');
      else ic.classList.remove('fill-rose-500', 'text-rose-500');
    });
  });

  // 2. WISHLIST MODAL LOGIC
  window.openWishlistModal = function() {
    if (!wishlistModal) return;
    renderWishlistItems();
    wishlistModal.classList.remove('hidden');
    if (typeof refreshIcons === 'function') refreshIcons();
    else if (window.lucide) window.lucide.createIcons();
  };

  function renderWishlistItems() {
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;
    const items = window.AURA_WISHLIST ? window.AURA_WISHLIST.getWishlistProducts() : [];

    if (items.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 space-y-3">
          <div class="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <i data-lucide="heart" class="w-8 h-8"></i>
          </div>
          <h4 class="font-heading font-bold text-lg text-white">Chưa Có Sản Phẩm Yêu Thích</h4>
          <p class="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Khám phá bộ sưu tập tai nghe Flagship 3D và phụ kiện AURA ONE để lưu lại những siêu phẩm bạn mong muốn sở hữu.
          </p>
          <a href="#/store" class="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase transition-all shadow-md shadow-cyan-400/20 mt-2">
            <span>KHÁM PHÁ CỬA HÀNG</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(p => `
      <div class="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 hover:border-cyan-400/30 transition-all">
        <div class="flex items-center space-x-3">
          <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-contain rounded-xl bg-black/60 p-1 border border-white/5 flex-shrink-0" />
          <div>
            <h5 class="font-heading font-bold text-xs sm:text-sm text-white line-clamp-1">${p.name}</h5>
            <div class="text-[10px] font-mono text-cyan-300 mt-0.5">${p.priceUSD} USD (~ ${p.priceVND.toLocaleString('vi-VN')} đ)</div>
          </div>
        </div>
        <div class="flex items-center space-x-2 flex-shrink-0">
          <button class="wishlist-item-add-cart-btn px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-[11px] font-bold transition-all flex items-center space-x-1" data-id="${p.id}">
            <i data-lucide="shopping-bag" class="w-3 h-3"></i>
            <span class="hidden sm:inline">+ GIỎ</span>
          </button>
          <button class="wishlist-item-remove-btn p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all" data-id="${p.id}" title="Xóa">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Attach listeners
    container.querySelectorAll('.wishlist-item-add-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prod = items.find(i => i.id === id);
        if (prod) {
          window.AURA_CART.addItem({ id: prod.id, name: prod.name, price: prod.priceUSD, image: prod.image, quantity: 1 });
          if (typeof showNotificationToast === 'function') {
            showNotificationToast('Đã thêm "' + prod.name + '" vào giỏ hàng!');
          }
        }
      });
    });

    container.querySelectorAll('.wishlist-item-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        window.AURA_WISHLIST.toggleWishlist(id);
        renderWishlistItems();
        if (typeof showNotificationToast === 'function') {
          showNotificationToast('Đã xóa khỏi danh sách yêu thích');
        }
      });
    });
  }

  // Header wishlist button
  document.getElementById('header-wishlist-btn')?.addEventListener('click', () => {
    window.openWishlistModal();
  });

  // Close Wishlist
  document.getElementById('close-wishlist-btn')?.addEventListener('click', () => {
    wishlistModal?.classList.add('hidden');
  });

  // Wishlist Add All
  document.getElementById('wishlist-add-all-btn')?.addEventListener('click', () => {
    const items = window.AURA_WISHLIST ? window.AURA_WISHLIST.getWishlistProducts() : [];
    if (items.length === 0) return;
    items.forEach(p => {
      window.AURA_CART.addItem({ id: p.id, name: p.name, price: p.priceUSD, image: p.image, quantity: 1 });
    });
    wishlistModal?.classList.add('hidden');
    if (typeof showNotificationToast === 'function') {
      showNotificationToast('Đã thêm tất cả ' + items.length + ' sản phẩm vào giỏ hàng!');
    }
    if (window.AURA_CART) window.AURA_CART.updateHeaderBadge();
    const drw = document.getElementById('checkout-drawer');
    drw?.classList.remove('translate-x-full');
    if (typeof window.updateDrawerCartUI === 'function') window.updateDrawerCartUI();
  });

  // Wishlist Clear All
  document.getElementById('wishlist-clear-btn')?.addEventListener('click', () => {
    window.AURA_WISHLIST.saveWishlist([]);
    renderWishlistItems();
    if (typeof showNotificationToast === 'function') {
      showNotificationToast('Đã làm trống danh sách yêu thích');
    }
  });

  // 3. WARRANTY LOOKUP LOGIC
  window.openWarrantyModal = function() {
    if (!warrantyModal) return;
    warrantyModal.classList.remove('hidden');
    if (typeof refreshIcons === 'function') refreshIcons();
    else if (window.lucide) window.lucide.createIcons();
  };

  document.getElementById('close-warranty-btn')?.addEventListener('click', () => {
    warrantyModal?.classList.add('hidden');
  });

  function performWarrantySearch() {
    const input = document.getElementById('warranty-lookup-input');
    const val = input ? input.value.trim() : '';
    const resBox = document.getElementById('warranty-result-box');
    if (!val || !resBox) return;

    const data = window.AURA_WARRANTY.verify(val);
    if (data) {
      resBox.classList.remove('hidden');
      resBox.innerHTML = `
        <div class="flex items-center justify-between pb-3 border-b border-emerald-500/30">
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs font-bold text-emerald-400">${data.status}</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">${data.hologramCode}</span>
        </div>
        <div class="text-xs text-white space-y-1">
          <div><span class="text-slate-400">Số Serial:</span> <span class="font-bold text-cyan-300">${data.serial}</span></div>
          <div><span class="text-slate-400">Model:</span> <span class="font-bold">${data.model}</span></div>
          <div><span class="text-slate-400">Gói Bảo Hành:</span> <span class="text-amber-300">${data.warrantyPeriod}</span></div>
          <div><span class="text-slate-400">Thời Hạn Đến:</span> <span class="text-emerald-300 font-bold">${data.expiryDate}</span></div>
        </div>
        <div class="pt-2 border-t border-white/10 text-[10px] text-slate-300 space-y-1">
          <div class="text-cyan-400 font-bold uppercase">Quyền Lợi VIP Đi Kèm:</div>
          ${data.services.map(s => '<div>• ' + s + '</div>').join('')}
        </div>
      `;
      if (typeof refreshIcons === 'function') refreshIcons();
    }
  }

  document.getElementById('warranty-search-btn')?.addEventListener('click', performWarrantySearch);
  document.getElementById('warranty-lookup-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performWarrantySearch();
  });

  // Attach card delegation for Quick-View & Wishlist
  document.addEventListener('click', (e) => {
    const qvBtn = e.target.closest('.quick-view-trigger-btn');
    if (qvBtn) {
      e.preventDefault();
      const id = qvBtn.getAttribute('data-id');
      window.openProductQuickView(id);
      return;
    }

    const wishBtn = e.target.closest('.prod-wishlist-toggle-btn');
    if (wishBtn) {
      e.preventDefault();
      const id = wishBtn.getAttribute('data-id');
      const res = window.AURA_WISHLIST.toggleWishlist(id);
      const icon = wishBtn.querySelector('i');
      if (icon) {
        if (res.isAdded) icon.classList.add('fill-rose-500', 'text-rose-500');
        else icon.classList.remove('fill-rose-500', 'text-rose-500');
      }
      if (typeof showNotificationToast === 'function') {
        showNotificationToast(res.isAdded ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích');
      }
      return;
    }
  });

  // Update badges on load
  if (window.AURA_WISHLIST) window.AURA_WISHLIST.updateHeaderBadge();
  if (window.AURA_CART) window.AURA_CART.updateHeaderBadge();
})();

  // Project Introduction & Tour Modal Controller
  (function initProjectIntroModal() {
    const introModal = document.getElementById('project-intro-modal');
    const navIntroBtn = document.getElementById('nav-intro-btn');
    const closeIntroBtn = document.getElementById('close-intro-modal');
    const startTourBtn = document.getElementById('start-tour-btn');

    function openIntroModal() {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (!introModal) return;
      introModal.classList.remove('opacity-0', 'pointer-events-none');
      introModal.classList.add('opacity-100', 'pointer-events-auto');
      if (typeof refreshIcons === 'function') refreshIcons();
      else if (window.lucide) window.lucide.createIcons();
    }

    function closeIntroModal() {
      if (!introModal) return;
      introModal.classList.remove('opacity-100', 'pointer-events-auto');
      introModal.classList.add('opacity-0', 'pointer-events-none');
    }

    navIntroBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openIntroModal();
    });

    closeIntroBtn?.addEventListener('click', closeIntroModal);

    startTourBtn?.addEventListener('click', () => {
      closeIntroModal();
      window.location.hash = '#/studio';
      if (typeof showNotificationToast === 'function') {
        showNotificationToast('✨ Chào mừng bạn! Hãy thử xoay 360° và đổi màu tai nghe trong Studio.');
      }
    });

    introModal?.addEventListener('click', (e) => {
      if (e.target === introModal) closeIntroModal();
    });

    window.openProjectIntroModal = openIntroModal;
    window.closeProjectIntroModal = closeIntroModal;
  })();


  // Wire Floating Audio Dock & Modal Controllers
  (function initAudioDock() {
    const dock = document.getElementById('aura-audio-dock');
    const dockPlayBtn = document.getElementById('audio-dock-play-btn');
    const dockPlayIcon = document.getElementById('audio-dock-play-icon');
    const dockVolSlider = document.getElementById('audio-dock-volume');
    const dockVolText = document.getElementById('audio-dock-vol-text');
    const dockMuteBtn = document.getElementById('audio-dock-mute-btn');
    const dockSuiteBtn = document.getElementById('audio-dock-suite-btn');
    const dockTrackInfo = document.getElementById('audio-dock-track-info');
    const comfortModal = document.getElementById('comfort-sound-modal');

    function openComfortModal() {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (comfortModal) {
        comfortModal.classList.remove('opacity-0', 'pointer-events-none');
        comfortModal.classList.add('opacity-100', 'pointer-events-auto');
      }
    }

    dockSuiteBtn?.addEventListener('click', openComfortModal);
    dockTrackInfo?.addEventListener('click', openComfortModal);

    dockPlayBtn?.addEventListener('click', () => {
      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (typeof toggleAudioPlayback === 'function') toggleAudioPlayback();
      else if (typeof window.toggleAudioPlayback === 'function') window.toggleAudioPlayback();
    });

    let previousVol = 70;
    dockVolSlider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (dockVolText) dockVolText.textContent = val + '%';
      const track = getMasterSoundTrack();
      if (track) track.volume = val / 100;
      previousVol = val;
    });

    dockMuteBtn?.addEventListener('click', () => {
      const track = getMasterSoundTrack();
      if (!track) return;
      if (track.volume > 0) {
        previousVol = Math.round(track.volume * 100);
        track.volume = 0;
        if (dockVolSlider) dockVolSlider.value = 0;
        if (dockVolText) dockVolText.textContent = '0%';
      } else {
        track.volume = (previousVol || 70) / 100;
        if (dockVolSlider) dockVolSlider.value = previousVol || 70;
        if (dockVolText) dockVolText.textContent = (previousVol || 70) + '%';
      }
    });

    // Wire YouTube CC Presets in Modal
    document.querySelectorAll('.yt-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vidId = btn.getAttribute('data-yt-id');
        const title = btn.getAttribute('data-title') || 'YouTube Lofi Stream';
        if (vidId && typeof playYouTubeAudio === 'function') {
          playYouTubeAudio(vidId, title);
        }
      });
    });

    // ========================================================
    // 4. VERIFIED CUSTOMER REVIEWS MODAL ENGINE
    // ========================================================
    const reviewModal = document.getElementById('add-review-modal');
    let selectedRating = 5;

    // Star picker
    document.querySelectorAll('.star-btn').forEach(star => {
      star.addEventListener('click', () => {
        if (typeof playUiClickSfx === 'function') playUiClickSfx();
        selectedRating = parseInt(star.getAttribute('data-star'), 10) || 5;
        const label = document.getElementById('review-star-label');
        if (label) {
          const descs = { 1: '1.0 / 5.0 (Cần cải thiện)', 2: '2.0 / 5.0 (Tạm ổn)', 3: '3.0 / 5.0 (Hài lòng)', 4: '4.0 / 5.0 (Rất tốt)', 5: '5.0 / 5.0 (Xuất sắc)' };
          label.textContent = descs[selectedRating] || selectedRating + '.0 / 5.0';
        }
        document.querySelectorAll('.star-btn').forEach(s => {
          const sVal = parseInt(s.getAttribute('data-star'), 10);
          if (sVal <= selectedRating) {
            s.classList.add('text-amber-400');
            s.classList.remove('text-slate-600');
          } else {
            s.classList.remove('text-amber-400');
            s.classList.add('text-slate-600');
          }
        });
      });
    });

    // Close review modal
    document.getElementById('close-review-modal-btn')?.addEventListener('click', () => {
      reviewModal?.classList.add('hidden');
    });

    reviewModal?.addEventListener('click', (e) => {
      if (e.target === reviewModal) reviewModal.classList.add('hidden');
    });

    // Submit review form
    document.getElementById('add-review-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const pId = document.getElementById('review-prod-select')?.value || 'prod-titanium';
      const author = document.getElementById('review-author')?.value?.trim();
      const title = document.getElementById('review-title')?.value?.trim() || 'Người dùng đã kiểm định';
      const comment = document.getElementById('review-comment')?.value?.trim();

      if (!author || !comment) {
        if (typeof showToast === 'function') showToast('Vui lòng điền họ tên và cảm nhận của bạn.');
        return;
      }

      if (window.AURA_REVIEWS && typeof window.AURA_REVIEWS.addReview === 'function') {
        window.AURA_REVIEWS.addReview(pId, {
          author: author,
          title: title,
          rating: selectedRating,
          comment: comment,
          tag: 'Đã xác thực sở hữu'
        });
      }

      if (typeof playUiClickSfx === 'function') playUiClickSfx();
      if (typeof showToast === 'function') showToast('Cảm ơn bạn! Đánh giá âm học đã được ghi nhận.');
      reviewModal?.classList.add('hidden');

      // Clear form
      document.getElementById('review-author').value = '';
      document.getElementById('review-title').value = '';
      document.getElementById('review-comment').value = '';
    });

    // Global trigger for review modal
    window.openAddReviewModal = function(productId) {
      if (!reviewModal) return;
      if (productId) {
        const select = document.getElementById('review-prod-select');
        if (select) select.value = productId;
      }
      reviewModal.classList.remove('hidden');
      if (typeof refreshIcons === 'function') refreshIcons();
    };
  })();
