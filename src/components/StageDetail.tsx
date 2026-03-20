import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, ArrowLeft, GitBranch, AlertCircle, ChevronDown, ChevronUp, MessageSquare, Send, Layout } from 'lucide-react';
import { STAGES } from './StageSelection';
import { store, Project } from '../lib/store';
import { AntigravityGuide } from './AntigravityGuide';
import { PromptModal } from './PromptModal';

interface StageDetailProps {
    stageId: string;
    onBack: () => void;
    onOpenResources: () => void;
    project: Project;
}

// Data mapping
const STAGE_DATA: Record<string, {
    expl: string;
    toolName: string;
    toolWhy: string;
    toolUrl: string;
    promptTemplate: string;
    checklist: string[];
    docsUrl?: string;
    resourcePath?: string;
    resourceName?: string;
    alternatives?: { name: string; why: string; url: string }[];
    warning?: string;
}> = {
    ideation: {
        expl: "Brainstorm core features, user flows, and UVP. Don't overthink—aim for volume then refine.",
        toolName: "ChatGPT / Claude",
        toolWhy: "Best for rapid idea generation and refining logic gaps.",
        toolUrl: "https://chat.openai.com",
        promptTemplate: `Act as a Technical Product Manager.
Objective: Define a feasible hackathon project scope.

Problem: [PROBLEM]
Track/Category: [CATEGORY]

1. **Solution Concepts:**
   Generate 3 distinct technical approaches to solve this within the [CATEGORY] track.
   - Option A: Minimalist (Solved via simple form/data).
   - Option B: Integrated (Solved via API integration/automation).
   - Option C: Data-Driven (Solved via analysis/AI).

2. **Feasibility Check:**
   For the best option above, list the 3 biggest technical risks (e.g., "latency", "scraping difficulty").

3. **Recommendation:**
   Which one can realistically be built and polished in [TIME] hours? Why?`,
        checklist: [
            "Define core problem statement",
            "Identify target user persona",
            "Brainstorm 3 key features",
            "Define the 'X-factor' tech component",
            "Draft user journey flow",
            "Decide on MVP scope",
            "Create a 1-sentence elevator pitch"
        ],
        alternatives: [
            { name: "Miro", why: "Better for visual brainstorming", url: "https://miro.com" },
            { name: "Whimsical", why: "Faster wireframing", url: "https://whimsical.com" }
        ],
        resourcePath: "/resources/ideation/problem-statement.md",
        resourceName: "Problem Statement Template",
        docsUrl: "https://platform.openai.com/docs/guides/prompt-engineering"
    },
    research: {
        expl: "Validate technical feasibility and market gap.",
        toolName: "Perplexity / Google",
        toolWhy: "Real-time search to check if your idea is unique.",
        toolUrl: "https://www.perplexity.ai",
        promptTemplate: `Act as a Solutions Architect.
Objective: Validate technical feasibility and market gap.

Problem: [PROBLEM]

1. **Existing Solutions:**
   List 3 direct competitors. For each, state their weakness.

2. **Open Source & APIs:**
   List 3 GitHub repositories or APIs we can use for [CATEGORY].

3. **Differentiation:**
   What is the ONE technical feature we will build that judges will love?`,
        checklist: [
            "Identify 3 direct competitors",
            "List weakness of each competitor",
            "Verify required APIs are available/free",
            "Search for existing open-source repos",
            "Confirm technical feasibility",
            "Define your UVP"
        ],
        alternatives: [
            { name: "Google Trends", why: "Validate search volume", url: "https://trends.google.com" },
            { name: "ProductHunt", why: "Find recent launches", url: "https://producthunt.com" }
        ],
        resourcePath: "/resources/ideation/competitive-analysis.md",
        resourceName: "Competitive Analysis Framework",
    },
    design: {
        expl: "Create high-fidelity mockups. Judges judge the book by its cover.",
        toolName: "Figma",
        toolWhy: "Industry standard for interface design.",
        toolUrl: "https://www.figma.com",
        promptTemplate: `Act as a Lead UI Engineer.
Objective: Define a clean, implementable design system for a [CATEGORY] project.

1. **Component Stack:**
   Recommend a specific React component library (e.g., Shadcn/UI, Mantine).

2. **Core Views:**
   List the 4 essential screens.

3. **Judging Focus:**
   How can we emphasize [FOCUS] in the UI?`,
        checklist: [
            "Choose a primary color palette",
            "Select font pairings",
            "Design the App Logo / Icon",
            "Mockup the Landing Page",
            "Mockup the Core Feature dashboard",
            "Design loading states"
        ],
        alternatives: [
            { name: "Penpot", why: "Free Figma alternative", url: "https://penpot.app" },
            { name: "Excalidraw", why: "Great for rough sketches", url: "https://excalidraw.com" }
        ],
        resourcePath: "/resources/design/color-palette-guide.md",
        resourceName: "Color Palette & Aesthetics Guide",
    },
    build: {
        expl: "Code the frontend and connect the backend. Speed is key.",
        toolName: "Bolt.new / Replit",
        toolWhy: "Instant dev environment deployment.",
        toolUrl: "https://bolt.new",
        warning: "Don't spend more than 1 hour on setup. Use a template.",
        promptTemplate: `Act as a Senior Engineering Lead.
Objective: Define the data model and API surface for [CATEGORY].

1. **Tech Stack:**
   Recommend a stack for [TYPE] (Online/In-Person).
   [TYPE_SPECIFIC]

2. **Data Model:**
   Define core entities.

3. **Implementation Steps:**
   Step 1: Setup.
   Step 2: Database.
   Step 3: Core Logic.`,
        checklist: [
            "Initialize Git repository",
            "Set up project scaffolding",
            "Install Tailwind CSS",
            "Build reusable UI components",
            "Implement Routing",
            "Connect Backend / APIs",
            "Test Core Feature"
        ],
        alternatives: [
            { name: "Vercel", why: "Best for deployment", url: "https://vercel.com" },
            { name: "Firebase/Supabase", why: "Fastest backend setup", url: "https://supabase.com" }
        ],
        resourcePath: "/resources/boilerplates/nextjs-starter.md",
        resourceName: "Next.js + Supabase Starter Guide",
    },
    git: {
        expl: "Version control is mandatory. Don't lose code.",
        toolName: "GitHub",
        toolWhy: "Industry standard source control.",
        toolUrl: "https://github.com",
        promptTemplate: `Act as a Release Manager.
Objective: Ensure code quality for a [SIZE] team.

1. **Branching:** Strategy for [SIZE].
2. **Commit Standards:** Provide a template.`,
        checklist: ["Initialize Repo", "First Commit", "Invite Team"],
        alternatives: [
            { name: "GitLab", why: "Built-in CI/CD", url: "https://gitlab.com" }
        ],
        resourcePath: "/resources/submission/github-setup.md",
        resourceName: "GitHub Project Setup Guide",
    },
    pitch: {
        expl: "The pitch is 50% of the score. Make it compelling.",
        toolName: "Gamma",
        toolWhy: "AI-generated slides in seconds.",
        toolUrl: "https://gamma.app",
        promptTemplate: `Act as a Judge.
Objective: Create a persuasive presentation focusing on [FOCUS].

1. Outline 8 slides for a [CATEGORY] project.
2. What feature should we highlight to stand out?`,
        checklist: [
            "Draft the 2-minute script",
            "Create 'Problem' slide",
            "Create 'Solution' slide",
            "Record Demo Video",
            "Embed Demo into slides",
            "Practice pitch 5 times"
        ],
        alternatives: [
            { name: "Canva", why: "Beautiful templates", url: "https://canva.com" },
            { name: "Google Slides", why: "Best for collaboration", url: "https://slides.google.com" }
        ],
        resourcePath: "/resources/pitch/winning-pitch-deck.md",
        resourceName: "Winning Pitch Structure",
    },
    submit: {
        expl: "Record the demo and submit. Don't miss the deadline.",
        toolName: "Loom",
        toolWhy: "Fast, reliable screen recording.",
        toolUrl: "https://www.loom.com",
        promptTemplate: `Act as a QC Engineer.
Verify submission readiness for [CATEGORY] track.

1. **Demo Script:** 0:00-2:00 breakdown.
2. **Final Polish:** High ROI UI fixes.`,
        checklist: [
            "Record 2-min demo video",
            "Edit video",
            "Upload to YouTube/Loom",
            "Write Devpost description",
            "Submit before deadline!"
        ],
        alternatives: [
            { name: "OBS Studio", why: "Pro screen recording", url: "https://obsproject.com" }
        ],
        resourcePath: "/resources/submission/readme-template.md",
        resourceName: "README.md Pro Template",
    }
};

