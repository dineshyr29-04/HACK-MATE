// Cache-busting comment: Final Verified Version 2.0
import { ArrowLeft, FileText, Download, Code2, Presentation, Play, GitBranch, Lightbulb, Palette } from "lucide-react";

export function Resources({ onBack }: { onBack: () => void }) {
    const resourceCategories = [
        {
            title: "Ideation & Market Research",
            icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
            items: [
                { name: "Problem Statement Format", type: "MD", path: "/resources/ideation/problem-statement.md" },
                { name: "Competitive Analysis Framework", type: "MD", path: "/resources/ideation/competitive-analysis.md" },
                { name: "User Persona Template", type: "MD", path: "/resources/ideation/user-persona.md" },
                { name: "Market Sizing Guide", type: "MD", path: "/resources/ideation/market-size.md" },
            ]
        },
        {
            title: "Design & Aesthetics",
            icon: <Palette className="w-6 h-6 text-indigo-500" />,
            items: [
                { name: "Color Palette Guide", type: "MD", path: "/resources/design/color-palette-guide.md" },
                { name: "Dashboard Layout Rules", type: "MD", path: "/resources/design/dashboard-layout.md" },
                { name: "Modern Aesthetics Checklist", type: "MD", path: "/resources/design/aesthetics.md" },
                { name: "Wireframe Kit (SVG)", type: "MD", path: "/resources/design/wireframe-kit.md" },
            ]
        },
        {
            title: "Boilerplates & Schemas",
            icon: <Code2 className="w-6 h-6 text-gray-900" />,
            items: [
                { name: "Vite + React Starter", type: "MD", path: "/resources/boilerplates/vite-react-starter.md" },
                { name: "Supabase Schema Template", type: "MD", path: "/resources/boilerplates/supabase-schema.md" },
                { name: "Next.js + Tailwind Boilerplate", type: "MD", path: "/resources/boilerplates/nextjs-tailwind.md" },
                { name: "Python Flask + OpenAI Kit", type: "MD", path: "/resources/boilerplates/python-flask-openai.md" },
            ]
        },
        {
            title: "Pitch & Presentation",
            icon: <Presentation className="w-6 h-6 text-red-500" />,
            items: [
                { name: "Winning Pitch Deck Structure", type: "MD", path: "/resources/pitch/winning-pitch-deck.md" },
                { name: "3-Min Pitch Script", type: "MD", path: "/resources/pitch/pitch-script.md" },
                { name: "Judge QA Prep Guide", type: "MD", path: "/resources/pitch/judge-faq.md" },
                { name: "Final Presentation Checklist", type: "MD", path: "/resources/pitch/presentation-checklist.md" },
            ]
        },
        {
            title: "Submission & GitHub",
            icon: <Play className="w-6 h-6 text-emerald-500" />,
            items: [
                { name: "GitHub README Template", type: "MD", path: "/resources/submission/readme-template.md" },
                { name: "Demo Video Script", type: "MD", path: "/resources/submission/demo-video-script.md" },
                { name: "Final Submission Checklist", type: "MD", path: "/resources/submission/submission-checklist.md" },
                { name: "Git Workflow for Teams", type: "MD", path: "/resources/submission/github-setup.md" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-transparent">
            {/* Glassmorphic Navbar */}
            <nav className="sticky top-0 w-full z-[100] border-b border-gray-100/50 bg-white/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all font-bold group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                    </button>
                    <div className="flex items-center gap-3 font-black text-xl tracking-tight text-gray-900">
                        <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Code2 className="w-4 h-4" />
                        </div>
                        <span>Resource Library</span>
                    </div>
                    <div className="w-24" />
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-24 relative">
                {/* Background Decor */}
                <div className="absolute top-20 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute bottom-40 left-0 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl -z-10 animate-float-delayed" />

                <div className="text-center mb-24">
                    <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter">
                        The Master <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900">Resource Vault.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Everything you need to build at lightspeed. Download pre-vetted templates and boilerplates.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {resourceCategories.map((cat, i) => (
                        <div key={i} className="bg-white/40 backdrop-blur-sm border border-gray-100 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:bg-white hover:border-gray-200 transition-all duration-500 group">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    {cat.icon}
                                </div>
                                <h2 className="text-2xl font-black text-gray-900">{cat.title}</h2>
                            </div>
                            <div className="space-y-4">
                                {cat.items.map((item, j) => (
                                    <div key={j} className="flex items-center justify-between p-5 bg-white/50 rounded-[2rem] border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/20 transition-all group/item">
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover/item:text-gray-900 group-hover/item:bg-indigo-50 transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-gray-600 group-hover/item:text-gray-900 transition-colors">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover/item:text-indigo-400">{item.type}</span>
                                            <a
                                                href={item.path}
                                                download={item.name + ".md"}
                                                className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-900/10 hover:bg-black hover:scale-110 transition-all opacity-0 group-hover/item:opacity-100"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 p-16 bg-gray-900 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-4xl font-black mb-6">Need a custom boilerplate?</h2>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed">We're constantly updating our vault. Contribute your winning templates or request a specific stack on our GitHub.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black hover:bg-indigo-50 hover:scale-[1.02] transition-all shadow-xl">Contact Support</button>
                            <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="px-10 py-5 bg-gray-800 text-white rounded-2xl font-black hover:bg-gray-700 transition-all text-center">GitHub Hub</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
