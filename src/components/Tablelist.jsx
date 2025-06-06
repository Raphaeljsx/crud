export default function Tablelist({ handleOpen, searchTerm, clients, error, setClients }) {

  const filteredSearch = searchTerm ? clients.filter(client => {
     return client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.job.toLowerCase().includes(searchTerm.toLowerCase());
  }) : clients;

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete client');
      }
      setClients((prevData) => prevData.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client. Please try again.');
    }
  }

  return (
    <>
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      <div className="overflow-x-auto px-5 mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredSearch.map((client) => {
              return (
                <tr className="hover:bg-base-300" key={client.id}>
                  <th>{client.id}</th>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.job}</td>
                  <td>{client.rate}</td>
                  <td>
                    <button
                      className={
                        client.isactive
                          ? "btn btn-primary"
                          : "btn btn-outline btn-primary"
                      }
                    >
                      {client.isactive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        handleOpen("edit", client);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
