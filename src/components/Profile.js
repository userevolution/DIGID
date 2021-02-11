import React, { useState } from 'react';

function Profile({ updateProfile, idxId, name, description }) {
  const [newName, setNewName] = useState('');

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      <div className="row">
        <div className="col-12 col-md-5">
          <div className="card mt-3">
            <div className="card-body">
              <h1>Your Profile</h1>
              <p>{idxId}</p>
              <p>{name}</p>
              <p>{description}</p>

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

              <button  className="btn bg-secondary-color btn-block" onClick={() => updateProfile(newName)}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Profile;
