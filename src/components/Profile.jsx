import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';
import '../formPage.css';

function Profile() {
  const [email, setEmail] = useState(''); // État pour l'email
  const [error, setError] = useState(''); // État pour les erreurs
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  useEffect(() => {
    // Récupérer l'email stocké dans le stockage local
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Récupérer l'email depuis l'API si non trouvé dans le stockage local
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8003/users/');
          setEmail(response.data.email || '');
          // Stocker l'email dans le stockage local pour le prochain chargement
          localStorage.setItem('user_email', response.data.email || '');
        } catch (error) {
          console.error('Erreur lors de la récupération de user:', error);
          setError("Erreur lors de la récupération de l'utilisateur.");
        }
      };
      fetchUser();
    }
  }, []); // Dépendances vides pour appeler une seule fois au chargement du composant

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setError('Veuillez saisir un email.');
        return;
      }
      const response = await axios.post('http://127.0.0.1:8003/users/', { email });
      if (response.status === 200) {
        localStorage.setItem('user_email', email); // Stocker l'email dans le stockage local

        navigate('/listeEcheances'); // Rediriger vers la page des échéances
      } else {
        console.log('Erreur lors de la sauvegarde de l\'email');
        setError('Erreur lors de la sauvegarde de l\'email.'); // Afficher l'erreur
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setError('Erreur lors de la soumission du formulaire.'); // Afficher l'erreur
    }
  };


  return (
    <div className='content'>
          <div className="form-container">
          <Form onSubmit={handleSubmit} className="profile-form">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label id="email">Email address</Form.Label>
        <Form.Control           type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
      </Form.Group>
      <br />
        
        <Button id='button' type='submit' variant="primary" size="lg" >
        Submit
      </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichage des erreurs */}
      </Form >

    </div>
    </div>

  );
}

export default Profile;
