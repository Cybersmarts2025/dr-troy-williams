import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, Shield, FileText, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useFocusTrap } from '@/hooks/useFocusTrap';

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
  
  // Focus trap for chat panel
  const focusTrapRef = useFocusTrap(isOpen);

  const chatTypes = {
    general: { icon: Shield, label: 'Q&A', color: 'bg-blue-500' },
    research: { icon: FileText, label: 'Research', color: 'bg-green-500' },
    consultation: { icon: Calendar, label: 'Consult', color: 'bg-purple-500' }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Personal welcome messages from Dr. Troy
      const welcomeMessages = {
        general: "Hey there! I'm Dr. Troy Williams - The Proactive AI PI. I specialize in synthetic identity fraud and cybersecurity. What's on your mind? I'm here to help you navigate any security challenges you're facing.",
        research: "Hi! I'm Dr. Troy - let's talk research. I'm passionate about synthetic identity fraud detection and AI security. Share what you're exploring, and I'll give you my insights from years of independent research.",
        consultation: "Hello! I'm Dr. Troy Williams. I'd love to learn about your situation and see how I can help. Tell me a bit about your organization and what security challenges you're facing, and we'll figure out the best path forward together."
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

    // Get current session token if available (do not use anon/publishable key in Authorization)
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(chatUrl, {
      method: 'POST',
      headers,
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

    // Require a signed-in user to prevent anonymous abuse and to include JWT
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      toast.error('Please sign in to use chat.');
      return;
    }

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
          aria-label="Chat with Dr. Troy Williams"
        >
          <MessageCircle className="h-6 w-6 text-white" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  const currentChatType = chatTypes[chatType];
  const Icon = currentChatType.icon;

  return (
    <div 
      ref={focusTrapRef}
      className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Chat with Dr. Troy Williams"
    >
      <Card className="h-full flex flex-col shadow-2xl border-2">
        <CardHeader className="pb-3 bg-gradient-to-r from-[#3C3B6E] to-[#2A2952] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <CardTitle className="text-lg">Chat with Dr. Troy</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
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
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
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
                      <User className="h-4 w-4 text-gray-700" />
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
                  <div className="text-sm text-gray-600">Dr. Troy is typing...</div>
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
                placeholder="Ask me anything about cybersecurity..."
                disabled={isStreaming}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                size="icon"
                className="bg-[#3C3B6E] hover:bg-[#2A2952]"
                aria-label={isStreaming ? "Sending message" : "Send message"}
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              Speak directly with Dr. Troy Williams
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatWidget;