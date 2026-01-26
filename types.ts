
export interface NavItem {
  label: string;
  path: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Added field for full HTML content
  date: string;
  imageUrl: string;
  category: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  number: string;
  date: string;
  type: 'PDF' | 'DOC';
  size: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: any;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GlobalImages {
  logo: string;
  homeHero: string;
  principal: string;
  introHistory: string;
}

export interface Teacher {
  id: number;
  name: string;
  position: string;
  subject: string;
  email: string;
  imageUrl: string;
  department: string;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  members: number;
  imageUrl: string;
  schedule: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
}

export interface ScheduleRow {
  day: string;
  periods: string[];
}

export interface ClassSchedule {
  className: string;
  scheduleRows: ScheduleRow[];
}

export interface ExamItem {
  id: number;
  date: string;
  subject: string;
  time: string;
}

export interface FormItem {
  id: number;
  name: string;
}

export interface StudentCornerData {
  scheduleTitle: string;
  scheduleDescription: string;
  scheduleByClass: ClassSchedule[];
  scheduleNote: string;
  examTitle: string;
  exams: ExamItem[];
  formTitle: string;
  forms: FormItem[];
}
export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  fullContent?: string;
}

export type AchievementScope = 'Quốc tế' | 'Quốc gia' | 'Tỉnh' | 'Huyện' | 'Trường';

export type AchievementIcon = 'trophy' | 'star' | 'award' | 'medal';
export type AchievementTier = 'Giải Nhất' | 'Giải Nhì' | 'Giải Ba' | 'Khuyến khích';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon?: AchievementIcon;
  category: string; // legacy label
  scope?: AchievementScope;
  tier?: AchievementTier;
  medalColor?: string;
}

export interface AchievementStat {
  label: string;
  value: string | number;
  color: string;
}

export interface AchievementYear {
  year: number;
  stats: AchievementStat[];
  items: Achievement[];
}

export interface DigitalResource {
  id: number;
  title: string;
  author: string;
  category: string;
  year: number;
  type: string;
  views: number;
  url?: string;
}

export interface StudentInfo {
  name: string;
  class: string;
  gpa: string;
  attendanceRate: string;
  credits: string;
}

export interface GradeItem {
  subject: string;
  midterm: string;
  final: string;
}

export type AssignmentStatus = 'submitted' | 'pending' | 'not-started';

export interface AssignmentItem {
  subject: string;
  title: string;
  dueDate: string;
  status: AssignmentStatus;
}

export interface StudentPortalData {
  info: StudentInfo;
  grades: GradeItem[];
  assignments: AssignmentItem[];
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'normal' | 'high';
  imageUrl?: string;
}