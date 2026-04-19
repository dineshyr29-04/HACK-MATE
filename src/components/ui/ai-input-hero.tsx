"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Code2, Sparkles, Zap, LayoutTemplate, GitGraph, Box, Clock, Trash2 } from "lucide-react";
import { store, Project } from "../../lib/store";

import { User } from "../../lib/firebase";

export type HeroWaveProps = {
    onPromptSubmit?: (value: string) => void;
    onResumeProject?: (project: Project) => void;
    onDeleteProject?: (projectId: string) => void;
    onOpenGuide?: () => void;
    onOpenFeatures?: () => void;
    onOpenHowItWorks?: () => void;
    onOpenFAQ?: () => void;
    onOpenResources?: () => void;
    onOpenCaseStudies?: () => void;
    user?: User | null;
    onJoinTeam?: (teamId: string) => void;
    onLogin?: () => void;
    onLogout?: () => void;
};

export function HeroWave({ 
    onPromptSubmit, 
    onResumeProject, 
    onDeleteProject,
    onOpenGuide, 
    onOpenFeatures, 
    onOpenHowItWorks, 
    onOpenFAQ, 
    onOpenResources, 
    onOpenCaseStudies,
    user,
    onJoinTeam,
    onLogin,
    onLogout
}: HeroWaveProps) {
    const [prompt, setPrompt] = useState("");
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [teamIdInput, setTeamIdInput] = useState("");

    const fetchRecent = async () => {
        const projects = await store.getProjects();
        setRecentProjects(projects.slice(0, 3));
    };

    useEffect(() => {
        fetchRecent();
        
        // Listen for internal refresh events
        window.addEventListener('project-list-updated', fetchRecent);
        return () => window.removeEventListener('project-list-updated', fetchRecent);
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
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-[120px] opacity-60 animate-float" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] opacity-40 animate-float-delayed" />
                <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-indigo-50/20 rounded-full blur-[110px] opacity-30 animate-float" />
            </div>

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f8f8f8_1px,transparent_1px),linear-gradient(to_bottom,#f8f8f8_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(229,231,235,0.2),transparent)]"></div>
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 w-full z-[100] border-b border-gray-100/50 bg-white/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-bold text-lg sm:text-xl tracking-tight text-gray-900 hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-900/20">
                            <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600 font-black">Hackathon Copilot</span>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-500">
                        <button onClick={onOpenHowItWorks} className="hover:text-gray-900 transition-colors relative group">
                            How it Works
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full" />
                        </button>
                        <button onClick={onOpenFeatures} className="hover:text-gray-900 transition-colors relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full" />
                        </button>
                        <button onClick={onOpenResources} className="hover:text-gray-900 transition-colors relative group">
                            Resources
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full" />
                        </button>
                        <button onClick={onOpenCaseStudies} className="hover:text-gray-900 transition-colors relative group">
                            Success Stories
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full" />
                        </button>
                        
                        <div className="h-6 w-px bg-gray-200 mx-1" />
                        
                        {user ? (
                            <div className="flex items-center gap-4 pl-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm">
                                    {user.photoURL && <img src={user.photoURL} alt={user.displayName || ""} className="w-6 h-6 rounded-full" />}
                                    <span className="text-gray-900 font-bold">{user.displayName?.split(' ')[0]}</span>
                                </div>
                                <button onClick={onLogout} className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider font-bold">
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button onClick={onLogin} className="px-6 py-2 rounded-full bg-gray-900 hover:bg-black text-white font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
                                Sign In
                            </button>
                        )}
                        <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all text-gray-900">
                            <GitGraph className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile Menu Toggle & Auth */}
                    <div className="lg:hidden flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden shadow-inner">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-black text-indigo-400">{user.displayName?.[0]}</span>
                                    )}
                                </div>
                                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-900 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-5 h-4 flex flex-col justify-between">
                                        <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                        <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                                        <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button onClick={onLogin} className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all">
                                    Sign In
                                </button>
                                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-900 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-5 h-4 flex flex-col justify-between">
                                        <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                        <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                                        <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-gray-100 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100 shadow-2xl' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 space-y-2">
                        {[
                            { label: 'How it Works', icon: <Zap className="w-4 h-4" />, action: onOpenHowItWorks },
                            { label: 'Features', icon: <LayoutTemplate className="w-4 h-4" />, action: onOpenFeatures },
                            { label: 'Resources', icon: <Code2 className="w-4 h-4" />, action: onOpenResources },
                            { label: 'Success Stories', icon: <Sparkles className="w-4 h-4" />, action: onOpenCaseStudies },
                            { label: 'Guide', icon: <GitGraph className="w-4 h-4" />, action: onOpenGuide },
                            { label: 'FAQ', icon: <div className="font-bold">?</div>, action: onOpenFAQ }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    item.action?.();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                                        {item.icon}
                                    </div>
                                    <span className="font-black text-gray-900">{item.label}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                        
                        {user && (
                            <div className="pt-6 mt-4 border-t border-gray-100">
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-black"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                        <ArrowRight className="w-5 h-5 rotate-180" />
                                    </div>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center z-10 pt-16 pb-32">

                {/* Status Indicator */}
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live: 42 builders currently planning</span>
                    </div>
                </div>

                {/* Milestone Badge (Enhanced) */}
                <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-xs font-semibold text-gray-600 mb-10 transition-all hover:border-gray-300 hover:shadow-xl group cursor-default">
                    <div className="flex -space-x-2.5">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 42}`} alt="user" className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 h-4">
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-900 font-black">100+</span>
                            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Builders</span>
                        </div>
                        <div className="w-px h-full bg-gray-100" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-900 font-black">4+</span>
                            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Countries</span>
                        </div>
                        <div className="w-px h-full bg-gray-100" />
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600">
                            <span className="font-black">1 Month</span>
                            <Sparkles className="w-3 h-3 fill-amber-500" />
                        </div>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 leading-[1.1] text-gray-900">
                    From Idea to <br className="hidden sm:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-300% animate-gradient">Winning Demo.</span>
                </h1>

                <p className="text-lg sm:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    The ultimate copilot for your next hackathon. We build the roadmap, you build the future.
                </p>

                {/* Input Interactive Area */}
                <div className="w-full max-w-2xl mx-auto relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 z-20">
                    <div className="absolute -inset-0.5 bg-gray-200 rounded-[2rem] blur-sm opacity-20 group-hover:opacity-30 transition duration-500"></div>

                    {!isJoining ? (
                        <>
                            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 p-2 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                                <div className="flex-1 relative">
                                    <Box className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Paste your problem statement..."
                                        className="w-full h-14 sm:h-16 pl-14 pr-4 bg-transparent border-none text-gray-900 placeholder:text-gray-400 focus:ring-0 text-base sm:text-lg font-medium"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gray-900 hover:bg-black text-white h-12 sm:h-auto py-4 px-10 rounded-xl sm:rounded-full font-bold text-base transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20"
                                >
                                    Start Project <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                            <div className="mt-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="text-gray-300">Joined a team?</span>
                                <button 
                                    onClick={() => setIsJoining(true)}
                                    className="text-indigo-500 hover:text-indigo-600 underline underline-offset-8"
                                >
                                    Enter Team ID
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="relative z-10 animate-in zoom-in-95 duration-300">
                            <form onSubmit={(e) => { e.preventDefault(); onJoinTeam?.(teamIdInput); }} className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 p-2 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                                <div className="flex-1 relative">
                                    <Code2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={teamIdInput}
                                        onChange={(e) => setTeamIdInput(e.target.value.toUpperCase())}
                                        placeholder="Enter Team ID (e.g. HM-A1B2)"
                                        className="w-full h-14 sm:h-16 pl-14 pr-4 bg-transparent border-none text-gray-900 placeholder:text-gray-200 focus:ring-0 text-lg font-black tracking-[0.2em] uppercase"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 sm:h-auto py-4 px-10 rounded-xl sm:rounded-full font-bold text-base transition-all"
                                >
                                    Join
                                </button>
                            </form>
                            <button 
                                onClick={() => setIsJoining(false)}
                                className="mt-4 text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest text-center block mx-auto"
                            >
                                ← Back to Project Idea
                            </button>
                        </div>
                    )}

                    {/* Category Filters */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2 opacity-0 animate-in fade-in duration-700 delay-500 fill-mode-forwards">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${!selectedCategory ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${selectedCategory === cat ? 'bg-gray-700 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Quick Suggestions */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2 opacity-0 animate-in fade-in duration-700 delay-500 fill-mode-forwards">
                        {displayedSuggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(s.label)}
                                className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-xs font-bold text-gray-500 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                {s.label}
                            </button>
                        ))}
                        {filteredSuggestions.length > 4 && (
                            <button
                                onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                                className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-black uppercase text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all"
                            >
                                {showAllSuggestions ? "Less" : `+${filteredSuggestions.length - 4} Ideas`}
                            </button>
                        )}
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="w-full max-w-6xl mx-auto mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
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
                <div className="w-full max-w-4xl mx-auto mt-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden">
                        <div className="p-10 md:p-14 border-b border-gray-50">
                            <h2 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">Fast-Track Setup</h2>
                            <p className="text-gray-400 text-lg max-w-xl mx-auto">
                                Initialize the Hackathon Copilot engine in three commands and start building immediately.
                            </p>
                        </div>
                        <div className="bg-gray-950 p-10 font-mono text-sm md:text-base overflow-x-auto relative">
                            <div className="absolute top-4 right-6 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                            <div className="flex flex-col gap-8 text-left max-w-2xl mx-auto">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-white">01</span>
                                        Clone
                                    </div>
                                    <code className="block p-4 rounded-xl bg-white/5 text-gray-300 border border-white/5">git clone https://github.com/hackmate/engine.git</code>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-white">02</span>
                                        Install
                                    </div>
                                    <code className="block p-4 rounded-xl bg-white/5 text-emerald-400 border border-white/5">npm install <span className="text-gray-600"># takes ~20s</span></code>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-white">03</span>
                                        Launch
                                    </div>
                                    <code className="block p-4 rounded-xl bg-white/[0.08] text-amber-400 border border-white/10 shadow-[0_0_30px_rgba(251,191,36,0.1)]">npm run dev</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Projects (Minimal Floating) */}
                {recentProjects.length > 0 && (
                    <div className="relative sm:absolute sm:top-32 sm:right-8 z-20 mt-12 sm:mt-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                        <div className="bg-white/90 backdrop-blur-2xl border border-white/20 shadow-xl rounded-[2rem] p-6 w-full max-w-xs mx-auto sm:mx-0">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 px-1">Resume Building</h3>
                            <div className="space-y-3">
                                {recentProjects.map((p: Project) => (
                                    <div key={p.id} className="group/card relative">
                                        <button
                                            onClick={() => onResumeProject?.(p)}
                                            className="w-full text-left px-5 py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-between group bg-gray-50/30 border border-transparent hover:border-gray-100"
                                        >
                                            <span className="truncate max-w-[120px] font-black text-gray-800 text-sm">{p.name || "New Project"}</span>
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white shadow-sm border border-gray-50">
                                                <span className="text-[10px] font-black text-gray-900">{p.timeLeft}h</span>
                                                <Clock className="w-2.5 h-2.5 text-gray-400" />
                                            </div>
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteProject?.(p.id);
                                            }}
                                            className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 text-gray-400 hover:text-red-500 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all active:scale-95"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
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
        <div className="flex flex-col items-center bg-white/40 backdrop-blur-sm hover:bg-white p-10 rounded-[2.5rem] border border-gray-50 hover:border-gray-200 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                {icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
        </div>
    );
}

