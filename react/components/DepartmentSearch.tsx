import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import QUERY_VALUES from '../graphql/getDepartmentGroup.graphql';
import DepartmentGroup from './DepartmentGroup';
import { SearchBar } from 'vtex.store-components';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';

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

export default DepartmentSearch;
