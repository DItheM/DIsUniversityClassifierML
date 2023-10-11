import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { DropdownInput } from './DropdownInput'
import { Card } from './Card'
import uniImage from '../assets/p1.png';

export const ClassifyUniversity = () => {

  const [jsonData, setJsonData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [foundUniMsg, setFoundUniMsg] = useState("");

  const [showAnimationDesc, setShowAnimationDesc] = useState(false);
  const [showAnimationResults, setShowAnimationResults] = useState(false);
  const [showAnimationOutResults, setShowAnimationOutResults] = useState(false);
  const [showAnimationUnis, setShowAnimationUnis] = useState(false);
  const [showAnimationOutUnis, setShowAnimationOutUnis] = useState(false);

  useEffect(() => {
    if (jsonData) {
      setSelectedInstitution(jsonData.institution[0])
      if (jsonData.institution.length > 1) {
        setFoundUniMsg(jsonData.institution.length + " Universities");
      } else if (jsonData.institution.length == 1) {
        setFoundUniMsg("a " + jsonData.institution.length + " University");
      } else {
        setFoundUniMsg(" 0 Universities");
      }
      setLoading(false);  
      setShowAnimationResults(true);
      setShowAnimationUnis(true);
    }
  }, [jsonData]);

  useEffect(() => {
    setShowAnimationDesc(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fetchData = () => {
      fetch('http://localhost:5000/classify_university', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      setJsonData(data)
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setLoading(false);
      setIsPressed(false);
    });
    }

    if (isPressed == false) {
      setLoading(true); 
      setIsPressed(true);
      fetchData();
    } else {
      setShowAnimationOutResults(true);
      timeOut(() => {setLoading(true); setIsPressed(true); fetchData(); setShowAnimationUnis(false); setShowAnimationResults(false); setShowAnimationOutResults(false);}, 1000);
    }
  };
  
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Create a copy of the formData object
    const newFormData = formData;
  
    // Update the copy with the new select field value
    newFormData.set(event.target.name, event.target.value);
  
    // Update the state with the modified copy
    setFormData(newFormData);
  };

  const setColor = (item: string) => {
    const defaultClassName = "d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2 hover_element";
    if (selectedInstitution == item) {
      return defaultClassName + " border-info text-info"
    } else {
      return defaultClassName + " border-primary text-primary"
    }
  }

  const timeOut = (myFunction: () => void, time: number) => {
    const timeoutId = setTimeout(myFunction, time);
    return () => clearTimeout(timeoutId);
  }

  const handleUniClick = (item: string) => {
    if (selectedInstitution != item) {
      setShowAnimationOutUnis(true);
      timeOut(() => {setSelectedInstitution(item); setShowAnimationOutUnis(false); setShowAnimationUnis(true);}, 1000);
    }
  }
  

  const country_data = {"USA": 0, "United Kingdom": 1, "Japan": 2, "Switzerland": 3, "Israel": 4, "South Korea": 5, "Canada": 6, "France": 7, "China": 8, "Taiwan": 9, "Russia": 10, "Singapore": 11, "Sweden": 12, "Denmark": 13, "Germany": 14, "Belgium": 15, "Netherlands": 16, "Australia": 17, "Norway": 18, "Finland": 19, "Italy": 20, "Spain": 21, "Brazil": 22, "South Africa": 23, "Hong Kong": 24, "Ireland": 25, "Austria": 26, "Portugal": 27, "New Zealand": 28, "Czech Republic": 29, "Greece": 30, "Thailand": 31, "Mexico": 32, "India": 33, "Argentina": 34, "Chile": 35, "Poland": 36, "Hungary": 37, "Iceland": 38, "Turkey": 39, "Malaysia": 40, "Slovenia": 41, "Estonia": 42, "Croatia": 43, "Saudi Arabia": 44, "Colombia": 45, "Lebanon": 46, "Slovak Republic": 47, "Iran": 48, "Serbia": 49, "Lithuania": 50, "Egypt": 51, "Bulgaria": 52, "Uruguay": 53, "Uganda": 54, "Cyprus": 55, "United Arab Emirates": 56, "Puerto Rico": 57, "Romania": 58}
  const quality_data = ["Exellent", "Good", "Above Average", "Average"]
  const budget_data = [45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000]

  return (
    <div className={showAnimationDesc ? 'fade-in' : 'hide'}>
      <div className="container-bg-1 rounded hover_element">
        <div className="row">
            <div className="col-md-6">
              <h1 className='header-text'>Find The Best Suited University</h1>
              <p className='sub-text'>You can seamlessly explore globally available universities tailored to your preferences. Discover the best-recommended programs within these institutions, while also benefiting from summarized user reviews that provide valuable insights into the university experience.</p>
            </div>
            <div className="col-md-6">
                <img src={uniImage} alt="Image" className="img-fluid float-end" width='50%'/>
            </div>
        </div>
      </div>
        
      <div className="form-container">
        <form className="input-group mb-3 " onSubmit={handleSubmit}>
            <DropdownInput defaultMsg='Select Country' options={Object.keys(country_data)} name='country' handleChange={handleSelectChange}/>
            <DropdownInput defaultMsg='Select Quality' options={quality_data} name='quality' handleChange={handleSelectChange}/>
            <span className="input-group-text mb-3">$</span>
            <DropdownInput defaultMsg='Select Budget' options={budget_data} name='budget' handleChange={handleSelectChange}/>
            <button className="btn btn-outline-dark mb-3" type="submit">Find University</button>
        </form>
      </div>

      {(!loading && isPressed) && (
        <div className={showAnimationResults ? 'fade-in' : 'hide'}>
          <div className={showAnimationOutResults ? 'fade-out' : ''}>
            <div id='r_sec'>
              <div className="container-bg-2 rounded hover_element">
                <h5 className='sub-header-text'>We Found You {foundUniMsg}.</h5>
                <div className="container">
                  {jsonData.institution.map((item: string) => 
                    <a href="#r_sec" onClick={() => handleUniClick(item)} key={item}>
                      <h5 className={setColor(item)} style={{marginRight: "20px"}}>{item}</h5>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className={showAnimationUnis ? 'fade-in' : 'hide'}>
              <div className={showAnimationOutUnis ? 'fade-out' : ''}>
                <div className="container-bg-2 rounded hover_element">
                  <h4 className='sub-header-text' style={{paddingBottom: "20px"}}>Recommended Programs For <b><i>{selectedInstitution}</i></b></h4>
                  <div className="row">
                    <div className="col-sm-4 mb-3">
                      <Card className='card text-bg-primary hover_element' courseName={jsonData.data[selectedInstitution].courses[0]} description={jsonData.data[selectedInstitution].descriptions[0]} header='Foundation Courses' institution={selectedInstitution}/>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <Card className='card text-bg-secondary hover_element' courseName={jsonData.data[selectedInstitution].courses[1]} description={jsonData.data[selectedInstitution].descriptions[1]} header='Programming Courses' institution={selectedInstitution}/>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <Card className='card text-bg-success hover_element' courseName={jsonData.data[selectedInstitution].courses[2]} description={jsonData.data[selectedInstitution].descriptions[2]} header='Advanced Topics' institution={selectedInstitution}/>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <Card className='card text-bg-danger hover_element' courseName={jsonData.data[selectedInstitution].courses[3]} description={jsonData.data[selectedInstitution].descriptions[3]} header='Mathematics And Theory' institution={selectedInstitution}/>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <Card className='card text-bg-dark hover_element' courseName={jsonData.data[selectedInstitution].courses[4]} description={jsonData.data[selectedInstitution].descriptions[4]} header='Software Engineering And Project Management' institution={selectedInstitution}/>
                    </div>
                  </div>
                </div>

                <div className="container-bg-2 rounded hover_element">
                  <h3 className='sub-header-text'>Summarized Feedback</h3>
                  <h5 className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2 text-info border-primary">{jsonData.data[selectedInstitution].feedback}</h5>
                  <p className='sub-text-2'>(Based on user reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(loading) && (
        <div className='d-flex justify-content-center align-items-center vh-50'>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}
