import { ArrowLeft, CheckCircle2, Workflow, Rocket, Lightbulb, Users, Code2, Presentation, Play } from "lucide-react";

export function HowItWorks({ onBack }: { onBack: () => void }) {
    const phases = [
        {
            title: "Ideation",
            desc: "Brainstorm features, UVP, and core problem to solve.",
            icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
            sub: "Hour 0-1: Use AI to refine your vision."
        },
        {
            title: "Market Research",
            desc: "Understand users, competitors, and market gap.",
            icon: <Users className="w-6 h-6 text-gray-400" />,
            sub: "Hour 1-2: Validate your assumptions."
        },
        {
            title: "UI/UX Design",
            desc: "Create wireframes, user flows, and design systems.",
            icon: <Workflow className="w-6 h-6 text-gray-900" />,
            sub: "Hour 2-4: High-fidelity prototypes in Figma."
        },
        {
            title: "Website/App Build",
            desc: "Code frontend + backend and deploy instantly.",
            icon: <Code2 className="w-6 h-6 text-green-500" />,
            sub: "Hour 4-18: The main development crunch."
        },
        {
            title: "Git & GitHub",
            desc: "Set up repo, commit often, and collaborate.",
            icon: <Rocket className="w-6 h-6 text-gray-700" />,
            sub: "Continuous: Best practices for version control."
        },
        {
            title: "PPT/Pitch Deck",
            desc: "Create a compelling 2-minute pitch for judges.",
            icon: <Presentation className="w-6 h-6 text-red-500" />,
            sub: "Hour 18-21: Narrative and slide design."
        },
        {
            title: "Demo & Submission",
            desc: "Record demo video and submit to platform.",
            icon: <Play className="w-6 h-6 text-gray-900" />,
            sub: "Hour 21-24: Final polish and recording."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
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
                        <span>How It Works</span>
                    </div>
                    <div className="w-24" /> {/* Spacer */}
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-20">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">The 7-Phase Hackathon Workflow</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We've mapped out the exact path to a winning project. Our tool guides you through each phase with specific tools and AI prompts.
                    </p>
                </div>

                {/* Visual Flowchart */}
                <div className="relative space-y-4">
                    {/* Vertical Line */}
                    <div className="absolute left-[31px] top-10 bottom-10 w-0.5 bg-gray-100 hidden sm:block" />

                    {phases.map((phase, i) => (
                        <div key={i} className="relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-900/10 hover:shadow-lg hover:shadow-gray-900/5 transition-all group animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-inner transition-colors border border-transparent group-hover:border-gray-100 z-10">
                                {phase.icon}
                            </div>
                            <div className="flex-1 pt-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">Phase {i + 1}</span>
                                    <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-3">{phase.desc}</p>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <CheckCircle2 className="w-4 h-4 text-gray-300" />
                                    {phase.sub}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-gray-900 rounded-[2.5rem] text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Skip the setup and start building. Our tool handles the strategy while you focus on the code.</p>
                    <button
                        onClick={onBack}
                        className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                    >
                        Get Started Now <Rocket className="w-4 h-4" />
                    </button>
                </div>
            </main>
        </div>
    );
}
