import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const TableDetail = ({ data, id, nameOfTable}) => {
  console.log(data);
  return (
    <CCard>
      <CCardHeader>
        {nameOfTable}: {id}
      </CCardHeader>
      <CCardBody>
          <table className="table table-striped table-hover">
            <tbody>
              {
                data.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td><strong>{value}</strong></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
      </CCardBody>
    </CCard>
  );
};

export default TableDetail;