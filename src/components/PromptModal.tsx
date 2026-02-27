import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
    title: string;
    placeholder: string;
    defaultValue?: string;
}

export function PromptModal({ isOpen, onClose, onSubmit, title, placeholder, defaultValue = '' }: PromptModalProps) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (isOpen) setValue(defaultValue);
    }, [isOpen, defaultValue]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value);
            setValue('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
            <div
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 border border-gray-100 relative overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 -z-10" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        autoFocus
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all text-gray-900 font-medium outline-none"
                    />
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 rounded-xl font-bold bg-gray-900 text-white hover:bg-black transition-all shadow-lg shadow-gray-200"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
 
 
 
 
