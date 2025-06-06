import Navbar from "./components/Navbar";
import Tablelist from "./components/Tablelist";
import ModalForm from "./components/ModalForm";
import { useEffect, useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);


  const handleOpen = (mode, client) => {
    setShowModal(true);
    setModalMode(mode);
    if(client){
      setClientData(client);
    }
  }

  const handleSubmit = async (newClientData) => {
    try {
      if (modalMode === 'add') {
        const response = await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newClientData)
        });
        if (!response.ok) throw new Error('Failed to create client');
      } else {
        const response = await fetch(`http://localhost:3000/api/clients/${clientData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newClientData)
        });
        if (!response.ok) throw new Error('Failed to update client');
      }

      fetchClients();
      setShowModal(false);
      setClientData({});
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving client. Please try again.');
    }
  }


  //continuar o filtro de busca
  return (
    <>
      <Navbar onOpen={() => {handleOpen('add')}} onSearch={setSearchTerm}/>
      <Tablelist handleOpen={handleOpen} searchTerm={searchTerm} clients={clients} error={error} setClients={setClients}/>
      <ModalForm 
      showModal={showModal} 
      OnSubmit={handleSubmit}
      onClose={() => {setShowModal(false)}} 
      Mode={modalMode}
      clientData={clientData}
      />
    </>
  )
}

export default App
