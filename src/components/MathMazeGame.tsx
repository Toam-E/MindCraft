
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, RotateCcw, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MathMazeGameProps {
  ageGroup: '5-6' | '7-8' | '9-10' | '11-12' | null;
  onBack: () => void;
}

interface MazeCell {
  question: string;
  answer: number;
  options: number[];
  isPath: boolean;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const MathMazeGame = ({ ageGroup, onBack }: MathMazeGameProps) => {
  const [maze, setMaze] = useState<MazeCell[][]>([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<MazeCell | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    generateMaze();
  }, [ageGroup]);

  const generateMaze = () => {
    const newMaze: MazeCell[][] = [];
    const size = 4; // 4x4 maze
    
    // Create a simple path from start to end
    const pathCells = [
      { row: 0, col: 0 }, // start
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 3, col: 3 }  // end
    ];

    for (let row = 0; row < size; row++) {
      newMaze[row] = [];
      for (let col = 0; col < size; col++) {
        const isPath = pathCells.some(p => p.row === row && p.col === col);
        const question = generateQuestionForAge(ageGroup);
        
        newMaze[row][col] = {
          ...question,
          isPath,
          isVisited: row === 0 && col === 0, // Start position is visited
          isStart: row === 0 && col === 0,
          isEnd: row === 3 && col === 3
        };
      }
    }
    
    setMaze(newMaze);
    setPlayerPos({ row: 0, col: 0 });
    setScore(0);
    setLives(3);
    setGameComplete(false);
    setCurrentQuestion(null);
    setShowQuestion(false);
    setSelectedAnswer(null);
  };

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    const { row, col } = playerPos;
    let newRow = row;
    let newCol = col;

    switch (direction) {
      case 'up':
        newRow = Math.max(0, row - 1);
        break;
      case 'down':
        newRow = Math.min(3, row + 1);
        break;
      case 'left':
        newCol = Math.max(0, col - 1);
        break;
      case 'right':
        newCol = Math.min(3, col + 1);
        break;
    }

