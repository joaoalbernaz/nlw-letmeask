import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useNavigate, useParams } from 'react-router-dom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { ref, remove, update } from 'firebase/database';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date()
    })

    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que voce deseja excluir essa pergunta?')) {
      await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isAnswered: true
    });
}

  async function handleHighlightQuestion(questionId: string) {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isHighlighted: true
    });
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId || ''}/>
            <Button onClick={handleEndRoom} isOutlined disabled={!user} type="submit">Encerrar a sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && 
            <span>{questions.length} pergunta(s)</span> 
          }
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return ( 
            <Question 
              content={question.content}
              author={question.author}
              key={question.id}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              { !question.isAnswered  &&
                <>
                  <button onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                    <img src={checkImg} alt="Marcar Pergunta como respondida" />
                  </button>
                  <button onClick={() => handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt="Dar destaque a pergunta" />
                  </button>
                </>
             }
              <button onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover Pergunta" />
              </button>
            </Question>
            );
          })}
        </div>
      </main>
    </div>
  )
}