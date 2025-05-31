
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, ArrowLeft, Play } from 'lucide-react';
import { Player } from '@/pages/Index';

interface LeaderboardProps {
  players: Player[];
  onBack: () => void;
  onPlayAgain: () => void;
}

const Leaderboard = ({ players, onBack, onPlayAgain }: LeaderboardProps) => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 1:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 2:
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">{index + 1}</div>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'from-yellow-400 to-yellow-600';
      case 1:
        return 'from-gray-300 to-gray-500';
      case 2:
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">🏆 Leaderboard</h1>
        <p className="text-xl text-blue-100">See how you stack up against other players!</p>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl mb-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Top Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          {players.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No scores yet!</p>
              <p className="text-gray-400 mt-2">Be the first to take the quiz and claim the top spot.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-6 rounded-xl bg-gradient-to-r ${getRankColor(index)} text-white shadow-lg transform transition-all duration-300 hover:scale-102`}
                >
                  <div className="flex items-center gap-4">
                    {getRankIcon(index)}
                    <div>
                      <div className="text-xl font-bold">{player.name}</div>
                      <div className="text-sm opacity-90">
                        Completed: {player.completedAt.toLocaleDateString()} at {player.completedAt.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{player.score}</div>
                    <div className="text-sm opacity-90">points</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-12 px-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
        <Button
          onClick={onPlayAgain}
          className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
        >
          <Play className="mr-2 h-5 w-5" />
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
