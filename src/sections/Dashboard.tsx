import { 
  Users, 
  BookOpen, 
  FolderKanban, 
  ClipboardList, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats, courses, assignments, notifications } from '@/data/mockData';

const statCards = [
  { 
    title: '总用户数', 
    value: dashboardStats.totalUsers, 
    icon: Users, 
    color: 'blue',
    trend: '+12%'
  },
  { 
    title: '课程总数', 
    value: dashboardStats.totalCourses, 
    icon: BookOpen, 
    color: 'green',
    trend: '+3'
  },
  { 
    title: '进行中的项目', 
    value: dashboardStats.totalProjects, 
    icon: FolderKanban, 
    color: 'purple',
    trend: '+2'
  },
  { 
    title: '待批改作业', 
    value: dashboardStats.pendingSubmissions, 
    icon: ClipboardList, 
    color: 'orange',
    trend: '5份新提交'
  },
];

const getColorClass = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  return colors[color] || colors.blue;
};

export default function Dashboard() {
  const recentAssignments = assignments.slice(0, 3);
  const recentNotifications = notifications.slice(0, 4);
  const activeCourses = courses.filter(c => c.status === 'active').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${getColorClass(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Assignments */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">最近发布的作业</CardTitle>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                查看全部
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {assignment.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{assignment.courseName}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        截止: {assignment.dueDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        已提交: {assignment.submissions}人
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">最新通知</CardTitle>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                查看全部
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border ${
                    notification.isRead 
                      ? 'bg-white border-gray-100' 
                      : 'bg-blue-50 border-blue-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.isRead ? 'bg-gray-300' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${
                        notification.isRead ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">进行中的课程</CardTitle>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              查看全部
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeCourses.map((course) => (
              <div 
                key={course.id} 
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500">{course.credits}学分</span>
                </div>
                <h4 className="font-medium text-gray-900 mt-3">{course.name}</h4>
                <p className="text-sm text-gray-500">{course.teacherName}</p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <AlertCircle className="w-3 h-3" />
                    <span>{course.location}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">选课人数</span>
                    <span className="font-medium text-gray-900">
                      {course.enrolledStudents}/{course.maxStudents}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
