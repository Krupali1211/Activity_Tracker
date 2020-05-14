import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../Register.css';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';

export class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [], 
            category:[],
            message:"", 
            isLoaded: false, 
            error: null,
            open:false,
            editOpen:false,
            category_id:0
        };
        this.handleSubmit=this.handleSubmit.bind(this);
         this.handleEditClose=this.handleEditClose.bind(this);
    }
    setOpen=(bool)=>{
        this.setState({open:bool});
    }
    handleClickOpen = (id) => {
        this.setState({category_id:id})
        this.setOpen(true);
      };
      handleYesClose = () => {
        this.delete(this.state.category_id);
        this.setOpen(false);
        this.setState({category_id:0});
      };
      handleNoClose = () => {
        this.setOpen(false);
        this.setState({category_id:0});
      };
    //============================DELETE CATEGORY=============================================================================
    delete=(id)=>{
        fetch("http://localhost:8005/Category/deleteCategory/" + id, {
            method: "DELETE"
        });
    }

    //======================================================EDIT CATEGORY====================================================
    setEditOpen=(bool)=>{
        this.setState({editOpen:bool});
    }
    handleEditOpen=(id)=>{
        this.searchCategory(id);
        this.setState({category_id:id})
        this.setEditOpen(true);
    }
    handleEditClose(){
        this.setState({category_id:0,category:[]})
        this.setEditOpen(false);
    }
    //---------------------------------------SEARCH AN ACTIVITY---------------------------------------------------------------------
searchCategory=(id)=>{
    const url = 'http://localhost:8005/Category/searchCategory/'+id;
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
            if(result===null){
                this.setState({
                    category: [],
                    message:"No Category Found..."
                });  
            }
            else{
            this.setState({
                category: result,
            });
        }
        },
        // Note: it's important to handle errors here
        (error) => {
          this.setState({
            isLoaded: true,
            message:error.message
            
          });
        }
    )
}
//-------------------------------------------------UPDATE AN ACTIVITY-----------------------------------------------------------
handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData={
      cat_name:data.get('cat_name'),
      cat_description:data.get('cat_description'),
    };
    console.log(data.get("cat_id"));
    console.log(JSON.stringify(formData));
      const url="http://localhost:8005/Category/updateCategory/"+data.get("cat_id");
        fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body:  JSON.stringify(formData)                                           
              })
              .then(res => res.status)
            .then(response => {this.setState({message:"Category updated Successfully..."})})
            .catch(error => {this.setState({message:error.message})});
              this.handleEditClose(false);
    }

    //----------------------------------------------Show all Categories------------------------------------------------------------------- 
showCategories = () => {
    fetch('http://localhost:8005/Category/getAllCategories').then(
        response => {
            if (response.ok) {     
                response.json().then(json_response => {
                    console.log(json_response);
                    if(json_response.length===0)
                    {
                        this.setState({
                            categories: json_response,
                            message:"No Data Found",
                            isLoaded: true, 
                            error: null 
                        });
                    }
                    else{
                        this.setState({
                            categories: json_response,
                            message:"",
                            isLoaded: true, 
                            error: null 
                        });
                }
                });
            } 
            else {
                response.json().then(json_response => {
                    this.setState({
                        isLoaded: false,
                        error: json_response, 
                        categories: {},
                        message:"Loading..."
                    });
                });
            }
        },

        error => {
          
            this.setState({
                isLoaded: false,
                error: {
                    message:
                        "AJAX error, URL wrong or unreachable, see console"
                }, 
                message:error.message,
                categories: {}
            });
        }
    );
}
componentDidMount(){
    this.showCategories();
}
    render() {
        const rows=[];
        const h2=[];
        if(this.state.error){
            h2.push(<h2>{this.state.message}</h2>);
        }
        else if(this.state.categories.length===0)
        {
            h2.push(<h2>{this.state.message}</h2>);
        
        }
        else if(this.state.categories.length!==0)
        {    
            for(let i=0;i<this.state.categories.length;i++)
            {
                rows.push(
                    <tr key={this.state.categories[i].cat_id}>
                    <td><i className="fa fa-trash" aria-hidden="true" onClick={()=>this.handleClickOpen(this.state.categories[i].cat_id)}  style={{padding:"10px"}}></i>
                    <i className="fa fa-pencil-square-o" onClick={()=>this.handleEditOpen(this.state.categories[i].cat_id)} aria-hidden="true"></i></td> 
                    <td >{this.state.categories[i].cat_name}</td>
                    <td>{this.state.categories[i].cat_description}</td>
                    </tr>
                )
            }
        }
      
        else{
            h2.push(<h2>{this.state.message}</h2>);
        }
            return(
                <div class="main">
              <section class="signup">
                  <div class="container">
                      <div class="signup-content">
                      <div id="message">{this.state.message}</div>
                            <table>
                                <tbody>
                                <tr>
                                    <th>Action</th>
                                    <th>Category Name</th>
                                    <th>Description</th>
                                </tr>
                                    {rows}
                                    </tbody>
                            </table>
                      </div>
                      </div>
                      </section>
                      <Dialog open={this.state.open} onClose={this.handleNoClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
      <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to delete this Activity?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.handleYesClose} color="primary">
        Yes
      </Button>
      <Button onClick={this.handleNoClose} color="primary" autoFocus>
        No
      </Button>
    </DialogActions>
  </Dialog>
  <Dialog open={this.state.editOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
            <DialogContent>
            <div class="signup-content">
            <form onSubmit={this.handleSubmit} class="signup-form">
                    <div class="form-group">
                   <label htmlFor="cat_name">Category Name</label>
                   <input type="text" class="form-input" id="cat_name" defaultValue={this.state.category.cat_name} name="cat_name" required/>
                   </div>
                   <div class="form-group">
                    <label htmlFor="cat_description">Category Description:</label>
                   <textarea class="form-input" id="cat_description" name="cat_description" defaultValue={this.state.category.cat_description} required></textarea>
                   </div>
                   <input type="hidden" value={this.state.category_id} name="cat_id" id="cat_id"></input>
                   <div class="form-group">
                   <button type="submit" class="form-submit">Save</button>
                   </div>
                   </form>
                   <div class="form-group">
                   <button type="cancel" onClick={this.handleEditClose} class="form-submit">Cancel</button>
                   </div>
                   </div>
                   </DialogContent>
      </Dialog>
  
                      </div>
            )
            
        
    }


}
export default Categories;