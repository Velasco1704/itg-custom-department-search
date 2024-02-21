# Custom Department Search

Este componente está diseñado para generar opciones que permiten seleccionar departamentos en la barra de búsqueda.

## Instalación

### 1. Clonar repositorio

Copia el [repositorio](https://github.com/Velasco1704/itg-custom-department-search/) del proyecto y clonarlo en tu terminal.

```bash
git clone https://github.com/Velasco1704/itg-custom-department-search/
```

### 2. Acceder a la Carpeta del Proyecto

Después de clonar el repositorio, entra a la carpeta del proyecto utilizando el siguiente comando:

```bash
cd itg-custom-department-search
```

### 3. Instalar dependencias de la carpeta react

Entra a la carpeta de react y instala las dependencias.

```bash
cd react && yarn
```

> [!NOTE]
> No uses npm y yarn al mismo tiempo esto va a causar conflictos

### 4. Iniciar Sesión en VTEX

Para poder trabajar con VTEX, necesitas iniciar sesión con tu cuenta. Utiliza el siguiente comando y reemplaza {account} con tu nombre de cuenta de VTEX:

```bash
vtex login { account }
```

### 5. Seleccionar el Espacio de Trabajo

Una vez que hayas iniciado sesión, selecciona el espacio de trabajo en el que deseas trabajar utilizando el siguiente comando. Reemplaza {workspace} con el nombre de tu espacio de trabajo:

```bash
vtex use { workspace }
```

### 6. Enlazar el Proyecto al Espacio de Trabajo

Finalmente, enlaza el proyecto a tu espacio de trabajo para visualizarlo ejecutando el siguiente comando:

```bash
vtex link
```

### 7. Agrega el componente

Agrega el componente en el `manifest.json` de tu **store theme**

```JSON
"dependencies": {
   "{accountName}.{appName}": "{appVersion}",
    "vtex.store": "2.x",
    "vtex.store-header": "2.x"
}
```

## Descripción general del proyecto y su uso

### Componentes

El código consta de dos componentes principales: `DepartmentSearch` y `DepartmentGroup`.

#### DepartmentSearch

El componente `DepartmentSearch` es un componente que se encarga de renderizar una barra de búsqueda y un grupo de departamentos.

```tsx
import { useQuery } from 'react-apollo';
import QUERY_VALUES from '../graphql/getDepartmentGroup.graphql';
import DepartmentGroup from './DepartmentGroup';
import { SearchBar } from 'vtex.store-components';

const DepartmentSearch = () => {
  const CSS__HANDLES = ['container'];
  const handles = useCssHandles(CSS__HANDLES);
  const { data, loading } = useQuery(QUERY_VALUES);
  const [slug, setSlug] = useState('');

  return (
    !loading && (
      <div className={handles['container']}>
        <SearchBar
          customSearchPageUrl={slug}
          placeholder='Busca escribiendo palabra clave'
          displayMode='clear-button'
          containerMode='container'
          openAutocompleteOnFocus={true}
        />
        <DepartmentGroup departments={data?.categories[1].children} handleSetSlug={setSlug} />
      </div>
    )
  );
}
```

El componente `DepartmentSearch` utiliza los siguientes componentes y librerías:

- useQuery y QUERY_VALUES de react-apollo para realizar una consulta GraphQL y obtener los datos de los departamentos.
- DepartmentGroup para renderizar el grupo de departamentos.
- SearchBar de vtex.store-components para renderizar la barra de búsqueda.

El componente `DepartmentSearch` tiene un estado local **slug** que se utiliza para almacenar el valor de la búsqueda. Cuando se realiza una búsqueda, se actualiza el estado slug y se pasa como prop al componente `SearchBar`.
El componente `DepartmentSearch` también utiliza el hook `useQuery` para realizar una consulta **GraphQL** utilizando la variable `QUERY_VALUES`. Los datos obtenidos de la consulta se pasan como prop al componente `DepartmentGroup`.

#### DepartmentGroup

El componente `DepartmentGroup` es un componente de React que renderiza un grupo de departamentos en forma de lista desplegable.

```tsx
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
```

El componente renderiza un contenedor`<div>` con una lista desplegable `<select>`. Cada departamento se representa como una opción `<option>` en la lista desplegable. Cuando se selecciona una opción, se llama a la función `handleChange` que actualiza el estado **slug** en el componente `DepartmentSearch`.

El componente también renderiza un ícono de flecha hacia abajo utilizando el componente `FaArrowDown` de la librería **react-icons/fa6**.

### GraphQL

La query proviene de `vtex.store-graphql@2.170.1`, la query contiene una consulta para obtener los departamentos y sus propiedades **id**, **name** y **slug**.

```graphql
query {
  categories(treeLevel: 2) {
    id,
    name,
    slug,
    children {
      id,
      name,
      slug
    }
  }
}

```

La consulta se realiza utilizando el tipo de consulta **query**. Se obtienen los departamentos utilizando el campo **categories** con el argumento `treeLevel: 2`. Los departamentos tienen las propiedades **id**, **name**, **slug** y **children**, que representa los subdepartamentos.
