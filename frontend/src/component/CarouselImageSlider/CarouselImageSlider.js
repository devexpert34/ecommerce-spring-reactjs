import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";

const sliderItems = [
    {
        id: "98",
        name: "Photo 1",
        url: "https://i.ibb.co/Hn6VqJy/1million-4.jpg",
    },
    {
        id: "59",
        name: "Photo 2",
        url: "https://i.ibb.co/Sr0ZK34/dior5.jpg"
    },
];

const CarouselImageSlider = () => {
    const settings = {
        indicators: false,
        fade: true,
        infinite: true,
        interval: 3000
    }

    return (
        <div>
            <Carousel {...settings}>
                {sliderItems.map((item, index) => {
                    return (
                        <Carousel.Item key={item.id}>
                            <Link to={`/product/${item.id}`}>
                                <img className="d-block w-100" src={item.url} alt={item.name}/>
                            </Link>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    );
}

export default CarouselImageSlider;