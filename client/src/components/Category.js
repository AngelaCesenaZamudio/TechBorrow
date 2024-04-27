import React, {Component} from 'react';
import MenuItem from '../MenuItem.js';

class Category extends Component {
    constructor(props){
        super(props);
        this.state = {visible:false}
    }
  render() {  
  return (
    <div className="Category">
    <li>
        <h3>{this.props.name}</h3>
        <ul>
          {this.props.items.map((item)=>{
            return <MenuItem name ={item} key={item}/>
          })}
        </ul>
    </li>
    </div>
  );
}
}

export default Category;