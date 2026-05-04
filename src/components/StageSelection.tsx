import { useState, useEffect } from 'react';
import {
    Lightbulb, Search, Palette, Layout, GitBranch, Presentation,
    Upload, Share2, X, Copy, Check, Sparkles, UserPlus, User
} from 'lucide-react';
import { store } from '../lib/store';
import { supabase } from '../lib/supabase';
import { PromptModal } from './PromptModal';
import { useTheme } from '../context/ThemeContext';

export interface Stage {
    id: string;
    title: string;
    icon: React.ReactNode;
}

interface StageSelectionProps {
    onSelectStage: (stageId: string) => void;
    projectName: string;
    onHome: () => void;
    onOpenResources: () => void;
    projectId: string;
    project: any;
}

interface RealtimePayload {
    new: {
        assignments?: Record<string, string>;
        [key: string]: unknown;
    };
}

export const STAGES: Stage[] = [
    { id: 'ideation', title: 'Ideation', icon: <Lightbulb className="w-6 h-6" /> },
    { id: 'research', title: 'Market Research', icon: <Search className="w-6 h-6" /> },
    { id: 'design', title: 'UI / UX Design', icon: <Palette className="w-6 h-6" /> },
    { id: 'build', title: 'Website / App Build', icon: <Layout className="w-6 h-6" /> },
    { id: 'antigravity', title: 'AI Coding (Antigravity)', icon: <Sparkles className="w-6 h-6" /> },
    { id: 'git', title: 'Git & GitHub', icon: <GitBranch className="w-6 h-6" /> },
    { id: 'pitch', title: 'PPT / Pitch Deck', icon: <Presentation className="w-6 h-6" /> },
    { id: 'submit', title: 'Demo & Submission', icon: <Upload className="w-6 h-6" /> },
];

