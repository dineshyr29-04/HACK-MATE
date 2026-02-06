import React from 'react';
import { ArrowRight, Clock, Trophy, Target } from 'lucide-react';

interface ProjectSetupProps {
    initialProblem: string;
    onComplete: (data: { name: string; problem: string; timeLeft: string }) => void;
    onBack: () => void;
}

export function ProjectSetup({ initialProblem, onComplete, onBack }: ProjectSetupProps) {
    const [name, setName] = React.useState('');
    const [problem, setProblem] = React.useState(initialProblem);
    const [timeLeft, setTimeLeft] = React.useState('24');
    const [isCustomTime, setIsCustomTime] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ name, problem, timeLeft });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Project Setup</h2>
                    <p className="text-gray-500 mt-2">Define your goal and constraints.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Hackathon Name */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Trophy className="w-4 h-4" /> Hackathon Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-400"
                            placeholder="e.g. Global AI Hackathon 2026"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Problem Statement
                        </label>
                        <textarea
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-400 resize-none"
                            placeholder="Describe what you are solving..."
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                        />
                    </div>

                    {/* Time Left */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Time Remaining (Hours)
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {['24', '48', '72'].map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => {
                                        setTimeLeft(time);
                                        setIsCustomTime(false);
                                    }}
                                    className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all ${!isCustomTime && timeLeft === time
                                        ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    {time}h
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setTimeLeft('');
                                    setIsCustomTime(true);
                                }}
                                className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all ${isCustomTime
                                    ? 'border-gray-900 bg-gray-900 text-white shadow-md'
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
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors text-gray-900 placeholder:text-gray-400"
                                    placeholder="Enter hours remaining..."
                                    value={timeLeft}
                                    onChange={(e) => setTimeLeft(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 py-3 px-6 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-6 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            Continue <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
