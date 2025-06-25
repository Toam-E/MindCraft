
import { ArrowLeft, Calculator, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SubjectSelectionProps {
  selectedAge: '5-6' | '7-8' | '9-10' | '11-12' | null;
  onSubjectSelect: (subject: 'math' | 'english') => void;
  onBack: () => void;
}

const SubjectSelection = ({ selectedAge, onSubjectSelect, onBack }: SubjectSelectionProps) => {
  const subjects = [
    {
      id: 'math' as const,
      title: 'Math Adventures',
      emoji: '🔢',
      icon: Calculator,
      description: 'Numbers, counting, addition, subtraction, and more!',
      color: 'from-blue-500 to-cyan-500',
      topics: getTopicsForAge(selectedAge, 'math')
    },
    {
      id: 'english' as const,
      title: 'English Quests',
      emoji: '📚',
      icon: BookOpen,
      description: 'Letters, words, spelling, reading, and writing!',
      color: 'from-green-500 to-teal-500',
      topics: getTopicsForAge(selectedAge, 'english')
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          What Would You Like to Learn?
        </h2>
        <p className="text-xl text-white/90 drop-shadow-md">
          Ages {selectedAge} • Choose your favorite subject!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject) => (
          <Card 
            key={subject.id}
            className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => onSubjectSelect(subject.id)}
          >
            <CardHeader className="text-center pb-6">
              <div className={`mx-auto w-24 h-24 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center mb-4 text-5xl group-hover:animate-bounce`}>
                {subject.emoji}
              </div>
              <CardTitle className="text-2xl text-gray-800 mb-2">
                {subject.title}
              </CardTitle>
              <p className="text-gray-600">
                {subject.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">What you'll practice:</h4>
                {subject.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

function getTopicsForAge(age: string | null, subject: 'math' | 'english'): string[] {
  if (subject === 'math') {
    switch (age) {
      case '5-6':
        return ['Counting 1-20', 'Basic Addition', 'Shapes & Colors', 'Number Recognition'];
      case '7-8':
        return ['Addition & Subtraction', 'Skip Counting', 'Time & Money', 'Word Problems'];
      case '9-10':
        return ['Multiplication Tables', 'Division Basics', 'Fractions', 'Measurement'];
      case '11-12':
        return ['Advanced Division', 'Decimals', 'Geometry', 'Problem Solving'];
      default:
        return ['Number Games', 'Math Puzzles', 'Brain Teasers'];
    }
  } else {
    switch (age) {
      case '5-6':
        return ['Letter Recognition', 'Phonics', 'Simple Words', 'Story Time'];
      case '7-8':
        return ['Sight Words', 'Reading Sentences', 'Spelling', 'Writing Letters'];
      case '9-10':
        return ['Reading Comprehension', 'Vocabulary', 'Grammar', 'Creative Writing'];
      case '11-12':
        return ['Advanced Reading', 'Research Skills', 'Essay Writing', 'Literature'];
      default:
        return ['Word Games', 'Language Fun', 'Reading Adventures'];
    }
  }
}

export default SubjectSelection;
