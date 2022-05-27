import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    static propTypes = {
        children: PropTypes.number.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        const { handleBackdropClick } = this;
        const { children } = this.props;

        return createPortal(
            <div className="Overlay" onClick={handleBackdropClick}>
                <div className="Modal">{children}</div>
            </div>,
            modalRoot,
        );
    }
}