export default function AuthButton({
  children,
  type = "submit",
}) {
  return (
    <button
      type={type}
      className="
      w-full
      rounded-xl
      bg-primary
      text-primary-foreground
      py-3
      font-medium
      transition
      hover:opacity-90
      "
    >
      {children}
    </button>
  );
}