import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

function Button({ isOutlined = false, ...props}: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button className={`button ${isOutlined ? 'outlined' : ''} ${theme}`} {...props}/>
  )
}

export default Button;