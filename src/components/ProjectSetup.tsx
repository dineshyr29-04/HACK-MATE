import { useState, useEffect } from 'react';
import { ArrowRight, Clock, Trophy, Target, Globe, Users, Sparkles, Layout } from 'lucide-react';

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
    const [name, setName] = useState('');
    const [problem, setProblem] = useState(initialProblem);
    const [timeLeft, setTimeLeft] = useState('24');
    const [isCustomTime, setIsCustomTime] = useState(false);

    const [type, setType] = useState('Online Hackathon');
    const [prizeCategory, setPrizeCategory] = useState('AI/ML Track');
    const [judgingFocus, setJudgingFocus] = useState<string[]>(['Innovation', 'Technical Complexity']);
    const [teamSize, setTeamSize] = useState('2-3 people');
    const [isTeam, setIsTeam] = useState(true);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onComplete({
            name,
            problem,
            timeLeft,
            type,
            prizeCategory,
            judgingFocus,
            teamSize,
            isTeam
        });
    };

    const toggleFocus = (focus: string) => {
        if (judgingFocus.includes(focus)) {
            setJudgingFocus(judgingFocus.filter(f => f !== focus));
        } else if (judgingFocus.length < 3) {
            setJudgingFocus([...judgingFocus, focus]);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-20 px-6">
            <div className="w-full max-w-3xl bg-white">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">Let's build your strategy.</h2>
                    <p className="text-gray-500 text-sm sm:text-lg">Tell us about the hackathon and your constraints.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* Project Mode Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-1.5 bg-gray-100 rounded-2xl sm:rounded-3xl">
                        <button
                            type="button"
                            onClick={() => setIsTeam(false)}
                            className={`py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${!isTeam ? 'bg-white text-gray-900 shadow-md transform scale-[1.02]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Solo Project
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsTeam(true)}
                            className={`py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${isTeam ? 'bg-white text-gray-900 shadow-md transform scale-[1.02]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Users className="w-4 h-4" /> Team Project
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Hackathon Name */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-gray-400" /> Hackathon Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all text-gray-900 font-medium"
                                placeholder="e.g. Meta Hackathon 2026"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Hackathon Type */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" /> Hackathon Type
                            </label>
                            <select
                                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all text-gray-900 font-medium bg-white"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>Online Hackathon</option>
                                <option>In-Person Event</option>
                                <option>Hybrid</option>
                            </select>
                        </div>

                        {/* Prize Category */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" /> Prize Category
                            </label>
                            <select
                                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all text-gray-900 font-medium bg-white"
                                value={prizeCategory}
                                onChange={(e) => setPrizeCategory(e.target.value)}
                            >
                                <option>AI/ML Track</option>
                                <option>Web3/Blockchain</option>
                                <option>Social Good</option>
                                <option>Healthcare</option>
                                <option>Climate/Sustainability</option>
                                <option>Enterprise Software</option>
                                <option>Open Category</option>
                            </select>
                        </div>

                        {/* Team Size */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Users className="w-4 h-4 text-emerald-500" /> Team Size
                            </label>
                            <select
                                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all text-gray-900 font-medium bg-white"
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value)}
                            >
                                <option>Solo Developer</option>
                                <option>2-3 people</option>
                                <option>4+ people</option>
                            </select>
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Target className="w-4 h-4 text-red-500" /> Problem Statement
                        </label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all text-gray-900 font-medium resize-none"
                            placeholder="Briefly describe what you're building..."
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                        />
                    </div>

                    {/* Judging Focus */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Layout className="w-4 h-4 text-pink-500" /> Judging Focus (Pick up to 3)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {['Innovation', 'Technical Complexity', 'User Experience', 'Business Model', 'Scalability', 'Feasibility'].map(focus => (
                                <button
                                    key={focus}
                                    type="button"
                                    onClick={() => toggleFocus(focus)}
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${judgingFocus.includes(focus)
                                        ? 'bg-black text-white border-black shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                                >
                                    {focus}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Left */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" /> Hackathon Duration
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['24', '48', '72'].map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => {
                                        setTimeLeft(time);
                                        setIsCustomTime(false);
                                    }}
                                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${!isCustomTime && timeLeft === time
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    {time} Hours
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setTimeLeft('');
                                    setIsCustomTime(true);
                                }}
                                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${isCustomTime
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                Custom
                            </button>
                        </div>
                        {isCustomTime && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all font-bold"
                                    placeholder="Enter hours..."
                                    value={timeLeft}
                                    onChange={(e) => setTimeLeft(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="w-full sm:flex-1 py-4 px-6 rounded-2xl text-base font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:flex-[2] py-4 px-6 rounded-2xl bg-gray-900 text-white text-base font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2 group"
                        >
                            Generate Roadmap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
