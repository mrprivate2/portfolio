import { useMemo, useState } from 'react';
import { Download, FileText, Save } from 'lucide-react';
import { readmeContent } from '../data/readme';

const toolbarItems = ['File', 'Edit', 'View', 'Format', 'Help'];

export default function Readme() {
  const [text, setText] = useState(readmeContent);
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => {
    const lines = text.split('\n').length;
    const chars = text.length;
    return { lines, chars };
  }, [text]);

  const save = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.txt';
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0f0b]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 pt-1.5 pb-1 border-b border-white/10 bg-black/30">
        {toolbarItems.map((item) => (
          <button
            key={item}
            className="px-2.5 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white rounded transition-colors"
          >
            {item}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={save}
            className="flex items-center gap-1.5 rounded bg-accent hover:bg-accent-hover text-white text-xs px-3 py-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> {saved ? 'Saved ✓' : 'Save'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="w-12 shrink-0 border-r border-white/10 bg-black/20 py-4 text-right pr-2 font-mono text-[12px] leading-[1.6] text-white/25 select-none" aria-hidden="true">
          {Array.from({ length: stats.lines }, (_, i) => i + 1).map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label="README.txt contents"
          className="flex-1 bg-transparent p-4 font-mono text-[13px] leading-[1.6] text-white/85 outline-none resize-none placeholder-white/25"
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 px-4 py-1.5 border-t border-white/10 bg-black/30 text-[11px] text-white/45 shrink-0">
        <span className="flex items-center gap-1.5">
          <FileText className="w-3 h-3" /> README.txt
        </span>
        <span>{stats.lines} lines · {stats.chars} chars</span>
        <span className="ml-auto">UTF-8 · Plain Text</span>
        <span>
          <Download className="w-3 h-3 inline mr-1" />
          Saving downloads a copy
        </span>
      </div>
    </div>
  );
}
