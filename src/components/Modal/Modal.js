import React, {Component} from 'react';
import './Modal.scss';
import {connect} from 'react-redux';
import * as SwimLineDataLoader from "../../store/actionCreators/SwimLines";
class Modal extends Component {
    state = {
            show: false
        };
    componentDidMount() {
        // console.log('loaded');
    }
    closeModal =() => {
        this.props.setModalImage()
    };
    dataRefresh = () => {
        // console.log('activated');
        this.setState({
            show: true
        })
    };
    render() {

        return (
            <div className="Modal"
                 style={
                     {
                         transform: this.props.image !== '' ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.image !== '' ? '1' : '0'
                     }
                 }>
                <div className="Modal__CloseBtn"
                     onClick={this.closeModal}>
                    <img alt="cls" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGmSURBVGhD7ZgxSsRAFIajlXgDESuxsBQ8gI0H0E5FELS09QiKveB23sAbeBg9gGKnoqj/W/ghLm+yeTMvmRHmg69IFt7kyy7JMk2lUqlU/gOr8ARuTY/8WYdHcGN6NBDb8Bn+wG94BT3Zg+9Q5n/CM+iORLxCWaTtNfRAIj5ge7bcLNeYUARNjdEiqFvMCnyB2iJtY2O6IqjE7MIkDqE2XNMa0yeC3sIk5Okkd0Qbrtk3xhIhnsNkLqE2POS8GGvEA1yCLsjFaYuEDMXERCxDV1JjioggsTFFRRBrzD0sLoJYY/o6agTxjskSQbxiskaQ1JgiIkhsTFERRJ5O2sWGfITFRVjfE1S+yWKIjaBFxKRG0KwxXhE0S4x3BB01xhrxpJzrcpQYawTfE3Jx2uchB42JjSBFxKRGkKwxXhEkS8wafIPaApp9/ztZYw5gEpZ9rb4RxBIzgUlswi+oDW9rjSB9Y45hMqewa5MuNoLMi7mDC9AF2UjWYlIjSChGIhahK7MxXhFkNmaQCLIDb+AFdNvGbLEPZcNafs6DRVQqlUql8pem+QVGFHzDJr/5MAAAAABJRU5ErkJggg=="/></div>

                <img id="entity" width="400px" height="400px" className="entity" src={this.props.image} alt="modalImage"/>

            </div>

        )
    }

}
const mapStateToProps = state => {
    return {
        image: state.modalImage
    }

};
const mapDispatchToProps = dispatch => {
    return {
        setModalImage: () => dispatch(SwimLineDataLoader.setModalImage('')),
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(Modal);


