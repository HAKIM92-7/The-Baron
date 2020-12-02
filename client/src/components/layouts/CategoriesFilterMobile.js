import React,{Fragment} from 'react'

const CategoriesFilterMobile = (props) => {

const categories =['Industrie' , 'Autos' , 'Sport' ,'Cuisine', 'Décoration' , 'Accessoires','Fourniture scolaire'];
    
    return (
        <Fragment>


<ul className="list-group list-group-horizontal nav-pills" style={{display:'flex' , flexWrap:'wrap' , marginLeft:'50px' 
, marginBottom:'20px'}}>
  <li className="list-group-item" style={{border:'1px grey solid'}}> <a className="nav-link active" id={`v-pills-clear-tab`} data-toggle="pill" href='#v-pills-clear' role="tab" 
      aria-controls='v-pills-clear 'aria-selected="true" onClick={()=> props.setCategory('')}>Tous</a></li>

  {categories.map(category => (
  <li className="list-group-item" style={{border:'1px grey solid'}}><a className="nav-link" id={`v-pills-${category}-tab`} data-toggle="pill" href={`#v-pills-${category}`} role="tab" 
  aria-controls={`v-pills-${category}`} aria-selected="true" onClick={()=> props.setCategory(category)}>{category}</a></li>
  ))}
</ul>






            
        </Fragment>
    )
}

export default CategoriesFilterMobile
