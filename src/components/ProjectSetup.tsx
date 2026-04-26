import { useState } from 'react';
import { ArrowRight, Clock, Trophy, Target, Globe, Users, Sparkles, Layout } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProjectSetupProps {
    initialProblem: string;
    onComplete: (data: {
        name: string;
        problem: string;
        timeLeft: string;
        type: string;
        prizeCategory: string;
        judgingFocus: string[];
        teamSize: string;
        isTeam: boolean;
    }) => void;
    onBack: () => void;
}

export function ProjectSetup({ initialProblem, onComplete, onBack }: ProjectSetupProps) {
    const { isDark } = useTheme();
    const [name, setName] = useState('');
    const [problem, setProblem] = useState(initialProblem);
    const [timeLeft, setTimeLeft] = useState('24');
    const [isCustomTime, setIsCustomTime] = useState(false);
    const [type, setType] = useState('Online Hackathon');
    const [prizeCategory, setPrizeCategory] = useState('AI/ML Track');
    const [judgingFocus, setJudgingFocus] = useState<string[]>(['Innovation', 'Technical Complexity']);
    const [teamSize, setTeamSize] = useState('2-3 people');
    const [isTeam, setIsTeam] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onComplete({ name, problem, timeLeft, type, prizeCategory, judgingFocus, teamSize, isTeam });
    };

    const toggleFocus = (focus: string) => {
        if (judgingFocus.includes(focus)) {
            setJudgingFocus(judgingFocus.filter(f => f !== focus));
        } else if (judgingFocus.length < 3) {
            setJudgingFocus([...judgingFocus, focus]);
        }
    };

    const inputClass = `w-full px-4 py-4 rounded-xl border transition-all font-medium ${isDark
        ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-4 focus:ring-gray-700/30'
        : 'bg-white border-gray-200 text-gray-900 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5'}`;

    return (
        <div className={`min-h-screen flex flex-col items-center py-20 px-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="w-full max-w-3xl">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Let's build your strategy.
                    </h2>
                    <p className={`text-sm sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Tell us about the hackathon and your constraints.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* Project Mode Toggle */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-1.5 rounded-2xl sm:rounded-3xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <button
                            type="button"
                            onClick={() => setIsTeam(false)}
                            className={`py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${!isTeam
                                ? `shadow-md transform scale-[1.02] ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`
                                : `${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}`}
                        >
                            Solo Project
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsTeam(true)}
                            className={`py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${isTeam
                                ? `shadow-md transform scale-[1.02] ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`
                                : `${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}`}
                        >
                            <Users className="w-4 h-4" /> Team Project
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                <Trophy className="w-4 h-4 text-gray-400" /> Hackathon Name
                            </label>
                            <input type="text" required className={inputClass} placeholder="e.g. Meta Hackathon 2026" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="space-y-3">
                            <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                <Globe className="w-4 h-4 text-gray-400" /> Hackathon Type
                            </label>
                            <select className={inputClass} value={type} onChange={(e) => setType(e.target.value)}>
                                <option>Online Hackathon</option>
                                <option>In-Person Event</option>
                                <option>Hybrid</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                <Sparkles className="w-4 h-4 text-amber-500" /> Prize Category
                            </label>
                            <select className={inputClass} value={prizeCategory} onChange={(e) => setPrizeCategory(e.target.value)}>
                                <option>AI/ML Track</option>
                                <option>Web3/Blockchain</option>
                                <option>Social Good</option>
                                <option>Healthcare</option>
                                <option>Climate/Sustainability</option>
                                <option>Enterprise Software</option>
                                <option>Open Category</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                <Users className="w-4 h-4 text-emerald-500" /> Team Size
                            </label>
                            <select className={inputClass} value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
                                <option>Solo Developer</option>
                                <option>2-3 people</option>
                                <option>4+ people</option>
                            </select>
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-3">
                        <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <Target className="w-4 h-4 text-red-500" /> Problem Statement
                        </label>
                        <textarea required rows={4} className={`${inputClass} resize-none`} placeholder="Briefly describe what you're building..." value={problem} onChange={(e) => setProblem(e.target.value)} />
                    </div>

                    {/* Judging Focus */}
                    <div className="space-y-4">
                        <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <Layout className="w-4 h-4 text-pink-500" /> Judging Focus (Pick up to 3)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {['Innovation', 'Technical Complexity', 'User Experience', 'Business Model', 'Scalability', 'Feasibility'].map(focus => (
                                <button
                                    key={focus}
                                    type="button"
                                    onClick={() => toggleFocus(focus)}
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${judgingFocus.includes(focus)
                                        ? isDark
                                            ? 'bg-white text-gray-900 border-white shadow-md'
                                            : 'bg-black text-white border-black shadow-md'
                                        : isDark
                                            ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                                >
                                    {focus}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Left */}
                    <div className="space-y-4">
                        <label className={`block text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <Clock className="w-4 h-4 text-gray-500" /> Hackathon Duration
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['24', '48', '72'].map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => { setTimeLeft(time); setIsCustomTime(false); }}
                                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${!isCustomTime && timeLeft === time
                                        ? isDark
                                            ? 'border-white bg-white text-gray-900'
                                            : 'border-gray-900 bg-gray-900 text-white'
                                        : isDark
                                            ? 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                                >
                                    {time} Hours
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => { setTimeLeft(''); setIsCustomTime(true); }}
                                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${isCustomTime
                                    ? isDark
                                        ? 'border-white bg-white text-gray-900'
                                        : 'border-gray-900 bg-gray-900 text-white'
                                    : isDark
                                        ? 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                            >
                                Custom
                            </button>
                        </div>
                        {isCustomTime && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                <input type="number" required min="1" className={inputClass} placeholder="Enter hours..." value={timeLeft} onChange={(e) => setTimeLeft(e.target.value)} autoFocus />
                            </div>
                        )}
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl text-base font-bold transition-all ${isDark ? 'text-gray-500 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className={`w-full sm:flex-[2] py-4 px-6 rounded-2xl text-base font-bold transition-all shadow-xl flex items-center justify-center gap-2 group ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-gray-900' : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'}`}
                        >
                            Generate Roadmap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}