

interface Props {
    className: string;
    header: string;
    courseName: string;
    description: string;
  }

export const Card = ({className, courseName, description, header}: Props) => {
  return (
    <div className={className}>
        <div className="card-header">{header}</div>
            <div className="card-body">
                <h5 className="card-title">{courseName}</h5>
                <p className="card-text">{description}</p>
            </div>
    </div>
  )
}
