import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CPagination
} from '@coreui/react';

const Table = ({ data, nameOfTable, listField, detail }) => {
  let numOfPage;
  if(data) {
    numOfPage = Math.ceil(data.length / 5);
  }
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/${detail}?page=${newPage}`);
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const [key, ...unkey] = listField;

  return (
    <CCard>
      <CCardHeader>
        {nameOfTable}
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={data}
          fields={[
            { key, _classes: 'font-weight-bold' },
              ...unkey
          ]}
          hover
          striped
          itemsPerPage={5}
          activePage={page}
          clickableRows
          onRowClick={(item) => history.push(`/${detail}/${detail==='files' ? item.fileID : item.userID}`)}
          // 
        />
        <CPagination
          activePage={page}
          onActivePageChange={pageChange}
          pages={numOfPage}
          doubleArrows={false} 
          align="center"
        />
      </CCardBody>
    </CCard>
  );
};

export default Table;