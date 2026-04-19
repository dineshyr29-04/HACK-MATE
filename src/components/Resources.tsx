import { ArrowLeft, FileText, Download, Code2, Presentation, Play, GitBranch, Lightbulb, Palette } from "lucide-react";

export function Resources({ onBack }: { onBack: () => void }) {
    const resourceCategories = [
        {
            title: "Ideation & Market Research",
            icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
            items: [
                { name: "Problem Statement Format", type: "PDF", path: "/resources/ideation/problem-statement.pdf" },
                { name: "Competitive Analysis Framework", type: "PDF", path: "/resources/ideation/competitive-analysis.pdf" },
                { name: "User Persona Template", type: "PDF", path: "/resources/ideation/user-persona.pdf" },
                { name: "Market Size Guide", type: "PDF", path: "/resources/ideation/market-size.pdf" }
            ]
        },
        {
            title: "UI/UX Design",
            icon: <Palette className="w-6 h-6 text-gray-900" />,
            items: [
                { name: "Mobile App Wireframe Guide", type: "PDF", path: "/resources/design/wireframe-kit.pdf" },
                { name: "Web Dashboard Layouts", type: "PDF", path: "/resources/design/dashboard-layout.pdf" },
                { name: "Color Palette Guide", type: "PDF", path: "/resources/design/color-palette-guide.pdf" },
                { name: "Aesthetics Best Practices", type: "PDF", path: "/resources/design/aesthetics.pdf" }
            ]
        },
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
        <div className="min-h-screen bg-gray-50/50">
            <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                            <Code2 className="w-4 h-4" />
                        </div>
                        <span>Resource Library</span>
                    </div>
                    <div className="w-24" />
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-20">
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">The Ultimate <br /><span className="text-black">Resource Library.</span></h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Download pre-vetted templates, boilerplates, and guides to skip the busywork and start building.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {resourceCategories.map((cat, i) => (
                        <div key={i} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                                    {cat.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{cat.title}</h2>
                            </div>
                            <div className="space-y-3">
                                {cat.items.map((item, j) => (
                                    <div key={j} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <FileText className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                                            <span className="font-bold text-gray-700 group-hover:text-black">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg border border-gray-100 text-gray-400 group-hover:border-gray-200 group-hover:text-gray-900">{item.type}</span>
                                            <a
                                                href={item.path}
                                                download={item.name + ".pdf"}
                                                className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-black hover:text-black transition-all"
                                                title={`Download ${item.name}`}
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

                <div className="mt-20 p-12 bg-gray-900 rounded-[3rem] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <GitBranch className="w-64 h-64 rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-4">Missing something?</h2>
                        <p className="text-gray-400 text-xl mb-8 max-w-lg font-medium">We're constantly adding new templates. Request a resource or even better—contribute your own winning template to the community!</p>
                        <div className="flex gap-4">
                            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all">Request Template</button>
                            <button className="bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-700 transition-all">Contribute on GitHub</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
