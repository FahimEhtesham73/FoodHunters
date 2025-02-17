import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style={{zIndex:'10', position:"absolute", top: "50%", left:"50%", transform: "translate(-50%, -10%"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-info text-white bg-info" type="submit">Search</button>
                        </form>
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
            </div>

        </div>
    )
}
