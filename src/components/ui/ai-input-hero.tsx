"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Code2, Sparkles, Zap, LayoutTemplate, GitGraph, Box, Clock } from "lucide-react";
import { store, Project } from "../../lib/store";

import { User } from "../../lib/firebase";

export type HeroWaveProps = {
    onPromptSubmit?: (value: string) => void;
    onResumeProject?: (project: Project) => void;
    onOpenGuide?: () => void;
    onOpenFeatures?: () => void;
    onOpenHowItWorks?: () => void;
    onOpenFAQ?: () => void;
    onOpenResources?: () => void;
    onOpenCaseStudies?: () => void;
    user?: User | null;
    onLogin?: () => void;
    onLogout?: () => void;
};

export function HeroWave({ 
    onPromptSubmit, 
    onResumeProject, 
    onOpenGuide, 
    onOpenFeatures, 
    onOpenHowItWorks, 
    onOpenFAQ, 
    onOpenResources, 
    onOpenCaseStudies,
    user,
    onLogin,
    onLogout
}: HeroWaveProps) {
    const [prompt, setPrompt] = useState("");
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchRecent = async () => {
            const projects = await store.getProjects();
            setRecentProjects(projects.slice(0, 3));
        };
        fetchRecent();
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPromptSubmit?.(prompt);
    };

    const allSuggestions = [
        { label: "AI-Powered Legal Assistant", category: "AI" },
        { label: "Sustainable Supply Chain", category: "Social Good" },
        { label: "Peer-to-Peer Skill Sharing", category: "Education" },
        { label: "Smart City Traffic Control", category: "AI" },
        { label: "Remote Patient Monitoring", category: "HealthTech" },
        { label: "Personal Investment Assistant", category: "FinTech" },
        { label: "AI Tutor for Competitive Exams", category: "EdTech" },
        { label: "Disaster Relief Coordinator", category: "Social Good" },
        { label: "Multiplayer Quiz with Rewards", category: "Gaming" },
        { label: "Smart Product Recommendations", category: "E-Commerce" },
        { label: "AI Crop Disease Detection", category: "AgriTech" },
        { label: "Virtual Property Tours AR", category: "RealEstate" }
    ];

    const [showAllSuggestions, setShowAllSuggestions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(allSuggestions.map(s => s.category)));

    const filteredSuggestions = allSuggestions.filter(s =>
        !selectedCategory || s.category === selectedCategory
    );

    const displayedSuggestions = showAllSuggestions ? filteredSuggestions : filteredSuggestions.slice(0, 4);

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden bg-white text-gray-900 selection:bg-gray-900 selection:text-white font-sans">

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#e5e7eb,transparent)]"></div>
            </div>

            {/* Navbar */}
            <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-3 font-bold text-lg sm:text-xl tracking-tight text-gray-900">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-900/20">
                        <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span>Hackathon Copilot</span>
                </div>
                <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <button onClick={onOpenHowItWorks} className="hover:text-gray-900 transition-colors">How it Works</button>
                    <button onClick={onOpenFeatures} className="hover:text-gray-900 transition-colors">Features</button>
                    <button onClick={onOpenResources} className="hover:text-gray-900 transition-colors">Resources</button>
                    <button onClick={onOpenCaseStudies} className="hover:text-gray-900 transition-colors">Success Stories</button>
                    <button onClick={onOpenGuide} className="hover:text-gray-900 transition-colors">Guide</button>
                    <button onClick={onOpenFAQ} className="hover:text-gray-900 transition-colors">FAQ</button>
                    <div className="h-4 w-px bg-gray-200 mx-2" />
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user.photoURL && <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-gray-200" />}
                                <span className="text-gray-900 font-bold">{user.displayName?.split(' ')[0]}</span>
                            </div>
                            <button onClick={onLogout} className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button onClick={onLogin} className="px-6 py-2 rounded-full bg-gray-900 hover:bg-black text-white font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
                            Sign In
                        </button>
                    )}
                    <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" title="View on GitHub" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-900 group">
                        <GitGraph className="w-4 h-4 group-hover:rotate-12 transition-transform" /> GitHub
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
                <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 leading-[1.1] text-gray-900">
                    From Idea to <br className="hidden sm:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900">Winning Demo.</span>
                </h1>

                <p className="text-lg sm:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    Describe your problem statement. We'll generate the perfect workflow, tools, and prompts to build it in 48 hours.
                </p>

                {/* Input Interactive Area */}
                <div className="w-full max-w-2xl mx-auto relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 z-20">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>

                    <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-2 focus-within:ring-2 focus-within:ring-gray-900/5 transition-all">
                        <div className="flex-1 relative">
                            <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Paste your problem statement..."
                                className="w-full h-14 sm:h-16 pl-12 pr-4 bg-transparent border-none text-gray-900 placeholder:text-gray-400 focus:ring-0 text-base sm:text-lg font-medium"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-black text-white h-12 sm:h-auto py-4 px-8 rounded-xl sm:rounded-2xl font-bold text-base transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
                        >
                            Start Project <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Category Filters */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2 opacity-0 animate-in fade-in duration-700 delay-500 fill-mode-forwards">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${!selectedCategory ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Quick Suggestions */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-0 animate-in fade-in duration-700 delay-500 fill-mode-forwards">
                        {displayedSuggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(s.label)}
                                className="px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600 hover:bg-white hover:border-gray-300 hover:text-gray-900 transition-all"
                            >
                                {s.label}
                            </button>
                        ))}
                        {filteredSuggestions.length > 4 && (
                            <button
                                onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                                className="px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100 text-xs font-bold text-gray-900 hover:bg-gray-100 transition-all"
                            >
                                {showAllSuggestions ? "Show Less" : `+${filteredSuggestions.length - 4} More`}
                            </button>
                        )}
                    </div>
                </div>

                {/* Feature Grid / Social Proof */}
                <div className="w-full max-w-6xl mx-auto mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <FeatureCard
                        icon={<Zap className="w-6 h-6 text-gray-900" />}
                        title="Instant Strategy"
                        desc="Get a tailored roadmap from Ideation to Pitch Deck in seconds."
                    />
                    <FeatureCard
                        icon={<LayoutTemplate className="w-6 h-6 text-gray-900" />}
                        title="Best-in-Class Tools"
                        desc="Curated recommendations for the exact tech stack you need."
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-6 h-6 text-amber-500" />}
                        title="10x Prompts"
                        desc="Copy-paste prompts engineered for GPT-4, Midjourney, and more."
                    />
                </div>

                {/* Setup Guide Section */}
                <div className="w-full max-w-4xl mx-auto mt-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                        <div className="p-8 md:p-12 border-b border-gray-100">
                            <h2 className="text-3xl font-bold mb-4">Setup Guide</h2>
                            <p className="text-gray-500 text-lg">
                                Ready to build? Initialize the Antigravity engine in three simple steps.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-8 font-mono text-sm md:text-base overflow-x-auto">
                            <div className="flex flex-col gap-6">
                                <div className="group">
                                    <div className="flex items-center gap-2 text-gray-500 mb-2 select-none">
                                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                                        <span>Step 1: Clone Repository</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 group-hover:border-gray-600 transition-colors">
                                        <code className="text-blue-400">git clone https://github.com/antigravity/engine.git</code>
                                        <button className="text-gray-500 hover:text-white transition-colors">
                                            <Box className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="flex items-center gap-2 text-gray-500 mb-2 select-none">
                                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                                        <span>Step 2: Install</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 group-hover:border-gray-600 transition-colors">
                                        <code className="text-green-400">npm install</code>
                                        <span className="text-gray-600 text-xs">20s</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="flex items-center gap-2 text-gray-500 mb-2 select-none">
                                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                                        <span>Step 3: Launch</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 group-hover:border-gray-600 transition-colors">
                                        <code className="text-yellow-400">npm run dev</code>
                                        <span className="text-gray-600 text-xs">Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Projects (Minimal) */}
                {recentProjects.length > 0 && (
                    <div className="relative sm:absolute sm:top-24 sm:right-12 z-20 mt-8 sm:mt-0 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-4 max-w-sm mx-auto sm:mx-0">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-1">Resume Work</h3>
                            <div className="space-y-2">
                                {recentProjects.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => onResumeProject?.(p)}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all flex items-center justify-between group bg-gray-50/50"
                                    >
                                        <span className="truncate max-w-[150px] font-bold text-gray-800">{p.name || "Untitled"}</span>
                                        <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 flex items-center gap-1 transition-colors">
                                            {p.timeLeft}h <Clock className="w-3.5 h-3.5" />
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
