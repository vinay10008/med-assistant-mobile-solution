
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIConsultation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real app, this would call your Python backend
      // For now, we'll simulate a response
      const response = await simulateAIResponse(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      console.error("AI consultation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated AI response function (would be replaced by actual API call)
  const simulateAIResponse = async (query: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple response logic based on keywords
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('headache')) {
      return "Headaches can be caused by various factors including stress, dehydration, or lack of sleep. Try resting, staying hydrated, and if symptoms persist for more than 24 hours, please consult with a doctor.";
    } else if (lowercaseQuery.includes('fever') || lowercaseQuery.includes('temperature')) {
      return "For fevers, rest and stay hydrated. Take over-the-counter fever reducers as directed. If your temperature exceeds 103°F (39.4°C) or lasts more than three days, seek medical attention.";
    } else if (lowercaseQuery.includes('cough') || lowercaseQuery.includes('cold')) {
      return "For coughs and colds, rest and drink plenty of fluids. Over-the-counter cough suppressants may help. If you experience difficulty breathing or symptoms persist beyond a week, please consult a healthcare professional.";
    } else {
      return "Thank you for sharing your symptoms. Based on your description, I recommend resting and staying hydrated. If your symptoms persist or worsen, please schedule an appointment with a doctor for a proper diagnosis.";
    }
  };

  return (
    <Card className="w-full bg-white shadow-md border border-medical-lightBlue">
      <CardHeader className="bg-medical-blue text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare size={20} />
          AI Consultation
        </CardTitle>
        <CardDescription className="text-medical-lightBlue">
          Get instant health advice from our AI
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 max-h-[300px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Describe your symptoms or health concerns to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-medical-lightBlue text-gray-800 ml-auto'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Textarea
            placeholder="Describe your symptoms here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[80px] flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="self-end bg-medical-blue hover:bg-medical-purple"
          >
            {isLoading ? (
              <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIConsultation;
