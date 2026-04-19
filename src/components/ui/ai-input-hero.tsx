"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Code2, Sparkles, Zap, LayoutTemplate, GitGraph, Box, Clock, Trash2, CheckCircle2, ChevronRight, ShieldCheck, PlayCircle } from "lucide-react";
import { store, Project } from "../../lib/store";
import { User as FirebaseUser } from "../../lib/firebase";

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
    user?: FirebaseUser | null;
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
    onLogin,
    onLogout
}: HeroWaveProps) {
    const [prompt, setPrompt] = useState<string>("");
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const fetchRecent = async () => {
        const projects = await store.getProjects();
        setRecentProjects(projects.slice(0, 3));
    };

    useEffect(() => {
        fetchRecent();
        const handleUpdate = () => { fetchRecent(); };
        window.addEventListener('project-list-updated', handleUpdate);
        return () => window.removeEventListener('project-list-updated', handleUpdate);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPromptSubmit?.(prompt);
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-white text-gray-900 selection:bg-gray-900 selection:text-white font-sans">
            
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-[120px] opacity-60 animate-float" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] opacity-40 animate-float-delayed" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 w-full z-[100] border-b border-gray-100/50 bg-white/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-black text-lg sm:text-xl tracking-tight text-gray-900 hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span>Hackathon Copilot</span>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-500">
                        <button onClick={onOpenFeatures} className="hover:text-gray-900 transition-colors">Features</button>
                        <button onClick={onOpenResources} className="hover:text-gray-900 transition-colors">Resources</button>
                        <button onClick={onOpenCaseStudies} className="hover:text-gray-900 transition-colors">Success Stories</button>
                        
                        <div className="h-6 w-px bg-gray-200 mx-1" />
                        
                        {user ? (
                            <div className="flex items-center gap-4 pl-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                                    {user.photoURL && <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />}
                                    <span className="text-gray-900 font-bold">{user.displayName?.split(' ')[0]}</span>
                                </div>
                                <button onClick={onLogout} className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest font-black">Sign Out</button>
                            </div>
                        ) : (
                            <button onClick={onLogin} className="px-6 py-2 rounded-full bg-gray-900 hover:bg-black text-white font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
                                Sign In
                            </button>
                        )}
                    </div>

                    <div className="lg:hidden flex items-center gap-3">
                         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-900 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-current rounded-full transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 shadow-2xl' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 space-y-4">
                        <button onClick={onOpenFeatures} className="block w-full text-left font-black text-gray-900">Features</button>
                        <button onClick={onOpenResources} className="block w-full text-left font-black text-gray-900">Resources</button>
                        <button onClick={onOpenCaseStudies} className="block w-full text-left font-black text-gray-900">Success Stories</button>
                        {!user ? (
                            <button onClick={onLogin} className="w-full py-3 bg-gray-900 text-white rounded-xl font-black">Sign In</button>
                        ) : (
                            <button onClick={onLogout} className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-black">Sign Out</button>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center">
                
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Trusted by 100+ builders this month
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-8 text-center text-gray-900 leading-[0.9]">
                    Build your <br className="hidden sm:block" />
                    <span className="text-gray-400">Winning</span> Demo.
                </h1>

                <p className="text-xl sm:text-2xl text-gray-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium text-center">
                    The AI copilot that takes your problem statement and generates a step-by-step technical roadmap in seconds.
                </p>

                <div className="w-full max-w-3xl relative mb-24">
                    <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-2.5 focus-within:ring-4 focus-within:ring-gray-50 transition-all">
                        <div className="flex-1 relative">
                            <Zap className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-500" />
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Paste your hackathon problem statement here..."
                                className="w-full h-16 sm:h-20 pl-16 pr-4 bg-transparent border-none text-gray-900 placeholder:text-gray-400 focus:ring-0 text-lg sm:text-xl font-bold"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-black text-white px-12 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20"
                        >
                            Build Roadmap <ArrowRight className="w-6 h-6" />
                        </button>
                    </form>
                    
                    {/* Visual Outcome Hint */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                         <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Technical Stack</div>
                         <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Step-by-Step Tasks</div>
                         <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Pitch Deck Template</div>
                    </div>
                </div>

                {/* How It Works (Proof of Value) */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 border-t border-gray-100 pt-32">
                    <div className="text-center md:text-left space-y-4">
                        <h2 className="text-4xl font-black text-gray-900">How it works.</h2>
                        <p className="text-gray-400 font-medium text-lg leading-relaxed">Three steps to the finish line.</p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { step: "01", title: "Scan Problem", desc: "Our AI breaks down complex hackathon PDF statements into actionable tasks." },
                            { step: "02", title: "Build Strategy", desc: "Select from curated tech stacks, boilercodes, and pitch deck templates." },
                            { step: "03", title: "Ship Demo", desc: "Track progress in real-time and export your project for the final submission." }
                        ].map((s, idx) => (
                            <div key={idx} className="p-8 rounded-[2rem] bg-gray-50/50 border border-transparent hover:border-gray-200 transition-all group">
                                <div className="text-4xl font-black text-gray-200 group-hover:text-gray-900 transition-colors mb-6">{s.step}</div>
                                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Proof Section */}
                <div className="w-full mt-40 space-y-20">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h2 className="text-4xl font-black">Winning builds.</h2>
                        <p className="text-gray-400 text-lg font-medium">Real projects shipped using Hackathon Copilot.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Demo Project */}
                        <div className="bg-gray-900 rounded-[3rem] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-0" />
                            <div className="z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest mb-8">
                                    <Sparkles className="w-3 h-3" /> Latest Winner
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black mb-6">EcoTrack AI</h3>
                                <p className="text-gray-400 text-lg font-medium mb-10 max-w-md">Winner of Sustain-a-thon 2024. Built from ideation to deployment in 18 hours using our React + Supabase blueprint.</p>
                                <button className="flex items-center gap-2 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                                    View Project <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <img src="https://api.dicebear.com/7.x/shapes/svg?seed=ecotrack" className="absolute -bottom-20 -right-20 w-64 h-64 opacity-20 filter invert group-hover:scale-110 transition-transform duration-1000" alt="" />
                        </div>

                        {/* Testimonial */}
                        <div className="bg-white border-2 border-gray-100 rounded-[3rem] p-8 md:p-12 flex flex-col justify-between">
                            <div className="space-y-6 text-2xl md:text-3xl font-black leading-tight">
                                "We were struggling with the backend architecture, but Hackathon Copilot's roadmap guided us in less than 5 minutes. Best investment for our team."
                            </div>
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-8 mt-12">
                                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-gray-400">AJ</div>
                                <div>
                                    <div className="font-black text-gray-900">Arjun J.</div>
                                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Fullstack Lead @ Team Horizon</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Projects Indicator (Polished) */}
                {recentProjects.length > 0 && (
                    <div className="fixed bottom-8 right-8 z-[100] hidden sm:block animate-in slide-in-from-bottom-10 duration-700">
                        <div className="bg-gray-900 text-white rounded-[2rem] p-6 shadow-2xl border border-white/10 w-72">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 px-1">Active Roadmap</h4>
                             <div className="space-y-3">
                                {recentProjects.map((p: Project) => (
                                    <div key={p.id} className="group/item relative">
                                        <button onClick={() => onResumeProject?.(p)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all text-left">
                                            <span className="font-black text-sm truncate max-w-[140px] uppercase tracking-tighter">{p.name || "Untitled"}</span>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover/item:text-white group-hover/item:translate-x-1 transition-all" />
                                        </button>
                                        <button onClick={() => onDeleteProject?.(p.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-lg hover:bg-red-600">
                                            <Trash2 className="w-3 h-3 text-white" />
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
