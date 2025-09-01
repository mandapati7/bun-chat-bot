import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa6';
import axios from 'axios';
import { useRef, useState } from 'react';

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
  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const onSubmit = async ({ prompt }: FormData) => {
    reset();
    const response = await axios.post<ChatResponse>('/api/chat', {
      prompt,
      conversationId: conversationId.current,
    });
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: prompt },
      { role: 'bot', content: response.data.message },
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 border rounded ${msg.role === 'user' ? 'bg-white' : 'bg-black'}`}
          >
            <p
              className={`font-bold mb-1 ${msg.role === 'user' ? 'text-blue-600' : 'text-green-600'}`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
            </p>
            <span className={msg.role === 'user' ? 'text-black' : 'text-white'}>{msg.content}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-lg"
      >
        <textarea
          {...register('prompt', { required: true, validate: (value) => value.trim().length > 0 })}
          className="w-full border-0 focus:outline-0 resize-none"
          placeholder="Ask me anything..."
          maxLength={1000}
        />
        <Button disabled={!formState.isValid} className="p-3 rounded-full w-9 h-9">
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
