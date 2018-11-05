import React, { Component } from 'react';
import CircularProgress from './CircularProgress';

class WordCound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars_right: null, 
      max_chars: 100,
      value: '',
      msg: [],
    };
  }
  handleWordCount = e => {
    const charCount = e.target.value.length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({
      chars_right: charLength * 100 / maxChar,
      value: e.target.value,
    });
    //console.log(this.state.chars_right)
  }
  sendMsg = (e) => {
    e.preventDefault()
    if (this.state.value !== '') { 
      this.setState(state => ({
        msg: state.msg.concat({id: new Date().getTime(),text: this.state.value}),
        value: '',
        chars_right: '',
      }))
    }
  }
  render(){
    return(
      <div className="container mx-auto h-full border border-solid rounded mt-5 flex flex-row bg-green-lightest" style={{ maxWidth: 700}}>
        <div className="h-16 w-16 flex items-center justify-center my-3 ml-5">
          <img 
            className="max-w-full rounded-full bg-white" 
            src="https://avatars2.githubusercontent.com/u/10569203?s=52&v=4" 
            alt=""
          />
        </div>
        <div className="flex flex-col w-full m-5">
          <div className="flex-auto">
            <ul 
              className="list-reset border border-green rounded w-full p-4 bg-white h-64"
              style={{
                overflow: 'scroll',
                maxHeight: 100,
                maxWidth: 610,
              }}
            >
              {(this.state.msg || []).map((ms) =>(
                <li key={ms.id}>
                  <span>
                    {ms.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5 mt-3">
            <form className="flex flex-rows" onSubmit={this.sendMsg}>
              <input
                className="border border-green rounded flex-auto p-4"
                onChange={this.handleWordCount}
                value={this.state.value}
                placeholder="Send message..."
                type="text"
              />
              <button
                className="bg-green-light ml-2 py-2 px-5 rounded text-white font-bold"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
          <div className="flex justify-end">
            <CircularProgress 
              word={`${this.state.chars_right == null ? '' : this.state.chars_right} `}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WordCound