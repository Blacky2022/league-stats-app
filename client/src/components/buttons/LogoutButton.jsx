import { useNavigate } from 'react-router-dom';
import './button.css' 
import { config } from '../../config'
export function LogoutButton() {
  const navigate = useNavigate();
  const baseUrl = config.BASE_URL
	
  const handleClick = async () => {
    try {
      await fetch(`${baseUrl}/user/logout`, {
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				}});
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas wylogowywania', error);
    }
  };

  return (
    <button className ='logout-button'  onClick={handleClick}>
      Logout
    </button>
  );
}


