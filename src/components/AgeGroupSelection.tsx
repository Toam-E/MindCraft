
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AgeGroupSelectionProps {
  mode: 'private' | 'school' | null;
  onAgeSelect: (age: '5-6' | '7-8' | '9-10' | '11-12') => void;
}

const AgeGroupSelection = ({ mode, onAgeSelect }: AgeGroupSelectionProps) => {
  const ageGroups = [
    { 
      age: '5-6' as const, 
      emoji: '🐣', 
      title: 'Little Learners', 
      description: 'Perfect for kindergarten and early 1st grade',
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      age: '7-8' as const, 
      emoji: '🌱', 
      title: 'Growing Minds', 
      description: 'Great for 1st and 2nd graders',
      color: 'from-green-400 to-blue-400'
    },
    { 
      age: '9-10' as const, 
      emoji: '🚀', 
      title: 'Super Students', 
      description: 'Ideal for 3rd and 4th graders',
      color: 'from-blue-400 to-purple-400'
    },
    { 
      age: '11-12' as const, 
      emoji: '⭐', 
      title: 'Math Masters', 
      description: 'Challenge for 5th and 6th graders',
      color: 'from-purple-400 to-pink-400'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          How Old Are You?
        </h2>
        <p className="text-xl text-white/90 drop-shadow-md">
          {mode === 'private' ? 'Choose your age group to get started!' : 'Select the age group for your students'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ageGroups.map((group) => (
          <Card 
            key={group.age}
            className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => onAgeSelect(group.age)}
          >
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${group.color} rounded-full flex items-center justify-center mb-4 text-4xl group-hover:animate-bounce`}>
                {group.emoji}
              </div>
              <CardTitle className="text-xl text-gray-800 mb-1">
                Ages {group.age}
              </CardTitle>
              <h3 className="text-lg font-semibold text-purple-600">
                {group.title}
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">
                {group.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgeGroupSelection;
