import "./App.css";
import React, { Component } from "react";
import News from "./Component/News";
import Navbar from "./Component/Navbar";
import { Route,Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


export default class App extends Component { 

  

  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />


        <Routes>

        <Route exact  path="/" key="general" element={<News  setProgress={this.setProgress} pageSize={10} apiKey={this.apiKey} category="general" />} />
        <Route exact path="/business"  key="business"element={<News setProgress={this.setProgress} pageSize={10} apiKey={this.apiKey} category="business" />} />
        <Route exact path="/entertainment" key="entertainment" element={<News  setProgress={this.setProgress}pageSize={10} apiKey={this.apiKey} category="entertainment" />} />
        <Route exact path="/general" key="general" element={<News setProgress={this.setProgress} pageSize={10} apiKey={this.apiKey} category="general" />} />
        <Route exact path="/health"  key="health"element={<News setProgress={this.setProgress} pageSize={10} apiKey={this.apiKey} category="health" />} />
        <Route exact path="/science"  key="science"element={<News  setProgress={this.setProgress}pageSize={10} apiKey={this.apiKey} category="science" />} />
        <Route exact path="/sports" key="sports" element={<News  setProgress={this.setProgress}pageSize={10} apiKey={this.apiKey} category="sports" />} />
        <Route exact path="/technology" key="technology" element={<News setProgress={this.setProgress} pageSize={10} apiKey={this.apiKey} category="technology" />} />
      </Routes>
      </div>
    );
  }
}