export function StageDetail({ stageId, onBack, onOpenResources, project }: StageDetailProps) {
    const data = STAGE_DATA[stageId];
    const stageInfo = STAGES.find(s => s.id === stageId);
    const projectId = project.id;

    // Persisted State
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const [progress, setProgress] = useState(0);
    const [customPrompt, setCustomPrompt] = useState<string | null>(null);
    const [showAlternatives, setShowAlternatives] = useState(false);

    // Comments State
    const [comments, setComments] = useState<{ user: string; text: string; time: number }[]>([]);
    const [newComment, setNewComment] = useState('');
    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);

    // Initial load from Store
    useEffect(() => {
        const fetchState = async () => {
            const state = await store.getProjectState(projectId);
            setCheckedItems(state.checklist[stageId] || {});
            setCustomPrompt(state.customPrompts[stageId] || null);
            setComments(state.comments[stageId] || []);
        };
        fetchState();
    }, [stageId, projectId]);

    useEffect(() => {
        if (!data) return;
        const total = data.checklist.length;
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;
        setProgress((checkedCount / total) * 100);
    }, [checkedItems, data]);

    const handleCheck = async (index: number) => {
        const newState = !checkedItems[index];
        setCheckedItems(prev => ({ ...prev, [index]: newState }));
        await store.updateChecklist(projectId, stageId, index, newState);
    };

    const handlePromptChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        setCustomPrompt(newVal);
        await store.saveCustomPrompt(projectId, stageId, newVal);
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setShowNamePrompt(true);
    };

    const submitComment = async (user: string) => {
        await store.addComment(projectId, stageId, user, newComment || "Anonymous");
        setComments(prev => [...prev, { user, text: newComment, time: Date.now() }]);
        setNewComment('');
    };

    const handleDownload = () => {
        if (!data) return;
        const checkedList = data.checklist.map((item, i) =>
            `[${checkedItems[i] ? 'x' : ' '}] ${item}`
        ).join('\n');

        const content = `
HACKATHON COPILOT - ${stageInfo?.title.toUpperCase()}
Project: ${project.name}
--------------------------------------------------
Recommended Tool: ${data.toolName}
Use it here: ${data.toolUrl}

CHECKLIST STATUS:
-----------------
${checkedList}

Progress: ${Math.round(progress)}%
        `.trim();

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${stageId}-plan.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (stageId === 'antigravity') return <AntigravityGuide onBack={onBack} />;
    if (!data) return <div className="p-20 text-center">Invalid Stage</div>;

    // Dynamic Prompt Injection
    let basePrompt = data.promptTemplate
        .replace('[PROBLEM]', project.problem)
        .replace('[CATEGORY]', project.prizeCategory || 'General')
        .replace('[TIME]', project.timeLeft)
        .replace('[FOCUS]', (project.judgingFocus || []).join(', '))
        .replace('[SIZE]', project.teamSize || 'Solo')
        .replace('[TYPE]', project.type || 'Online');

    // Type specific additions for Build stage
    if (stageId === 'build') {
        let typeSpecific = project.type === 'In-Person Event'
            ? "Since this is in-person, avoid heavy cluster setups (Kubernetes). Use Vercel, Netlify, or Railway for instant deployment."
            : "Since this is online, you have more room for complex backend setup if needed, but prioritize speed.";

        if (project.prizeCategory === 'AI/ML Track') {
            typeSpecific += " Use FastAPI for python backend and Vercel AI SDK for streaming.";
        } else if (project.prizeCategory === 'Web3/Blockchain') {
            typeSpecific += " Use Hardhat/Foundry for smart contracts and Ethers.js for frontend integration.";
        }
        basePrompt = basePrompt.replace('[TYPE_SPECIFIC]', typeSpecific);
    }

    const displayPrompt = customPrompt !== null ? customPrompt : basePrompt;
    const isEdited = customPrompt !== null && customPrompt !== basePrompt;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-auto sm:h-20 py-4 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h1 className="text-lg sm:text-xl font-extrabold flex-1 text-center sm:text-left">{stageInfo?.title}</h1>
                        <div className="w-10 sm:hidden" /> {/* Spacer for centering title on mobile */}
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button onClick={onOpenResources} className="flex-1 sm:flex-none text-gray-500 hover:text-gray-900 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-gray-100 hover:border-gray-200 flex items-center justify-center gap-2">
                            <Layout className="w-4 h-4" /> <span className="hidden xs:inline">Resources</span><span className="xs:hidden">Lib</span>
                        </button>
                        <button onClick={handleDownload} className="flex-1 sm:flex-none bg-gray-900 hover:bg-black text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all">
                            Download
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Phase Strategy</h2>
                        <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-6">{data.expl}</p>

                        {data.warning && (
                            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800 text-xs sm:text-sm font-medium">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {data.warning}
                            </div>
                        )}
                    </section>

                    <section className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Recommended Resource</h2>
                            <a href={data.toolUrl} target="_blank" className="text-black font-bold hover:underline flex items-center gap-2">
                                Open Tool <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm mb-6 text-center lg:text-left overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <GitBranch className="w-16 sm:w-20 h-16 sm:h-20" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black mb-2">{data.toolName}</h3>
                            <p className="text-gray-500 text-base sm:text-lg mb-8">{data.toolWhy}</p>
                            <button onClick={() => setShowAlternatives(!showAlternatives)} className="mx-auto lg:mx-0 text-gray-400 text-sm font-bold flex items-center gap-2 hover:text-gray-600">
                                {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} Tool Alternatives
                            </button>
                        </div>
                        {showAlternatives && data.alternatives && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                {data.alternatives.map((alt, i) => (
                                    <a key={i} href={alt.url} target="_blank" className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-900/10 hover:shadow-lg transition-all flex justify-between items-center group">
                                        <div>
                                            <div className="font-bold text-gray-900">{alt.name}</div>
                                            <div className="text-xs text-gray-400">{alt.why}</div>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {data.resourcePath && (
                            <div className="mt-8 p-6 bg-gray-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-gray-200">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Pre-vetted Template</span>
                                    <h4 className="text-lg font-bold">{data.resourceName}</h4>
                                </div>
                                <a
                                    href={data.resourcePath}
                                    download={data.resourceName + ".md"}
                                    className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-black/10"
                                >
                                    Download Template
                                </a>
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">The Golden Prompt</h2>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(displayPrompt);
                                    setShowCopyFeedback(true);
                                    setTimeout(() => setShowCopyFeedback(false), 2000);
                                }}
                                className="text-black font-bold text-sm bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                            >
                                {showCopyFeedback ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                {showCopyFeedback ? "Copied!" : "Copy Prompt"}
                            </button>
                        </div>
                        <div className="relative group">
                            <textarea
                                value={displayPrompt}
                                onChange={handlePromptChange}
                                className={`w-full h-64 sm:h-80 p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm leading-relaxed border-4 border-transparent focus:border-gray-700/30 selection:bg-gray-700 selection:text-white transition-all outline-none ${isEdited ? 'border-gray-700/20 shadow-2xl shadow-gray-200' : ''}`}
                            />
                            {isEdited && (
                                <button onClick={() => setCustomPrompt(null)} className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-[10px] sm:text-xs font-bold text-gray-400 hover:text-gray-300 underline">Reset to Default</button>
                            )}
                        </div>
                    </section>
                </div>

                <div className="space-y-12">
                    {/* Action Plan */}
                    <section className="bg-white rounded-[2rem] border-2 border-gray-900 p-8 shadow-2xl shadow-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black uppercase tracking-tighter">Action Plan</h2>
                            <span className="text-2xl font-black">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full mb-8 overflow-hidden">
                            <div className="h-full bg-gray-900 transition-all duration-1000" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {data.checklist.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleCheck(i)}
                                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${checkedItems[i] ? 'bg-gray-50 border-transparent' : 'bg-white border-gray-100 hover:border-gray-900'}`}
                                >
                                    <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${checkedItems[i] ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-200'}`}>
                                        {checkedItems[i] && <Check className="w-4 h-4" />}
                                    </div>
                                    <span className={`text-sm font-bold leading-tight ${checkedItems[i] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Team Comments */}
                    <section className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" /> Team Chat
                        </h2>
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {comments.length === 0 ? (
                                <p className="text-gray-400 text-sm italic py-4 text-center font-medium">No comments yet. Start the conversation!</p>
                            ) : (
                                comments.map((c, i) => (
                                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-black text-gray-900">
                                                {c.user[0].toUpperCase()}
                                            </div>
                                            <span className="text-xs font-black text-gray-900">{c.user}</span>
                                            <span className="text-[10px] text-gray-400 ml-auto">{new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">{c.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        <form onSubmit={handleAddComment} className="relative">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a note for the team..."
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 transition-all shadow-inner"
                            />
                            <button type="submit" className="absolute right-2 top-2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </section>
                </div>
            </main>

            <PromptModal
                isOpen={showNamePrompt}
                onClose={() => setShowNamePrompt(false)}
                onSubmit={submitComment}
                title="Enter your name"
                placeholder="Your name..."
            />
        </div>
    );
}
