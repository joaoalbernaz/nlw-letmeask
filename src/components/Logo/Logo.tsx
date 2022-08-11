import lightLogoImg from '../../assets/images/logo.svg';
import darkLogoImg from '../../assets/images/dark-logo.svg';
import './styles.scss'
import { useNavigate } from 'react-router-dom';

type LogoProps = {
  theme?: string
};

export function Logo(props: LogoProps) {

  const navigate = useNavigate();

  return (
    <>
      { props.theme === 'light' ? 
        <img className="logo-img" src={lightLogoImg} onClick={() => navigate('/')} alt="letmeask"/> :
        <img className="logo-img" src={darkLogoImg} onClick={() => navigate('/')} alt="letmeask"/>
      }
    </>
  );
}