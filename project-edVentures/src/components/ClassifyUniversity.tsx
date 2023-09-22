import { ChangeEvent, FormEvent, useState } from 'react'
import { DropdownInput } from './DropdownInput'
import { Card } from './Card'

export const ClassifyUniversity = () => {

  const [jsonData, setJsonData] = useState<any>({});
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsPressed(true);

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
  

  const country_data = {"USA": 0, "United Kingdom": 1, "Japan": 2, "Switzerland": 3, "Israel": 4, "South Korea": 5, "Canada": 6, "France": 7, "China": 8, "Taiwan": 9, "Russia": 10, "Singapore": 11, "Sweden": 12, "Denmark": 13, "Germany": 14, "Belgium": 15, "Netherlands": 16, "Australia": 17, "Norway": 18, "Finland": 19, "Italy": 20, "Spain": 21, "Brazil": 22, "South Africa": 23, "Hong Kong": 24, "Ireland": 25, "Austria": 26, "Portugal": 27, "New Zealand": 28, "Czech Republic": 29, "Greece": 30, "Thailand": 31, "Mexico": 32, "India": 33, "Argentina": 34, "Chile": 35, "Poland": 36, "Hungary": 37, "Iceland": 38, "Turkey": 39, "Malaysia": 40, "Slovenia": 41, "Estonia": 42, "Croatia": 43, "Saudi Arabia": 44, "Colombia": 45, "Lebanon": 46, "Slovak Republic": 47, "Iran": 48, "Serbia": 49, "Lithuania": 50, "Egypt": 51, "Bulgaria": 52, "Uruguay": 53, "Uganda": 54, "Cyprus": 55, "United Arab Emirates": 56, "Puerto Rico": 57, "Romania": 58}
  const quality_data = ["Exellent", "Good", "Above Average", "Average"]
  const budget_data = [45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000]

  return (
    <div>
        <h1>Classify University</h1>

        <form className="input-group mb-3" onSubmit={handleSubmit}>
            <DropdownInput defaultMsg='Select Country' options={Object.keys(country_data)} name='country' handleChange={handleSelectChange}/>
            <DropdownInput defaultMsg='Select Quality' options={quality_data} name='quality' handleChange={handleSelectChange}/>
            <span className="input-group-text mb-3">$</span>
            <DropdownInput defaultMsg='Select Budget' options={budget_data} name='budget' handleChange={handleSelectChange}/>
            <button className="btn btn-outline-secondary mb-3" type="submit">Classify University</button>
        </form>

      {(!loading && isPressed) && (
        <div>
          <div>
            <div>
              <h3>Recommended Institution:</h3>
              <h5 className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2 text-primary border-primary hover_element">{jsonData.institution}</h5>
            </div>
          </div>

          <div>
            <h3>Recommended Programs:</h3>
            <div className="row">
              <div className="col-sm-4 mb-3">
                <Card className='card text-bg-primary hover_element' courseName={jsonData.course_1} description={jsonData.course_desc_1} header='Foundation Courses'/>
              </div>
              <div className="col-sm-4 mb-3">
                <Card className='card text-bg-secondary hover_element' courseName={jsonData.course_2} description={jsonData.course_desc_2} header='Programming Courses'/>
              </div>
              <div className="col-sm-4 mb-3">
                <Card className='card text-bg-success hover_element' courseName={jsonData.course_3} description={jsonData.course_desc_3} header='Advanced Topics'/>
              </div>
              <div className="col-sm-4 mb-3">
                <Card className='card text-bg-danger hover_element' courseName={jsonData.course_4} description={jsonData.course_desc_4} header='Mathematics And Theory'/>
              </div>
              <div className="col-sm-4 mb-3">
                <Card className='card text-bg-dark hover_element' courseName={jsonData.course_5} description={jsonData.course_desc_5} header='Software Engineering And Project Management'/>
              </div>
            </div>
          </div>

          <div>
            <h3>Summarized Feedback:</h3>
            <h5 className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2 text-primary border-primary hover_element">{jsonData.feedback}</h5>
            <p>(Based on user reviews)</p>
          </div>
        </div>
      )}

      {(loading) && (
        <div className='d-flex justify-content-center align-items-center vh-50'>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}