    // Check if the new position is a valid path cell
    if (maze[newRow] && maze[newRow][newCol] && maze[newRow][newCol].isPath) {
      // If this cell hasn't been visited, show question
      if (!maze[newRow][newCol].isVisited) {
        setCurrentQuestion(maze[newRow][newCol]);
        setShowQuestion(true);
        setSelectedAnswer(null);
      } else {
        // Move directly if already visited
        setPlayerPos({ row: newRow, col: newCol });
        
        // Check if reached the end
        if (maze[newRow][newCol].isEnd) {
          setGameComplete(true);
        }
      }
    }
  };

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion?.answer;
    
    if (correct) {
      setScore(prev => prev + 10);
      
      // Mark cell as visited and move player
      const newMaze = [...maze];
      newMaze[playerPos.row][playerPos.col] = {
        ...newMaze[playerPos.row][playerPos.col],
        isVisited: true
      };
      setMaze(newMaze);
      
      // Move to the new position
      const targetCell = maze.flat().find(cell => cell === currentQuestion);
      const targetPos = findCellPosition(targetCell);
      if (targetPos) {
        setPlayerPos(targetPos);
        
        // Check if reached the end
        if (targetCell?.isEnd) {
          setGameComplete(true);
        }
      }
      
      setTimeout(() => {
        setShowQuestion(false);
        setCurrentQuestion(null);
      }, 1500);
    } else {
      setLives(prev => prev - 1);
      setTimeout(() => {
        setShowQuestion(false);
        setCurrentQuestion(null);
      }, 1500);
    }
  };

  const findCellPosition = (cell: MazeCell | null) => {
    if (!cell) return null;
    
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        if (maze[row][col] === cell) {
          return { row, col };
        }
      }
    }
    return null;
  };

  if (!maze.length) {
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
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl text-gray-800 mb-4">
            🎯 Math Maze Adventure!
          </CardTitle>
          <p className="text-lg text-gray-600">
            Solve math problems to unlock your path to the treasure!
          </p>
        </CardHeader>
        
        <CardContent>
          {showQuestion && currentQuestion ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h3>
                <p className="text-gray-600">Choose the correct answer to continue!</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`h-16 text-xl font-bold transition-all duration-300 ${
                      selectedAnswer === option
                        ? option === currentQuestion.answer
                          ? 'bg-green-500 hover:bg-green-600 text-white animate-pulse'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                        : selectedAnswer !== null && option === currentQuestion.answer
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-105'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <div className="text-center py-4">
                  {selectedAnswer === currentQuestion.answer ? (
                    <div className="text-green-600 text-2xl font-bold animate-bounce">
                      🎉 Correct! Path unlocked! 🎉
                    </div>
                  ) : (
                    <div className="text-red-600 text-xl font-bold">
                      😅 Try again! The answer was {currentQuestion.answer}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : gameComplete ? (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-yellow-600">Treasure Found!</h3>
              <p className="text-lg text-gray-600">
                Amazing! You navigated through the maze! Final Score: {score} points
              </p>
              <Button
                onClick={generateMaze}
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Maze
              </Button>
            </div>
          ) : lives === 0 ? (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">😅</div>
              <h3 className="text-2xl font-bold text-red-600">Game Over!</h3>
              <p className="text-lg text-gray-600">
                You scored {score} points. Try the maze again!
              </p>
              <Button
                onClick={generateMaze}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Maze Grid */}
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {maze.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                        cell.isStart
                          ? 'bg-green-400 border-green-600 text-white'
                          : cell.isEnd
                            ? 'bg-yellow-400 border-yellow-600 text-white'
                            : cell.isPath
                              ? cell.isVisited
                                ? 'bg-blue-200 border-blue-400 text-blue-800'
                                : 'bg-purple-200 border-purple-400 text-purple-800'
                              : 'bg-gray-300 border-gray-500 text-gray-600'
                      } ${
                        playerPos.row === rowIndex && playerPos.col === colIndex
                          ? 'ring-4 ring-orange-400 scale-110'
                          : ''
                      }`}
                    >
                      {cell.isStart ? '🚀' : cell.isEnd ? '🏆' : 
                       playerPos.row === rowIndex && playerPos.col === colIndex ? '👦' :
                       cell.isPath ? (cell.isVisited ? '✅' : '❓') : '🧱'}
                    </div>
                  ))
                )}
              </div>

              {/* Movement Controls */}
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={() => movePlayer('up')}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12"
                >
                  <ArrowUp className="w-6 h-6" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => movePlayer('left')}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={() => movePlayer('right')}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </div>
                <Button
                  onClick={() => movePlayer('down')}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12"
                >
                  <ArrowDown className="w-6 h-6" />
                </Button>
              </div>

              <div className="text-center text-gray-600">
                <p>🚀 Start • 🏆 Treasure • 👦 You • ✅ Solved • ❓ Question • 🧱 Wall</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function generateQuestionForAge(age: string | null) {
  switch (age) {
    case '5-6':
      const a1 = Math.floor(Math.random() * 5) + 1;
      const b1 = Math.floor(Math.random() * 5) + 1;
      const answer1 = a1 + b1;
      return {
        question: `${a1} + ${b1} = ?`,
        answer: answer1,
        options: [answer1, answer1 + 1, answer1 - 1, answer1 + 2].sort(() => Math.random() - 0.5)
      };
      
    case '7-8':
      const a2 = Math.floor(Math.random() * 10) + 1;
      const b2 = Math.floor(Math.random() * 10) + 1;
      const answer2 = a2 + b2;
      return {
        question: `${a2} + ${b2} = ?`,
        answer: answer2,
        options: [answer2, answer2 + 2, answer2 - 2, answer2 + 5].sort(() => Math.random() - 0.5)
      };
      
    case '9-10':
      const a3 = Math.floor(Math.random() * 8) + 2;
      const b3 = Math.floor(Math.random() * 8) + 2;
      const answer3 = a3 * b3;
      return {
        question: `${a3} × ${b3} = ?`,
        answer: answer3,
        options: [answer3, answer3 + 5, answer3 - 5, answer3 + 10].sort(() => Math.random() - 0.5)
      };
      
    case '11-12':
      const a4 = Math.floor(Math.random() * 12) + 2;
      const b4 = Math.floor(Math.random() * 12) + 2;
      const answer4 = a4 * b4;
      return {
        question: `${a4} × ${b4} = ?`,
        answer: answer4,
        options: [answer4, answer4 + 8, answer4 - 8, answer4 + 15].sort(() => Math.random() - 0.5)
      };
      
    default:
      const a5 = Math.floor(Math.random() * 5) + 1;
      const b5 = Math.floor(Math.random() * 5) + 1;
      const answer5 = a5 + b5;
      return {
        question: `${a5} + ${b5} = ?`,
        answer: answer5,
        options: [answer5, answer5 + 1, answer5 - 1, answer5 + 2].sort(() => Math.random() - 0.5)
      };
  }
}

export default MathMazeGame;
