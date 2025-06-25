
import { Users, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ModeSelectionProps {
  onModeSelect: (mode: 'private' | 'school') => void;
}

const ModeSelection = ({ onModeSelect }: ModeSelectionProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
        Choose Your Learning Adventure!
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Private Mode */}
        <Card 
          className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-3xl"
          onClick={() => onModeSelect('private')}
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
          onClick={() => onModeSelect('school')}
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
