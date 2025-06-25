
import { useState } from 'react';
import { ArrowLeft, Heart, TrendingUp, Calendar, Mail, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ParentDashboardProps {
  mode: 'private' | 'school' | null;
  onBack: () => void;
}

const ParentDashboard = ({ mode, onBack }: ParentDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'settings'>('overview');

  // Mock data for demonstration
  const childData = {
    name: 'Emma',
    age: 8,
    totalStars: 245,
    level: 5,
    streakDays: 7,
    timeSpent: '2h 15m this week'
  };

  const recentActivity = [
    { subject: 'Math', activity: 'Addition Practice', score: 95, date: 'Today' },
    { subject: 'English', activity: 'Word Matching', score: 88, date: 'Yesterday' },
    { subject: 'Math', activity: 'Subtraction Quiz', score: 92, date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500">
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
            </Button>
            
            <div className="text-white text-center">
              <h1 className="text-2xl font-bold">Parent Dashboard</h1>
              <p className="text-white/80">Tracking {childData.name}'s Learning Journey</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
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
              { id: 'overview', label: 'Overview', icon: Heart },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Mail }
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
            {/* Child Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Total Stars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{childData.totalStars}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Current Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{childData.level}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Learning Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{childData.streakDays} days</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Time Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-blue-600">{childData.timeSpent}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Recent Learning Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                          activity.subject === 'Math' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {activity.subject[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{activity.activity}</div>
                          <div className="text-sm text-gray-600">{activity.subject} • {activity.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{activity.score}%</div>
                        <div className="text-sm text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Encouragement Card */}
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🎉</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Great Progress!</h3>
                    <p className="text-gray-600">
                      {childData.name} has been doing amazing this week! She's maintained a {childData.streakDays}-day learning streak and improved her math scores by 15%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Detailed Progress Reports</h3>
              <p className="text-gray-500 mb-4">
                View comprehensive learning analytics, subject-wise progress, and achievement milestones.
              </p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Email Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Weekly Progress Reports</div>
                    <div className="text-sm text-gray-600">Get a summary of your child's learning activities</div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Achievement Alerts</div>
                    <div className="text-sm text-gray-600">Notifications when your child reaches milestones</div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Learning Reminders</div>
                    <div className="text-sm text-gray-600">Gentle reminders to keep up the learning streak</div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
