import { ChangeEvent, FormEvent, useState } from 'react'
import { DropdownInput } from './DropdownInput'
import LineChartComponent from './LineChartComponent';

export const PredictDemand = () => {

    const [jsonData, setJsonData] = useState<any>({});
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsPressed(true);

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
  };
  
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Create a copy of the formData object
    const newFormData = formData;
  
    // Update the copy with the new select field value
    newFormData.set(event.target.name, event.target.value);
  
    // Update the state with the modified copy
    setFormData(newFormData);
  };

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

  return (
    <div>

        <h1>Predict Demand</h1>

        <form className="input-group mb-3" onSubmit={handleSubmit}>
            <DropdownInput defaultMsg='Select Job Role' options={job_roles} name='job_title' handleChange={handleSelectChange}/>
            <button className="btn btn-outline-secondary mb-3" type="submit">Predict Demand</button>
        </form>

        {(!loading && isPressed) && (
            <div>
                <div className="card text-center" style={{marginTop: "10px", marginBottom: "20px"}}>
                    <h5 className="card-title card-header">Demand Chart</h5>
                    <div className="card-body">  
                    <LineChartComponent labels={jsonData.years} values={jsonData.demand}/>
                    </div>
                </div>
                

                <div className="card text-center hover_element" style={{marginTop: "10px", marginBottom: "20px"}}>
                    <h5 className="card-title card-header">Demand Prediction For Next Five Years</h5>
                    <div className="card-body">  
                        <p className="card-text text-primary hover_element">Last Five year demand: <b>{jsonData.last_avg_demand}%</b></p>
                        <p className="card-text text-primary hover_element">Next Five year demand: <b>{jsonData.next_avg_demand}%</b></p>
                        <h3 className="card-text d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2 bg-warning hover_element">{jsonData.direction} {jsonData.change}%</h3>
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
