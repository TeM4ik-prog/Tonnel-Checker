type SelectProps = {
    placeholder: string;
    name: string;
    error?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[]
    className?: string;
};

export const Select = ({
    placeholder,
    name,
    error,
    value,
    onChange,
    options,
    className = '',
}: SelectProps) => {
    return (
        <div className="flex flex-col">
            <select
                required
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full p-3 mt-1 rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${error ? 'border-2 border-red-500' : ''
                    } ${className}`}
            >
                <option className="text-gray-800" value="" disabled>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option
                        className="text-gray-100 cursor-pointer hover:bg-cyan-500 hover:text-white"
                        key={index}
                        value={option}
                    >
                        {option}
                    </option>

                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
