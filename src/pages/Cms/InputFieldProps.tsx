interface InputFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="font-medium text-gray-700 dark:text-white">{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border px-3 py-2 rounded-md text-black"
            />
        </div>
    );
};

export default InputField;
