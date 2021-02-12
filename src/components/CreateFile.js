import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function CreateFile({ createTranscript }) {
  const history = useHistory();
  
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('None');
  const [buffer, setBuffer] = useState('');

  async function addFile(){
    try{
      setLoading(true);

      ipfs.add(buffer, async (error, result) => {
        if(error) {
          console.error(error);
        }
        await createTranscript(recipient, title, result[0].hash, date);
        history.push('/profile');
        setLoading(false);
      });
    }
    catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  const getFile = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFilename(file.name);
      setBuffer(Buffer(reader.result));
    }
  }

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      <div className="row">
        <div className="col-12 col-md-4 mx-auto">
          <div className="card mt-3">
            <div className="card-body">
              <h1>Add File</h1>

              <div className="form-group">
                <label>Recipient to share the file with</label>
                <input
                  className="form-control"
                  type="text"
                  name="recipient"
                  value={recipient}
                  placeholder="Recipient DID or Wallet Address"
                  onChange={(e) => setRecipient(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>File</label>
                <p>{filename}</p>
                <input className="text-white text-monospace" type="file" onChange={getFile} />
              </div>

              {loading
              ? (
                <div className="spinner-grow text-primary d-block mx-auto " role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) 
              : (
                <button className="btn bg-secondary-color btn-block" onClick={(e) => addFile(e)}>
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default CreateFile;
