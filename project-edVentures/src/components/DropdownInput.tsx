import {ChangeEvent} from 'react'

interface Props {
  defaultMsg: string;
  options: any[];
  name: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownInput = ({defaultMsg, options, name, handleChange}: Props) => {
  return (
  <select className="form-select form-select-lg mb-3 form-control" name={name} onChange={(event) => handleChange(event)} required>
    <option value="" selected disabled>{defaultMsg}</option>
    {options.map(item => 
      <option value={item}>{item}</option>
    )}
  </select>
  )
}
