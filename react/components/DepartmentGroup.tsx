import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { FaArrowDown } from "react-icons/fa6";
import './styles.css';

interface Props {
  departments: {
    id: string;
    name: string;
    slug: string;
  }[];
  handleSetSlug: (value: string) => void;
}

const DepartmentGroup = ({ departments, handleSetSlug }: Props) => {
  const CSS__HANDLES = [
    'container-select',
    'select',
    'option--default',
    'option',
    'select--icon'
  ];
  const handles = useCssHandles(CSS__HANDLES);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => handleSetSlug(`${e.target.value}/$\{term\}&map=ft`);

  return (
    <div className={handles['container-select']}>
      <select className={handles['select']} defaultValue='value0' onChange={handleChange}>
        <option className={handles['option--default']} disabled value='value0'>Selecciona una opción</option>
        {departments.map((department, index) => <option className={handles['option']} key={index} value={department.slug}>{department.name}</option>)}
      </select>
      <FaArrowDown className={handles['select--icon']} />
    </div>
  );
}

export default DepartmentGroup;
