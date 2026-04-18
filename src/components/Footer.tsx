import React from 'react';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-gray-900 mb-6">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <span>HackMate</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        The ultimate Hackathon Copilot designed to help developers build and win. From ideation to submission, we've got you covered.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/anandmahadev/HACK-MATE" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Platform</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <li><a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it Works</a></li>
                        <li><a href="#features" className="hover:text-gray-900 transition-colors">Features</a></li>
                        <li><a href="#resources" className="hover:text-gray-900 transition-colors">Resources</a></li>
                        <li><a href="#guide" className="hover:text-gray-900 transition-colors">Guide</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Resources</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Hackathon Strategy</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Prompt Engineering</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Build Stacks</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Pitch Templates</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h3>
                    <ul className="space-y-4 text-sm text-gray-500 font-medium">
                        <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-xs font-medium">
                    © {new Date().getFullYear()} HackMate. Built for Hackers.
                </p>
                <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>#HackathonCopilot</span>
                    <span>#HackMate</span>
                    <span>#WinTheHack</span>
                </div>
            </div>
        </footer>
    );
}
