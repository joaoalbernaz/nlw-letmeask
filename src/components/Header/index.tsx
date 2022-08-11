import { RoomCode } from "../RoomCode";
import Button from "../Button";
import { ref, update } from "firebase/database";
import { database } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import './styles.scss';
import { useTheme } from "../../hooks/useTheme";
import Toggle from "react-toggle";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "react-toggle/style.css";
import { Logo } from "../Logo/Logo";

type HeaderProps = {
  canEndRoom?: boolean;
  roomId: string | undefined;
}

export function Header({ canEndRoom = false, roomId }: HeaderProps) {

  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date()
    })

    navigate('/');
  }

  return (
    <header className={theme}>
        <div className="content">
          <Logo theme={theme}/>
          <Toggle
            className="theme-toggle"
            defaultChecked={theme === 'light'}
            onChange={changeTheme}
            icons={{
              checked: <MdLightMode/>,
              unchecked: <MdDarkMode/>
            }}
          />
          { canEndRoom ? (
            <div>
              <RoomCode code={roomId || ''}/>
              <Button onClick={handleEndRoom} isOutlined disabled={!canEndRoom} type="submit">Encerrar a sala</Button>
            </div>
          ) : (
            <RoomCode code={roomId || ''}/>
          )}
        </div>
      </header>
  )
}