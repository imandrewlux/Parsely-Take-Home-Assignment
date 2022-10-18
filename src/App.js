import React, { useState, useEffect } from "react"; 
import './App.css';
import SearchResults from './components/SearchResults';
import SearchFilters from './components/SearchFilters';
import Header from './components/Header';
import NavButtons from './components/NavButtons';
import Footer from './components/Footer';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState(false);
  const [section, setSection] = useState("");
  const [sort, setSort] = useState("pub_date");
  const [author, setAuthor] = useState("");
  const [apiURL, setApiUrl] = useState("");
  const [pageNum, setPageNum] = useState(1);

//throws an error if the API call encounters one
  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);    }
    return response;
  }

  // Getting data from API call using built in fetch
  // Async function is triggering the no unused variables error, I've disabled it for just this function
   /* eslint-disable no-unused-vars */
  const getParselyData = async (parselyUrl) => {
  const response = await fetch(parselyUrl).then(handleErrors)
  .then( response => { return response.json();} )
  // I added this if statement to clear everythig and return to a defult state if something goes wrong with the API return and is given a error code.
  // this is quick fix for the rate limiting issue using a public API.
  .then( (jsonData) => { if(jsonData.code){clearValue()}else{setSearchResults(jsonData.data);setLinks(jsonData.links)}})
  .catch( error => {console.log(error);} ); 
  setLoading(false);
  }
  /* eslint-enable no-unused-vars */

// updates the API url whenever sort is changed or searchquery is changed
  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if(section && author){
        setApiUrl(`https://api.parsely.com/v2/search?apikey=arstechnica.com&limit=24&page=1&q=${encodeURIComponent(searchQuery)}&sort=${sort}&section=${encodeURIComponent(section)}&author=${encodeURIComponent(author)}`);
      }else if(!section && author){
        setApiUrl(`https://api.parsely.com/v2/search?apikey=arstechnica.com&limit=24&page=1&q=${encodeURIComponent(searchQuery)}&sort=${sort}&author=${encodeURIComponent(author)}`);
      }else if(section && !author){
        setApiUrl(`https://api.parsely.com/v2/search?apikey=arstechnica.com&limit=24&page=1&q=${encodeURIComponent(searchQuery)}&sort=${sort}&section=${encodeSection(section)}`);
      }else if(!section && !author){
        setApiUrl(`https://api.parsely.com/v2/search?apikey=arstechnica.com&limit=24&page=1&q=${encodeURIComponent(searchQuery)}&sort=${sort}`);
      }
      setPageNum(1);
      setLoading(false);

    }, 500)
    return () => clearTimeout(delayDebounceFn)
  },[searchQuery, sort]);

// sends the api call whenever the apiurl state is updated.
  useEffect(() => {
      if(searchQuery.length){
      getParselyData(apiURL);
      }else{
        setLoading(false);
        clearValue();
      }
  }, [apiURL]);

// clears most the values back to their original state (Does not incllude sort)
  const clearValue = () => {
    setLoading(false);
    setSearchResults("");
    setSearchQuery("");
    setLinks("");
    setAuthor("");
    setSection("");
    setPageNum(1);
  }

  // Encoding Sections the same way the pagination buttons do so i can add in and remove sections query
  const encodeSection = (val) => {
    let fixedLink = encodeURIComponent(val).replaceAll('%20', "+");
    return fixedLink;
  }

  // Calls the pagination link returned from the API and sets the page number
  const paginateClick = (val, num) => {
    setLoading(true);
    setApiUrl(val);
    setPageNum(num);
  }

  // Changes the state of the sort query
  const sortFilter = (val) => {
    setLoading(true);
    setSort(val);
  }

// Appends the API Url with a Section query
  const sectionFilter = (val) => {
    setLoading(true);
    setSection(val);
    setApiUrl(apiURL + `&section=${encodeSection(val)}`);
  }

// Clears the Section query from the API URL
  const clearSection = () => {
    setLoading(true);
    setApiUrl(apiURL.replace(`&section=${encodeSection(section)}`, "") );
    console.log(apiURL);
    setSection("");
  }

// Appends the API Url with a Author query
  const authorFilter = (val) => {
    setLoading(true);
    setAuthor(val);
    setApiUrl(apiURL + `&author=${encodeURIComponent(val)}`);
  }

// Clears the Author query from the API URL
  const clearAuthor = () => {
    setLoading(true);
    setApiUrl(apiURL.replace(`&author=${encodeURIComponent(author)}`, "") );
    setAuthor("")
  }

// Changes the cursor when loading is set to true
  if(loading){
    document.body.style.cursor='wait';
  }else{
    document.body.style.cursor='default';
  }

  return (
    <div className="site-wrapper">
    <Header />
    <div className="mid-body">
      <div className="search-section">
        <form className="search-form" onSubmit={(e) => {e.preventDefault();}}>
          <input type="text" onChange={(e) => {setSearchQuery(e.target.value); setLoading(true)}} value={searchQuery} placeholder="Search" />
          {searchResults ? <div className="x" onClick={clearValue}><span></span><span></span></div> : <div className="search-icon"><span></span></div> }
        </form>
        <div className="order-select">
        Sort by:&nbsp;<br/>
          <select onChange={(e)=>{sortFilter(e.target.value)}}>
            <option value="pub_date">Publish Date</option>
            <option value="score">Score</option>
          </select>
        </div>
      </div>
      <SearchFilters section={section} clearSection={clearSection} clearAuthor={clearAuthor} author={author}/>
      <SearchResults data={searchResults} loading={loading} clickSection={sectionFilter} clickAuthor={authorFilter} pageNum={pageNum} />
      <NavButtons links={links} paginateClick={paginateClick} pageNum={pageNum} author={author} />
    </div>
    <Footer />
    </div>
  );
}

export default App;
