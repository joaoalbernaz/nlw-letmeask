import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import '../Home/styles.scss';

import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';
import { push, ref } from 'firebase/database';

export function NewRoom() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState('');

  function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const firebaseRoom = push(ref(database, 'rooms'), {
      title: newRoom,
      authorId: user?.id
    });

    navigate(`admin/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            >
            </input>
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em um sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}