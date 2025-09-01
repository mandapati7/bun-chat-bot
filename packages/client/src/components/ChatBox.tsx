import { set, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa6';
import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type FormData = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const ChatBox = () => {
  const conversationId = useRef(crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = async ({ prompt }: FormData) => {
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    setIsBotTyping(true);
    reset();
    const response = await axios.post<ChatResponse>('/api/chat', {
      prompt,
      conversationId: conversationId.current,
    });
    setMessages((prev) => [...prev, { role: 'bot', content: response.data.message }]);
    setIsBotTyping(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const onCopySelectedText = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };
  return (
    <div className="relative h-screen max-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto px-2 pb-32 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 border shadow w-fit max-w-2xl break-words mb-2
                ${
                  msg.role === 'user'
                    ? 'bg-blue-100 text-blue-900 rounded-br-none'
                    : 'bg-gray-900 text-green-400 rounded-bl-none'
                }
              `}
            >
              <p
                className={`font-bold mb-1 text-sm ${msg.role === 'user' ? 'text-blue-600' : 'text-green-400'}`}
              >
                <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
              </p>
              <span
                className={msg.role === 'user' ? 'text-blue-900' : 'text-white'}
                onCopy={onCopySelectedText}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </span>
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex gap-x-2 px-3 py-3 bg-gray-200 rounded-xl w-auto ml-2">
            <div
              className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: '200ms' }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: '400ms' }}
            ></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="fixed bottom-0 left-0 w-full bg-white border-t flex items-center gap-2 px-4 py-3 shadow-lg z-10"
        style={{ maxWidth: '100vw' }}
      >
        <textarea
          {...register('prompt', { required: true, validate: (value) => value.trim().length > 0 })}
          className="flex-1 border rounded-lg p-2 resize-none focus:outline-none bg-gray-100"
          placeholder="Ask me anything..."
          maxLength={1000}
          rows={1}
        />
        <Button
          disabled={!formState.isValid}
          className="p-3 rounded-full w-9 h-9 flex items-center justify-center"
        >
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
