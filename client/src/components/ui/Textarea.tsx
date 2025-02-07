import { useState } from "react";

type TextareaProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    label?: string;
    rows?: number;
    className?: string;
    disabled?: boolean;
    maxLength?: number;
    name: string;
    required?: boolean
};

export default function Textarea({
    value,
    onChange,
    placeholder = "Введите текст...",
    label,
    rows = 4,
    className = "",
    disabled = false,
    maxLength,
    name,
    required = true
}: TextareaProps) {
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange(e);
    };

    return (
        // <div className={`w-full h-min ${className}`}>
        //     {label && <label className="block text-gray-300 mb-1 font-medium">{label}</label>}
            <textarea
                required={required}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                disabled={disabled}
                className={`w-full p-3 bg-gray-600 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            // {maxLength && (
            //     <div className="text-right text-gray-400 text-sm mt-1">
            //         {charCount}/{maxLength}
            //     </div>
            // )}
        // </div>
    );
}
