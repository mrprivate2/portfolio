import { FolderOpen } from 'lucide-react';

export default function Folder() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <FolderOpen className="w-16 h-16 text-white/30" />
      <h2 className="font-display font-semibold text-lg text-white mt-5">This folder is empty</h2>
      <p className="text-sm text-white/45 mt-1.5 max-w-xs leading-relaxed">
        Right-click the desktop to create more folders, or drag something in — if you figure out how.
      </p>
    </div>
  );
}
