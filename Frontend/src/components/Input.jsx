export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
      w-full
      rounded-xl
      border
      bg-background
      border-border
      px-4
      py-3
      outline-none
      transition
      focus:ring-2
      focus:ring-primary
      "
    />
  );
}