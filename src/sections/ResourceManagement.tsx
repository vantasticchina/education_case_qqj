import { useState } from 'react';
import { 
  Search, 
  Upload, 
  Download, 
  FileText,
  Video,
  Image,
  FileAudio,
  File,
  MoreHorizontal,
  Eye,
  Trash2,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
import { resources as mockResources } from '@/data/mockData';

const getFileIcon = (type: string) => {
  switch (type) {
    case 'document':
      return <FileText className="w-8 h-8 text-blue-600" />;
    case 'video':
      return <Video className="w-8 h-8 text-red-600" />;
    case 'audio':
      return <FileAudio className="w-8 h-8 text-green-600" />;
    case 'image':
      return <Image className="w-8 h-8 text-purple-600" />;
    default:
      return <File className="w-8 h-8 text-gray-600" />;
  }
};

const getFileTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    document: '文档',
    video: '视频',
    audio: '音频',
    image: '图片',
    other: '其他',
  };
  return labels[type] || '其他';
};

export default function ResourceManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.courseName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const stats = {
    total: mockResources.length,
    document: mockResources.filter(r => r.type === 'document').length,
    video: mockResources.filter(r => r.type === 'video').length,
    audio: mockResources.filter(r => r.type === 'audio').length,
    image: mockResources.filter(r => r.type === 'image').length,
    other: mockResources.filter(r => r.type === 'other').length,
    totalDownloads: mockResources.reduce((acc, r) => acc + r.downloadCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">资源总数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FolderOpen className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">文档</p>
              <p className="text-2xl font-bold text-gray-900">{stats.document}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">视频</p>
              <p className="text-2xl font-bold text-gray-900">{stats.video}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Video className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">总下载量</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Download className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={typeFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTypeFilter('all')}
          >
            全部
          </Button>
          <Button 
            variant={typeFilter === 'document' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTypeFilter('document')}
          >
            文档
          </Button>
          <Button 
            variant={typeFilter === 'video' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTypeFilter('video')}
          >
            视频
          </Button>
          <Button 
            variant={typeFilter === 'audio' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTypeFilter('audio')}
          >
            音频
          </Button>
          <Button 
            variant={typeFilter === 'image' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTypeFilter('image')}
          >
            图片
          </Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="搜索资源..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                上传资源
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>上传新资源</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">资源标题</label>
                  <Input placeholder="请输入资源标题" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">资源描述</label>
                  <textarea 
                    className="w-full h-20 px-3 py-2 rounded-md border border-gray-200 resize-none"
                    placeholder="请输入资源描述"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">所属课程</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200">
                    <option>不限课程</option>
                    <option>Web前端开发技术</option>
                    <option>数据结构与算法</option>
                    <option>软件工程导论</option>
                    <option>数据库系统</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">资源类型</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200">
                    <option value="document">文档</option>
                    <option value="video">视频</option>
                    <option value="audio">音频</option>
                    <option value="image">图片</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">选择文件</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">点击或拖拽文件到此处</p>
                    <p className="text-xs text-gray-400 mt-1">支持 PDF, DOC, MP4, MP3 等格式</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsUploadDialogOpen(false)}>
                    开始上传
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {getFileIcon(resource.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 truncate">{resource.title}</h3>
                      <p className="text-sm text-gray-500">{getFileTypeLabel(resource.type)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          预览
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Download className="w-4 h-4" />
                          下载
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {resource.description}
                  </p>

                  {resource.courseName && (
                    <p className="text-xs text-gray-500 mt-2">
                      课程: {resource.courseName}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{resource.uploaderName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">{resource.uploaderName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{resource.size}</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloadCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">未找到匹配的资源</p>
        </div>
      )}
    </div>
  );
}
