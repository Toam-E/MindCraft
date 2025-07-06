
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ModeSelection from '@/components/ModeSelection';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import ParentDashboard from '@/components/ParentDashboard';
import ThemeCustomization, { StudentTheme } from '@/components/ThemeCustomization';
import TopNavigation from '@/components/TopNavigation';

export type UserMode = 'private' | 'school' | null;
export type UserRole = 'student' | 'parent' | 'teacher' | null;

const defaultTheme: StudentTheme = {
  gradientColors: ['#3B82F6', '#8B5CF6', '#EC4899'],
  themeEmoji: '🎓',
  themeName: 'Learning'
};

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<UserMode>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [studentTheme, setStudentTheme] = useState<StudentTheme>(defaultTheme);
  const [currentView, setCurrentView] = useState<'welcome' | 'theme' | 'dashboard'>('welcome');

  const handleModeSelect = (mode: UserMode) => {
    setSelectedMode(mode);
    // For private mode, default to student role
    if (mode === 'private') {
      setUserRole('student');
      setCurrentView('theme');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === 'student') {
      setCurrentView('theme');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleTopNavModeChange = (mode: UserMode) => {
    setSelectedMode(mode);
  };

  const handleTopNavRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'student') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleTopNavThemeCustomization = () => {
    setCurrentView('theme');
  };

  const handleThemeComplete = (theme: StudentTheme) => {
    setStudentTheme(theme);
    setCurrentView('dashboard');
  };

  const resetToWelcome = () => {
    setSelectedMode(null);
    setUserRole(null);
    setCurrentView('welcome');
  };

  const resetToTheme = () => {
    setCurrentView('theme');
  };

  // Create background style based on theme
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${studentTheme.gradientColors[0]}, ${studentTheme.gradientColors[1]}, ${studentTheme.gradientColors[2]})`
  };

  // Get theme decorations for background
  const getThemeDecorations = () => {
    const decorations = {
      'Unicorns': ['🌈', '⭐', '✨', '🦄', '💫', '🌟'],
      'Dinosaurs': ['🌋', '🦴', '🌿', '🦕', '🦖', '🌱'],
      'Space': ['🌟', '🪐', '👽', '🚀', '🛸', '⭐'],
      'Ocean': ['🌊', '🐙', '🦑', '🐠', '🐟', '🦈'],
      'Princess': ['💎', '🏰', '🌸', '👸', '👑', '💖'],
      'Animals': ['🦁', '🐼', '🦊', '🐨', '🐯', '🦒']
    };
    return decorations[studentTheme.themeName as keyof typeof decorations] || ['⭐', '✨', '🌟'];
  };

  if (currentView === 'theme') {
    return (
      <div className="min-h-screen" style={backgroundStyle}>
        {/* Theme decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {getThemeDecorations().map((decoration, index) => (
            <div
              key={`primary-${index}`}
              className="absolute text-6xl opacity-20 animate-pulse"
              style={{
                top: `${10 + index * 15}%`,
                left: `${5 + index * 15}%`,
                animationDelay: `${index * 0.8}s`
              }}
            >
              {decoration}
            </div>
          ))}
          {getThemeDecorations().map((decoration, index) => (
            <div
              key={`secondary-${index}`}
              className="absolute text-4xl opacity-15 animate-bounce"
              style={{
                top: `${20 + index * 12}%`,
                right: `${10 + index * 12}%`,
                animationDelay: `${index * 1.2}s`,
                animationDuration: '3s'
              }}
            >
              {decoration}
            </div>
          ))}
        </div>

        <TopNavigation
          currentMode={selectedMode}
          currentRole={userRole}
          onModeChange={handleTopNavModeChange}
          onRoleChange={handleTopNavRoleChange}
          onThemeCustomization={handleTopNavThemeCustomization}
          showThemeButton={false}
        />
        
        <ThemeCustomization 
          onComplete={handleThemeComplete}
          onBack={() => setCurrentView('dashboard')}
          currentTheme={studentTheme}
        />
      </div>
    );
  }

  if (currentView === 'dashboard') {
    if (userRole === 'teacher') {
      return (
        <div className="min-h-screen" style={backgroundStyle}>
          {/* Theme decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {getThemeDecorations().map((decoration, index) => (
              <div
                key={`primary-${index}`}
                className="absolute text-6xl opacity-10 animate-pulse"
                style={{
                  top: `${10 + index * 15}%`,
                  left: `${5 + index * 15}%`,
                  animationDelay: `${index * 0.8}s`
                }}
              >
                {decoration}
              </div>
            ))}
          </div>

          <TopNavigation
            currentMode={selectedMode}
            currentRole={userRole}
            onModeChange={handleTopNavModeChange}
            onRoleChange={handleTopNavRoleChange}
            onThemeCustomization={handleTopNavThemeCustomization}
          />
          
          <TeacherDashboard 
            mode={selectedMode}
            onBack={resetToWelcome}
          />
        </div>
      );
    } else if (userRole === 'parent') {
      return (
        <div className="min-h-screen" style={backgroundStyle}>
          {/* Theme decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {getThemeDecorations().map((decoration, index) => (
              <div
                key={`primary-${index}`}
                className="absolute text-6xl opacity-10 animate-pulse"
                style={{
                  top: `${10 + index * 15}%`,
                  left: `${5 + index * 15}%`,
                  animationDelay: `${index * 0.8}s`
                }}
              >
                {decoration}
              </div>
            ))}
          </div>

          <TopNavigation
            currentMode={selectedMode}
            currentRole={userRole}
            onModeChange={handleTopNavModeChange}
            onRoleChange={handleTopNavRoleChange}
            onThemeCustomization={handleTopNavThemeCustomization}
          />
          
          <ParentDashboard 
            mode={selectedMode}
            onBack={resetToWelcome}
          />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen" style={backgroundStyle}>
          {/* Theme decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {getThemeDecorations().map((decoration, index) => (
              <div
                key={`primary-${index}`}
                className="absolute text-6xl opacity-20 animate-pulse"
                style={{
                  top: `${10 + index * 15}%`,
                  left: `${5 + index * 15}%`,
                  animationDelay: `${index * 0.8}s`
                }}
              >
                {decoration}
              </div>
            ))}
            {getThemeDecorations().map((decoration, index) => (
              <div
                key={`secondary-${index}`}
                className="absolute text-4xl opacity-15 animate-bounce"
                style={{
                  top: `${20 + index * 12}%`,
                  right: `${10 + index * 12}%`,
                  animationDelay: `${index * 1.2}s`,
                  animationDuration: '3s'
                }}
              >
                {decoration}
              </div>
            ))}
          </div>

          <TopNavigation
            currentMode={selectedMode}
            currentRole={userRole}
            onModeChange={handleTopNavModeChange}
            onRoleChange={handleTopNavRoleChange}
            onThemeCustomization={handleTopNavThemeCustomization}
          />
          
          <StudentDashboard 
            mode={selectedMode}
            role={userRole}
            theme={studentTheme}
            onBack={resetToWelcome}
            onThemeChange={resetToTheme}
          />
        </div>
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
