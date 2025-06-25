
import { useState } from 'react';
import { Users, User, BookOpen, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ModeSelection from '@/components/ModeSelection';
import StudentDashboard from '@/components/StudentDashboard';

export type UserMode = 'private' | 'school' | null;
export type UserRole = 'student' | 'parent' | 'teacher' | null;

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<UserMode>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard'>('welcome');

  const handleModeSelect = (mode: UserMode) => {
    setSelectedMode(mode);
    setCurrentView('dashboard');
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  const resetToWelcome = () => {
    setSelectedMode(null);
    setUserRole(null);
    setCurrentView('welcome');
  };

  if (currentView === 'dashboard') {
    return (
      <StudentDashboard 
        mode={selectedMode}
        role={userRole}
        onBack={resetToWelcome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      {/* Floating shapes for decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-green-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-orange-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-pink-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎓 LearnFun Academy
          </h1>
          <p className="text-2xl text-white/90 font-medium drop-shadow-md">
            Where Learning Meets Adventure!
          </p>
        </div>

        {/* Mode Selection */}
        <ModeSelection onModeSelect={handleModeSelect} />

        {/* Features Preview */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-blue-600">Math Adventures</CardTitle>
              <CardDescription className="text-lg">
                Solve puzzles, play number games, and master math skills!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-green-600">English Quests</CardTitle>
              <CardDescription className="text-lg">
                Build vocabulary, improve spelling, and become a word wizard!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
