import { useState, useEffect } from 'react';
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
    Check,
    Sparkles,
    UserPlus,
    User
} from 'lucide-react';
import { store } from '../lib/store';
import { supabase } from '../lib/supabase';
import { PromptModal } from './PromptModal';

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

export function StageSelection({ onSelectStage, projectName, onHome, onOpenResources, projectId }: StageSelectionProps) {
    const [showShare, setShowShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    // Assignments State
    const [assignments, setAssignments] = useState<Record<string, string>>({});
    const [assigningStage, setAssigningStage] = useState<string | null>(null);

    useEffect(() => {
        const fetchState = async () => {
            const state = await store.getProjectState(projectId);
            setAssignments(state.assignments || {});
        };
        fetchState();
    }, [projectId]);

    // Real-time Sync
    useEffect(() => {
        const isConfigured = typeof window !== 'undefined' && 
                            import.meta.env.VITE_SUPABASE_URL && 
                            import.meta.env.VITE_SUPABASE_ANON_KEY &&
                            import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_url';
        
        if (!isConfigured) return;

        const channel = supabase
            .channel(`assignments-${projectId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'project_state',
                    filter: `project_id=eq.${projectId}`
                },
                (payload: any) => {
                    const newState = payload.new;
                    if (newState && newState.assignments) {
                        setAssignments(newState.assignments);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAssign = async (stageId: string, name: string) => {
        await store.updateAssignment(projectId, stageId, name);
        setAssignments(prev => ({ ...prev, [stageId]: name }));
    };

    return (
        <div className="min-h-screen bg-white p-6 sm:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-gray-900 font-bold text-xs uppercase tracking-widest mb-2">
                            <Sparkles className="w-3 h-3" /> Active Project
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{projectName}</h1>
                        <p className="text-gray-500 mt-2 font-medium">Click on a phase to start working on your roadmap.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <button
                            onClick={onOpenResources}
                            className="flex-1 sm:flex-none justify-center bg-white border border-gray-100 hover:border-gray-900 text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all text-xs sm:text-sm flex items-center gap-2"
                        >
                            <Layout className="w-4 h-4" /> Resources
                        </button>
                        <button
                            onClick={onHome}
                            className="flex-1 sm:flex-none justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all text-xs sm:text-sm"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleShare}
                            className="w-full sm:w-auto justify-center bg-gray-900 hover:bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all shadow-xl shadow-gray-100 flex items-center gap-2 text-xs sm:text-sm"
                        >
                            <UserPlus className="w-4 h-4" /> Invite Teammate
                        </button>
                    </div>
                </header>

                {/* Share Modal */}
                {showShare && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-10 border border-gray-100 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 -z-10" />

                            <button
                                onClick={() => setShowShare(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            <div className="mb-8">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900 mb-6">
                                    <Share2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Invite your team</h3>
                                <p className="text-gray-500 font-medium">Copy this link to share your project roadmap and collaborate in real-time.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                                    <div className="flex-1 truncate font-mono text-sm text-gray-500">
                                        {shareUrl}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied' : 'Copy Link'}
                                    </button>
                                </div>
                                <p className="text-center text-xs text-gray-400 font-medium italic">NOTE: Link contains encoded project data. Large projects may have very long links.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STAGES.map((stage, i) => (
                        <div
                            key={stage.id}
                            className="group relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-900/10 hover:border-gray-900/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-6"
                            style={{ animationDelay: `${i * 100}ms` }}
                            onClick={() => onSelectStage(stage.id)}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                                    {stage.icon}
                                </div>
                                {assignments[stage.id] && (
                                    <div
                                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold ring-4 ring-white transition-colors cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setAssigningStage(stage.id);
                                        }}
                                        title="Click to edit assignment"
                                    >
                                        <User className="w-3 h-3" />
                                        {assignments[stage.id]}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.title}</h3>
                            <p className="text-gray-400 text-sm font-medium mb-6">Phase {i + 1} of 8</p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50 group-hover:border-gray-200 transition-colors">
                                <span className="text-xs font-bold text-gray-300 group-hover:text-gray-900 transition-colors flex items-center gap-2">
                                    View Phase <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>

                                {/* Quick Assign (Simulated) */}
                                <div className="relative group/assign" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setAssigningStage(stage.id)}
                                        className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-lg transition-all border border-transparent hover:border-gray-200"
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
                    onSubmit={(name) => {
                        if (assigningStage) handleAssign(assigningStage, name);
                    }}
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
