import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateFile({ createTranscript }) {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  async function addFile(){
    try{
      setLoading(true);
      await createTranscript(title, description, date);
      history.push('/profile');
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
        <div className="col-12 col-md-4 mx-auto">
          <div className="card mt-3">
            <div className="card-body">
              <h1>Add File</h1>

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
                <label>Description</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>

              {loading
              ? (
                <div className="spinner-grow text-primary d-block mx-auto " role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) 
              : (
                <button className="btn bg-secondary-color btn-block" onClick={addFile}>
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
