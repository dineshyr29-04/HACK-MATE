import { Code2, Github, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
    const { isDark } = useTheme();

    return (
        <footer className={`border-t pt-24 pb-12 px-6 relative overflow-hidden ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl -z-10 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`} />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative">
                <div className="col-span-1 md:col-span-1">
                    <div className={`flex items-center gap-3 font-black text-xl tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                            <Code2 className="w-5 h-5" />
                        </div>
                        <span>Hackathon Copilot</span>
                    </div>
                    <p className={`text-sm leading-relaxed mb-8 font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Accelerating <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>200+ builders</span> across{' '}
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8 countries</span> in the last month alone.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="mailto:support@hackcopilot.ai" className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className={`font-bold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Platform</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-500">
                        <li>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                Start Building
                            </button>
                        </li>
                        <li>
                            <span className={`cursor-not-allowed ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                                API Access (Soon)
                            </span>
                        </li>
                        <li>
                            <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                Open Source
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className={`font-bold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Resources</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-500">
                        <li>
                            <a href="https://github.com/anandmahadev/HACK-MATE/tree/main/docs" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                Strategy Guide
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                Templates
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className={`font-bold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Connect</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-500">
                        <li>
                            <a href="https://github.com/anandmahadev" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="mailto:hello@hackcopilot.ai" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                Email Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`max-w-7xl mx-auto pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    © {new Date().getFullYear()} Hackathon Copilot. Build the future.
                </p>
                <div className={`flex gap-6 text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    <span>#HackathonCopilot</span>
                    <span>#WinningDemo</span>
                </div>
            </div>
        </footer>
    );
}