import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Bell,
  Check,
  Trash2,
  MoreHorizontal,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
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
import { notifications as mockNotifications, courses as mockCourses } from '@/data/mockData';


const getTypeBadge = (type: string) => {
  switch (type) {
    case 'announcement':
      return <Badge className="bg-blue-100 text-blue-700">公告</Badge>;
    case 'assignment':
      return <Badge className="bg-green-100 text-green-700">作业</Badge>;
    case 'grade':
      return <Badge className="bg-purple-100 text-purple-700">成绩</Badge>;
    case 'system':
      return <Badge className="bg-gray-100 text-gray-700">系统</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-700">其他</Badge>;
  }
};

export default function NotificationCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [isNewNotificationDialogOpen, setIsNewNotificationDialogOpen] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.senderName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesRead = readFilter === 'all' || 
      (readFilter === 'read' && notification.isRead) ||
      (readFilter === 'unread' && !notification.isRead);
    
    return matchesSearch && matchesType && matchesRead;
  });

  const stats = {
    total: mockNotifications.length,
    unread: mockNotifications.filter(n => !n.isRead).length,
    read: mockNotifications.filter(n => n.isRead).length,
  };

  const toggleNotificationSelection = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nid => nid !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const markAsRead = () => {
    // 这里应该调用API标记为已读
    setSelectedNotifications([]);
  };

  const deleteSelected = () => {
    // 这里应该调用API删除
    setSelectedNotifications([]);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">通知总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">未读通知</p>
              <p className="text-2xl font-bold text-orange-600">{stats.unread}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已读通知</p>
              <p className="text-2xl font-bold text-green-600">{stats.read}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={readFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setReadFilter('all')}
          >
            全部
          </Button>
          <Button 
            variant={readFilter === 'unread' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setReadFilter('unread')}
          >
            未读
          </Button>
          <Button 
            variant={readFilter === 'read' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setReadFilter('read')}
          >
            已读
          </Button>
          <select 
            className="h-9 px-3 rounded-md border border-gray-200 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">全部类型</option>
            <option value="announcement">公告</option>
            <option value="assignment">作业</option>
            <option value="grade">成绩</option>
            <option value="system">系统</option>
          </select>
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="搜索通知..."
              className="pl-9 w-full lg:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isNewNotificationDialogOpen} onOpenChange={setIsNewNotificationDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                发布通知
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>发布新通知</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">通知标题</label>
                  <Input placeholder="请输入通知标题" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">通知类型</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200">
                    <option value="announcement">公告</option>
                    <option value="assignment">作业</option>
                    <option value="grade">成绩</option>
                    <option value="system">系统</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">目标课程</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200">
                    <option>全部课程</option>
                    {mockCourses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">目标用户</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm">学生</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm">教师</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm">管理员</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">通知内容</label>
                  <textarea 
                    className="w-full h-32 px-3 py-2 rounded-md border border-gray-200 resize-none"
                    placeholder="请输入通知内容"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsNewNotificationDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsNewNotificationDialogOpen(false)} className="gap-2">
                    <Send className="w-4 h-4" />
                    发布通知
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            已选择 {selectedNotifications.length} 条通知
          </span>
          <div className="flex-1"></div>
          <Button variant="outline" size="sm" onClick={markAsRead} className="gap-2">
            <Check className="w-4 h-4" />
            标记已读
          </Button>
          <Button variant="outline" size="sm" onClick={deleteSelected} className="gap-2 text-red-600">
            <Trash2 className="w-4 h-4" />
            删除
          </Button>
        </div>
      )}

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <Checkbox 
                      checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                      onCheckedChange={selectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    通知内容
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    发送者
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <tr 
                    key={notification.id} 
                    className={`hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                  >
                    <td className="px-4 py-4">
                      <Checkbox 
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => toggleNotificationSelection(notification.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                        {getTypeBadge(notification.type)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <h4 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{notification.content}</p>
                        {notification.courseName && (
                          <p className="text-xs text-gray-400 mt-1">课程: {notification.courseName}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{notification.senderName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">{notification.senderName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-500">{notification.createdAt}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          {!notification.isRead && (
                            <DropdownMenuItem>标记已读</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">未找到匹配的通知</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
