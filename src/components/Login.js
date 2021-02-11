import React from 'react';
import { useHistory } from 'react-router-dom'

function Login({ authenticate }) {
  const history = useHistory();

  async function handleLogin(){
    await authenticate();
    history.push('/profile');
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="card w-100" style={{ maxWidth: '400px'}}>
          <div className="card-body mx-auto">
            <img className="d-block mb-5 logo" style={{ width: '200px'}} src="images/iconlogo.png" alt="Demo" />

            <button className="btn bg-secondary-color btn-block" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
    </div>
  );
}

export default Login;
