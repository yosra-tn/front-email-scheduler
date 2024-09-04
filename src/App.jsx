

import { Routes, Route } from 'react-router-dom'
import Profile from './components/Profile'
import ListeEcheances from './components/ListeEcheances'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Accueil from './components/Accueil';


function App() {

  return (
    <div>
            <Navbar className='navbar' bg="light" data-bs-theme="light">
        <Container className='container'>
          
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/listeEcheances">ListeEcheances</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <div >
        <div >

            <Routes>
              <Route path="/" element={<Accueil/>}></Route>
              <Route path="/profile" element={<Profile/>}> </Route>
              <Route path="/listeEcheances" element={<ListeEcheances/>}></Route>

            </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
