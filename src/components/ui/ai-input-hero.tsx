"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Code2, Sparkles, Zap, LayoutTemplate, GitGraph, Box, Clock } from "lucide-react";
import { store, Project } from "../../lib/store";

export type HeroWaveProps = {
    onPromptSubmit?: (value: string) => void;
    onResumeProject?: (project: Project) => void;
};

export function HeroWave({ onPromptSubmit, onResumeProject }: HeroWaveProps) {
    const [prompt, setPrompt] = useState("");
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);

    useEffect(() => {
        setRecentProjects(store.getProjects().slice(0, 3));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPromptSubmit?.(prompt);
    };

    const suggestions = [
        "AI-Powered Legal Assistant",
        "Sustainable Supply Chain Tracker",
        "Peer-to-Peer Skill Sharing",
        "Smart City Traffic Control"
    ];

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden bg-white text-gray-900 selection:bg-gray-900 selection:text-white font-sans">

            {/* Background Decor - Subtle Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>

            {/* Navbar */}
            <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-gray-900">
                    <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-900/20">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <span>Hackathon Copilot</span>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <span className="cursor-pointer hover:text-gray-900 transition-colors">How it works</span>
                    <span className="cursor-pointer hover:text-gray-900 transition-colors">Features</span>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-900">
                        <GitGraph className="w-4 h-4" /> GitHub
                    </a>
                </div>
            </nav>

            {/* Hero Content */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center z-10 pt-10 pb-20">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold text-gray-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:border-gray-300 transition-colors cursor-default">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>The secret weapon for winning hackathons</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 leading-[1.1]">
                    From Idea to <br className="hidden sm:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-gradient-x">Winning Demo.</span>
                </h1>

                <p className="text-lg sm:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    Describe your problem statement. We'll generate the perfect workflow, tools, and prompts to build it in 48 hours.
                </p>

                {/* Input Interactive Area */}
                <div className="w-full max-w-2xl mx-auto relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 z-20">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-200 via-gray-100 to-violet-200 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>

                    <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2 focus-within:ring-2 focus-within:ring-gray-900/5 focus-within:border-gray-900/10 transition-all">
                        <div className="flex-1 w-full relative">
                            <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Paste your specific problem statement here..."
                                className="w-full h-14 pl-12 pr-4 bg-transparent border-none text-gray-900 placeholder:text-gray-400 focus:ring-0 text-lg font-medium"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto mt-2 sm:mt-0 bg-gray-900 hover:bg-black text-white h-12 px-8 rounded-xl font-semibold text-base transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
                        >
                            Start Project <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </button>
                    </form>

                    {/* Quick Suggestions */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2 opacity-0 animate-in fade-in duration-700 delay-500 fill-mode-forwards">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mr-2 py-1.5">Try:</span>
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(s)}
                                className="px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600 hover:bg-white hover:border-gray-300 hover:text-gray-900 hover:shadow-sm transition-all"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feature Grid / Social Proof */}
                <div className="w-full max-w-6xl mx-auto mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <FeatureCard
                        icon={<Zap className="w-6 h-6 text-violet-600" />}
                        title="Instant Strategy"
                        desc="Get a tailored roadmap from Ideation to Pitch Deck in seconds."
                    />
                    <FeatureCard
                        icon={<LayoutTemplate className="w-6 h-6 text-blue-600" />}
                        title="Best-in-Class Tools"
                        desc="Curated recommendations for the exact tech stack you need."
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-6 h-6 text-amber-500" />}
                        title="10x Prompts"
                        desc="Copy-paste prompts engineered for GPT-4, Midjourney, and more."
                    />
                </div>

                {/* Recent Projects (Minimal) */}
                {recentProjects.length > 0 && (
                    <div className="absolute top-24 right-6 sm:right-12 z-20 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-lg p-3 max-w-xs">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Resume Work</h3>
                            <div className="space-y-1">
                                {recentProjects.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => onResumeProject?.(p)}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center justify-between group transition-colors"
                                    >
                                        <span className="truncate max-w-[120px]">{p.name || "Untitled"}</span>
                                        <span className="text-xs text-gray-400 group-hover:text-gray-600 flex items-center gap-1">
                                            {p.timeLeft}h <Clock className="w-3 h-3" />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center bg-gray-50/50 hover:bg-white p-6 rounded-2xl border border-transparent hover:border-gray-200 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">{desc}</p>
        </div>
    );
}
