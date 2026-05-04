import { useState } from 'react';
import { ArrowLeft, Check, Copy, Terminal, Github, Code2, Sparkles, AlertCircle, ExternalLink, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type GuideProps = {
  onBack: () => void;
};

type TabId = 'what' | 'setup' | 'github' | 'workflow' | 'prompts';

export function AntigravityGuide({ onBack }: GuideProps) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('what');

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'what', label: 'What & When', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'setup', label: 'Install & Setup', icon: <Terminal className="w-4 h-4" /> },
    { id: 'github', label: 'Connect GitHub', icon: <Github className="w-4 h-4" /> },
    { id: 'workflow', label: 'Coding with AI', icon: <Code2 className="w-4 h-4" /> },
    { id: 'prompts', label: 'Prompts', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`border-b sticky top-0 z-50 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Antigravity Guide</h1>
          </div>
          <a
            href="https://antigravity.google/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium hover:underline flex items-center gap-1 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-900'}`}
          >
            Visit Website <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6">
        {/* Tabs */}
        <div className={`flex flex-wrap gap-2 mb-8 border-b pb-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all border-b-2 ${activeTab === tab.id
                ? isDark
                  ? 'border-white text-white bg-gray-800/50'
                  : 'border-gray-900 text-gray-900 bg-gray-50/50'
                : isDark
                  ? 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`rounded-xl border shadow-sm p-6 sm:p-10 min-h-[500px] animate-in fade-in slide-in-from-bottom-2 duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

          {activeTab === 'what' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">What is Antigravity?</h2>
              <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Antigravity is an AI engine designed to accelerate hackathon development.
                Instead of writing boilerplate code manually, you describe your feature,
                and Antigravity generates the file structure, configuration, and core logic.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className={`p-5 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-gray-400" /> When to use it
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Starting a new project from scratch</li>
                    <li>• Generating complex UI components</li>
                    <li>• Setting up backend API routes</li>
                    <li>• Creating database schemas</li>
                  </ul>
                </div>
                <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> When NOT to use it
                  </h3>
                  <ul className="space-y-2 text-sm text-amber-800/80">
                    <li>• Debugging specific logic errors</li>
                    <li>• Minor text edits or CSS tweaks</li>
                    <li>• Deploying to production</li>
                  </ul>
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className="font-medium mb-1">Core Philosophy</h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Treat AI as a junior developer. It writes the first draft, but YOU are the architect who reviews, refines, and commits the code.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Installation & Setup</h2>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Follow these steps to initialize the engine in your local environment.</p>
              </div>
              <div className="space-y-6">
                <Step number="1" title="Clone the Engine" desc="Download the Antigravity core files to your machine." isDark={isDark}>
                  <CodeBlock code="git clone https://github.com/antigravity/engine.git" />
                </Step>
                <Step number="2" title="Install Dependencies" desc="Install the required Node.js packages. This may take a minute." isDark={isDark}>
                  <CodeBlock code="cd engine && npm install" />
                </Step>
                <Step number="3" title="Configure Environment" desc="Create your environment file and add your API keys." isDark={isDark}>
                  <CodeBlock code="cp .env.example .env" />
                  <p className="text-sm mt-2 italic text-gray-500">Open .env and paste your OpenAI/Anthropic API keys.</p>
                </Step>
                <Step number="4" title="Start the Server" desc="Launch the local development server." isDark={isDark}>
                  <CodeBlock code="npm run dev" />
                </Step>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Connect GitHub</h2>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Ensure your AI-generated code is safely versioned.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 text-yellow-800 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p><strong>Warning:</strong> Always review AI code before pushing. Do not commit API keys or sensitive data.</p>
              </div>
              <div className="space-y-6">
                <Step number="1" title="Initialize Repository" desc="Turn your project into a Git repo." isDark={isDark}>
                  <CodeBlock code="git init" />
                </Step>
                <Step number="2" title="Create Remote" desc="Link your local folder to a GitHub repository." isDark={isDark}>
                  <CodeBlock code="git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" />
                </Step>
                <Step number="3" title="Push Changes" desc="Save your work to the cloud." isDark={isDark}>
                  <CodeBlock code={`git add .\ngit commit -m "feat: initial AI setup"\ngit push -u origin main`} />
                </Step>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">Safe AI Coding Workflow</h2>
              <div className={`relative border-l-2 ml-3 space-y-10 pl-8 py-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                {[
                  { num: '1', color: isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200', title: 'Define', desc: 'Write a clear, specific prompt describing exactly what you need. Include tech stack, libraries, and desired output format.' },
                  { num: '2', color: isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200', title: 'Generate', desc: 'Run the Antigravity command or paste your prompt into the AI tool. Wait for the code generation to complete.' },
                  { num: '3', color: 'bg-amber-100 text-amber-600 border-amber-200', title: 'Review & Test', desc: 'Crucial Step: Read the code. Does it make sense? Run the app. Does it crash? Fix imports and syntax errors manually.' },
                  { num: '4', color: 'bg-green-100 text-green-600 border-green-200', title: 'Commit', desc: 'Once stable, commit the changes to Git. This creates a "save point" before you try the next feature.' },
                ].map((step) => (
                  <div key={step.num} className="relative">
                    <span className={`absolute -left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${step.color}`}>{step.num}</span>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Ready-to-Use Prompts</h2>
              <div className="grid gap-6">
                <PromptCard isDark={isDark} title="Frontend Components" desc="Generate beautiful, responsive UI components." prompt="Create a responsive [COMPONENT_NAME] using React, Tailwind CSS, and Lucide Icons. It should have [FEATURE_1] and [FEATURE_2]. Ensure it is accessible and supports dark mode." />
                <PromptCard isDark={isDark} title="Backend API Route" desc="Create secure and efficient API endpoints." prompt="Write a Node.js/Express API route for [FUNCTION]. It should accept [INPUTS], validate the data using Zod, interact with a [DATABASE], and return [OUTPUT]. Include error handling." />
                <PromptCard isDark={isDark} title="Database Schema" desc="Design your data structure." prompt="Design a SQL schema for a [APP_TYPE]. It needs to store Users, [ENTITY_1], and [ENTITY_2]. Define the relationships, primary keys, and foreign keys. Output as valid SQL." />
                <PromptCard isDark={isDark} title="Debug Error" desc="Fix those annoying bugs." prompt="I am getting the following error in my React app: [PASTE_ERROR]. Here is the relevant code snippet: [PASTE_CODE]. Explain why this is happening and provide the corrected code." />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Step({ number, title, desc, children, isDark }: { number: string; title: string; desc: string; children?: React.ReactNode; isDark: boolean }) {
  return (
    <div className="flex gap-4">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm border ${isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{title}</h3>
        <p className={`text-sm mb-3 text-gray-500`}>{desc}</p>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">{code}</pre>
      <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all">
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

function PromptCard({ title, desc, prompt, isDark }: { title: string; desc: string; prompt: string; isDark: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className={`rounded-lg border p-5 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 border rounded transition-all ${isDark ? 'bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className={`p-3 rounded border text-sm font-mono leading-relaxed ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-100 text-gray-600'}`}>
        {prompt}
      </div>
    </div>
  );
}