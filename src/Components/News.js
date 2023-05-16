import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types"

export class News extends Component {
  static defaultProps= {
    country: 'in',
    pageSize: '8',
    category: 'in'
  }
  static propTypes = {
    pageSize: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - Scoopify`
  }

  async updatedNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=357d5e46e47643d084c4ccf97060da6c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=357d5e46e47643d084c4ccf97060da6c&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updatedNews();
  }

  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=357d5e46e47643d084c4ccf97060da6c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });
    this.setState({page: this.state.page-1});
    this.updatedNews();
  };
  handleNextClick = async () => {
    // if(!(this.state.page + 1 >Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=357d5e46e47643d084c4ccf97060da6c&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
      this.setState({page: this.state.page + 1});
      this.updatedNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">Scoopify - Latest {this.capitalizeFirstLetter(this.props.category)} Updates</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : (element.title = "")}
                  description={element.description? element.description.slice(0, 80): (element.description = "")}
                  urlToImage={element.urlToImage}url={element.url} author={element.author} date={element.publishedAt} 
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        {/* <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
