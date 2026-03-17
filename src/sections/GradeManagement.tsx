import { useState } from 'react';
import { 
  Search, 
  Download, 
  Upload, 
  TrendingUp,
  TrendingDown,
  FileSpreadsheet,
  BarChart3,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { grades as mockGrades, courses as mockCourses } from '@/data/mockData';

export default function GradeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  const filteredGrades = mockGrades.filter(grade => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.assignmentTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || grade.courseId === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  // 计算统计数据
  const allScores = mockGrades.map(g => g.percentage);
  const averageScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;
  const highestScore = Math.max(...allScores);
  const lowestScore = Math.min(...allScores);
  
  const gradeDistribution = {
    excellent: mockGrades.filter(g => g.percentage >= 90).length,
    good: mockGrades.filter(g => g.percentage >= 80 && g.percentage < 90).length,
    average: mockGrades.filter(g => g.percentage >= 70 && g.percentage < 80).length,
    poor: mockGrades.filter(g => g.percentage < 70).length,
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge className="bg-green-100 text-green-700">优秀</Badge>;
    if (percentage >= 80) return <Badge className="bg-blue-100 text-blue-700">良好</Badge>;
    if (percentage >= 70) return <Badge className="bg-yellow-100 text-yellow-700">及格</Badge>;
    return <Badge className="bg-red-100 text-red-700">不及格</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">平均分</p>
              <p className={`text-2xl font-bold ${getGradeColor(averageScore)}`}>
                {averageScore.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">最高分</p>
              <p className="text-2xl font-bold text-green-600">{highestScore}%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">最低分</p>
              <p className="text-2xl font-bold text-red-600">{lowestScore}%</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">成绩总数</p>
              <p className="text-2xl font-bold text-gray-900">{mockGrades.length}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4">成绩分布</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{gradeDistribution.excellent}</p>
              <p className="text-sm text-gray-600">优秀 (90-100)</p>
              <Progress value={(gradeDistribution.excellent / mockGrades.length) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{gradeDistribution.good}</p>
              <p className="text-sm text-gray-600">良好 (80-89)</p>
              <Progress value={(gradeDistribution.good / mockGrades.length) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{gradeDistribution.average}</p>
              <p className="text-sm text-gray-600">及格 (70-79)</p>
              <Progress value={(gradeDistribution.average / mockGrades.length) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{gradeDistribution.poor}</p>
              <p className="text-sm text-gray-600">不及格 (&lt;70)</p>
              <Progress value={(gradeDistribution.poor / mockGrades.length) * 100} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="选择课程" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部课程</SelectItem>
              {mockCourses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="搜索学生或作业..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            导入
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            导出
          </Button>
        </div>
      </div>

      {/* Grades Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    学生
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    课程
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作业
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    百分比
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    等级
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    批改时间
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{grade.studentName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{grade.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{grade.courseName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {grade.assignmentTitle || '课程总评'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {grade.score}/{grade.totalScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Progress value={grade.percentage} className="w-16 h-2" />
                        <span className={`text-sm font-medium ${getGradeColor(grade.percentage)}`}>
                          {grade.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getGradeBadge(grade.percentage)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{grade.gradedAt}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredGrades.length === 0 && (
            <div className="text-center py-12">
              <FileSpreadsheet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">未找到匹配的成绩记录</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
