import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface TrashFile {
  name: string;
  size: string;
  note: string;
}

const initialFiles: TrashFile[] = [
  { name: 'dead_code.js', size: '0 B', note: 'kept for the memories' },
  { name: 'old_ideas.md', size: '12 KB', note: 'most were… interesting' },
  { name: 'temp_notes.txt', size: '3 KB', note: 'temporary since 2023' },
];

export default function Trash() {
  const [files, setFiles] = useState<TrashFile[]>(initialFiles);
  const [emptied, setEmptied] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
        <Trash2 className="w-8 h-8 text-white/40" />
      </div>

      {files.length === 0 ? (
        <>
          <h2 className="font-display font-semibold text-lg text-white mt-5">Trash is empty</h2>
          <p className="text-sm text-white/45 mt-1.5 max-w-xs leading-relaxed">
            {emptied ? 'You monster.' : "Nothing here. I don't throw away good projects."}
          </p>
        </>
      ) : (
        <>
          <h2 className="font-display font-semibold text-lg text-white mt-5">Trash</h2>
          <p className="text-sm text-white/45 mt-1 max-w-xs leading-relaxed">
            Mostly unfinished side quests.
          </p>

          <ul className="w-full max-w-sm mt-5 space-y-2 text-left">
            {files.map((f) => (
              <li
                key={f.name}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
              >
                <span className="font-mono text-[13px] text-white/80">{f.name}</span>
                <span className="text-[11px] text-white/35">{f.size}</span>
                <span className="ml-auto text-[11px] text-white/30 italic truncate">{f.note}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              setFiles([]);
              setEmptied(true);
            }}
            className="mt-5 rounded-lg border border-white/15 hover:border-[#f87171]/60 text-white/70 hover:text-[#f87171] text-xs font-medium px-4 py-2 transition-colors"
          >
            Empty Trash
          </button>
        </>
      )}
    </div>
  );
}