export function StageSelection({ onSelectStage, projectName, onHome, onOpenResources, projectId, project }: StageSelectionProps) {
    const { isDark } = useTheme();
    const [showShare, setShowShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [idCopied, setIdCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const [assignments, setAssignments] = useState<Record<string, string>>({});
    const [assigningStage, setAssigningStage] = useState<string | null>(null);

    useEffect(() => {
        const fetchState = async () => {
            const state = await store.getProjectState(projectId);
            setAssignments(state.assignments || {});
        };
        fetchState();
    }, [projectId]);

    useEffect(() => {
        const isConfigured = typeof window !== 'undefined' &&
            import.meta.env.VITE_SUPABASE_URL &&
            import.meta.env.VITE_SUPABASE_ANON_KEY &&
            import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_url';

        if (!isConfigured) return;

        const channel = supabase
            .channel(`assignments-${projectId}`)
            .on('postgres_changes', {
                event: '*', schema: 'public', table: 'project_state',
                filter: `project_id=eq.${projectId}`
            }, (payload: RealtimePayload) => {
                const newState = payload.new;
                if (newState && newState.assignments) setAssignments(newState.assignments);
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [projectId]);

    const handleShare = async () => {
        const encoded = await store.exportProject(projectId);
        if (encoded) {
            const url = `${window.location.origin}?share=${encoded}`;
            setShareUrl(url);
            setShowShare(true);
        }
    };

    const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
};

    const handleAssign = async (stageId: string, name: string) => {
        await store.updateAssignment(projectId, stageId, name);
        setAssignments(prev => ({ ...prev, [stageId]: name }));
    };

    return (
        <div className={`min-h-screen p-6 sm:p-12 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest mb-2 ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
                            <Sparkles className="w-3 h-3" /> Active Project
                        </div>
                        <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{projectName}</h1>
                        <p className={`mt-2 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Click on a phase to start working on your roadmap.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <button
                            onClick={onOpenResources}
                            className={`flex-1 sm:flex-none border px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all text-xs sm:text-sm flex items-center justify-center gap-2 ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:border-white' : 'bg-white border-gray-100 hover:border-gray-900 text-gray-900'}`}
                        >
                            <Layout className="w-4 h-4" /> Resources
                        </button>
                        <button
                            onClick={onHome}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all text-xs sm:text-sm ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleShare}
                            className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-xs sm:text-sm ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 hover:bg-black text-white shadow-gray-100'}`}
                        >
                            <UserPlus className="w-4 h-4" /> Invite Teammate
                        </button>
                    </div>
                </header>

                {/* Share Modal */}
                {showShare && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300">
                        <div className={`rounded-[2rem] shadow-2xl w-full max-w-lg p-10 border relative overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`} onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setShowShare(false)} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            <div className="mb-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                    <Share2 className="w-8 h-8" />
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Invite your team</h3>
                                <p className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Copy this link to share your project roadmap and collaborate in real-time.</p>
                            </div>

                            <div className={`p-6 rounded-2xl border mb-6 ${isDark ? 'bg-indigo-950/50 border-indigo-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Unique Team ID</h4>
                                <div className="flex items-center justify-between">
                                    <span className={`text-3xl font-black tracking-tight ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>{project.teamId || "HM-NEW"}</span>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(project.teamId || ""); setIdCopied(true); setTimeout(() => setIdCopied(false), 2000); }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
                                    >
                                        {idCopied && project.teamId ? 'Copied' : 'Copy ID'}
                                    </button>
                                </div>
                                <p className="mt-3 text-[10px] text-indigo-400 font-medium leading-relaxed">Your team can enter this ID on the homepage to join instantly.</p>
                            </div>

                            <div className="relative py-4 flex items-center">
                                <div className={`flex-grow border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                                <span className={`flex-shrink mx-4 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>Or use Link</span>
                                <div className={`flex-grow border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                            </div>

                            <div className={`flex items-center gap-3 p-4 rounded-2xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                                <div className={`flex-1 truncate font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{shareUrl}</div>
                                <button
                                    onClick={() => { handleCopy(); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); }}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${linkCopied ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                                >
                                    {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {linkCopied ? 'Copied' : 'Copy Link'}
                                </button>
                            </div>
                            <p className={`text-center text-xs font-medium italic mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>NOTE: Real-time syncing is enabled for both ID and Link access.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STAGES.map((stage, i) => (
                        <div
                            key={stage.id}
                            className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-6 ${isDark
                                ? 'bg-gray-800 border-gray-700 hover:border-gray-500 hover:shadow-gray-900/30'
                                : 'bg-white border-gray-100 hover:shadow-gray-900/10 hover:border-gray-900/10'}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                            onClick={() => onSelectStage(stage.id)}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:rotate-6 group-hover:scale-110 ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                                    {stage.icon}
                                </div>
                                {assignments[stage.id] && (
                                    <div
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ring-4 transition-colors cursor-pointer ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white ring-gray-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-900 ring-white'}`}
                                        onClick={(e) => { e.stopPropagation(); setAssigningStage(stage.id); }}
                                    >
                                        <User className="w-3 h-3" />
                                        {assignments[stage.id]}
                                    </div>
                                )}
                            </div>

                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stage.title}</h3>
                            <p className={`text-sm font-medium mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phase {i + 1} of 8</p>

                            <div className={`flex items-center justify-between pt-6 border-t transition-colors ${isDark ? 'border-gray-700 group-hover:border-gray-600' : 'border-gray-50 group-hover:border-gray-200'}`}>
                                <span className={`text-xs font-bold flex items-center gap-2 transition-colors ${isDark ? 'text-gray-600 group-hover:text-white' : 'text-gray-300 group-hover:text-gray-900'}`}>
                                    View Phase <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setAssigningStage(stage.id)}
                                        className={`p-2 rounded-lg transition-all border border-transparent ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white hover:border-gray-500' : 'bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200'}`}
                                    >
                                        <UserPlus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <PromptModal
                    isOpen={assigningStage !== null}
                    onClose={() => setAssigningStage(null)}
                    onSubmit={(name) => { if (assigningStage) handleAssign(assigningStage, name); }}
                    title={assigningStage && assignments[assigningStage] ? "Edit assignment" : "Assign to your mate"}
                    placeholder="Enter teammate name..."
                    defaultValue={assigningStage ? assignments[assigningStage] : ''}
                    maxLength={30}
                />
            </div>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
}