import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FolderKanban, 
  ClipboardList, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  Bell,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { currentUser, notifications } from '@/data/mockData';
import Dashboard from '@/sections/Dashboard';
import UserManagement from '@/sections/UserManagement';
import CourseManagement from '@/sections/CourseManagement';
import ProjectManagement from '@/sections/ProjectManagement';
import AssignmentManagement from '@/sections/AssignmentManagement';
import GradeManagement from '@/sections/GradeManagement';
import ResourceManagement from '@/sections/ResourceManagement';
import DiscussionBoard from '@/sections/DiscussionBoard';
import NotificationCenter from '@/sections/NotificationCenter';
import './App.css';

type TabType = 'dashboard' | 'users' | 'courses' | 'projects' | 'assignments' | 'grades' | 'resources' | 'discussions' | 'notifications';

const menuItems = [
  { id: 'dashboard' as TabType, label: '仪表盘', icon: LayoutDashboard },
  { id: 'users' as TabType, label: '用户管理', icon: Users },
  { id: 'courses' as TabType, label: '课程管理', icon: BookOpen },
  { id: 'projects' as TabType, label: '项目管理', icon: FolderKanban },
  { id: 'assignments' as TabType, label: '作业管理', icon: ClipboardList },
  { id: 'grades' as TabType, label: '成绩管理', icon: GraduationCap },
  { id: 'resources' as TabType, label: '资源分享', icon: FileText },
  { id: 'discussions' as TabType, label: '讨论区', icon: MessageSquare },
  { id: 'notifications' as TabType, label: '通知公告', icon: Bell },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'projects':
        return <ProjectManagement />;
      case 'assignments':
        return <AssignmentManagement />;
      case 'grades':
        return <GradeManagement />;
      case 'resources':
        return <ResourceManagement />;
      case 'discussions':
        return <DiscussionBoard />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900">教学系统</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8 mx-auto"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasBadge = item.id === 'notifications' && unreadNotifications > 0;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${!sidebarOpen && 'justify-center'}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive && 'text-blue-600'}`} />
                  {hasBadge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 ${!sidebarOpen && 'px-2'}`}>
          <div className={`flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.role === 'admin' ? '管理员' : currentUser.role === 'teacher' ? '教师' : '学生'}
                </p>
              </div>
            )}
            {sidebarOpen && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
