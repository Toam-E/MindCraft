
import { useState } from 'react';
import { ArrowLeft, Users, BookOpen, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TeacherDashboardProps {
  mode: 'private' | 'school' | null;
  onBack: () => void;
}

const TeacherDashboard = ({ mode, onBack }: TeacherDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'content' | 'reports'>('overview');

  // Mock data for demonstration
  const classData = {
    totalStudents: 24,
    activeToday: 18,
    averageScore: 87,
    completedAssignments: 156
  };

  const recentStudents = [
    { name: 'Emma Johnson', age: 8, lastActive: '2 hours ago', score: 92, progress: 'Excellent' },
    { name: 'Liam Smith', age: 7, lastActive: '1 hour ago', score: 78, progress: 'Good' },
    { name: 'Sophia Davis', age: 8, lastActive: '30 min ago', score: 95, progress: 'Excellent' },
    { name: 'Noah Wilson', age: 7, lastActive: '3 hours ago', score: 65, progress: 'Needs Help' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-white/20 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </div>
            
            <div className="text-white text-center">
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-white/80">Grade 2A - Mrs. Johnson's Class</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'reports', label: 'Reports', icon: BarChart3 }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-white hover:bg-white/20 flex items-center gap-2 rounded-none border-b-2 ${
                  activeTab === tab.id ? 'border-white' : 'border-transparent'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Class Statistics */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{classData.totalStudents}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Active Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{classData.activeToday}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{classData.averageScore}%</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{classData.completedAssignments}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Recent Student Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentStudents.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell>{student.lastActive}</TableCell>
                        <TableCell>{student.score}%</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.progress === 'Excellent' ? 'bg-green-100 text-green-800' :
                            student.progress === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.progress}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Content</h2>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Assignment
              </Button>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Content Management</h3>
                <p className="text-gray-500 mb-4">
                  Create custom assignments, quizzes, and learning activities for your students.
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {(activeTab === 'students' || activeTab === 'reports') && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {activeTab === 'students' ? 'Student Management' : 'Detailed Reports'}
              </h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'students' 
                  ? 'Manage your class roster and individual student settings.'
                  : 'Generate detailed progress reports and analytics for your class.'
                }
              </p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
