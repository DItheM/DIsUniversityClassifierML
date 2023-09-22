import { useState} from 'react'
import './App.css'
import { ClassifyUniversity } from './components/ClassifyUniversity';
import { PredictDemand } from './components/PredictDemand';

function App() {

  const [selectedPage, setSelectedPage] = useState("cu")
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
                  <a className={selectedPage == "cu" ? 'nav-link active' : 'nav-link'} aria-current="page" href="#classify_university" id='cu' onClick={event => handleClick(event)}>Classify University</a>
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
          {selectedPage == "cu" && (
            <ClassifyUniversity/>
          )}
          {selectedPage == "pd" && (
            <PredictDemand/>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
