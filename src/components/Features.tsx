import { ArrowLeft, Zap, Toolbox, Sparkles, CheckSquare, Users, Download, Clock, DollarSign, Code2, Play } from "lucide-react";

export function Features({ onBack }: { onBack: () => void }) {
    const features = [
        {
            title: "Instant Strategy",
            desc: "Get a complete hackathon roadmap in seconds. Covers all 7 phases: from ideation to final submission.",
            icon: <Zap className="w-8 h-8 text-gray-900" />,
            tag: "Power"
        },
        {
            title: "Best-in-Class Tools",
            desc: "Exact tool recommendations based on your tech stack. Filter by setup time, cost, and expertise level.",
            icon: <Toolbox className="w-8 h-8 text-gray-400" />,
            tag: "Curated"
        },
        {
            title: "10x Prompts",
            desc: "AI-engineered prompts optimized for winning. Works with ChatGPT 4, Claude 3, Midjourney, and more.",
            icon: <Sparkles className="w-8 h-8 text-amber-500" />,
            tag: "AI First"
        },
        {
            title: "Progress Tracking",
            desc: "Never lose track of your progress. Know exactly what to work on next to stay on schedule.",
            icon: <CheckSquare className="w-8 h-8 text-green-600" />,
            tag: "Coming Soon"
        },
        {
            title: "Team Collaboration",
            desc: "Share projects with teammates. Assign phases, leave comments, and see updates in real-time.",
            icon: <Users className="w-8 h-8 text-sky-500" />,
            tag: "Beta"
        },
        {
            title: "Resource Downloads",
            desc: "Export your roadmap as PDF, Markdown, or Notion templates. Get README boilerplates in one click.",
            icon: <Download className="w-8 h-8 text-gray-700" />,
            tag: "Workflow"
        },
        {
            title: "Timer & Deadlines",
            desc: "Auto-calculated phase deadlines for 24h, 48h, or 72h hackathons. Stay ahead of the clock.",
            icon: <Clock className="w-8 h-8 text-red-500" />,
            tag: "Essential"
        },
        {
            title: "Cost Estimator",
            desc: "See the total cost of your recommended tech stack. Compare free vs paid options instantly.",
            icon: <DollarSign className="w-8 h-8 text-emerald-600" />,
            tag: "Budget"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/30">
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
                        <span>Features</span>
                    </div>
                    <div className="w-24" />
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">Built for the <br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700">Next-Gen Developer.</span></h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to go from a blank screen to a world-class project. No fluff, just the essentials for winning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group p-8 bg-white rounded-[2rem] border border-gray-100 hover:border-gray-900/10 transition-all hover:shadow-2xl hover:shadow-gray-900/5 flex flex-col h-full animate-in fade-in zoom-in duration-500"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-gray-100 group-hover:scale-110 transition-all duration-300">
                                {feature.icon}
                            </div>
                            <div className="mb-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{feature.tag}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                {feature.desc}
                            </p>
                            <button className="text-sm font-bold text-gray-900 flex items-center gap-1 group/btn">
                                Learn more <ArrowLeft className="w-3 h-3 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Demo Section Placeholder */}
                <div className="mt-24 bg-white rounded-[3rem] border border-gray-100 p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">See it in action.</h2>
                            <p className="text-gray-500 text-lg mb-8">Watch how a solo developer built a fully functional ML project in just 30 minutes using Hackathon Copilot.</p>
                            <div className="flex gap-4">
                                <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all">Watch Demo</button>
                                <button onClick={onBack} className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">Try it Now</button>
                            </div>
                        </div>
                        <div className="aspect-video bg-gray-900 rounded-[2rem] shadow-2xl flex items-center justify-center group cursor-pointer relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Demo preview" />
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform z-10 border border-white/30">
                                <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
