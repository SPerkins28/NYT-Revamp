import React, { Component } from "react";
import NytDisplay from './NytDisplay';

type FetchState = {
  results: any;
  searchTerm: string;
  startD: number | string;
  endD: number | string;
  pageNum: number;
};

class NytFetch extends Component<{}, FetchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      results: [],
      searchTerm: "",
      startD: "",
      endD: "",
      pageNum: 0,
    };
  }

  fetchResults = () => {
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const key = "JWUIyiJkdQtr0RWQse2NlaP8XyPS0lvA";
    let URL = `${baseURL}?api-key=${key}&page=${this.state.pageNum}&q=${this.state.searchTerm}`;

    if (this.state.startD !== "") {
      URL += "&begin_date=" + this.state.startD;
    }

    if (this.state.endD !== "") {
      URL += "&end_date=" + this.state.endD;
    }

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          results: data.response.docs,
        });
        // console.log(this.state.results);
      });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({
        results: [],
    })
    this.fetchResults();
  };

  nextPg = (e: any) => {
      e.preventDefault();
      this.setState({
          pageNum: this.state.pageNum+1
      }, () => {this.fetchResults()})
  }

  previousPg = (e: any) => {
      e.preventDefault();
      if(this.state.pageNum > 0) {
          this.setState({
            pageNum: this.state.pageNum - 1 
          }, () => {this.fetchResults()});
      } else {
          return;
      }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />
          <label htmlFor="search">
            Enter a SINGLE search term (required):{" "}
          </label>
          <input
            type="text"
            id="search"
            className="search"
            required
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
          ></input>
          <br />
          <br />
          <label htmlFor="start-date">
            Enter a start date (format YYYYMMDD):{" "}
          </label>
          <input
            type="date"
            id="start-date"
            className="start-date"
            pattern="[0-9]{8}"
            onChange={(e) => this.setState({ startD: e.target.value })}
          ></input>
          <br />
          <br />
          <label htmlFor="end-date">
            Enter a start date (format YYYYMMDD):{" "}
          </label>
          <input
            type="date"
            id="end-date"
            className="end-date"
            pattern="[0-9]{8}"
            onChange={(e) => this.setState({ endD: e.target.value })}
          ></input>
          <br />
          <br />
          <button>Submit Search</button>
        </form>
        <button onClick={(e) => this.previousPg(e)}>Previous Page</button>
        <button onClick={(e) => this.nextPg(e)}>Next Page</button>
        <br/>
        <br/>
        <NytDisplay results={this.state.results} />
      </div>
    );
  }
}

export default NytFetch;
