import React from "react";
import { ReactComponent as IntroSearchSVG } from "../images/intro-search.svg";
import { ReactComponent as NoResults } from "../images/no-results.svg";

function SearchResults(props) {
  // in order to use the Ars Tencinas custom metadata JSON object I use this to make sure that the object I'm looking for
  // exists before adding it into the return. Some of the older custom metadata objects are improperly encoded.
  const parseJSONSafely = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const sectionFilter = (sect) => {
    props.clickSection(sect);
  };
  const authorFilter = (auth) => {
    props.clickAuthor(auth);
  };

  return (
    <div className="search-results">
      <div className="results">
        {
          /* this shows the introduction svg if there is no data to show */
          !props.data ? (
            <div className="intro-search">
              <IntroSearchSVG />
            </div>
          ) : (
            ""
          )
        }
        {props.data &&
          props.data.map((obj, key) => {
            return (
              <div className="result" key={key}>
                <a className="overlay" href={obj.url}>
                  <img
                    alt={obj.title}
                    src={
                      obj.metadata &&
                      parseJSONSafely(obj.metadata).listing_image_url
                        ? parseJSONSafely(obj.metadata).listing_image_url
                        : obj.thumb_url_medium
                    }
                  />
                </a>
                <div className="text-container">
                  <span className="labeled">
                    <span
                      onClick={() => sectionFilter(obj.section)}
                      className="labeled-click"
                    >
                      {obj.section}
                    </span>
                  </span>
                  <a className="" href={obj.url}>
                    <p className="title">{obj.title}</p>
                    <p
                      className="lower-deck"
                      dangerouslySetInnerHTML={{
                        __html: obj.metadata
                          ? parseJSONSafely(obj.metadata).lower_deck
                          : "",
                      }}
                    ></p>
                  </a>
                  <div className="byline">
                    <span
                      className="author"
                      onClick={() => authorFilter(obj.author)}
                    >
                      {obj.author}
                    </span>
                    <span className="date-time">
                      &nbsp;- {new Date(obj.pub_date).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        {
          /* this shows the no results SVG if there are no results */
          props.data && props.data.length === 0 ? (
            <div className="no-results">
              <NoResults />
            </div>
          ) : (
            " "
          )
        }

        {
          /* this brings up the loading animation section, when the API is loading */
          props.loading ? <div className="loading"></div> : ""
        }
      </div>
    </div>
  );
}

export default SearchResults;
