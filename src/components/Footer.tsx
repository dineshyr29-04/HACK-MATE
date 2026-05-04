import { Code2, Github, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
    onOpenHowItWorks?: () => void;
    onOpenFeatures?: () => void;
    onOpenResources?: () => void;
    onOpenGuide?: () => void;
    onOpenFAQ?: () => void;
    onOpenCaseStudies?: () => void;
}

export function Footer({
    onOpenHowItWorks,
    onOpenFeatures,
    onOpenResources,
    onOpenGuide,
    onOpenFAQ,
    onOpenCaseStudies
}: FooterProps) {
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
                        <SocialLink href="https://github.com/anandmahadev/HACK-MATE" icon={<Github className="w-5 h-5" />} isDark={isDark} />
                        <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} isDark={isDark} />
                        <SocialLink href="mailto:support@hackcopilot.ai" icon={<Mail className="w-5 h-5" />} isDark={isDark} />
                    </div>
                </div>

                <div>
                    <h3 className={`font-bold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Platform</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-500">
                        <FooterLink label="How It Works" onClick={onOpenHowItWorks} isDark={isDark} />
                        <FooterLink label="Features" onClick={onOpenFeatures} isDark={isDark} />
                        <FooterLink label="FAQ" onClick={onOpenFAQ} isDark={isDark} />
                    </ul>
                </div>

                <div>
                    <h3 className={`font-bold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Resources</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-500">
                        <FooterLink label="Resources Hub" onClick={onOpenResources} isDark={isDark} />
                        <FooterLink label="Strategy Guide" onClick={onOpenGuide} isDark={isDark} />
                        <FooterLink label="Case Studies" onClick={onOpenCaseStudies} isDark={isDark} />
                    </ul>
                </div>

                <div>
                    <h3 className={`font-bold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Connect</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-500">
                        <FooterLink label="GitHub" href="https://github.com/anandmahadev" isExternal isDark={isDark} />
                        <FooterLink label="LinkedIn" href="https://linkedin.com" isExternal isDark={isDark} />
                        <FooterLink label="Email Us" href="mailto:hello@hackcopilot.ai" isDark={isDark} />
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

function SocialLink({ href, icon, isDark }: { href: string; icon: React.ReactNode; isDark: boolean }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all transform hover:-translate-y-1 ${isDark
                ? 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-white hover:text-gray-900 hover:border-white'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900'}`}
        >
            {icon}
        </a>
    );
}

function FooterLink({ label, onClick, href, isExternal, isDark }: { label: string; onClick?: () => void; href?: string; isExternal?: boolean; isDark: boolean }) {
    if (href) {
        return (
            <li>
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className={`group flex items-center gap-1 text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {label}
                    {isExternal && <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all" />}
                </a>
            </li>
        );
    }

    return (
        <li>
            <button
                onClick={onClick}
                className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
                {label}
            </button>
        </li>
    );
}