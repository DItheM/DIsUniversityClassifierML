import { useState} from 'react'
import './App.css'
import { ClassifyUniversity } from './components/ClassifyUniversity';
import { PredictDemand } from './components/PredictDemand';
import Home from './components/Home';

function App() {

  const [selectedPage, setSelectedPage] = useState("h")
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setSelectedPage((e.target as HTMLElement).id);
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">EdVentures.</a>
          <div className='d-flex'>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <a className={selectedPage == "h" ? 'nav-link active' : 'nav-link'} aria-current="page" href="#home" id='h' onClick={event => handleClick(event)}>Home</a>
                </li>
                <li className="nav-item">
                  <a className={selectedPage == "cu" ? 'nav-link active' : 'nav-link'} aria-current="page" href="#classify_university" id='cu' onClick={event => handleClick(event)}>Find University</a>
                </li>
                <li className="nav-item">
                  <a className={selectedPage == "pd" ? 'nav-link active' : 'nav-link'} href="#predict_demand" id='pd' onClick={event => handleClick(event)}>Predict Demand</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="background">
        <div className='container'>
          {selectedPage == "h" && (
            <Home setPage={setSelectedPage}/>
          )}
          {selectedPage == "cu" && (
            <ClassifyUniversity/>
          )}
          {selectedPage == "pd" && (
            <PredictDemand/>
          )}
        </div>
      </div>

      <footer className="bg-dark text-light" style={{ padding: "20px" }}>
        <div className="container">
          <div className="row">
              <div className="col-md-4">
                <h1><b>EdVentures.</b></h1>
              </div>
              <div className="col-md-4">
                <h5>Quick Links</h5>
                <p><a href="#" onClick={() => setSelectedPage("h")}>Home</a></p>
                <p><a href="#" onClick={() => setSelectedPage("cu")}>Find University</a></p>
                <p><a href="#" onClick={() => setSelectedPage("pd")}>Predict Demand</a></p>
              </div>
              <div className="col-md-4">
                <h5>Connect with Us</h5>
                <p><a href="https://www.facebook.com/" target='_blank'>Facebook</a></p>
                <p><a href="https://twitter.com/?lang=en" target='_blank'>Twitter (X)</a></p>
                <p><a href="https://lk.linkedin.com/" target='_blank'>LinkedIn</a></p>
              </div>
          </div>
        </div>
    </footer>

    </div>
  )
}

export default App
