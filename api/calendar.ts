import { VercelRequest, VercelResponse } from '@vercel/node';

// Helper to format date to ICS (UTC)
const toIcsDate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const mi = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
};

const parseDateTime = (dmy: string, timeRange?: string) => {
  // dmy: dd/mm/yyyy
  const [d, m, y] = dmy.split('/').map(Number);
  let start = new Date(Date.UTC(y, m - 1, d, 1, 0, 0));
  let end = new Date(Date.UTC(y, m - 1, d, 2, 0, 0));

  if (timeRange) {
    const [startStr, endStr] = timeRange.split('-').map((s) => s.trim());
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);
    start = new Date(Date.UTC(y, m - 1, d, sh, sm || 0, 0));
    end = new Date(Date.UTC(y, m - 1, d, eh, em || 0, 0));
  }
  return { start, end };
};

const buildExamEvents = () => {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const fmt = (d: Date) => {
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = d.getUTCFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const day = (offset: number) => {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() + offset);
    return fmt(d);
  };

  return [
    { title: 'Toán học (1 tiết)', date: day(7), time: '07:00 - 07:45', location: 'Phòng thi A1' },
    { title: 'Ngữ văn (2 tiết)', date: day(8), time: '08:00 - 09:30', location: 'Phòng thi A1' },
    { title: 'Tiếng Anh (1 tiết)', date: day(10), time: '09:45 - 10:30', location: 'Phòng thi A1' },
  ];
};

const scheduleEvents = [
  { title: 'Toán - Lớp 12A1', day: 1, time: '7:00 - 7:45' }, // Monday
  { title: 'Ngữ văn - Lớp 12A1', day: 1, time: '8:00 - 8:45' },
  { title: 'Tiếng Anh - Lớp 12A1', day: 2, time: '7:00 - 7:45' }, // Tuesday
  { title: 'Vật lý - Lớp 12A1', day: 3, time: '9:00 - 9:45' }, // Wednesday
  { title: 'Hóa học - Lớp 12A1', day: 4, time: '7:00 - 7:45' }, // Thursday
  { title: 'Sinh học - Lớp 12A1', day: 5, time: '8:00 - 8:45' }, // Friday
];

const nextMonday = () => {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun, 1=Mon
  const diff = (1 - day + 7) % 7; // days until current/next Monday
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diff));
  monday.setUTCHours(0, 0, 0, 0);
  return monday;
};

const buildScheduleInstances = (weeks = 4) => {
  const startMonday = nextMonday();
  const events = [] as { title: string; start: Date; end: Date; location?: string }[];
  for (let w = 0; w < weeks; w++) {
    scheduleEvents.forEach((item) => {
      const dayOffset = item.day - 1; // Monday=1
      const [sh, sm] = item.time.split('-')[0].trim().split(':').map(Number);
      const [eh, em] = item.time.split('-')[1].trim().split(':').map(Number);
      const start = new Date(startMonday);
      start.setUTCDate(start.getUTCDate() + dayOffset + w * 7);
      start.setUTCHours(sh, sm || 0, 0, 0);
      const end = new Date(start);
      end.setUTCHours(eh, em || 0, 0, 0);
      events.push({ title: item.title, start, end });
    });
  }
  return events;
};

const buildIcs = (
  events: { title: string; start: Date; end: Date; location?: string }[],
  name: string
) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//THPT Huong Khe//Calendar//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-TIMEZONE:UTC',
    `X-WR-CALNAME:${name}`,
  ];

  events.forEach((ev, idx) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${idx}-${toIcsDate(ev.start)}@thpthuongkhe`);
    lines.push(`DTSTAMP:${toIcsDate(new Date())}`);
    lines.push(`DTSTART:${toIcsDate(ev.start)}`);
    lines.push(`DTEND:${toIcsDate(ev.end)}`);
    lines.push(`SUMMARY:${ev.title}`);
    if (ev.location) lines.push(`LOCATION:${ev.location}`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const type = (req.query.type as string) || 'exam';

  if (type === 'exam') {
    const events = buildExamEvents().map((ev) => {
      const { start, end } = parseDateTime(ev.date, ev.time);
      return { title: `Thi: ${ev.title}`, start, end, location: ev.location };
    });
    const ics = buildIcs(events, 'Lịch thi THPT Hương Khê');
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="lich-thi.ics"');
    return res.status(200).send(ics);
  }

  // Default: schedule feed (next 4 weeks)
  const scheduleInstances = buildScheduleInstances(4);
  const ics = buildIcs(
    scheduleInstances.map((ev) => ({ ...ev, title: `TKB: ${ev.title}` })),
    'Thời khóa biểu THPT Hương Khê'
  );
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="thoi-khoa-bieu.ics"');
  return res.status(200).send(ics);
}
