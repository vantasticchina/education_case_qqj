import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MessageSquare,
  Eye,
  ThumbsUp,
  Pin,
  MoreHorizontal,
  User,
  GraduationCap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { discussions as mockDiscussions, courses as mockCourses } from '@/data/mockData';
import type { UserRole } from '@/types';

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return <Shield className="w-4 h-4 text-purple-600" />;
    case 'teacher':
      return <GraduationCap className="w-4 h-4 text-blue-600" />;
    case 'student':
      return <User className="w-4 h-4 text-green-600" />;
  }
};

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return <Badge className="bg-purple-100 text-purple-700 text-xs">管理员</Badge>;
    case 'teacher':
      return <Badge className="bg-blue-100 text-blue-700 text-xs">教师</Badge>;
    case 'student':
      return <Badge className="bg-green-100 text-green-700 text-xs">学生</Badge>;
  }
};

export default function DiscussionBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [isNewTopicDialogOpen, setIsNewTopicDialogOpen] = useState(false);

  const filteredDiscussions = mockDiscussions.filter(discussion => {
    const matchesSearch = 
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || discussion.courseId === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  const pinnedDiscussions = filteredDiscussions.filter(d => d.isPinned);
  const regularDiscussions = filteredDiscussions.filter(d => !d.isPinned);

  const stats = {
    total: mockDiscussions.length,
    totalReplies: mockDiscussions.reduce((acc, d) => acc + d.replies.length, 0),
    totalViews: mockDiscussions.reduce((acc, d) => acc + d.views, 0),
    totalLikes: mockDiscussions.reduce((acc, d) => acc + d.likes, 0),
  };

  

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">话题总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">回复总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReplies}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">总浏览量</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">总点赞</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLikes}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <ThumbsUp className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <select 
            className="h-10 px-3 rounded-md border border-gray-200 text-sm"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">全部课程</option>
            {mockCourses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="搜索话题..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isNewTopicDialogOpen} onOpenChange={setIsNewTopicDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                发起讨论
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>发起新讨论</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">讨论标题</label>
                  <Input placeholder="请输入讨论标题" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">所属课程</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200">
                    <option>不限课程</option>
                    {mockCourses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">讨论内容</label>
                  <textarea 
                    className="w-full h-32 px-3 py-2 rounded-md border border-gray-200 resize-none"
                    placeholder="请输入讨论内容"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsNewTopicDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsNewTopicDialogOpen(false)}>
                    发布讨论
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {/* Pinned Discussions */}
        {pinnedDiscussions.map((discussion) => (
          <Card key={discussion.id} className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Pin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                    <Badge className="bg-blue-100 text-blue-700">置顶</Badge>
                    {discussion.courseName && (
                      <Badge className="bg-gray-100 text-gray-600">{discussion.courseName}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {discussion.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(discussion.authorRole)}
                        <span className="text-sm font-medium text-gray-900">{discussion.authorName}</span>
                        {getRoleBadge(discussion.authorRole)}
                      </div>
                      <span className="text-xs text-gray-500">{discussion.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {discussion.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {discussion.replies.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {discussion.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Regular Discussions */}
        {regularDiscussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                    {discussion.courseName && (
                      <Badge className="bg-gray-100 text-gray-600">{discussion.courseName}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {discussion.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(discussion.authorRole)}
                        <span className="text-sm font-medium text-gray-900">{discussion.authorName}</span>
                        {getRoleBadge(discussion.authorRole)}
                      </div>
                      <span className="text-xs text-gray-500">{discussion.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {discussion.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies.length}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {discussion.likes}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>回复</DropdownMenuItem>
                          <DropdownMenuItem>置顶</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Replies Preview */}
                  {discussion.replies.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                      {discussion.replies.slice(0, 2).map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3 pl-4 border-l-2 border-gray-200">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{reply.authorName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">{reply.authorName}</span>
                              {getRoleBadge(reply.authorRole)}
                              <span className="text-xs text-gray-500">{reply.createdAt}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                      {discussion.replies.length > 2 && (
                        <p className="text-sm text-blue-600 cursor-pointer pl-4">
                          查看全部 {discussion.replies.length} 条回复
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">未找到匹配的讨论</p>
        </div>
      )}
    </div>
  );
}
