import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Copy, Mail, Send } from 'lucide-react';
import { socials } from '../data/socials';
import { brandIcons, platformColors, type PlatformId } from '../lib/brandIcons';
import { cn } from '../lib/cn';
import { useToast } from '../context/Toast';

interface Channel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: PlatformId | 'mail';
}

const channels: Channel[] = [
  { id: 'email', label: 'Email', value: socials.email, href: `mailto:${socials.email}`, icon: 'mail' },
  ...(['github', 'linkedin', 'x'] as const)
    .filter((id) => socials[id].length > 0)
    .map((id) => ({
      id,
      label: id === 'x' ? 'X (Twitter)' : id.charAt(0).toUpperCase() + id.slice(1),
      value: socials[id].replace(/^https?:\/\/(www\.)?/, ''),
      href: socials[id],
      icon: id as PlatformId,
    })),
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };

export default function Contact() {
  const { notify } = useToast();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(socials.email);
      notify('Email copied');
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent-soft font-medium">Contact</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">Let's build something.</h2>
        <p className="text-sm text-white/55 mt-2">
          Have a project, a role, or just an idea? My inbox is open — I usually reply within 24 hours.
        </p>

        {/* Channels */}
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          {channels.map((channel) => {
            const isMail = channel.icon === 'mail';
            const Icon = isMail ? Mail : brandIcons[channel.icon as PlatformId];
            return (
              <a
                key={channel.id}
                href={channel.href}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/25 hover:bg-white/[0.06] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={
                    isMail
                      ? {
                          backgroundColor: 'rgba(var(--accent-channels), 0.1)',
                          color: 'var(--accent-soft)',
                          border: '1px solid rgba(var(--accent-channels), 0.25)',
                        }
                      : {
                          backgroundColor: `${platformColors[channel.icon as PlatformId]}1a`,
                          color: platformColors[channel.icon as PlatformId],
                          border: `1px solid ${platformColors[channel.icon as PlatformId]}40`,
                        }
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">{channel.label}</p>
                  <p className="text-[13px] text-white/85 truncate">{channel.value}</p>
                </div>
                {isMail ? (
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    title="Copy email"
                    className="ml-auto shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-accent-soft hover:bg-white/[0.06] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white/70 transition-colors shrink-0" />
                )}
              </a>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:p-6 flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/45">Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                className={cn(
                  'rounded-lg border bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors',
                  errors.name ? 'border-[#f87171]/60 focus:border-[#f87171]' : 'border-white/10 focus:border-accent'
                )}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="text-xs text-[#f87171]">{errors.name}</span>}
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/45">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@corp.io"
                className={cn(
                  'rounded-lg border bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors',
                  errors.email ? 'border-[#f87171]/60 focus:border-[#f87171]' : 'border-white/10 focus:border-accent'
                )}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="text-xs text-[#f87171]">{errors.email}</span>}
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/45">Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the project, timeline, stack…"
              className={cn(
                'rounded-lg border bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors resize-none',
                errors.message ? 'border-[#f87171]/60 focus:border-[#f87171]' : 'border-white/10 focus:border-accent'
              )}
              aria-invalid={!!errors.message}
            />
            {errors.message && <span className="text-xs text-[#f87171]">{errors.message}</span>}
          </label>

          <button
            type="submit"
            className="self-start flex items-center gap-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 transition-colors"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
          <p className="text-[11px] text-white/35">
            The form opens your email app with the message pre-filled (no backend needed).
          </p>
        </form>
      </div>
    </div>
  );
}
