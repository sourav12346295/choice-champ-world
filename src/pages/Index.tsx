
import React, { useState } from 'react';
import QuizSetup from '@/components/QuizSetup';
import QuizGame from '@/components/QuizGame';
import Leaderboard from '@/components/Leaderboard';
import QuestionManager from '@/components/QuestionManager';
import VantaBackground from '@/components/VantaBackground';
import { Button } from '@/components/ui/button';
import { Trophy, Play, Plus } from 'lucide-react';
import Spline from '@splinetool/react-spline';

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
    <div className="min-h-screen relative">
      {/* Conditional Background */}
      {currentView === 'home' ? (
        // 3D Spline Background for Home Page
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/FZOQENShiCmLzl9J/scene.splinecode" />
        </div>
      ) : (
        // Vanta Birds Background for Other Pages
        <VantaBackground />
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {currentView === 'home' && (
            <div className="text-center">
              <div className="mb-12">
                <h1 className="text-6xl font-bold text-white mb-4 animate-pulse drop-shadow-2xl text-shadow-lg">
                  <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    QuizMaster Pro
                  </span>
                </h1>
                <p className="text-2xl text-white mb-8 drop-shadow-2xl font-semibold">
                  <span className="bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                    Challenge yourself with our interactive quiz platform
                  </span>
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Button
                  onClick={() => setCurrentView('setup')}
                  className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm bg-opacity-90 border border-white/20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Play size={32} />
                    <span className="drop-shadow-lg">Start Quiz</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => setCurrentView('leaderboard')}
                  className="h-32 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm bg-opacity-90 border border-white/20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Trophy size={32} />
                    <span className="drop-shadow-lg">Leaderboard</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => setCurrentView('manage')}
                  className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm bg-opacity-90 border border-white/20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Plus size={32} />
                    <span className="drop-shadow-lg">Manage Questions</span>
                  </div>
                </Button>
              </div>
              
              <div className="mt-16 bg-black/30 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/30 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
                  <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Features
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4 text-white font-medium text-lg">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-lg">• Single & Multiple Choice</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-lg">• Fill in the Blanks</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-lg">• Real-time Scoring</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-lg">• Interactive Leaderboard</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-lg">• Custom Questions</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-lg">• Responsive Design</span>
                  </div>
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
    </div>
  );
};

export default Index;
