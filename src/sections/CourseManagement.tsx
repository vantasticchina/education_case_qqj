import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  BookOpen,
  Users,
  Clock,
  MapPin,
  CreditCard,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { courses as mockCourses } from '@/data/mockData';

export default function CourseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockCourses.length,
    active: mockCourses.filter(c => c.status === 'active').length,
    inactive: mockCourses.filter(c => c.status === 'inactive').length,
    totalStudents: mockCourses.reduce((acc, c) => acc + c.enrolledStudents, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">课程总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">进行中</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已结课</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">总选课人数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <Button 
            variant={statusFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            全部
          </Button>
          <Button 
            variant={statusFilter === 'active' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('active')}
          >
            进行中
          </Button>
          <Button 
            variant={statusFilter === 'inactive' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('inactive')}
          >
            已结课
          </Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="搜索课程..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                添加课程
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>添加新课程</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">课程名称</label>
                    <Input placeholder="请输入课程名称" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">课程代码</label>
                    <Input placeholder="如: CS301" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">课程描述</label>
                  <textarea 
                    className="w-full h-20 px-3 py-2 rounded-md border border-gray-200 resize-none"
                    placeholder="请输入课程描述"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">学分</label>
                    <Input type="number" placeholder="如: 3" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">容量</label>
                    <Input type="number" placeholder="如: 40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">上课时间</label>
                  <Input placeholder="如: 周一 8:00-10:00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">上课地点</label>
                  <Input placeholder="如: 教学楼A301" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    确认添加
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                    {course.status === 'active' ? '进行中' : '已结课'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>编辑课程</DropdownMenuItem>
                      <DropdownMenuItem>管理学生</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">删除课程</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{course.code} · {course.teacherName}</p>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {course.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CreditCard className="w-4 h-4" />
                  <span>{course.credits}学分</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">选课进度</span>
                  <span className="font-medium text-gray-900">
                    {course.enrolledStudents}/{course.maxStudents}
                  </span>
                </div>
                <Progress 
                  value={(course.enrolledStudents / course.maxStudents) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">未找到匹配的课程</p>
        </div>
      )}
    </div>
  );
}
