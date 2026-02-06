import React, { useState } from 'react';
import {
    Lightbulb,
    Search,
    Palette,
    Layout,
    GitBranch,
    Presentation,
    Upload,
    Share2,
    X,
    Copy,
    Check
} from 'lucide-react';
import { store } from '../lib/store';

export interface Stage {
    id: string;
    title: string;
    icon: React.ReactNode;
}

interface StageSelectionProps {
    onSelectStage: (stageId: string) => void;
    projectName: string;
    onHome: () => void;
    projectId: string;
}

export const STAGES: Stage[] = [
    { id: 'ideation', title: 'Ideation', icon: <Lightbulb className="w-6 h-6" /> },
    { id: 'research', title: 'Market Research', icon: <Search className="w-6 h-6" /> },
    { id: 'design', title: 'UI / UX Design', icon: <Palette className="w-6 h-6" /> },
    { id: 'build', title: 'Website / App Build', icon: <Layout className="w-6 h-6" /> },
    { id: 'git', title: 'Git & GitHub', icon: <GitBranch className="w-6 h-6" /> },
    { id: 'pitch', title: 'PPT / Pitch Deck', icon: <Presentation className="w-6 h-6" /> },
    { id: 'submit', title: 'Demo & Submission', icon: <Upload className="w-6 h-6" /> },
];

export function StageSelection({ onSelectStage, projectName, onHome, projectId }: StageSelectionProps) {
    const [showShare, setShowShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const encoded = store.exportProject(projectId);
        if (encoded) {
            // Construct URL
            const url = `${window.location.origin}?share=${encoded}`;
            setShareUrl(url);
            setShowShare(true);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 flex items-end justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Current Project</p>
                        <h1 className="text-3xl font-bold text-gray-900">{projectName}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onHome}
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Back to Home
                        </button>
                        {/* Share Button (Subtle) */}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors ml-6"
                        >
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                    </div>
                </header>

                {/* Share Modal */}
                {showShare && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 relative" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setShowShare(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">Share Workspace</h3>
                            <p className="text-sm text-gray-500 mb-6">Anyone with this link can access a read-only copy of your workspace state.</p>

                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                                <input
                                    type="text"
                                    readOnly
                                    value={shareUrl}
                                    className="bg-transparent border-none text-xs text-gray-600 w-full focus:ring-0 truncate font-mono select-all"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white rounded-md shadow-sm border border-transparent hover:border-gray-200 transition-all"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {STAGES.map((stage) => (
                        <button
                            key={stage.id}
                            onClick={() => onSelectStage(stage.id)}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all text-left group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-900 mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                {stage.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
