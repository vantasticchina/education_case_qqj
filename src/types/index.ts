// 用户类型
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  class?: string;
  createdAt: string;
}

// 课程类型
export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  teacherName: string;
  credits: number;
  schedule: string;
  location: string;
  maxStudents: number;
  enrolledStudents: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

// 项目类型
export interface Project {
  id: string;
  name: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed';
  maxMembers: number;
  currentMembers: number;
  requirements: string;
  createdAt: string;
}

// 作业类型
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  dueDate: string;
  totalScore: number;
  status: 'draft' | 'published' | 'closed';
  submissions: number;
  createdAt: string;
}

// 提交类型
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  attachments: string[];
  submittedAt: string;
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

// 成绩类型
export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  assignmentId?: string;
  assignmentTitle?: string;
  score: number;
  totalScore: number;
  percentage: number;
  gradedAt: string;
  gradedBy: string;
}

// 资源类型
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'audio' | 'image' | 'other';
  url: string;
  size: string;
  uploadedBy: string;
  uploaderName: string;
  courseId?: string;
  courseName?: string;
  downloadCount: number;
  createdAt: string;
}

// 讨论类型
export interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  courseId?: string;
  courseName?: string;
  replies: Reply[];
  views: number;
  likes: number;
  isPinned: boolean;
  createdAt: string;
}

export interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  createdAt: string;
}

// 通知类型
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'assignment' | 'grade' | 'system';
  senderId: string;
  senderName: string;
  targetRoles: UserRole[];
  courseId?: string;
  courseName?: string;
  isRead: boolean;
  createdAt: string;
}

// 统计类型
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalProjects: number;
  totalAssignments: number;
  pendingSubmissions: number;
  recentNotifications: number;
}
