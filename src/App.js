import './App.css';
import React, { Component } from 'react';


class Subject extends Component {
  render() {
    return (
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>      // semantic tag / from HTML5
    );
  }
}

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
      <h2>HTML</h2>
      HTML is HyperText Markup Language
      </article>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <TableOfContent></TableOfContent>
        <Content></Content>
      </div>  // jsx 문법임. 정리정돈의 도구다.
    );
  }
}

export default App;
