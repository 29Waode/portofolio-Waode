"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import { Folder, User, X, Minus } from "lucide-react";

export default function Desktop() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-900 via-sky-800 to-indigo-950 font-sans text-white">
      {/* Ikon Desktop */}
      <div className="p-6 flex flex-col gap-6 w-fit">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition w-20 text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-white/20 flex items-center justify-center backdrop-blur-md">
            <User className="w-6 h-6 text-sky-200" />
          </div>
          <span className="text-xs drop-shadow">About.exe</span>
        </button>
      </div>

      {/* Jendela Modal Windows 11 */}
      {isOpen && (
        <Rnd
          default={{ x: 100, y: 80, width: 450, height: 320 }}
          minWidth={300}
          minHeight={200}
          bounds="parent"
          className="z-50"
        >
          <div className="flex flex-col h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            {/* Header Window */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 select-none cursor-move">
              <span className="text-xs font-medium text-slate-300">About Me</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Minus className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-red-500 rounded transition"
                >
                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Konten Window */}
            <div className="p-5 flex-1 overflow-y-auto text-sm text-slate-200">
              <h2 className="text-lg font-bold mb-2">Halo, Selamat Datang!</h2>
              <p className="text-slate-400 leading-relaxed">
                Ini adalah portofolio dengan konsep desktop OS. Anda bisa menggeser jendela ini sesuka hati.
              </p>
            </div>
          </div>
        </Rnd>
      )}

      {/* Taskbar Windows 11 */}
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 h-12 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 flex items-center gap-3 shadow-xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl hover:bg-white/10 transition"
        >
          <Folder className="w-5 h-5 text-sky-400" />
        </button>
      </footer>
    </main>
  );
}