import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ authenticate }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function handleLogin(){
    try{
      setLoading(true);
      await authenticate();
      history.push('/profile');
      setLoading(false);
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="card w-100" style={{ maxWidth: '400px'}}>
          <div className="card-body mx-auto">
            <img className="d-block mb-5 logo" style={{ width: '200px'}} src="images/iconlogo.png" alt="Demo" />

            {loading
              ? (
                <div className="spinner-grow text-primary d-block mx-auto " role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) 
              : (
                <button className="btn bg-secondary-color btn-block" onClick={handleLogin}>
                  Connect to your Wallet
                </button>
              )}
          </div>
        </div>
    </div>
  );
}

export default Login;
