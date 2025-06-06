import { useEffect, useState } from "react";

export default function ModalForm({ showModal, onClose, Mode, OnSubmit, clientData }) {

  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
     const clientData = {
      name,
      email,
      job,
      rate: Number(rate),
      isactive: status
     }
     await OnSubmit(clientData);
     onClose();
    } catch (error) {
      console.log("Error adding client", error);
    }
  }

  useEffect(() => {
    if(Mode === 'edit'){
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isActive);
    }else{
      setName('');
      setEmail('');
      setJob('');
      setRate('');
      setStatus(false);
    }
    
  }, [Mode, clientData])

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={showModal}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
          
          <h3 className="font-bold text-lg py-4">
            {Mode === "add" ? "Client Details" : "Edit Client"}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className="input w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Username"
                  pattern="[A-Za-z][A-Za-z0-9\\-]*"
                  title="Only letters, numbers or dash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="input w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" placeholder="mail@site.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>

              <input type="text" placeholder="Job" className="input w-full" value={job} onChange={(e) => setJob(e.target.value)} />

              <div className="flex mb-10 justify-between gap-x-4">
                <input
                  type="number"
                  maxLength="5"
                  minLength="1"
                  placeholder="Rate"
                  className="input w-full"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />

                <select value={status ? "Active" : "Inactive"} defaultValue="Status" className="select w-full" onChange={handleStatusChange}>
                  <option disabled={true}>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              {Mode === "add" ? "Add Client" : "Save Changes"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
