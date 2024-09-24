import React from 'react';
import myphoto1 from './myimg1.jpg'

function About() {
  return (
    <div className="container-fluid row hero-area mb-4">
                  <div className="col-md-6">
                    <img src={myphoto1} alt="" className="img-fluid" />
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <div className='myedit'>
                    <h1>About CIBC</h1>
                    <p>Welcome to cibc Bank. We are committed to providing excellent banking services to help you achieve your financial goals.</p>
                    <p>Our team is dedicated to offering a wide range of financial products and services tailored to meet the diverse needs of our clients.</p>
    
                      <button className='btn2'>Learn more about cibc</button>
                    </div>
                  </div>
      
    </div>
  );
}

export default About;
