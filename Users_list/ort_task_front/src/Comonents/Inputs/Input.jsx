
const Input = ({ placeholder, value, type, disabled, onChange, err }) => {
  return (
    <>
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="w-full p-4 text-lg bg-neutral-900 border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
      />
      <span className="text-red-500">{err}</span>
    </>
  );
};

export default Input;
