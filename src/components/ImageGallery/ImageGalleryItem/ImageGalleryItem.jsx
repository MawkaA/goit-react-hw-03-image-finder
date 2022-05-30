
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
    image:  PropTypes.shape({
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
      }).isRequired,
    onOpenModal: PropTypes.func.isRequired,
};