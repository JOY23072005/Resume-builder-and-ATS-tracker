export default function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="text-foreground bg-background flex flex-1 items-center justify-center px-4">

      <div
        className="
        w-full
        max-w-md
        bg-card
        border
        border-border
        rounded-3xl
        shadow-xl
        p-8
        "
      >

        <div className="flex justify-center mb-6">
          <div
            className="
            h-16
            w-16
            rounded-full
            bg-primary/10
            flex
            items-center
            justify-center
            text-3xl
            "
          >
          <img 
                className="h-8 w-8" 
                src="/logo-only.png" 
                alt="Logo"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          {title}
        </h1>

        <p className="text-center opacity-70 mt-2 mb-8">
          {subtitle}
        </p>

        {children}

      </div>

    </div>
  );
}