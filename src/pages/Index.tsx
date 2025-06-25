
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ModeSelection from '@/components/ModeSelection';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import ParentDashboard from '@/components/ParentDashboard';

export type UserMode = 'private' | 'school' | null;
export type UserRole = 'student' | 'parent' | 'teacher' | null;

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<UserMode>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard'>('welcome');

  const handleModeSelect = (mode: UserMode) => {
    setSelectedMode(mode);
    // For private mode, default to student role
    if (mode === 'private') {
      setUserRole('student');
    }
    setCurrentView('dashboard');
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const resetToWelcome = () => {
    setSelectedMode(null);
    setUserRole(null);
    setCurrentView('welcome');
  };

  if (currentView === 'dashboard') {
    if (userRole === 'teacher') {
      return (
        <TeacherDashboard 
          mode={selectedMode}
          onBack={resetToWelcome}
        />
      );
    } else if (userRole === 'parent') {
      return (
        <ParentDashboard 
          mode={selectedMode}
          onBack={resetToWelcome}
        />
      );
    } else {
      return (
        <StudentDashboard 
          mode={selectedMode}
          role={userRole}
          onBack={resetToWelcome}
        />
      );
    }
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
            🧠 MindCraft
          </h1>
          <p className="text-2xl text-white/90 font-medium drop-shadow-md">
            Where Learning Meets Adventure!
          </p>
        </div>

        {/* Mode Selection */}
        <ModeSelection onModeSelect={handleModeSelect} onRoleSelect={handleRoleSelect} />
      </div>
    </div>
  );
};

export default Index;
