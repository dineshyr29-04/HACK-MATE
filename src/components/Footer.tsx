import React from 'react';
import { Code2, Github, Twitter, Mail, ArrowUpRight } from 'lucide-react';

// 1. Added a TypeScript interface to accept your passed props
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
    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6 relative overflow-hidden">
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
                        <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} />
                        <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
                        <SocialLink href="mailto:support@hackcopilot.ai" icon={<Mail className="w-5 h-5" />} />
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Platform</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        {/* 2. Mapped handlers to buttons */}
                        <FooterLink label="How It Works" onClick={onOpenHowItWorks} />
                        <FooterLink label="Features" onClick={onOpenFeatures} />
                        <FooterLink label="FAQ" onClick={onOpenFAQ} />
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Resources</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <FooterLink label="Resources Hub" onClick={onOpenResources} />
                        <FooterLink label="Strategy Guide" onClick={onOpenGuide} />
                        <FooterLink label="Case Studies" onClick={onOpenCaseStudies} />
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Connect</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <FooterLink label="GitHub" href="https://github.com" isExternal />
                        <FooterLink label="LinkedIn" href="https://linkedin.com" isExternal />
                        <FooterLink label="Email Us" href="mailto:hello@hackcopilot.ai" />
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

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all transform hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}

function FooterLink({ label, onClick, href, isExternal }: { label: string; onClick?: () => void; href?: string, isExternal?: boolean }) {
    if (href) {
        return (
            <li>
                <a 
                    href={href} 
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    {label}
                    {isExternal && <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />}
                </a>
            </li>
        );
    }

    return (
        <li>
            <button 
                onClick={onClick}
                className="group flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
                {label}
            </button>
        </li>
    );
}
