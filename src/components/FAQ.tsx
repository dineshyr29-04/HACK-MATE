import { ArrowLeft, Plus, Minus, Code2 } from "lucide-react";
import { useState } from "react";
import { useTheme } from '../context/ThemeContext';

export function FAQ({ onBack }: { onBack: () => void }) {
    const { isDark } = useTheme();

    const faqs = [
        {
            q: "Do I have to use the exact tools you recommend?",
            a: "No! Tools are suggestions. We recommend them because they're quick to set up and have free tiers. Use whatever your team is comfortable with."
        },
        {
            q: "Can I use code/projects I built before the hackathon?",
            a: "Check the specific hackathon rules. Some allow builds on existing projects, others require starting from scratch. Our tool assumes starting fresh."
        },
        {
            q: "Will using your tool help me win?",
            a: "Our tool helps you focus on what matters: building fast, designing well, and pitching effectively. Judges care about innovation and execution - we help with both."
        },
        {
            q: "Do you store my project details?",
            a: "With a Free session: No - all data stays in your browser's local storage. Your data is private to your machine unless you explicitly export and share it."
        },
        {
            q: "Is this tool free?",
            a: "Yes! All features are currently free. We may add optional premium features (team collaboration cloud-sync, advanced analytics) later."
        },
        {
            q: "Can I use this for non-hackathon projects?",
            a: "Yes! The workflow works for any software project with a 24-72 hour deadline: product launches, startup MVPs, client projects."
        },
        {
            q: "How are the AI prompts created?",
            a: "Each prompt is written by our team and tested with ChatGPT/Claude. We iterate based on user feedback and judge criteria from 50+ hackathons."
        }
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Navbar */}
            <nav className={`border-b sticky top-0 z-50 backdrop-blur-md ${isDark ? 'border-gray-700 bg-gray-900/80' : 'border-gray-100 bg-white/80'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 transition-colors font-medium ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                            <Code2 className="w-4 h-4" />
                        </div>
                        <span>FAQ</span>
                    </div>
                    <div className="w-24" />
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold mb-4">Frequently Asked Questions</h1>
                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Everything you need to know about the Hackathon Copilot.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.q} answer={faq.a} isDark={isDark} />
                    ))}
                </div>

                <div className={`mt-20 p-8 rounded-3xl border text-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                    <p className={`mb-6 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        We're here to help you win. Reach out to us on Discord or GitHub.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className={`px-6 py-3 rounded-xl font-bold transition-colors ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'}`}>
                            Join Discord
                        </button>
                        <button className={`px-6 py-3 rounded-xl font-bold border transition-colors ${isDark ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}>
                            Email Support
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function FAQItem({ question, answer, isDark }: { question: string; answer: string; isDark: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border rounded-2xl overflow-hidden transition-colors ${isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left p-6 flex items-center justify-between transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
            >
                <span className={`font-bold pr-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>{question}</span>
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {isOpen
                        ? <Minus className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                        : <Plus className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                    }
                </div>
            </button>
            {isOpen && (
                <div className={`p-6 border-t animate-in slide-in-from-top-2 duration-300 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                    <p className={`leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{answer}</p>
                </div>
            )}
        </div>
    );
}