import React, {Component} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import Slider from '../../components/Slider';
import PropTypes from 'prop-types';
import * as SwimLineDataLoader from '../../store/actionCreators/SwimLines';
import './Data.scss';

class Data extends Component {
    componentDidMount() {
        this.props.fetchSwimLineData(this.props.categories, this.props.pageLoading, this.props.hasMoreCounter);
    }

    componentWillReceiveProps() {
        // console.log(this.props, 'props');
    }

    infiniteSwimLineLoader = () => {
        this.props.fetchInifinateSwimLineData(this.props.categories, this.props.swimLineLoading, this.props.hasMoreCounter, this.props.hasMore)
    };

    triggerModal(e) {

        this.props.setModalImage(e.currentTarget.dataset.thumb);
        // this.props.modalSet(e)
    }

    loadSwimlineLoader(category, categoryIndex) {
        // console.log(category, categoryIndex);
        this.props.fetchInifinateSwimLineTileData(category,categoryIndex, this.props.categories);

    }
    loadImages = (category, i) => {
        let totalModels = category.models.length;
        return (
            <div key={i}>
            <Modal />
                <div className="categoryContainer">
                    <h3 className="categoryContainer__name">{category.name}</h3>
                </div>
                <div data-category={category.name} key={i} className="tile">
                    <Slider key={i}
                            categoryIndex={i}
                            totalModels={totalModels}
                            category={category.name}
                            loadSwimlineLoader={this.loadSwimlineLoader.bind(this)}>
                        {category.models.map((item, i) => {
                            return (
                                <div
                                     className="tile__cover"
                                     onClick={(e) => {this.triggerModal(e)}}
                                     data-thumb={item.thumb}
                                     data-itemobject={item.obj}
                                     data-itemmtl={item.mtl} key={i}>
                                    <img src={item.thumb}
                                         data-thumb={item.thumb}
                                         data-itemobject={item.obj}
                                         data-itemmtl={item.mtl}
                                         className="tileCover__image"
                                         alt="scapic-3d-objects"/>
                                    <p className="tileCover__itemName">{item.name}</p>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        )

    };
    render() {
        let data = this.props.categories;
        let swimLines = [];
        for (let i = 0; i < this.props.categories.length; i++) {
            let load = this.loadImages(data[i], i);
            // console.log(load);
            swimLines.push(load);
        }
        return (
            <div className="InfinityScrollContainer">
                {this.props.pageLoading ? <Spinner/> :

                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={this.infiniteSwimLineLoader}
                        hasMore={this.props.hasMore}
                        loader={this.props.swimLineLoading ? <div className="loader" key={0}>Loading ...</div> : null}
                        useWindow={false}
                    >
                        {swimLines}
                    </InfiniteScroll>

                }
            </div>

        )
    }
}

Data.propTypes = {
    modalSet: PropTypes.func
};
const mapStateToProps = state => {
    return {
        pageLoading: state.pageLoading,
        swimLineLoading: state.swimLineLoading,
        hasMoreCounter: state.hasMoreCounter,
        categories: state.categories,
        hasMore: state.hasMore
    }

};

const mapDispatchToProps = dispatch => {
    return {
        setModalImage: (img) => dispatch(SwimLineDataLoader.setModalImage(img)),
        fetchSwimLineData: (categories, swimLineLoading, hasMoreCounter) => dispatch(SwimLineDataLoader.fetchSwimLineData(categories, swimLineLoading, hasMoreCounter)),
        fetchInifinateSwimLineData: (categories, swimLineLoading, hasMoreCounter, hasMore) => dispatch(SwimLineDataLoader.fetchSwimLineData(categories, swimLineLoading, hasMoreCounter, hasMore)),
        fetchInifinateSwimLineTileData: (category,categoryIndex, categories) => dispatch(SwimLineDataLoader.fetchSwimLineTilesData(category,categoryIndex, categories))

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Data);
