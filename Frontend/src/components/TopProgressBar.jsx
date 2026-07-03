import { useLoading } from "../context/LoadingContext";

export default function TopProgressBar() {
  const { loading, progress, message } = useLoading();

  if (!loading) return null;

  return (
    <div className="w-full">
      {/* Progress Bar Container */}
      <div className="h-1 bg-primary/20">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-primary transition-all duration-500"
        />
      </div>

      {/* Optional Loading Message */}
      {message && (
        <div className="text-xs text-center mt-1">
          {message}
        </div>
      )}
    </div>
  );
}