import { ArrowLeft, FileText, Download, Code2, Presentation, Play, GitBranch, Lightbulb, Palette } from "lucide-react";

export function Resources({ onBack }: { onBack: () => void }) {
    const resourceCategories = [
        {
            title: "Ideation & Market Research",
            icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
            items: [
                { name: "Problem Statement Format (1-page)", type: "PDF" },
                { name: "Competitive Analysis Spreadsheet", type: "XLSX" },
                { name: "User Persona Template", type: "FIGMA" },
                { name: "Market Size Calculator", type: "SHEETS" }
            ]
        },
        {
            title: "UI/UX Design",
            icon: <Palette className="w-6 h-6 text-gray-900" />,
            items: [
                { name: "Mobile App Wireframe Kit", type: "FIGMA" },
                { name: "Web Dashboard Layout", type: "FIGMA" },
                { name: "Hackathon Color Palette Guide", type: "PDF" },
                { name: "Free Presentation Mockups", type: "ZIP" }
            ]
        },
        {
            title: "Developer Boilerplates",
            icon: <Code2 className="w-6 h-6 text-green-500" />,
            items: [
                { name: "Next.js + TypeScript + Tailwind", type: "REPO" },
                { name: "Python Flask + OpenAI Template", type: "REPO" },
                { name: "Vite + React Starter Kit", type: "REPO" },
                { name: "Supabase DB Schema Boilerplate", type: "SQL" }
            ]
        },
        {
            title: "Pitch & Presentation",
            icon: <Presentation className="w-6 h-6 text-red-500" />,
            items: [
                { name: "Winning Pitch Deck (17 Slides)", type: "PPTX" },
                { name: "Pitch Script Template (2-min)", type: "DOCX" },
                { name: "Presentation Notes (Notion)", type: "LINK" },
                { name: "Judge FAQ Prep Sheet", type: "PDF" }
            ]
        },
        {
            title: "Submission & Demo",
            icon: <Play className="w-6 h-6 text-gray-900" />,
            items: [
                { name: "Demo Video Script", type: "DOCX" },
                { name: "Devpost Submission Checklist", type: "PDF" },
                { name: "README.md Template", type: "MD" },
                { name: "GitHub Project Board Setup", type: "LINK" }
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
                                            <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-black hover:text-black transition-all">
                                                <Download className="w-4 h-4" />
                                            </button>
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
