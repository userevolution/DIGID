import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ updateProfile, getSomeoneNotes, idxId, name, notes, someoneNotes }) {
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState('');

  async function updateName(){
    try{
      setLoading(true);
      await updateProfile(newName);
      setNewName('');
      setLoading(false);
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  async function fetchNotes(){
    try{
      console.log('d')
      setLoading(true);
      await getSomeoneNotes(recipient);
      setRecipient('');
      setLoading(false);
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="card mt-3">
            <div className="card-body">
              <h1>Your Profile</h1>
              <p>{idxId}</p>
              <p>{name}</p>

              <div className="form-group">
                <label>New Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)} 
                />
              </div>

              {loading
              ? (
                <div className="spinner-grow text-primary d-block mx-auto " role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) 
              : (
                <button className="btn bg-secondary-color btn-block" onClick={updateName}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="card mt-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Your Files</h2>
                <Link className="btn bg-secondary-color" to="create-file">
                  Add File
                </Link>
              </div>
              
              <div className="row">
                { notes.map((note, index) => {
                  return(
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <div className="card mt-3">
                        <div className="card-body">
                          <img className="card-img-top relative" src={`https://ipfs.infura.io/ipfs/${note.description}`} alt="File" />
                          <img
                            className="copy-icon"
                            onClick={() => {navigator.clipboard.writeText(`https://ipfs.infura.io/ipfs/${note.description}`)}}
                            src="/images/copyicon.svg"
                            alt="Copy Icon" />
                          <p>{note.name}</p>
                          <p>{note.issuanceDate}</p>
                        </div>
                      </div>  
                    </div>
                  )
                }) }
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h2>Search</h2>

              <div className="form-group">
                <label>Enter the DID or wallet address of the user</label>
                <div className="d-flex">
                  <input
                    className="form-control"
                    type="text"
                    name="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)} 
                  />
                  {loading
                  ? (
                    <div className="spinner-grow text-primary d-block mx-auto " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) 
                  : (
                    <button className="btn bg-secondary-color" onClick={fetchNotes}>
                      Find
                    </button>
                  )}
                </div>
              </div>
              
              <div className="row">
                { someoneNotes.map((note, index) => {
                  return(
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <div className="card mt-3">
                        <div className="card-body">
                          <img className="card-img-top relative" src={`https://ipfs.infura.io/ipfs/${note.description}`} alt="File" />
                          <img
                            className="copy-icon"
                            onClick={() => {navigator.clipboard.writeText(`https://ipfs.infura.io/ipfs/${note.description}`)}}
                            src="/images/copyicon.svg"
                            alt="Copy Icon" />
                          <p>{note.name}</p>
                          <p>{note.issuanceDate}</p>
                        </div>
                      </div>  
                    </div>
                  )
                }) }
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default Profile;
