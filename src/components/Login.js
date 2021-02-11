import React from 'react';

function Login({authenticate, idxId, name, description}) {
  return (
    <div className="container">
        <button onClick={authenticate}>Login</button>
        <p>{idxId}</p>
        <p>{name}</p>
        <p>{description}</p>

        {/* <button onClick={updateProfile}>Update</button> */}
    </div>
  );
}

export default Login;
