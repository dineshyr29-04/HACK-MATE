import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, ArrowLeft, Users, GitBranch, Download, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { STAGES } from './StageSelection';
import { store } from '../lib/store';

interface StageDetailProps {
    stageId: string;
    onBack: () => void;
    problemStatement: string;
    projectId: string; // Added prop
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
    alternatives?: { name: string; why: string; url: string }[];
    warning?: string;
}> = {
    ideation: {
        expl: "Brainstorm core features, user flows, and UVP. Don't overthink—aim for volume then refine.",
        toolName: "ChatGPT / Claude",
        toolWhy: "Best for rapid idea generation and refining logic gaps.",
        toolUrl: "https://chat.openai.com",
        promptTemplate: `Act as a World-Class Product Manager & Hackathon Judge.
I am building a project for a hackathon.
Problem Statement: [PROBLEM]

Goal: Win the hackathon by showing innovation, technical complexity, and user value.

Please provide a comprehensive Product Spec:
1. Core Value Prop: 1 sentence pitch.
2. 3 "Wow" Features: Unique features that minimal competitors have.
3. Technical "X-Factor": One complex technical component (e.g., real-time sync, AI agent, blockchain auth) that impresses judges.
4. MVP Scope: What exactly to build in 24 hours (ignore nice-to-haves).
5. User Flow: Step-by-step walkthough of the demo.`,
        checklist: [
            "Define core problem statement",
            "Identify target user persona",
            "Brainstorm 3 key features",
            "Define the 'X-factor' tech component",
            "Draft user journey flow",
            "Decide on MVP scope (must-haves vs nice-to-haves)",
            "Create a 1-sentence elevator pitch"
        ],
        alternatives: [
            { name: "Miro", why: "Better for visual brainstorming", url: "https://miro.com" },
            { name: "Whimsical", why: "Faster wireframing", url: "https://whimsical.com" }
        ],
        docsUrl: "https://platform.openai.com/docs/guides/prompt-engineering"
    },
    research: {
        expl: "Validate if this exists. Find competitors. Find technical feasibility.",
        toolName: "Perplexity / Google",
        toolWhy: "Real-time search to check if your idea is unique.",
        toolUrl: "https://www.perplexity.ai",
        promptTemplate: `Act as a Market Research Analyst.
I am solving: [PROBLEM]

Please perform a deep-dive analysis:
1. Direct Competitors: List 3 real startups/tools solving this.
2. Gap Analysis: What are they missing? (UX speed, AI features, pricing, etc.)
3. Technical Feasibility: specific APIs or open-source libraries I can use to build this faster.
4. The "Hook": One insight that makes my solution 10x better than the status quo.`,
        checklist: [
            "Identify 3 direct competitors",
            "List weakness of each competitor",
            "Verify required APIs are available/free",
            "Search for existing open-source repos",
            "Confirm technical feasibility of core feature",
            "Define your unique value proposition (UVP)",
            "Check for any legal/compliance blockers"
        ],
    },
    design: {
        expl: "Create high-fidelity mockups. Judges judge the book by its cover.",
        toolName: "Figma",
        toolWhy: "Industry standard for interface design.",
        toolUrl: "https://www.figma.com",
        promptTemplate: `Act as a Senior UI/UX Designer at Linear/Airbnb.
I need a design system and UI layout for: [PROBLEM]

Provide:
1. Color Palette: Hex codes for Primary, Secondary, Accent, and Background (Dark/Light mode).
2. Typography: Font pairing (Heading & Body) recommendations.
3. Key Screens: Bulleted list of elements for Landing Page, Dashboard, and Core Action flow.
4. Micro-interactions: 2 specific animation ideas to make it feel premium.
5. Image Generation Prompt: A prompt I can use in Midjourney to generate a hero image for this app.`,
        checklist: [
            "Choose a primary color palette",
            "Select font pairings (Heading/Body)",
            "Design the App Logo / Icon",
            "Mockup the Landing Page hero section",
            "Mockup the Core Feature dashboard",
            "Design specific micro-interactions (hover, loading)",
            "Export all assets for developers"
        ],
        docsUrl: "https://help.figma.com/hc/en-us"
    },
    build: {
        expl: "Code the frontend and connect the backend. Speed is key.",
        toolName: "Bolt.new / Replit",
        toolWhy: "Instant dev environment deployment.",
        toolUrl: "https://bolt.new",
        alternatives: [
            { name: "Vercel", why: "Best for deploying Next.js", url: "https://vercel.com" },
            { name: "Replit", why: "Good for Python/Node backends", url: "https://replit.com" }
        ],
        warning: "Don't spend more than 1 hour on setup. Use a template.",
        promptTemplate: `Act as a 10x Full Stack Developer.
Stack: React, Tailwind, Supabase/Firebase (optional), OpenAI API.
Project: [PROBLEM]

Generate a step-by-step implementation plan for the MVP:
1. Folder Structure: File tree for a scalable React app.
2. Key Components: List of reusable components needed.
3. State Management: How to handle data flow.
4. Database Schema: Simple JSON structure or Table design.
5. Critical Code Snippets: The logic for the "Core Feature" (e.g., the AI wrapper or main algorithm).`,
        checklist: [
            "Initialize Git repository",
            "Set up project scaffolding (Vite/Next.js)",
            "Install Tailwind CSS & core libraries",
            "Build reusable UI components",
            "Implement Routing / Navigation",
            "Connect Backend / APIs",
            "Implement State Management",
            "Test Core Feature end-to-end"
        ],
    },
    git: {
        expl: "Version control is mandatory. Don't lose code.",
        toolName: "GitHub",
        toolWhy: "Industry standard source control.",
        toolUrl: "https://github.com",
        promptTemplate: "N/A", // Handled by Git Module
        checklist: ["Initialize Repo", "First Commit", "Invite Team"],
    },
    pitch: {
        expl: "The pitch is 50% of the score. Make it compelling.",
        toolName: "Gamma",
        toolWhy: "AI-generated slides in seconds.",
        toolUrl: "https://gamma.app",
        promptTemplate: `Act as a Startup Founder pitching to YC.
Project: [PROBLEM]

Write a winning 2-minute pitch script:
1. The Hook (0:00-0:15): A relatable problem statement.
2. The Solution (0:15-0:45): High-level explanation of the app "Like X for Y".
3. The Demo (0:45-1:30): What exactly to show on screen (Don't show login, show the magic).
4. The Tech (1:30-1:45): Briefly mention the stack and the "hard part".
5. The Ask (1:45-2:00): Why this matters.

Also suggest 5 slide titles for the deck.`,
        checklist: [
            "Draft the 2-minute script",
            "Create 'Problem' slide",
            "Create 'Solution' slide",
            "Record Demo Video (Screen recording)",
            "Embed Demo into slides",
            "Create 'Future Roadmap' slide",
            "Practice pitch 5 times"
        ],
    },
    submit: {
        expl: "Record the demo and submit. Don't miss the deadline.",
        toolName: "Loom",
        toolWhy: "Fast, reliable screen recording.",
        toolUrl: "https://www.loom.com",
        promptTemplate: `Act as a Video Director.
We need to record a 2-minute demo video for [PROBLEM].

Create a shot-list and script:
1. Scene 1 (FaceCam): Intro and "The Pain".
2. Scene 2 (Screen Recording): The "Aha!" moment (the main feature working).
3. Scene 3 (Screen Recording): A secondary feature or technical highlight.
4. Scene 4 (Slide): Tech Stack & Future Roadmap.
5. Scene 5 (FaceCam): Conclusion.

Give me the exact voiceover text for each scene.`,
        checklist: [
            "Record finalized 2-min demo video",
            "Edit video (trim dead air)",
            "Upload to YouTube / Loom",
            "Write Devpost project description",
            "Add screenshots to submission",
            "Double check GitHub repo visibility",
            "Submit before deadline!"
        ],
    }
};

