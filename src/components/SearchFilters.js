import React from "react"; 

function SearchFilters(props){

return(
<div className="result-filter">
	<h3>Topics: {props.section ? <span onClick={props.clearSection} className="filter-results">{props.section}</span> : <span>All</span>}</h3>
	<h3>Author: {props.author ? <span onClick={props.clearAuthor} className="filter-results">{props.author}</span> : <span>All</span>}</h3>
</div>

)

}

export default SearchFilters;