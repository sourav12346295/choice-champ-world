
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User } from 'lucide-react';

interface QuizSetupProps {
  onStartQuiz: (playerName: string) => void;
  onBack: () => void;
}

const QuizSetup = ({ onStartQuiz, onBack }: QuizSetupProps) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartQuiz(playerName.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ready to Quiz?
          </CardTitle>
          <p className="text-gray-600 mt-2">Enter your name to get started</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="pl-10 h-12 text-lg"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg transition-all duration-300"
              disabled={!playerName.trim()}
            >
              Start Quiz
            </Button>
          </form>
          
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full h-12"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSetup;
