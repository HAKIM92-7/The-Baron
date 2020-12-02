import React,{Fragment} from 'react';
import './CategoriesFilter.css';
const CategoriesFilter = (props) => {

  const categories =['Industrie' , 'Autos' , 'Sport' ,'Cuisine', 'Décoration' , 'Accessoires','Fourniture scolaire']
  return (
    <Fragment>
      <div className="row">
  <div className="col-3">
   
    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    
    <a className="nav-link active" id={`v-pills-clear-tab`} data-toggle="pill" href='#v-pills-clear' role="tab" 
      aria-controls='v-pills-clear 'aria-selected="true" onClick={()=> props.setCategory('')}>Tous</a>
      {categories.map((category) =>(
      <a className="nav-link" id={`v-pills-${category}-tab`} data-toggle="pill" href={`#v-pills-${category}`} role="tab" 
      aria-controls={`v-pills-${category}`} aria-selected="true" onClick={()=> props.setCategory(category)}>
        {category}</a>
      ))}
    </div>
  </div>

</div>









    </Fragment>
  )
}

export default CategoriesFilter

