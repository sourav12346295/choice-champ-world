
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X, Edit, Check } from 'lucide-react';
import { Question } from '@/pages/Index';

interface QuestionManagerProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
  onBack: () => void;
}

const QuestionManager = ({ questions, onUpdateQuestions, onBack }: QuestionManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'single' as Question['type'],
    question: '',
    options: ['', '', '', ''],
    correctAnswers: [''],
    points: 10
  });

  const resetForm = () => {
    setFormData({
      type: 'single',
      question: '',
      options: ['', '', '', ''],
      correctAnswers: [''],
      points: 10
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newQuestion: Question = {
      id: editingId || Date.now().toString(),
      type: formData.type,
      question: formData.question,
      options: formData.type !== 'fillblank' ? formData.options.filter(opt => opt.trim()) : undefined,
      correctAnswers: formData.correctAnswers.filter(ans => ans.trim()),
      points: formData.points
    };

    if (editingId) {
      onUpdateQuestions(questions.map(q => q.id === editingId ? newQuestion : q));
    } else {
      onUpdateQuestions([...questions, newQuestion]);
    }
    
    resetForm();
  };

  const handleEdit = (question: Question) => {
    setFormData({
      type: question.type,
      question: question.question,
      options: question.options || ['', '', '', ''],
      correctAnswers: question.correctAnswers,
      points: question.points
    });
    setEditingId(question.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    onUpdateQuestions(questions.filter(q => q.id !== id));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const updateCorrectAnswer = (index: number, value: string) => {
    const newAnswers = [...formData.correctAnswers];
    newAnswers[index] = value;
    setFormData({ ...formData, correctAnswers: newAnswers });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button onClick={onBack} variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
        <h1 className="text-4xl font-bold text-white">Question Manager</h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Question
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              {editingId ? 'Edit Question' : 'Add New Question'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question Type</label>
                  <Select value={formData.type} onValueChange={(value: Question['type']) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Choice</SelectItem>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                      <SelectItem value="fillblank">Fill in the Blank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Points</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 10 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Question</label>
                <Textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter your question here..."
                  required
                />
              </div>

              {formData.type !== 'fillblank' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Options</label>
                  <div className="space-y-2">
                    {formData.options.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Correct Answer{formData.type === 'multiple' ? 's' : ''}
                </label>
                {formData.type === 'multiple' ? (
                  <div className="space-y-2">
                    {formData.correctAnswers.map((answer, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={answer}
                          onChange={(e) => updateCorrectAnswer(index, e.target.value)}
                          placeholder="Correct answer"
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newAnswers = formData.correctAnswers.filter((_, i) => i !== index);
                              setFormData({ ...formData, correctAnswers: newAnswers });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ ...formData, correctAnswers: [...formData.correctAnswers, ''] })}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Answer
                    </Button>
                  </div>
                ) : (
                  <Input
                    value={formData.correctAnswers[0] || ''}
                    onChange={(e) => setFormData({ ...formData, correctAnswers: [e.target.value] })}
                    placeholder="Correct answer"
                    required
                  />
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Check className="mr-2 h-4 w-4" />
                  {editingId ? 'Update Question' : 'Add Question'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    Q{index + 1}: {question.question}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {question.type === 'single' ? 'Single Choice' :
                       question.type === 'multiple' ? 'Multiple Choice' : 'Fill in the Blank'}
                    </span>
                    <span className="font-semibold">{question.points} points</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(question)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(question.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {question.options && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Options:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Correct Answer{question.correctAnswers.length > 1 ? 's' : ''}:
                </p>
                <p className="text-green-700 font-semibold">
                  {question.correctAnswers.join(', ')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionManager;
