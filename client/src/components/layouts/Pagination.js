
import React, {Fragment} from 'react'

const Pagination = ({elementsPerPage , totalElements ,paginate }) => {

  const pageNumbers =[] ;
  for (let i=1 ; i<= Math.ceil (totalElements / elementsPerPage ) ; i++)
  {
    pageNumbers.push(i);


  }
    return (
        <Fragment>
            <nav className="pagination" role="navigation" aria-label="pagination">

<ul className="pagination-list" >
  { pageNumbers.map(number => (
  <li key={number} style={{maxWidth:'50px'}}> 
    <a className="pagination-link " onClick={()=>paginate(number)} href="#" aria-label={`Page ${number}`} aria-current="page">{number}</a>
  </li>
  ))}
</ul>
</nav>
        </Fragment>
    )
}

export default Pagination
