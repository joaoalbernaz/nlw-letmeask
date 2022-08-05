import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import './styles.scss';

import Button from '../../components/Button';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import toast from 'react-hot-toast';

export function Home() {

  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  
  async function handleCreateRoom(): Promise<void> {
    if (!user) {
      await signInWithGoogle();
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    
    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await get(ref(database, `rooms/${roomCode}`));
    
    if (!roomRef.exists()) {
      toast.error('Room does not exists');
    }

    if (roomRef.val().endedAt) {
      toast.error('Room already closed',{ duration: 2000 });
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            ou entre em uma sala
          </div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            >
            </input>
            <Button onClick={handleJoinRoom} type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}