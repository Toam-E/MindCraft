
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WordMatchGameProps {
  ageGroup: '5-6' | '7-8' | '9-10' | '11-12' | null;
  onBack: () => void;
}

interface WordPair {
  word: string;
  image: string;
  matched: boolean;
}

const WordMatchGame = ({ ageGroup, onBack }: WordMatchGameProps) => {
  const [wordPairs, setWordPairs] = useState<WordPair[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    generateWordPairs();
  }, [ageGroup]);

  const generateWordPairs = () => {
    const pairs = getWordsForAge(ageGroup);
    const shuffledWords = [...pairs].sort(() => Math.random() - 0.5);
    const shuffledImages = [...pairs].sort(() => Math.random() - 0.5);
    
    setWordPairs(pairs.map(pair => ({ ...pair, matched: false })));
    setScore(0);
    setLives(3);
    setGameComplete(false);
    setSelectedWord(null);
    setSelectedImage(null);
    setShowFeedback(null);
  };

  const handleWordClick = (word: string) => {
    if (selectedWord === word || wordPairs.find(p => p.word === word)?.matched) return;
    setSelectedWord(word);
    
    if (selectedImage) {
      checkMatch(word, selectedImage);
    }
  };

  const handleImageClick = (image: string) => {
    if (selectedImage === image || wordPairs.find(p => p.image === image)?.matched) return;
    setSelectedImage(image);
    
    if (selectedWord) {
      checkMatch(selectedWord, image);
    }
  };

  const checkMatch = (word: string, image: string) => {
    const wordPair = wordPairs.find(p => p.word === word);
    const imagePair = wordPairs.find(p => p.image === image);
    
    if (wordPair && imagePair && wordPair.word === imagePair.word) {
      // Correct match
      setShowFeedback('correct');
      setScore(prev => prev + 10);
      setWordPairs(prev => prev.map(p => 
        p.word === word ? { ...p, matched: true } : p
      ));
      
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
        setShowFeedback(null);
        
        // Check if game is complete
        const updatedPairs = wordPairs.map(p => 
          p.word === word ? { ...p, matched: true } : p
        );
        if (updatedPairs.every(p => p.matched)) {
          setGameComplete(true);
        }
      }, 1500);
    } else {
      // Wrong match
      setShowFeedback('wrong');
      setLives(prev => prev - 1);
      
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
        setShowFeedback(null);
      }, 1500);
    }
  };

  if (!wordPairs.length) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex items-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="font-bold text-lg">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-6 h-6 ${i < lives ? 'text-red-400 fill-current' : 'text-gray-400'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl text-gray-800 mb-4">
            🎯 Match Words with Pictures!
          </CardTitle>
          <p className="text-lg text-gray-600">
            Click a word, then click its matching picture
          </p>
        </CardHeader>
        
        <CardContent>
          {gameComplete ? (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600">Amazing Work!</h3>
              <p className="text-lg text-gray-600">
                You matched all the words! Final Score: {score} points
              </p>
              <Button
                onClick={generateWordPairs}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
            </div>
          ) : lives === 0 ? (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">😅</div>
              <h3 className="text-2xl font-bold text-red-600">Game Over!</h3>
              <p className="text-lg text-gray-600">
                Don't worry! You scored {score} points. Try again!
              </p>
              <Button
                onClick={generateWordPairs}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Words Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Words</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {wordPairs.map((pair, index) => (
                    <Button
                      key={index}
                      onClick={() => handleWordClick(pair.word)}
                      disabled={pair.matched}
                      className={`h-16 text-lg font-bold transition-all duration-300 ${
                        pair.matched
                          ? 'bg-green-200 text-green-800 cursor-not-allowed'
                          : selectedWord === pair.word
                            ? 'bg-blue-500 text-white scale-105'
                            : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-105'
                      }`}
                    >
                      {pair.word}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Pictures</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {wordPairs.map((pair, index) => (
                    <Button
                      key={index}
                      onClick={() => handleImageClick(pair.image)}
                      disabled={pair.matched}
                      className={`h-20 text-4xl transition-all duration-300 ${
                        pair.matched
                          ? 'bg-green-200 cursor-not-allowed'
                          : selectedImage === pair.image
                            ? 'bg-blue-200 scale-105'
                            : 'bg-gradient-to-r from-yellow-200 to-orange-200 hover:from-yellow-300 hover:to-orange-300 hover:scale-105'
                      }`}
                    >
                      {pair.image}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className="text-center py-4">
                  {showFeedback === 'correct' ? (
                    <div className="text-green-600 text-2xl font-bold animate-bounce">
                      🎉 Perfect Match! 🎉
                    </div>
                  ) : (
                    <div className="text-red-600 text-xl font-bold">
                      😅 Try again! Those don't match.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function getWordsForAge(age: string | null): WordPair[] {
  switch (age) {
    case '5-6':
      return [
        { word: 'CAT', image: '🐱', matched: false },
        { word: 'DOG', image: '🐶', matched: false },
        { word: 'SUN', image: '☀️', matched: false },
        { word: 'BALL', image: '⚽', matched: false }
      ];
    case '7-8':
      return [
        { word: 'APPLE', image: '🍎', matched: false },
        { word: 'HOUSE', image: '🏠', matched: false },
        { word: 'TREE', image: '🌳', matched: false },
        { word: 'BOOK', image: '📚', matched: false },
        { word: 'CAR', image: '🚗', matched: false }
      ];
    case '9-10':
      return [
        { word: 'ELEPHANT', image: '🐘', matched: false },
        { word: 'BUTTERFLY', image: '🦋', matched: false },
        { word: 'RAINBOW', image: '🌈', matched: false },
        { word: 'FLOWER', image: '🌸', matched: false },
        { word: 'MOUNTAIN', image: '⛰️', matched: false },
        { word: 'OCEAN', image: '🌊', matched: false }
      ];
    case '11-12':
      return [
        { word: 'TELESCOPE', image: '🔭', matched: false },
        { word: 'MICROSCOPE', image: '🔬', matched: false },
        { word: 'LABORATORY', image: '🧪', matched: false },
        { word: 'CALCULATOR', image: '📱', matched: false },
        { word: 'GEOMETRY', image: '📐', matched: false },
        { word: 'ENCYCLOPEDIA', image: '📖', matched: false }
      ];
    default:
      return [
        { word: 'CAT', image: '🐱', matched: false },
        { word: 'DOG', image: '🐶', matched: false },
        { word: 'SUN', image: '☀️', matched: false },
        { word: 'BALL', image: '⚽', matched: false }
      ];
  }
}

export default WordMatchGame;
