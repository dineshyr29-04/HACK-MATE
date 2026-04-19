import { useState, useEffect, useMemo } from 'react';
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
    User,
    CheckCircle2,
    ArrowRight,
    LucideIcon
} from 'lucide-react';
import { store } from '../lib/store';
import { supabase } from '../lib/supabase';
import { PromptModal } from './PromptModal';

export interface Stage {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

interface StageSelectionProps {
    onSelectStage: (stageId: string) => void;
    projectName: string;
    onHome: () => void;
    onOpenResources: () => void;
    projectId: string;
}

export const STAGES: Stage[] = [
    { id: 'ideation', title: 'Ideation', description: 'Brainstorm features and core UVP.', icon: Lightbulb },
    { id: 'research', title: 'Market Research', description: 'Validate users and market gaps.', icon: Search },
    { id: 'design', title: 'UI / UX Design', description: 'Wireframes and design systems.', icon: Palette },
    { id: 'build', title: 'Website / App Build', description: 'Core functional code development.', icon: Layout },
    { id: 'antigravity', title: 'AI Coding (Antigravity)', description: 'Power features with AI agents.', icon: Sparkles },
    { id: 'git', title: 'Git & GitHub', description: 'Version control and collaboration.', icon: GitBranch },
    { id: 'pitch', title: 'PPT / Pitch Deck', description: 'Compelling deck for the judges.', icon: Presentation },
    { id: 'submit', title: 'Demo & Submission', description: 'Final recording and platform upload.', icon: Upload },
];

export function StageSelection({ onSelectStage, projectName, onHome, onOpenResources, projectId }: StageSelectionProps) {
    const [showShare, setShowShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    // Assignments & Checklist State
    const [assignments, setAssignments] = useState<Record<string, string>>({});
    const [checklist, setChecklist] = useState<Record<string, Record<number, boolean>>>({});
    const [assigningStage, setAssigningStage] = useState<string | null>(null);

    useEffect(() => {
        const fetchState = async () => {
            const state = await store.getProjectState(projectId);
            setAssignments(state.assignments || {});
            setChecklist(state.checklist || {});
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
                    if (newState) {
                        if (newState.assignments) setAssignments(newState.assignments);
                        if (newState.checklist) setChecklist(newState.checklist);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [projectId]);

    const overallProgress = useMemo(() => {
        const totalPossible = STAGES.length * 3; // Assuming roughly 3 subtasks per stage for progress estimation
        let completed = 0;
        STAGES.forEach(s => {
            const stageTasks = checklist[s.id] || {};
            const doneCount = Object.values(stageTasks).filter(v => v === true).length;
            completed += Math.min(doneCount, 3);
        });
        return Math.round((completed / totalPossible) * 100);
    }, [checklist]);

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

    const getStageStatus = (stageId: string) => {
        const stageTasks = checklist[stageId] || {};
        const doneCount = Object.values(stageTasks).filter(v => v === true).length;
        if (doneCount >= 3) return 'DONE'; // Simplified threshold
        if (doneCount > 0) return 'IN_PROGRESS';
        return 'LOCKED';
    };

    // Find the first non-completed stage to highlight
    const nextActiveStageIndex = STAGES.findIndex(s => getStageStatus(s.id) !== 'DONE');

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-20 flex flex-col md:flex-row md:items-start justify-between gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                            <Sparkles className="w-3.5 h-3.5" /> Project Roadmap
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-6">{projectName}</h1>
                        
                        {/* Global Progress Bar */}
                        <div className="max-w-md">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Overall Progress</span>
                                <span className="text-lg font-black text-gray-900">{overallProgress}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gray-900 transition-all duration-1000 ease-out" 
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={onOpenResources}
                            className="bg-white border-2 border-gray-100 hover:border-gray-900 text-gray-900 px-8 py-4 rounded-2xl font-black transition-all text-sm flex items-center gap-3 shadow-sm hover:shadow-xl hover:shadow-gray-900/5"
                        >
                            <Layout className="w-4 h-4" /> Vault
                        </button>
                        <button
                            onClick={handleShare}
                            className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-black transition-all shadow-2xl shadow-gray-900/20 flex items-center gap-3 text-sm"
                        >
                            <UserPlus className="w-4 h-4" /> Invite Team
                        </button>
                        <button
                            onClick={onHome}
                            className="w-14 h-14 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-2xl transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                {/* Share Modal */}
                {showShare && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 border border-gray-100 relative overflow-hidden">
                            <button
                                onClick={() => setShowShare(false)}
                                className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            <div className="mb-10 text-center">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <Share2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-2">Team Collaboration</h3>
                                <p className="text-gray-400 font-medium px-4">Share this link to sync roadmaps and track progress with your mates.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                    <div className="flex-1 truncate font-mono text-xs text-gray-400 select-all">
                                        {shareUrl}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`px-6 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STAGES.map((stage, i) => {
                        const status = getStageStatus(stage.id);
                        const isActive = i === nextActiveStageIndex;
                        const isDone = status === 'DONE';
                        
                        return (
                            <div
                                key={stage.id}
                                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer flex flex-col justify-between h-[360px] animate-in fade-in slide-in-from-bottom-8 ${
                                    isActive 
                                    ? 'bg-gray-900 border-gray-900 text-white shadow-2xl shadow-gray-900/30 scale-[1.03] ring-8 ring-gray-900/5' 
                                    : isDone 
                                    ? 'bg-white border-emerald-100 shadow-sm' 
                                    : 'bg-white border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 hover:-translate-y-2'
                                }`}
                                style={{ animationDelay: `${i * 80}ms` }}
                                onClick={() => onSelectStage(stage.id)}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                            isActive ? 'bg-white text-gray-900' : isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-900 group-hover:text-white'
                                        }`}>
                                            <stage.icon className="w-7 h-7" />
                                        </div>
                                        {assignments[stage.id] ? (
                                            <div
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    isActive ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAssigningStage(stage.id);
                                                }}
                                            >
                                                <User className="w-3 h-3" /> {assignments[stage.id]}
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setAssigningStage(stage.id); }}
                                                className={`p-2 rounded-xl border transition-all ${
                                                    isActive ? 'border-white/20 text-white/40 hover:text-white' : 'border-gray-100 text-gray-200 hover:text-gray-900'
                                                }`}
                                            >
                                                <UserPlus className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-white/40' : 'text-gray-300'}`}>
                                            Phase {i + 1} of 8
                                            {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight">{stage.title}</h3>
                                        <p className={`text-sm font-medium leading-relaxed ${isActive ? 'text-white/50' : 'text-gray-400'}`}>
                                            {stage.description}
                                        </p>
                                    </div>
                                </div>

                                <div className={`pt-8 border-t flex items-center justify-between ${isActive ? 'border-white/10' : 'border-gray-50'}`}>
                                    <span className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                        {isDone ? 'Review Phase' : isActive ? 'Start Now' : 'View Details'} <ArrowRight className="w-4 h-4" />
                                    </span>
                                    
                                    {isActive && (
                                         <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <PromptModal
                    isOpen={assigningStage !== null}
                    onClose={() => setAssigningStage(null)}
                    onSubmit={(name) => {
                        if (assigningStage) handleAssign(assigningStage, name);
                    }}
                    title={assigningStage && assignments[assigningStage] ? "Update Mate" : "Assign Phase"}
                    placeholder="Enter mate name..."
                    defaultValue={assigningStage ? assignments[assigningStage] : ''}
                    maxLength={20}
                />
            </div>
        </div>
    );
}
