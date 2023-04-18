// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {count: 25, isRunning: false, timer: 0, paused: 0}

  onIncrementLimit = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({count: prevState.count + 1}))
    }
  }

  tick = () => {
    const {timer, count} = this.state
    if (timer === count * 60) {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({timer: prevState.timer + 1}))
    }
  }

  onDecrementLimit = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  toggleRunningTimer = () => {
    const {timer, paused} = this.state
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
    if (timer === paused) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      this.setState({paused: timer})
      clearInterval(this.timerId)
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({isRunning: false, timer: 0, paused: 0})
  }

  render() {
    const {count, isRunning, timer} = this.state
    const total = count * 60 - timer
    const min = Math.floor(total / 60)
    const sec = total % 60
    let modiMin
    let modiSec
    if (min < 10) {
      modiMin = `0${min}`
    } else {
      modiMin = min
    }
    if (sec < 10) {
      modiSec = `0${sec}`
    } else {
      modiSec = sec
    }

    console.log(isRunning)
    console.log(timer)

    return (
      <div className="con">
        <div className="card">
          <h1>Digital Timer</h1>
          <div className="down">
            <div className="counter">
              <div className="center">
                <h1 className="total">{`${modiMin}:${modiSec}`}</h1>
                <p>{isRunning ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="right">
              <div className="controls">
                <div className="control-btn-con">
                  <img
                    src={
                      isRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={!isRunning ? 'play icon' : 'pause icon'}
                    className="run-btn"
                  />

                  <button
                    type="button"
                    onClick={this.toggleRunningTimer}
                    className="control-btn"
                  >
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
                <div className="control-btn-con">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="run-btn"
                  />

                  <button
                    type="button"
                    className="control-btn"
                    onClick={this.onReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <p>Set Timer limit</p>
              <div className="btn-con">
                <button
                  type="button"
                  className="limit-control"
                  onClick={this.onDecrementLimit}
                >
                  -
                </button>
                <p className="count-limit">{count}</p>
                <button
                  type="button"
                  className="limit-control"
                  onClick={this.onIncrementLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
