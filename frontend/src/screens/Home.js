import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import { Box, Button, Stack, Text, Pagination } from '@mui/material'


export default function Home() {

  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3


  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/foodlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      response = await response.json()
      setFoodItem(response[0])
      setFoodCat(response[1])
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setSearch('')
    setCurrentPage(1)
  }

  const filteredItems = foodItem.filter(
    (item) =>
      (selectedCategory === 'All' || item.CategoryName === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }


  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber)
    console.log("page", pageNumber);
  }
  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">
          <div className='carousel-caption' style={{ zIndex: '10', position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -10%" }}>
            <div className="d-flex justify-content-center">
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={search}
                onChange={handleSearchChange}
                style={{ maxWidth: '600px' }}
              />
              {/* <button className="btn btn-outline-info text-white bg-info" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="/images/12.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/13.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/8.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/7.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/6.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/1.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/4.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/3.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='category-sidebar'>
              <h5>Categories</h5>
              <ul className='list-group'>
                <li className={`list-group-item ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryClick('All')}>
                  All
                </li>
                {foodCat.map((category) => (
                  <li
                    key={category._id}
                    className={`list-group-item ${selectedCategory === category.CategoryName ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category.CategoryName)}
                  >
                    {category.CategoryName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='col-md-9'>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className='row mb-3'>
                {currentItems.length > 0 ? (
                  currentItems.map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'>
                      <Card foodItem={filterItems} options={filterItems.options[0]} />
                    </div>
                  ))
                ) : (
                  <div>No such Data Found</div>
                )}
              </div>
            )}
            <Stack spacing={2} alignItems="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#61dafb;'
                  },
                  '& .Mui-selected': {
                    color:'secondary'

                  },
                  '& .MuiPaginationItem-page:hover': {
                    backgroundColor: '#61dafb;',
                    color: 'white'
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
