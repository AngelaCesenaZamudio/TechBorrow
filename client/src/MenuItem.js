import React, {Component} from 'react';

class MenuItem extends Component {

  render() {  
  return (
    <div className="menuitem">
    <li>
        <a href='#'>{this.props.name}</a>
    </li>
    </div>
  );
}
}

export default MenuItem;