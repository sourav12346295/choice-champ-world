
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Trophy } from 'lucide-react';
import { Question, Player } from '@/pages/Index';

interface QuizGameProps {
  questions: Question[];
  playerName: string;
  onComplete: (player: Player) => void;
  onBack: () => void;
}

const QuizGame = ({ questions, playerName, onComplete, onBack }: QuizGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNext();
    }
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    setTimeLeft(30);
    setIsAnswered(false);
    setShowResult(false);
  }, [currentQuestionIndex]);

  const handleAnswerChange = (value: string, checked?: boolean) => {
    const questionId = currentQuestion.id;
    
    if (currentQuestion.type === 'multiple') {
      setAnswers(prev => {
        const currentAnswers = prev[questionId] || [];
        if (checked) {
          return { ...prev, [questionId]: [...currentAnswers, value] };
        } else {
          return { ...prev, [questionId]: currentAnswers.filter(a => a !== value) };
        }
      });
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: [value] }));
    }
  };

  const checkAnswer = () => {
    const userAnswers = answers[currentQuestion.id] || [];
    const correctAnswers = currentQuestion.correctAnswers;
    
    if (currentQuestion.type === 'multiple') {
      return userAnswers.length === correctAnswers.length &&
             userAnswers.every(answer => correctAnswers.includes(answer));
    } else {
      return userAnswers.length > 0 && 
             correctAnswers.some(correct => 
               userAnswers[0]?.toLowerCase().trim() === correct.toLowerCase().trim()
             );
    }
  };

  const handleSubmitAnswer = () => {
    setIsAnswered(true);
    setShowResult(true);
    
    if (checkAnswer()) {
      setScore(prev => prev + currentQuestion.points);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const player: Player = {
        id: Date.now().toString(),
        name: playerName,
        score,
        completedAt: new Date()
      };
      onComplete(player);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Button onClick={onBack} variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <div className="text-white text-center">
          <div className="text-xl font-bold">{playerName}</div>
          <div className="text-blue-200">Score: {score}</div>
        </div>
        <div className="text-white text-right">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-300' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-white mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">
            {currentQuestion.question}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span>{currentQuestion.points} points</span>
            </div>
            <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {currentQuestion.type === 'single' ? 'Single Choice' :
               currentQuestion.type === 'multiple' ? 'Multiple Choice' : 'Fill in the Blank'}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.type === 'fillblank' ? (
            <Input
              placeholder="Type your answer here..."
              value={answers[currentQuestion.id]?.[0] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={isAnswered}
              className="text-lg p-4"
            />
          ) : (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    showResult
                      ? currentQuestion.correctAnswers.includes(option)
                        ? 'border-green-500 bg-green-50'
                        : answers[currentQuestion.id]?.includes(option)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : answers[currentQuestion.id]?.includes(option)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    if (!isAnswered) {
                      if (currentQuestion.type === 'single') {
                        handleAnswerChange(option);
                      }
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {currentQuestion.type === 'multiple' ? (
                      <Checkbox
                        checked={answers[currentQuestion.id]?.includes(option) || false}
                        onCheckedChange={(checked) => handleAnswerChange(option, checked as boolean)}
                        disabled={isAnswered}
                      />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        answers[currentQuestion.id]?.includes(option)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion.id]?.includes(option) && (
                          <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5" />
                        )}
                      </div>
                    )}
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {!isAnswered ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!answers[currentQuestion.id]?.length}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg text-center font-semibold ${
              checkAnswer() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {checkAnswer() ? 
                `Correct! +${currentQuestion.points} points` : 
                `Incorrect. The correct answer${currentQuestion.correctAnswers.length > 1 ? 's are' : ' is'}: ${currentQuestion.correctAnswers.join(', ')}`
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
