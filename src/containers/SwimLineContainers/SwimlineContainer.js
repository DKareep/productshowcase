import React, {Component} from 'react';
import Logo from '../../components/Logo/Logo';
import Data from '../Data/Data';
import Modal from '../../components/Modal/Modal';
import './SwimlineContainer.css';

class SwimlineContainer extends Component {
    modalSet = () => {
        this.refs.modal.dataRefresh()
    };
    render() {
        return (
            <div>
                <Logo/>
                <Data  modalSet={this.modalSet}/>
                <Modal
                    ref="modal">
                                   </Modal>
            </div>
        );
    }
}

export default SwimlineContainer;
