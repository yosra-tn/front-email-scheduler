import React, { useEffect, useState } from 'react';
import Echeance from './Echeance';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../tablePage.css';
import SearchBar from './SearchBar';


function ListeEcheances() {
    const [error, setError] = useState('');
    const [echeances, setEcheances] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 
    useEffect(() => {
        const user_email = localStorage.getItem('user_email');
        // if (!user_email) {
        //     setError("Utilisateur non trouvé. Veuillez enregistrer votre profil d'abord.");
        //     return;
        // }

        const fetchEcheances = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8003/echeances/', {
                    params: { email:user_email }
                });
                setEcheances(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des échéances:', error);
                setError("Erreur lors de la récupération des échéances.");
            }
        };

        fetchEcheances();
    }, []);
        // Filtered list of échéances based on search term
        const filteredEcheances = searchTerm
        ? echeances.filter(echeance =>
            echeance.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : echeances;

    const handleAddEcheance = async (newEcheance) => {
        const user_email = localStorage.getItem('user_email');
        try {
            const response = await axios.post('http://127.0.0.1:8003/echeances/', [newEcheance],{
                params:  {user_email }
            });
            if (response.status === 200) {
                setEcheances([...echeances, response.data[0]]);
                setIsAdding(false);
            } else {
                console.log("Erreur lors de l'enregistrement de l'échéance");
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'échéance:", error);
            setError("Une erreur s'est produite lors de l'enregistrement de l'échéance");
        }
    };

    const handleUpdateEcheance = async (updatedData) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8003/echeances/${updatedData.id}`, updatedData);
            if (response.status === 200) {
                setEcheances(echeances.map(e => (e.id === updatedData.id ? updatedData : e)));
                console.log('Échéance mise à jour');
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'échéance:", error);
            setError("Une erreur s'est produite lors de la mise à jour de l'échéance");
        }
    };

    const handleDeleteEcheance = async (echeance) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8003/echeances/${echeance.id}`);
            if (response.status === 200) {
                setEcheances(echeances.filter(e => e.id !== echeance.id));
                console.log('Échéance supprimée');
            }
        }catch (error) {
            console.error("Erreur lors de la suppression de l'échéance:", error);
            setError("Une erreur s'est produite lors de la suppression de l'échéance");
        }
    }
    return (
        <div className='content'>
             <div className="table-container">
             <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date d'échéance</th>
                        <th>Date de rappel</th>
                        <th>Type d'occurence</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEcheances.map((echeance) => (
                        <Echeance
                            key={echeance.id}
                            echeance={echeance}
                            handleAddEcheance={handleAddEcheance}
                            handleUpdateEcheance={handleUpdateEcheance}
                            handleDeleteEcheance={handleDeleteEcheance}
                            setError={setError}
                        />
                    ))}
                    {isAdding && (
                        <Echeance
                            handleAddEcheance={handleAddEcheance}
                            setError={setError}
                        />
                    )}
                </tbody>
            </Table>
            {isAdding ? (
                <Button className="add-button" type='submit'  onClick={() => setIsAdding(false)} >Annuler</Button>
                
            ) : (
                <Button className="add-button" type='submit'  onClick={() => setIsAdding(true)}>Ajouter une échéance</Button>
               
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
         </div>
       
    );
}

export default ListeEcheances;
