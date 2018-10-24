const React = require('react');


const Square = props => (
  <div onClick={function(){props.clickCb(props)}}>
    {props.value === 0 ? 'O' : (props.value === 1 ? 'X': '')}
  </div>
);

export default Square;
