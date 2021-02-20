import React, {FC, useEffect} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {IMG_URL} from "../../utils/constants/url";
import {fetchPerfumes} from "../../redux/thunks/perfume-thunks"
import "./PerfumeCardsSlider.css";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Perfume} from "../../types/types";

const PerfumeCardsSlider: FC = () => {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);

    useEffect(() => {
        dispatch(fetchPerfumes());
    }, []);

    const addCarouselItems = (array: Array<Perfume>, counter: number) => {
        const perfumesId: Array<number> = [39, 56, 119, 59, 47, 95, 89, 98, 52, 40, 92, 99];

        return (
            <Carousel.Item>
                <div className="card-deck">
                    {array.map((perfume: Perfume) => {
                        for (let i = counter; i < counter + 4; i++) {
                            if (perfume.id === perfumesId[i]) {
                                return (
                                    <div className="card" key={perfume.id}>
                                        <img className="d-block mx-auto w-50"
                                             src={IMG_URL + `${perfume.filename}`}/>
                                        <div className="card-body text-center">
                                            <h5>{perfume.perfumeTitle}</h5>
                                            <h6>{perfume.perfumer}</h6>
                                            <h6>$<span>{perfume.price}</span>.00</h6>
                                            <Link to={`/product/${perfume.id}`}>
                                            <span className="btn btn-dark">
                                                SHOW MORE
                                            </span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </Carousel.Item>
        );
    };

    const settings = {controls: false}

    return (
        <div>
            <div className="container text-center my-3">
                <h3>PERSONALLY RECOMMENDED</h3>
            </div>
            <div className="container mt-5" id="indicators">
                <form method="get" action="/">
                    <Carousel {...settings}>
                        {addCarouselItems(perfumes, 0)}
                        {addCarouselItems(perfumes, 4)}
                        {addCarouselItems(perfumes, 8)}
                    </Carousel>
                </form>
            </div>
        </div>
    );
};

export default PerfumeCardsSlider;
