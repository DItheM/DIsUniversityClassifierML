import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { DropdownInput } from './DropdownInput'
import LineChartComponent from './LineChartComponent';
import demImage from '../assets/demand_pic.png';

export const PredictDemand = () => {

  const [jsonData, setJsonData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");

  const [showAnimationDesc, setShowAnimationDesc] = useState(false);
  const [showAnimationResults, setShowAnimationResults] = useState(false);
  const [showAnimationOutResults, setShowAnimationOutResults] = useState(false);

  useEffect(() => {
    setShowAnimationDesc(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fetchData = () => {
      fetch('http://localhost:5000/predict_demand', {
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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
        setIsPressed(false);
      });
    }

    if (isPressed == false) {
      setIsLoaded(false);
      setLoading(true);
      setIsPressed(true);
      fetchData();
    } else {
      setShowAnimationOutResults(true);
      timeOut(() => {setIsLoaded(false); setLoading(true); setIsPressed(true); fetchData(); setShowAnimationResults(false); setShowAnimationOutResults(false);}, 1000);
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

  const timeOut = (myFunction: () => void, time: number) => {
    const timeoutId = setTimeout(myFunction, time);
    return () => clearTimeout(timeoutId);
  }


    const job_roles = ["Software Developer/Engineer",
    "System Administrator", 
    "Network Engineer/Architect", 
    "Database Administrator (DBA)", 
    "Cybersecurity Analyst/Engineer", 
    "Data Analyst/Scientist", 
    "Cloud Architect/Engineer", 
    "IT Project Manager",
    "Quality Assurance (QA) Engineer/Tester",
    "Business Analyst", 
    "UI/UX Designer", 
    "Data Engineer", 
    "AI/Machine Learning Engineer"]

    useEffect(() => {
      if (jsonData) {
        const labels = jsonData.years;
        const demandData = jsonData.demand;
    
        // Define the index where the color changes (2023 is index 23)
        const colorChangeIndex = 23;
    
        // Create an array of colors
        const colors = labels.map((_: string, index: number) => {
          // Use a different color for data from 2023 onwards
          return index >= colorChangeIndex ? 'rgba(255, 0, 0, 1)' : 'rgba(75, 192, 192, 1)';
        });
    
        // Create datasets with data and colors
        const datasets = [
          {
            label: 'Demand',
            data: demandData,
            borderColor: colors
          },
        ];
        const selected_role = formData.get("job_title");
        setSelectedRole(typeof selected_role === 'string' ? selected_role : "");
        setLabels(labels);
        setDatasets(datasets);
        setIsLoaded(true);
        setShowAnimationResults(true);
      }
    }, [jsonData])

    const setColor = () => {
      const defaultClassName = "card-text d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2 text-light hover_element";
      if (jsonData.change >= 0) {
        return defaultClassName + " bg-success"
      } else {
        return defaultClassName + " bg-danger"
      }
  
    }


  return (
    <div className={showAnimationDesc ? 'fade-in' : 'hide'}>
      <div className="container-bg-1 rounded hover_element">
        <div className="row">
            <div className="col-md-6">
              <h1 className='header-text'>Job Role Demand Prediction</h1>
              <p className='sub-text'>Unlock your career potential. Get insights into job demand: Check past trends, predict the future, and prepare for what lies ahead in your chosen field.</p>
            </div>
            <div className="col-md-6">
                <img src={demImage} alt="Image" className="img-fluid float-end" width='50%'/>
            </div>
        </div>
      </div>

      <div className="form-container">
        <form className="input-group mb-3" onSubmit={handleSubmit}>
            <DropdownInput defaultMsg='Select Job Role' options={job_roles} name='job_title' handleChange={handleSelectChange}/>
            <button className="btn btn-outline-dark mb-3" type="submit">Predict Demand</button>
        </form>
      </div>

        {(!loading && isPressed) && (
            <div className={showAnimationResults ? 'fade-in' : 'hide'}>
              <div className={showAnimationOutResults ? 'fade-out' : ''}>
                <div className="card text-center" style={{marginTop: "10px", marginBottom: "20px"}}>
                    <h5 className="card-title card-header">Demand Chart For <b><i>{selectedRole}</i></b></h5>
                    <div className="card-body">  
                    {(isLoaded) && (
                      <LineChartComponent labels={labels} datasets={datasets} />
                    )}
                    </div>
                </div>
                

                <div className="card text-center hover_element" style={{marginTop: "10px", marginBottom: "20px"}}>
                    <h5 className="card-title card-header">Demand Prediction For Next Five Years | 2023 - 2027</h5>
                    <div className="card-body">  
                        <p className="card-text text-primary hover_element">Last Five year demand (2017 - 2022): <b>{jsonData.last_avg_demand}%</b></p>
                        <p className="card-text text-primary hover_element">Next Five year demand (2023 - 2027): <b>{jsonData.next_avg_demand}%</b></p>
                        <h3 className={setColor()}>{jsonData.direction} {jsonData.change}%</h3>
                    </div>
                </div>
              </div>
            </div>
            
        )}

        {(loading) && (
            <div className='d-flex justify-content-center align-items-center'>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        )}
    </div>
  )
}
