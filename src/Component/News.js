import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 50,
    category: "general", // Default category
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      filteredArticles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      searchQuery: "",
      isOffline: !navigator.onLine,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News (Nitesh)`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async fetchNews() {
    const { category, pageSize } = this.props;
    const { page } = this.state;

    if (!navigator.onLine) {
      this.setState({ isOffline: true, loading: false });
      return;
    }

    this.props.setProgress(10);
    this.setState({ loading: true });

    try {
      const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);

      this.setState({
        articles: parsedData.articles,
        filteredArticles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        isOffline: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      this.setState({ isOffline: true, loading: false });
    }
  }

  async componentDidMount() {
    // Load default category news on mount
    this.fetchNews();

    // Listen for network status changes
    window.addEventListener("online", this.handleNetworkStatus);
    window.addEventListener("offline", this.handleNetworkStatus);
  }

  async componentDidUpdate(prevProps) {
    // Fetch new category news when the category prop changes
    if (prevProps.category !== this.props.category) {
      await this.setState({ page: 1, articles: [], filteredArticles: [] });
      this.fetchNews();
    }
  }

  componentWillUnmount() {
    // Clean up event listeners
    window.removeEventListener("online", this.handleNetworkStatus);
    window.removeEventListener("offline", this.handleNetworkStatus);
  }

  handleNetworkStatus = () => {
    if (navigator.onLine) {
      this.setState({ isOffline: false }, () => {
        this.fetchNews();
      });
    } else {
      this.setState({ isOffline: true });
    }
  };

  async fetchMoreData() {
    const { category, pageSize } = this.props;
    const { page } = this.state;
  
    try {
      const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${this.props.apiKey}&page=${
        page + 1
      }&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
  
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        filteredArticles: this.state.articles.concat(parsedData.articles),
        page: page + 1,
        isOffline: false,
      });
    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ isOffline: true });
    }
  }
  

  filterArticles = () => {
    const { searchQuery, articles } = this.state;

    if (!searchQuery) {
      this.setState({ filteredArticles: articles });
      return;
    }

    const filtered = articles.filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const description = article.description?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      return query.split(" ").some((word) => title.includes(word) || description.includes(word));
    });

    this.setState({ filteredArticles: filtered });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value }, this.filterArticles);
  };

  render() {
    const { filteredArticles, loading, isOffline, searchQuery } = this.state;

    return (
      <div>
        <div className="container">
          <h1
            className="text-center"
            style={{ fontWeight: "800", marginTop: "80px" }}
          >
            Top {this.props.category} Headlines News
          </h1>

          {/* Search Bar */}
          <div className="my-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search news..."
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>

          {/* Display offline message */}
          {isOffline && (
            <div className="alert alert-danger text-center" role="alert">
              You are offline. Please check your internet connection.
            </div>
          )}

          {/* Display "No results found" message */}
          {!loading && filteredArticles.length === 0 && searchQuery && (
            <div className="alert alert-warning text-center" role="alert">
              No news found related to "{searchQuery}". Please try a different keyword.
            </div>
          )}

          {/* Infinite Scroll Component */}
          <InfiniteScroll
  dataLength={filteredArticles.length}
  next={this.fetchMoreData.bind(this)}
  hasMore={filteredArticles.length < this.state.totalResults}
  loader={<Spinner />}
>
  <div className="container">
    <div className="row my-3">
      {!loading &&
        filteredArticles.map((element) => {
          return (
            <div className="col-md-4 my-3" key={element.url}>
              <Newsitems
                title={element.title ? element.title : ""}
                description={
                  element.description
                    ? element.description
                    : "No description is available"
                }
                imgUrl={element.urlToImage}
                newsUrl={element.url}
                author1={element.author ? element.author : "Unknown"}
                date={element.publishedAt}
                source1={element.source.name}
              />
            </div>
          );
        })}
    </div>
  </div>
</InfiniteScroll>

        </div>
      </div>
    );
  }
}
