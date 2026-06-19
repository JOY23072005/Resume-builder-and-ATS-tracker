import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Resume Builder</span>
          <span className="opacity-50">·</span>
          <span className="opacity-70">AI Powered ATS Resume Builder</span>
        </div>
        <p className="opacity-60">
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}