type Props = {
  placeholder: string;
  name: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isRequired?: boolean;
};

export const Input = ({
  placeholder,
  name,
  type = 'text',
  error,
  value,
  onChange,
  className = '',
  isRequired = true
}: Props) => {
  return (
    <div className="flex flex-col">
      <input
        // required={isRequired}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 text-gray-100 rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${error ? 'border-2 border-red-500' : ''
          } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
