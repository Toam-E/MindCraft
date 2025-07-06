import { Settings, User, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMode, UserRole } from '@/pages/Index';

interface TopNavigationProps {
  currentMode: UserMode;
  currentRole: UserRole;
  onModeChange: (mode: UserMode) => void;
  onRoleChange: (role: UserRole) => void;
  onThemeCustomization: () => void;
  showThemeButton?: boolean;
}

const TopNavigation = ({ 
  currentMode, 
  currentRole, 
  onModeChange, 
  onRoleChange, 
  onThemeCustomization,
  showThemeButton = true 
}: TopNavigationProps) => {
  return (
    <div className="bg-white/20 backdrop-blur-md border-b border-white/30 relative z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">🧠 MindCraft</h1>
          </div>

          {/* Mode and Role Controls */}
          <div className="flex items-center gap-2">
            {/* Mode Selection */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onModeChange('private')}
                className={`text-white hover:bg-white/20 ${
                  currentMode === 'private' ? 'bg-white/30' : ''
                }`}
              >
                <User className="w-4 h-4 mr-1" />
                Private
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onModeChange('school')}
                className={`text-white hover:bg-white/20 ${
                  currentMode === 'school' ? 'bg-white/30' : ''
                }`}
              >
                <Users className="w-4 h-4 mr-1" />
                School
              </Button>
            </div>

            {/* Role Selection */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRoleChange('student')}
                className={`text-white hover:bg-white/20 ${
                  currentRole === 'student' ? 'bg-white/30' : ''
                }`}
              >
                <GraduationCap className="w-4 h-4 mr-1" />
                Student
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRoleChange('parent')}
                className={`text-white hover:bg-white/20 ${
                  currentRole === 'parent' ? 'bg-white/30' : ''
                }`}
              >
                Parent
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRoleChange('teacher')}
                className={`text-white hover:bg-white/20 ${
                  currentRole === 'teacher' ? 'bg-white/30' : ''
                }`}
              >
                Teacher
              </Button>
            </div>

            {/* Theme Button */}
            {showThemeButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeCustomization}
                className="text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4 mr-1" />
                Theme
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;