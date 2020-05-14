import React from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import '../Register.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          activities:[],
          editActivity:[],
          categories:[],
          category:[],
          catName:"",
          message:"",
          open:false,
          editOpen:false,
          options:[],
      duration:"00:00",
      selectedValue:0,
          activity:0,
          isLoaded:false,
          error:null
         };
         this.handleSubmit=this.handleSubmit.bind(this);
         this.handleEditClose=this.handleEditClose.bind(this);
      }
      setOpen=(bool)=>{
        this.setState({open:bool});
    }
    setEditOpen=(bool)=>{
        this.setState({editOpen:bool});
    }
//---------------------------------------SEARCH AN ACTIVITY---------------------------------------------------------------------
searchActivity=(id)=>{
    const url = 'http://localhost:8080/Activity/getActivityByID/'+id;
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
            if(result===null){
                this.setState({
                    editActivity: [],
                    message:"No Activity Found..."
                });  
            }
            else{
            this.setState({
                editActivity: result,
                duration:result.act_duration,
                selectedValue:result.cat_id
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

//-------------------------TO SHOW ALL CATEGORIES-------------------------------------------------------------------------------
    handleEditClick=(id)=>{
        this.searchActivity(id);
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
                isLoaded: true,
                errorCat:errorCat
              });
            }
        )
        if (this.state.errorCat) {
            return <div>Error: {this.state.errorCat.message}</div>;
        } 
        else if (!this.state.isLoadedCat) {
            return <div>Loading...</div>;
        }
        else {
            this.state.categories.map(function(val,index){ 
                this.state.options.push(<option key={val.cat_id} value={val.cat_id}>{val.cat_name}</option>)
            })
        }
        this.setState({activity:id})
        this.setEditOpen(true);
    }
    handleEditClose(){
        this.setState({activity:0})
        this.setEditOpen(false);
        window.location.reload();
    }
 //-------------------------------------------------UPDATE AN ACTIVITY-----------------------------------------------------------
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
    console.log(data.get("act_id"));
    console.log(JSON.stringify(formData));
      const url="http://localhost:8080/Activity/updateActivity/"+data.get("act_id");
        fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body:  JSON.stringify(formData)                                           
              });
              this.handleEditClose(false);
    }
//-------------------------------------TO DELETE AN ACTIVITY-----------------------------------------------------------------
    handleClickOpen = (id) => {
        this.setState({activity:id})
        this.setOpen(true);
      };
      handleYesClose = () => {
        this.delete(this.state.activity);
        this.setOpen(false);
        this.setState({activity:0});
        window.location.reload();
      };
      handleNoClose = () => {
        this.setOpen(false);
        this.setState({activity:0});
      };
      //--------------TO DELETE AN ACTIVITY------------------------------------------------------------------------------------
delete=(id)=>{
    fetch("http://localhost:8080/Activity/deleteActivity/" + id, {
        method: "DELETE"
    });
}
//--------------------------------------------------------------------------------------------------------------------------------
  showCard=(id,name,date,duration,category,description) =>{
     const chip=[]; 
     if(category==="Uncategorized")
     {
         chip.push(<Chip key={id} label={category}/>);
     }
     else
     {
         chip.push(<Chip key={id} label={category}/>);
     }
    return (
      <Card key={id} className="div-card">
        <CardHeader
          action={
            chip
          }
          title={name}
          subheader={"Date: "+date+"       Duration:"+duration}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button onClick={()=>this.handleEditClick(id)}>Edit</Button>
          <Button onClick={()=>this.handleClickOpen(id)}>Delete</Button>
        </CardActions>
              </Card>
    );
  }
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
                message:""
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
  componentDidMount()
  {
    const url = 'http://localhost:8080/Activity/getAllActivities/';
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
            if(result.length===0)
            {
                this.setState(
                    {
                        activities:result,
                        message:"No activity found....",
                        isLoaded:true
                    })
            }
            else{
            this.setState(
                {
                    activities:result,
                    isLoaded:true,
                    message:""
                })
            }
        },
        // Note: it's important to handle errors here
        (error) => {
            this.setState(
                {
                    isLoaded:false,
                    message:error.message
                }
            )
        }
    )
  }
  render(){ 
    const { errorCat, isLoadedCat } = this.state;
        const [hrs,mins]=this.state.duration.split(':');
    const cards = this.state.activities.map((val)=>{
            if(val.cat_id===0)
            {
                return (
                    this.showCard(val.act_id,val.act_name,val.act_date,val.act_duration,"Uncategorized",val.act_description)
                )
            }
            else{
                return (
                    this.showCard(val.act_id,val.act_name,val.act_date,val.act_duration,val.cat_id,val.act_description)
                )
            }   
    });
      return(<div className="main"><div className="div-container">{cards}</div>
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
        <DialogTitle id="form-dialog-title">Edit Activity</DialogTitle>
            <DialogContent>
            <div className="signup-content">
                    <form onSubmit={this.handleSubmit} class="signup-form">
                    <div id="message">{this.state.message}</div>
                    <div className="form-group">
                   <label htmlFor="act_name">Activity Name</label>
                   <input type="text" class="form-input" id="act_name" defaultValue={this.state.editActivity.act_name} name="act_name" placeholder="Activity Name" required/>
                   </div>
                   <div className="form-group">
                    <label htmlFor="act_description">Activity Description:</label>
                   <textarea className="form-input" id="act_description" name="act_description" defaultValue={this.state.editActivity.act_description} placeholder="Activity Description" required></textarea>
                   </div>
                   <div className="form-group">
                   <label htmlFor="act_date">Activity Date</label>
                   <input type="date" class="form-input" id="act_date" defaultValue={this.state.editActivity.act_date} name="act_date"  />
                   </div>
                   <div className="form-group">
                   <label htmlFor="act_time">Activity Duration</label><br></br>
                   <input id='hrs' name='hrs' className="form-time" placeholder="hh" defaultValue={hrs} required type='number' min='0' max='24'/>
                   <span>  :  </span>
                   <input id='mins' name='mins' className="form-time" placeholder="mm" defaultValue={mins} required type='number' min='0' max='59'/>
                   </div>
                   <div className="form-group">
                   <label htmlFor="cat_id">Category</label>
                   <select id="cat_id" className="form-input" name="cat_id" defaultValue={this.state.selectedValue}>
                     <option value="0">------Category-------</option>
                       {this.state.options}
                   </select></div>
                   <input type="hidden" value={this.state.activity} name="act_id" id="act_id"></input>
                   <div className="form-group">
                   <button type="submit" className="form-submit">Edit</button>
                   </div>
                   </form>
                   <div className="form-group">
                   <button type="cancel" onClick={this.handleEditClose} className="form-submit">Cancel</button>
                   </div>
                   </div>
                   </DialogContent>
      </Dialog>
      
      </div>);
  }
}
export default Home;