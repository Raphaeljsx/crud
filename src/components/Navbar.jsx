function Navbar({onOpen, onSearch}) {

  const handleSearch = (event) => {
    onSearch(event.target.value);
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm p-4">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Polls</a>
        </div>
        <div className="navbar-center ">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearch}
              className="input input-bordered max-w-48 md:w-auto"  
            />
          </div>
        </div>
        <div className="navbar-end">
          <a className="btn btn-primary" onClick={onOpen}>Add Client</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
