import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Palette,
  BookOpen,
  Award,
  Plus,
  Trash2,
  Send,
  Layers,
  Activity,
  Compass,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Heart,
  CornerDownRight,
  User,
  Clock,
  Check,
  X,
  FileText,
  Bookmark,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2
} from "lucide-react";
import { STYLE_SECTIONS, INITIAL_ART_PIECES } from "./data";
import { ArtPiece, ArtStyle, StyleSection, ProfessorCritique, EmotionPaletteResult } from "./types";

const THEME_CONFIGS = {
  minimalism: {
    wrapperClass: "bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-stone-200 transition-all duration-700 relative",
    headerBg: "bg-[#F9F8F6] border-b border-[#1A1A1A]",
    headerTitleClass: "font-serif text-6xl sm:text-7xl font-black tracking-tighter leading-none italic text-[#1A1A1A]",
    navBg: "bg-white text-[#1A1A1A] border-b border-[#1A1A1A]",
    cardClass: "bg-white overflow-hidden border border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-y-[-2px] transition-all flex flex-col rounded-none",
    cardBodyClass: "p-6 flex-1 flex flex-col justify-between space-y-4 bg-white text-[#1A1A1A]",
    headerBadgeClass: "bg-stone-100 text-stone-800 border border-[#1A1A1A]",
    buttonClass: "bg-[#1A1A1A] hover:bg-stone-800 text-white border border-[#1A1A1A]",
    headingFont: "font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]",
    accentColor: "text-stone-900 border-stone-900",
    bannerClass: "bg-white border border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] text-[#1A1A1A]",
    accentText: "text-red-600",
    modalContentClass: "bg-white text-[#1A1A1A] border border-[#1A1A1A] p-6 space-y-4",
    modalHeaderClass: "bg-[#1A1A1A] text-white p-5",
    formBgClass: "bg-white",
    inputBgClass: "bg-[#F9F8F6]"
  },
  journey: {
    wrapperClass: "bg-[#FAF5EF] text-[#3D2612] font-sans selection:bg-amber-100 transition-all duration-700 relative overflow-hidden",
    headerBg: "bg-[#F1E8DC] border-b border-amber-300",
    headerTitleClass: "font-serif text-6xl sm:text-7xl font-black tracking-wide leading-none text-amber-950 font-serif italic",
    navBg: "bg-[#FAF5EF] text-[#FAF5EF] border-b border-amber-200",
    cardClass: "bg-[#FCF9F5] overflow-hidden border-2 border-amber-800/80 shadow-[6px_6px_12px_rgba(139,94,26,0.12)] hover:translate-y-[-4px] hover:shadow-[8px_8px_20px_rgba(139,94,26,0.2)] transition-all flex flex-col rounded-xl",
    cardBodyClass: "p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FCF9F5] text-amber-950",
    headerBadgeClass: "bg-amber-100 text-amber-900 border border-amber-300",
    buttonClass: "bg-amber-800 hover:bg-amber-900 text-white border border-amber-900 rounded-lg",
    headingFont: "font-serif text-4xl sm:text-5xl font-black tracking-normal text-amber-950",
    accentColor: "text-amber-800 border-amber-800",
    bannerClass: "bg-[#FAF3E8] border-2 border-amber-800/80 shadow-[4px_4px_12px_rgba(139,94,26,0.08)] text-amber-950 rounded-xl",
    accentText: "text-amber-700",
    modalContentClass: "bg-[#FCF9F5] text-amber-950 border border-amber-800 p-6 space-y-4 rounded-xl",
    modalHeaderClass: "bg-amber-900 text-white p-5 rounded-t-xl",
    formBgClass: "bg-[#FCF9F5]",
    inputBgClass: "bg-[#FAF3E8]"
  },
  museum: {
    wrapperClass: "bg-[#1C0E10] text-[#EAD5D5] font-serif selection:bg-red-950 transition-all duration-700 relative",
    headerBg: "bg-[#120608] border-b border-[#3D0B12]",
    headerTitleClass: "font-serif text-5xl sm:text-6xl font-black tracking-wider leading-none text-yellow-500 uppercase font-serif italic",
    navBg: "bg-[#180A0C] text-[#EAD5D5] border-b border-[#3D0B12]",
    cardClass: "bg-[#2A1518] overflow-hidden border-8 border-double border-amber-600/60 outline outline-2 outline-amber-900/60 shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all flex flex-col rounded-none p-2 bg-gradient-to-br from-[#2D1619] to-[#1C0E10]",
    cardBodyClass: "p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#1F0E10] text-[#F3E2E2] mt-2 border-t border-[#3D0B12]",
    headerBadgeClass: "bg-red-950/80 text-yellow-500 border border-yellow-500/30",
    buttonClass: "bg-red-900 hover:bg-red-950 text-yellow-500 border border-yellow-500/40",
    headingFont: "font-serif text-4xl sm:text-5xl font-bold tracking-tight text-yellow-500 uppercase",
    accentColor: "text-yellow-500 border-yellow-500/40",
    bannerClass: "bg-[#281316] border-2 border-yellow-600/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-[#EAD5D5] rounded-none",
    accentText: "text-yellow-500",
    modalContentClass: "bg-[#1F0E10] text-[#F3E2E2] border-4 border-double border-amber-600/60 p-6 space-y-4",
    modalHeaderClass: "bg-[#120608] text-yellow-500 p-5 border-b border-yellow-500/30",
    formBgClass: "bg-[#281316]",
    inputBgClass: "bg-[#120608]"
  },
  reflection: {
    wrapperClass: "bg-[#1C1917] text-[#FAF7F5] font-sans selection:bg-stone-800 transition-all duration-700 relative",
    headerBg: "bg-[#171412] border-b border-stone-800",
    headerTitleClass: "font-serif text-5xl sm:text-6xl font-black tracking-normal leading-none text-stone-100 italic",
    navBg: "bg-[#24201E] text-stone-100 border-b border-stone-800",
    cardClass: "bg-[#24201E] overflow-hidden border border-stone-800 shadow-[4px_4px_0px_rgba(253,224,71,0.05)] hover:shadow-[6px_6px_0px_rgba(253,224,71,0.1)] hover:translate-y-[-2px] transition-all flex flex-col rounded-md",
    cardBodyClass: "p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#24201E] text-[#FAF7F5]",
    headerBadgeClass: "bg-stone-800 text-stone-200 border border-stone-700",
    buttonClass: "bg-stone-200 hover:bg-stone-300 text-stone-900 border border-stone-200 rounded-md",
    headingFont: "font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-100",
    accentColor: "text-stone-200 border-stone-700",
    bannerClass: "bg-[#2E2925] border border-stone-800 text-stone-100 rounded-md shadow-sm",
    accentText: "text-yellow-400",
    modalContentClass: "bg-[#24201E] text-stone-100 border border-stone-800 p-6 space-y-4 rounded-md",
    modalHeaderClass: "bg-stone-800 text-white p-5 rounded-t-md",
    formBgClass: "bg-[#24201E]",
    inputBgClass: "bg-[#1C1917]"
  },
  theater: {
    wrapperClass: "bg-[#0B0304] text-[#F3E8E8] font-serif selection:bg-red-950 transition-all duration-700 relative",
    headerBg: "bg-[#050001] border-b border-[#3D0B12]",
    headerTitleClass: "font-serif text-5xl sm:text-6xl font-black tracking-wider leading-none text-red-500 uppercase italic",
    navBg: "bg-[#090203] text-[#F3E8E8] border-b border-[#3D0B12]",
    cardClass: "bg-[#180709] overflow-hidden border-4 border-red-900/60 shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.01] hover:border-yellow-500/50 transition-all flex flex-col rounded-none p-1",
    cardBodyClass: "p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#0E0304] text-[#F3E2E2] mt-1 border-t border-red-950",
    headerBadgeClass: "bg-red-950 text-yellow-500 border border-yellow-500/20",
    buttonClass: "bg-red-950 hover:bg-black text-yellow-500 border border-yellow-500/30",
    headingFont: "font-serif text-4xl sm:text-5xl font-bold tracking-tight text-red-500 uppercase",
    accentColor: "text-yellow-500 border-yellow-500/30",
    bannerClass: "bg-[#120305] border border-red-900/50 text-[#F3E8E8] rounded-none",
    accentText: "text-red-500",
    modalContentClass: "bg-[#0E0304] text-[#F3E2E2] border-2 border-red-900 p-6 space-y-4",
    modalHeaderClass: "bg-[#050001] text-yellow-500 p-5 border-b border-red-900/30",
    formBgClass: "bg-[#120305]",
    inputBgClass: "bg-[#050001]"
  }
};

const PRESENTATION_SLIDES = [
  {
    id: "slide_1",
    timeMark: "00:00",
    title: "Title Slide",
    heading: "MINIMALISM",
    subheading: "Academic Analysis of Restraint & Purity",
    presenterText: "Hi everyone, I am David Hyzxent L. Memorando, and alongside my colleague Mikylla Reese V. Canapit, we are presenting our semester study on Minimalism. Let's delve into what this artistic movement represents.",
    details: [
      "Presented by David Hyzxent L. Memorando & Mikylla Reese V. Canapit",
      "Syllabus Assessment 1: Art and Design Exhibition",
      "Department of Visual & Liberal Arts"
    ]
  },
  {
    id: "slide_2",
    timeMark: "00:22",
    title: "Define Minimalism",
    heading: "Defining Minimalism",
    subheading: "Simplicity, Limits, and the Bare Minimum",
    associatedPieceId: "minimal_1",
    presenterText: "Minimalism is simplicity, setting the limits, avoiding all the extras, and the bare minimum. It is a style that uses the smallest or minimal amount of elements as much as possible, leaving only what matters. It's about finding clarity in emptiness.",
    details: [
      "Core Definition: Art of absence, setting bounds, stripping away superfluous noise.",
      "Visual Element: Uses minimal visual elements (lines, single planes) to leave only what is pure.",
      "Psychological Impact: Evokes clarity, calm, absolute focus, and sensory decompression."
    ]
  },
  {
    id: "slide_3",
    timeMark: "02:19",
    title: "Historical Origins",
    heading: "Historical Context & Evolution",
    subheading: "Rejection of Abstract Expressionism (Late 1950s - 1960s)",
    associatedPieceId: "minimal_2",
    presenterText: "Minimalism is a popular art movement developed in the late 1950s and early 60s. During this period, the art world saw a major transition particularly amongst younger artists whose works began to actively reject and move away from abstract expressionism.",
    details: [
      "Transition Period: A reaction against the chaotic personal symbolism of Abstract Expressionism.",
      "Foundational Influences: Inspired by Russian Constructivism and the readymades of Marcel Duchamp.",
      "Industrial Aesthetics: Shifting from hand-painted emotional gestures to clean, prefabricated geometric structures."
    ]
  },
  {
    id: "slide_4",
    timeMark: "03:27",
    title: "What Made It",
    heading: "What Made It Minimalism?",
    subheading: "Industrial Fabrication and Geometric Composure",
    presenterText: "So what exactly made it Minimalism? It rejected personal expression and symbolism in favor of simple geometric forms. Minimalists used industrial materials and factory-like production methods.",
    details: [
      "Non-referentiality: Art that refers only to itself, rejecting narrative or external symbolism.",
      "Materials: Industrial steel, glass, fluorescent tubes, plexiglass, and concrete.",
      "Production: Utilizing factory-made components, removing the artist's visible hand to create pristine, objective presence."
    ]
  },
  {
    id: "slide_5",
    timeMark: "05:32",
    title: "Socio-Political Critique",
    heading: "Socio-Political Issues",
    subheading: "Consumerism, Privilege, and Systemic Inequality",
    associatedPieceId: "minimal_3",
    presenterText: "Minimalism is a response to consumerism, becoming a symbol of privilege to afford quality over quantity. It promotes sustainability and mindful consumption, but critics say it ignores systemic economic inequality, placing the responsibility solely onto an individual.",
    details: [
      "The Luxury of Less: Only those with abundant wealth can afford the 'aesthetic of poverty' or premium minimalist spaces.",
      "Sustainability vs. Access: Promoting premium quality over cheap quantity can shift systemic burdens onto low-income individuals.",
      "Individual Responsibility: Critique of how corporate sustainability narratives shift systemic climate blame to individual consumer habits."
    ]
  },
  {
    id: "slide_6",
    timeMark: "07:33",
    title: "Famous Artists",
    heading: "Influential Pioneers of Form",
    subheading: "Antonio Calderara, Gego, Ruth Vollmer, Bice Lazzari",
    presenterText: "Let's explore key pioneer artists whose contributions shaped this movement: Antonio Calderara's misty grids, Gego's delicate wire space webs, Ruth Vollmer's mathematical spheres, and Bice Lazzari's abstract lyricism.",
    details: [
      "Antonio Calderara (Italy): Merged geometry with atmospheric landscape washes to capture quiet radiance.",
      "Gego / Gertrud Goldschmidt (Venezuela): Created fragile, hand-woven wire nets that defined space as an active medium.",
      "Ruth Vollmer (USA): Brought spheres, spirals, and mathematical structures to life, blending physics with sculpture.",
      "Bice Lazzari (Italy): Known as the 'Agnes Martin of Italy', drawing incredibly fine lines to evoke musical rhythm."
    ]
  },
  {
    id: "slide_7",
    timeMark: "10:36",
    title: "Famous Works",
    heading: "Iconic Masterpieces of Minimalism",
    subheading: "Frank Stella, Donald Judd, Ellsworth Kelly, Agnes Martin",
    presenterText: "Finally, we analyze several famous works, from Frank Stella's Black Paintings which declared 'what you see is what you see', to Donald Judd's galvanized steel stacks and Ellsworth Kelly's bold color blocks.",
    details: [
      "Frank Stella: 'Black Paintings' (1959) — Pure symmetric black stripes that rejected pictorial space.",
      "Donald Judd: 'Untitled (Stacks)' — Prefabricated boxes projecting outward from the gallery walls.",
      "Ellsworth Kelly: 'Red Blue Green' (1963) — Spatial tension through flat, highly saturated color shapes.",
      "Agnes Martin: Grid drawings on canvas — Quiet, penciled lines of spiritual serenity."
    ]
  },
  {
    id: "slide_8",
    timeMark: "10:51",
    title: "References & Thank You",
    heading: "Thank You & References",
    subheading: "Closing & Academic Bibliography",
    presenterText: "Thank you for listening to our presentation. We hope this has enriched your understanding of Minimalism as both a historical movement and a socio-economic concept. Have a wonderful day!",
    details: [
      "Eriksen, J. & L. (2023). 'The Philosophy of Less: Restraint in Modernism'. Journal of Design Theory.",
      "Larson, M. & Eriksen, T. (2022). 'The Socio-Economic Divide of the Minimalist Curation'.",
      "Tate Modern. 'Minimalism Movement Overview and Famous Exhibits'. London.",
      "Meissner, A. (2019). 'The Mathematics of Minimalist Sculpture: Vollmer & Judd'. Academic Press."
    ]
  }
];

