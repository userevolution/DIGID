import React from 'react';

function Login({authenticate, idxId, name, description}) {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="card w-100" style={{ maxWidth: '400px'}}>
          <div className="card-body mx-auto">
            <img className="d-block mb-5 logo" style={{ width: '200px'}} src="images/iconlogo.png" alt="Demo" />
            <button className="btn bg-secondary-color btn-block" onClick={authenticate}>
              Login
            </button>
          </div>
        </div>
        
        <p>{idxId}</p>
        <p>{name}</p>
        <p>{description}</p>

        {/* <button onClick={updateProfile}>Update</button> */}
    </div>
  );
}

export default Login;