export function StageDetail({ stageId, onBack, problemStatement, projectId }: StageDetailProps) {
    const data = STAGE_DATA[stageId];
    const stageInfo = STAGES.find(s => s.id === stageId);

    // Persisted State
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const [progress, setProgress] = useState(0);
    const [customPrompt, setCustomPrompt] = useState<string | null>(null);
    const [showAlternatives, setShowAlternatives] = useState(false);

    // Initial load from Store
    useEffect(() => {
        const state = store.getProjectState(projectId);

        // Load Checklist
        const savedChecklist = state.checklist[stageId] || {};
        setCheckedItems(savedChecklist);

        // Load Custom Prompt
        if (state.customPrompts[stageId]) {
            setCustomPrompt(state.customPrompts[stageId]);
        } else {
            setCustomPrompt(null);
        }

    }, [stageId, projectId]);

    // Calculate progress (visual only, data already saved on check)
    useEffect(() => {
        if (!data) return;
        const total = data.checklist.length;
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;
        setProgress((checkedCount / total) * 100);
    }, [checkedItems, data]);

    const handleCheck = (index: number) => {
        const newState = !checkedItems[index];
        setCheckedItems(prev => ({ ...prev, [index]: newState }));
        store.updateChecklist(projectId, stageId, index, newState);
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        setCustomPrompt(newVal);
        store.saveCustomPrompt(projectId, stageId, newVal);
    };

    const handleResetPrompt = () => {
        setCustomPrompt(null);
        store.saveCustomPrompt(projectId, stageId, ""); // Clear in store
    };

    const handleDownload = () => {
        if (!data) return;
        const checkedList = data.checklist.map((item, i) =>
            `[${checkedItems[i] ? 'x' : ' '}] ${item}`
        ).join('\n');

        const content = `
HACKATHON COPILOT - ${stageInfo?.title.toUpperCase()}
--------------------------------------------------
Recommended Tool: ${data.toolName}
Use it here: ${data.toolUrl}

YOUR STARTING PROMPT:
---------------------
${data.promptTemplate.replace('[PROBLEM]', problemStatement)}

CHECKLIST STATUS:
-----------------
${checkedList}

Progress: ${Math.round(progress)}%
Generated by Hackathon Copilot
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

    const [copied, setCopied] = useState(false);

    // If Git stage, render Git Module
    if (stageId === 'git') {
        return <GitModule onBack={onBack} />;
    }

    if (!data) return <div>Inavlid Stage</div>;

    const basePrompt = data.promptTemplate.replace('[PROBLEM]', problemStatement);
    const displayPrompt = customPrompt !== null ? customPrompt : basePrompt;
    const isEdited = customPrompt !== null && customPrompt !== basePrompt;

    const handleCopy = () => {
        navigator.clipboard.writeText(displayPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                        {stageInfo?.title}
                    </h1>
                </div>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4" /> Download Plan
                </button>
            </header>

            <main className="flex-1 p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
                {/* Explanation */}
                <section>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                        {data.expl}
                    </p>
                    {data.warning && (
                        <div className="mt-4 flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{data.warning}</span>
                        </div>
                    )}
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tool Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Recommended Tool</h2>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.toolName}</h3>
                            <p className="text-gray-600 mb-6">{data.toolWhy}</p>
                        </div>
                        <a
                            href={data.toolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
                        >
                            Open {data.toolName} <ExternalLink className="w-4 h-4 ml-2" />
                        </a>

                        {/* Alternatives Section (Collapsed by default) */}
                        {data.alternatives && (
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <button
                                    onClick={() => setShowAlternatives(!showAlternatives)}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-full"
                                >
                                    {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    {showAlternatives ? 'Hide Alternatives' : 'Show Tool Alternatives'}
                                </button>

                                {showAlternatives && (
                                    <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {data.alternatives.map((alt, i) => (
                                            <div key={i} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm">{alt.name}</div>
                                                    <div className="text-xs text-gray-500">{alt.why}</div>
                                                </div>
                                                <a href={alt.url} target="_blank" rel="noopener" className="text-gray-400 hover:text-gray-700">
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Functional Checklist */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Action Plan</h2>
                            <span className="text-sm font-medium text-gray-900">{Math.round(progress)}% Done</span>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <ul className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                            {data.checklist.map((item, i) => (
                                <li
                                    key={i}
                                    className={`group flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer select-none ${checkedItems[i] ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                                    onClick={() => handleCheck(i)}
                                >
                                    <div className={`mt-0.5 min-w-5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checkedItems[i]
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-gray-300 bg-white group-hover:border-gray-400'
                                        }`}>
                                        {checkedItems[i] && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={`text-sm leading-snug transition-all ${checkedItems[i] ? 'text-gray-400 line-through' : 'text-gray-700'
                                        }`}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Prompt Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Best Prompt</h2>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <div className="relative">
                        <div className="relative">
                            <textarea
                                value={displayPrompt}
                                onChange={handlePromptChange}
                                className={`w-full h-96 p-4 rounded-lg bg-gray-50 border text-gray-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900/20 transition-all ${isEdited ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200'}`}
                                placeholder="Edit this prompt..."
                            />
                            {isEdited && (
                                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                    <span className="text-xs text-amber-600 font-medium px-2 py-1 bg-amber-100 rounded">Edited</span>
                                    <button onClick={handleResetPrompt} className="text-xs text-gray-500 hover:text-gray-900 underline">Reset</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {data.docsUrl && (
                    <div className="text-center">
                        <a href={data.docsUrl} target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4">
                            View Official Documentation
                        </a>
                    </div>
                )}

            </main>
        </div>
    );
}

function GitModule({ onBack }: { onBack: () => void }) {
    const [activeTab, setActiveTab] = useState<'setup' | 'daily' | 'team'>('setup');

    const tabs = [
        { id: 'setup', label: 'Quick Setup' },
        { id: 'daily', label: 'Daily Commands' },
        { id: 'team', label: 'Team Collab' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center gap-4 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    Git & GitHub
                </h1>
            </header>

            <div className="max-w-4xl mx-auto w-full p-6 sm:p-8">
                <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-lg mb-8 w-fit mx-auto sm:mx-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[400px]">
                    {activeTab === 'setup' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-semibold text-gray-900">First Time Setup</h2>
                            <p className="text-gray-600">Run these once to configure your identity.</p>

                            <CodeBlock code={`git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"`} />

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <a href="https://git-scm.com/downloads" target="_blank" rel="noopener" className="text-blue-600 hover:underline flex items-center gap-2">
                                    Download Git <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'daily' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-semibold text-gray-900">The Loop</h2>
                            <p className="text-gray-600">Do this every time you finish a feature.</p>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase">1. Stage Changes</span>
                                    <CodeBlock code="git add ." />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase">2. Commit</span>
                                    <CodeBlock code='git commit -m "added login page"' />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase">3. Push</span>
                                    <CodeBlock code="git push origin main" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase">4. Pull (if teammates pushed)</span>
                                    <CodeBlock code="git pull origin main" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-semibold text-gray-900">Working Together</h2>

                            <div className="grid gap-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Clone Repository</h3>
                                    <p className="text-sm text-gray-500 mb-2">Get the code on a new machine.</p>
                                    <CodeBlock code="git clone <repo-url>" />
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><GitBranch className="w-4 h-4" /> Create Branch</h3>
                                    <p className="text-sm text-gray-500 mb-2">Work on a feature safely.</p>
                                    <CodeBlock code="git checkout -b feature-name" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group mt-2">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {code}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all"
                title="Copy"
            >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            </button>
        </div>
    );
}
