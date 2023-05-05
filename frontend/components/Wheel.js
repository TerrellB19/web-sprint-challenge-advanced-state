import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

 function Wheel(props) {
  const { wheel } = props
  return (
    <div id="wrapper">
      <div id="wheel">
          <div className={0 === wheel ? 'cog active' : 'cog'} style={{ "--i": 0 }}>{0 === wheel ? 'B' : ''}</div>
          <div className={1 === wheel ? 'cog active' : 'cog'} style={{ "--i": 1 }}>{1 === wheel ? 'B' : ''}</div>
          <div className={2 === wheel ? 'cog active' : 'cog'} style={{ "--i": 2 }}>{2 === wheel ? 'B' : ''}</div>
          <div className={3 === wheel ? 'cog active' : 'cog'} style={{ "--i": 3 }}>{3 === wheel ? 'B' : ''}</div>
          <div className={4 === wheel ? 'cog active' : 'cog'} style={{ "--i": 4 }}>{4 === wheel ? 'B' : ''}</div>
          <div className={5 === wheel ? 'cog active' : 'cog'} style={{ "--i": 5 }}>{5 === wheel ? 'B' : ''}</div>
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise()} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return{
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise})(Wheel)