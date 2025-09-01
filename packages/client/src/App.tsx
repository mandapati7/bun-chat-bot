import { useEffect } from 'react';
import './App.css';
import ChatBox from './components/chatBox';

function App() {
  useEffect(() => {
    fetch('/api/hello').then((res) => res.json());
  }, []);

  return (
    <div className="p-4">
      <ChatBox />
    </div>
  );
}

export default App;
