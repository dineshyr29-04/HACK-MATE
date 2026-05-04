import { ArrowLeft, CheckCircle2, Workflow, Rocket, Lightbulb, Users, Code2, Presentation, Play } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

export function HowItWorks({ onBack }: { onBack: () => void }) {
    const { isDark } = useTheme();

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
            icon: <Workflow className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />,
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
            icon: <Rocket className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />,
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
            icon: <Play className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />,
            sub: "Hour 21-24: Final polish and recording."
        }
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Navbar */}
            <nav className={`border-b sticky top-0 z-50 backdrop-blur-md ${isDark ? 'border-gray-700 bg-gray-900/80' : 'border-gray-100 bg-white/80'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 transition-colors font-medium ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                            <Code2 className="w-4 h-4" />
                        </div>
                        <span>How It Works</span>
                    </div>
                    <div className="w-24" />
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-20">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">The 7-Phase Hackathon Workflow</h1>
                    <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        We've mapped out the exact path to a winning project. Our tool guides you through each phase with specific tools and AI prompts.
                    </p>
                </div>

                <div className="relative space-y-4">
                    <div className={`absolute left-[31px] top-10 bottom-10 w-0.5 hidden sm:block ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />

                    {phases.map((phase, i) => (
                        <div
                            key={i}
                            className={`relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border transition-all group animate-in slide-in-from-bottom-4 fade-in duration-500 ${isDark
                                ? 'border-gray-700 bg-gray-800 hover:border-gray-500 hover:shadow-lg hover:shadow-gray-900/30'
                                : 'border-gray-100 bg-white hover:border-gray-900/10 hover:shadow-lg hover:shadow-gray-900/5'}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-colors border z-10 ${isDark
                                ? 'bg-gray-700 border-gray-600 group-hover:bg-gray-600'
                                : 'bg-gray-50 border-transparent group-hover:bg-white group-hover:shadow-inner group-hover:border-gray-100'}`}>
                                {phase.icon}
                            </div>
                            <div className="flex-1 pt-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
                                        Phase {i + 1}
                                    </span>
                                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{phase.title}</h3>
                                </div>
                                <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{phase.desc}</p>
                                <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
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