import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import {
  faNewspaper,
  faLaptopCode,
  faUtensils,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//material ui button and dropdown and card

const icons = [faLaptopCode, faFutbol, faUtensils];

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
        <Link to="/">
          <FontAwesomeIcon className="navButton" icon={faNewspaper} /> <br />
          all articles
        </Link>
        {topics.map((topic, idx) => {
          const Icon = icons[idx];
          return (
            <Link
              className="navLink"
              key={topic.description}
              to={`/${topic.slug}/articles`}
            >
              {/* <button className={topic.slug}>{topic.slug}</button> */}
              <FontAwesomeIcon className="navButton" icon={Icon} /> <br />{" "}
              {topic.slug}
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
