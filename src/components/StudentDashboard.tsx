
import { useState } from 'react';
import { ArrowLeft, Star, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AgeGroupSelection from './AgeGroupSelection';
import SubjectSelection from './SubjectSelection';
import MathGame from './MathGame';

interface StudentDashboardProps {
  mode: 'private' | 'school' | null;
  role: 'student' | 'parent' | 'teacher' | null;
  onBack: () => void;
}

export type AgeGroup = '5-6' | '7-8' | '9-10' | '11-12' | null;
export type Subject = 'math' | 'english' | null;

const StudentDashboard = ({ mode, role, onBack }: StudentDashboardProps) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>(null);
  const [currentView, setCurrentView] = useState<'age' | 'subject' | 'game'>('age');

  const handleAgeSelect = (age: AgeGroup) => {
    setSelectedAge(age);
    setCurrentView('subject');
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView('game');
  };

  const resetToAgeSelection = () => {
    setCurrentView('age');
    setSelectedAge(null);
    setSelectedSubject(null);
  };

  const resetToSubjectSelection = () => {
    setCurrentView('subject');
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400">
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
            
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">125 Stars</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-300" />
                <span className="font-semibold">Level 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentView === 'age' && (
          <AgeGroupSelection 
            mode={mode} 
            onAgeSelect={handleAgeSelect}
          />
        )}

        {currentView === 'subject' && (
          <SubjectSelection 
            selectedAge={selectedAge}
            onSubjectSelect={handleSubjectSelect}
            onBack={resetToAgeSelection}
          />
        )}

        {currentView === 'game' && selectedSubject === 'math' && (
          <MathGame 
            ageGroup={selectedAge}
            onBack={resetToSubjectSelection}
          />
        )}

        {currentView === 'game' && selectedSubject === 'english' && (
          <div className="text-center">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">
                  📚 English Adventures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  English games are coming soon! For now, try our Math Adventures.
                </p>
                <Button onClick={resetToSubjectSelection}>
                  Choose Another Subject
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
