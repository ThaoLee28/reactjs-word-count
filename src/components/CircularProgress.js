import React, { Component } from 'react';

class CircularProgress extends Component {
  static defaultProps = {
    size: 40,
    word: 0,
    strokeWidth: 5
  };
  handlechangeColor = () => {
    if (this.props.word < 0)
      return "red";
    if (this.props.word > 0 && this.props.word <= 20)
      return "yellow";
    if (this.props.word > 20)
      return "green";
  }
  render() {
    const size = this.props.size;
    const radius = (this.props.size - this.props.strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = 1 - (dashArray - dashArray * this.props.word / 100);
    return (
      <svg
        width={this.props.size}
        height={this.props.size}
        viewBox={viewBox}>
        <circle
          cx={this.props.size / 2}
          cy={this.props.size / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`} 
          style={{
            stroke: '#ddd', 
            fill: 'none'
          }}
        />
        <circle
          cx={this.props.size / 2}
          cy={this.props.size / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          transform={`rotate(-90 ${this.props.size / 2} ${this.props.size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: `${this.props.word < 0 ? 0 : dashOffset}`,
            stroke: `${this.handlechangeColor()}`,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fill: 'none',
          }} 
        />
        <text
          className="text-xs font-bold"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          style={{fill: `${this.handlechangeColor()}`}}
        >
          {`${this.props.word > 20 ? '' : this.props.word }`}
        </text>
      </svg>
    );
  }
}

export default CircularProgress