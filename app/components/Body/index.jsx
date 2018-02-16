import React, { Component } from 'react';
import axios from 'axios';

import Loading from './components/Loading';
import PageTitle from './components/PageTitle';
import SidebarNavCourse from './components/SidebarNavCourse';

class Body extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    axios.get('/auth/session')
    .then((isLoggedIn) => {
      this.setState({ isLoaded: true });
    })
    .catch((err) => {
      console.log('error: ', err)
    });
  }

  printBodyClasses() {
    if (this.props.sidebar) {
      return 'main right-content';
    } else {
      return 'main right-content-fullwidth';
    }
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="wrap container-fluid pb-4" role="document">
          <div className="content row">
            { this.props.sidebar ? <SidebarNavCourse /> : (<div className="bumper"></div>) }
            <main className={this.printBodyClasses()}>
              <PageTitle title={this.props.title} noHeader={this.props.noHeader} />
              { this.props.children }
            </main>
            <div className="bumper"></div>
          </div>
        </div>
      );
    }
    return ( <Loading /> );
  }
}

export default Body;
