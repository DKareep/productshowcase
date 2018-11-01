import React, {Component} from "react";
import Slider from "react-slick";

class SimpleSlider extends Component {
    render() {
        var that = this;
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,
            lazyLoad: false,
            centerMode: true,
            // adaptiveHeight: true,
            // fade: true,
            className: 'slides',
            arrows: true,
            autoplaySpeed: 0,
            beforeChange: function (prevIndex, nextIndex) {
                if (nextIndex === (that.props.totalModels - 1)) {
                    that.props.loadSwimlineLoader(that.props.category, that.props.categoryIndex);
                }
            },
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Slider {...settings}>
                {this.props.children}
            </Slider>
        );
    }
}

export default SimpleSlider;
