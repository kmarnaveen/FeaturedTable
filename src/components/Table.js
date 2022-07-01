import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Table.css'




function Table({setDetails}) {
  const [data,setData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [pageNumberLimit,setPageNumberLimit]=useState(5);
  const [maxPageNumberLimit,setMaxPageNumberLimit]=useState(5);
  const [minPageNumberLimit,setMinPageNumberLimit]=useState(0);
  const [filterVal,setFilterVal]=useState('');
  const [searchApiData,setSearchApiData]=useState([]);
 

  const handleClick=(e)=>{
    setCurrentPage(Number(e.target.id))
  }

  const handleNext=()=>{
    setCurrentPage(currentPage+1)
  
    if(currentPage+1>maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
    }
  }
  
  const handlePrev=()=>{
    setCurrentPage(currentPage-1)
  
    if((currentPage-1)%pageNumberLimit===0){
      setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
    }
  }

  const handleFilter=(e)=>{
    if(e.target.value ===''){
      setData(searchApiData)
    }
    else{
      const filterResult = searchApiData.filter(item=>item.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.last_name.toLowerCase().includes(e.target.value.toLowerCase()))
      setData(filterResult)    
    }
    setFilterVal(e.target.value)
  }
  const handleDescending=(col)=>{
    const sorted = [...data].sort((a,b)=>
    a[col]<b[col] ? 1: -1
    );
    setData(sorted);   
  }
  
  const handleAscending=(col)=>{
    const sorted = [...data].sort((a,b)=>
    a[col]>b[col] ? 1: -1
    );
    setData(sorted);    
  }
  const itemsPerPage=20

  const pages=[];
  for(let i=1; i<=Math.ceil(data.length/itemsPerPage);i++){
    pages.push(i);
  }

  const indexOfLastItem= currentPage*itemsPerPage;
  const indexOfFirstItem=indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem,indexOfLastItem);


const renderPageNumbers=pages.map((number)=>{
    if(number<maxPageNumberLimit+1 && number>minPageNumberLimit){
      return(
        <li key={number} id={number} onClick={handleClick}
    className={currentPage === number ? "active": null}>
      {number}
    </li>
      )
    }
    else{
      return null;
    }
  
})



  useEffect(()=>{
    fetch("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json")
    .then((res)=>res.json())
    .then((response)=>{
      setData(response)
      setSearchApiData(response)
    });
  },[])
  

  const renderData=data=>{
return(
  <>
  <input placeholder='Search by First or Last Name' value={filterVal} onChange={(e)=>handleFilter(e)} />
  <table className="table table-hover">
        <thead>
          <tr className='text-center'>
            <th>S. No</th>
            <th className='first_name'> First Name 
            <svg onClick={()=>handleDescending("first_name")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>
<svg onClick={()=>handleAscending("first_name")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
</th>
            <th className='last_name'>Last Name 
            <svg onClick={()=>handleDescending("last_name")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>
<svg onClick={()=>handleAscending("last_name")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
            </th>

            <th className='age' >Age
            <svg onClick={()=>handleDescending("age")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>
<svg onClick={()=>handleAscending("age")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
            </th>

            <th className='email'>
              E-mail
              <svg onClick={()=>handleDescending("email")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>
<svg onClick={()=>handleAscending("email")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
              </th>

            <th className='website'>Website
            <svg onClick={()=>handleDescending("web")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>
<svg onClick={()=>handleAscending("web")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
            </th>

          </tr>
        </thead>
        {data !== "" && data.map((el) => {
            return (
              <tbody>
                <tr>
                  <td>{el.id}</td>
                  <td className='first_name '><Link to={"/Details/" + el.id}>{el.first_name}</Link></td>
                  <td className='last_name'>{el.last_name}</td>
                  <td className='age'>{el.age}</td>
                  <td className='email'>{el.email}</td>
                  <td className='website'><a href={el.web} target="blank">{el.web}</a></td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </>
)
}

  return (
    <>
    <h1>Users</h1>

   {renderData(currentItems)}
   <ul className='pageNumbers'>
    <li>
      <button onClick={handlePrev} disabled={currentPage===pages[0]? true : false }>
        Prev.
      </button>
    </li>
  
    {renderPageNumbers}

    <li>
      <button onClick={handleNext} disabled={currentPage===pages[pages.length-1]? true : false }>
        Next
      </button>
    </li>
   </ul>
    </>
  )
}

export default Table;