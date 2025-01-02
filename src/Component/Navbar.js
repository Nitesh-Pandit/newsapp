import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
    };
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 50;
    if (this.state.isScrolled !== isScrolled) {
      this.setState({ isScrolled });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      // Change the document title when category changes
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`;
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          this.state.isScrolled ? "navbar-scrolled bg-light shadow" : "bg-light"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="#">
            NewsApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="categoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/business">
                      Business
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/entertainment">
                      Entertainment
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/general">
                      General
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/health">
                      Health
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/science">
                      Science
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/sports">
                      Sports
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/technology">
                      Technology
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search news..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    );
  }
}
