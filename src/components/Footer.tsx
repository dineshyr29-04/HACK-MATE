import { Code2, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Subtle background blob */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 font-black text-xl tracking-tight text-gray-900 mb-6">
                        <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <span>Hackathon Copilot</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                        Accelerating <span className="text-gray-900 font-bold">200+ builders</span> across <span className="text-gray-900 font-bold">8 countries</span> in the last month alone.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="mailto:support@hackcopilot.ai" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Platform</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-gray-900 transition-colors">Start Building</button></li>
                        <li><span className="text-gray-300 cursor-not-allowed">API Access (Soon)</span></li>
                        <li><a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">Open Source</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Resources</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <li><a href="https://github.com/anandmahadev/HACK-MATE/tree/main/docs" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">Documentation</a></li>
                        <li><a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">Strategy Guide</a></li>
                        <li><a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">Templates</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Connect</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <li><a href="https://github.com/anandmahadev" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
                        <li><a href="mailto:hello@hackcopilot.ai" className="hover:text-gray-900 transition-colors">Email Us</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    © {new Date().getFullYear()} Hackathon Copilot. Build the future.
                </p>
                <div className="flex gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    <span>#HackathonCopilot</span>
                    <span>#WinningDemo</span>
                </div>
            </div>
        </footer>
    );
}
