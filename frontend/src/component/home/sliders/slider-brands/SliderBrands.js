import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import {brandsItem1, brandsItem2, brandsItem3} from "./SliderBrandsData";
import "./SliderBrands.css";
import {Link} from "react-router-dom";

function SliderBrands(props) {

    const settings = {
        controls: false,
        indicators: true
    }

    return (
        <div className="container text-center my-3 mt-5">
            <h3>Бренды</h3>
            <Carousel {...settings}>
                <Carousel.Item className="row">
                    {brandsItem1.map((brand) => {
                        return (
                            <div className="col-2 float-left">
                                <Link to={{pathname: "/rest/menu", state: {id: brand.name}}}>
                                    <img className="img-fluid" src={brand.url} alt={brand.name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel.Item>
                <Carousel.Item className="row">
                    {brandsItem2.map((brand) => {
                        return (
                            <div className="col-2 float-left">
                                <Link to={{pathname: "/rest/menu", state: {id: brand.name}}}>
                                    <img className="img-fluid" src={brand.url} alt={brand.name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel.Item>
                <Carousel.Item className="row">
                    {brandsItem3.map((brand) => {
                        return (
                            <div className="col-2 float-left">
                                <Link to={{pathname: "/rest/menu", state: {id: brand.name}}}>
                                    <img className="img-fluid" src={brand.url} alt={brand.name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel.Item>

            </Carousel>
        </div>
    );
}

export default SliderBrands;