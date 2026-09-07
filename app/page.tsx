"use client";

import { useState, useEffect, useMemo } from "react";
import { Rnd } from "react-rnd";
import { 
  User, 
  FolderGit2, 
  GraduationCap, 
  FileText, 
  X, 
  Minus, 
  Square,
  Folder,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCw,
  Search,
  CloudSun,
  LayoutGrid,
  List,
  Sparkles,
  Briefcase,
  Download,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// Komponen Ikon GitHub & Instagram mandiri (anti-error import)
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type MainSection = "about" | "skills" | "projects" | "experience" | "education" | "resume";
type SkillCategory = "all" | "web-dev" | "graphic-design" | "video-editing";

interface SkillItem {
  name: string;
  category: "web-dev" | "graphic-design" | "video-editing";
  badge: string;
  badgeBg: string;
  desc: string;
}

const MY_SKILLS: SkillItem[] = [
  { name: "HTML", category: "web-dev", badge: "5", badgeBg: "bg-orange-600 text-white", desc: "Struktur Fondasi Web" },
  { name: "CSS", category: "web-dev", badge: "3", badgeBg: "bg-blue-600 text-white", desc: "Styling & Responsive Layout" },
  { name: "JavaScript", category: "web-dev", badge: "JS", badgeBg: "bg-yellow-400 text-black font-black", desc: "Logika Dasar & Interaktivitas" },
  { name: "Canva", category: "graphic-design", badge: "Cv", badgeBg: "bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white", desc: "Desain Grafis, Feed & Poster" },
  { name: "CapCut", category: "video-editing", badge: "Cc", badgeBg: "bg-neutral-800 text-white border border-white/20", desc: "Video Editing Reels & TikTok" },
];

export default function Desktop() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<MainSection>("about");
  const [activeSubFolder, setActiveSubFolder] = useState<SkillCategory>("all");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const pathString = activeSubFolder === "all" 
    ? `This PC > Portfolio > ${activeSection}` 
    : `This PC > Portfolio > ${activeSection} > ${
        activeSubFolder === "web-dev" ? "Web Development Dasar" : 
        activeSubFolder === "graphic-design" ? "Desain Grafis" : "Video Editing"
      }`;

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeSubFolder === "all" 
        ? MY_SKILLS 
        : MY_SKILLS.filter(s => s.category === activeSubFolder);
    }
    return MY_SKILLS.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeSubFolder]);

  const SECTIONS = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Folder },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "resume", label: "Resume", icon: FileText },
  ];

  const handlePrintResume = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume - Waode Hartina</title>
          <style>
            body { font-family: Arial, sans-serif; color: #1a202c; line-height: 1.3; margin: 30px 40px; }
            h1 { font-size: 20pt; font-weight: bold; margin: 0 0 4px 0; color: #0f172a; text-transform: uppercase; }
            .contact { font-size: 10pt; color: #475569; margin-bottom: 16px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
            h2 { font-size: 11pt; font-weight: bold; color: #0369a1; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 8px; }
            p, li { font-size: 9.5pt; color: #334155; }
            ul { margin: 3px 0 8px 18px; padding: 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <h1>WAODE HARTINA</h1>
          <div class="contact">Kolaka, Sulawesi Tenggara | +62 821 6285 6489 | hartinawaode04@gmail.com</div>
          <h2>Ringkasan Profil</h2>
          <p>Mahasiswa S1 Sistem Informasi di Universitas Sembilanbelas November Kolaka (Semester 5) yang aktif memadukan keahlian multimedia dengan implementasi teknologi web. Berpengalaman organisasi sebagai Ketua Bidang Infokom HMPS-SI serta menangani kebutuhan desain grafis dan penyuntingan video. Saat ini sedang mendalami pengembangan web (front-end developer), arsitektur agen AI, serta memiliki kontribusi riset akademis di bidang machine learning untuk citra medis.</p>
          <h2>Pendidikan</h2>
          <table><tr><td style="font-weight:bold;">Universitas Sembilanbelas November Kolaka</td><td style="text-align:right;color:#64748b;">2024 – Sekarang (Semester 5)</td></tr><tr><td colspan="2" style="color:#0284c7;font-style:italic;">S1 Sistem Informasi</td></tr></table>
          <table><tr><td style="font-weight:bold;">SMAN 1 Raha</td><td style="text-align:right;color:#64748b;">2021 – 2024</td></tr></table>
          <h2>Keahlian</h2>
          <p><b>Pengembangan Web:</b> Front-End Web Development (HTML, CSS, JavaScript dasar)<br/><b>Multimedia & Kreatif:</b> Video Editing (CapCut), Graphic Design (Canva)<br/><b>Bahasa:</b> Bahasa Indonesia (Aktif), Bahasa Inggris (Dasar)</p>
          <h2>Pengalaman & Organisasi</h2>
          <table><tr><td style="font-weight:bold;">Himpunan Mahasiswa Program Studi Sistem Informasi (HMPS-SI)</td><td style="text-align:right;color:#64748b;">Kolaka, Indonesia</td></tr><tr><td colspan="2" style="color:#0284c7;font-style:italic;">Ketua Bidang Infokom (Informasi dan Komunikasi)</td></tr></table>
          <ul><li>Bertanggung jawab atas pengelolaan publikasi informasi, media komunikasi, dan konten visual organisasi.</li></ul>
          <p style="font-weight:bold; margin-bottom:2px;">Graphic Designer & Editor Video</p>
          <ul><li>Merancang desain visual dan infografis kegiatan menggunakan Canva.</li><li>Memproduksi dan menyunting video multimedia dokumentasi maupun publikasi menggunakan CapCut.</li></ul>
          <h2>Proyek</h2>
          <p><b>SIM-AGENDA-PIMPINAN INSTANSI</b><br/>Merancang dan menguji prototipe sistem informasi agenda pimpinan instansi untuk memastikan alur fungsionalitas dan fitur utama berjalan dengan baik.</p>
          <p><b>Portofolio Web Interaktif (Desktop Theme Windows 11)</b><br/>Mengembangkan antarmuka situs portofolio interaktif berbasis web dengan tema desktop Windows 11 menggunakan HTML, CSS, dan JavaScript.</p>
          <script>window.print();</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <main 
      className="relative h-screen w-screen overflow-hidden font-sans select-none bg-cover bg-center text-slate-100"
      style={{ backgroundImage: `url('/walpaper.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* 1. Desktop Shortcuts */}
      <div className="relative z-10 p-6 flex flex-col gap-3 w-fit">
        {SECTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as MainSection);
                setActiveSubFolder("all");
                setSearchQuery("");
                setIsOpen(true);
              }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition w-20 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900/50 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                <Icon className="w-6 h-6 text-sky-300" />
              </div>
              <span className="text-[11px] font-medium tracking-wide drop-shadow text-slate-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Window File Explorer */}
      {isOpen && (
        <Rnd
          default={{ x: 90, y: 50, width: 870, height: 530 }}
          minWidth={550}
          minHeight={360}
          bounds="parent"
          className="z-40"
        >
          <div className="flex flex-col h-full w-full bg-[#181d28]/92 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
            
            {/* Titlebar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 select-none cursor-move">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400 fill-amber-400/40" />
                <span className="text-xs font-semibold text-slate-200 capitalize">File Explorer - {activeSection}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition">
                  <Square className="w-3 h-3" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-500 rounded text-slate-400 hover:text-white transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Navigasi & Search Bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/10 text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <button 
                  onClick={() => {
                    setActiveSubFolder("all");
                    setSearchQuery("");
                  }} 
                  disabled={activeSubFolder === "all" && searchQuery === ""}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 hover:bg-white/10 rounded disabled:opacity-30" disabled>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => {
                    setActiveSubFolder("all");
                    setSearchQuery("");
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Breadcrumb Path */}
              <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-black/30 border border-white/10 rounded-lg text-xs text-slate-300 overflow-hidden">
                <Folder className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40 flex-shrink-0" />
                <span className="truncate">
                  {searchQuery ? `Hasil Pencarian "${searchQuery}"` : pathString}
                </span>
              </div>

              {/* Search Bar */}
              <div className="w-52 flex items-center gap-2 px-2.5 py-1 bg-black/30 border border-white/10 rounded-lg text-xs text-slate-300 focus-within:border-sky-400/60 transition">
                <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${activeSection}...`} 
                  className="w-full bg-transparent outline-none text-xs text-slate-200 placeholder-slate-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="hover:text-white text-slate-400">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Sub Toolbar */}
            <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5 bg-white/[0.02] text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="hover:text-white cursor-pointer">New</span>
                <span className="hover:text-white cursor-pointer">Sort</span>
                <span className="hover:text-white cursor-pointer">View</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hover:text-white cursor-pointer">Details</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <aside className="w-44 border-r border-white/10 p-2 flex flex-col gap-0.5 text-xs text-slate-400 select-none bg-black/20">
                <span className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Portfolio</span>
                {SECTIONS.map((item) => {
                  const Icon = item.icon;
                  const isCur = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id as MainSection);
                        setActiveSubFolder("all");
                        setSearchQuery("");
                      }}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${
                        isCur ? "bg-sky-500/20 text-sky-200 border border-sky-400/30 font-medium" : "hover:bg-white/5 text-slate-300"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isCur ? "text-sky-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </aside>

              {/* Konten Utama */}
              <section className="flex-1 p-6 overflow-y-auto bg-black/15">
                
                {/* 1. ABOUT */}
                {activeSection === "about" && (
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 border border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                        WH
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-white">WAODE HARTINA</h2>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30">
                            Semester 5
                          </span>
                        </div>
                        <p className="text-xs text-sky-300 font-medium mt-0.5">
                          S1 Sistem Informasi • Universitas Sembilanbelas November Kolaka
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Kolaka, Sulawesi Tenggara</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +62 821 6285 6489</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> hartinawaode04@gmail.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3 text-xs leading-relaxed text-slate-200">
                      <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Ringkasan Profil</span>
                      </div>
                      <p className="text-slate-300">
                        Mahasiswa S1 Sistem Informasi di Universitas Sembilanbelas November Kolaka (Semester 5) yang aktif memadukan keahlian multimedia dengan implementasi teknologi web. Berpengalaman organisasi sebagai Ketua Bidang Infokom HMPS-SI serta menangani kebutuhan desain grafis dan penyuntingan video.
                      </p>
                      <p className="text-slate-300">
                        Saat ini sedang mendalami pengembangan web (front-end developer), arsitektur agen AI, serta memiliki kontribusi riset akademis di bidang machine learning untuk citra medis. Terbiasa memadukan kepekaan visual dan logika pemrograman untuk menciptakan antarmuka web yang menarik serta fungsional.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. SKILLS */}
                {activeSection === "skills" && (
                  <>
                    {searchQuery.trim() ? (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-400">Menemukan {filteredSkills.length} keahlian yang cocok:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {filteredSkills.map((skill) => (
                            <div key={skill.name} className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 text-center shadow-md">
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl shadow-inner ${skill.badgeBg}`}>
                                {skill.badge}
                              </div>
                              <span className="text-xs font-bold text-white mt-2">{skill.name}</span>
                              <span className="text-[10px] text-slate-400 mt-0.5">{skill.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {activeSubFolder === "all" ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div 
                              onDoubleClick={() => setActiveSubFolder("web-dev")}
                              onClick={() => setSelectedFolder("web-dev")}
                              className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition ${
                                selectedFolder === "web-dev" ? "bg-sky-500/20 border border-sky-400/40" : "hover:bg-white/5 border border-transparent"
                              }`}
                            >
                              <div className="w-16 h-14 bg-amber-500/90 rounded-lg shadow-lg flex items-center justify-center relative">
                                <span className="text-white text-xs font-bold">HTML/JS</span>
                                <div className="absolute top-0 left-2 w-6 h-2 bg-amber-600 rounded-t-sm" />
                              </div>
                              <span className="text-xs font-medium text-slate-200 mt-2 text-center">Web Dev Dasar</span>
                              <span className="text-[10px] text-slate-400">3 items</span>
                            </div>

                            <div 
                              onDoubleClick={() => setActiveSubFolder("graphic-design")}
                              onClick={() => setSelectedFolder("graphic-design")}
                              className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition ${
                                selectedFolder === "graphic-design" ? "bg-sky-500/20 border border-sky-400/40" : "hover:bg-white/5 border border-transparent"
                              }`}
                            >
                              <div className="w-16 h-14 bg-gradient-to-tr from-pink-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center relative">
                                <span className="text-white text-xs font-bold">Canva</span>
                                <div className="absolute top-0 left-2 w-6 h-2 bg-indigo-700 rounded-t-sm" />
                              </div>
                              <span className="text-xs font-medium text-slate-200 mt-2 text-center">Desain Grafis</span>
                              <span className="text-[10px] text-slate-400">1 item</span>
                            </div>

                            <div 
                              onDoubleClick={() => setActiveSubFolder("video-editing")}
                              onClick={() => setSelectedFolder("video-editing")}
                              className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition ${
                                selectedFolder === "video-editing" ? "bg-sky-500/20 border border-sky-400/40" : "hover:bg-white/5 border border-transparent"
                              }`}
                            >
                              <div className="w-16 h-14 bg-cyan-700 rounded-lg shadow-lg flex items-center justify-center relative">
                                <span className="text-white text-xs font-bold">CapCut</span>
                                <div className="absolute top-0 left-2 w-6 h-2 bg-cyan-800 rounded-t-sm" />
                              </div>
                              <span className="text-xs font-medium text-slate-200 mt-2 text-center">Video Editor</span>
                              <span className="text-[10px] text-slate-400">1 item</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <button 
                              onClick={() => setActiveSubFolder("all")}
                              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 mb-3 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke folder Skills
                            </button>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                              {MY_SKILLS.filter(s => s.category === activeSubFolder).map((skill) => (
                                <div key={skill.name} className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 text-center shadow-md">
                                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl shadow-inner ${skill.badgeBg}`}>
                                    {skill.badge}
                                  </div>
                                  <span className="text-xs font-bold text-white mt-2">{skill.name}</span>
                                  <span className="text-[10px] text-slate-400 mt-0.5">{skill.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* 3. PROJECTS */}
                {activeSection === "projects" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <FolderGit2 className="w-5 h-5 text-sky-400" />
                          <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-400/20">Sistem Informasi</span>
                        </div>
                        <h3 className="font-semibold text-white text-sm mt-3">SIM-AGENDA-PIMPINAN INSTANSI</h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          Merancang dan menguji prototipe sistem informasi agenda pimpinan instansi untuk memastikan alur fungsionalitas dan fitur utama berjalan dengan baik.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <FolderGit2 className="w-5 h-5 text-sky-400" />
                          <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-400/20">Web Dev</span>
                        </div>
                        <h3 className="font-semibold text-white text-sm mt-3">Portofolio Web Interaktif (Windows 11)</h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          Mengembangkan antarmuka situs portofolio interaktif berbasis web dengan tema desktop Windows 11 menggunakan HTML, CSS, dan JavaScript.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. EXPERIENCE */}
                {activeSection === "experience" && (
                  <div className="space-y-4 max-w-xl">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white text-sm">Himpunan Mahasiswa Program Studi Sistem Informasi (HMPS-SI)</h3>
                          <p className="text-xs text-sky-400 font-medium">Ketua Bidang Infokom (Informasi dan Komunikasi)</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Bertanggung jawab penuh atas pengelolaan publikasi informasi, media komunikasi, dan penyampaian konten visual organisasi kepada seluruh mahasiswa dan pihak luar.
                      </p>
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs font-semibold text-slate-200 mb-1">Peran Desain & Multimedia:</p>
                        <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                          <li>Merancang desain visual dan infografis kegiatan menggunakan <strong>Canva</strong>.</li>
                          <li>Memproduksi dan menyunting video dokumentasi maupun publikasi organisasi menggunakan <strong>CapCut</strong>.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. EDUCATION */}
                {activeSection === "education" && (
                  <div className="space-y-3 max-w-lg">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white text-sm">Universitas Sembilanbelas November Kolaka</h3>
                        <p className="text-xs text-sky-300">S1 Sistem Informasi</p>
                        <p className="text-[11px] text-slate-400 mt-1">2024 – Sekarang (Semester 5)</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white text-sm">SMAN 1 Raha</h3>
                        <p className="text-[11px] text-slate-400 mt-1">2021 – 2024</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. RESUME */}
                {activeSection === "resume" && (
                  <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl h-full max-w-lg mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mb-3">
                      <FileText className="w-7 h-7 text-sky-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">Curriculum Vitae - Waode Hartina</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-5 leading-relaxed">
                      Dokumen resmi riwayat akademik S1 Sistem Informasi, pengalaman Ketua Infokom HMPS-SI, dan keahlian multimedia & web development.
                    </p>
                    <button 
                      onClick={handlePrintResume}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-semibold transition shadow-lg shadow-sky-500/25 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Unduh Resume (.PDF)
                    </button>
                  </div>
                )}
              </section>
            </div>

            {/* Status Bar */}
            <div className="px-4 py-1.5 bg-white/[0.02] border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{activeSection} selected</span>
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5" />
                <List className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </Rnd>
      )}

      {/* 3. Taskbar Windows 11 */}
      <footer className="absolute bottom-2 inset-x-0 mx-auto w-[96%] max-w-5xl h-12 bg-[#0f172a]/75 backdrop-blur-2xl border border-white/15 rounded-2xl px-4 flex items-center justify-between shadow-2xl z-50">
        
        {/* Cuaca Sisi Kiri */}
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <CloudSun className="w-5 h-5 text-amber-300" />
          <div className="hidden sm:flex flex-col text-[11px] leading-tight">
            <span>28°C</span>
            <span className="text-slate-400">Kolaka</span>
          </div>
        </div>

        {/* Bagian Tengah: Start, Explorer, & Media Sosial */}
        <div className="flex items-center gap-1.5">
          <button className="p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition cursor-pointer">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <span className="bg-sky-400 rounded-[1px]" />
              <span className="bg-sky-400 rounded-[1px]" />
              <span className="bg-sky-400 rounded-[1px]" />
              <span className="bg-sky-400 rounded-[1px]" />
            </div>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl transition relative cursor-pointer ${
              isOpen ? "bg-white/15 text-white" : "hover:bg-white/10 text-slate-400"
            }`}
          >
            <Folder className="w-5 h-5 text-amber-400 fill-amber-400/40" />
            {isOpen && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-sky-400 rounded-full" />}
          </button>

          <div className="h-5 w-[1px] bg-white/15 mx-1" />

          {/* GitHub */}
          <a
            href="https://github.com/29Waode"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub: 29Waode"
            className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="p-2 rounded-xl hover:bg-white/10 text-pink-400 hover:text-pink-300 transition flex items-center justify-center cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          {/* Email Langsung Buka Pesan Baru */}
          <a
            href="mailto:hartinawaode04@gmail.com?subject=Halo%20Waode%20Hartina&body=Halo%20Waode,%20saya%20melihat%20portofolio%20Anda..."
            title="Kirim Pesan ke hartinawaode04@gmail.com"
            className="p-2 rounded-xl hover:bg-white/10 text-rose-400 hover:text-rose-300 transition flex items-center justify-center cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Jam Sisi Kanan */}
        <div className="text-right text-[11px] text-slate-300 flex flex-col justify-center">
          <span className="font-medium">{time || "12:00"}</span>
          <span className="text-slate-400 text-[10px]">Windows Mode</span>
        </div>
      </footer>
    </main>
  );
}