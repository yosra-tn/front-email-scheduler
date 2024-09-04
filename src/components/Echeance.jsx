import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function Echeance({ echeance, handleAddEcheance, setError, handleUpdateEcheance,handleDeleteEcheance }) {
    const [description, setDescription] = useState('');
    const [dateEcheance, setDateEcheance] = useState('');
    const [dateRappel, setDateRappel] = useState('');
    const [typeOccurence, setTypeOccurence] = useState('');

    useEffect(() => {
        if (echeance) {
            setDescription(echeance.description);
            setDateEcheance(echeance.dateEcheance.slice(0, 10));
            setDateRappel(echeance.dateRappel.slice(0, 10));
            setTypeOccurence(echeance.typeOccurence);
        }
    }, [echeance]);

    const addEcheance = async () => {
        if (!description || !dateEcheance || !dateRappel || !typeOccurence) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
        if (new Date(dateRappel) >= new Date(dateEcheance)) {
            setError('La date de rappel doit être inférieure à la date d\'échéance.');
            return;
        }
        const newEcheance = {
            description,
            dateEcheance: new Date(dateEcheance).toISOString(),
            dateRappel: new Date(dateRappel).toISOString(),
            typeOccurence
        };

        try {
            await handleAddEcheance(newEcheance);
        } catch (error) {
            setError("Une erreur s'est produite lors de l'ajout de l'échéance.");
        }
    };

    const updateEcheance = async () => {
        if (!description || !dateEcheance || !dateRappel || !typeOccurence) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
        if (new Date(dateRappel) >= new Date(dateEcheance)) {
            setError('La date de rappel doit être inférieure à la date d\'échéance.');
            return;
        }
        const updatedData = {
            ...echeance,
            description,
            dateEcheance: new Date(dateEcheance).toISOString(),
            dateRappel: new Date(dateRappel).toISOString(),
            typeOccurence
        };

        try {
            await handleUpdateEcheance(updatedData);
        } catch (error) {
            setError("Une erreur s'est produite lors de la mise à jour de l'échéance.");
        }
    };
    const deleteEcheance = async () => {
        try {
            await handleDeleteEcheance(echeance);
        } catch (error) {
            setError("Une erreur s'est produite lors de la suppression de l'échéance.");
        }
    }

    return (
        <tr>
            <td><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></td>
            <td><input type='date' value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} /></td>
            <td><input type='date' value={dateRappel} onChange={(e) => setDateRappel(e.target.value)} /></td>
            <td>
                <select value={typeOccurence} onChange={(e) => setTypeOccurence(e.target.value)}>
                    <option value="">--Choisir--</option>
                    <option value="mensuel">mensuel</option>
                    <option value="bimestriel">bimestriel</option>
                    <option value="trimestriel">trimestriel</option>
                    <option value="annuel">annuel</option>
                </select>
            </td>
            <td>
                {!echeance ? (
                    <button className='add-echeance-button' onClick={addEcheance}>+</button>
                ) : (
                    <div className="button-actions">
                                        <Button variant="warning" onClick={updateEcheance}>Modifier</Button>
                                        
                                        <Button variant="danger" onClick={deleteEcheance}>Supprimer</Button>
                                       
                    </div>

                )}
            </td>
        </tr>
    );
}

export default Echeance;
