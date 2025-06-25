
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MathGameProps {
  ageGroup: '5-6' | '7-8' | '9-10' | '11-12' | null;
  onBack: () => void;
}

interface Question {
  question: string;
  answer: number;
  options: number[];
  explanation?: string;
}

const MathGame = ({ ageGroup, onBack }: MathGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gamePhase, setGamePhase] = useState<'playing' | 'feedback' | 'explanation'>('playing');

  useEffect(() => {
    generateNewQuestion();
  }, [ageGroup]);

  const generateNewQuestion = () => {
    const question = createQuestionForAge(ageGroup);
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGamePhase('playing');
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer: number) => {
    if (gamePhase !== 'playing') return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion?.answer;
    setIsCorrect(correct);
    setGamePhase('feedback');

    if (correct) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setWrongStreak(0);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      setWrongStreak(prev => prev + 1);
    }

    // Show explanation if student has 3 wrong answers in a row
    if (!correct && wrongStreak >= 2) {
      setShowExplanation(true);
      setGamePhase('explanation');
      setWrongStreak(0);
    }

    // Auto-advance after 2 seconds (unless showing explanation)
    if (correct || wrongStreak < 2) {
      setTimeout(() => {
        generateNewQuestion();
      }, 2000);
    }
  };

  const continueAfterExplanation = () => {
    generateNewQuestion();
  };

  if (!currentQuestion) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
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
          {streak > 0 && (
            <div className="flex items-center gap-2 bg-yellow-400/20 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="font-bold">{streak} streak!</span>
            </div>
          )}
        </div>
      </div>

      {/* Game Content */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl text-gray-800 mb-4">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {gamePhase === 'explanation' && showExplanation ? (
            // Explanation View
            <div className="text-center space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  💡 Let me help you understand!
                </h3>
                <p className="text-blue-700 text-lg leading-relaxed">
                  {currentQuestion.explanation || `The answer is ${currentQuestion.answer}. Let's break it down step by step!`}
                </p>
              </div>
              <Button 
                onClick={continueAfterExplanation}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
              >
                Got it! Let's try another one 🚀
              </Button>
            </div>
          ) : (
            // Question View
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={gamePhase !== 'playing'}
                    className={`h-16 text-xl font-bold transition-all duration-300 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'bg-green-500 hover:bg-green-600 text-white animate-pulse'
                          : 'bg-red-500 hover:bg-red-600 text-white animate-shake'
                        : gamePhase === 'feedback' && option === currentQuestion.answer
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-105'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {gamePhase === 'feedback' && (
                <div className="text-center py-4">
                  {isCorrect ? (
                    <div className="text-green-600 text-2xl font-bold animate-bounce">
                      🎉 Awesome! You got it right! 🎉
                    </div>
                  ) : (
                    <div className="text-red-600 text-xl font-bold">
                      😅 Oops! The correct answer was {currentQuestion.answer}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {lives === 0 && (
        <Card className="mt-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎮 Game Over!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Great job! You scored {score} points!
            </p>
            <Button
              onClick={() => {
                setScore(0);
                setLives(3);
                setStreak(0);
                setWrongStreak(0);
                generateNewQuestion();
              }}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function createQuestionForAge(age: string | null): Question {
  switch (age) {
    case '5-6':
      return createSimpleAddition();
    case '7-8':
      return createBasicMath();
    case '9-10':
      return createMultiplication();
    case '11-12':
      return createAdvancedMath();
    default:
      return createBasicMath();
  }
}

function createSimpleAddition(): Question {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const answer = a + b;
  const options = generateOptions(answer, 4);
  
  return {
    question: `${a} + ${b} = ?`,
    answer,
    options,
    explanation: `When we add ${a} + ${b}, we count ${a} first, then count ${b} more. That gives us ${answer}!`
  };
}

function createBasicMath(): Question {
  const operations = ['+', '-'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  
  if (op === '+') {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const answer = a + b;
    return {
      question: `${a} + ${b} = ?`,
      answer,
      options: generateOptions(answer, 4),
      explanation: `${a} + ${b} = ${answer}. We add the numbers together!`
    };
  } else {
    const answer = Math.floor(Math.random() * 20) + 1;
    const a = answer + Math.floor(Math.random() * 10) + 1;
    return {
      question: `${a} - ${a - answer} = ?`,
      answer,
      options: generateOptions(answer, 4),
      explanation: `${a} - ${a - answer} = ${answer}. We subtract to find the difference!`
    };
  }
}

function createMultiplication(): Question {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  const answer = a * b;
  
  return {
    question: `${a} × ${b} = ?`,
    answer,
    options: generateOptions(answer, 4),
    explanation: `${a} × ${b} means we add ${a} together ${b} times, which equals ${answer}!`
  };
}

function createAdvancedMath(): Question {
  const operations = ['×', '÷'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  
  if (op === '×') {
    const a = Math.floor(Math.random() * 15) + 1;
    const b = Math.floor(Math.random() * 15) + 1;
    const answer = a * b;
    return {
      question: `${a} × ${b} = ?`,
      answer,
      options: generateOptions(answer, 4),
      explanation: `${a} × ${b} = ${answer}. Multiplication is repeated addition!`
    };
  } else {
    const answer = Math.floor(Math.random() * 12) + 1;
    const a = answer * (Math.floor(Math.random() * 12) + 1);
    return {
      question: `${a} ÷ ${a / answer} = ?`,
      answer,
      options: generateOptions(answer, 4),
      explanation: `${a} ÷ ${a / answer} = ${answer}. Division is the opposite of multiplication!`
    };
  }
}

function generateOptions(correctAnswer: number, count: number): number[] {
  const options = [correctAnswer];
  
  while (options.length < count) {
    const variation = Math.floor(Math.random() * 20) - 10;
    const option = correctAnswer + variation;
    
    if (option > 0 && !options.includes(option)) {
      options.push(option);
    }
  }
  
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

export default MathGame;
