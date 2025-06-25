
import { useState } from 'react';
import { Users, User, GraduationCap, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ModeSelectionProps {
  onModeSelect: (mode: 'private' | 'school') => void;
  onRoleSelect: (role: 'student' | 'parent' | 'teacher') => void;
}

const ModeSelection = ({ onModeSelect, onRoleSelect }: ModeSelectionProps) => {
  const [selectedMode, setSelectedMode] = useState<'private' | 'school' | null>(null);

  const handleModeClick = (mode: 'private' | 'school') => {
    setSelectedMode(mode);
    if (mode === 'private') {
      // Show role selection for private mode
    } else {
      // Show role selection for school mode
    }
  };

  const handleRoleClick = (role: 'student' | 'parent' | 'teacher') => {
    onRoleSelect(role);
    if (selectedMode) {
      onModeSelect(selectedMode);
    }
  };

  if (selectedMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedMode(null)}
            className="text-white hover:bg-white/20 mb-4"
          >
            ← Back to Mode Selection
          </Button>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
            Who are you?
          </h2>
          <p className="text-xl text-white/90 drop-shadow-md">
            {selectedMode === 'private' ? 'Choose your role to get started!' : 'Select your role in the classroom'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Student Role */}
          <Card 
            className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => handleRoleClick('student')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-xl text-green-600">
                👧 Student
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Play games and learn new things!
              </p>
            </CardContent>
          </Card>

          {/* Parent Role */}
          {selectedMode === 'private' && (
            <Card 
              className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => handleRoleClick('parent')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-pink-600">
                  👩 Parent
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Track your child's progress and learning journey
                </p>
              </CardContent>
            </Card>
          )}

          {/* Teacher Role */}
          {selectedMode === 'school' && (
            <Card 
              className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => handleRoleClick('teacher')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-blue-600">
                  👨‍🏫 Teacher
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Manage your classroom and track student progress
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
        Choose Your Learning Adventure!
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Private Mode */}
        <Card 
          className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-3xl"
          onClick={() => handleModeClick('private')}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-purple-600 mb-2">
              👩‍👦 Private Mode
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Perfect for families and home learning
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Choose your age and favorite subjects
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Play fun games and learn at your pace
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Get extra help when you need it
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Parents receive progress reports
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* School Mode */}
        <Card 
          className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-3xl"
          onClick={() => handleModeClick('school')}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
              <Users className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-blue-600 mb-2">
              🏫 School Mode
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Designed for teachers and classrooms
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Teachers assign topics and activities
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Create custom questions and content
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Track class-wide progress reports
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Compare student performance
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModeSelection;
