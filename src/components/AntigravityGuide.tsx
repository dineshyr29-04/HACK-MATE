import { useState } from 'react';
import { ArrowLeft, Check, Copy, Terminal, Github, Code2, Sparkles, AlertCircle, ExternalLink, Zap } from 'lucide-react';

type GuideProps = {
  onBack: () => void;
};

export function AntigravityGuide({ onBack }: GuideProps) {
  const [activeTab, setActiveTab] = useState<'what' | 'setup' | 'github' | 'workflow' | 'prompts'>('what');

  const tabs = [
    { id: 'what', label: 'What & When', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'setup', label: 'Install & Setup', icon: <Terminal className="w-4 h-4" /> },
    { id: 'github', label: 'Connect GitHub', icon: <Github className="w-4 h-4" /> },
    { id: 'workflow', label: 'Coding with AI', icon: <Code2 className="w-4 h-4" /> },
    { id: 'prompts', label: 'Prompts', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              Antigravity Guide
            </h1>
          </div>
          <a
            href="https://antigravity.dev" // Placeholder URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-900 hover:underline flex items-center gap-1"
          >
            Visit Website <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6">

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all border-b-2 ${activeTab === tab.id
                ? 'border-gray-900 text-gray-900 bg-gray-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-10 min-h-[500px] animate-in fade-in slide-in-from-bottom-2 duration-300">

          {activeTab === 'what' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">What is Antigravity?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Antigravity is an AI engine designed to accelerate hackathon development.
                Instead of writing boilerplate code manually, you describe your feature,
                and Antigravity generates the file structure, configuration, and core logic.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-gray-400" /> When to use it
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
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

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-1">Core Philosophy</h4>
                <p className="text-sm text-gray-600">
                  Treat AI as a junior developer. It writes the first draft, but YOU are the architect who reviews,
                  refines, and commits the code.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Installation & Setup</h2>
                <p className="text-gray-600">Follow these steps to initialize the engine in your local environment.</p>
              </div>

              <div className="space-y-6">
                <Step
                  number="1"
                  title="Clone the Engine"
                  desc="Download the Antigravity core files to your machine."
                >
                  <CodeBlock code="git clone https://github.com/antigravity/engine.git" />
                </Step>

                <Step
                  number="2"
                  title="Install Dependencies"
                  desc="Install the required Node.js packages. This may take a minute."
                >
                  <CodeBlock code="cd engine && npm install" />
                </Step>

                <Step
                  number="3"
                  title="Configure Environment"
                  desc="Create your environment file and add your API keys."
                >
                  <CodeBlock code="cp .env.example .env" />
                  <p className="text-sm text-gray-500 mt-2 italic">
                    Open .env and paste your OpenAI/Anthropic API keys.
                  </p>
                </Step>

                <Step
                  number="4"
                  title="Start the Server"
                  desc="Launch the local development server."
                >
                  <CodeBlock code="npm run dev" />
                </Step>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Connect GitHub</h2>
                <p className="text-gray-600">Ensure your AI-generated code is safely versioned.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 text-yellow-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>
                    <strong>Warning:</strong> Always review AI code before pushing.
                    Do not commit API keys or sensitive data. Check your .gitignore file.
                  </p>
                </div>

                <Step
                  number="1"
                  title="Initialize Repository"
                  desc="If you haven't already, turn your project into a Git repo."
                >
                  <CodeBlock code="git init" />
                </Step>

                <Step
                  number="2"
                  title="Create Remote"
                  desc="Link your local folder to a GitHub repository."
                >
                  <CodeBlock code="git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" />
                </Step>

                <Step
                  number="3"
                  title="Push Changes"
                  desc="Save your work to the cloud."
                >
                  <CodeBlock code={`git add .\ngit commit -m "feat: initial AI setup"\ngit push -u origin main`} />
                </Step>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">Safe AI Coding Workflow</h2>

              <div className="relative border-l-2 border-gray-200 ml-3 space-y-10 pl-8 py-2">
                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-bold text-sm border border-gray-200">1</span>
                  <h3 className="text-lg font-bold text-gray-900">Define</h3>
                  <p className="text-gray-600 mt-1">
                    Write a clear, specific prompt describing exactly what you need.
                    Include tech stack, libraries, and desired output format.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-bold text-sm border border-gray-200">2</span>
                  <h3 className="text-lg font-bold text-gray-900">Generate</h3>
                  <p className="text-gray-600 mt-1">
                    Run the Antigravity command or paste your prompt into the AI tool.
                    Wait for the code generation to complete.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm border border-amber-200">3</span>
                  <h3 className="text-lg font-bold text-gray-900">Review & Test</h3>
                  <p className="text-gray-600 mt-1">
                    <strong>Crucial Step:</strong> Read the code. does it make sense?
                    Run the app. Does it crash? Fix imports and syntax errors manually.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm border border-green-200">4</span>
                  <h3 className="text-lg font-bold text-gray-900">Commit</h3>
                  <p className="text-gray-600 mt-1">
                    Once stable, commit the changes to Git. This creates a "save point"
                    before you try the next feature.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Ready-to-Use Prompts</h2>
              <div className="grid gap-6">

                <PromptCard
                  title="Frontend Components"
                  desc="Generate beautiful, responsive UI components."
                  prompt="Create a responsive [COMPONENT_NAME] using React, Tailwind CSS, and Lucide Icons. It should have [FEATURE_1] and [FEATURE_2]. Ensure it is accessible and supports dark mode."
                />

                <PromptCard
                  title="Backend API Route"
                  desc="Create secure and efficient API endpoints."
                  prompt="Write a Node.js/Express API route for [FUNCTION]. It should accept [INPUTS], validate the data using Zod, interact with a [DATABASE], and return [OUTPUT]. Include error handling."
                />

                <PromptCard
                  title="Database Schema"
                  desc="Design your data structure."
                  prompt="Design a SQL schema for a [APP_TYPE]. It needs to store Users, [ENTITY_1], and [ENTITY_2]. Define the relationships, primary keys, and foreign keys. Output as valid SQL."
                />

                <PromptCard
                  title="Debug Error"
                  desc="Fix those annoying bugs."
                  prompt="I am getting the following error in my React app: [PASTE_ERROR]. Here is the relevant code snippet: [PASTE_CODE]. Explain why this is happening and provide the corrected code."
                />

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function Step({ number, title, desc, children }: { number: string, title: string, desc: string, children?: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 font-bold text-gray-500 flex items-center justify-center text-sm border border-gray-200">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{desc}</p>
        {children}
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
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all"
        title="Copy"
      >
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

function PromptCard({ title, desc, prompt }: { title: string, desc: string, prompt: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100 transition-all text-gray-600"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="bg-white p-3 rounded border border-gray-100 text-sm text-gray-600 font-mono leading-relaxed">
        {prompt}
      </div>
    </div>
  );
}
