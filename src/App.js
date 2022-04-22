
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css';


function App(){
 
   const [offset, setOffset] = useState(0);
   const [jsons, setJsons] = useState([]);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0)


  const getData = async() => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      const data = res.data;
                const slice = data.slice(offset, offset + perPage);
               setJsons(slice);
                const postData = slice.map(pd =>   <div className="Post">
                  <b>{pd.title}</b>
                  <div className="Data">{pd.body}</div>
                </div>)
                setData(postData)
                setPageCount(Math.ceil(data.length / perPage))
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

const handleSearch = (event) => {
let value = event.target.value.toLowerCase();
console.log(value);

const values = jsons.filter(post => {
    if (value === '') {
      return post;
    } else if (post.title.toLowerCase().includes(value.toLowerCase())) {
      return post;
    }
  }).map((post, index) => (
      <div className="Post">
                  <b>{post.title}</b>
                  <div className="Data">{post.body}</div>
                </div>
  ))

if(values===""){

setData(<div className="Alert">Not Search Result Found</div>);
}
else{
setData(values);
}

}

 useEffect(() => {
   getData()
 }, [offset])


    return (

        <div className="Main">
            <div className="Header">
            <img  alt="Logo" src="https://uploads-ssl.webflow.com/61497ed722197739ab00ba42/62386c4613daa4f20a6d49de_Asset%2039.svg"/>
            <div className="Src">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/111px-Vector_search_icon.svg.png"  alt="Logo"/>
            <input type="text" onChange={(event) =>handleSearch(event)} placeholder="Search Your Post"/>
            </div>
            </div>

             <div className="Body">


      {data}
       <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>

        </div>

  );
}

export default App;
