import './App.css';
import React, { Component } from 'react';

class TableOfContent extends Component {
  render() {
    return (
      <nav>
        <ul>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <article>
      <h2>{this.props.title}</h2>
      {this.props.desc}
      </article>
    );
  }
}

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>      // semantic tag / from HTML5
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject title="WEB" sub="world wide web!"></Subject>
        <Subject title="React" sub="For UI"></Subject> 
        <TableOfContent></TableOfContent>
        <Content title="HTML" desc="HTML is HyperText Markup Language"></Content>
      </div>  // jsx 문법임. 리액트의 컴포넌트는 기본적으로 정리정돈의 도구다.
      // 사용자 정의 태그를 만들어냈다. 컴포넌트 마스터!
    );
  }
}

export default App;
