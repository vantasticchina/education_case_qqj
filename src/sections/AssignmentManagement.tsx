import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  ClipboardList,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  BarChart3
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
import { assignments as mockAssignments, submissions as mockSubmissions } from '@/data/mockData';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return <Badge className="bg-green-100 text-green-700">已发布</Badge>;
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-600">草稿</Badge>;
    case 'closed':
      return <Badge className="bg-red-100 text-red-700">已截止</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-600">未知</Badge>;
  }
};

export default function AssignmentManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'closed'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockAssignments.length,
    published: mockAssignments.filter(a => a.status === 'published').length,
    draft: mockAssignments.filter(a => a.status === 'draft').length,
    closed: mockAssignments.filter(a => a.status === 'closed').length,
    totalSubmissions: mockAssignments.reduce((acc, a) => acc + a.submissions, 0),
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate).getTime();
    const now = Date.now();
    const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getAssignmentSubmissions = (assignmentId: string) => {
    return mockSubmissions.filter(s => s.assignmentId === assignmentId);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">作业总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已发布</p>
              <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">草稿</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已截止</p>
              <p className="text-2xl font-bold text-gray-900">{stats.closed}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">总提交数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
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
            variant={statusFilter === 'published' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('published')}
          >
            已发布
          </Button>
          <Button 
            variant={statusFilter === 'draft' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('draft')}
          >
            草稿
          </Button>
          <Button 
            variant={statusFilter === 'closed' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('closed')}
          >
            已截止
          </Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="搜索作业..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                布置作业
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>布置新作业</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">作业标题</label>
                  <Input placeholder="请输入作业标题" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">所属课程</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200">
                    <option>Web前端开发技术</option>
                    <option>数据结构与算法</option>
                    <option>软件工程导论</option>
                    <option>数据库系统</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">作业描述</label>
                  <textarea 
                    className="w-full h-20 px-3 py-2 rounded-md border border-gray-200 resize-none"
                    placeholder="请输入作业描述和要求"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">截止日期</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">总分</label>
                    <Input type="number" placeholder="如: 100" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    保存草稿
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    立即发布
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          const assignmentSubmissions = getAssignmentSubmissions(assignment.id);
          const gradedCount = assignmentSubmissions.filter(s => s.status === 'graded').length;
          
          return (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                      {getStatusBadge(assignment.status)}
                      {daysUntilDue <= 3 && daysUntilDue > 0 && assignment.status === 'published' && (
                        <Badge className="bg-orange-100 text-orange-700">即将截止</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{assignment.courseName}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {assignment.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>截止: {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className={daysUntilDue < 0 ? 'text-red-600' : ''}>
                          {daysUntilDue < 0 ? '已逾期' : `剩余 ${daysUntilDue} 天`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>已提交: {assignment.submissions}人</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>总分: {assignment.totalScore}分</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <div className="text-right mr-4">
                      <p className="text-sm text-gray-500">批改进度</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {gradedCount}/{assignment.submissions}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑作业</DropdownMenuItem>
                        <DropdownMenuItem>查看提交</DropdownMenuItem>
                        <DropdownMenuItem>批量批改</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">删除作业</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {assignment.submissions > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">批改进度</span>
                      <span className="font-medium text-gray-900">
                        {Math.round((gradedCount / assignment.submissions) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(gradedCount / assignment.submissions) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">未找到匹配的作业</p>
        </div>
      )}
    </div>
  );
}
