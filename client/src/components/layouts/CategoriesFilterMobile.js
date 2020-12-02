import React,{Fragment} from 'react'

const CategoriesFilterMobile = (props) => {

const categories =['Industrie' , 'Autos' , 'Sport' ,'Cuisine', 'Décoration' , 'Accessoires','Fourniture scolaire'];
    
    return (
        <Fragment>


<ul className="list-group list-group-horizontal" style={{display:'flex' , flexWrap:'wrap' , marginLeft:'50px' 
, marginBottom:'20px'}}>
  <li className="list-group-item"> <a href="#" onClick={()=> props.setCategory('')}>Tous</a></li>

  {categories.map(category => (
  <li className="list-group-item"><a href="#" onClick={()=> props.setCategory(category)}>{category}</a></li>
  ))}
</ul>






            
        </Fragment>
    )
}

export default CategoriesFilterMobile
