import React,{Fragment ,useState} from 'react'
import axios from 'axios';
import './ContactUs.css' ; 
const ContactUs = () => {

    const [formData , setFormData] = useState ({

    name:'' ,
    email:'',
    subject:'',
    message:''


    }
    );

    const {name , email , subject , message} =formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const onSubmit = (e) => {
        e.preventDefault();

        const message = axios.post ('/api/emails' , formData) ; 
       
        setFormData({ name:'' ,
        email:'',
        subject:'',
        message:''})

      }
    return (
        <Fragment>

<div class="contact-us">
  <form onSubmit={onSubmit}>
    <label for="name">NAME <em>&#x2a;</em></label>
    <input id="customerName" placeholder="Your Name" name="name" value={name} onChange={onChange} required="" type="text" />
    <label for="email">EMAIL <em>&#x2a;</em></label>
    <input id="customerEmail" placeholder="Your Email" name="email" value={email} onChange={onChange} required="" type="email" />
    <label for="subject">SUBJECT</label>
    <input id="customerPhone" placeholder="Subject" name="subject" value={subject} onChange={onChange} type="text" />

    <label for="customerNote">YOUR MESSAGE <em>&#x2a;</em></label>
    <textarea id="customerNote" placeholder="Your Message" name="message" value={message} onChange={onChange} required="" rows="4"></textarea>
  
<button id="customerOrder" type="submit">SUBMIT</button>
  </form>
</div>




















            
           
{/* <section class="mb-4">

    <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
  
    <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div class="row">

       
        <div class="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form"  onSubmit={onSubmit}>

               
                <div class="row">

                   
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                           
                            <input type="text" id="name" placeholder="Your Name" name="name" value={name} onChange={onChange} class="form-control"/>
                            
                        </div>
                    </div>
                   

                 
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="email"  class="form-control"/>
                           placeholder="Your Email" name="email" value={email} onChange={onChange}
                        </div>
                    </div>
                   

                </div>
                

                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" id="subject" placeholder="Subject" name="subject" value={subject} onChange={onChange} class="form-control"/>
                           
                        </div>
                    </div>
                </div>
             
                <div class="row">

                    <div class="col-md-12">

                        <div class="md-form">
                            <textarea type="text" id="message" placeholder="Your Message" name="message" rows="2" 
                            value={message} onChange={onChange} class="form-control md-textarea"></textarea>
                           
                        </div>

                    </div>
                </div>
           <input class="btn btn-primary"  type="submit" value="Submit"/>

            </form>

            
                
        
            <div class="status"></div>
        </div>
    
        <div class="col-md-3 text-center">
            <ul class="list-unstyled mb-0">
                <li><i class="fas fa-map-marker-alt fa-2x"></i>
                    <p>Avenue Moncef Bey, Bizerte , Tunisie</p>
                </li>

                <li><i class="fas fa-phone mt-4 fa-2x"></i>
                    <p>+ 216 20 22 07 92</p>
                </li>

                <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                    <p>barouni.hakim@gmail.com</p>
                </li>
            </ul>
        </div>
       

    </div>

</section>







 */}




        </Fragment>
    )
}

export default ContactUs
