
import { useState } from 'react';
import { ArrowLeft, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ThemeCustomizationProps {
  onComplete: (theme: StudentTheme) => void;
  onBack: () => void;
}

export interface StudentTheme {
  gradientColors: [string, string, string];
  themeEmoji: string;
  themeName: string;
}

const colorOptions = [
  { name: 'Ocean', colors: ['#3B82F6', '#1E40AF', '#0EA5E9'] as [string, string, string] },
  { name: 'Sunset', colors: ['#F97316', '#EF4444', '#EC4899'] as [string, string, string] },
  { name: 'Forest', colors: ['#10B981', '#059669', '#22C55E'] as [string, string, string] },
  { name: 'Purple Magic', colors: ['#8B5CF6', '#7C3AED', '#A855F7'] as [string, string, string] },
  { name: 'Rainbow', colors: ['#F59E0B', '#EF4444', '#8B5CF6'] as [string, string, string] },
  { name: 'Cotton Candy', colors: ['#EC4899', '#F472B6', '#A855F7'] as [string, string, string] }
];

const themeOptions = [
  { name: 'Unicorns', emoji: '🦄', decorations: ['🌈', '⭐', '✨'] },
  { name: 'Dinosaurs', emoji: '🦕', decorations: ['🌋', '🦴', '🌿'] },
  { name: 'Space', emoji: '🚀', decorations: ['🌟', '🪐', '👽'] },
  { name: 'Ocean', emoji: '🐠', decorations: ['🌊', '🐙', '🦑'] },
  { name: 'Princess', emoji: '👸', decorations: ['💎', '🏰', '🌸'] },
  { name: 'Animals', emoji: '🐨', decorations: ['🦁', '🐼', '🦊'] }
];

const ThemeCustomization = ({ onComplete, onBack }: ThemeCustomizationProps) => {
  const [selectedColors, setSelectedColors] = useState<[string, string, string]>(colorOptions[0].colors);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);

  const handleComplete = () => {
    const theme: StudentTheme = {
      gradientColors: selectedColors,
      themeEmoji: selectedTheme.emoji,
      themeName: selectedTheme.name
    };
    onComplete(theme);
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${selectedColors[0]}, ${selectedColors[1]}, ${selectedColors[2]})`
  };

  return (
    <div className="min-h-screen" style={gradientStyle}>
      {/* Decorative elements based on selected theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {selectedTheme.decorations.map((decoration, index) => (
          <div
            key={index}
            className={`absolute text-6xl opacity-20 animate-pulse`}
            style={{
              top: `${20 + index * 25}%`,
              left: `${10 + index * 30}%`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            {decoration}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
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
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            <Palette className="inline mr-4" />
            Make It Yours!
          </h2>
          <p className="text-xl text-white/90 drop-shadow-md">
            Choose your favorite colors and theme to make learning extra fun!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Color Selection */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Pick Your Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColors(option.colors)}
                    className={`p-4 rounded-lg border-4 transition-all duration-300 hover:scale-105 ${
                      selectedColors === option.colors ? 'border-white shadow-lg' : 'border-transparent'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${option.colors[0]}, ${option.colors[1]}, ${option.colors[2]})`
                    }}
                  >
                    <div className="text-white font-bold text-lg drop-shadow-md">
                      {option.name}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                {selectedTheme.emoji}
                Pick Your Theme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themeOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTheme(option)}
                    className={`p-6 rounded-lg border-4 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-gray-50 to-gray-100 ${
                      selectedTheme.name === option.name ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <div className="text-6xl mb-2">{option.emoji}</div>
                    <div className="text-gray-800 font-bold text-lg">{option.name}</div>
                    <div className="text-2xl mt-2 flex justify-center gap-2">
                      {option.decorations.map((dec, i) => (
                        <span key={i} className="opacity-60">{dec}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview and Continue */}
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                Your Theme Preview
              </h3>
              <div className="text-8xl">{selectedTheme.emoji}</div>
            </div>
            
            <Button 
              onClick={handleComplete}
              className="bg-white text-gray-800 hover:bg-white/90 text-xl px-8 py-4 rounded-full font-bold shadow-2xl"
            >
              Let's Learn! 🎉
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomization;
