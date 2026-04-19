import { ArrowLeft, ExternalLink, Trophy, Code2, Play } from "lucide-react";

export function CaseStudies({ onBack }: { onBack: () => void }) {
    const cases = [
        {
            name: "Smart Agriculture AI",
            team: "3 members • BITS Pilani",
            hackathon: "AgriTech Challenge 2025",
            prize: "1st Place, ₹1,00,000",
            tools: "Replit, Claude AI, Figma, Railway",
            help: "UI/UX Design + Website Build",
            quote: "The UI/UX prompts helped us make a professional-looking app in just 6 hours.",
            img: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80"
        },
        {
            name: "Healthcare Chatbot",
            team: "2 members",
            hackathon: "HealthXX Hackathon 2025",
            prize: "Healthcare Track Winner",
            tools: "Next.js, OpenAI, Supabase",
            help: "Website/App Build",
            quote: "Used the provided boilerplate, saved 3 hours on setup.",
            img: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80"
        },
        {
            name: "Smart City Traffic Control",
            team: "Solo Developer",
            hackathon: "City-Hack 2026",
            prize: "Innovation Award",
            tools: "Bolt.new, Perplexity, Python",
            help: "Ideation + Research",
            quote: "The research phase found us APIs we didn't know existed.",
            img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
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
                        <span>Case Studies</span>
                    </div>
                    <div className="w-24" />
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Built with <br /><span className="text-black">Hackathon Copilot.</span></h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        Join the <span className="text-gray-900 font-bold">100+ builders</span> across <span className="text-gray-900 font-bold">4+ countries</span> who joined in our <span className="text-gray-900 font-bold">first month</span> to build winning projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {cases.map((c, i) => (
                        <div key={i} className="group flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${i * 150}ms` }}>
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl shadow-gray-200">
                                <img src={c.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={c.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm">
                                        <Play className="w-4 h-4" /> Watch Demo
                                    </button>
                                </div>
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-black shadow-xl ring-1 ring-gray-100 flex items-center gap-2">
                                        <Trophy className="w-3 h-3 text-amber-500" /> {c.prize}
                                    </span>
                                </div>
                            </div>
                            <div className="px-4">
                                <h3 className="text-2xl font-black text-gray-900 mb-1">{c.name}</h3>
                                <p className="text-gray-400 font-bold text-sm mb-4">{c.hackathon} • {c.team}</p>
                                <div className="p-6 bg-gray-50 rounded-2xl mb-6 relative italic text-gray-600 font-medium text-sm border border-gray-100">
                                    "{c.quote}"
                                    <div className="absolute top-0 left-0 w-2 h-2 bg-gray-100 rounded-full translate-x-4 -translate-y-1" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {c.tools.split(', ').map(tool => (
                                        <span key={tool} className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded-lg italic">#{tool.replace(' ', '')}</span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 text-gray-900 font-bold text-sm hover:underline">
                                    View Full Case Study <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <h2 className="text-2xl font-bold mb-8 italic text-gray-400">Trusted by students from</h2>
                    <div className="flex flex-wrap justify-around items-center opacity-30 grayscale gap-12">
                        <div className="text-3xl font-black tracking-tighter">BITS PILANI</div>
                        <div className="text-3xl font-black tracking-tighter">IIT BOMBAY</div>
                        <div className="text-3xl font-black tracking-tighter">NIT TRICHY</div>
                        <div className="text-3xl font-black tracking-tighter">MIT</div>
                        <div className="text-3xl font-black tracking-tighter">STANFORD</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
