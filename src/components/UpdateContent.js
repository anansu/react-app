import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
// 20.2 이렇게 props를 받아서 미리 state로 바꿔버린다.

  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    console.log(this.props.data);
    console.log('UpdateContent render');
    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post"
        onSubmit={function(e)
        {e.preventDefault();
        this.props.onSubmit(
          e.target.title.value,
          e.target.desc.value
        );
        }.bind(this)}>
          <p>
            <input 
            type="text" 
            name="title" 
            placeholder="title"
            value={this.state.title}
            onChange={this.inputFormHandler}
            >
            </input>
          </p>
          <p>
            <textarea 
            name="desc" 
            placeholder="description"
            value={this.state.desc}
            onChange={this.inputFormHandler}
            >
            </textarea>
          </p>
          <p>
            <input type="submit">
            </input>
          </p>
        </form>
      </article>
    );
  }
}
// 20.2 그냥 input에다가 value={this.props.data.title} 로 props로 값을 받으면,(onChange Handler 없이)
// read-only Field가 되어버림. 그래서 우린 이걸 state로 써야한다.
export default UpdateContent;