export default function App() {
  // Navigation & filtering state
  const [activeTab, setActiveTab] = useState<ArtStyle | "paintbox">("minimalism");
  const [artPieces, setArtPieces] = useState<ArtPiece[]>(() => {
    try {
      const saved = localStorage.getItem("mapua_art_pieces");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load mapua_art_pieces from localStorage", e);
    }
    return INITIAL_ART_PIECES;
  });

  useEffect(() => {
    try {
      localStorage.setItem("mapua_art_pieces", JSON.stringify(artPieces));
    } catch (e) {
      console.error("Failed to save mapua_art_pieces to localStorage", e);
    }
  }, [artPieces]);
  
  // Modal / inspector state
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
  const [modalTab, setModalTab] = useState<'reflection' | 'analysis' | 'culture'>('reflection');
  const [isAddingPiece, setIsAddingPiece] = useState(false);

  // Reset modal tab when selected piece changes
  useEffect(() => {
    if (selectedPiece) {
      setModalTab('reflection');
    }
  }, [selectedPiece]);

  // Simulated Presentation Video state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [presentationProgress, setPresentationProgress] = useState(0);

  // Auto-progression of simulated video presentation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPresentationProgress((prev) => {
          const next = prev + 1;
          if (next >= 80) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Sync active slide with simulated progress
  useEffect(() => {
    const calculatedSlide = Math.min(Math.floor(presentationProgress / 10), 7);
    if (calculatedSlide !== activeSlide) {
      setActiveSlide(calculatedSlide);
    }
  }, [presentationProgress]);

  // Manual slide change synchronizer
  const handleSelectSlide = (index: number) => {
    setActiveSlide(index);
    setPresentationProgress(index * 10);
  };
  
  // Form state for adding new piece
  const [newTitle, setNewTitle] = useState("");
  const [newStyle, setNewStyle] = useState<ArtStyle>("minimalism");
  const [newMedium, setNewMedium] = useState("");
  const [newEmotion, setNewEmotion] = useState("");
  const [newReflection, setNewReflection] = useState("");
  const [newImagePreset, setNewImagePreset] = useState("https://images.unsplash.com/photo-1547891654-e66ed7edd96c?auto=format&fit=crop&q=80&w=600");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [newExternalLink, setNewExternalLink] = useState("");

  // Museum and Theater section custom states
  const [activeMuseumBooth, setActiveMuseumBooth] = useState<"booth-1" | "booth-2" | "booth-3">("booth-1");
  const [theaterSpotlight, setTheaterSpotlight] = useState(true);
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [isApplausePlaying, setIsApplausePlaying] = useState(false);
  const [reflectionViewMode, setReflectionViewMode] = useState<"ppt" | "images">("ppt");
  const [activeReflectionSlide, setActiveReflectionSlide] = useState(0);

  // Theater Confetti physics engine state (highly optimized for GPU-accelerated CSS animations)
  const [stageConfetti, setStageConfetti] = useState<{
    id: number;
    side: "left" | "right";
    color: string;
    size: number;
    xDist: number;
    yDist: number;
    rotEnd: number;
    duration: number;
    delay: number;
  }[]>([]);

  // Trigger high-performance GPU-accelerated confetti explosion
  const triggerStageConfetti = () => {
    const colors = ["#F59E0B", "#EF4444", "#3B82F6", "#10B981", "#EC4899", "#8B5CF6", "#F43F5E", "#06B6D4"];
    const particles = [];
    
    // Left nozzle (shoots up and right)
    for (let i = 0; i < 35; i++) {
      particles.push({
        id: i,
        side: "left" as const,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 8, // 5px to 13px
        xDist: 80 + Math.random() * 220, // horizontal distance (pixels)
        yDist: -220 - Math.random() * 140, // upward throw (negative pixels)
        rotEnd: (Math.random() * 540) - 270, // degrees of spin
        duration: 2.0 + Math.random() * 1.5, // seconds of flight
        delay: Math.random() * 0.15, // slight staggered delay
      });
    }

    // Right nozzle (shoots up and left)
    for (let i = 0; i < 35; i++) {
      particles.push({
        id: i + 35,
        side: "right" as const,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 8,
        xDist: -80 - Math.random() * 220, // shoots left
        yDist: -220 - Math.random() * 140,
        rotEnd: (Math.random() * 540) - 270,
        duration: 2.0 + Math.random() * 1.5,
        delay: Math.random() * 0.15,
      });
    }

    setStageConfetti(particles);

    // Automatically clean up after 4.5 seconds to prevent DOM buildup
    setTimeout(() => {
      setStageConfetti([]);
    }, 4500);
  };

  // High-fidelity Web Audio API crowd applause and cheering synthesizer (realistic fallback)
  const playSynthesizedApplause = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const duration = 5.5;
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      // Clean, soft cheering roar (low amplitude, mid-frequency resonance to avoid wind/rain storm sound)
      const roarSource = ctx.createBufferSource();
      roarSource.buffer = buffer;
      const roarFilter = ctx.createBiquadFilter();
      roarFilter.type = "bandpass";
      roarFilter.frequency.setValueAtTime(550, ctx.currentTime);
      roarFilter.Q.setValueAtTime(3.0, ctx.currentTime); // High Q makes it tonal/humming like a crowd cheering "Woo!" rather than white noise wind.
      roarFilter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 1.0);
      roarFilter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 4.0);
      
      const roarGain = ctx.createGain();
      roarGain.gain.setValueAtTime(0, ctx.currentTime);
      roarGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.5); // Much softer gain
      roarGain.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 3.5);
      roarGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      roarSource.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(ctx.destination);
      roarSource.start(ctx.currentTime);
      roarSource.stop(ctx.currentTime + duration);

      // Synthesize 3 distinct cheering vocalizations (harmonic whistles)
      for (let w = 0; w < 3; w++) {
        const startSec = Math.random() * 1.5;
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime + startSec);
        osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, ctx.currentTime + startSec + 0.3);
        osc.frequency.exponentialRampToValueAtTime(500 + Math.random() * 100, ctx.currentTime + startSec + 1.2);
        
        oscGain.gain.setValueAtTime(0, ctx.currentTime + startSec);
        oscGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + startSec + 0.2);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startSec + 1.2);
        
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(ctx.currentTime + startSec);
        osc.stop(ctx.currentTime + startSec + 1.3);
      }

      // Rhythmic individual hand claps (decreased number of clappers and sharper envelopes to prevent static rain sound)
      const numClappers = 10;
      for (let c = 0; c < numClappers; c++) {
        const delay = Math.random() * 0.4;
        const initialClapRate = 0.22 + Math.random() * 0.12; // Slower, more distinct rhythmic claps
        let clapTime = ctx.currentTime + delay;
        while (clapTime < ctx.currentTime + duration - 0.5) {
          const clapSource = ctx.createBufferSource();
          clapSource.buffer = buffer;
          
          const clapFilter = ctx.createBiquadFilter();
          clapFilter.type = "bandpass";
          clapFilter.frequency.value = 950 + Math.random() * 200; // Hand resonance
          clapFilter.Q.value = 4.0; // Highly resonant to sound organic
          
          const clapGain = ctx.createGain();
          const clapLength = 0.008 + Math.random() * 0.012; // Ultra short clap impulse
          clapGain.gain.setValueAtTime(0, clapTime);
          clapGain.gain.linearRampToValueAtTime(0.05 + Math.random() * 0.05, clapTime + 0.001);
          clapGain.gain.exponentialRampToValueAtTime(0.001, clapTime + clapLength);
          
          clapSource.connect(clapFilter);
          clapFilter.connect(clapGain);
          clapGain.connect(ctx.destination);
          
          clapSource.start(clapTime);
          clapSource.stop(clapTime + clapLength + 0.05);
          
          const slowdown = clapTime > ctx.currentTime + duration * 0.5 ? (clapTime - (ctx.currentTime + duration * 0.5)) * 0.12 : 0;
          clapTime += initialClapRate + slowdown + (Math.random() * 0.05 - 0.025);
        }
      }
    } catch (err) {
      console.warn("Web Audio synthesis failed:", err);
    }
  };

  const handlePlayApplause = () => {
    if (isApplausePlaying) return;
    setIsApplausePlaying(true);
    
    // 1. Throw high-performance GPU-accelerated confetti on the stage
    triggerStageConfetti();

    // 2. Play back real high-quality media file audio with synthesiser fallback if blocked
    try {
      const audio = new Audio("https://www.soundjay.com/human/sounds/applause-01.mp3");
      audio.volume = 0.65;
      audio.play()
        .then(() => {
          // Successfully playing real authentic crowd applause MP3! No need to play synthetic fallbacks.
          setTimeout(() => {
            audio.pause();
            setIsApplausePlaying(false);
          }, 5500);
        })
        .catch((err) => {
          console.log("Audio file playback blocked/failed. Playing synthesized fallback...");
          playSynthesizedApplause();
          setTimeout(() => {
            setIsApplausePlaying(false);
          }, 5500);
        });
    } catch (e) {
      playSynthesizedApplause();
      setTimeout(() => {
        setIsApplausePlaying(false);
      }, 5500);
    }
  };

  // AI Professor Critique loading state
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [critiqueError, setCritiqueError] = useState<string | null>(null);

  // Paintbox (advisor) state
  const [userEmotionInput, setUserEmotionInput] = useState("");
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [recipeResult, setRecipeResult] = useState<EmotionPaletteResult | null>(null);
  const [recipeError, setRecipeError] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Preset image list for adding new items
  const IMAGE_PRESETS = [
    { name: "Fluid Abstract", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600" },
    { name: "Clay & Earth", url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600" },
    { name: "Sumi-e Ink Wash", url: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&q=80&w=600" },
    { name: "Vibrant Acrylic", url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600" },
    { name: "Geometric Neon", url: "https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&q=80&w=600" }
  ];

  // Copy hex color helper
  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Get current section metadata
  const currentSection = STYLE_SECTIONS.find(s => s.id === activeTab);
  const activeTheme = activeTab === "paintbox" ? THEME_CONFIGS.minimalism : (THEME_CONFIGS[activeTab] || THEME_CONFIGS.minimalism);

  // Handle requesting critique from AI Professor
  const handleRequestCritique = async (piece: ArtPiece) => {
    if (isCritiquing) return;
    setIsCritiquing(true);
    setCritiqueError(null);

    try {
      const response = await fetch("/api/critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artTitle: piece.title,
          style: piece.style,
          material: piece.medium,
          emotion: piece.emotion,
          notes: piece.reflection
        })
      });

      if (!response.ok) {
        throw new Error("Critique retrieval failed. Please ensure the server is fully started.");
      }

      const critique: ProfessorCritique = await response.json();

      // Update piece in state
      const updatedPieces = artPieces.map(p => {
        if (p.id === piece.id) {
          return { ...p, professorCritique: critique };
        }
        return p;
      });

      setArtPieces(updatedPieces);
      
      // Update selected piece modal view
      setSelectedPiece(prev => prev ? { ...prev, professorCritique: critique } : null);
    } catch (err: any) {
      console.error(err);
      setCritiqueError(err.message || "Something went wrong generating the critique.");
    } finally {
      setIsCritiquing(false);
    }
  };

  // Handle generating style recipe
  const handleGenerateRecipe = async (e: FormEvent) => {
    e.preventDefault();
    if (!userEmotionInput.trim() || isGeneratingRecipe) return;

    setIsGeneratingRecipe(true);
    setRecipeError(null);
    setRecipeResult(null);

    try {
      const response = await fetch("/api/emotion-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion: userEmotionInput })
      });

      if (!response.ok) {
        throw new Error("Could not construct the palette recipe. Please try again.");
      }

      const result: EmotionPaletteResult = await response.json();
      setRecipeResult(result);
    } catch (err: any) {
      console.error(err);
      setRecipeError(err.message || "Failed to contact the art advisor.");
    } finally {
      setIsGeneratingRecipe(false);
    }
  };

  // Handle saving newly added piece
  const handleAddPieceSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMedium.trim() || !newEmotion.trim() || !newReflection.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    const finalImageUrl = customImageUrl.trim() || newImagePreset;

    const newPiece: ArtPiece = {
      id: "custom_" + Date.now(),
      title: newTitle,
      style: newStyle,
      medium: newMedium,
      imageUrl: finalImageUrl,
      reflection: newReflection,
      emotion: newEmotion,
      date: "Semester Curation",
      externalLink: newExternalLink.trim() ? newExternalLink.trim() : undefined
    };

    setArtPieces([newPiece, ...artPieces]);
    
    // Switch to the section of the newly added piece to showcase it
    setActiveTab(newStyle);
    setIsAddingPiece(false);

    // Reset Form
    setNewTitle("");
    setNewMedium("");
    setNewEmotion("");
    setNewReflection("");
    setCustomImageUrl("");
    setNewExternalLink("");
  };

  // Handle deleting custom piece
  const handleDeletePiece = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this piece from your semester portfolio?")) {
      setArtPieces(artPieces.filter(p => p.id !== id));
      if (selectedPiece?.id === id) {
        setSelectedPiece(null);
      }
    }
  };

  return (
    <div className={`min-h-screen ${activeTheme.wrapperClass}`}>
      {/* Background Designs based on theme selection */}
      {activeTab === "minimalism" && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      )}
      {activeTab === "journey" && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden z-0">
          <svg className="w-full h-full min-h-[150vh]" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M-100,100 C300,300 100,600 500,400 C900,200 700,800 1100,700" stroke="#8B5E1A" strokeWidth="3" strokeDasharray="12 12" />
            <path d="M-50,250 C200,150 400,700 700,500 C1000,300 800,900 1050,950" stroke="#8B5E1A" strokeWidth="1.5" />
          </svg>
        </div>
      )}
      {activeTab === "museum" && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,_rgba(234,179,8,0.18)_0%,_transparent_60%)] bg-[radial-gradient(circle_at_20%_40%,_rgba(234,179,8,0.06)_0%,_transparent_40%)] bg-[radial-gradient(circle_at_80%_70%,_rgba(234,179,8,0.06)_0%,_transparent_40%)] opacity-90 z-0" />
      )}

      {/* Semester Header Card */}
      <header className={`${activeTheme.headerBg} relative z-10 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-mono font-bold text-stone-500 uppercase">
                <Bookmark className="w-3.5 h-3.5 text-stone-400" />
                ART APPLICATION / FALL SEMESTER
              </div>
              <h1 className={`mt-2 transition-all duration-700 ${activeTheme.headerTitleClass}`}>
                {activeTab === "museum" 
                  ? "THE ACROPOLIS MUSEUM" 
                  : activeTab === "journey" 
                    ? "THE EXPEDITION" 
                    : activeTab === "reflection"
                      ? "ACADEMIC REFLECTIONS"
                      : activeTab === "theater"
                        ? "THE CHANDELIER STAGE"
                        : "THE CONDUIT GALLERY"}
              </h1>
              <p className="mt-2 text-sm max-w-xl font-light italic opacity-85">
                {activeTab === "museum" 
                  ? "A neoclassical gallery hosting historical masterwork submissions, gilded frames, and digital visual critiques."
                  : activeTab === "journey" 
                    ? "A chronologically mapped documentation of creative processes, breakthrough studies, and raw expressive mediums."
                    : activeTab === "reflection"
                      ? "Philosophical evaluations, critical presentation decks, and peer reviews exploring artistic impact and privilege."
                      : activeTab === "theater"
                        ? "An immersive, velvet-clad stage documenting the premiere of Paquita, dramatic spotlighting, and silent narrative."
                        : "A minimal, high-contrast structural portfolio showcasing compositional balance, spacing, and restraint."}
              </p>
            </div>
            
            {/* Student metadata badge */}
            <div className={`flex items-center gap-3 p-4 border self-start md:self-auto shadow-sm transition-all duration-500 ${
              activeTab === "museum" || activeTab === "theater"
                ? "bg-[#1E0E10] border-yellow-500/30 text-[#EAD5D5]"
                : activeTab === "reflection"
                  ? "bg-[#24201E] border-stone-800 text-[#FAF7F5]"
                  : activeTab === "minimalism"
                    ? "bg-[#1C1C1C] border-stone-800 text-[#E4E4E7]"
                    : "bg-[#FCF9F5] border-amber-400/60 text-amber-950"
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-semibold transition-colors duration-500 ${
                activeTab === "museum" || activeTab === "theater"
                  ? "bg-yellow-500 text-stone-900"
                  : activeTab === "reflection"
                    ? "bg-yellow-600 text-stone-950"
                    : activeTab === "minimalism"
                      ? "bg-stone-300 text-stone-950"
                      : "bg-amber-800 text-white"
              }`}>
                DM
              </div>
              <div>
                <p className="text-[9px] text-stone-400 font-mono tracking-widest uppercase">STUDENT CURATOR</p>
                <p className={`text-sm font-bold transition-colors duration-500 ${
                  activeTab === "museum" || activeTab === "theater"
                    ? "text-yellow-500"
                    : activeTab === "reflection"
                      ? "text-yellow-400"
                      : activeTab === "minimalism"
                        ? "text-stone-100"
                        : "text-amber-950"
                }`}>David Memorandum</p>
                <p className="text-[11px] opacity-75 font-mono">memorandavid@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Rails */}
      <nav className={`sticky top-0 z-30 border-b shadow-sm relative transition-colors duration-700 ${activeTheme.navBg}`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Scrollable Tab Container */}
            <div className="flex items-center space-x-1 sm:space-x-3 py-1 overflow-x-auto whitespace-nowrap scrollbar-thin flex-1 pr-2">
              {STYLE_SECTIONS.map((sec, idx) => (
                <button
                  key={sec.id}
                  id={`nav-tab-${sec.id}`}
                  onClick={() => setActiveTab(sec.id)}
                  className={`px-3 sm:px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                    activeTab === sec.id
                      ? `${
                          activeTab === "museum"
                            ? "text-yellow-500 border-b-2 border-yellow-500 font-black"
                            : activeTab === "journey"
                              ? "text-amber-800 border-b-2 border-amber-800 font-black"
                              : activeTab === "reflection"
                                ? "text-yellow-400 border-b-2 border-yellow-400 font-black"
                                : activeTab === "theater"
                                  ? "text-red-500 border-b-2 border-red-500 font-black"
                                  : "text-stone-100 border-b-2 border-stone-100 font-black"
                        } scale-102`
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {`0${idx + 1} / ${sec.name}`}
                </button>
              ))}
              
              <button
                id="nav-tab-paintbox"
                onClick={() => setActiveTab("paintbox")}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeTab === "paintbox"
                    ? "text-amber-600 border-b-2 border-amber-600 font-black scale-102"
                    : "text-stone-500 hover:text-amber-600"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                EXPRESSIVE LAB
              </button>
            </div>

            {/* Pinned Action Button */}
            <button
              id="add-artwork-btn"
              onClick={() => setIsAddingPiece(true)}
              className={`shrink-0 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase px-3 py-2 border shadow transition-all active:scale-95 ${activeTheme.buttonClass}`}
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span>ADD OUTPUT</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ART STYLE PORTFOLIO PAGE */}
          {activeTab !== "paintbox" && currentSection && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Thematic Header block reflecting current movement style */}
              <div className={`${activeTheme.bannerClass} p-6 sm:p-8 transition-all duration-500`}>
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  <div className="space-y-4 max-w-3xl">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border text-[10px] font-mono uppercase font-bold ${activeTab === "museum" ? "bg-red-950/80 border-yellow-500/30 text-yellow-500" : activeTab === "journey" ? "bg-amber-100/50 border-amber-300 text-amber-950" : "bg-stone-50 border-[#1A1A1A] text-stone-700"}`}>
                      <Palette className={`w-3.5 h-3.5 ${activeTheme.accentText}`} />
                      Sector {STYLE_SECTIONS.findIndex(s => s.id === activeTab) + 1} / {currentSection.name} Technique
                    </div>
                    
                    <h2 className={`font-serif text-4xl sm:text-5xl font-black tracking-tight ${activeTab === "museum" ? "text-yellow-500" : activeTab === "journey" ? "text-amber-900 font-serif" : "text-[#1A1A1A]"}`}>
                      {currentSection.name}: <span className={`italic font-light font-serif ${activeTab === "museum" ? "text-[#EAD5D5]" : activeTab === "journey" ? "text-amber-700" : "text-stone-500"}`}>{currentSection.tagline}</span>
                    </h2>
                    
                    <p className="text-sm font-light leading-relaxed opacity-90">
                      {currentSection.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 items-center text-xs font-mono">
                      <span className="font-bold uppercase tracking-wider text-[10px]">Core Mediums:</span>
                      {currentSection.materialsUsed.map((mat, i) => (
                        <span key={i} className={`border border-dashed px-2 py-0.5 text-xs ${activeTab === "museum" ? "border-yellow-500/40 text-yellow-500/90" : activeTab === "journey" ? "border-amber-400 text-amber-800" : "border-[#1A1A1A] text-stone-700"}`}>
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`lg:w-80 p-5 border flex flex-col justify-between ${activeTab === "museum" ? "bg-[#1E0E10] border-yellow-500/20 text-[#EAD5D5]" : activeTab === "journey" ? "bg-[#FAF3E8] border-amber-300 text-amber-950" : "bg-[#F9F8F6] border-[#1A1A1A] text-stone-700"}`}>
                    <div>
                      <h4 className="text-[10px] font-mono tracking-widest uppercase opacity-60 font-bold">LEARNING FOCUS</h4>
                      <p className="mt-1.5 text-xs leading-relaxed font-serif italic">
                        "{currentSection.learningObjectives}"
                      </p>
                    </div>

                    <div className={`mt-4 pt-4 border-t border-dashed ${activeTab === "museum" ? "border-yellow-500/20" : activeTab === "journey" ? "border-amber-300" : "border-stone-300"}`}>
                      <h4 className="text-[10px] font-mono tracking-widest uppercase opacity-60 font-bold">CHARACTERISTICS</h4>
                      <ul className="mt-2 space-y-1.5 text-xs font-mono">
                        {currentSection.keyCharacteristics.map((char, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 ${activeTab === "museum" ? "bg-yellow-500" : activeTab === "journey" ? "bg-amber-600" : "bg-red-600"}`} />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey Timeline Progression Map */}
              {activeTab === "journey" && (
                <div className="bg-[#FAF3E8] border-2 border-amber-800/80 rounded-xl p-5 shadow-sm">
                  <h4 className="text-xs font-mono text-amber-900 font-bold tracking-widest uppercase mb-4 text-center">
                    🧭 Map of the Semester Journey & Evolution
                  </h4>
                  <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                    <div className="absolute left-1/2 md:left-12 md:right-12 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 md:translate-x-0 w-1 md:w-auto md:h-0.5 bg-amber-200 z-0" />
                    
                    {[
                      { step: "01", phase: "INCEPTION", date: "Oct 2025", title: "The Sandbox", icon: "🧭", active: true },
                      { step: "02", phase: "EXPLORATION", date: "Nov 2025", title: "Organic Materials", icon: "🧗", active: true },
                      { step: "03", phase: "BREAKTHROUGH", date: "Nov 2025", title: "Compositional Shift", icon: "✨", active: true },
                      { step: "04", phase: "CURATION", date: "Dec 2025", title: "The Vault", icon: "🏛️", active: false }
                    ].map((pt, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[150px] bg-[#FAF3E8] px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm shadow border-2 transition-all duration-300 ${pt.active ? "bg-amber-700 text-white border-amber-800 scale-110" : "bg-amber-100 text-amber-500 border-amber-300"}`}>
                          {pt.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-amber-800 uppercase mt-2 tracking-wider">{pt.phase}</span>
                        <span className="text-[11px] font-serif text-amber-950 font-bold italic leading-none">{pt.title}</span>
                        <span className="text-[9px] font-mono text-amber-500 mt-0.5">{pt.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              {activeTab === "minimalism" ? (
                /* EXCLUSIVE PRESENTATION EXPERIENCE FOR MINIMALISM */
                <div className="space-y-8">
                  {/* Title Bar */}
                  <div className="border-b pb-3 border-[#1A1A1A] flex items-center justify-between">
                    <h3 className="font-serif text-3xl font-black italic text-[#1A1A1A] flex items-center gap-2">
                      <Layers className="w-6 h-6 text-red-600" />
                      Video Presentation Exhibit
                    </h3>
                    <span className="text-xs font-mono px-3 py-1 bg-[#1A1A1A] text-white border border-[#1A1A1A] font-bold tracking-widest uppercase">
                      Syllabus Assessment 1
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left side: Real Widescreen Video Player (8 cols) */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="relative aspect-[16/9] w-full bg-stone-950 border-4 border-double border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] overflow-hidden">
                        <iframe
                          src="https://drive.google.com/file/d/1kQC4lqdgxuQzmK1480fiTZeDhepZ4Z0c/preview"
                          className="absolute inset-0 w-full h-full border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                          title="Minimalism Syllabus Video Presentation"
                        ></iframe>
                      </div>

                      {/* Explicit Interactive Details Card */}
                      <div className="bg-[#FAF8F6] border border-[#1A1A1A] p-5 shadow-sm space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-700 font-mono text-[9px] uppercase font-bold tracking-widest">
                          🎥 Direct Embedded Video Presentation
                        </span>
                        <h4 className="font-serif text-xl font-bold italic text-[#1A1A1A]">
                          Minimalism as Creative Philosophy and Modern Critique
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-serif">
                          This video contains the full comprehensive academic assessment submitted by curators <strong>David L. Memorando</strong> and <strong>Mikylla Reese V. Canapit</strong>. It evaluates Minimalism's deep sensory forms, Gego's structures, Antonio Calderara's geometries, and socio-political evaluations of minimalist consumer lifestyles.
                        </p>
                      </div>
                    </div>

                    {/* Right side: Academic Chapter Guide & Summary (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="bg-white border-2 border-double border-[#1A1A1A] p-5 space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
                        <div className="border-b pb-2 border-stone-200">
                          <h4 className="font-serif text-lg font-bold italic text-[#1A1A1A]">Syllabus Assessment Units</h4>
                          <p className="text-[9px] font-mono text-stone-500 uppercase mt-0.5">Core topics evaluated inside the video</p>
                        </div>

                        <div className="space-y-1.5 font-mono text-[11px] text-stone-700">
                          <div className="p-2 bg-stone-50 border border-stone-200 flex items-center gap-2">
                            <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-[9px]">1</span>
                            <span>The Abstract Canvas & Void Origins</span>
                          </div>
                          <div className="p-2 bg-stone-50 border border-stone-200 flex items-center gap-2">
                            <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-[9px]">2</span>
                            <span>Antonio Calderara's Pure Geometries</span>
                          </div>
                          <div className="p-2 bg-stone-50 border border-stone-200 flex items-center gap-2">
                            <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-[9px]">3</span>
                            <span>Gego & Structural Wire Grid Systems</span>
                          </div>
                          <div className="p-2 bg-stone-50 border border-stone-200 flex items-center gap-2">
                            <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-[9px]">4</span>
                            <span>Socio-Political Critiques of Luxury Void</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Summary overview */}
                      <div className="bg-white border border-[#1A1A1A] p-5 space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
                        <div className="flex items-center gap-2 border-b pb-1.5 border-dashed border-stone-200">
                          <BookOpen className="w-4 h-4 text-red-600" />
                          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                            Academic Summary
                          </h4>
                        </div>
                        <p className="font-serif text-xs leading-relaxed text-stone-600 italic">
                          "Analyzing the late 1950s transition away from chaotic expression to industrial forms, assessing materials like unprimed linen, wire grids, and formulating active socio-cultural commentary."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Minimalism Educational & Academic Deep-Dive Section */}
                  <div className="space-y-12 pt-12 border-t border-dashed border-[#1A1A1A]/30">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 border-[#1A1A1A]">
                      <div>
                        <h3 className="font-serif text-3xl font-bold italic flex items-center gap-2 text-[#1A1A1A]">
                          <BookOpen className="w-6 h-6 text-red-600" />
                          Theoretical Analysis: What is Minimalism?
                        </h3>
                        <p className="text-xs font-mono text-stone-500 uppercase tracking-widest mt-1">
                          Core philosophy, historical genesis, and multi-dimensional societal impacts
                        </p>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 border border-[#1A1A1A] font-bold tracking-widest bg-stone-50 text-[#1A1A1A]">
                        CURATION ESSAY
                      </span>
                    </div>

                    {/* Bento Grid Concept Presentation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Concept 1: The Core Definition */}
                      <div className="bg-white border border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono tracking-widest uppercase text-red-600 font-bold">Concept 01 / Philosophy</div>
                          <h4 className="font-serif text-2xl font-bold italic text-[#1A1A1A]">The Art of Restraint</h4>
                          <p className="text-xs text-stone-600 leading-relaxed font-serif">
                            Minimalism is simplicity, setting strict limits, avoiding all extras, and embracing the bare minimum. By using the smallest amount of physical elements, it eliminates superfluous noise, allowing negative space to command presence. It is a philosophy where what is excluded speaks with equal gravity as what is rendered.
                          </p>
                        </div>
                        <div className="border-t border-dashed border-stone-200 pt-3 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                          Key Value: Absolute Clarity in Emptiness
                        </div>
                      </div>

                      {/* Concept 2: Historical Genesis */}
                      <div className="bg-white border border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono tracking-widest uppercase text-red-600 font-bold">Concept 02 / History</div>
                          <h4 className="font-serif text-2xl font-bold italic text-[#1A1A1A]">The Expressionist Rejection</h4>
                          <p className="text-xs text-stone-600 leading-relaxed font-serif">
                            Developed in the late 1950s and early 1960s, Minimalism emerged as a direct reaction against the chaotic personal gestures of Abstract Expressionism. Led by younger pioneers, the movement shifted toward pure geometric composure and industrial materials. It removed the visual "ego" of the artist in favor of prefabricated steel, plexiglass, and concrete.
                          </p>
                        </div>
                        <div className="border-t border-dashed border-stone-200 pt-3 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                          Origins: Marcel Duchamp & Constructivism
                        </div>
                      </div>

                      {/* Concept 3: Socio-Political Critique */}
                      <div className="bg-white border border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono tracking-widest uppercase text-red-600 font-bold">Concept 03 / Critique</div>
                          <h4 className="font-serif text-2xl font-bold italic text-[#1A1A1A]">The Privilege of Less</h4>
                          <p className="text-xs text-stone-600 leading-relaxed font-serif">
                            Minimalism serves as a response to aggressive consumerism, but it also hosts a stark socio-economic divide. Affirming the ability to choose "quality over quantity" acts as an indicator of modern wealth. While encouraging sustainable consumption, critics argue it places the environmental and moral burden on individual choice rather than addressing systemic corporate inequality.
                          </p>
                        </div>
                        <div className="border-t border-dashed border-stone-200 pt-3 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                          Socio-Economics: Luxury vs. Systemic Force
                        </div>
                      </div>

                    </div>

                    {/* The Multi-Dimensional Impacts Section */}
                    <div className="bg-[#FAF8F6] border border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-6">
                      <div className="border-b border-stone-200 pb-3">
                        <h4 className="font-serif text-xl font-bold italic text-[#1A1A1A] flex items-center gap-2">
                          <Layers className="w-5 h-5 text-red-600" />
                          The Multi-Dimensional Impacts of Minimalism
                        </h4>
                        <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-0.5">
                          How stripping away form reverberates across visual, mental, ecological, and economic layers
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        <div className="p-4 bg-white border border-stone-200 space-y-2 rounded-none">
                          <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center font-mono text-xs font-bold text-stone-900 border border-[#1A1A1A]">
                            A
                          </div>
                          <h5 className="font-serif text-sm font-bold text-[#1A1A1A]">Visual & Architectural</h5>
                          <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                            Pioneered modern industrial design, functionalist layouts, and clean responsive digital grids. Strips away decorative noise to focus solely on user utility and content.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-stone-200 space-y-2 rounded-none">
                          <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center font-mono text-xs font-bold text-stone-900 border border-[#1A1A1A]">
                            B
                          </div>
                          <h5 className="font-serif text-sm font-bold text-[#1A1A1A]">Cognitive & Mental</h5>
                          <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                            Acts as a vessel for psychological decompression in a hyper-connected, noisy world. The vacant space offers visual "breathing room" to foster intense mental clarity.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-stone-200 space-y-2 rounded-none">
                          <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center font-mono text-xs font-bold text-stone-900 border border-[#1A1A1A]">
                            C
                          </div>
                          <h5 className="font-serif text-sm font-bold text-[#1A1A1A]">Ecological Footprint</h5>
                          <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                            Encourages circular material choices, longevity over disposable waste, and reduction of resource overhead. Rejects the toxic rhythms of planned product obsolescence.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-stone-200 space-y-2 rounded-none">
                          <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center font-mono text-xs font-bold text-stone-900 border border-[#1A1A1A]">
                            D
                          </div>
                          <h5 className="font-serif text-sm font-bold text-[#1A1A1A]">Socio-Economic Divide</h5>
                          <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                            Creates a contrast between those with the systemic resources to buy premium simplicity, and low-income populations forced to live with the bare minimum.
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Inspiring quote at bottom of Minimalism Page */}
                    <div className="pt-6 mt-12 border-t border-dashed border-stone-200 text-center max-w-2xl mx-auto space-y-2">
                      <p className="font-serif text-lg italic text-[#1A1A1A] leading-relaxed">
                        "What you see is what you see. Art is the elimination of the unnecessary."
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-stone-500 font-bold">
                        — Frank Stella & Pablo Picasso
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                /* CUSTOM SECTOR VIEWS FOR SENSORY CHANNELS */
                activeTab === "museum" ? (
                  <div className="space-y-12">
                    {/* Museum Featured Presentation Video at the very top */}
                    <div className="space-y-4">
                      <div className="border-b pb-3 border-yellow-500/20">
                        <span className="text-[9px] font-mono text-yellow-500 font-bold uppercase tracking-[0.25em] block">
                          🏛️ EXHIBITION OVERVIEW / INTRODUCTORY CINEMATIC
                        </span>
                        <h3 className="font-serif text-3xl font-black italic text-yellow-500 flex items-center gap-2 mt-1">
                          Featured Museum Presentation
                        </h3>
                        <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-2xl italic">
                          This introductory documentary provides a panoramic view of classical antiquities, academic curriculum milestones, and student creative curation.
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] w-full bg-black border-8 border-double border-yellow-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                        <iframe
                          src="https://drive.google.com/file/d/1N24k_Z7PuBPg3nlSyY50tJWw6e1AYwg7/preview"
                          className="absolute inset-0 w-full h-full border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                          title="Museum Top Video Presentation"
                        ></iframe>
                        {/* Dramatic spotlight beam overlay effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(253,224,71,0.08)_0%,_transparent_60%)]" />
                      </div>
                    </div>

                    {/* Active GDrive Collection Archive Link */}
                    <div className="bg-[#2A1518]/60 border border-yellow-500/20 p-5 space-y-3 shadow-md">
                      <div className="flex items-center gap-2 text-yellow-500 border-b border-yellow-500/10 pb-2">
                        <Layers className="w-4 h-4 text-yellow-500" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold">Raw Asset Explorer Folder</h4>
                      </div>
                      <p className="text-xs text-[#EAD5D5]/80 font-serif leading-relaxed">
                        To study the original source captures and raw imagery of classical relics, view our live active Google Drive Repository containing high-resolution materials:
                      </p>
                      <a
                        href="https://drive.google.com/drive/folders/1fnKw8anDiwnl6br5MpPzw0-Q3ky-Yv77?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-950 font-mono text-[10px] uppercase font-black tracking-widest border border-yellow-600 shadow transition-all rounded-xs"
                      >
                        Browse Raw GDrive Folder Drive ↗
                      </a>
                    </div>

                    {/* Interactive Virtual Booth Selector */}
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-3 border-yellow-500/20 gap-4">
                        <div>
                          <h3 className="font-serif text-2xl font-black italic text-yellow-500 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-yellow-500 animate-pulse" />
                            Virtual Exhibition Walls (Curation Booths)
                          </h3>
                          <p className="text-xs font-mono text-stone-400 uppercase tracking-wider mt-0.5">
                            Separated and curated into thematic halls with physical frame representations
                          </p>
                        </div>
                        
                        {/* Booth tabs */}
                        <div className="flex bg-[#120608] border border-yellow-500/20 p-1 self-start md:self-auto">
                          {(["booth-1", "booth-2", "booth-3"] as const).map((boothId) => (
                            <button
                              key={boothId}
                              onClick={() => setActiveMuseumBooth(boothId)}
                              className={`px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase transition-all ${
                                activeMuseumBooth === boothId
                                  ? "bg-yellow-500 text-stone-900 font-bold"
                                  : "text-stone-400 hover:text-stone-200"
                              }`}
                            >
                              {boothId === "booth-1" ? "Booth I: Antiquity" : boothId === "booth-2" ? "Booth II: Canvas" : "Booth III: Cinema"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Displaying Booth Content styled like framed paintings on a museum wall */}
                      <div className="p-6 sm:p-10 bg-radial from-[#1A0A0C] to-[#0A0203] border-4 border-double border-yellow-500/20 shadow-inner relative overflow-hidden min-h-[500px]">
                        
                        {/* Virtual gallery lighting effect */}
                        <div className="absolute top-0 inset-x-0 h-40 bg-[linear-gradient(180deg,_rgba(234,179,8,0.1)_0%,_transparent_100%)] pointer-events-none" />
                        
                        {/* Display Booth I: Classical Antiquity & Statuary */}
                        {activeMuseumBooth === "booth-1" && (
                          <div className="space-y-8 animate-fadeIn relative z-10">
                            <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
                              <h4 className="font-serif text-xl font-bold uppercase tracking-wider text-yellow-500">The Neoclassical Wing</h4>
                              <p className="text-xs text-stone-400 font-serif leading-relaxed italic">
                                Exploring structural proportions, marble reliefs, and timeless architectural grace.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                              {[
                                {
                                  title: "Neoclassical Architecture Study",
                                  medium: "Graphite and Charcoal on Heavy Paper",
                                  desc: "A meticulous study analyzing the architectural balance and structural kinetics of classical ruins from the Mapúan semester portfolio.",
                                  img: "https://lh3.googleusercontent.com/d/148fmt1XT-g_beltR8ewoB_cXyjEtAgxW"
                                },
                                {
                                  title: "Classical Form & Human Study",
                                  medium: "Charcoal & Wash Sketch on Card",
                                  desc: "Exploring traditional draftsmanship and human muscular anatomy under dramatic chiaroscuro spotlight illumination.",
                                  img: "https://lh3.googleusercontent.com/d/1j1TROkSl0FLEYVUzceE-jp6CWHtCBF-M"
                                }
                              ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center space-y-4">
                                  {/* Physical Heavy Gold Frame */}
                                  <div className="border-[14px] border-double border-[#C4953C] outline outline-2 outline-amber-950 bg-stone-900 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative p-2 max-w-full hover:scale-[1.02] transition-transform duration-500">
                                    {/* Spotlight reflection on glass */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                                    <div className="aspect-[4/5] w-64 overflow-hidden relative">
                                      <img src={item.img} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover filter brightness-95 contrast-105" />
                                    </div>
                                  </div>
                                  {/* Brass Placard */}
                                  <div className="bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 border border-yellow-700 text-stone-950 text-[10px] font-mono uppercase font-black tracking-widest px-4 py-1.5 shadow-md text-center max-w-[220px]">
                                    <p className="truncate font-bold">{item.title}</p>
                                    <p className="text-[8px] opacity-75 font-serif italic font-normal tracking-tight">{item.medium}</p>
                                  </div>
                                  <p className="text-[11px] text-[#EAD5D5]/80 font-serif leading-relaxed italic text-center max-w-xs px-2 pt-1">
                                    "{item.desc}"
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Display Booth II: Raw Expressive Paintings & Frames */}
                        {activeMuseumBooth === "booth-2" && (
                          <div className="space-y-8 animate-fadeIn relative z-10">
                            <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
                              <h4 className="font-serif text-xl font-bold uppercase tracking-wider text-yellow-500">The Oil & Glaze Gallery</h4>
                              <p className="text-xs text-stone-400 font-serif leading-relaxed italic">
                                High-contrast chiaroscuro glazing, textural brush strokes, and emotional visual narratives.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center">
                              {[
                                {
                                  title: "Nike of Samothrace Study",
                                  medium: "Sumi Ink & Graphite Shavings",
                                  desc: "Analyzing the sweeping, powerful physical vectors of the classical victory figurine on raw textured paper.",
                                  img: "https://lh3.googleusercontent.com/d/1W095uL_vY_08JuYRbgNxMHKD82gXUriL"
                                },
                                {
                                  title: "Unified Semester Synthesis",
                                  medium: "Gouache & Charcoal Course Masterpiece",
                                  desc: "The comprehensive capstone drawing reflecting David Memorandum's holistic academic breakthroughs, combining negative space with dynamic values.",
                                  img: "https://lh3.googleusercontent.com/d/1M12OK5FIvutCZbivhbDjeEFJbk_J-Ni6"
                                }
                              ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center space-y-4">
                                  {/* Double Heavy Gilded Frame with Hanging Cord Simulation */}
                                  <div className="border-[14px] border-double border-[#A37424] outline outline-2 outline-amber-950 bg-stone-900 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative p-2 max-w-full hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                                    <div className="aspect-[4/5] w-64 overflow-hidden relative border border-stone-800">
                                      <img src={item.img} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover filter brightness-95 contrast-105" />
                                    </div>
                                  </div>
                                  {/* Brass Placard */}
                                  <div className="bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 border border-yellow-700 text-stone-950 text-[10px] font-mono uppercase font-black tracking-widest px-4 py-1.5 shadow-md text-center max-w-[220px]">
                                    <p className="truncate font-bold">{item.title}</p>
                                    <p className="text-[8px] opacity-75 font-serif italic font-normal tracking-tight">{item.medium}</p>
                                  </div>
                                  <p className="text-[11px] text-[#EAD5D5]/80 font-serif leading-relaxed italic text-center max-w-xs px-2 pt-1">
                                    "{item.desc}"
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Display Booth III: Videographic & Film Archives */}
                        {activeMuseumBooth === "booth-3" && (
                          <div className="space-y-8 animate-fadeIn relative z-10">
                            <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
                              <h4 className="font-serif text-xl font-bold uppercase tracking-wider text-yellow-500">The Multimedia Screenings</h4>
                              <p className="text-xs text-stone-400 font-serif leading-relaxed italic">
                                Cinematic film rolls, peer performance critiques, and active videographic studies.
                              </p>
                            </div>

                            <div className="max-w-3xl mx-auto space-y-8">
                              {/* Video item */}
                              <div className="flex flex-col items-center space-y-4">
                                <div className="border-[12px] border-double border-red-900/60 bg-stone-950 shadow-[0_25px_50px_rgba(0,0,0,0.8)] relative p-2 w-full max-w-2xl">
                                  <div className="relative aspect-[16/9] w-full bg-black overflow-hidden border border-yellow-500/20">
                                    <iframe
                                      src="https://drive.google.com/file/d/1N24k_Z7PuBPg3nlSyY50tJWw6e1AYwg7/preview"
                                      className="absolute inset-0 w-full h-full border-0"
                                      allow="autoplay; encrypted-media; fullscreen"
                                      allowFullScreen
                                      title="Cinematic Film Roll Video"
                                    ></iframe>
                                  </div>
                                </div>
                                <div className="bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 border border-yellow-700 text-stone-950 text-[10px] font-mono uppercase font-black tracking-widest px-5 py-2 shadow-lg text-center max-w-[320px]">
                                  <p className="font-bold">STUDY VIDEO: CINEMATIC EXHIBIT ROLL</p>
                                  <p className="text-[8px] opacity-75 font-serif italic font-normal tracking-tight">Active Curator Curation Film Study</p>
                                </div>
                                <p className="text-xs text-[#EAD5D5]/80 font-serif leading-relaxed italic text-center max-w-lg px-4 pt-1">
                                  "A critical examination of architectural contours, focusing on camera angles, ambient lighting, and capturing transient human pathways within neoclassical spaces."
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Inspiring quote at bottom of Museum Page */}
                    <div className="pt-6 mt-12 border-t border-dashed border-yellow-500/20 text-center max-w-2xl mx-auto space-y-2">
                      <p className="font-serif text-lg italic text-yellow-500/95 leading-relaxed">
                        "A museum is a spiritual sanctuary. Every portrait painted with feeling is a portrait of the artist, not of the sitter. Art washes away from the soul the dust of everyday life."
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#EAD5D5]/60 font-bold">
                        — Oscar Wilde & Pablo Picasso
                      </p>
                    </div>
                  </div>
                ) : activeTab === "journey" ? (
                  /* JOURNEY SECTOR VIEW */
                  <div className="space-y-12 bg-[#FAF2DF] border-4 border-[#C2AD8B] p-6 sm:p-10 shadow-2xl relative overflow-hidden text-stone-900 rounded-none">
                    
                    {/* SVG map visual overlay running across background of journey tab */}
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8F6B39" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#gridPattern)" />
                        
                        {/* Winding treasure map dotted lines */}
                        <path 
                          d="M 100 250 Q 250 100 500 300 T 900 150 T 1200 450" 
                          fill="none" 
                          stroke="#7C4E19" 
                          strokeWidth="3" 
                          strokeDasharray="12,10"
                        />
                        <path 
                          d="M 50 600 Q 300 450 600 700 T 1100 850" 
                          fill="none" 
                          stroke="#7C4E19" 
                          strokeWidth="2" 
                          strokeDasharray="8,6"
                        />
                        
                        {/* Circular compass dial watermark */}
                        <circle cx="85%" cy="20%" r="90" fill="none" stroke="#7C4E19" strokeWidth="1" strokeDasharray="4,4" />
                        <circle cx="85%" cy="20%" r="75" fill="none" stroke="#7C4E19" strokeWidth="1.5" />
                        <line x1="85%" y1="10%" x2="85%" y2="30%" stroke="#7C4E19" strokeWidth="1.5" />
                        <line x1="75%" y1="20%" x2="95%" y2="20%" stroke="#7C4E19" strokeWidth="1.5" />
                      </svg>
                    </div>

                    {/* Progression Timeline Map */}
                    <div className="bg-[#FFFDFC]/80 border-2 border-[#D2C0A5] p-6 shadow-md space-y-6 relative z-10 backdrop-blur-xs">
                      <div className="border-b pb-3 border-amber-800/10">
                        <span className="text-[9px] font-mono text-amber-800 font-bold uppercase tracking-[0.2em] block">
                          🧭 SEMESTER MILESTONES & EXPEDITIONS
                        </span>
                        <h4 className="font-serif text-2xl font-bold italic text-amber-950 mt-1">
                          The Curation Trail Progression Map
                        </h4>
                        <p className="text-xs text-stone-700 mt-1 leading-relaxed max-w-2xl">
                          Witness the evolutionary growth curves throughout the term, charting progressive checkpoints from initial conceptualization to formal masterwork critiques.
                        </p>
                      </div>

                      {/* Interactive Visual Timeline line */}
                      <div className="relative pt-2 pb-6 px-4">
                        <div className="absolute top-1/2 left-4 right-4 h-1 bg-[#D8C09D] -translate-y-1/2 z-0 hidden sm:block" />
                        
                        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[
                            { step: "01", name: "Inception & Drafts", date: "Sep 2026", desc: "First outlines & charcoal notes", current: true },
                            { step: "02", name: "Midterm Portfolios", date: "Oct 2026", desc: "Studies & material selections", current: false },
                            { step: "03", name: "Review Critiques", date: "Nov 2026", desc: "Interactive grading feedback", current: false },
                            { step: "04", name: "Final Presentation", date: "Dec 2026", desc: "Masterwork completion", current: false }
                          ].map((node, nidx) => (
                            <div key={nidx} className="flex flex-col items-center text-center space-y-2">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all ${
                                node.current 
                                  ? "bg-amber-800 text-[#FAF2DF] border-amber-950 scale-110 shadow-md ring-4 ring-amber-200/50" 
                                  : "bg-white text-stone-500 border-[#D2C0A5] hover:border-amber-800"
                              }`}>
                                {node.step}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-amber-950">{node.name}</p>
                                <p className="text-[10px] text-stone-600 font-mono">{node.date}</p>
                                <p className="text-[10px] text-stone-500 mt-0.5 leading-normal max-w-[120px] mx-auto hidden sm:block">{node.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Portfolio Studies Grid with the 6 requested embedded files */}
                    <div className="space-y-8 relative z-10">
                      <div className="border-b pb-3 border-[#D2C0A5]">
                        <h3 className="font-serif text-3xl font-black italic text-amber-950 flex items-center gap-2">
                          <Compass className="w-6 h-6 text-amber-800 animate-spin" style={{ animationDuration: '15s' }} />
                          Thematic Progress Portfolios
                        </h3>
                        <p className="text-xs font-mono text-stone-600 uppercase mt-1 tracking-wider">
                          Official Direct Embedded Academic Files styled as raw parchment journal entries
                        </p>
                      </div>

                      {/* Map markings indicating start and end points */}
                      <div className="flex justify-between items-center px-4 py-2 bg-[#FFFDFC]/40 border border-[#D2C0A5]/40 text-xs font-mono text-amber-900 tracking-wide">
                        <span className="flex items-center gap-1.5 font-bold">
                          📍 [POINT OF INITIATION: SEPIA DRAFTS START]
                        </span>
                        <div className="h-0.5 flex-1 mx-4 border-t border-dashed border-[#C8B088]" />
                        <span className="flex items-center gap-1.5 font-bold text-red-700">
                          🎯 [X MARKS THE SPOT: DEC 2026 FINAL SYNTHESIS]
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                          {
                            title: "Expedition Study Document 1",
                            desc: "Inception blueprint and developmental progress report.",
                            url: "https://drive.google.com/file/d/1h86-EtQoaWWzCWWQ-NMZ82hxQBuF2dXZ/preview"
                          },
                          {
                            title: "Academic Research Essay 2",
                            desc: "Comprehensive stylistic comparison and artistic literature survey.",
                            url: "https://drive.google.com/file/d/1NxNdSv1VA5BSsif0-F3GnGVnjOtLcmup/preview"
                          },
                          {
                            title: "Material Exploration Analysis 3",
                            desc: "Evaluating charcoal pigments, beeswax bindery, and void weights.",
                            url: "https://drive.google.com/file/d/12af1niuoCG8c5C4sZSMMi2CzJEPqbvGO/preview"
                          },
                          {
                            title: "Curatorial Curation Notes 4",
                            desc: "Official semester notes, portfolio feedback, and progress outlines.",
                            url: "https://drive.google.com/file/d/1coO28vWMlzretMqg36K7KPI5kA52lbET/preview"
                          },
                          {
                            title: "Creative Concept Blueprint 5",
                            desc: "Visual sketches, timeline maps, and creative development files.",
                            url: "https://drive.google.com/file/d/14XTjACYk8nahaasLjsjHWlmLTBf1A-Et/preview"
                          },
                          {
                            title: "Final Expedition Synthesis 6",
                            desc: "Unified course summary, critical reflections, and final milestones.",
                            url: "https://drive.google.com/file/d/1owIe-cOrT6cvSfo6kW6nIAFiW8x6C45g/preview"
                          }
                        ].map((file, fidx) => {
                          // Alternating rotations to resemble scattered maps
                          const rotations = ["-rotate-1", "rotate-1", "rotate-0.5", "-rotate-0.5", "rotate-1.5", "-rotate-1"];
                          const currentRotation = rotations[fidx % rotations.length];
                          
                          return (
                            <div 
                              key={fidx} 
                              className={`bg-[#FDFBF7] border-2 border-[#C0AF95] p-5 shadow-[0_8px_16px_rgba(40,30,20,0.12)] space-y-4 flex flex-col justify-between transform ${currentRotation} transition-all hover:rotate-0 hover:scale-[1.02] duration-300 relative`}
                              style={{
                                backgroundImage: "linear-gradient(#f7eed3 1px, transparent 1px)",
                                backgroundSize: "100% 24px"
                              }}
                            >
                              {/* Overlay wax seal accent */}
                              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-800/80 border border-red-950 flex items-center justify-center font-serif text-[10px] text-yellow-100 font-bold select-none opacity-80 shadow-xs">
                                🪶
                              </div>

                              <div className="space-y-2 relative z-10 pt-2">
                                <span className="text-[9px] font-mono text-amber-800 font-bold uppercase tracking-widest block">
                                  STUDY ARTIFACT 0{fidx + 1}
                                </span>
                                <h4 className="font-serif text-lg font-bold text-amber-950 italic leading-tight">
                                  {file.title}
                                </h4>
                                <p className="text-xs text-stone-700 font-serif leading-relaxed h-12 overflow-hidden line-clamp-3">
                                  {file.desc}
                                </p>
                              </div>

                              {/* Embedded Document iframe */}
                              <div className="aspect-[4/5] bg-stone-100 border-2 border-stone-300/60 overflow-hidden relative shadow-inner">
                                <iframe
                                  src={file.url}
                                  className="absolute inset-0 w-full h-full border-0"
                                  allow="autoplay"
                                  title={file.title}
                                ></iframe>
                              </div>

                              {/* Direct button to open file */}
                              <a
                                href={file.url.replace('/preview', '/view')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center bg-amber-900 hover:bg-amber-950 text-[#FAF2DF] font-mono text-[10px] uppercase font-bold tracking-widest py-2 border border-amber-950 transition-all flex items-center justify-center gap-1.5 relative z-10"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                Review Full GDrive File
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inspiring quote at bottom of Journey Page */}
                    <div className="pt-6 mt-12 border-t border-dashed border-amber-800/20 text-center max-w-2xl mx-auto space-y-2 relative z-10">
                      <p className="font-serif text-lg italic text-amber-950/90 leading-relaxed">
                        "It is good to have an end to journey toward; but it is the journey that matters, in the end. The only journey is the one within."
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-amber-800/80 font-bold">
                        — Ursula K. Le Guin & Rainer Maria Rilke
                      </p>
                    </div>
                  </div>
                ) : activeTab === "reflection" ? (
                  /* REFLECTION SECTOR VIEW */
                  <div className="space-y-12 animate-fadeIn">
                    {/* Academic Desk Header */}
                    <div className="bg-[#FAF8F6] border-2 border-stone-800/20 p-6 sm:p-8 space-y-4">
                      <div className="flex items-center gap-2 text-stone-500 border-b border-stone-200 pb-2">
                        <BookOpen className="w-4 h-4 text-stone-800 animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Academic Synthesis & Peer Critique</span>
                      </div>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 leading-tight">
                        Course Summary & Reflection Presentation
                      </h2>
                      <p className="text-sm font-light text-stone-600 leading-relaxed max-w-3xl font-serif italic">
                        In this terminal reflection space, we review the structured course syllabi, evaluate collaborative peer presentations, and summarize the creative processes explored throughout the academic semester.
                      </p>
                    </div>

                    {/* Interactive Slide Deck and Image backup */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-stone-800/20 gap-3">
                        <div>
                          <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-widest block">
                            🖼️ INTERACTIVE PORTFOLIO GALLERY
                          </span>
                          <h4 className="font-serif text-2xl font-bold italic text-stone-100 mt-1">
                            Curatorial Sketchbook & Slide Review
                          </h4>
                        </div>
                        
                        <div className="text-[10px] font-mono text-stone-400">
                          Use <kbd className="px-1.5 py-0.5 bg-stone-800 border border-stone-700 text-stone-300 rounded text-[9px]">◀</kbd> and <kbd className="px-1.5 py-0.5 bg-stone-800 border border-stone-700 text-stone-300 rounded text-[9px]">▶</kbd> buttons to change files
                        </div>
                      </div>

                      <div className="bg-[#1C1917] border-4 border-stone-800 p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                        {/* Image slider displaying the 6 Google Drive sketches */}
                        <div className="w-full md:w-3/5 aspect-[4/3] bg-stone-950 border border-stone-800 overflow-hidden relative flex items-center justify-center group">
                          
                          {/* Left Navigation Overlay Arrow */}
                          <button
                            onClick={() => setActiveReflectionSlide((prev) => (prev > 0 ? prev - 1 : 5))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-950/70 border border-stone-800 text-yellow-400 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all z-20 opacity-80 group-hover:opacity-100"
                            title="Previous Image"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>

                          {/* Right Navigation Overlay Arrow */}
                          <button
                            onClick={() => setActiveReflectionSlide((prev) => (prev < 5 ? prev + 1 : 0))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-950/70 border border-stone-800 text-yellow-400 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all z-20 opacity-80 group-hover:opacity-100"
                            title="Next Image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>

                          <img
                            src={[
                              "https://lh3.googleusercontent.com/d/1h86-EtQoaWWzCWWQ-NMZ82hxQBuF2dXZ",
                              "https://lh3.googleusercontent.com/d/1NxNdSv1VA5BSsif0-F3GnGVnjOtLcmup",
                              "https://lh3.googleusercontent.com/d/12af1niuoCG8c5C4sZSMMi2CzJEPqbvGO",
                              "https://lh3.googleusercontent.com/d/1coO28vWMlzretMqg36K7KPI5kA52lbET",
                              "https://lh3.googleusercontent.com/d/14XTjACYk8nahaasLjsjHWlmLTBf1A-Et",
                              "https://lh3.googleusercontent.com/d/1owIe-cOrT6cvSfo6kW6nIAFiW8x6C45g"
                            ][activeReflectionSlide]}
                            alt={`Reflection Slide ${activeReflectionSlide + 1}`}
                            className="max-h-full max-w-full object-contain filter contrast-105 select-none transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Slide Counter Indicator badge */}
                          <div className="absolute top-3 left-3 bg-stone-950/80 text-yellow-400 border border-stone-800 text-[9px] font-mono px-2 py-1 tracking-widest">
                            FILE {activeReflectionSlide + 1} OF 6
                          </div>
                        </div>

                        {/* Navigation Controls and Details */}
                        <div className="w-full md:w-2/5 space-y-4">
                          <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-black block">
                            CURATORIAL SPECIFICATION
                          </span>
                          
                          <h5 className="font-serif text-lg font-bold text-stone-100">
                            {[
                              "Semester Blueprint & Core Layout",
                              "Human Form and Musculature Study",
                              "Classical Proportional Harmony",
                              "Abstract Charcoal & Inkwash Tones",
                              "Asymmetry and Nature Composition",
                              "Holistic Creative Capstone Synthesis"
                            ][activeReflectionSlide]}
                          </h5>

                          <p className="text-xs text-stone-300 font-serif italic leading-relaxed">
                            {[
                              "A detailed curatorial blueprint mapping the structural geometry, golden ratios, and academic frameworks explored during the initial portion of the semester.",
                              "An anatomically disciplined drawing capturing bodily proportion, lighting focus, and tactile graphite line rendering.",
                              "A delicate study exploring high-contrast values, ancient architectural replica references, and vector curvatures.",
                              "A bold composition investigating organic black carbon dust, wet-brushed deep inks, and negative spaces.",
                              "An arrangement testing natural asymmetry, visual pauses, and structural balance within traditional borders.",
                              "The capstone presentation reflecting David Memorandum's unified course breakthroughs, personal reflections, and final milestone achievements."
                            ][activeReflectionSlide]}
                          </p>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => setActiveReflectionSlide((prev) => (prev > 0 ? prev - 1 : 5))}
                              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1"
                            >
                              <ChevronLeft className="w-3 h-3 text-yellow-400" /> PREVIOUS
                            </button>
                            <button
                              onClick={() => setActiveReflectionSlide((prev) => (prev < 5 ? prev + 1 : 0))}
                              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1"
                            >
                              NEXT <ChevronRight className="w-3 h-3 text-yellow-400" />
                            </button>
                          </div>

                          <div className="grid grid-cols-6 gap-1 pt-1.5">
                            {[0, 1, 2, 3, 4, 5].map((idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveReflectionSlide(idx)}
                                className={`h-1 transition-all ${
                                  activeReflectionSlide === idx ? "bg-yellow-400 animate-pulse" : "bg-stone-800 hover:bg-stone-600"
                                }`}
                                title={`Slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Video Screening and Critique Log */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-dashed border-stone-300">
                      
                      {/* Video player screen */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="border-b pb-2 border-stone-800/10">
                          <span className="text-[9px] font-mono text-stone-500 font-bold uppercase tracking-widest block">
                            🎥 INTERACTIVE SCREENING ARTIFACT
                          </span>
                          <h4 className="font-serif text-xl font-bold italic text-stone-900 mt-0.5">
                            Peer Presentation Video Study
                          </h4>
                        </div>

                        <div className="relative aspect-[16/9] w-full bg-stone-950 border-2 border-stone-800 shadow-md overflow-hidden p-1">
                          <iframe
                            src="https://drive.google.com/file/d/1N24k_Z7PuBPg3nlSyY50tJWw6e1AYwg7/preview"
                            className="w-full h-full border-0"
                            allowFullScreen
                            title="Reflection Interactive Video Presentation"
                          ></iframe>
                        </div>
                      </div>

                      {/* Interactive Notebook Log */}
                      <div className="lg:col-span-5 bg-[#FCFBF9] border border-stone-300/80 p-5 space-y-4 text-stone-800 shadow-sm">
                        <h4 className="font-serif text-lg font-bold text-stone-900 italic border-b pb-2 flex items-center gap-2">
                          <Award className="w-5 h-5 text-stone-800" />
                          Curator Feedback Journal
                        </h4>
                        
                        <div className="space-y-3 font-serif text-xs leading-relaxed text-stone-600">
                          <p>
                            While reviewing the PPT slides and watching the course summary video, log your observations below to compile an interactive critique report.
                          </p>
                          <div className="space-y-2.5">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold">1. Key Curatorial Takeaway</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Synthesizing physical boundaries with digital voids" 
                                className="w-full px-3 py-1.5 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-800 bg-white text-xs font-serif"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold">2. Critical Materiality Evaluation</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Traditional oils retain deep texture compared to pixel mediums" 
                                className="w-full px-3 py-1.5 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-800 bg-white text-xs font-serif"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => alert("Reflection Log Saved! You have successfully submitted your lecture log.")}
                              className="w-full bg-stone-900 hover:bg-stone-950 text-[#FAF8F6] text-[10px] font-mono tracking-widest uppercase font-bold py-2 border border-stone-950 shadow-sm transition-all"
                            >
                              💾 COMPILE CRITIQUE REPORT
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Academic Footer */}
                    <div className="pt-6 border-t border-stone-200 text-center text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">
                      🎓 mapúa university course timeline archives • fall 2026
                    </div>
                  </div>
                ) : activeTab === "theater" ? (
                  /* THEATER SECTOR VIEW */
                  <div className="space-y-12 animate-fadeIn relative z-10 text-stone-100 bg-[#0B0304] border-4 border-red-950 p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[600px]">
                    
                    {/* Stage background styling elements */}
                    <div className="absolute top-0 inset-x-0 h-48 bg-[linear-gradient(180deg,_rgba(127,29,29,0.15)_0%,_transparent_100%)] pointer-events-none" />
                    
                    {/* Theatrical Header */}
                    <div className="relative border-b pb-4 border-red-900/30 text-center max-w-2xl mx-auto space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-yellow-500/20 text-[9px] font-mono uppercase bg-stone-950 text-yellow-500 font-bold tracking-widest mx-auto">
                        🎭 THE CHANDELIER STAGE • LIVE EXPERIENCE
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-yellow-500 tracking-tight leading-none italic">
                        The Center Stage Theater
                      </h2>
                      <p className="text-xs font-serif leading-relaxed text-[#D2C2C2]/80">
                        Experience the premiere of Paquita. Use the master board below to open/close the velvet stage curtains, adjust the overhead physical light canisters, and cue the crowd applause.
                      </p>
                      
                      {/* Master control board */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                        <button
                          onClick={() => setCurtainsOpen(!curtainsOpen)}
                          className={`px-4 py-2 border font-mono text-[9px] uppercase tracking-widest font-black transition-all shadow-md ${
                            curtainsOpen 
                              ? "bg-[#60121E] hover:bg-[#801B2B] text-yellow-400 border-red-500/30" 
                              : "bg-emerald-900 hover:bg-emerald-800 text-white border-emerald-500/30 animate-pulse"
                          }`}
                        >
                          {curtainsOpen ? "🏮 CLOSE STAGE CURTAINS" : "🎭 OPEN STAGE CURTAINS"}
                        </button>

                        <button
                          onClick={() => setTheaterSpotlight(!theaterSpotlight)}
                          className="px-4 py-2 bg-[#400B13] hover:bg-[#60121E] border border-red-500/30 text-yellow-500 font-mono text-[9px] uppercase tracking-widest font-black transition-all shadow-md"
                        >
                          {theaterSpotlight ? "🔦 TURN OFF SPOTLIGHTS" : "💡 TURN ON SPOTLIGHTS"}
                        </button>

                        <button
                          onClick={handlePlayApplause}
                          disabled={isApplausePlaying}
                          className={`px-4 py-2 border font-mono text-[9px] uppercase tracking-widest font-black transition-all shadow-md flex items-center gap-2 ${
                            isApplausePlaying 
                              ? "bg-amber-600 text-stone-950 border-yellow-400 cursor-not-allowed" 
                              : "bg-yellow-500 hover:bg-yellow-600 text-stone-950 border-yellow-600"
                          }`}
                        >
                          <span>👏</span>
                          {isApplausePlaying ? "CHEERING PLAYING (5s)..." : "TRIGGER APPLAUSE & CHEERING"}
                        </button>
                      </div>

                      {isApplausePlaying && (
                        <div className="text-[10px] text-yellow-400 font-mono tracking-widest uppercase animate-pulse pt-2 flex items-center justify-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                          🔊 Audience is roaring! Cheering, clapping and shouting "Bravo!"
                        </div>
                      )}
                    </div>

                    {/* PHYSICAL OVERHEAD STAGE LIGHTS RIG */}
                    <div className="max-w-4xl mx-auto flex justify-around items-end h-12 border-b-2 border-[#1E0407] bg-[#120305] px-12 relative">
                      <div className="absolute top-0 inset-x-0 h-1 bg-[#2C0A0E]" />
                      
                      {/* Light Canister 1 */}
                      <div className="flex flex-col items-center relative w-12">
                        <div className="w-1 h-3 bg-stone-700" /> {/* Support bracket */}
                        <div className={`w-6 h-5 bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700 rounded-b-md shadow-md transform -rotate-12 transition-all duration-500 ${theaterSpotlight ? "border-yellow-500/80" : ""}`}>
                          {/* Bulb light lens */}
                          <div className={`mx-auto mt-2.5 w-3.5 h-1 rounded-full transition-all duration-500 ${theaterSpotlight ? "bg-yellow-300 shadow-[0_0_12px_#F59E0B]" : "bg-stone-950"}`} />
                        </div>
                      </div>

                      {/* Light Canister 2 (Center) */}
                      <div className="flex flex-col items-center relative w-12">
                        <div className="w-1 h-3 bg-stone-700" />
                        <div className={`w-6 h-5 bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700 rounded-b-md shadow-md transition-all duration-500 ${theaterSpotlight ? "border-yellow-500/80" : ""}`}>
                          <div className={`mx-auto mt-2.5 w-3.5 h-1 rounded-full transition-all duration-500 ${theaterSpotlight ? "bg-yellow-300 shadow-[0_0_12px_#F59E0B]" : "bg-stone-950"}`} />
                        </div>
                      </div>

                      {/* Light Canister 3 */}
                      <div className="flex flex-col items-center relative w-12">
                        <div className="w-1 h-3 bg-stone-700" />
                        <div className={`w-6 h-5 bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700 rounded-b-md shadow-md transform rotate-12 transition-all duration-500 ${theaterSpotlight ? "border-yellow-500/80" : ""}`}>
                          <div className={`mx-auto mt-2.5 w-3.5 h-1 rounded-full transition-all duration-500 ${theaterSpotlight ? "bg-yellow-300 shadow-[0_0_12px_#F59E0B]" : "bg-stone-950"}`} />
                        </div>
                      </div>
                    </div>

                    {/* Center Stage Presentation Container with Overlay Curtains */}
                    <div className="max-w-4xl mx-auto relative bg-[#040102] border-4 border-[#3D0B12] shadow-[0_25px_50px_rgba(0,0,0,0.95)] overflow-hidden min-h-[460px]">
                      
                      {/* Realistic overhead drapery trim */}
                      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#7F1D1D] to-[#3B0712] border-b-2 border-yellow-600/30 shadow-md z-40 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,_transparent,_transparent_8px,_rgba(0,0,0,0.25)_8px,_rgba(0,0,0,0.25)_16px)] opacity-30" />
                        <div className="w-full h-1 bg-[radial-gradient(ellipse_at_center,_#EAB308_0%,_transparent_70%)] opacity-80" />
                        <span className="text-[7px] font-mono tracking-[0.3em] text-yellow-500/80 uppercase font-black z-10">THE CHANDELIER SECTOR</span>
                      </div>

                      {/* STAGE SPACE CONTAINER */}
                      <div className="relative w-full h-[410px] bg-[#070102] flex flex-col items-center justify-center overflow-hidden">
                        
                         {/* High-performance CSS animation styles injected directly */}
                         <style>{`
                           @keyframes stage-confetti-physics {
                             0% {
                               transform: translate3d(0, 0, 0) rotate(0deg);
                               opacity: 1;
                             }
                             35% {
                               transform: translate3d(calc(var(--x-dist) * 0.45), var(--y-dist), 0) rotate(calc(var(--rot-end) * 0.35));
                               opacity: 1;
                             }
                             80% {
                               opacity: 0.95;
                             }
                             100% {
                               transform: translate3d(var(--x-dist), calc(var(--y-dist) + 380px), 0) rotate(var(--rot-end));
                               opacity: 0;
                             }
                           }
                           .animate-confetti-run {
                             animation: stage-confetti-physics var(--duration) cubic-bezier(0.1, 0.7, 0.4, 1) var(--delay) forwards;
                           }
                         `}</style>

                         {/* Confetti particles */}
                         {stageConfetti.map((particle) => (
                           <div
                             key={particle.id}
                             className="absolute pointer-events-none rounded-sm z-20 shadow-sm animate-confetti-run"
                             style={{
                               left: particle.side === "left" ? "5%" : "95%",
                               top: "92%",
                               width: `${particle.size}px`,
                               height: `${particle.size * 0.6}px`,
                               backgroundColor: particle.color,
                               // Set custom CSS variables for keyframe animations
                               "--x-dist": `${particle.xDist}px`,
                               "--y-dist": `${particle.yDist}px`,
                               "--rot-end": `${particle.rotEnd}deg`,
                               "--duration": `${particle.duration}s`,
                               "--delay": `${particle.delay}s`,
                             } as any}
                           />
                         ))}

                        {/* Realistic Spotlight Beams projecting from overhead canisters */}
                        {theaterSpotlight && (
                          <>
                            {/* Spotlight Left beam */}
                            <div 
                              className="absolute top-0 left-[15%] w-[40%] h-full pointer-events-none z-10 mix-blend-screen opacity-70 transition-all duration-1000 origin-top"
                              style={{
                                clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                background: "linear-gradient(to bottom, rgba(253, 224, 71, 0.18) 0%, rgba(253, 224, 71, 0.04) 60%, transparent 100%)"
                              }}
                            />
                            {/* Spotlight Center beam */}
                            <div 
                              className="absolute top-0 left-[30%] w-[40%] h-full pointer-events-none z-10 mix-blend-screen opacity-80 transition-all duration-1000 origin-top animate-pulse"
                              style={{
                                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                background: "linear-gradient(to bottom, rgba(253, 224, 71, 0.22) 0%, rgba(253, 224, 71, 0.05) 50%, transparent 100%)"
                              }}
                            />
                            {/* Spotlight Right beam */}
                            <div 
                              className="absolute top-0 right-[15%] w-[40%] h-full pointer-events-none z-10 mix-blend-screen opacity-70 transition-all duration-1000 origin-top"
                              style={{
                                clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                background: "linear-gradient(to bottom, rgba(253, 224, 71, 0.18) 0%, rgba(253, 224, 71, 0.04) 60%, transparent 100%)"
                              }}
                            />
                          </>
                        )}

                        {/* Interactive Performance Video Screen Frame */}
                        <div className="relative z-10 max-w-md w-full transition-all duration-700 px-4">
                          {/* Photo Frame Container styled like a heavy wooden stage monitor */}
                          <div className="border-[12px] border-double border-[#A37424] outline outline-2 outline-[#1E0407] bg-stone-900 shadow-[0_20px_45px_rgba(0,0,0,0.95)] p-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5 pointer-events-none" />
                            <div className="aspect-[16/10] w-full overflow-hidden bg-black border border-[#250408]">
                              <iframe
                                src="https://drive.google.com/file/d/1moPl3pl6A3cjzP5-SlG62mzpe-adQBa0/preview"
                                className="w-full h-full border-0 filter brightness-105 saturate-100 font-sans"
                                allow="autoplay"
                                title="Center Stage Theater Performance"
                              ></iframe>
                            </div>
                          </div>
                        </div>

                        {/* Traditional Stage Floor Boards */}
                        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-b from-[#2E0F14] to-[#0A0203] border-t-2 border-yellow-600/30 z-10">
                          {/* Board planks lines */}
                          <div className="w-full h-full bg-[linear-gradient(90deg,_rgba(0,0,0,0.3)_1px,_transparent_1px)] bg-[size:24px_100%] opacity-50" />
                          {/* Footlights reflection overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-500/5 to-yellow-500/10 pointer-events-none mix-blend-overlay" />
                        </div>

                        {/* LEFT ABSOLUTE VELVET CURTAIN OVERLAY */}
                        <div 
                          className={`absolute top-8 bottom-0 left-0 bg-gradient-to-r from-[#180204] via-[#5C0D18] to-[#2E050A] border-r-4 border-yellow-500/50 shadow-2xl z-30 transition-all duration-1000 ease-in-out select-none flex flex-col justify-between p-4 ${
                            curtainsOpen ? "w-0 -translate-x-full opacity-0 pointer-events-none" : "w-1/2 translate-x-0 opacity-100"
                          }`}
                        >
                          {/* Drape folding vertical pleat ridges */}
                          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,_transparent,_transparent_8px,_rgba(0,0,0,0.35)_8px,_rgba(0,0,0,0.35)_16px)] opacity-60 pointer-events-none" />
                          <div className="absolute inset-y-0 right-1 w-0.5 bg-gradient-to-b from-yellow-400 via-transparent to-yellow-400 opacity-60" />
                          <div className="relative z-10 mt-6 space-y-1">
                            <span className="text-[10px] font-mono text-yellow-500/80 font-black tracking-widest block uppercase text-center font-bold">PAQUITA</span>
                            <span className="text-[8px] font-mono text-yellow-600/60 font-medium tracking-wide block text-center">PREMIERE BALLET</span>
                          </div>
                          
                          {/* Golden tassel cord drape details */}
                          <div className="relative z-10 mx-auto w-10 h-10 rounded-full border border-yellow-500/30 bg-[#120305] flex items-center justify-center text-xs text-yellow-400 shadow-lg cursor-pointer hover:scale-110 transition-transform" onClick={() => setCurtainsOpen(true)}>
                            🏮
                          </div>

                          <div className="relative z-10 mb-6 text-center text-[8px] font-mono text-yellow-600/60 tracking-widest">
                            ★ ACTE I ★
                          </div>
                        </div>

                        {/* RIGHT ABSOLUTE VELVET CURTAIN OVERLAY */}
                        <div 
                          className={`absolute top-8 bottom-0 right-0 bg-gradient-to-l from-[#180204] via-[#5C0D18] to-[#2E050A] border-l-4 border-yellow-500/50 shadow-2xl z-30 transition-all duration-1000 ease-in-out select-none flex flex-col justify-between p-4 ${
                            curtainsOpen ? "w-0 translate-x-full opacity-0 pointer-events-none" : "w-1/2 translate-x-0 opacity-100"
                          }`}
                        >
                          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,_transparent,_transparent_8px,_rgba(0,0,0,0.35)_8px,_rgba(0,0,0,0.35)_16px)] opacity-60 pointer-events-none" />
                          <div className="absolute inset-y-0 left-1 w-0.5 bg-gradient-to-b from-yellow-400 via-transparent to-yellow-400 opacity-60" />
                          <div className="relative z-10 mt-6 space-y-1">
                            <span className="text-[10px] font-mono text-yellow-500/80 font-black tracking-widest block uppercase text-center font-bold font-bold">MAPÚA HALL</span>
                            <span className="text-[8px] font-mono text-yellow-600/60 font-medium tracking-wide block text-center">CHOREOGRAPHY STUDY</span>
                          </div>

                          {/* Dynamic helper text to click to open */}
                          {!curtainsOpen && (
                            <button 
                              onClick={() => setCurtainsOpen(true)}
                              className="relative z-10 bg-yellow-500/90 hover:bg-yellow-400 text-stone-950 font-mono text-[8px] uppercase tracking-widest font-black py-1 px-2 mx-auto shadow-md transition-all animate-bounce rounded-xs"
                            >
                              OPEN CURTAINS
                            </button>
                          )}

                          <div className="relative z-10 mb-6 text-center text-[8px] font-mono text-yellow-600/60 tracking-widest">
                            ★ MCXXVI ★
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* REDISCOVERING THE MAGIC: THE USER'S WORDS REFLECTIVE PLAQUE */}
                    <div className="bg-[#160608] border-4 border-double border-red-900/50 p-8 sm:p-10 space-y-6 max-w-3xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(234,179,8,0.04)_0%,_transparent_70%)] pointer-events-none" />
                      
                      {/* Gilded brass plate screws */}
                      <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-yellow-600/40 border border-yellow-700/60" />
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-yellow-600/40 border border-yellow-700/60" />
                      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-yellow-600/40 border border-yellow-700/60" />
                      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-yellow-600/40 border border-yellow-700/60" />

                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-stone-950 text-[9px] font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-sm border border-yellow-600 shadow-md">
                        🏆 THEATRE PREMIERE MEMOIR
                      </div>
                      
                      <div className="space-y-6 pt-2 text-center relative z-10">
                        <h4 className="font-serif text-2xl font-black italic text-yellow-500 tracking-normal leading-tight">
                          "Rediscovering the Magic: How Paquita Reignited My Love for the Stage"
                        </h4>
                        
                        <div className="space-y-4 font-serif text-[13px] leading-relaxed text-[#F3E2E2] max-w-2xl mx-auto text-justify indent-8">
                          <p>
                            Stepping into the theater for the premiere of Paquita, I didn’t quite know what to expect. The last time I had witnessed a live theater show was back in 2018, and years of screens had made the memory of the stage fade into something abstract. But as the lights began to dim and the first notes of the orchestra swelled, a wave of anticipation washed over me.
                          </p>
                          <p>
                            The performance was nothing short of spellbinding. The dancers moved with a seamless blend of power and grace, their every leap and turn carrying a physical weight that no digital recording could ever fully capture. What struck me most was the raw, unedited energy of the live performance—the sound of pointe shoes hitting the stage, the collective intake of breath from the audience, and the vibrant play of light on the velvet curtains.
                          </p>
                          <p>
                            Paquita didn’t just entertain me; it reminded me of the irreplaceable magic of physical space and human presence. This theatrical study and my creative portfolio are a direct tribute to that rediscovery—a journey of bringing the weight, color, and poetry of the stage back into my active daily life.
                          </p>
                        </div>
                      </div>

                      {/* Interactive Director prompt response logger */}
                      <div className="pt-6 border-t border-red-900/40 font-serif text-xs text-[#EAD5D5]/80 space-y-3.5 max-w-md mx-auto">
                        <div className="space-y-2">
                          <label className="block text-[9px] font-mono text-yellow-600 uppercase tracking-widest font-black text-center">
                            Record Your Theatrical Review:
                          </label>
                          <textarea 
                            rows={2} 
                            placeholder="Add your own review or thoughts on the Paquita memoir..."
                            className="w-full px-3 py-2 bg-[#0A0203] border border-red-900/40 focus:outline-none focus:ring-1 focus:ring-yellow-500/40 text-[#FAF2DF] text-xs font-serif italic"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => alert("Theatrical Review Logged! Your analysis of the Paquita premiere is permanently recorded.")}
                          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-950 font-mono text-[9px] uppercase font-black tracking-widest border border-yellow-600 shadow-md transition-all rounded-xs font-bold"
                        >
                          📌 SUBMIT ENTRY TO ARCHIVE
                        </button>
                      </div>
                    </div>

                    {/* Stage Footnotes */}
                    <div className="text-center text-[9px] font-mono text-[#D2C2C2]/40 uppercase tracking-[0.2em]">
                      CURATED BY THE BALLET ACADEMY DESIGN GROUP • MCXXVI
                    </div>
                  </div>
                ) : null
              )}
            </motion.div>
          )}

          {/* EXPRESSIVE PAINTBOX ADVISOR PAGE */}
          {activeTab === "paintbox" && (
            <motion.div
              key="paintbox"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-[#1E0E10] border-2 border-yellow-500/30 p-6 sm:p-8 text-[#EAD5D5] shadow-[6px_6px_0px_0px_#8B5E1A] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.15)_0%,_transparent_70%)] pointer-events-none" />
                <div className="space-y-3 max-w-3xl relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-yellow-500/20 text-[10px] font-mono uppercase bg-[#120608] text-yellow-500 font-bold tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                    Expressive Art Lab
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-yellow-500">
                    The Expressive Paintbox Advisor
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-[#D2C2C2]">
                    Struggling to translate complex emotions onto the canvas? Share your current state of mind with our Expressive Art Advisor. Using chromatic psychology, material science, and art history, the engine will formulate a customized technical style recipe, curated color swatches, recommended implements, and brushwork prompts to unlock your creative blocks.
                  </p>
                </div>
              </div>

              {/* Input Form & Generator */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Advisor form */}
                <div className="lg:col-span-5 bg-[#FCF9F5] p-6 border-2 border-amber-800/20 shadow-[4px_4px_0px_0px_#FAF3E8] space-y-4 text-stone-800">
                  <h3 className="font-serif text-2xl font-black text-amber-950 italic flex items-center gap-2 border-b border-amber-800/10 pb-2">
                    <Activity className="w-5 h-5 text-amber-800" />
                    Emotional Palette Advisor
                  </h3>
                  
                  <form onSubmit={handleGenerateRecipe} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1.5 font-bold tracking-wider">
                        Describe Your Current Emotion / State of Mind
                      </label>
                      <textarea
                        value={userEmotionInput}
                        onChange={(e) => setUserEmotionInput(e.target.value)}
                        placeholder="e.g., 'Exhausted but determined to finish finals', 'A quiet sort of peace on a Sunday afternoon', 'Furious and energetic', 'Nostalgic for childhood days'..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-none border border-amber-800/30 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800 bg-white text-stone-900 shadow-inner placeholder-stone-400 font-serif italic"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGeneratingRecipe || !userEmotionInput.trim()}
                      className="w-full flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-950 disabled:bg-stone-300 text-white text-xs font-mono tracking-widest uppercase py-3 border border-amber-900 shadow transition-all active:scale-98"
                    >
                      {isGeneratingRecipe ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          MIXING MOOD RECIPE...
                        </>
                      ) : (
                        <>
                          <Palette className="w-4 h-4" />
                          FORMULATE RECIPE
                        </>
                      )}
                    </button>
                  </form>

                  {/* Suggestion tags to click */}
                  <div className="space-y-2 pt-2 border-t border-dashed border-amber-800/10">
                    <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">Preset Moods to Try:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Overwhelmed & Cluttered", "Serene Contentment", "Electric Anticipation", "Nostalgic Melancholy", "Calm Focus"].map((mood) => (
                        <button
                          key={mood}
                          type="button"
                          onClick={() => setUserEmotionInput(mood)}
                          className="bg-white hover:bg-amber-100 text-stone-800 text-[10px] font-mono uppercase tracking-tight px-2.5 py-1.5 border border-stone-300 transition-colors shadow-sm"
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recipe Results Output */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    {isGeneratingRecipe && (
                      <motion.div
                        key="loading-recipe"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white border-2 border-dashed border-amber-800/30 p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 h-80"
                      >
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-stone-100 border-t-amber-800 rounded-full animate-spin" />
                          <Sparkles className="w-6 h-6 text-amber-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        </div>
                        <div>
                          <p className="font-serif text-xl font-bold italic text-amber-950">Formulating Creative Recipe</p>
                          <p className="text-xs text-stone-500 max-w-xs mt-1 font-mono">
                            Blending dynamic swatches, analyzing compositional weight, and tailoring materials to ground your emotional frequency...
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {recipeError && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 border border-red-600 p-6 text-red-950 space-y-3"
                      >
                        <p className="font-bold text-sm">Failed to consult Advisor</p>
                        <p className="text-xs">{recipeError}</p>
                      </motion.div>
                    )}

                    {!recipeResult && !isGeneratingRecipe && !recipeError && (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#FCF9F5] border border-dashed border-amber-800/20 p-8 flex flex-col items-center justify-center text-center space-y-3 h-80 text-stone-700"
                      >
                        <Compass className="w-10 h-10 text-amber-800/40 stroke-1 animate-spin-slow" />
                        <div>
                          <p className="font-serif font-bold italic text-stone-800 text-lg">Art Advisor Standby</p>
                          <p className="text-xs text-stone-400 max-w-sm mt-1 leading-relaxed font-mono uppercase tracking-tight">
                            Ready for analysis. Tell us how you feel to output a custom color swatches recipe, historical style alignments, and conceptual canvas exercises.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {recipeResult && !isGeneratingRecipe && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white border-2 border-amber-800/10 shadow-[4px_4px_0px_0px_#FAF3E8] space-y-6 overflow-hidden"
                      >
                        <div className="bg-[#1E0E10] text-yellow-500 p-5 flex items-center justify-between border-b-2 border-yellow-500/20">
                          <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-yellow-500/70 font-bold">STUDIO RECIPE</span>
                            <h4 className="font-serif text-2xl font-black italic">Expression Blueprint</h4>
                          </div>
                          <div className="bg-yellow-500 text-stone-950 text-[10px] px-2.5 py-1 border border-yellow-600 font-mono font-bold uppercase tracking-widest">
                            ACTIVE FORMULA
                          </div>
                        </div>

                        <div className="p-6 space-y-6 bg-white">
                          
                          {/* Recommended style */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase text-stone-400 tracking-widest font-bold">RECOMMENDED STYLE & MEDIUM</span>
                            <h5 className="font-serif text-xl font-bold text-amber-950 flex items-center gap-1.5 italic">
                              <CornerDownRight className="w-4 h-4 text-amber-800" />
                              {recipeResult.recommendedStyle}
                            </h5>
                            <p className="text-xs text-stone-600 font-light leading-relaxed">
                              {recipeResult.styleDescription}
                            </p>
                          </div>

                          {/* Dynamic Swatches */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase text-stone-400 tracking-widest font-bold">CURATED COLOR PALETTE (CLICK TO COPY HEX)</span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {recipeResult.colors.map((color, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleCopyHex(color.hex)}
                                  className="group flex flex-col text-left border border-[#1A1A1A] bg-[#F9F8F6] hover:bg-stone-100 transition-all p-2 relative"
                                >
                                  {/* Swatch color block */}
                                  <div
                                    className="aspect-square w-full border border-[#1A1A1A] mb-2 transition-transform group-hover:scale-102"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                  <div className="space-y-0.5 min-h-[50px]">
                                    <p className="text-xs font-bold text-[#1A1A1A] truncate">{color.name}</p>
                                    <p className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                                      {color.hex}
                                      {copiedHex === color.hex ? (
                                        <span className="text-emerald-600 font-semibold font-mono text-[9px] uppercase">Copied</span>
                                      ) : null}
                                    </p>
                                  </div>
                                  <p className="text-[9px] text-stone-400 italic line-clamp-2 mt-1 leading-snug border-t border-dashed border-stone-200 pt-1">
                                    {color.meaning}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Materials and physical technique */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                            <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-1">
                              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">ART MATERIALS TOOLKIT</span>
                              <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">Recommended Instruments</p>
                              <p className="text-xs text-stone-600 leading-relaxed font-light font-serif italic">
                                {recipeResult.materials}
                              </p>
                            </div>
                            <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-1">
                              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">BRUSHWORK & KINETICS</span>
                              <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">Physical Application</p>
                              <p className="text-xs text-stone-600 leading-relaxed font-light font-serif italic">
                                {recipeResult.brushwork}
                              </p>
                            </div>
                          </div>

                          {/* Conceptual studio prompt */}
                          <div className="bg-red-50/50 p-5 border border-red-200 space-y-1">
                            <span className="text-[10px] font-mono text-red-600 uppercase font-bold tracking-widest">STUDIO EXPLORATION CHALLENGE</span>
                            <p className="text-sm font-serif font-bold text-[#1A1A1A] italic">
                              "{recipeResult.conceptualPrompt}"
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Inspiring quote at bottom of Paintbox Page */}
              <div className="pt-8 mt-12 border-t border-dashed border-amber-800/20 text-center max-w-2xl mx-auto space-y-2">
                <p className="font-serif text-lg italic text-amber-950/90 leading-relaxed">
                  "I found I could say things with color and shapes that I couldn't say any other way—things I had no words for. Color is a power which directly influences the soul."
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-amber-800/80 font-bold">
                  — Georgia O'Keeffe & Wassily Kandinsky
                </p>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="h-20 border-t border-[#1A1A1A] bg-white px-8 flex flex-col sm:flex-row items-center justify-between text-[#1A1A1A] font-mono text-[10px] tracking-wider uppercase mt-20">
        <div className="flex gap-8 py-4 sm:py-0">
          <span className="font-bold">INDEX</span>
          <span className="font-bold">NOTES</span>
          <span className="font-bold">REFLECTION</span>
        </div>
        <span className="opacity-50">PG. 012 / 148 • © 2026 David Memorandum</span>
      </footer>

      {/* 1. ARTWORK DETAIL / INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPiece(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center items-start"
          >
            {(() => {
              const pTheme = THEME_CONFIGS[selectedPiece.style] || THEME_CONFIGS.minimalism;
              return (
                <motion.div
                  initial={{ scale: 0.98, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.98, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`rounded-none overflow-hidden max-w-4xl w-full my-4 flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-double ${pTheme.accentColor} ${pTheme.formBgClass}`}
                >
                  
                  {/* Image side */}
                  <div className={`md:w-1/2 bg-stone-950 relative flex items-center justify-center border-r ${selectedPiece.style === "museum" ? "border-yellow-500/20" : selectedPiece.style === "journey" ? "border-amber-800/20" : "border-[#1A1A1A]"} min-h-[300px]`}>
                    {selectedPiece.isVideo && selectedPiece.videoUrl ? (
                      <video
                        src={selectedPiece.videoUrl}
                        controls
                        autoPlay
                        loop
                        className="w-full max-h-[450px] md:max-h-full object-contain"
                      />
                    ) : (
                      <img
                        src={selectedPiece.imageUrl}
                        alt={selectedPiece.title}
                        referrerPolicy="no-referrer"
                        className="w-full max-h-[450px] md:max-h-full object-contain"
                      />
                    )}
                    
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedPiece(null)}
                      className={`absolute top-4 left-4 p-2 border transition-all focus:outline-none shadow-sm ${selectedPiece.style === "museum" ? "bg-[#120608] text-yellow-500 border-yellow-500/20 hover:bg-[#2A1518]" : selectedPiece.style === "journey" ? "bg-[#FCF9F5] text-amber-950 border-amber-300 hover:bg-amber-100" : "bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-stone-100"}`}
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className={`absolute bottom-4 left-4 right-4 p-3 border font-mono ${selectedPiece.style === "museum" ? "bg-[#120608] text-yellow-500 border-yellow-500/30" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] text-amber-950 border-amber-800/40" : "bg-[#1A1A1A] text-[#F9F8F6] border-white"}`}>
                      <p className="text-[9px] opacity-60 uppercase tracking-widest">SECTOR STYLE</p>
                      <p className="text-xs font-bold tracking-widest uppercase mt-0.5">{selectedPiece.style}</p>
                    </div>
                  </div>

                  {/* Information side */}
                  <div className={`md:w-1/2 p-6 overflow-y-auto max-h-[600px] md:max-h-[85vh] space-y-6 flex flex-col justify-between ${pTheme.formBgClass} ${selectedPiece.style === "museum" ? "text-[#EAD5D5]" : selectedPiece.style === "journey" ? "text-amber-950 font-sans" : "text-[#1A1A1A] font-sans"}`}>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-serif text-3xl font-black italic ${selectedPiece.style === "museum" ? "text-yellow-500" : selectedPiece.style === "journey" ? "text-amber-900 font-serif" : "text-[#1A1A1A]"}`}>{selectedPiece.title}</h3>
                          <p className="text-[10px] opacity-75 font-mono tracking-widest uppercase mt-1">
                            {selectedPiece.medium} • {selectedPiece.date}
                          </p>
                        </div>
                      </div>

                      {selectedPiece.externalLink && (
                        <div className="pt-1">
                          <a
                            href={selectedPiece.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono tracking-widest uppercase font-black border transition-all hover:scale-101 active:scale-99 shadow-md ${
                              selectedPiece.style === 'museum'
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-stone-950 border-yellow-600'
                                : selectedPiece.style === 'journey'
                                ? 'bg-[#FCF9F5] hover:bg-amber-100 text-amber-950 border-amber-800'
                                : 'bg-[#1A1A1A] hover:bg-stone-800 text-white border-[#1A1A1A]'
                            }`}
                          >
                            <FileText className="w-4 h-4 text-red-500 animate-pulse" />
                            View Original File on GDrive
                          </a>
                        </div>
                      )}

                      {/* Tab selector for Deep Visual Analysis */}
                      {selectedPiece.description && (
                        <div className={`flex flex-wrap border-b gap-1 mt-2 ${selectedPiece.style === "museum" ? "border-yellow-500/10" : selectedPiece.style === "journey" ? "border-amber-800/10" : "border-stone-200"}`}>
                          <button
                            type="button"
                            onClick={() => setModalTab('reflection')}
                            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border-t border-l border-r transition-all ${
                              modalTab === 'reflection'
                                ? selectedPiece.style === "museum"
                                  ? "bg-[#120608] text-yellow-500 border-yellow-500/20 font-bold"
                                  : selectedPiece.style === "journey"
                                  ? "bg-[#FCF9F5] text-amber-950 border-amber-300 font-bold"
                                  : "bg-[#F9F8F6] text-[#1A1A1A] border-[#1A1A1A] font-bold"
                                : "opacity-40 hover:opacity-80"
                            }`}
                          >
                            Reflection & Grade
                          </button>
                          <button
                            type="button"
                            onClick={() => setModalTab('analysis')}
                            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border-t border-l border-r transition-all ${
                              modalTab === 'analysis'
                                ? selectedPiece.style === "museum"
                                  ? "bg-[#120608] text-yellow-500 border-yellow-500/20 font-bold"
                                  : selectedPiece.style === "journey"
                                  ? "bg-[#FCF9F5] text-amber-950 border-amber-300 font-bold"
                                  : "bg-[#F9F8F6] text-[#1A1A1A] border-[#1A1A1A] font-bold"
                                : "opacity-40 hover:opacity-80"
                            }`}
                          >
                            Visual Critique
                          </button>
                          {selectedPiece.cultureStudy && (
                            <button
                              type="button"
                              onClick={() => setModalTab('culture')}
                              className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border-t border-l border-r transition-all ${
                                modalTab === 'culture'
                                  ? selectedPiece.style === "museum"
                                    ? "bg-[#120608] text-yellow-500 border-yellow-500/20 font-bold"
                                    : selectedPiece.style === "journey"
                                    ? "bg-[#FCF9F5] text-amber-950 border-amber-300 font-bold"
                                    : "bg-[#F9F8F6] text-[#1A1A1A] border-[#1A1A1A] font-bold"
                                  : "opacity-40 hover:opacity-80"
                              }`}
                            >
                              Culture Paper
                            </button>
                          )}
                        </div>
                      )}

                      {modalTab === 'reflection' || !selectedPiece.description ? (
                        <>
                          <div className={`p-4 border space-y-2 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/20" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-300" : "bg-[#F9F8F6] border-[#1A1A1A]"}`}>
                            <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase opacity-75 font-bold tracking-widest">
                              <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                              INTENDED EMOTION / FEELING
                            </div>
                            <p className={`text-xs font-bold uppercase tracking-wider ${selectedPiece.style === "museum" ? "text-yellow-500" : selectedPiece.style === "journey" ? "text-amber-900" : "text-[#1A1A1A]"}`}>
                              {selectedPiece.emotion}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono uppercase opacity-75 font-bold tracking-widest">My Personal Reflection</span>
                            <p className="text-xs italic leading-relaxed font-serif opacity-90">
                              "{selectedPiece.reflection}"
                            </p>
                          </div>
                        </>
                      ) : modalTab === 'analysis' ? (
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                          {selectedPiece.description && (
                            <div className={`p-4 border space-y-1.5 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/10" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-800/10" : "bg-[#F9F8F6] border-stone-200"}`}>
                              <h4 className="text-[9px] font-mono uppercase tracking-widest font-bold text-amber-900 flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 bg-amber-700 rounded-full" />
                                I. Description
                              </h4>
                              <p className="text-xs leading-relaxed opacity-95">{selectedPiece.description}</p>
                            </div>
                          )}
                          
                          {selectedPiece.analysis && (
                            <div className={`p-4 border space-y-1.5 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/10" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-800/10" : "bg-[#F9F8F6] border-stone-200"}`}>
                              <h4 className="text-[9px] font-mono uppercase tracking-widest font-bold text-amber-900 flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 bg-amber-700 rounded-full" />
                                II. Visual Analysis
                              </h4>
                              <p className="text-xs leading-relaxed opacity-95">{selectedPiece.analysis}</p>
                            </div>
                          )}

                          {selectedPiece.interpretation && (
                            <div className={`p-4 border space-y-1.5 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/10" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-800/10" : "bg-[#F9F8F6] border-stone-200"}`}>
                              <h4 className="text-[9px] font-mono uppercase tracking-widest font-bold text-amber-900 flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 bg-amber-700 rounded-full" />
                                III. Interpretation & Vibe
                              </h4>
                              <p className="text-xs leading-relaxed opacity-95">{selectedPiece.interpretation}</p>
                            </div>
                          )}

                          {selectedPiece.evaluation && (
                            <div className={`p-4 border space-y-1.5 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/10" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-800/10" : "bg-[#F9F8F6] border-stone-200"}`}>
                              <h4 className="text-[9px] font-mono uppercase tracking-widest font-bold text-amber-900 flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 bg-amber-700 rounded-full" />
                                IV. Critical Evaluation
                              </h4>
                              <p className="text-xs leading-relaxed italic font-serif opacity-95">"{selectedPiece.evaluation}"</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                          <div className={`p-5 border space-y-3 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/15" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-300" : "bg-white border-stone-200"}`}>
                            <div className="flex items-center gap-2 border-b pb-2 border-dashed border-amber-800/20">
                              <BookOpen className="w-4 h-4 text-amber-800" />
                              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">Intercultural Composition Study</span>
                            </div>
                            <div className="text-xs leading-relaxed whitespace-pre-wrap font-serif text-stone-800 opacity-95 max-h-[250px] overflow-y-auto pr-2">
                              {selectedPiece.cultureStudy}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI CRITIQUE ZONE */}
                    <div className={`border-t border-dashed pt-6 space-y-4 ${selectedPiece.style === "museum" ? "border-yellow-500/10" : selectedPiece.style === "journey" ? "border-amber-300/40" : "border-[#1A1A1A]"}`}>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-75 font-bold flex items-center justify-between">
                        <span>PROFESSOR'S FEEDBACK EXAMINER</span>
                        {selectedPiece.professorCritique && (
                          <span className={`px-2 py-0.5 border text-[9px] font-mono tracking-widest uppercase font-bold ${selectedPiece.style === "museum" ? "bg-red-950 text-yellow-500 border-yellow-500/30" : selectedPiece.style === "journey" ? "bg-amber-950 text-white border-amber-800" : "bg-red-600 text-white border-[#1A1A1A]"}`}>
                            GRADE SEAL LOCKED
                          </span>
                        )}
                      </h4>

                      {selectedPiece.professorCritique ? (
                        <div className={`border p-5 space-y-4 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/20 text-[#EAD5D5]" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-300 text-amber-950" : "bg-[#F9F8F6] border-[#1A1A1A] text-[#1A1A1A]"}`}>
                          
                          {/* Letterhead Grade Stamp */}
                          <div className={`flex items-center justify-between border-b pb-3 ${selectedPiece.style === "museum" ? "border-yellow-500/10" : selectedPiece.style === "journey" ? "border-amber-300" : "border-[#1A1A1A]"}`}>
                            <div>
                              <p className={`text-[11px] font-bold uppercase tracking-wider ${selectedPiece.style === "museum" ? "text-yellow-500" : selectedPiece.style === "journey" ? "text-amber-900" : "text-[#1A1A1A]"}`}>Prof. Alistair Sterling</p>
                              <p className="text-[9px] font-mono opacity-60 uppercase tracking-widest">Dept. of Visual & Liberal Arts</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono opacity-60 uppercase tracking-wider">GRADE</span>
                              <span className={`text-xl font-serif font-black w-10 h-10 flex items-center justify-center border shadow ${selectedPiece.style === "museum" ? "bg-yellow-500 text-stone-900 border-yellow-600" : selectedPiece.style === "journey" ? "bg-amber-800 text-white border-amber-950" : "bg-[#1A1A1A] text-[#F9F8F6] border-white"}`}>
                                {selectedPiece.professorCritique.grade}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3 text-xs leading-relaxed">
                            <div>
                              <p className="font-mono text-[9px] uppercase opacity-65 font-bold tracking-wider">Formal Critique</p>
                              <p className="mt-0.5 font-serif leading-relaxed italic opacity-95">
                                "{selectedPiece.professorCritique.formalCritique}"
                              </p>
                            </div>

                            <div>
                              <p className="font-mono text-[9px] uppercase opacity-65 font-bold tracking-wider">Emotional Resonance</p>
                              <p className="mt-0.5 font-serif opacity-95">
                                {selectedPiece.professorCritique.emotionalResonance}
                              </p>
                            </div>

                            <div>
                              <p className="font-mono text-[9px] uppercase opacity-65 font-bold tracking-wider">Materials Insight</p>
                              <p className="mt-0.5 font-serif opacity-95">
                                {selectedPiece.professorCritique.materialsInsight}
                              </p>
                            </div>

                            <div className={`p-3 border mt-2 ${selectedPiece.style === "museum" ? "bg-[#1C0E10] border-yellow-500/30" : selectedPiece.style === "journey" ? "bg-[#FCF9F5] border-amber-300" : "bg-white border-[#1A1A1A]"}`}>
                              <p className={`font-mono text-[9px] uppercase font-bold tracking-widest ${selectedPiece.style === "museum" ? "text-yellow-500" : selectedPiece.style === "journey" ? "text-amber-800" : "text-red-600"}`}>Recommended study prompt</p>
                              <p className="mt-0.5 font-bold text-xs uppercase tracking-tight font-mono opacity-95">
                                {selectedPiece.professorCritique.creativeSuggestion}
                              </p>
                            </div>
                          </div>

                        </div>
                      ) : (
                        <div className={`border p-5 text-center space-y-4 ${selectedPiece.style === "museum" ? "bg-[#120608] border-yellow-500/20" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] border-amber-300" : "bg-white border-[#1A1A1A]"}`}>
                          <p className="text-[10px] font-mono opacity-75 uppercase tracking-wider leading-relaxed max-w-xs mx-auto">
                            This work has not been submitted to the Department of Fine Arts yet. Submit now to have Professor Sterling evaluate your technique, medium choice, and emotional depth.
                          </p>

                          {critiqueError && (
                            <div className="bg-red-50 text-red-800 p-3 border border-red-600 text-xs text-left">
                              {critiqueError}
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRequestCritique(selectedPiece)}
                            disabled={isCritiquing}
                            className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase px-4 py-2.5 border shadow-sm transition-all active:scale-95 ${pTheme.buttonClass}`}
                          >
                            {isCritiquing ? (
                              <>
                                <div className="w-3.5 h-3.5 border rounded-full animate-spin border-current" />
                                Evaluating Canvas...
                              </>
                            ) : (
                              <>
                                <Award className="w-4 h-4 text-red-500" />
                                Request Professor Critique
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedPiece(null)}
                        className={`w-full text-xs font-mono tracking-widest uppercase py-2.5 border transition-all ${selectedPiece.style === "museum" ? "bg-[#120608] hover:bg-[#2A1518] text-yellow-500 border-yellow-500/20" : selectedPiece.style === "journey" ? "bg-[#FAF3E8] hover:bg-[#F1E8DC] text-amber-950 border-amber-300" : "bg-[#F9F8F6] hover:bg-stone-200 text-[#1A1A1A] border-[#1A1A1A]"}`}
                      >
                        Close Inspection
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ADD NEW PIECE DRAWER / OVERLAY */}
      <AnimatePresence>
        {isAddingPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddingPiece(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs p-4 overflow-y-auto flex justify-center items-start"
          >
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] max-w-xl w-full my-8 border border-[#1A1A1A]"
            >
              
              <div className="bg-[#1A1A1A] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-red-600" />
                  <h3 className="font-serif text-2xl font-black italic">Archive Semester Output</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingPiece(false)}
                  className="text-stone-400 hover:text-white p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPieceSubmit} className="p-6 space-y-4 text-sm bg-white">
                
                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">Artwork Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. 'Nostalgia Grid'"
                      className="w-full px-3 py-2 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">Technique/Style Sector</label>
                    <select
                      value={newStyle}
                      onChange={(e) => setNewStyle(e.target.value as ArtStyle)}
                      className="w-full px-3 py-2 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A] capitalize"
                    >
                      {STYLE_SECTIONS.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">Medium & Materials Used</label>
                    <input
                      type="text"
                      value={newMedium}
                      onChange={(e) => setNewMedium(e.target.value)}
                      placeholder="e.g. 'Watercolor and fine line ink'"
                      className="w-full px-3 py-2 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">Dominant Emotion Felt</label>
                    <input
                      type="text"
                      value={newEmotion}
                      onChange={(e) => setNewEmotion(e.target.value)}
                      placeholder="e.g. 'Chaos & Melancholy'"
                      className="w-full px-3 py-2 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"
                      required
                    />
                  </div>
                </div>

                {/* Preset image picker */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase text-stone-500 font-bold tracking-wider">Select Art Canvas Preset</label>
                  <div className="grid grid-cols-5 gap-2">
                    {IMAGE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setNewImagePreset(preset.url);
                          setCustomImageUrl("");
                        }}
                        className={`aspect-square rounded-none overflow-hidden border transition-all relative ${
                          newImagePreset === preset.url && !customImageUrl
                            ? "border-[#1A1A1A] ring-2 ring-red-500/50 scale-102"
                            : "border-stone-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[8px] text-white py-0.5 truncate text-center px-1 font-mono uppercase tracking-widest">
                          {preset.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom URL image */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">
                    Or Enter Custom Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://example.com/my-art.jpg"
                    className="w-full px-3 py-2 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"
                  />
                </div>

                {/* Google Drive / PDF External Link */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">
                    Google Drive or PDF Reference URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newExternalLink}
                    onChange={(e) => setNewExternalLink(e.target.value)}
                    placeholder="e.g. 'https://drive.google.com/file/d/.../view'"
                    className="w-full px-3 py-2 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"
                  />
                  <p className="text-[9px] text-stone-400 font-mono mt-0.5 leading-normal uppercase">
                    💡 Ideal for linking uncompressed PDFs, video folders, or shared pictures from Google Drive!
                  </p>
                </div>

                {/* Reflection Notes */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1 font-bold tracking-wider">My Personal Reflection (Emotion & Understanding)</label>
                  <textarea
                    value={newReflection}
                    onChange={(e) => setNewReflection(e.target.value)}
                    placeholder="Reflect on why you chose this medium, how it relates to your chosen emotion, and what you learned from this material exploration..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-none border border-[#1A1A1A] text-xs focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"
                    required
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingPiece(false)}
                    className="w-1/2 bg-[#F9F8F6] hover:bg-stone-200 text-[#1A1A1A] text-xs font-mono tracking-widest uppercase py-3 border border-[#1A1A1A] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#1A1A1A] hover:bg-stone-800 text-white text-xs font-mono tracking-widest uppercase py-3 border border-[#1A1A1A] shadow transition-all active:scale-98"
                  >
                    Save to Portfolio
                  </button>
                </div>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
