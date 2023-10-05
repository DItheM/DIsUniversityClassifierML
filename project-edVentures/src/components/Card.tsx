

interface Props {
    className: string;
    header: string;
    courseName: string;
    description: string;
    institution: string;
  }

export const Card = ({className, courseName, description, header, institution}: Props) => {
  const input = institution + " " + courseName;
  const converted_input = input.replace(/ /g, "+");
  const link = "https://www.google.com/search?q=" + converted_input;
  return (
    <div className={className}>
        <div className="card-header">{header}</div>
            <div className="card-body">
                <h5 className="card-title">{courseName}</h5>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-body">
              <a href={link} target="_blank" className="card-link text-light">Browse on Google</a>
            </div>
    </div>
  )
}
