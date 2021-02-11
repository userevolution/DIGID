import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
	return(
		<div className="bg-primary-color">
			<div className="container min-height">
				<div className="row">
					 <div className="col-12 col-md-6">
						<img className="hero-img" src="images/phone1.png" alt="Demo" />
					 </div>

					 <div className="col-12 col-md-6">
						<h2 className="text-secondary-color text-center title mb-3">
							Share Files Privately
						</h2>
						<Link className="btn bg-secondary-color btn-lg d-block mx-auto w-75" to="login">
							Sign In
						</Link>
					 </div>

					 <div className="col-12 col-md-6">
						<img className="hero-img" src="images/phone2.png" alt="Demo" />
					 </div>

					 <div className="col-12 col-md-6">
						<p className="text-secondary-color mt-5 text-center h2 mt-10">
							Secure Identitiy
						</p>
						<p className="text-secondary-color text-center h2">
							Upload and Share Files
						</p>
						<p className="text-secondary-color text-center h2 mt-5">
							DIGID runs on Ceramic Network
						</p>
					 </div>
				</div>
			</div>
		</div>
	)
}

export default Home;