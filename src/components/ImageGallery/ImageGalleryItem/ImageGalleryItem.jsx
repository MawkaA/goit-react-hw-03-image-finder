
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, onOpenModal }) {
    return (
        <img
            onClick={() => onOpenModal(image)}
            src={image.webformatURL}
            alt={image.tags}
            className="ImageGalleryItem-image"
        />
    );
}

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
    onOpenModal: PropTypes.func.isRequired,
};