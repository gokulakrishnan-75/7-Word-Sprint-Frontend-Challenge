/**
 * ============================================================================
 * THIRUKKURAL 421 — THE IMPREGNABLE FORTRESS (அறிவே அரண்)
 * Interactive Cinematic Historical War Film & Scene Engine
 * ============================================================================
 *
 * Core Kural:
 *   திருக்குறள் 421:
 *   அறிவற்றங் காக்குங் கருவி செறுவார்க்கும்
 *   உள்ளழிக்க லாகா அரண்.
 *
 * Meaning:
 *   "Wisdom is the unfailing instrument that protects from destruction;
 *    it is an impregnable fortress that enemies cannot destroy."
 *
 * Architecture:
 *   1. Procedural Web Audio API Sound Synthesizer (Drums, Drone, Whoosh, Heartbeat, Clashes)
 *   2. Dual-Buffer Zero-Flash Crossfade Visual Scene Engine (Video & High-Res Image Fallback)
 *   3. Ambient Particle Canvas (Embers, Mist, Dust, Golden Wisdom Runes)
 *   4. Interactive Tactical Parchment Map Engine (SVG routes, supply lines, chokepoints)
 *   5. Future Vision Decision System & Branching Consequences
 *   6. Time Rewind Engine with chromatic aberration & visual reversal
 *   7. Decision DNA Timeline Comparison
 *   8. Draggable Two Futures Split-Screen Slider
 *   9. Symbolic Wisdom Fortress withstanding mental siege attacks
 *  10. Sacred Palm-Leaf Manuscript (ஓலைச்சுவடி) Exegesis
 *  11. Ancient to Modern World Morph & Interactive Contemporary Crucibles
 *  12. Emotional Closure & Return of Soldier Maravan
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. PROCEDURAL CINEMATIC WEB AUDIO SYNTHESIZER
  // ==========================================================================
  let audioCtx = null;
  let isSoundEnabled = false;
  let bgmGainNode = null;
  let droneOscillators = [];
  let isDronePlaying = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // Deep Cinematic War Drum (Taiko / Pambai bass punch)
  function playWarDrum(pitch = 95, duration = 1.6) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Punchy pitch drop: e.g. 100Hz -> 30Hz
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + duration * 0.7);

      // Amplitude envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.85, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Distortion wave shaper for low-end punch
      const shaper = audioCtx.createWaveShaper();
      shaper.curve = makeDistortionCurve(18);

      osc.connect(shaper);
      shaper.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Drum error", e);
    }
  }

  function makeDistortionCurve(amount) {
    const k = typeof amount === "number" ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Tension Riser / Inception Low Brass Braam
  function playCinematicBraam() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc1.type = "sawtooth";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(55, now); // A1
      osc2.frequency.setValueAtTime(55.4, now); // slight chorus detune

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(100, now + 2.8);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.0);
      osc2.stop(now + 3.0);
    } catch (e) {}
  }

  // ==========================================================================
  // BACKGROUND MUSIC REMOVED (Per user instruction, audio is silent for clear speech)
  // ==========================================================================
  let currentMusicMood = null;
  let bgmMasterGain = null;
  let bgmDroneOscs = [];
  let bgmRhythmTimer = null;

  function setMusicMood(mood) {
    currentMusicMood = mood;
    stopSoundtrack();
  }

  function stopSoundtrack() {
    if (bgmRhythmTimer) {
      clearInterval(bgmRhythmTimer);
      bgmRhythmTimer = null;
    }
    if (bgmDroneOscs && bgmDroneOscs.length > 0) {
      bgmDroneOscs.forEach((o) => {
        try { o.stop(); o.disconnect(); } catch (e) {}
      });
      bgmDroneOscs = [];
    }
    if (bgmMasterGain && audioCtx) {
      try { bgmMasterGain.disconnect(); } catch (e) {}
      bgmMasterGain = null;
    }
  }

  // Temple Chime Tone
  function playTempleChime() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(830.6, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 2.2);
    } catch(e) {}
  }

  // Backward compatibility aliases
  function startTanpuraDrone() {
    setMusicMood("sacred_dawn");
  }

  function stopTanpuraDrone() {
    stopSoundtrack();
  }

  // Reverse Whoosh Sound for Time Rewind
  function playReverseWhoosh() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const bufferSize = audioCtx.sampleRate * 2.2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Reverse noise sweep
        const factor = (i / bufferSize) ** 3;
        data[i] = (Math.random() * 2 - 1) * factor;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(4500, now + 2.0);
      filter.Q.value = 3.0;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.45, now + 1.8);
      gain.gain.linearRampToValueAtTime(0.001, now + 2.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start(now);
    } catch (e) {}
  }

  // Heartbeat Thump (King under high-stakes decision)
  function playHeartbeat() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      // Lub
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.frequency.setValueAtTime(62, now);
      osc1.frequency.exponentialRampToValueAtTime(38, now + 0.12);
      gain1.gain.setValueAtTime(0.6, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Dub
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.frequency.setValueAtTime(52, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(32, now + 0.35);
      gain2.gain.setValueAtTime(0.4, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.2);
      osc2.stop(now + 0.4);
    } catch (e) {}
  }

  // Metallic Shield / Sword Clash
  function playSwordClash() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      filter.type = "highpass";
      filter.frequency.value = 1200;

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // ==========================================================================
  // 2. DYNAMIC ATMOSPHERIC CANVAS (Embers, Mist, Gold Runes)
  // ==========================================================================
  const canvas = document.getElementById("ambientCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  let particles = [];
  let particleMode = "mist"; // 'mist' | 'embers' | 'dust' | 'gold'

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      if (!canvas) return;
      this.x = Math.random() * canvas.width;
      this.y = particleMode === "embers" ? canvas.height + 10 : Math.random() * canvas.height;
      this.radius = Math.random() * 2.5 + 0.5;
      this.speedY = particleMode === "embers" ? -(Math.random() * 2 + 1) : (Math.random() - 0.5) * 0.6;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.008 + 0.003;
      this.life = Math.random() * 100;
    }

    update() {
      if (!canvas) return;
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;

      if (particleMode === "embers") {
        this.speedX += (Math.random() - 0.5) * 0.1;
        this.alpha -= 0.004;
        if (this.y < -10 || this.alpha <= 0) this.reset();
      } else {
        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
          this.reset();
        }
      }
    }

    draw() {
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      if (particleMode === "embers") {
        ctx.fillStyle = `rgba(255, ${Math.floor(100 + Math.random() * 80)}, 30, ${this.alpha})`;
        ctx.shadowColor = "#ff4500";
        ctx.shadowBlur = 6;
      } else if (particleMode === "gold") {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha})`;
        ctx.shadowColor = "#ffd700";
        ctx.shadowBlur = 8;
      } else if (particleMode === "dust") {
        ctx.fillStyle = `rgba(220, 205, 175, ${this.alpha * 0.4})`;
      } else {
        // mist
        ctx.fillStyle = `rgba(200, 220, 240, ${this.alpha * 0.25})`;
      }

      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles(count = 60) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ==========================================================================
  // 3. MASTER STORY SCENE DATABASE & PROGRESSION ENGINE
  // ==========================================================================
  // Developer can easily replace video URLs, image URLs, narrations, camera styles
  const SCENES = [
    // ------------------------------------------------------------------------
    // SCENE 1 : KURAL OPENING
    // ------------------------------------------------------------------------
    {
      id: "scene_01_prologue",
      chapterName: "PROLOGUE : THE RISING SUN",
      progress: 5,
      type: "image",
      animatedOverlay: "sunrise_river",
      videoUrl: "assets/videos/intro.mp4",
      imageUrl: "assets/fortress_sunrise.jpg",
      camera: "camera-zoom-in",
      particleMode: "mist",
      musicMood: "sacred_dawn",
      soundEffect: "tanpura",
      speaker: "திருக்குறள் 421",
      subTamil: "அறிவற்றங் காக்குங் கருவி செறுவார்க்கும் உள்ளழிக்க லாகா அரண்.",
      subEnglish: "What protects us when physical strength is no longer enough?",
      buttonText: "BEGIN CHAPTER 1 • தொடர்க",
      onEnter: () => {}
    },

    // ------------------------------------------------------------------------
    // SCENE 2 : THE ANCIENT WORLD
    // ------------------------------------------------------------------------
    {
      id: "scene_02_ancient_world",
      chapterName: "ACT I : THE ANCIENT BORDERLANDS",
      progress: 12,
      type: "image",
      animatedOverlay: "borderlands_mist",
      videoUrl: "assets/videos/kingdom.mp4",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
      camera: "camera-pan-left",
      particleMode: "mist",
      musicMood: "sacred_dawn",
      soundEffect: "drum_deep",
      speaker: "CHRONICLER",
      subTamil: "கொங்கு நாட்டுத் தொடர்ச்சி... ஆறுகளும் காடுகளும் சூழ்ந்த தொல் நிலப்பரப்பு.",
      subEnglish: "Deep within the ancient Kongu borderlands, two realms share a fragile frontier.",
      buttonText: "REVEAL REALMS",
      onEnter: () => {
        playWarDrum(80, 2.0);
      }
    },

    // ------------------------------------------------------------------------
    // SCENE 3A : TWO KINGDOMS — VELNADU (King Going to War / The Colossus)
    // ------------------------------------------------------------------------
    {
      id: "scene_03a_velnadu",
      chapterName: "ACT I : VELNADU — KING MARCHING TO WAR",
      progress: 20,
      type: "image",
      animatedOverlay: "king_march",
      videoUrl: "assets/videos/army.mp4",
      imageUrl: "assets/king_veeran.jpg",
      camera: "camera-zoom-in",
      particleMode: "dust",
      soundEffect: "drum_heavy",
      speaker: "KING VEERAN OF VELNADU",
      subTamil: "வேல்நாடு: 50,000 படைவீரர்கள் • 400 போரியானைகள் • அளவற்ற கருவூலம் போருக்குப் புறப்படுகிறது.",
      subEnglish: "VELNADU: King Veeran mobilizes 50,000 armored soldiers, 400 war tuskers, and royal banners into battle.",
      buttonText: "OBSERVE ARANMALAI",
      onEnter: () => {
        playWarDrum(90, 1.8);
        flashScreen(0.3);
      }
    },

    // ------------------------------------------------------------------------
    // SCENE 3B : TWO KINGDOMS — WAR BETWEEN TWO KINGS (Veeran vs Arivan)
    // ------------------------------------------------------------------------
    {
      id: "scene_03b_aranmalai",
      chapterName: "ACT I : TWO REALMS — THE TWO KINGS COLLIDE",
      progress: 28,
      type: "image",
      animatedOverlay: "two_kings",
      videoUrl: "assets/videos/palace.mp4",
      imageUrl: "assets/king_arivan.jpg",
      camera: "camera-push-face",
      particleMode: "dust",
      soundEffect: "tanpura",
      speaker: "KING ARIVAN OF ARANMALAI",
      subTamil: "இரு மன்னர்களின் போர்: 50,000 படைகளின் வலிமைக்கு எதிராக 12,000 வீரர்களை வழிநடத்தும் விவேகம்.",
      subEnglish: "WAR BETWEEN TWO KINGS: 50,000 raging spears against the calm, indestructible wisdom of King Arivan.",
      buttonText: "MEET THE CITIZENS",
      onEnter: () => {}
    },

    // ------------------------------------------------------------------------
    // SCENE 4 : THE HUMAN COST (The Young Soldier Maravan)
    // ------------------------------------------------------------------------
    {
      id: "scene_04_soldier_maravan",
      chapterName: "ACT II : THE HUMAN WEIGHT",
      progress: 36,
      type: "image",
      animatedOverlay: "family_hearth",
      videoUrl: "assets/videos/battlefield.mp4",
      imageUrl: "assets/soldier_maravan.jpg",
      camera: "camera-push-face",
      particleMode: "mist",
      soundEffect: "tanpura",
      speaker: "MARAVAN • YOUNG CITIZEN-SOLDIER",
      subTamil: "அவன் பெருவீரன் அல்ல; மனைவியையும் பச்சிளங் குழந்தையையும் பிரிந்து அரணைக் காக்கப் புறப்படும் எளிய வீரன்.",
      subEnglish: "Young soldier Maravan straps on his brass crest. He is not a legend—his family's future hangs on the king's next choice.",
      buttonText: "THE GATHERING STORM",
      onEnter: () => {}
    },

    // ------------------------------------------------------------------------
    // SCENE 5 : FIGHT OF THE WAR (Battle Clash, Flying Arrows, Sparks)
    // ------------------------------------------------------------------------
    {
      id: "scene_05_war_montage",
      chapterName: "ACT II : THE FIGHT OF THE WAR",
      progress: 45,
      type: "image",
      animatedOverlay: "war_fight",
      videoUrl: "assets/videos/battlefield.mp4",
      imageUrl: "assets/war_montage.jpg",
      camera: "camera-zoom-in screen-shake",
      particleMode: "embers",
      soundEffect: "war_montage",
      speaker: "THE BATTLEFIELD FIGHT",
      subTamil: "போர்க்கள சண்டை தொடங்கிவிட்டது! எரியும் அம்புகள், மோதும் வாள்கள்! பலத்தை வெல்ல சிந்தனை மட்டுமே எஞ்சியுள்ளது.",
      subEnglish: "The fierce fight of the war erupts! Flaming arrows volley, shields clash! Raw violence collides against strategic intellect.",
      buttonText: "ENTER THE WAR ROOM",
      onEnter: () => {
        playWarDrum(110, 1.0);
        setTimeout(() => playWarDrum(95, 1.2), 350);
        setTimeout(() => playWarDrum(80, 1.5), 700);
        triggerScreenShake();
      }
    },

    // ------------------------------------------------------------------------
    // SCENE 6 : THE WAR ROOM & MESSENGER
    // ------------------------------------------------------------------------
    {
      id: "scene_06_war_room",
      chapterName: "ACT III : THE ROYAL WAR COUNCIL",
      progress: 54,
      type: "image",
      animatedOverlay: "war_council",
      videoUrl: "assets/videos/warroom.mp4",
      imageUrl: "assets/war_council.jpg",
      camera: "camera-push-face",
      particleMode: "dust",
      soundEffect: "heartbeat",
      speaker: "MESSENGER IN TEARS",
      subTamil: "“அரசே! அவர்களின் 50,000 படைகள் கணவாயை நெருங்கிவிட்டன! நமது படைகளோ குறைவு! பலத்தால் அவர்களை வெல்லவே முடியாது!”",
      subEnglish: "“Sire! Their army is 4 times ours. Our weapons are few. We cannot defeat them through strength alone!”",
      buttonText: "ASSUME THE CROWN",
      onEnter: () => {
        playHeartbeat();
      }
    },

    // ------------------------------------------------------------------------
    // SCENE 7 : YOU BECOME THE KING (Interactive HUD)
    // ------------------------------------------------------------------------
    {
      id: "scene_07_take_command",
      chapterName: "CRITICAL JUNCTURE : YOU ARE THE KING",
      progress: 60,
      type: "image",
      animatedOverlay: "two_kings",
      videoUrl: "assets/videos/strategy.mp4",
      imageUrl: "assets/king_arivan.jpg",
      camera: "camera-zoom-out",
      particleMode: "dust",
      soundEffect: "braam",
      speaker: "CHIEF ADVISOR",
      subTamil: "அடுத்த முடிவு உங்களுடையது. நீங்களே அரசன். 12,000 உயிர்களும் நாட்டின் எதிர்காலமும் உங்கள் சிந்தனையில்.",
      subEnglish: "THE NEXT DECISION IS YOURS. YOU ARE THE KING. 12,000 lives and the entire realm rest on your mind.",
      buttonText: "DELIBERATE CHOICES",
      onEnter: () => {
        document.getElementById("decisionStatsHud").classList.add("active");
        playCinematicBraam();
        playHeartbeat();
      }
    },

    // ------------------------------------------------------------------------
    // SCENE 8 : CINEMATIC DECISION CARDS MATRIX (5 Choices)
    // ------------------------------------------------------------------------
    {
      id: "scene_08_decision_matrix",
      chapterName: "BRANCHING CRUCIBLE : 5 PATHS",
      progress: 65,
      type: "interactive",
      imageUrl: "assets/war_council.jpg",
      camera: "camera-zoom-in",
      particleMode: "dust",
      musicMood: "suspense_council",
      soundEffect: "heartbeat",
      speaker: "THE CITADEL THRONE",
      subTamil: "ஐந்து வழிகள்... எதை தேர்ந்தெடுப்பீர்? ஒவ்வொன்றின் விதியையும் முன்னரே உணர முடியுமா?",
      subEnglish: "Hover to peer into possible futures. Choose your strategy without hesitation.",
      buttonText: "CHOOSE A PATH",
      onEnter: () => {
        document.getElementById("decisionStatsHud").classList.add("active");
        document.getElementById("decisionCardsMatrix").classList.add("active");
        hideNarrationActionBtn();
      }
    }
  ];

  let currentSceneIdx = 0;
  let activeVideoBuffer = "videoA";
  let activeImageBuffer = "imageBackdropA";
  let userChosenPath = [];
  let userFailedAttempts = 0;

  // Modern Scenarios Data
  const MODERN_SCENARIOS = {
    education: {
      title: "🎓 Crucial University Finals",
      thumb: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      dilemma: "You face a massive syllabus with only 48 hours remaining. Anxious friends are cramming blindly, drinking sleepless energy drinks in high panic.",
      impulsiveChoice: "Cram all night blindly without sleep",
      impulsiveResult: "Impulsive Action: Exhaustion peaks during the exam. Brain fog strikes, recall shatters. Brute effort without understanding fails.",
      wiseChoice: "Analyze high-yield concepts & rest systematically",
      wiseResult: "Wisdom (அறிவே அரண்): By mapping the foundational core principles and staying calm, clarity protected performance."
    },
    career: {
      title: "💼 High-Stakes Workplace Crisis",
      thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      dilemma: "A critical client project has hit an unexpected failure 2 hours before the executive board demo. The team is blaming each other in fury.",
      impulsiveChoice: "Shift blame loudly & fire off defensive emails",
      impulsiveResult: "Impulsive Action: Escalated hostility, executive trust broken permanently, team fractured.",
      wiseChoice: "Pause the room, isolate root cause, present a clear recovery plan",
      wiseResult: "Wisdom (அறிவே அரண்): Composure and forensic root-cause analysis turned a catastrophe into an executive promotion."
    },
    tech: {
      title: "💻 Production Outage in Tech Architecture",
      thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      dilemma: "Traffic spikes 10x due to a viral surge. Cloud servers are crashing in cascading loops. Every minute costs thousands in revenue.",
      impulsiveChoice: "Reboot every server repeatedly hoping it recovers",
      impulsiveResult: "Impulsive Action: Database locks hard under reboot storm; total data corruption threatened.",
      wiseChoice: "Rate-limit traffic at edge, read telemetry logs, patch the query bottle-neck",
      wiseResult: "Wisdom (அறிவே அரண்): Diagnostic precision isolated the single rogue query. Unbroken stability restored."
    },
    finance: {
      title: "📈 Sudden Financial Market Crash",
      thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      dilemma: "Global markets drop 18% in three days. Panic headlines scream collapse. Your savings portfolio plunges into red.",
      impulsiveChoice: "Panic-sell everything at the absolute bottom in terror",
      impulsiveResult: "Impulsive Action: Locked in massive permanent losses; missed the historic rebound weeks later.",
      wiseChoice: "Review underlying fundamentals, stay disciplined, rebalance",
      wiseResult: "Wisdom (அறிவே அரண்): Emotional fortress preserved capital and captured generational wealth."
    },
    leadership: {
      title: "👑 Organizational Rebellion & Discord",
      thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      dilemma: "Your senior engineers and leads oppose a new corporate mandate. Tensions threaten mass resignations.",
      impulsiveChoice: "Enforce strict authority: 'Comply or leave'",
      impulsiveResult: "Impulsive Action: Key talent walks out, product roadmap stalls for 9 months, company valuation halves.",
      wiseChoice: "Conduct 1-on-1 discovery, listen to friction points, align mutual incentives",
      wiseResult: "Wisdom (அறிவே அரண்): Understanding human psychology forged an unbreakable, hyper-loyal coalition."
    },
    personal: {
      title: "🕊️ Bitter Family & Relationship Conflict",
      thumb: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      dilemma: "A misunderstanding explodes into heated accusations at a family gathering. Hurtful words threaten decades of bonds.",
      impulsiveChoice: "Counter-attack with sharpest hurtful secrets",
      impulsiveResult: "Impulsive Action: Irreparable trauma and years of estrangement over a passing triviality.",
      wiseChoice: "Breathe, absorb the sting in silence, address the root hurt privately",
      wiseResult: "Wisdom (அறிவே அரண்): Wisdom protected the family from emotional annihilation. 'அறிவற்றங் காக்குங் கருவி'."
    }
  };

  // ==========================================================================
  // 4. SCENE ENGINE CORE (Video & Image Fallback Transitions)
  // ==========================================================================
  const videoA = document.getElementById("videoA");
  const videoB = document.getElementById("videoB");
  const imgA = document.getElementById("imageBackdropA");
  const imgB = document.getElementById("imageBackdropB");
  const subTamil = document.getElementById("subTamil");
  const subEnglish = document.getElementById("subEnglish");
  const speakerTag = document.getElementById("speakerTag");
  const btnNextAction = document.getElementById("btnNextAction");
  const btnActionText = document.getElementById("btnActionText");
  const chapterLabel = document.getElementById("chapterLabel");
  const timelineFill = document.getElementById("timelineFill");

  // Language State
  let isEnglishMain = true;

  // ==========================================================================
  // TEXT-TO-SPEECH (TTS) SPOKEN NARRATION ENGINE (READS CAPTIONS ALOUD)
  // ==========================================================================
  let isSpeechEnabled = true;
  let availableVoices = [];

  function initSpeechEngine() {
    if ("speechSynthesis" in window) {
      availableVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        availableVoices = window.speechSynthesis.getVoices();
      };
    }
  }
  initSpeechEngine();

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const readBtn = document.getElementById("btnReplaySpeech");
      const voiceIcon = document.getElementById("voiceIcon");
      const moralWave = document.getElementById("moralWaveVisualizer");
      if (readBtn) readBtn.classList.remove("speaking");
      if (voiceIcon) voiceIcon.classList.remove("speaking-pulse");
      if (moralWave) moralWave.classList.remove("speaking-wave");
      if (typeof stopBoyTalking === "function") stopBoyTalking();
    }
  }

  function speakText(text, langCode = "ta") {
    if (!isSpeechEnabled || !("speechSynthesis" in window) || !text) return;
    stopSpeech();

    // Clean text of quotes and brackets for natural voice reading
    const clean = text.replace(/["“”«»•]/g, " ").replace(/\s+/g, " ").trim();
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.90;   // Natural, steady documentary pace
    utterance.pitch = 0.98;  // Warm resonant storytelling tone
    utterance.volume = 1.0;

    if (langCode === "ta") {
      utterance.lang = "ta-IN";
      if ((!availableVoices || availableVoices.length === 0) && "speechSynthesis" in window) {
        availableVoices = window.speechSynthesis.getVoices();
      }
      const tamilVoice = availableVoices.find(v => 
        (v.lang && (v.lang.toLowerCase().startsWith("ta") || v.lang.toLowerCase().includes("ta-"))) ||
        (v.name && (v.name.toLowerCase().includes("tamil") || v.name.toLowerCase().includes("valluvar") || v.name.toLowerCase().includes("pallavi")))
      );
      if (tamilVoice) utterance.voice = tamilVoice;
    } else {
      utterance.lang = "en-IN";
      const indVoice = availableVoices.find(v => v.lang === "en-IN");
      const natVoice = availableVoices.find(v => v.lang && v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("India")));
      const anyEnVoice = availableVoices.find(v => v.lang && v.lang.startsWith("en"));
      if (indVoice) utterance.voice = indVoice;
      else if (natVoice) utterance.voice = natVoice;
      else if (anyEnVoice) utterance.voice = anyEnVoice;
    }

    const readBtn = document.getElementById("btnReplaySpeech");
    const voiceIcon = document.getElementById("voiceIcon");
    const moralWave = document.getElementById("moralWaveVisualizer");
    if (readBtn) readBtn.classList.add("speaking");
    if (voiceIcon) voiceIcon.classList.add("speaking-pulse");
    if (moralWave) moralWave.classList.add("speaking-wave");

    utterance.onstart = () => {
      if (typeof startBoyTalking === "function") startBoyTalking();
    };

    utterance.onend = () => {
      if (readBtn) readBtn.classList.remove("speaking");
      if (voiceIcon) voiceIcon.classList.remove("speaking-pulse");
      if (moralWave) moralWave.classList.remove("speaking-wave");
      if (typeof stopBoyTalking === "function") stopBoyTalking();
    };
    utterance.onerror = () => {
      if (readBtn) readBtn.classList.remove("speaking");
      if (voiceIcon) voiceIcon.classList.remove("speaking-pulse");
      if (moralWave) moralWave.classList.remove("speaking-wave");
      if (typeof stopBoyTalking === "function") stopBoyTalking();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      if (typeof stopBoyTalking === "function") stopBoyTalking();
    }
  }

  function speakCurrentSlide() {
    if (!subTamil) return;
    // For each slide read the captions aloud in Tamil as requested
    const tamilText = subTamil.textContent ? subTamil.textContent.trim() : "";
    if (tamilText) {
      speakText(tamilText, "ta");
    } else if (subEnglish && subEnglish.textContent) {
      speakText(subEnglish.textContent.trim(), "en");
    }
  }

  function renderScene(scene) {
    if (!scene) return;

    // Set background music mood suitable for captions
    if (scene.musicMood) {
      setMusicMood(scene.musicMood);
    }

    // Update Text & Subtitles
    chapterLabel.textContent = scene.chapterName;
    speakerTag.textContent = scene.speaker || "CHRONICLER";
    subTamil.textContent = scene.subTamil || "";
    subEnglish.textContent = scene.subEnglish || "";
    btnActionText.textContent = scene.buttonText || "CONTINUE";
    showNarrationActionBtn();

    // Automatically read caption aloud in Tamil for each slide
    setTimeout(() => {
      speakCurrentSlide();
    }, 280);

    // Update Timeline Progress Bar
    if (timelineFill) {
      timelineFill.style.width = `${scene.progress}%`;
    }

    // Set Particle Mode
    if (scene.particleMode) {
      particleMode = scene.particleMode;
    }

    // Hide any overlays that belong to other stages
    deactivateStageOverlays();
    updateAnimatedScenes(scene.animatedOverlay || null);

    // Dual-Buffer Transition for Visuals
    const targetVideo = activeVideoBuffer === "videoA" ? videoB : videoA;
    const currentVideo = activeVideoBuffer === "videoA" ? videoA : videoB;
    const targetImg = activeImageBuffer === "imageBackdropA" ? imgB : imgA;
    const currentImg = activeImageBuffer === "imageBackdropA" ? imgA : imgB;

    let videoLoadedSuccessfully = false;

    // 1. Attempt Video Load if provided
    if (scene.videoUrl && scene.type === "video") {
      targetVideo.src = scene.videoUrl;
      targetVideo.load();

      const playPromise = targetVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            videoLoadedSuccessfully = true;
            targetVideo.classList.add("active");
            currentVideo.classList.remove("active");
            activeVideoBuffer = activeVideoBuffer === "videoA" ? "videoB" : "videoA";

            // Dim images
            imgA.classList.remove("active");
            imgB.classList.remove("active");
          })
          .catch(() => {
            // Video failed or blocked -> Fallback immediately to high-res image
            activateImageFallback(scene, targetImg, currentImg, currentVideo);
          });
      }
    } else {
      // 2. Pure Image Scene with Ken Burns Camera Movement
      activateImageFallback(scene, targetImg, currentImg, currentVideo);
    }

    // Trigger Slide Transition Wipe Animation
    triggerSlideTransitionAnimation(lastTransitionDirection);
    updateTimelineDots();
    renderSlideHotspots(scene.id);
    if (typeof updateBoyNarrator === "function") {
      updateBoyNarrator(scene.id);
    }

    // Scene Hook Callback
    if (typeof scene.onEnter === "function") {
      scene.onEnter();
    }
  }

  let lastTransitionDirection = "forward";

  function triggerSlideTransitionAnimation(direction = "forward") {
    lastTransitionDirection = direction;
    const transLayer = document.getElementById("slideTransitionLayer");
    if (transLayer) {
      transLayer.classList.remove("active");
      void transLayer.offsetWidth; // force reflow
      transLayer.classList.add("active");
      setTimeout(() => {
        transLayer.classList.remove("active");
      }, 700);
    }

    const subBox = document.querySelector(".subtitle-text-box");
    if (subBox) {
      subBox.classList.remove("subtitle-transition-glide");
      void subBox.offsetWidth;
      subBox.classList.add("subtitle-transition-glide");
    }

    if (isSoundEnabled) {
      playWarDrum(130, 0.25);
    }
  }

  function activateImageFallback(scene, targetImg, currentImg, currentVideo) {
    targetImg.style.backgroundImage = `url('${scene.imageUrl}')`;
    const morphClass = lastTransitionDirection === "backward" ? "slide-zoom-morph-out" : "slide-zoom-morph-in";
    targetImg.className = "cinema-image active " + morphClass + " " + (scene.camera || "camera-zoom-in");
    currentImg.classList.remove("active");
    if (currentVideo) currentVideo.classList.remove("active");

    activeImageBuffer = activeImageBuffer === "imageBackdropA" ? "imageBackdropB" : "imageBackdropA";
  }

  function deactivateStageOverlays() {
    const ids = [
      "tacticalMapLayer",
      "decisionCardsMatrix",
      "decisionStatsHud",
      "rippleLayer",
      "rewindLayer",
      "decisionDnaLayer",
      "splitCompareLayer",
      "wisdomFortressStage",
      "palmLeafStage",
      "modernWorldStage",
      "finalEpilogueStage",
      "moralEndingPage"
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("active");
    });
    updateAnimatedScenes(null);
  }

  function updateAnimatedScenes(overlayName) {
    const sunriseRiver = document.getElementById("animSunriseRiver");
    const borderlandsMist = document.getElementById("animBorderlandsMist");
    const kingMarch = document.getElementById("animKingMarch");
    const twoKings = document.getElementById("animTwoKings");
    const familyHearth = document.getElementById("animFamilyHearth");
    const warFight = document.getElementById("animWarFight");
    const warCouncil = document.getElementById("animWarCouncil");
    const peaceDawn = document.getElementById("animPeaceDawn");

    if (sunriseRiver) sunriseRiver.classList.toggle("active", overlayName === "sunrise_river");
    if (borderlandsMist) borderlandsMist.classList.toggle("active", overlayName === "borderlands_mist");
    if (kingMarch) kingMarch.classList.toggle("active", overlayName === "king_march");
    if (twoKings) twoKings.classList.toggle("active", overlayName === "two_kings");
    if (familyHearth) familyHearth.classList.toggle("active", overlayName === "family_hearth");
    if (warFight) warFight.classList.toggle("active", overlayName === "war_fight");
    if (warCouncil) warCouncil.classList.toggle("active", overlayName === "war_council");
    if (peaceDawn) peaceDawn.classList.toggle("active", overlayName === "peace_dawn");
  }

  function showNarrationActionBtn() {
    const dock = document.getElementById("actionPromptDock");
    if (dock) dock.style.display = "block";
  }

  function hideNarrationActionBtn() {
    const dock = document.getElementById("actionPromptDock");
    if (dock) dock.style.display = "none";
  }

  function flashScreen(duration = 0.2) {
    const flash = document.getElementById("flashLayer");
    if (!flash) return;
    flash.style.opacity = "0.85";
    setTimeout(() => {
      flash.style.opacity = "0";
    }, duration * 1000);
  }

  function triggerScreenShake() {
    const stage = document.getElementById("cinemaStage");
    if (!stage) return;
    stage.classList.add("screen-shake");
    setTimeout(() => {
      stage.classList.remove("screen-shake");
    }, 450);
  }

  // ==========================================================================
  // 5. DECISION BRANCHING SYSTEM (The 4 Failed Branches & Wisdom)
  // ==========================================================================

  function handleDecisionChoice(choice) {
    userChosenPath.push(choice);
    playWarDrum(100, 1.2);

    // Hide decision cards & stats HUD
    document.getElementById("decisionCardsMatrix").classList.remove("active");
    document.getElementById("decisionStatsHud").classList.remove("active");

    switch (choice) {
      case "strength":
        executeStrengthBranch();
        break;
      case "money":
        executeMoneyBranch();
        break;
      case "deception":
        executeDeceptionBranch();
        break;
      case "wait":
        executeWaitBranch();
        break;
      case "wisdom":
        executeWisdomBranch();
        break;
    }
  }

  // BRANCH A: STRENGTH (Frontal Clash -> Ambush -> Loss)
  function executeStrengthBranch() {
    userFailedAttempts++;
    particleMode = "embers";
    triggerScreenShake();
    playSwordClash();
    updateAnimatedScenes("war_fight");
    if (typeof updateBoyNarrator === "function") updateBoyNarrator("branch_strength");

    renderCustomDramaticScene({
      chapter: "BRANCH 1 : STRENGTH WITHOUT COMPREHENSION",
      speaker: "BATTLEFIELD DISPATCH",
      imageUrl: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=1920&q=85",
      camera: "camera-zoom-in screen-shake",
      subTamil: "நேரடித் தாக்குதல்! 50,000 படைகளின் பதுங்கு குழியில் நமது 12,000 படைகள் சிக்கின! அணிவகுப்பு சிதைந்தது!",
      subEnglish: "FRONTAL ATTACK! Velnadu's heavy cavalry encircles the vanguard. Formation broken! Supplies lost! Deep retreat!",
      buttonText: "WITNESS THE RIPPLE",
      onNext: () => {
        updateAnimatedScenes(null);
        // Show Maravan's Family in silence
        renderCustomDramaticScene({
          chapter: "CONSEQUENCE : THE RIPPLE EFFECT",
          speaker: "SILENCE IN ARANMALAI",
          imageUrl: "assets/soldier_maravan.jpg",
          camera: "camera-push-face",
          musicMood: "emotional_pathos",
          subTamil: "மறவனின் மனைவி பச்சிளங் குழந்தையுடன் வாசல் படியில் காத்திருக்கிறாள்... பின்வாங்கும் முரசொலி மட்டும் கேட்கிறது.",
          subEnglish: "Young soldier Maravan's wife stands in the doorway holding their child. No words. Only the hollow retreat drum.",
          buttonText: "INITIATE TIME REWIND ↺",
          onNext: () => {
            triggerTimeRewind("STRENGTH → ATTACK → AMBUSH → LOSS");
          }
        });
      }
    });
  }

  // BRANCH B: MONEY (Spend Treasury -> Temporary Boost -> Collapse)
  function executeMoneyBranch() {
    userFailedAttempts++;
    particleMode = "dust";
    if (typeof updateBoyNarrator === "function") updateBoyNarrator("branch_money");

    renderCustomDramaticScene({
      chapter: "BRANCH 2 : MONEY BUYS TIME, NOT VICTORY",
      speaker: "ROYAL TREASURY",
      imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1920&q=85",
      camera: "camera-zoom-in",
      musicMood: "suspense_council",
      subTamil: "கருவூலத்தின் தங்கம் விரைந்து கரைந்தது! கூலிப்படைகள் போர்க்களத்தில் பின்வாங்கின! வர்த்தகப் பாதைகள் அடைபட்டன!",
      subEnglish: "Gold vanished into foreign mercenary contracts. When supplies ran dry, the mercenaries fled. The treasury is empty.",
      buttonText: "THE HARD TRUTH",
      onNext: () => {
        renderCustomDramaticScene({
          chapter: "CONSEQUENCE : THE LIMIT OF COINS",
          speaker: "CHRONICLER",
          imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=85",
          camera: "camera-pan-left",
          musicMood: "tragic_ruin",
          subTamil: "“பணம் காலத்தை விலைக்கு வாங்கியது; ஆனால் பிரச்சினையைத் தீர்க்கவில்லை.”",
          subEnglish: "“MONEY BOUGHT TIME. BUT IT DID NOT SOLVE THE PROBLEM.”",
          buttonText: "INITIATE TIME REWIND ↺",
          onNext: () => {
            triggerTimeRewind("MONEY → CONTRACTS → DEPLETION → CRISIS");
          }
        });
      }
    });
  }

  // BRANCH C: DECEPTION (Intercepted Message -> Plan Exposed -> Isolation)
  function executeDeceptionBranch() {
    userFailedAttempts++;
    particleMode = "dust";
    if (typeof updateBoyNarrator === "function") updateBoyNarrator("branch_deception");

    renderCustomDramaticScene({
      chapter: "BRANCH 3 : DECEPTION COMPOUNDED",
      speaker: "NIGHT RUNNER DISPATCH",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
      camera: "camera-zoom-in",
      musicMood: "suspense_council",
      subTamil: "நள்ளிரவுப் பொய் ஓலை எதிரி வேவுக்காரரிடம் சிக்கியது! சூழ்ச்சி அம்பலமானது! அண்டை நாடுகளின் நம்பிக்கையும் இழந்தது!",
      subEnglish: "The decoy messenger was captured. King Veeran discovered the ruse. Aranmalai is now totally isolated.",
      buttonText: "THE BITTER LESSON",
      onNext: () => {
        renderCustomDramaticScene({
          chapter: "CONSEQUENCE : LOSS OF TRUST",
          speaker: "CHRONICLER",
          imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85",
          camera: "camera-push-face",
          musicMood: "tragic_ruin",
          subTamil: "“சூழ்ச்சி மூலப் பிரச்சினையைத் தீர்க்காமல் புதிய ஆபத்துகளை மட்டுமே உருவாக்கியது.”",
          subEnglish: "“Deception created a secondary catastrophe instead of resolving the original peril.”",
          buttonText: "INITIATE TIME REWIND ↺",
          onNext: () => {
            triggerTimeRewind("DECEPTION → EXPOSURE → ISOLATION → PERIL");
          }
        });
      }
    });
  }

  // BRANCH D: WAIT (Time-lapse 3 Days -> Encircled Siege)
  function executeWaitBranch() {
    userFailedAttempts++;
    particleMode = "mist";
    if (typeof updateBoyNarrator === "function") updateBoyNarrator("branch_wait");

    renderCustomDramaticScene({
      chapter: "BRANCH 4 : DELAY & STRANGULATION",
      speaker: "TIME-LAPSE : DAY 1 → DAY 3",
      imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1920&q=85",
      camera: "camera-zoom-in",
      musicMood: "suspense_council",
      subTamil: "நாள் 1... நாள் 2... நாள் 3... எதிரிப் படைகள் கோட்டையை முழுமையாகச் சுற்றிவளைத்தன! தானியக் கிடங்குகள் தீர்ந்தன!",
      subEnglish: "Day 1 passes... Day 2... Day 3. The enemy closes every mountain pass. Water and grain dry up. Complete siege encirclement.",
      buttonText: "WITNESS THE SIEGE",
      onNext: () => {
        renderCustomDramaticScene({
          chapter: "CONSEQUENCE : PARALYSIS",
          speaker: "CITADEL SENTINEL",
          imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
          camera: "camera-push-face",
          musicMood: "tragic_ruin",
          subTamil: "செயலின்மை பாதுகாப்பைத் தரவில்லை; எதிரிக்குத் தன் திட்டத்தை முடிக்க நேரத்தையே பரிசளித்தது.",
          subEnglish: "Inaction did not preserve safety. It merely surrendered every tactical advantage to the foe.",
          buttonText: "INITIATE TIME REWIND ↺",
          onNext: () => {
            triggerTimeRewind("INACTION → TIME-LAPSE → STRANGULATION");
          }
        });
      }
    });
  }

  // TIME REWIND ENGINE (Chromatic aberration + Reverse Audio + Visual Reset)
  function triggerTimeRewind(failedPathLabel) {
    const rewindLayer = document.getElementById("rewindLayer");
    if (!rewindLayer) return;

    // Cut sound, then play reverse whoosh
    stopTanpuraDrone();
    playReverseWhoosh();
    rewindLayer.classList.add("active");

    setTimeout(() => {
      rewindLayer.classList.remove("active");

      // Show King Arivan at War Table again
      renderCustomDramaticScene({
        chapter: "REWIND COMPLETE : THE FORTRESS OF THE MIND",
        speaker: "KING ARIVAN'S FORESIGHT",
        imageUrl: "assets/war_council.jpg",
        camera: "camera-push-face",
        musicMood: "suspense_council",
        subTamil: "“ஒரு முடிவு எல்லாவற்றையும் மாற்றிவிட்டது. வேறொரு எதிர்காலத்தை சிந்தியுங்கள்.”",
        subEnglish: `ONE DECISION CHANGED EVERYTHING [${failedPathLabel}]. Return to the war table and choose with true wisdom.`,
        buttonText: "RE-EXAMINE THE WAR TABLE",
        onNext: () => {
          document.getElementById("decisionStatsHud").classList.add("active");
          document.getElementById("decisionCardsMatrix").classList.add("active");
          hideNarrationActionBtn();
        }
      });
    }, 2400);
  }

  // ==========================================================================
  // 6. THE MASTER PATH : WISDOM (Scouts -> Map Discovery -> Bloodless Victory)
  // ==========================================================================

  function executeWisdomBranch() {
    setMusicMood("sacred_dawn");
    particleMode = "gold";
    if (typeof updateBoyNarrator === "function") updateBoyNarrator("branch_wisdom");

    // Step 1: Calmer Tone & Scouts Deployment (Kannan at Sunrise with Golden Particles)
    renderCustomDramaticScene({
      chapter: "ACT IV : THE PATH OF WISDOM (அறிவுடைமை)",
      speaker: "KING ARIVAN & KANNAN",
      imageUrl: "assets/kannan_sunrise.jpg",
      camera: "camera-pan-left",
      musicMood: "sacred_dawn",
      subTamil: "“தாக்க வேண்டாம்... முதலில் புரிந்து கொள்வோம். வேவுக்காரர்களை அமைதியாக அனுப்பி அவர்களின் பலவீனத்தை ஆராயுங்கள்.”",
      subEnglish: "“Do not attack. Understand. Send silent scouts through the forest. Find where their colossus truly feeds.”",
      buttonText: "DEPLOY SCOUTS",
      onNext: () => {
        executeScoutDiscovery();
      }
    });
  }

  function executeScoutDiscovery() {
    renderCustomDramaticScene({
      chapter: "ACT IV : RECONNAISSANCE IN THE MIST",
      speaker: "ROYAL FOREST SCOUTS",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85",
      camera: "camera-zoom-in",
      musicMood: "suspense_council",
      subTamil: "வேவுக்காரர்கள் மீண்டனர்! 50,000 வீரர்களுக்கும் ஒரேயொரு குறுகிய மலைப்பாதை வழியாகவே உணவு தானிய வண்டிகள் வருகின்றன!",
      subEnglish: "The scouts return with vital intelligence: 50,000 soldiers and 400 war tuskers depend on a single narrow mountain supply pass!",
      buttonText: "UNROLL TACTICAL MAP",
      onNext: () => {
        openTacticalMapScene();
      }
    });
  }

  function openTacticalMapScene() {
    const mapLayer = document.getElementById("tacticalMapLayer");
    if (!mapLayer) return;
    mapLayer.classList.add("active");
    setMusicMood("suspense_council");

    // Animate Tactical Map Elements sequentially
    setTimeout(() => {
      const scoutPath = document.getElementById("pathScout");
      if (scoutPath) scoutPath.style.opacity = "1";
    }, 600);

    setTimeout(() => {
      const supplyRoute = document.getElementById("pathSupplyRoute");
      const supplyMarker = document.getElementById("supplyMarkerGroup");
      if (supplyRoute) supplyRoute.style.opacity = "1";
      if (supplyMarker) supplyMarker.style.opacity = "1";
      playCinematicBraam();
    }, 1400);

    setTimeout(() => {
      const chokepoint = document.getElementById("chokepointGroup");
      if (chokepoint) chokepoint.style.opacity = "1";
    }, 2200);

    // Update Narration for Tactical Map
    chapterLabel.textContent = "TACTICAL CARTOGRAPHY : THE HIDDEN ARTERY";
    speakerTag.textContent = "KING ARIVAN'S REVELATION";
    subTamil.textContent = "“அவர்களின் மிகப்பெரிய பலமே அவர்களின் மிகப்பெரிய பலவீனம்! உணவுப் பாதை அடைபட்டால், படை தாமாகவே தளரும்!”";
    subEnglish.textContent = "“Their greatest strength is also their greatest vulnerability. Block the narrow pass; their hunger will defeat them without battle.”";
    btnActionText.textContent = "EXECUTE TACTICAL PLAN";

    setTimeout(() => {
      speakCurrentSlide();
    }, 300);

    btnNextAction.onclick = () => {
      mapLayer.classList.remove("active");
      executeBloodlessVictory();
    };
  }

  function executeBloodlessVictory() {
    particleMode = "gold";
    setMusicMood("wisdom_triumph");
    updateAnimatedScenes("peace_dawn");

    renderCustomDramaticScene({
      chapter: "ACT V : THE BLOODLESS VICTORY",
      speaker: "CHRONICLER",
      imageUrl: "assets/fortress_sunrise.jpg",
      camera: "camera-zoom-out",
      subTamil: "பாதை அடைபட்டது! 50,000 படைகளும் குழப்பமுற்றன! மன்னன் வீரன் நிலைமையை உணர்ந்து போரின்றி படைகளைத் திரும்பப் பெற்றான்!",
      subEnglish: "The supply line was sealed. Without bread, the colossus stalled. King Veeran realized defeat was certain and honorably ordered a peaceful retreat.",
      buttonText: "WITNESS THE PEACEFUL SUNRISE • இறுதி விடியல் ▶",
      onNext: () => {
        openFinalEpilogue();
      }
    });
  }

  // ==========================================================================
  // 7. DECISION DNA & TWO FUTURES SPLIT SCREEN
  // ==========================================================================

  function openDecisionDna() {
    const dnaLayer = document.getElementById("decisionDnaLayer");
    const userChain = document.getElementById("userDnaChain");
    if (!dnaLayer || !userChain) return;

    userChain.innerHTML = "";
    const pathItems = userChosenPath.length > 0 ? userChosenPath : ["strength", "wisdom"];
    pathItems.forEach((p, idx) => {
      const chip = document.createElement("span");
      chip.className = `dna-chip ${p === "wisdom" ? "gold" : ""}`;
      chip.textContent = p.toUpperCase();
      userChain.appendChild(chip);

      if (idx < pathItems.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "dna-arrow";
        arrow.textContent = "→";
        userChain.appendChild(arrow);
      }
    });

    dnaLayer.classList.add("active");
    hideNarrationActionBtn();

    const btnContinue = document.getElementById("btnContinueFromDna");
    if (btnContinue) {
      btnContinue.onclick = () => {
        dnaLayer.classList.remove("active");
        openSplitScreenComparison();
      };
    }
  }

  function openSplitScreenComparison() {
    const splitLayer = document.getElementById("splitCompareLayer");
    const splitHandle = document.getElementById("splitHandle");
    const splitLeft = document.getElementById("splitLeft");
    if (!splitLayer || !splitHandle || !splitLeft) return;

    splitLayer.classList.add("active");

    // Draggable Slider Logic
    let isDragging = false;

    function setSplitPosition(clientX) {
      const rect = splitLayer.getBoundingClientRect();
      let pos = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(10, Math.min(90, pos));
      splitLeft.style.width = `${pos}%`;
      splitHandle.style.left = `${pos}%`;
    }

    splitHandle.onmousedown = () => { isDragging = true; };
    window.onmousemove = (e) => {
      if (isDragging) setSplitPosition(e.clientX);
    };
    window.onmouseup = () => { isDragging = false; };

    // Touch support
    splitHandle.ontouchstart = () => { isDragging = true; };
    window.ontouchmove = (e) => {
      if (isDragging && e.touches.length > 0) {
        setSplitPosition(e.touches[0].clientX);
      }
    };
    window.ontouchend = () => { isDragging = false; };

    const btnDone = document.getElementById("btnDoneSplitCompare");
    if (btnDone) {
      btnDone.onclick = () => {
        splitLayer.classList.remove("active");
        openWisdomFortressStage();
      };
    }
  }

  // ==========================================================================
  // 8. THE SYMBOLIC WISDOM FORTRESS
  // ==========================================================================

  function openWisdomFortressStage() {
    const fortStage = document.getElementById("wisdomFortressStage");
    if (!fortStage) return;
    fortStage.classList.add("active");
    setMusicMood("sacred_dawn");

    const imgA = document.getElementById("imageBackdropA");
    if (imgA) {
      imgA.style.backgroundImage = "url('assets/invisible_fortress.jpg')";
      imgA.className = "cinema-image active camera-zoom-in";
    }

    chapterLabel.textContent = "METAPHOR : THE IMPREGNABLE FORTRESS";
    speakerTag.textContent = "THIRUVALLUVAR'S VISION";
    subTamil.textContent = "“அரண்மலைக் கற்கள் காலத்தால் அழியலாம்... ஆனால் அரசன் கொண்ட அறிவே அழியாத உண்மையான அரண்!”";
    subEnglish.textContent = "“Stone ramparts crumble under siege engines. But the inner fortress of wisdom cannot be pierced by any foe.”";
    btnActionText.textContent = "REVEAL SACRED KURAL";

    showNarrationActionBtn();
    setTimeout(() => {
      speakCurrentSlide();
    }, 300);

    btnNextAction.onclick = () => {
      fortStage.classList.remove("active");
      openPalmLeafManuscript();
    };
  }

  // ==========================================================================
  // 9. SACRED PALM-LEAF MANUSCRIPT (ஓலைச்சுவடி)
  // ==========================================================================

  function openPalmLeafManuscript() {
    const palmStage = document.getElementById("palmLeafStage");
    if (!palmStage) return;
    palmStage.classList.add("active");
    particleMode = "gold";
    setMusicMood("sacred_dawn");

    chapterLabel.textContent = "SACRED SCRIPTURE : THIRUKKURAL 421";
    speakerTag.textContent = "திருவள்ளுவர் அருளியது";
    subTamil.textContent = "அறிவற்றங் காக்குங் கருவி செறுவார்க்கும் உள்ளழிக்க லாகா அரண்.";
    subEnglish.textContent = "Wisdom is the unfailing instrument that protects from destruction; it is an impregnable fortress that enemies cannot destroy.";
    hideNarrationActionBtn();

    setTimeout(() => {
      speakCurrentSlide();
    }, 300);

    const btnMorph = document.getElementById("btnMorphToModern");
    if (btnMorph) {
      btnMorph.onclick = () => {
        palmStage.classList.remove("active");
        openModernCrucibles();
      };
    }
  }

  // ==========================================================================
  // 10. ANCIENT TO MODERN MORPH & CONTEMPORARY CRUCIBLES
  // ==========================================================================

  function openModernCrucibles() {
    const modernStage = document.getElementById("modernWorldStage");
    if (!modernStage) return;
    modernStage.classList.add("active");
    setMusicMood("suspense_council");

    chapterLabel.textContent = "CONTEMPORARY CRUCIBLE : TODAY'S BATTLEFIELDS";
    speakerTag.textContent = "TIMELESS APPLICATION";
    subTamil.textContent = "போர்க்களம் மாறியது; ஆனால் வள்ளுவர் காட்டிய அறிவின் அரண் மாறவில்லை.";
    subEnglish.textContent = "The battlefield changed. The human condition and the power of wisdom did not.";
    hideNarrationActionBtn();

    setTimeout(() => {
      speakCurrentSlide();
    }, 300);

    renderModernDomain("education");

    // Domain Tab Listeners
    const tabs = document.querySelectorAll(".domain-tab-btn");
    tabs.forEach((tab) => {
      tab.onclick = () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderModernDomain(tab.dataset.domain);
      };
    });
  }

  function renderModernDomain(domainKey) {
    const data = MODERN_SCENARIOS[domainKey] || MODERN_SCENARIOS.education;
    const viewport = document.getElementById("modernScenarioViewport");
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="modern-card-inner">
        <div class="modern-media-thumb" style="background-image: url('${data.thumb}');"></div>
        <div class="modern-content-box">
          <div>
            <h3 class="scenario-title">${data.title}</h3>
            <p class="scenario-dilemma">${data.dilemma}</p>
          </div>
          <div class="scenario-choices">
            <button class="scenario-btn" id="btnModernImpulsive">⚡ ${data.impulsiveChoice}</button>
            <button class="scenario-btn wise" id="btnModernWise">🧠 ${data.wiseChoice}</button>
            <div class="scenario-resolution" id="modernResolution"></div>
          </div>
          <div style="margin-top: 1rem; text-align: right;">
            <button class="cinema-btn primary" id="btnModernProceed">WITNESS THE FINAL SUNRISE →</button>
          </div>
        </div>
      </div>
    `;

    const resBox = document.getElementById("modernResolution");
    const btnImp = document.getElementById("btnModernImpulsive");
    const btnWise = document.getElementById("btnModernWise");
    const btnProceed = document.getElementById("btnModernProceed");

    btnImp.onclick = () => {
      resBox.className = "scenario-resolution active impulsive-res";
      resBox.textContent = data.impulsiveResult;
      playWarDrum(90, 0.8);
      setMusicMood("tragic_ruin");
    };

    btnWise.onclick = () => {
      resBox.className = "scenario-resolution active wise-res";
      resBox.textContent = data.wiseResult;
      setMusicMood("wisdom_triumph");
    };

    btnProceed.onclick = () => {
      document.getElementById("modernWorldStage").classList.remove("active");
      openFinalEpilogue();
    };
  }

  // ==========================================================================
  // 11. FINAL EPILOGUE & EMOTIONAL REUNION (Young Soldier Maravan)
  // ==========================================================================

  function openFinalEpilogue() {
    deactivateStageOverlays();
    particleMode = "gold";

    renderCustomDramaticScene({
      chapter: "EPILOGUE : LIVES SAVED BY WISDOM",
      speaker: "MARAVAN'S RETURN & THE SUNRISE",
      imageUrl: "assets/soldier_maravan.jpg",
      camera: "camera-push-face",
      subTamil: "எளிய வீரன் மறவன் தன் மனைவியையும் பச்சிளங் குழந்தையையும் மீண்டும் தழுவுகிறான். ஒரு துளி ரத்தமும் சிந்தாமல் 12,000 உயிர்களும் காப்பாற்றப்பட்டன. அறிவே வெல்ல முடியாத அரண்!",
      subEnglish: "Young soldier Maravan returns home safely to his wife and newborn child. Not a single drop of blood was spilled. 12,000 families were protected by the king's wisdom. Wisdom is the fortress!",
      buttonText: "📜 கதையின் நீதி & திருக்குறள் • MORAL & THIRUKKURAL 421 ▶",
      onNext: () => {
        openMoralEndingPage();
      }
    });

    const epilogueStage = document.getElementById("finalEpilogueStage");
    if (epilogueStage) {
      epilogueStage.classList.add("active");
    }

    // Final choice buttons
    const finalBtns = document.querySelectorAll(".final-choice-btns button");
    const curtain = document.getElementById("finalCurtain");

    finalBtns.forEach((btn) => {
      btn.onclick = () => {
        const choice = btn.dataset.final;
        if (choice === "understand") {
          flashScreen(0.3);
          openMoralEndingPage();
        } else {
          openMoralEndingPage();
        }
      };
    });

    const btnGoToMoral = document.getElementById("btnGoToMoralEnding");
    if (btnGoToMoral) {
      btnGoToMoral.onclick = () => {
        openMoralEndingPage();
      };
    }

    const btnCurtainToMoral = document.getElementById("btnCurtainToMoral");
    if (btnCurtainToMoral) {
      btnCurtainToMoral.onclick = () => {
        openMoralEndingPage();
      };
    }

    const btnCurtainRestart = document.getElementById("btnCurtainRestart");
    if (btnCurtainRestart) {
      btnCurtainRestart.onclick = () => {
        if (curtain) curtain.classList.remove("active");
        restartExperience();
      };
    }
  }

  // ==========================================================================
  // 12. THE GRAND MORAL ENDING PAGE & THIRUKKURAL 421
  // ==========================================================================

  function openMoralEndingPage() {
    deactivateStageOverlays();
    stopSpeech();
    hideNarrationActionBtn();

    const curtain = document.getElementById("finalCurtain");
    if (curtain) curtain.classList.remove("active");

    const moralPage = document.getElementById("moralEndingPage");
    if (moralPage) {
      // Re-trigger entrance box assembly animation fresh
      moralPage.classList.remove("active");
      void moralPage.offsetWidth;
      moralPage.classList.add("active");
      moralPage.scrollTop = 0;

      setMusicMood("wisdom_triumph");
      if (typeof updateBoyNarrator === "function") updateBoyNarrator("moral_page");

      chapterLabel.textContent = "THE SACRED MORAL : THIRUKKURAL 421";
      speakerTag.textContent = "திருவள்ளுவர் வாய்மொழி";
      subTamil.textContent = "அறிவற்றங் காக்குங் கருவி செறுவார்க்கும் உள்ளழிக்க லாகா அரண்.";
      subEnglish.textContent = "Wisdom is the ultimate armor and impregnable fortress that no enemy can breach.";

      playHarpStrum();

      // Automatically read Thirukkural and Moral aloud in Tamil
      setTimeout(() => {
        readMoralScriptureAloud();
      }, 500);
    }
  }

  function readMoralScriptureAloud() {
    const kuralAndMoralTamil = 
      "திருக்குறள் நான்கு நூற்று இருபத்தொன்று. " +
      "அறிவற்றங் காக்குங் கருவி செறுவார்க்கும் உள்ளழிக்க லாகா அரண். " +
      "வள்ளுவர் உரை: அறிவு என்பது துன்பமும் அழிவும் வராமல் முன்கூட்டியே காக்கும் சிறந்த கருவியாகும்; பகைவராலும் உள்ளே புகுந்து அழிக்க முடியாத ஒப்பற்ற பாதுகாப்புக் கோட்டையாகும். " +
      "இக்கதை எவ்வாறு திருக்குறளோடு பொருந்துகிறது? " +
      "ஒன்று: அறிவற்றங் காக்கும் கருவி. ஐம்பதாயிரம் படைகளிடமிருந்து அரண்மலையைக் காத்தது ஆயுதங்களோ கோபமோ அல்ல, அரசனின் கூரிய அறிவுடைமையே. " +
      "இரண்டு: செறுவார்க்கும் உள்ளழிக்கல் ஆகா அரண். கற்பாறை கோட்டைகளை விட மனிதனின் மன அறிவே யாராலும் தகர்க்க முடியாத அழியாத அரணாகும். " +
      "மூன்று: உயிர்களைக் காத்த விவேகம். போர் இன்றி மறவனின் குடும்பமும் பன்னிரண்டாயிரம் வீரர்களின் உயிர்களும் காப்பாற்றப்பட்டன. " +
      "கதையின் நீதி: வலிமையை விட விவேகம் மேலானது. பணம் காலத்தை மட்டுமே வாங்கும். சூழ்ச்சி ஆபத்தையே பெருக்கும். அறிவே உங்கள் அழியாத அரண்.";

    speakText(kuralAndMoralTamil, "ta");
  }

  // Hook up buttons in Moral Ending Page
  const btnReadMoralAloud = document.getElementById("btnReadMoralAloud");
  if (btnReadMoralAloud) {
    btnReadMoralAloud.onclick = () => {
      readMoralScriptureAloud();
    };
  }

  const btnMoralRestart = document.getElementById("btnMoralRestart");
  if (btnMoralRestart) {
    btnMoralRestart.onclick = () => {
      const moralPage = document.getElementById("moralEndingPage");
      if (moralPage) moralPage.classList.remove("active");
      restartExperience();
    };
  }

  const btnMoralViewScripture = document.getElementById("btnMoralViewScripture");
  if (btnMoralViewScripture) {
    btnMoralViewScripture.onclick = () => {
      const moralPage = document.getElementById("moralEndingPage");
      if (moralPage) moralPage.classList.remove("active");
      openPalmLeafManuscript();
    };
  }

  // Interactive 4-Part Kural Wisdom Prism Cards (Spoken explanation on click)
  const prismWordCards = document.querySelectorAll(".prism-word-card");
  prismWordCards.forEach((card) => {
    card.onclick = () => {
      playHeartbeat();
      const wordTamil = card.querySelector(".word-tamil");
      const wordDesc = card.querySelector(".word-desc");
      if (wordTamil && wordDesc) {
        speakText(wordTamil.textContent + ". " + wordDesc.textContent, "ta");
      }
    };
  });

  // ==========================================================================
  // 13. UTILITY SCENE RENDERER & EVENT HANDLERS
  // ==========================================================================

  function renderCustomDramaticScene({ chapter, speaker, imageUrl, camera, subTamil: ta, subEnglish: en, buttonText, onNext, musicMood }) {
    if (musicMood) {
      setMusicMood(musicMood);
    }
    deactivateStageOverlays();
    chapterLabel.textContent = chapter;
    speakerTag.textContent = speaker;
    subTamil.textContent = ta;
    subEnglish.textContent = en;
    btnActionText.textContent = buttonText;
    showNarrationActionBtn();

    const targetImg = activeImageBuffer === "imageBackdropA" ? imgB : imgA;
    const currentImg = activeImageBuffer === "imageBackdropA" ? imgA : imgB;

    targetImg.style.backgroundImage = `url('${imageUrl}')`;
    targetImg.className = "cinema-image active " + (camera || "camera-zoom-in");
    currentImg.classList.remove("active");

    activeImageBuffer = activeImageBuffer === "imageBackdropA" ? "imageBackdropB" : "imageBackdropA";

    // Automatically read caption aloud in Tamil for custom slide
    setTimeout(() => {
      speakCurrentSlide();
    }, 280);

    btnNextAction.onclick = () => {
      stopSpeech();
      if (typeof onNext === "function") onNext();
    };

    if (btnPrevAction) {
      btnPrevAction.onclick = () => {
        stopSpeech();
        if (currentSceneIdx >= 0 && currentSceneIdx < SCENES.length) {
          renderScene(SCENES[currentSceneIdx]);
        } else {
          goToPreviousSlide();
        }
      };
    }
  }

  // Next Action Button Main Pipeline
  btnNextAction.onclick = () => {
    stopSpeech();
    lastTransitionDirection = "forward";
    currentSceneIdx++;
    if (currentSceneIdx < SCENES.length) {
      renderScene(SCENES[currentSceneIdx]);
    } else {
      openMoralEndingPage();
    }
  };

  // Previous Action Button Pipeline
  function goToPreviousSlide() {
    stopSpeech();
    lastTransitionDirection = "backward";

    // 1. If currently on Moral Ending Page, return to the last active scene
    const moralPage = document.getElementById("moralEndingPage");
    if (moralPage && moralPage.classList.contains("active")) {
      moralPage.classList.remove("active");
      if (currentSceneIdx >= 0 && currentSceneIdx < SCENES.length) {
        renderScene(SCENES[currentSceneIdx]);
      } else {
        renderScene(SCENES[SCENES.length - 1]);
      }
      return;
    }

    // 2. If on interactive or branched overlays, clear and step back to current scene or decision room
    const tacticalMap = document.getElementById("tacticalMapLayer");
    const dnaLayer = document.getElementById("decisionDnaLayer");
    const splitLayer = document.getElementById("splitCompareLayer");
    const fortressStage = document.getElementById("wisdomFortressStage");
    const palmLeaf = document.getElementById("palmLeafStage");
    const modernStage = document.getElementById("modernWorldStage");
    const epilogueStage = document.getElementById("finalEpilogueStage");

    if ((tacticalMap && tacticalMap.classList.contains("active")) ||
        (dnaLayer && dnaLayer.classList.contains("active")) ||
        (splitLayer && splitLayer.classList.contains("active")) ||
        (fortressStage && fortressStage.classList.contains("active")) ||
        (palmLeaf && palmLeaf.classList.contains("active")) ||
        (modernStage && modernStage.classList.contains("active")) ||
        (epilogueStage && epilogueStage.classList.contains("active"))) {
      deactivateStageOverlays();
      currentSceneIdx = Math.min(currentSceneIdx, SCENES.length - 1);
      renderScene(SCENES[currentSceneIdx]);
      return;
    }

    // 3. Normal Slide Stepping
    if (currentSceneIdx > 0) {
      currentSceneIdx--;
      renderScene(SCENES[currentSceneIdx]);
    } else {
      // User is at Scene 0 (Prologue), step back to starting Landing Page
      restartExperience();
    }
  }

  const btnPrevAction = document.getElementById("btnPrevAction");
  if (btnPrevAction) {
    btnPrevAction.onclick = goToPreviousSlide;
  }

  const btnHeaderPrev = document.getElementById("btnHeaderPrev");
  if (btnHeaderPrev) {
    btnHeaderPrev.onclick = goToPreviousSlide;
  }

  // Decision Card Clicks & Vision Preview
  const decisionCards = document.querySelectorAll(".cinematic-card");
  decisionCards.forEach((card) => {
    card.onclick = () => {
      const choice = card.dataset.choice;
      handleDecisionChoice(choice);
    };

    // Card Hover Future Vision SFX
    card.onmouseenter = () => {
      if (card.dataset.choice === "wisdom") {
        playHeartbeat();
      } else {
        playWarDrum(120, 0.4);
      }
    };
  });

  // Cinema Bars Toggle
  const btnToggleCinemaBars = document.getElementById("btnToggleCinemaBars");
  if (btnToggleCinemaBars) {
    btnToggleCinemaBars.onclick = () => {
      document.body.classList.toggle("cinema-bars-off");
    };
  }

  // Restart Story / Return to Landing Page
  function restartExperience() {
    stopSpeech();
    currentSceneIdx = 0;
    userChosenPath = [];
    userFailedAttempts = 0;
    deactivateStageOverlays();
    updateAnimatedScenes(null);
    const curtain = document.getElementById("finalCurtain");
    if (curtain) curtain.classList.remove("active");
    const moralPage = document.getElementById("moralEndingPage");
    if (moralPage) moralPage.classList.remove("active");

    // Return to Landing Page for a fresh playthrough
    const landing = document.getElementById("landingPageScreen");
    if (landing) {
      landing.classList.remove("hidden");
      landing.classList.add("active");
    } else {
      renderScene(SCENES[0]);
    }
  }

  const btnRestartStory = document.getElementById("btnRestartStory");
  if (btnRestartStory) btnRestartStory.onclick = restartExperience;

  const btnRestartExp = document.getElementById("btnRestartExperience");
  if (btnRestartExp) btnRestartExp.onclick = restartExperience;

  // Home Button Click Handlers (Return directly to Starting Landing Page)
  const btnTopHome = document.getElementById("btnTopHome");
  if (btnTopHome) btnTopHome.onclick = restartExperience;

  const btnFloatingHome = document.getElementById("btnFloatingHome");
  if (btnFloatingHome) btnFloatingHome.onclick = restartExperience;

  // Voice Narration Toggle (Reads Captions Aloud)
  const btnToggleSpeech = document.getElementById("btnToggleSpeech");
  const voiceIcon = document.getElementById("voiceIcon");
  const voiceStatusText = document.getElementById("voiceStatusText");

  if (btnToggleSpeech) {
    btnToggleSpeech.onclick = () => {
      isSpeechEnabled = !isSpeechEnabled;
      if (isSpeechEnabled) {
        if (voiceStatusText) voiceStatusText.textContent = "VOICE ON";
        btnToggleSpeech.classList.add("active-gold");
        speakCurrentSlide();
      } else {
        if (voiceStatusText) voiceStatusText.textContent = "VOICE OFF";
        btnToggleSpeech.classList.remove("active-gold");
        stopSpeech();
      }
    };
  }

  // Replay Speech / Read Aloud Button
  const btnReplaySpeech = document.getElementById("btnReplaySpeech");
  if (btnReplaySpeech) {
    btnReplaySpeech.onclick = () => {
      speakCurrentSlide();
    };
  }

  // Language Toggle (Tamil / English prominence)
  const btnToggleLang = document.getElementById("btnToggleLang");
  const langLabel = document.getElementById("langLabel");
  if (btnToggleLang) {
    btnToggleLang.onclick = () => {
      isEnglishMain = !isEnglishMain;
      if (langLabel) langLabel.textContent = isEnglishMain ? "ENGLISH" : "தமிழ்";
      if (!isEnglishMain) {
        subTamil.style.fontSize = "1.35rem";
        subTamil.style.color = "var(--gold-glow)";
        subEnglish.style.fontSize = "0.85rem";
      } else {
        subTamil.style.fontSize = "1.15rem";
        subTamil.style.color = "#fff";
        subEnglish.style.fontSize = "0.95rem";
      }
      speakCurrentSlide();
    };
  }

  // Starting Landing Page "Enter Story" Button
  const btnEnterFromLanding = document.getElementById("btnEnterFromLanding");
  const landingPageScreen = document.getElementById("landingPageScreen");
  if (btnEnterFromLanding) {
    btnEnterFromLanding.onclick = () => {
      stopSpeech();
      if (landingPageScreen) {
        landingPageScreen.classList.remove("active");
        landingPageScreen.classList.add("hidden");
      }
      renderScene(SCENES[0]);
    };
  }

  // Quick Moral & Kural View Button on Landing Page
  const btnLandingToMoral = document.getElementById("btnLandingToMoral");
  if (btnLandingToMoral) {
    btnLandingToMoral.onclick = () => {
      stopSpeech();
      if (landingPageScreen) {
        landingPageScreen.classList.remove("active");
        landingPageScreen.classList.add("hidden");
      }
      openMoralEndingPage();
    };
  }

  // Header Brand Badge & Header Moral Button Clicks (Quick access to Moral & Kural)
  const btnHeaderBrand = document.getElementById("btnHeaderBrand");
  if (btnHeaderBrand) {
    btnHeaderBrand.onclick = () => {
      openMoralEndingPage();
    };
  }

  const btnHeaderMoral = document.getElementById("btnHeaderMoral");
  if (btnHeaderMoral) {
    btnHeaderMoral.onclick = () => {
      openMoralEndingPage();
    };
  }

  // ==========================================================================
  // 13B. MODERN INTERACTIVE SYSTEMS: SLIDE HOTSPOTS, TIMELINE DOTS & MODERN FX
  // ==========================================================================
  const SLIDE_HOTSPOTS = {
    scene_01_prologue: [
      {
        x: "24%",
        y: "40%",
        label: "வைகை நதி • Vaigai River",
        title: "வைகை நதி படுகை (Fertile Vaigai Basin)",
        desc: "பண்டைய தமிழ்நாட்டின் வளம் கொழிக்கும் நதிக்கரை. அமைதியான மக்களின் விவசாய பூமி.",
        tag: "GEOGRAPHY"
      },
      {
        x: "72%",
        y: "56%",
        label: "தொல் குடியிருப்பு • Settlement",
        title: "அமைதியான குடியிருப்பு (Peaceful Hearth)",
        desc: "போரின் நிழல் இன்னும் படராத அமைதியான குடிமக்கள் வாழும் சோலை.",
        tag: "SANGAM LIFE"
      }
    ],
    scene_02_ancient_world: [
      {
        x: "30%",
        y: "36%",
        label: "கொங்கு எல்லை • Kongu Frontier",
        title: "கொங்கு நாட்டுத் தொடர்ச்சி (Frontier Boundary)",
        desc: "மலைகளும் அடர்ந்த காடுகளும் அரணாக நின்ற தமிழகத்தின் தொல் நிலப்பரப்பு.",
        tag: "FRONTIER"
      },
      {
        x: "68%",
        y: "62%",
        label: "ஒற்றர் பாதை • Scout Trail",
        title: "ஒற்றர் தகவல் பாதை (Scout Network)",
        desc: "எதிரி நாட்டுப் படைகளின் நடமாட்டத்தை முன்கூட்டியே அறியும் வேவுப்பாதை.",
        tag: "INTELLIGENCE"
      }
    ],
    scene_03a_velnadu: [
      {
        x: "32%",
        y: "42%",
        label: "மன்னர் வீரன் • King Veeran",
        title: "வேல்நாட்டு மன்னன் வீரன் (King Veeran)",
        desc: "50,000 படைகளும் 400 போரியானைகளும் கொண்ட அசுர பலம் கொண்ட மன்னன்.",
        tag: "THE COLOSSUS"
      },
      {
        x: "74%",
        y: "50%",
        label: "களிறு அணி • War Elephants",
        title: "400 போரியானைப் படை (War Tuskers)",
        desc: "நேருக்கு நேர் மோதினால் எதையும் தகர்க்கும் பிரம்மாண்ட யானைப்படை.",
        tag: "WAR WEAPONRY"
      }
    ],
    scene_03b_aranmalai: [
      {
        x: "30%",
        y: "40%",
        label: "மன்னர் அறிவன் • King Arivan",
        title: "அரண்மலை மன்னர் அறிவன் (King Arivan)",
        desc: "ஆத்திரத்தை விடுத்து சிந்தனையை ஆயுதமாக ஏந்தும் ஞான அரசன்.",
        tag: "LEADERSHIP"
      },
      {
        x: "70%",
        y: "55%",
        label: "அரண்மலை கணவாய் • Mountain Pass",
        title: "அரண்மலை கணவாய் (Natural Citadel)",
        desc: "குறுகிய மலைப்பாதை—அறிவோடு திட்டமிட்டால் பெருமளவிலான படைகளை எளிதில் மறிக்கலாம்.",
        tag: "GEOGRAPHY"
      }
    ],
    scene_04_soldier_maravan: [
      {
        x: "26%",
        y: "46%",
        label: "வீரன் மறவன் • Soldier Maravan",
        title: "எளிய வீரன் மறவன் (Soldier Maravan)",
        desc: "மனைவியையும் குழந்தையையும் காக்க அரண்மலை படையணியில் நிற்கும் குடிமகன்.",
        tag: "HUMAN COST"
      },
      {
        x: "72%",
        y: "48%",
        label: "வீர வாள் • Ancestral Sword",
        title: "குடும்ப வாள் (Ancestral Blade)",
        desc: "வீரம் மட்டுமே போதாது; அரசரின் விவேகமான முடிவே இந்த குடும்பத்தை மீட்கும்.",
        tag: "EMOTION"
      }
    ],
    scene_05_war_montage: [
      {
        x: "28%",
        y: "32%",
        label: "நெருப்பு அம்புகள் • Fire Volleys",
        title: "நெருப்பு அம்பு மழை (Flaming Arrows)",
        desc: "வானை மறைத்து எய்யப்படும் 2000 அம்புகள். கவசத்தை ஏந்தி தற்காத்துக் கொள்ளுங்கள்!",
        tag: "VOLLEY BATTLE"
      },
      {
        x: "76%",
        y: "62%",
        label: "தற்காப்பு கவசம் • Defend Wall",
        title: "தற்காப்பு சுவர் (Phalanx Line)",
        desc: "அறிவார்ந்த வியூகம் மட்டுமே எதிரியின் ஆவேச தாக்குதலை முறியடிக்க இயலும்.",
        tag: "FORTRESS"
      }
    ],
    scene_06_war_room: [
      {
        x: "32%",
        y: "44%",
        label: "போர்த் திட்ட ஓலை • War Scroll",
        title: "அரசவை ஓலைச்சுவடி (Tactical Scroll)",
        desc: "எதிரிப் படைகளின் உணவுப் பாதைகள் மற்றும் நீர்நிலைகளின் வரைபடம்.",
        tag: "TACTICS"
      },
      {
        x: "68%",
        y: "38%",
        label: "பதறிய ஒற்றன் • Messenger",
        title: "எல்லைப்புற ஒற்றன் (Frontline Scout)",
        desc: "எதிரியின் பிரம்மாண்டத்தை கண்டு அச்சமுறும் ஒற்றன். தலைவனின் தெளிவே தேவை.",
        tag: "URGENCY"
      }
    ],
    scene_07_take_command: [
      {
        x: "50%",
        y: "38%",
        label: "அரச முடிசூட்டு • Royal Crown",
        title: "மன்னர் பொறுப்பு (Crown of Decisions)",
        desc: "12,000 உயிர்களின் பாதுகாப்பும் அமைதியும் உங்களது அடுத்த சிந்தனையில் உள்ளது.",
        tag: "RESPONSIBILITY"
      }
    ],
    scene_08_decision_matrix: [
      {
        x: "50%",
        y: "32%",
        label: "அறிவே அரண் • Wisdom Crucible",
        title: "திருக்குறள் 421 தத்துவம் (The Core Test)",
        desc: "அறிவற்றங் காக்குங் கருவி — எதிரி உள்ளே புக முடியாத அரணாக உங்கள் முடிவை அமையுங்கள்.",
        tag: "PHILOSOPHY"
      }
    ]
  };

  let activeHotspotModal = null;

  function renderSlideHotspots(sceneId) {
    const container = document.getElementById("slideHotspotsContainer");
    if (!container) return;
    container.innerHTML = "";
    if (activeHotspotModal && activeHotspotModal.parentNode) {
      activeHotspotModal.remove();
      activeHotspotModal = null;
    }

    const hotspots = SLIDE_HOTSPOTS[sceneId];
    if (!hotspots || hotspots.length === 0) return;

    hotspots.forEach((hs) => {
      const el = document.createElement("div");
      el.className = "slide-hotspot";
      el.style.left = hs.x;
      el.style.top = hs.y;
      el.title = hs.title;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");

      el.innerHTML = `
        <div class="hotspot-orb"><span>✦</span></div>
        <div class="hotspot-label-pill">${hs.label}</div>
      `;

      el.onclick = (e) => {
        e.stopPropagation();
        openHotspotModal(hs);
      };

      container.appendChild(el);
    });
  }

  function openHotspotModal(hs) {
    if (activeHotspotModal && activeHotspotModal.parentNode) {
      activeHotspotModal.remove();
      activeHotspotModal = null;
    }

    const modal = document.createElement("div");
    modal.className = "hotspot-card-modal active";
    modal.innerHTML = `
      <div class="hotspot-modal-header">
        <div class="hotspot-modal-title">${hs.title}</div>
        <button class="hotspot-close-btn" aria-label="Close">✕</button>
      </div>
      <div class="hotspot-modal-desc">${hs.desc}</div>
      <div class="hotspot-modal-subtag">📌 ${hs.tag} • SANGAM DISCOVERY</div>
    `;

    const closeBtn = modal.querySelector(".hotspot-close-btn");
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        modal.remove();
        activeHotspotModal = null;
      };
    }

    const stage = document.getElementById("cinemaStage");
    if (stage) {
      stage.appendChild(modal);
      activeHotspotModal = modal;
    }

    playHeartbeat();
    speakText(hs.desc, "ta");
  }

  // Interactive Timeline Dots
  function initTimelineDots() {
    const track = document.getElementById("timelineDotsTrack");
    if (!track) return;
    track.innerHTML = "";

    SCENES.forEach((scene, idx) => {
      const dot = document.createElement("div");
      dot.className = "t-dot" + (idx === currentSceneIdx ? " active" : "");
      dot.title = `${idx + 1}. ${scene.chapterName}`;
      dot.dataset.index = idx;
      dot.onclick = (e) => {
        e.stopPropagation();
        jumpToScene(idx);
      };
      track.appendChild(dot);
    });
  }

  function updateTimelineDots() {
    const dots = document.querySelectorAll(".t-dot");
    dots.forEach((dot, idx) => {
      if (idx === currentSceneIdx) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function jumpToScene(idx) {
    if (idx < 0 || idx >= SCENES.length) return;
    stopSpeech();
    lastTransitionDirection = idx >= currentSceneIdx ? "forward" : "backward";
    currentSceneIdx = idx;
    renderScene(SCENES[currentSceneIdx]);
  }

  // Modern Animation FX & 3D Interactive Parallax
  let isModernFxEnabled = true;

  function initModernFx() {
    const btnModernFx = document.getElementById("btnModernFx");
    const fxStatusLabel = document.getElementById("fxStatusLabel");
    const stage = document.getElementById("cinemaStage");

    if (stage) {
      stage.classList.add("modern-3d-active");
    }

    if (btnModernFx) {
      btnModernFx.onclick = () => {
        isModernFxEnabled = !isModernFxEnabled;
        if (isModernFxEnabled) {
          btnModernFx.classList.add("active-gold");
          if (fxStatusLabel) fxStatusLabel.textContent = "MODERN FX ON";
          if (stage) stage.classList.add("modern-3d-active");
          playWarDrum(150, 0.2);
        } else {
          btnModernFx.classList.remove("active-gold");
          if (fxStatusLabel) fxStatusLabel.textContent = "MODERN FX OFF";
          if (stage) stage.classList.remove("modern-3d-active");
          const backdrops = document.querySelector(".cinema-backdrop-container");
          if (backdrops) backdrops.style.transform = "none";
        }
      };
    }

    // 3D Parallax on Stage
    window.addEventListener("mousemove", (e) => {
      if (!isModernFxEnabled || !stage || !stage.classList.contains("modern-3d-active")) return;
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;

      const tiltX = mouseY * -4.0;
      const tiltY = mouseX * 4.0;

      const backdropContainer = document.querySelector(".cinema-backdrop-container");
      if (backdropContainer) {
        backdropContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });

    // Tactile Button Click Ripple Wave Effect
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".cinema-btn, .modern-glow-btn, .landing-start-btn, .t-dot, .cinema-btn-icon");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple-wave";
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Interactive Shield Deflector Feature (Scene 5 Fight of the War)
  function initShieldDeflect() {
    const btnShield = document.getElementById("btnShieldDeflect");
    const shockwave = document.getElementById("shieldShockwave");

    if (btnShield) {
      btnShield.onclick = (e) => {
        e.stopPropagation();
        playSwordClash();
        triggerScreenShake();

        if (shockwave) {
          shockwave.classList.remove("active");
          void shockwave.offsetWidth;
          shockwave.classList.add("active");
          setTimeout(() => shockwave.classList.remove("active"), 850);
        }

        const originalLabel = btnShield.querySelector(".shield-label");
        const prevText = originalLabel ? originalLabel.textContent : "";
        if (originalLabel) {
          originalLabel.textContent = "✓ DEFLECTED! • கவசம் காத்தது!";
        }
        btnShield.style.borderColor = "#00e5ff";
        btnShield.style.boxShadow = "0 0 50px #00e5ff, 0 0 80px #ffd700";

        speakText("கவசம் காத்தது! எதிரி அம்புகள் முறியடிக்கப்பட்டன!", "ta");

        setTimeout(() => {
          if (originalLabel && prevText) {
            originalLabel.textContent = prevText;
          }
          btnShield.style.borderColor = "";
          btnShield.style.boxShadow = "";
        }, 2200);
      };
    }
  }

  // ==========================================================================
  // 13C. 3D REALISTIC ANIMATED BOY NARRATOR RIG (இளங்கோ / ELANGO 3D GUIDE)
  // ==========================================================================
  const BOY_STORY_EXPLANATIONS = {
    scene_01_prologue: {
      ta: "வணக்கம்! இங்கே பாருங்கள், அமைதியான வைகை நதிக்கரையில் மக்கள் அச்சமின்றி வாழ்கிறார்கள். ஆனால் இந்த அமைதிக்கு பின்னால் ஒரு பெரும் போர் மேகம் திரள்கிறது!",
      en: "Greetings! Look here: on the fertile riverbanks, our people live in peace. But behind this dawn, a colossal storm of war is gathering!",
      mood: "gentle"
    },
    scene_02_ancient_world: {
      ta: "கொங்கு நாட்டின் அடர்ந்த மலைக்காடுகள்! இந்த எல்லைப்புறம் தான் இரு பெரும் நாடுகளை பிரிக்கிறது. இயற்கை அமைத்த இந்த நிலப்பரப்பை மன்னன் அறிவன் கூர்ந்து கவனிக்கிறார்.",
      en: "The dense mountain forests of the Kongu frontier! Notice how this terrain forms a natural bulwark between the two kingdoms.",
      mood: "terrain"
    },
    scene_03a_velnadu: {
      ta: "ஐம்பதாயிரம் படைவீரர்களும் நானூறு போரியானைகளும்! வேல்நாட்டு மன்னன் வீரன் தன் பிரம்மாண்ட பலத்தை மட்டுமே நம்பி புறப்படுகிறான். வெறும் பலம் மட்டுமே வெற்றியைத் தருமா?",
      en: "50,000 warriors and 400 war tuskers! King Veeran marches with sheer brute force. But can physical might truly triumph over intellect?",
      mood: "alert"
    },
    scene_03b_aranmalai: {
      ta: "அரண்மலையின் மன்னர் அறிவன்! அவரிடம் இருப்பது பன்னிரண்டாயிரம் வீரர்களே. ஆனால் அவரிடம் இருப்பது ஆத்திரமல்ல, ஆழமான சிந்தனை! அவரே திருக்குறள் 421ன் வடிவம்!",
      en: "King Arivan of Aranmalai! With only 12,000 men, he carries no blind fury—only deep, calm foresight. He personifies Thirukkural 421!",
      mood: "admire"
    },
    scene_04_soldier_maravan: {
      ta: "இவன் தான் எளிய வீரன் மறவன். அரசனின் ஒரு தவறான முடிவு, இவனையும் இவன் குடும்பத்தையும் அழித்துவிடும்! போரின் உண்மையான சுமை இந்த எளிய குடிமக்களின் இதயத்தில் தான் இருக்கிறது.",
      en: "This is young soldier Maravan. One reckless choice by the king could shatter his family forever. The true weight of war rests on common citizens.",
      mood: "compassion"
    },
    scene_05_war_montage: {
      ta: "அம்புகள் வானை மறைக்கின்றன! போர்க்களம் கொதிக்கிறது! சீக்கிரம், மேலே உள்ள கவசம் ஏந்தும் பொத்தானை அழுத்துங்கள்! நாம் தற்காத்துக் கொள்ள வேண்டும்!",
      en: "Arrows darken the sky! The battle clashes fiercely! Quick, click the Shield Deflect button above to raise our golden defense!",
      mood: "battle"
    },
    scene_06_war_room: {
      ta: "அரசவை கூடிவிட்டது! ஒற்றர்கள் அஞ்சி நடுங்குகிறார்கள். இப்போது நாட்டை காப்பாற்ற வாள்கள் போதாது, விவேகமான வியூகம் மட்டுமே வேண்டும்!",
      en: "The War Council meets in high tension! Messenger weeps in fear. Swords alone cannot save us now—we need strategic brilliance!",
      mood: "thoughtful"
    },
    scene_07_take_command: {
      ta: "இப்போது நீங்களே அரசன்! மன்னர் அறிவனின் மகுடம் உங்கள் தலையில். 12,000 வீரர்களையும், மறவனின் குடும்பத்தையும் உங்கள் முடிவு தான் காக்க வேண்டும்!",
      en: "Now YOU are the king! The crown rests on your mind. 12,000 lives and Maravan’s family depend entirely on your decision!",
      mood: "crown"
    },
    scene_08_decision_matrix: {
      ta: "ஐந்து வழிகள் உங்கள் முன் உள்ளன. நேருக்கு நேர் மோதுவதா? தங்கம் கொடுப்பதா? சூழ்ச்சியா? பொறுமையா? இல்லை அறிவின் வியூகமா? ஆழமாக யோசித்து தேர்ந்தெடுங்கள்!",
      en: "Five paths lie before you: Brute force? Gold? Deception? Delay? Or the strategic fortress of Wisdom? Choose wisely!",
      mood: "decision"
    },
    branch_strength: {
      ta: "பார்த்தீர்களா! நேரடி மோதல் நமது படைகளை பதுங்கு குழியில் சிக்க வைத்துவிட்டது! கோபமும் பலமும் மட்டுமே வெற்றியைத் தராது என்பதை உணருங்கள்! காலம் பின்னோக்கி சுழலும்!",
      en: "Behold the consequence! Frontal attack led straight into an ambush. Raw strength without comprehension destroys armies. Let us rewind time!",
      mood: "sad"
    },
    branch_money: {
      ta: "கருவூலத்தின் தங்கம் கரைந்தது, கூலிப்படைகள் ஓடிவிட்டன! பணத்தால் வெற்றியை விலைக்கு வாங்க முடியாது; விவேகமே நிலைக்கும்!",
      en: "Gold vanished into mercenary contracts, and they fled in the dark! Wealth alone cannot purchase safety; only wisdom endures.",
      mood: "sad"
    },
    branch_deception: {
      ta: "சூழ்ச்சி எதிரியின் ஆவேசத்தை அதிகப்படுத்தியது! நேர்மையும் தூரநோக்கும் கொண்ட ஞானமே உண்மையான பாதுகாப்பு.",
      en: "Deception provoked ruthless retaliation! Trickery fails where genuine foresight protects.",
      mood: "sad"
    },
    branch_wait: {
      ta: "செயலின்றி காத்திருந்ததால் எதிரி நம்மை முற்றுகையிட்டு உணவுப் பாதையை அடைத்துவிட்டான்! சரியான நேரத்தில் தீர்க்கமான முடிவு எடுக்க வேண்டும்.",
      en: "Passive delay allowed the enemy to encircle us. Indecision is fatal in crisis.",
      mood: "sad"
    },
    branch_wisdom: {
      ta: "அற்புதம்! எதிரியின் குறுகிய உணவுப் பாதையை மறித்தோம்! ஒரு துளி ரத்தமும் சிந்தாமல் அமைதி உடன்படிக்கை ஏற்பட்டது! இதுவே திருக்குறள் 421ன் 'அறிவே அரண்'!",
      en: "Magnificent! By cutting supply lines at the narrow mountain pass, King Veeran accepted peace without a single casualty! Wisdom is indeed an impregnable fortress!",
      mood: "triumph"
    },
    moral_page: {
      ta: "திருக்குறள் 421ன் நித்திய நீதி: அறிவற்றங் காக்குங் கருவி செறுவார்க்கும் உள்ளழிக்க லாகா அரண். வாழ்க்கையின் எந்தப் போரிலும் உங்கள் அறிவே அழியாத கோட்டை!",
      en: "The eternal moral of Thirukkural 421: Wisdom is an unfailing instrument that protects against destruction; it is an impregnable fortress that enemies cannot breach!",
      mood: "triumph"
    }
  };

  let boyTalkingInterval = null;
  let boyBlinkTimer = null;
  let currentBoyMood = "gentle";

  function updateBoyNarrator(sceneKey) {
    const dock = document.getElementById("narratorBoyDock");
    if (!dock) return;

    const data = BOY_STORY_EXPLANATIONS[sceneKey] || BOY_STORY_EXPLANATIONS["scene_01_prologue"];
    const textTa = document.getElementById("boyExplanationText");
    const textEn = document.getElementById("boyExplanationSubtext");

    if (textTa) textTa.textContent = data.ta;
    if (textEn) textEn.textContent = data.en;

    setBoyMood(data.mood || "gentle");

    const balloon = document.getElementById("boySpeechBalloon");
    if (balloon) {
      balloon.style.animation = "none";
      void balloon.offsetWidth;
      balloon.style.animation = "balloonPopIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }

    if (isSpeechEnabled) {
      speakBoyExplanation(data.ta);
    }
  }

  function setBoyMood(mood) {
    currentBoyMood = mood;
    const aura = document.getElementById("boyGoldenAura");
    if (aura) {
      if (mood === "alert" || mood === "battle") {
        aura.style.background = "radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(220, 38, 38, 0.25) 50%, transparent 70%)";
      } else if (mood === "sad") {
        aura.style.background = "radial-gradient(circle, rgba(148, 163, 184, 0.45) 0%, transparent 70%)";
      } else if (mood === "triumph") {
        aura.style.background = "radial-gradient(circle, rgba(255, 215, 0, 0.7) 0%, rgba(0, 229, 255, 0.35) 50%, transparent 75%)";
      } else if (mood === "thoughtful" || mood === "decision") {
        aura.style.background = "radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(147, 51, 234, 0.25) 50%, transparent 70%)";
      } else {
        aura.style.background = "radial-gradient(circle, rgba(255, 215, 0, 0.35) 0%, transparent 70%)";
      }
    }

    const browL = document.getElementById("boyBrowLeft");
    const browR = document.getElementById("boyBrowRight");
    const handR = document.getElementById("boyRightHand");
    if (browL && browR) {
      if (mood === "alert" || mood === "battle") {
        browL.style.transform = "rotate(14deg) translateY(-2px)";
        browR.style.transform = "rotate(-14deg) translateY(-2px)";
        if (handR) handR.style.transform = "translate(6px, -12px) rotate(25deg)";
      } else if (mood === "sad") {
        browL.style.transform = "rotate(-12deg) translateY(2px)";
        browR.style.transform = "rotate(12deg) translateY(2px)";
        if (handR) handR.style.transform = "translate(0, 0)";
      } else if (mood === "triumph") {
        browL.style.transform = "rotate(-3deg) translateY(-3px)";
        browR.style.transform = "rotate(3deg) translateY(-3px)";
        if (handR) handR.style.transform = "translate(8px, -16px) rotate(40deg)";
      } else if (mood === "thoughtful" || mood === "decision") {
        browL.style.transform = "rotate(-8deg) translateY(-1px)";
        browR.style.transform = "rotate(8deg) translateY(-1px)";
        if (handR) handR.style.transform = "translate(-2px, -8px) rotate(-10deg)";
      } else {
        browL.style.transform = "rotate(-4deg)";
        browR.style.transform = "rotate(4deg)";
        if (handR) handR.style.transform = "translate(0, 0)";
      }
    }
  }

  function startBoyTalking() {
    const dock = document.getElementById("narratorBoyDock");
    if (dock) dock.classList.add("is-speaking");

    const mouth = document.getElementById("boyMouth");
    if (!mouth) return;

    if (boyTalkingInterval) clearInterval(boyTalkingInterval);

    const phonemes = ["mouth-talk-a", "mouth-talk-o", "mouth-smile", "mouth-talk-a", "mouth-rest"];
    let step = 0;
    boyTalkingInterval = setInterval(() => {
      mouth.className = "boy-mouth " + phonemes[step % phonemes.length];
      step++;
    }, 130);
  }

  function stopBoyTalking() {
    const dock = document.getElementById("narratorBoyDock");
    if (dock) dock.classList.remove("is-speaking");

    if (boyTalkingInterval) {
      clearInterval(boyTalkingInterval);
      boyTalkingInterval = null;
    }

    const mouth = document.getElementById("boyMouth");
    if (mouth) {
      mouth.className = "boy-mouth mouth-rest";
    }
  }

  function speakBoyExplanation(customText) {
    if (!isSpeechEnabled || !("speechSynthesis" in window)) return;
    const textTa = document.getElementById("boyExplanationText");
    const textToSpeak = customText || (textTa ? textTa.textContent.trim() : "");
    if (!textToSpeak) return;

    stopSpeech();

    const clean = textToSpeak.replace(/["“”«»•]/g, " ").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.92;
    utterance.pitch = 1.08;
    utterance.volume = 1.0;
    utterance.lang = "ta-IN";

    if (availableVoices && availableVoices.length > 0) {
      const tamilVoice = availableVoices.find(v => 
        (v.lang && (v.lang.toLowerCase().startsWith("ta") || v.lang.toLowerCase().includes("ta-"))) ||
        (v.name && (v.name.toLowerCase().includes("tamil") || v.name.toLowerCase().includes("valluvar") || v.name.toLowerCase().includes("pallavi")))
      );
      if (tamilVoice) utterance.voice = tamilVoice;
    }

    utterance.onstart = () => {
      startBoyTalking();
    };

    utterance.onend = () => {
      stopBoyTalking();
    };

    utterance.onerror = () => {
      stopBoyTalking();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      stopBoyTalking();
    }
  }

  function initBoyBlinking() {
    const eyeL = document.getElementById("boyEyeLeft");
    const eyeR = document.getElementById("boyEyeRight");
    if (!eyeL || !eyeR) return;

    function scheduleBlink() {
      const delay = Math.random() * 3200 + 2200;
      boyBlinkTimer = setTimeout(() => {
        eyeL.classList.add("is-blinking");
        eyeR.classList.add("is-blinking");

        setTimeout(() => {
          eyeL.classList.remove("is-blinking");
          eyeR.classList.remove("is-blinking");

          if (Math.random() < 0.28) {
            setTimeout(() => {
              eyeL.classList.add("is-blinking");
              eyeR.classList.add("is-blinking");
              setTimeout(() => {
                eyeL.classList.remove("is-blinking");
                eyeR.classList.remove("is-blinking");
                scheduleBlink();
              }, 110);
            }, 140);
          } else {
            scheduleBlink();
          }
        }, 110);
      }, delay);
    }

    scheduleBlink();
  }

  function initBoy3DTracking() {
    const figure = document.getElementById("boyFigureWrap") || document.getElementById("boyAvatarContainer");
    if (!figure) return;

    window.addEventListener("mousemove", (e) => {
      const rect = figure.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      const rotY = Math.max(-14, Math.min(14, deltaX * 26));
      const rotX = Math.max(-10, Math.min(10, -deltaY * 18));

      figure.style.transform = `perspective(600px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });

    window.addEventListener("mouseleave", () => {
      figure.style.transform = `perspective(600px) rotateY(0deg) rotateX(0deg)`;
    });
  }

  function initBoyControls() {
    // Touching / clicking 3D avatar opens Chatbot
    const avatar = document.getElementById("boyAvatarContainer");
    if (avatar) {
      avatar.onclick = (e) => {
        e.stopPropagation();
        openBoyChatbot();
      };
      avatar.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openBoyChatbot();
        }
      });
      avatar.addEventListener("touchend", (e) => {
        e.preventDefault();
        openBoyChatbot();
      }, { passive: false });
    }

    const btnSpeak = document.getElementById("btnBoySpeakCurrent");
    if (btnSpeak) {
      btnSpeak.onclick = (e) => {
        e.stopPropagation();
        const textTa = document.getElementById("boyExplanationText");
        speakBoyExplanation(textTa ? textTa.textContent : "");
      };
    }

    const btnToggle = document.getElementById("btnToggleBoyDock");
    const dock = document.getElementById("narratorBoyDock");
    if (btnToggle && dock) {
      btnToggle.onclick = (e) => {
        e.stopPropagation();
        dock.classList.toggle("minimized");
      };
    }

    const btnHeaderGuide = document.getElementById("btnHeaderBoyGuide");
    const boyStatusText = document.getElementById("boyGuideStatusText");
    if (btnHeaderGuide && dock) {
      btnHeaderGuide.onclick = () => {
        dock.classList.toggle("hidden-guide");
        const isHidden = dock.classList.contains("hidden-guide");
        if (isHidden) {
          btnHeaderGuide.classList.remove("active-gold");
          if (boyStatusText) boyStatusText.textContent = "GUIDE OFF";
          stopBoyTalking();
        } else {
          btnHeaderGuide.classList.add("active-gold");
          if (boyStatusText) boyStatusText.textContent = "ELANGO 3D";
          playWarDrum(160, 0.2);
          const textTa = document.getElementById("boyExplanationText");
          speakBoyExplanation(textTa ? textTa.textContent : "");
        }
      };
    }
  }

  // ==========================================================================
  // 13D. 3D BOY INTERACTIVE AI CHATBOT ENGINE
  // ==========================================================================
  let isChatVoiceEnabled = true;

  const BOY_CHAT_KNOWLEDGE_BASE = [
    {
      keywords: ["பொருள்", "meaning", "explanation", "421", "குறள்", "kural", "thirukkural", "செறுவார்க்கும்", "கருவி", "உள்ளழிக்க", "அரண்"],
      replyTa: "திருக்குறள் 421: 'அறிவற்றங் காக்குங் கருவி செறுவார்க்கும் உள்ளழிக்க லாகா அரண்'. இதன் பொருள்: அறிவு என்பது ஒருவருக்கு கேடு அல்லது அழிவு வராமல் முன்கூட்டியே காக்கும் சிறந்த கருவியாகும்; எத்தகைய கொடிய பகைவராலும் உள்ளே புகுந்து தகர்க்க முடியாத அழியாத கோட்டையாகும்!",
      replyEn: "Thirukkural 421: 'Wisdom is an unfailing weapon that guards from ruin; it is an inner fortress that even the fiercest foes cannot destroy.' True defense is not outside in stone battlements, but forged inside the intellect!"
    },
    {
      keywords: ["அறிவன்", "arivan", "மன்னர் அறிவன்", "king arivan", "who is arivan"],
      replyTa: "மன்னர் அறிவன் அரண்மலை நாட்டின் அரசர். அவர் வீரம் மிக்கவர் மட்டுமல்ல, நுண்ணறிவும் தீர்க்கதரிசனமும் கொண்டவர். 50,000 படைகளைத் தாங்கிப் போரிட தன்னிடம் வெறும் 12,000 வீரர்கள் மட்டுமே இருந்தபோதும், பதற்றமடையாமல் விவேகத்தோடு முடிவெடுத்து தன் மக்களைக் காத்தவர்!",
      replyEn: "King Arivan is the sovereign of Aranmalai. Outnumbered 12,000 against 50,000, he refused blind fury and chose foresight—proving that intellect protects where numbers fail."
    },
    {
      keywords: ["வீரன்", "veeran", "வேல்நாடு", "king veeran", "who is veeran", "எதிரி", "enemy"],
      replyTa: "மன்னன் வீரன் அண்டை நாடான வேல்நாட்டின் சக்திவாய்ந்த அரசர். 50,000 வாட்படை, தேர்ப்படை மற்றும் யானைப்படைகளைக் கொண்டவர். தன் படைப்பலத்தின் மீது மட்டுமே மிதமிஞ்சிய கர்வம் கொண்டு போர் தொடுத்தவர்; இறுதியில் விவேகத்தின் முன் அடிபணிந்தவர்!",
      replyEn: "King Veeran was the mighty conqueror of Velnadu, commanding 50,000 elite cavalry and war elephants. Proud of sheer numbers, he learned that force without foresight cannot overcome an adversary anchored in wisdom."
    },
    {
      keywords: ["வென்றார்", "வெற்றி", "how win", "how won", "strategy", "வியூகம்", "தந்திரம்", "pass", "கணவாய்", "supply", "உணவு"],
      replyTa: "மன்னர் அறிவன் 50,000 படைகளை நேருக்கு நேர் மோதாமல், அவர்களின் நீண்ட உணவுப் பாதையை குறுகிய அரண்மலை கணவாயில் மறித்தார்! உணவு தீர்ந்ததும் போரிட வழியின்றி மன்னன் வீரன் சமாதானத்திற்கு வந்தார். ஒற்றை உயிரும் பலியாகாமல் அறிவால் வெற்றி பெற்றார்!",
      replyEn: "King Arivan did not clash directly against 50,000 troops. Instead, he deployed scouts and severed the enemy's narrow mountain supply pass! Without food or fodder, King Veeran was forced to sign a bloodless peace treaty."
    },
    {
      keywords: ["பலம்", "strength", "attack", "தாக்குதல்", "மோதல்", "தோல்வி", "fail", "frontal"],
      replyTa: "நேரடிப் போர் பலத்தை மட்டுமே நம்பியது. 12,000 வீரர்களைக் கொண்டு 50,000 வீரர்களை நேருக்கு நேர் தாக்கினால், எதிரியின் பதுங்கு குழியிலும் குதிரைப்படையிலும் சிக்கி பேரழிவு மட்டுமே ஏற்படும். கோபமும் குருட்டு பலமும் எப்போதும் அழிவிற்கே வழிவகுக்கும்!",
      replyEn: "Frontal clash relied purely on brute force. Hurling 12,000 men against 50,000 heavy cavalry leads straight into a fatal ambush. Brute force without strategic understanding guarantees annihilation."
    },
    {
      keywords: ["பொன்", "money", "gold", "bribe", "விலை", "செல்வம்"],
      replyTa: "பொன் கொடுத்து எதிரியை வாங்குவது அல்லது விலைக்குப் போவது தற்காலிகமானது. அது எதிரியின் பேராசையை மேலும் தூண்டி, அடுத்த மாதமே மேலும் பெரிய படையோடு திரும்ப வரவழைக்கும். அறிவே நிலையான பாதுகாப்பு, செல்வம் அல்ல!",
      replyEn: "Bribing an invader with gold only fuels greed. They return the next month demanding tenfold. Wealth is a temporary shield; wisdom is an eternal fortress."
    },
    {
      keywords: ["மறவன்", "maravan", "soldier", "குடும்பம்", "family", "மனைவி", "wife", "child", "குழந்தை"],
      replyTa: "மறவன் ஒரு சாதாரண குடிமகன் மற்றும் வீரன். அரசனின் ஒரு தவறான முடிவு மறவனின் குடும்பத்தை அனாதையாக்கிவிடும். மன்னர் அறிவன் எடுத்த விவேகமான முடிவு மறவனை உயிருடன் தன் குடும்பத்தோடு மீண்டும் மகிழ்ச்சியாக வாழ வைத்தது!",
      replyEn: "Maravan is the young citizen-soldier whose life hung in the balance. Kings make decisions, but common families bear the real scars. King Arivan's wisdom spared Maravan, allowing him to reunite safely with his newborn child."
    },
    {
      keywords: ["கதை", "story", "summary", "சுருக்கம்", "முழு கதை", "full story"],
      replyTa: "50,000 வீரர்களுடன் படையெடுத்து வந்த வீரன் மன்னனை, 12,000 வீரர்களை மட்டுமே கொண்ட அறிவன் மன்னன் எவ்வாறு அறிவாற்றலாலும் விவேகத்தாலும் எதிர்கொண்டு, உணவுப் பாதையை மறித்து, ரத்தமின்றி சமாதான உடன்படிக்கை செய்து மக்களைக் காத்தார் என்பதே இக்கதை!",
      replyEn: "This is the epic tale of 12,000 defenders who held off 50,000 invaders not through bloodshed, but by severing supply lines through calculated insight—bringing a triumphant, bloodless peace!"
    },
    {
      keywords: ["நீதி", "moral", "பாடம்", "lesson", "takeaway"],
      replyTa: "கதையின் தலையாய நீதி: 'எந்தவொரு சவாலையும் அவசர பலத்தாலோ அல்லது உணர்ச்சி வேகத்தாலோ அணுகாமல், அமைதியாக ஆராய்ந்து விவேகத்தோடு முடிவெடுப்பதே வெல்ல முடியாத அரணாகும்!'",
      replyEn: "The supreme moral: 'Facing any adversity, never rely on blind anger or brute force. Calm analysis and foresighted wisdom are an impregnable citadel that preserves life and ensures lasting triumph!'"
    },
    {
      keywords: ["வள்ளுவர்", "valluvar", "thiruvalluvar", "ஆசிரியர்", "author", "யார் எழுதினார்"],
      replyTa: "திருவள்ளுவர் இரண்டாயிரம் ஆண்டுகளுக்கு முன் வாழ்ந்த மாபெரும் தமிழ்ப் புலவர் மற்றும் உலகப் பொதுமறை தந்த மெய்யியலாளர். மனித வாழ்வின் அறம், பொருள், இன்பம் அனைத்திற்கும் வழிகாட்டும் 1330 குறள்களைப் படைத்தவர்!",
      replyEn: "Thiruvalluvar is the immortal Tamil sage and philosopher whose 1,330 couplets (Thirukkural) offer timeless universal wisdom across ethics, governance, strategy, and love!"
    },
    {
      keywords: ["நவீன", "modern", "இன்று", "today", "வாழ்க்கை", "life", "பயன்பாடு", "apply", "career", "exam", "பரீட்சை", "வேலை"],
      replyTa: "நவீன வாழ்க்கையில் தேர்வுகள், அலுவலக நெருக்கடிகள், அல்லது நிதிச் சிக்கல்கள் வரும்போது உணர்ச்சிவசப்பட்டு அவசர முடிவுகள் எடுக்காதீர்கள். நிதானமாக மூலக் காரணத்தை ஆராய்ந்து விவேகத்தோடு முடிவெடுப்பதே உங்களின் 'அறிவே அரண்'!",
      replyEn: "In modern times—whether severe exam stress, technical outages, or career dilemmas—never react in blind panic. Stay composed, diagnose the root cause, and let wisdom protect your future!"
    },
    {
      keywords: ["அரண்", "கோட்டை", "fortress", "invisible", "ஒளி", "light"],
      replyTa: "கற்கோட்டைகள் காலப்போக்கில் பீரங்கிகளாலும் முற்றுகையாலும் தகர்ந்துவிடலாம். ஆனால் மனிதனின் ஆழ்ந்த அறிவும், கூரிய சிந்தனையும் எவராலும் தகர்க்க முடியாத 'உள்ளழிக்க லாகா அரண்' ஆகும்!",
      replyEn: "Physical stone fortresses can crumble under siege. But the inner fortress of clarity, observation, and wisdom is an indestructible citadel that no external crisis can ever penetrate."
    },
    {
      keywords: ["வணக்கம்", "hello", "hi", "hey", "யார்", "who are you", "இளங்கோ யார்"],
      replyTa: "வணக்கம்! நான் இளங்கோ, இந்த வரலாற்றுப் போரின் வழிகாட்டி. திருக்குறள் 421ன் ரகசியங்களையும், போரின் தந்திரங்களையும் உங்களுடன் பகிர்வதில் பெருமகிழ்ச்சி அடைகிறேன்!",
      replyEn: "Hello! I am Elango, your 3D historical guide. I am here to share the profound wisdom of Thirukkural 421 and King Arivan's strategic triumph with you!"
    },
    {
      keywords: ["எப்படி இருக்கிறாய்", "how are you", "நலமா", "fine"],
      replyTa: "நான் மிக நலமாக இருக்கிறேன்! வரலாற்றின் விவேகத்தை உங்களுடன் பகிர்வதில் பெருமகிழ்ச்சி அடைகிறேன். உங்களுக்கு கதை பற்றியோ அல்லது திருக்குறள் பற்றியோ என்ன சந்தேகம் உள்ளது?",
      replyEn: "I am doing wonderfully! Delighted to journey through history and wisdom with you. What would you like to explore about the battle or Thirukkural?"
    },
    {
      keywords: ["நன்றி", "thanks", "thank you", "super", "superb", "அருமை", "great", "awesome", "வாழ்த்துக்கள்"],
      replyTa: "மிக்க மகிழ்ச்சி! திருக்குறள் கூறும் அறிவின் பாதையை உங்கள் அன்றாட வாழ்க்கையிலும் பின்பற்றுங்கள்! 'அறிவே அரண்'!",
      replyEn: "You are most welcome! May the light of wisdom protect you in all your endeavors. Remember: Wisdom is your impregnable fortress!"
    }
  ];

  function openBoyChatbot() {
    const modal = document.getElementById("boyChatbotModal");
    if (!modal) return;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    playHeartbeat();
    const input = document.getElementById("boyChatTextInput");
    if (input) {
      setTimeout(() => input.focus(), 250);
    }
  }

  function closeBoyChatbot() {
    const modal = document.getElementById("boyChatbotModal");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    stopSpeech();
    stopBoyTalking();
  }

  function handleUserChatQuestion(query) {
    const trimmed = (query || "").trim();
    if (!trimmed) return;

    const feed = document.getElementById("boyChatMessagesFeed");
    const typingRow = document.getElementById("boyChatTypingRow");
    if (!feed) return;

    // Append User Bubble
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user-bubble";
    userBubble.innerHTML = `
      <div class="bubble-avatar">
        <div class="user-avatar-icon">👤</div>
      </div>
      <div class="bubble-content">
        <div class="bubble-speaker">YOU (நீங்கள்)</div>
        <p class="bubble-text-ta">${escapeHtml(trimmed)}</p>
        <span class="bubble-time">${nowTime}</span>
      </div>
    `;
    feed.appendChild(userBubble);
    feed.scrollTop = feed.scrollHeight;

    // Show typing row
    if (typingRow) typingRow.style.display = "block";
    feed.scrollTop = feed.scrollHeight;

    // Determine smart answer
    const lower = trimmed.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    for (const item of BOY_CHAT_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          score += 1;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (!bestMatch) {
      bestMatch = {
        replyTa: "மிகச் சிறந்த கேள்வி! திருக்குறள் 421 நமக்குக் கற்பிப்பது ஒன்றே: எந்தவொரு சவாலையும் வெறும் ஆத்திரத்தாலோ அல்லது பலத்தாலோ வெல்ல முடியாது. அமைதியாகக் கவனித்து, முழுமையாகப் புரிந்து, விவேகத்தோடு முடிவெடுப்பதே வெல்ல முடியாத அரணாகும்!",
        replyEn: "A profound question! Thirukkural 421 teaches us that no crisis can be resolved by mere brute force. Calm analysis and wisdom are your indestructible fortress!"
      };
    }

    // Simulate bot thinking delay
    setTimeout(() => {
      if (typingRow) typingRow.style.display = "none";

      const botBubble = document.createElement("div");
      botBubble.className = "chat-bubble bot-bubble";
      botBubble.innerHTML = `
        <div class="bubble-avatar">
          <img src="assets/elango_3d_boy.png" alt="Elango">
        </div>
        <div class="bubble-content">
          <div class="bubble-speaker">இளங்கோ (ELANGO 3D)</div>
          <p class="bubble-text-ta">${bestMatch.replyTa}</p>
          <p class="bubble-text-en">“${bestMatch.replyEn}”</p>
          <span class="bubble-time">${nowTime}</span>
        </div>
      `;
      feed.appendChild(botBubble);
      feed.scrollTop = feed.scrollHeight;

      // Speak aloud if voice enabled
      if (isChatVoiceEnabled && isSpeechEnabled) {
        speakText(bestMatch.replyTa, "ta");
      }
    }, 450);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function initBoyChatbotEngine() {
    // Close button
    const btnClose = document.getElementById("btnBoyChatClose");
    if (btnClose) {
      btnClose.onclick = closeBoyChatbot;
    }

    // Modal background click close
    const modal = document.getElementById("boyChatbotModal");
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          closeBoyChatbot();
        }
      };
    }

    // Form submit
    const chatForm = document.getElementById("boyChatForm");
    const chatInput = document.getElementById("boyChatTextInput");
    if (chatForm && chatInput) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        const q = chatInput.value;
        chatInput.value = "";
        handleUserChatQuestion(q);
      };
    }

    // Quick prompt chips
    const chips = document.querySelectorAll(".prompt-chip");
    chips.forEach((chip) => {
      chip.onclick = () => {
        const q = chip.dataset.question || chip.textContent;
        handleUserChatQuestion(q);
      };
    });

    // Voice toggle inside chat
    const btnVoiceToggle = document.getElementById("btnChatVoiceToggle");
    const voiceIcon = document.getElementById("chatVoiceIcon");
    if (btnVoiceToggle) {
      btnVoiceToggle.onclick = () => {
        isChatVoiceEnabled = !isChatVoiceEnabled;
        btnVoiceToggle.classList.toggle("active", isChatVoiceEnabled);
        if (voiceIcon) {
          voiceIcon.textContent = isChatVoiceEnabled ? "🔊" : "🔇";
        }
        if (!isChatVoiceEnabled) {
          stopSpeech();
        }
      };
    }

    // Escape key closes chatbot modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.getElementById("boyChatbotModal");
        if (modal && modal.classList.contains("active")) {
          closeBoyChatbot();
        }
      }
    });
  }

  function initBoyNarratorEngine() {
    initBoyBlinking();
    initBoy3DTracking();
    initBoyControls();
    initBoyChatbotEngine();
    updateBoyNarrator("scene_01_prologue");
  }

  // ==========================================================================
  // 14. INITIAL BOOT
  // ==========================================================================
  window.addEventListener("DOMContentLoaded", () => {
    initTimelineDots();
    initModernFx();
    initShieldDeflect();
    initBoyNarratorEngine();

    // If landing page is present, keep it active until user clicks enter
    const landing = document.getElementById("landingPageScreen");
    if (!landing || landing.classList.contains("hidden")) {
      renderScene(SCENES[0]);
    }
  });

})();
