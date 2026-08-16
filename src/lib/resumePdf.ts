import { jsPDF } from 'jspdf';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { achievements, education, experience } from '../data/experience';

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 44;
const CONTENT_W = PAGE_W - MARGIN * 2;

const ACCENT: [number, number, number] = [91, 140, 255];
const BODY: [number, number, number] = [31, 41, 55];
const MUTED: [number, number, number] = [107, 114, 128];

function ensureRoom(doc: jsPDF, y: number, needed: number) {
  if (y + needed > PAGE_H - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

export function buildResumePdf(): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  let y = MARGIN + 8;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...BODY);
  doc.text(profile.name.toUpperCase(), MARGIN, y);

  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...ACCENT);
  doc.text(`${profile.role} · ${profile.roleTagline}`, MARGIN, y);

  y += 16;
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  const contactBits = [
    socials.email,
    profile.location,
    socials.github.replace('https://', ''),
    socials.linkedin.replace('https://', ''),
  ].filter(Boolean);
  doc.text(contactBits.join('  |  '), MARGIN, y);

  y += 10;
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(1.2);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 18;

  const section = (title: string) => {
    y = ensureRoom(doc, y, 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...ACCENT);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 6;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.6);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 14;
  };

  const body = (text: string, size = 9.5) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...BODY);
    const lines = doc.splitTextToSize(text, CONTENT_W);
    for (const line of lines) {
      y = ensureRoom(doc, y, 13);
      doc.text(line, MARGIN, y);
      y += 12.5;
    }
    y += 4;
  };

  const bullet = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...BODY);
    const lines = doc.splitTextToSize(text, CONTENT_W - 14);
    for (const line of lines) {
      y = ensureRoom(doc, y, 13);
      doc.text('•', MARGIN + 2, y);
      doc.text(line, MARGIN + 14, y);
      y += 12.5;
    }
    y += 3;
  };

  section('Summary');
  body(profile.bio);

  if (experience.length > 0) {
    section('Experience');
    for (const job of experience) {
      y = ensureRoom(doc, y, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...BODY);
      doc.text(job.role, MARGIN, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...MUTED);
      doc.text(job.period, PAGE_W - MARGIN - doc.getTextWidth(job.period), y);
      y += 12;
      doc.setFontSize(9.5);
      doc.setTextColor(...ACCENT);
      doc.text(job.org, MARGIN, y);
      y += 10;
      for (const point of job.points) bullet(point);
      y += 6;
    }
  }

  section('Projects');
  for (const p of projects) {
    y = ensureRoom(doc, y, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...BODY);
    doc.text(p.name, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED);
    doc.text(p.year, PAGE_W - MARGIN - doc.getTextWidth(p.year), y);
    y += 12;
    doc.setFontSize(9.5);
    doc.setTextColor(...BODY);
    body(p.description);
    doc.setFontSize(9);
    doc.setTextColor(...ACCENT);
    body(`Stack: ${p.tech.join(', ')}`);
    y += 2;
  }

  section('Skills');
  for (const group of skillGroups) {
    body(`${group.label}: ${group.skills.join(', ')}`, 9.5);
  }

  section('Education');
  for (const edu of education) {
    y = ensureRoom(doc, y, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...BODY);
    doc.text(edu.school, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED);
    doc.text(edu.period, PAGE_W - MARGIN - doc.getTextWidth(edu.period), y);
    y += 12;
    doc.setFontSize(9.5);
    doc.setTextColor(...ACCENT);
    doc.text(edu.degree, MARGIN, y);
    y += 12;
    body(edu.detail);
  }

  if (achievements.length > 0) {
    section('Achievements');
    for (const a of achievements) bullet(`${a.title} — ${a.detail}`);
  }

  return doc;
}

export function downloadResumePdf() {
  buildResumePdf().save(`${profile.name.replace(/\s+/g, '-')}-Resume.pdf`);
}

export function openResumeInNewTab() {
  const blob = buildResumePdf().output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener');
  // revoke after a delay so the new tab has time to load the blob
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
