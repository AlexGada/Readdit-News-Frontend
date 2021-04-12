import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
//material ui button and dropdown and card

class Navbar extends Component {
  state = {
    topics: [],
  };
  componentDidMount() {
    api.fetchTopics().then((topics) => {
      this.setState({ topics });
    });
  }
  render() {
    const { topics } = this.state;
    return (
      <nav className="Nav">
        Topics <br></br>
        <Link to="/">
          <ButtonGroup
            size="large"
            color="primary"
            aria-label="large outlined primary button group"
          >
            <Button className="button" variant="contained">
              All Articles
            </Button>
          </ButtonGroup>
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              className="navLink"
              key={topic.description}
              to={`/${topic.slug}/articles`}
            >
              <ButtonGroup
                size="large"
                color="primary"
                aria-label="large outlined primary button group"
              >
                <Button className="button" variant="contained">
                  {topic.slug}
                </Button>
              </ButtonGroup>
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default Navbar;
//  render() {
//     const { topics } = this.state;
//     return (
//       <nav className="Nav">
//         <DropdownButton id="nav_dropdown" title="Topics" variant="danger">
//           <Dropdown.Item href="/articles">All</Dropdown.Item>
//           {topics.map((topic) => {
//             return (
//               <Dropdown.Item
//                 href={`/${topic.slug}/articles`}
//                 key={`${topic.slug}`}
//               >
//                 {topic.slug}
//               </Dropdown.Item>
//             );
//           })}
//         </DropdownButton>
//         <ButtonGroup
//           size="large"
//           color="primary"
//           aria-label="large outlined primary button group"
//         >
//           <Button
//             onClick={this.getQuery}
//             className="button"
//             variant="contained"
//           >
//             Author
//           </Button>
//         </ButtonGroup>
//       </nav>
