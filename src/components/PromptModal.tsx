import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
    title: string;
    placeholder: string;
    defaultValue?: string;
    maxLength?: number;
}

export function PromptModal({ isOpen, onClose, onSubmit, title, placeholder, defaultValue = '', maxLength = 100 }: PromptModalProps) {
    const { isDark } = useTheme();
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setValue(defaultValue);
            setError(false);
        }
    }, [isOpen, defaultValue]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.length > maxLength) { setError(true); return; }
        if (value.trim()) { onSubmit(value); setValue(''); onClose(); }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setValue(newVal);
        setError(newVal.length > maxLength);
    };

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className={`rounded-[2rem] shadow-2xl w-full max-w-md p-8 border relative overflow-hidden animate-in zoom-in-95 duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 -z-10 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`} />

                <button
                    onClick={onClose}
                    className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            autoFocus
                            value={value}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`w-full px-5 py-4 rounded-2xl border focus:ring-4 transition-all font-medium outline-none ${error
                                ? 'border-red-500 focus:ring-red-100'
                                : isDark
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-gray-400 focus:ring-gray-600/30'
                                    : 'bg-white border-gray-200 text-gray-900 focus:border-gray-900 focus:ring-gray-900/5'}`}
                        />
                        <div className={`absolute right-4 bottom-2 text-[10px] font-bold ${error ? 'text-red-500' : 'text-gray-400'}`}>
                            {value.length}/{maxLength}
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                            Character limit exceeded by {value.length - maxLength}!
                        </p>
                    )}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-lg ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-gray-900' : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'}`}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}