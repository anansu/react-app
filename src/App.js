import './App.css';
import React, { Component } from 'react';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import TableOfContent from './components/TableOfContent';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';


class App extends Component {
  constructor(props){
    super(props); //  state의 값 초기화시키려고 함. 어떤 컴포넌트가 실행될 때 render보다 먼저 실행, 초기화를 담당
    this.max_content_id = 5; // UI에 영향을 줄이유가 없는 값은 state 값으로 할 필요 없다.
    this.state = {             
      mode: "welcome",
      selected_content_id: 2,
      subject:{title:"WEB", sub:"World Wide Web!"},
      welcome:{title:"Welcome", desc:"Hello, React!!"},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
        {id:4, title:'Database and ERD', desc:'MySQL is free RDBMS. ERD is Entity Relationship Diagram'},
        {id:5, title:'DNS', desc:'DNS is Domain Name System that translates human readable domain names (for example, www.amazon.com) to machine readable IP addresses (such as 192.0.2.44)'}
      ]
    }
  }

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length)
        {
          var data = this.state.contents[i];
          if(data.id === this.state.selected_content_id)
          {
            return data;
          }
          i+=1;
        }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}>
      </ReadContent>
    } else if(this.state.mode === "read")
    {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}>
      </ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        // var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        // concat은 원본을 바꾸지 않는다.
        // setState는 concat을 통해 복제한 값(여기서는 _contents)을 주어라..!
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        // 굳이 push를 쓸거면 Array.from으로 복사해서 밀어넣어서 쓰면 된다.(배열의 경우)
        // 객체는 Object.assign({},a) 을 활용하면 된다.
        // 원본이 살아있는 상태에서 원본을 변형시키는 것과 원본을 '교체'하는 것은 다르다. 이 방법들은 전부
        // 교체하는 형태임. 걍 push하는 것은 원본을 변형시키고, Array.from과 concat, setState로 직접 바꾸는 것은
        // 복제해서 하든 그냥 하든 교체하는 형태다.
        this.setState({
          contents:newContents
        });
        console.log(_title, _desc);
      }.bind(this)}>
      </CreateContent>
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:newContents
        });
        console.log(_title, _desc);
      }.bind(this)}>
      </UpdateContent>
    }
    return _article;
  }

  render() {
    console.log('App render start(before return)')

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>

        <TableOfContent
          onChangePage={function(id){
            this.setState({
              mode:'read', 
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}>
        </TableOfContent>

        <Control onChangeMode={function(_mode){
          this.setState({
            mode: _mode
          });

        }.bind(this)}>
        </Control>
        {this.getContent()}
      </div>  
      
      // jsx 문법임. 리액트의 컴포넌트는 기본적으로 정리정돈의 도구다.
      // 사용자 정의 태그를 만들어냈다. 컴포넌트 마스터!
      // state와 props의 올바른 이해..! props가 componen 사용하는 사용자 입장의 인터페이스라고 생각하면 편함.
      // 내부 조작 장치는 state라고 비유...
      // component에서 이런 식으로... 컴포넌트를 사용하는 외부의 Props와 그 내부의 state가 철저하게 구분이 되어있어야
      // app.js 파일을 index.js를 사용중임. index.js에서 내부에 무슨 state쓰고 있는지 알 방법이 없음.
      // 내부적으로 사용할 상태는 staet로 숨긴다는 것..!
      // 상위 컴포넌트의 state값을 하위컴포넌트의 props의 값으로 전달하는 것은 얼마든지 가능함!
      // 16.1강, 리액트에서는 state값이나 props가 바뀌면 그 state에 해당하는 값이 render()에서 다시 호출됨.
      // 그러면 하위 컴포넌트의 render도 전부 다시 돌면서 싹 다시 그리게 됨.
      // 16.2강, 이벤트프로그래밍을 리액트로 구현하는 법.
      // preventDefault()로 기본적인 클릭 시 이벤트동작을 막을 수 있음.
      // 16.3강, State랑 event의 연결!
      // 이벤트가 호출되었을 때 실행되는 함수의 값은 컴포넌트 자기자신을 가리키지 않음. 그래서 
      // 정의 안된 State를 읽으려고 해서 망한것. 그래서 bind해도 state가 바뀌진 않음.
      // bind(this)를 쓰고나서, setState를 해야 함. 
      // 16.4강 bind 함수 이해하기. render라는 함수가 호출될 때, 
      // render 함수 안에서 this는 이 render함수가 속한 component 자체를 가리키는데
      // 그 안에 있는(return 안에 있는) 함수는 this는 아무 값도 없ㅇㅁ.
      // 함수뒤에 bind 함수를 붙이고 인자를 하나 주면, 인자가 "함수 내에서의" this가 가리키는 object가 된다
      // 그래서 위의 함수에서 bind(this)를 하면, 컴포넌트 자체가 가리키는 객체를 할당해주는 것.
      // 16.5강 setState함수 이해하기
      // constructor 함수에서(=생성자)는 state를 편하게 값을 할당하면 됨. 하지만 render 함수 내에서
      // 동적으로 state를 바꿀 때 생성자에서 하는 것과 비슷하게 바꾸는 것은 안될말.
      // 반드시 this(app js 파일의)의 setState를 활용해야만 리액트 프레임워크가 "state가 바뀌었음을 알 수 있다"
      // 17.1강 컴포넌트 이벤트 만들기
      // header 태그는 원래 subject.js안에 있었던 코드였음. 이해하려고 옮겨둔거.
      // 원래대로 돌리고... 1. app js 파일에서 subject 컴포넌트를 호출함. 이때 여기에 실행하고 싶은 함수를 담아둠.
      // 2. subject component에서 특정 이벤트(주로 클릭) 때마다 props로 전달된 함수를 실행하면 됨.
      // 17.2강 컴포넌트 이벤트 만들기
      // 17.3강 컴포넌트 이벤트 만들기
      // 이벤트 객체는 target이라는 속성이 있는데, target 객체는 이벤트가 발생한 태그를 가리킴.
      // 18. 베이스캠프
      // 컴포넌트 안에서 자기에게 전달된 props의 값을 바꾸려고 하면, 에러가 나와버림. 이건 금지됨.
      // 컴포넌트 밖에서 Props를 바꾸는건 당연히 허용됨.
      // 상위 -> 하위 명령: Props 활용. 하위 -> 상위 명령: 이벤트 활용해서 setState
      // State와 Props의 차이
      // 19.1 Create의 구현: 소개. 천천히 가자.
      // 19.2 이벤트 실행시 실행되는 함수 = 핸들러라고도 부름.
      // 19.6 push로 추가할 때는 원본을 바꾸고, concat은 원본을 바꾸지 않음. concat을 실행하면
      // 원본을 바꾼 새로운 배열을 추가함. 아무튼 push처럼 오리지널 데이터 변경하는건 되도록 쓰지말고
      // 오리지널 데이터 변경없이 새로운 데이터 추가하는 concat 같은걸 쓰셈
      // 19.7 특히 shouldComponentUpdate 에서는 concat을 써야만 제대로 작동한다. 왜? setState로 push를 통해
      // 바꾸면 아예 원본값 자체가 바뀌어서 component가 업데이트된 것이 아닌 것으로 간주하기 때문임.
      // 19.8 원본을 바꾸지 않고 setState에다가 값을 세팅하는 방법을 알려줄 것..!
      // 불변성, immutable이라고 함.
    );
  }
}

export default App;
