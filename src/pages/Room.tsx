import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';

import '../styles/room.scss';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { onValue, push, ref } from 'firebase/database';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  content: string,
  author: {
    name: string;
    avatar: string;
  },
  isAnswered: boolean;
  isHighlighted: boolean;
}>;

type Question = {
  id: string;
  content: string,
  author: {
    name: string;
    avatar: string;
  },
  isAnswered: boolean;
  isHighlighted: boolean;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`)
    onValue(roomRef, (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);
  
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      toast.error('You must enter a question');
      return;
    }

    if (!user) {
      toast.error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await push(ref(database, `rooms/${roomId}/questions`), question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId || ''}/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && 
            <span>{questions.length} pergunta(s)</span> 
          }
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que voce quer perguntar?" 
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-fotter">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faca seu login.</button></span>
            ) }
            <Button disabled={!user} type="submit">Enviar pergunta</Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  )
}