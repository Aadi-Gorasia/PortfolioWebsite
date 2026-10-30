export interface Project {
  slug: string;
  title: string;
  client?: string;
  year?: string;
  role?: string;
  category?: string;
  status?: string;
  coverImage?: string;
  tech?: string[];
  description?: string;
  challenge?: string;
  solution?: string;
  gallery?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "autonomous-flight-grid",
    title: "Autonomous Flight Grid",
    client: "Aerospace Dynamics",
    year: "2024",
    role: "Systems Architect",
    category: "Hardware",
    status: "LIVE_ORBIT",
    tech: ["Rust", "Tauri", "WebGL", "Postgres"],
    description: "A decentralized swarm control system for autonomous drone fleets operating in GPS-denied environments.",
    challenge: "Existing protocols relied on centralized command servers, creating single points of failure and high latency in urban canyons.",
    solution: "We engineered a peer-to-peer mesh network using Rust for microsecond-latency communication and a custom WebGL visualizer for real-time telemetry.",
  },
  {
    slug: "neural-vision-mod",
    title: "Neural Vision Mod",
    client: "DefSpec",
    year: "2023",
    role: "ML Engineer",
    category: "AI_Research",
    status: "CLASSIFIED",
    tech: ["Python", "PyTorch", "CUDA", "C++"],
    description: "Computer vision pipeline optimized for edge devices, capable of identifying structural anomalies in real-time.",
    challenge: "Standard models were too heavy for the target hardware (embedded field units) and required cloud connectivity.",
    solution: "Developed a quantized model architecture that runs locally on TPU accelerators with 99.8% accuracy.",
  },
  {
    slug: "gesture-control-car",
    title: "Gesture Control Car",
    client: "Machine Learning",
    year: "2023",
    role: "Systems Architecture",
    category: "Selected",
    coverImage: "/gesturecontrolcar.png",
  },
  {
    slug: "tesla-turbine",
    title: "Tesla Turbine",
    client: "Applied Physics",
    year: "2024",
    role: "ML Engineering",
    category: "Selected",
    coverImage: "/teslaturbine.png",
  },
  {
    slug: "a-star-path-finding",
    title: "A* Path Finding Algorithm",
    client: "Algorithmic Technologies",
    year: "2024",
    role: "Algorithm Design",
    category: "Selected",
    coverImage: "/a*pathfindingalgorithm.png",
  },
  {
    slug: "hyper-index-engine",
    title: "PLEN",
    client: "Aerospace Systems",
    year: "2025 (ONGOING)",
    role: "Backend Optimization",
    category: "Selected",
    coverImage: "/plen.png",
  },
];
