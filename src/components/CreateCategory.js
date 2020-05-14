import React from 'react';

export class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:[],
      message:"",
      isLoadedCat:false,
     };
     this.handleSubmit=this.handleSubmit.bind(this);
  }
//-------------------------------------------------CREATE A CATEGORY-----------------------------------------------------------
handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const formData={
    cat_name:data.get('cat_name'),
    cat_description:data.get('cat_description')
  };
  console.log(JSON.stringify(formData));
    const url="http://localhost:8005/Category/addCategory";
      fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body:  JSON.stringify(formData)                                           
            })
            .then(res => res.status)
            .then(response => {this.setState({message:"Category added Successfully..."})})
            .catch(error => {this.setState({message:error.message})});
  } 
  
//---------------------------------------------------RENDER FUNCTION------------------------------------------------------------  
  render() {
            return (
              <div class="main">
              <section class="signup">
                  <div class="container">
                      <div class="signup-content">
                    <form onSubmit={this.handleSubmit} class="signup-form">
                    <h2 class="form-title">Add Category</h2>
                    <div id="message">{this.state.message}</div>
                    <div class="form-group">
                    <label htmlFor="cat_name">Category Name:</label>
                   <input type="text" class="form-input" id="cat_name" name="cat_name" placeholder="Category Name" required/>
                   </div>
                   <div class="form-group">
                    <label htmlFor="cat_description">Category Description:</label>
                   <textarea class="form-input" id="cat_description" name="cat_description" placeholder="Activity Description" required></textarea>
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

export default CreateCategory;