import React from 'react'
import '../accueil.css'
import { useNavigate } from 'react-router-dom';

function Accueil() {
  const navigate = useNavigate();
  return (
    <div className='accueil'>
      <h4>
      Ne laissez plus jamais une échéance vous échapper. 
      Définissez vos dates, recevez des rappels personnalisés, 
      et restez toujours en avance avec nos alertes par e-mail
      </h4>
      <button id='btn'  onClick={()=>{
        navigate('/profile');
      }}>Commencer</button>
    </div>
  )
}

export default Accueil
