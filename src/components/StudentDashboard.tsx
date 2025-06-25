
import { useState } from 'react';
import { ArrowLeft, Star, Trophy, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AgeGroupSelection from './AgeGroupSelection';
import SubjectSelection from './SubjectSelection';
import { StudentTheme } from './ThemeCustomization';
import MathGame from './MathGame';
import WordMatchGame from './WordMatchGame';
import MathMazeGame from './MathMazeGame';

interface StudentDashboardProps {
  mode: 'private' | 'school' | null;
  role: 'student' | 'parent' | 'teacher' | null;
  theme: StudentTheme;
  onBack: () => void;
  onThemeChange: () => void;
}

export type AgeGroup = '5-6' | '7-8' | '9-10' | '11-12' | null;
export type Subject = 'math' | 'english' | null;
export type GameType = 'quiz' | 'word-match' | 'math-maze' | null;

const StudentDashboard = ({ mode, role, theme, onBack, onThemeChange }: StudentDashboardProps) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>(null);
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [currentView, setCurrentView] = useState<'age' | 'subject' | 'game-select' | 'game'>('age');

  const handleAgeSelect = (age: AgeGroup) => {
    setSelectedAge(age);
    setCurrentView('subject');
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView('game-select');
  };

  const handleGameSelect = (game: GameType) => {
    setSelectedGame(game);
    setCurrentView('game');
  };

  const resetToAgeSelection = () => {
    setCurrentView('age');
    setSelectedAge(null);
    setSelectedSubject(null);
    setSelectedGame(null);
  };

  const resetToSubjectSelection = () => {
    setCurrentView('subject');
    setSelectedSubject(null);
    setSelectedGame(null);
  };

  const resetToGameSelection = () => {
    setCurrentView('game-select');
    setSelectedGame(null);
  };

  const backgroundStyle = {
    background: `linear-gradient(135deg, ${theme.gradientColors[0]}, ${theme.gradientColors[1]}, ${theme.gradientColors[2]})`
  };

  // Enhanced theme decorations - more icons scattered across the screen
  const getThemeDecorations = () => {
    const decorations = {
      'Unicorns': ['🌈', '⭐', '✨', '🦄', '💫', '🌟'],
      'Dinosaurs': ['🌋', '🦴', '🌿', '🦕', '🦖', '🌱'],
      'Space': ['🌟', '🪐', '👽', '🚀', '🛸', '⭐'],
      'Ocean': ['🌊', '🐙', '🦑', '🐠', '🐟', '🦈'],
      'Princess': ['💎', '🏰', '🌸', '👸', '👑', '💖'],
      'Animals': ['🦁', '🐼', '🦊', '🐨', '🐯', '🦒']
    };
    return decorations[theme.themeName as keyof typeof decorations] || ['⭐', '✨', '🌟'];
  };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      {/* Enhanced theme decorations - more scattered across the screen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary layer of decorations */}
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
        
        {/* Secondary layer for more coverage */}
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

        {/* Tertiary layer for even more playful feel */}
        {getThemeDecorations().slice(0, 4).map((decoration, index) => (
          <div
            key={`tertiary-${index}`}
            className="absolute text-5xl opacity-10 animate-pulse"
            style={{
              bottom: `${15 + index * 18}%`,
              left: `${20 + index * 20}%`,
              animationDelay: `${index * 1.5}s`,
              animationDuration: '4s'
            }}
          >
            {decoration}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md border-b border-white/30 relative z-10">
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
              <Button 
                variant="ghost" 
                onClick={onThemeChange}
                className="text-white hover:bg-white/20 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Theme
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
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

        {currentView === 'game-select' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="ghost" 
                onClick={resetToSubjectSelection}
                className="text-white hover:bg-white/20 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-4">
                <span className="text-6xl">{theme.themeEmoji}</span>
                Choose Your Game!
              </h2>
              <p className="text-xl text-white/90 drop-shadow-md">
                Ages {selectedAge} • {selectedSubject === 'math' ? 'Math' : 'English'} Games
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedSubject === 'math' ? (
                <>
                  <Card 
                    className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleGameSelect('quiz')}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 text-5xl group-hover:animate-bounce">
                        🧮
                      </div>
                      <CardTitle className="text-2xl text-gray-800 mb-2">
                        Math Quiz
                      </CardTitle>
                      <p className="text-gray-600">
                        Answer math questions and improve your skills!
                      </p>
                    </CardHeader>
                  </Card>

                  <Card 
                    className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleGameSelect('math-maze')}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 text-5xl group-hover:animate-bounce">
                        🎯
                      </div>
                      <CardTitle className="text-2xl text-gray-800 mb-2">
                        Math Maze
                      </CardTitle>
                      <p className="text-gray-600">
                        Solve problems to unlock your path to treasure!
                      </p>
                    </CardHeader>
                  </Card>
                </>
              ) : (
                <Card 
                  className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleGameSelect('word-match')}
                >
                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4 text-5xl group-hover:animate-bounce">
                      🎯
                    </div>
                    <CardTitle className="text-2xl text-gray-800 mb-2">
                      Word Match
                    </CardTitle>
                    <p className="text-gray-600">
                      Match words with their pictures!
                    </p>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
        )}

        {currentView === 'game' && selectedGame === 'quiz' && selectedSubject === 'math' && (
          <MathGame 
            ageGroup={selectedAge}
            onBack={resetToGameSelection}
          />
        )}

        {currentView === 'game' && selectedGame === 'word-match' && selectedSubject === 'english' && (
          <WordMatchGame 
            ageGroup={selectedAge}
            onBack={resetToGameSelection}
          />
        )}

        {currentView === 'game' && selectedGame === 'math-maze' && selectedSubject === 'math' && (
          <MathMazeGame 
            ageGroup={selectedAge}
            onBack={resetToGameSelection}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
