import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa6';

type FormData = {
  prompt: string;
};

const ChatBox = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
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
  );
};

export default ChatBox;
