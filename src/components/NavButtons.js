import React from "react";

function NavButtons(props) {
  let updatedLink = null;

  // When filtering by author, the pagination links have the author query as an encoded array, which returns no results.
  // If that array is present, this removes the author query from the URL and replaces it with a single author name for the query.
  const fixLinks = (link) => {
    if (link.includes("%5B%27")) {
      let oldAuthor = encodeURIComponent(props.author);
      let updatedAuthor = oldAuthor.replace("%20", "+");
      updatedLink = link.replace(
        `&author=%5B%27${updatedAuthor}%27%5D`,
        `&author=${oldAuthor}`
      );
      return updatedLink;
    } else {
      return link;
    }
  };

  return (
    <div className="button-container">
      {props.links && props.links.prev ? (
        <span
          className="button"
          onClick={() => {
            props.paginateClick(fixLinks(props.links.prev), props.pageNum - 1);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          &lt;
        </span>
      ) : (
        <span className="button no-hover"></span>
      )}
      {props.links && props.links.first ? (
        <span
          className="button clear"
          onClick={() => {
            props.paginateClick(fixLinks(props.links.first), 1);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          {props.pageNum}
        </span>
      ) : (
        <span className="button no-hover"></span>
      )}
      {props.links && props.links.next ? (
        <span
          className="button"
          onClick={() => {
            props.paginateClick(fixLinks(props.links.next), props.pageNum + 1);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          &gt;
        </span>
      ) : (
        <span className="button no-hover"></span>
      )}
    </div>
  );
}

export default NavButtons;
