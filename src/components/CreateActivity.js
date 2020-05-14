import React from 'react';
import { Link } from 'react-router-dom';

export class CreateActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Activities:  [],
      categories:[],
      message:"",
      isLoadedCat:false,
      startDate:''
     };
     this.handleSubmit=this.handleSubmit.bind(this);
  }
//-------------------------------------------------CREATE AN ACTIVITY-----------------------------------------------------------
handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const formData={
    act_name:data.get('act_name'),
    act_date:data.get('act_date'),
    act_duration:data.get('hrs')+":"+data.get('mins'),
    act_description:data.get("act_description"),
    user_id:parseInt("1",10),
    cat_id:parseInt(data.get('cat_id'),10)
  };
  console.log(JSON.stringify(formData));
    const url="http://localhost:8080/Activity/addActivity";
      fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body:  JSON.stringify(formData)                                           
            })
            .then(res => res.status)
            .then(response => {this.setState({message:"Activity added Successfully..."})})
            .catch(error => {this.setState({message:error.message})});
  }
//----------------------------------------TO SHOW ALL CATEGORIES----------------------------------------------------------------
  componentDidMount = () => {
    const url = 'http://localhost:8005/Category/getAllCategories';
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
            this.setState({
                categories: result,
                isLoadedCat: true
            });
        },
        // Note: it's important to handle errors here
        (errorCat) => {
          this.setState({
            isLoadedCat: false,
            errorCat
          });
        }
    )
  }  

  
//---------------------------------------------------RENDER FUNCTION------------------------------------------------------------  
  render() {
        const { errorCat, isLoadedCat } = this.state
        if (errorCat) {
            return <div>Error: {errorCat.message}</div>;
        } 
        else if (!isLoadedCat) {
            return <div>Loading...</div>;
        }
        else {
            let options = this.state.categories.map(function(val, index){ 
                return (
                <option key={val.cat_id} value={val.cat_id}>{val.cat_name}</option>
                ); 
            }) 
//--------------------------------------------------TO SET CURRENT DATE---------------------------------------------------------
              var today=new Date();
              var yyyy=today.getFullYear();
              var mm=("0"+(today.getMonth()+1)).slice(-2);
              var dd=("0"+today.getDate()).slice(-2);
              var date=yyyy+"-"+mm+"-"+dd;
              console.log(date);
            return (
              <div class="main">
              <section class="signup">
                  <div class="container">
                      <div class="signup-content">
                    <form onSubmit={this.handleSubmit} class="signup-form">
                    <h2 class="form-title">Add Activity</h2>
                    <div id="message">{this.state.message}</div>
                    <div class="form-group">
                    <label htmlFor="act_name">Activity Name:</label>
                   <input type="text" class="form-input" id="act_name" name="act_name" placeholder="Activity Name" required/>
                   </div>
                   <div class="form-group">
                    <label htmlFor="act_description">Activity Description:</label>
                   <textarea class="form-input" id="act_description" name="act_description" placeholder="Activity Description" required></textarea>
                   </div>
                   <div class="form-group">
                   <label htmlFor="act_date">Activity Date:</label><br></br>
                   <input type="date" class="form-input" width="100%" defaultValue={date} id="act_date" name="act_date"  />
                   </div>
                   <div class="form-group">
                   <label htmlFor="act_time">Activity Duration:</label><br></br>
                   <input id='hrs' name='hrs' class="form-time" placeholder="hh" required type='number' min='0' max='24'/>
                   <span>  :  </span>
                   <input id='mins' name='mins' placeholder="mm" class="form-time" required type='number' min='0' max='59'/>
                   </div>
                   <div class="form-group">
                   <label htmlFor="cat_id">Category:</label>
                   <select id="cat_id" class="form-input" name="cat_id">
                     <option defaultChecked value="0">------Category-------</option>
                       {options}
                   </select>
                   </div>
                   <div class="form-group">
                   <button type="submit" class="form-submit" >Add</button>
                   </div>
                   <div class="form-group">
                   <button type="reset" class="form-submit">Reset</button>
                   </div>
                   </form>
                   </div>
            </div>
        </section>

    </div>   
            );
          
        }    
    }
}

export default CreateActivity;