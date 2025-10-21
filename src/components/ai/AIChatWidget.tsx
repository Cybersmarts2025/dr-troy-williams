import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, Shield, FileText, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatWidgetProps {
  defaultChatType?: 'general' | 'research' | 'consultation';
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ defaultChatType = 'general' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatType, setChatType] = useState(defaultChatType);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatTypes = {
    general: { icon: Shield, label: 'Cybersecurity Q&A', color: 'bg-blue-500' },
    research: { icon: FileText, label: 'Research Assistant', color: 'bg-green-500' },
    consultation: { icon: Calendar, label: 'Consultation Help', color: 'bg-purple-500' }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message based on chat type
      const welcomeMessages = {
        general: "👋 Hi! I'm Dr. Troy Williams' AI assistant. I provide step-by-step, example-rich answers tailored to your context. For more depth, say ‘deep dive’. What would you like to explore?",
        research: "🔬 Welcome! I provide detailed research analysis with key findings, methods, limitations, and next steps. Share a link or topic, or say ‘deep dive’ for a thorough review.",
        consultation: "📅 Hello! I’ll ask a few quick questions, then outline recommended services, timelines, and immediate actions. Tell me your goals, timeline, and constraints."
      };

      setMessages([{
        role: 'assistant',
        content: welcomeMessages[chatType],
        timestamp: new Date()
      }]);
    }
  }, [isOpen, chatType]);

  const streamChat = async (messages: Message[], chatType: string) => {
    const chatUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-cybersecurity-chat`;
    
    const response = await fetch(chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ 
        messages: messages.map(msg => ({ role: msg.role, content: msg.content })),
        chatType 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let assistantContent = '';

    const processBuffer = () => {
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.trim() || line.startsWith(':') || !line.startsWith('data: ')) continue;
        
        const data = line.slice(6).trim();
        if (data === '[DONE]') return true;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === 'assistant') {
                return prev.map((msg, i) => 
                  i === prev.length - 1 
                    ? { ...msg, content: assistantContent }
                    : msg
                );
              } else {
                return [...prev, {
                  role: 'assistant' as const,
                  content: assistantContent,
                  timestamp: new Date()
                }];
              }
            });
          }
        } catch (e) {
          // Invalid JSON, put back in buffer
          buffer = line + '\n' + buffer;
          break;
        }
      }
      return false;
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        if (processBuffer()) break;
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        processBuffer();
      }
    } finally {
      reader.releaseLock();
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    try {
      await streamChat([...messages, userMessage], chatType);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
      
      // Remove the failed user message
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#3C3B6E] hover:bg-[#2A2952] shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  const currentChatType = chatTypes[chatType];
  const Icon = currentChatType.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]">
      <Card className="h-full flex flex-col shadow-2xl border-2">
        <CardHeader className="pb-3 bg-gradient-to-r from-[#3C3B6E] to-[#2A2952] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat Type Selector */}
          <div className="flex gap-1 mt-2">
            {Object.entries(chatTypes).map(([key, type]) => (
              <Badge
                key={key}
                variant={key === chatType ? "secondary" : "outline"}
                className={`cursor-pointer text-xs px-2 py-1 ${
                  key === chatType 
                    ? 'bg-white text-[#3C3B6E]' 
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  setChatType(key as any);
                  resetChat();
                }}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#3C3B6E] flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#3C3B6E] text-white ml-8'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isStreaming && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#3C3B6E] flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">AI is thinking...</div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cybersecurity, AI safety, or fraud prevention..."
                disabled={isStreaming}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                size="icon"
                className="bg-[#3C3B6E] hover:bg-[#2A2952]"
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              Powered by Lovable AI • Using Gemini 2.5 Flash
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatWidget;