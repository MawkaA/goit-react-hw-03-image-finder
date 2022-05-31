import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onOpenModal }) {
    return (
        <ul className="ImageGallery">
            {images.map(el => (
                <li className="ImageGalleryItem" key={el.id}>
                    <ImageGalleryItem image={el} onOpenModal={onOpenModal} />
                </li>
            ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images:  PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          webformatURL: PropTypes.string,
          tags: PropTypes.string,
        }).isRequired,
      ).isRequired,
    onOpenModal: PropTypes.func.isRequired,
};