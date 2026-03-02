export const PROJECTS = [
  {
    slug: "autonomous-flight-grid",
    title: "Autonomous Flight Grid",
    client: "Aerospace Dynamics",
    year: "2024",
    role: "Systems Architect",
    category: "Hardware",
    status: "LIVE_ORBIT",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    tech: ["Rust", "Tauri", "WebGL", "Postgres"],
    description: "A decentralized swarm control system for autonomous drone fleets operating in GPS-denied environments.",
    challenge: "Existing protocols relied on centralized command servers, creating single points of failure and high latency in urban canyons.",
    solution: "We engineered a peer-to-peer mesh network using Rust for microsecond-latency communication and a custom WebGL visualizer for real-time telemetry.",
    gallery: [
      "https://images.unsplash.com/photo-1559067515-bf7d799b23e2?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "neural-vision-mod",
    title: "Neural Vision Mod",
    client: "DefSpec",
    year: "2023",
    role: "ML Engineer",
    category: "AI_Research",
    status: "CLASSIFIED",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    tech: ["Python", "PyTorch", "CUDA", "C++"],
    description: "Computer vision pipeline optimized for edge devices, capable of identifying structural anomalies in real-time.",
    challenge: "Standard models were too heavy for the target hardware (embedded field units) and required cloud connectivity.",
    solution: "Developed a quantized model architecture that runs locally on TPU accelerators with 99.8% accuracy.",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
    ]
  },
  // Add more projects here...
];