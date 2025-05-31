
import React, { useState } from 'react';
import QuizSetup from '@/components/QuizSetup';
import QuizGame from '@/components/QuizGame';
import Leaderboard from '@/components/Leaderboard';
import QuestionManager from '@/components/QuestionManager';
import { Button } from '@/components/ui/button';
import { Trophy, Settings, Play, Plus } from 'lucide-react';

export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'fillblank';
  question: string;
  options?: string[];
  correctAnswers: string[];
  points: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  completedAt: Date;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'quiz' | 'leaderboard' | 'manage'>('home');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'single',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswers: ['Paris'],
      points: 10
    },
    {
      id: '2',
      type: 'multiple',
      question: 'Which of these are programming languages?',
      options: ['JavaScript', 'HTML', 'Python', 'CSS', 'Java'],
      correctAnswers: ['JavaScript', 'Python', 'Java'],
      points: 15
    },
    {
      id: '3',
      type: 'fillblank',
      question: 'The largest planet in our solar system is ____.',
      correctAnswers: ['Jupiter'],
      points: 12
    }
  ]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player].sort((a, b) => b.score - a.score));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="text-center">
            <div className="mb-12">
              <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
                QuizMaster Pro
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Challenge yourself with our interactive quiz platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Button
                onClick={() => setCurrentView('setup')}
                className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className="flex flex-col items-center gap-3">
                  <Play size={32} />
                  <span>Start Quiz</span>
                </div>
              </Button>
              
              <Button
                onClick={() => setCurrentView('leaderboard')}
                className="h-32 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className="flex flex-col items-center gap-3">
                  <Trophy size={32} />
                  <span>Leaderboard</span>
                </div>
              </Button>
              
              <Button
                onClick={() => setCurrentView('manage')}
                className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className="flex flex-col items-center gap-3">
                  <Plus size={32} />
                  <span>Manage Questions</span>
                </div>
              </Button>
              
              <Button
                onClick={() => setCurrentView('setup')}
                className="h-32 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className="flex flex-col items-center gap-3">
                  <Settings size={32} />
                  <span>Quick Start</span>
                </div>
              </Button>
            </div>
            
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
              <div className="grid md:grid-cols-2 gap-4 text-blue-100">
                <div>• Single & Multiple Choice</div>
                <div>• Fill in the Blanks</div>
                <div>• Real-time Scoring</div>
                <div>• Interactive Leaderboard</div>
                <div>• Custom Questions</div>
                <div>• Responsive Design</div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'setup' && (
          <QuizSetup
            onStartQuiz={(playerName) => {
              setCurrentPlayer(playerName);
              setCurrentView('quiz');
            }}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'quiz' && (
          <QuizGame
            questions={questions}
            playerName={currentPlayer}
            onComplete={(player) => {
              addPlayer(player);
              setCurrentView('leaderboard');
            }}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard
            players={players}
            onBack={() => setCurrentView('home')}
            onPlayAgain={() => setCurrentView('setup')}
          />
        )}

        {currentView === 'manage' && (
          <QuestionManager
            questions={questions}
            onUpdateQuestions={setQuestions}
            onBack={() => setCurrentView('home')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
