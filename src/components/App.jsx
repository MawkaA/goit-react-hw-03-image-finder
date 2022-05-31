import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchPictures } from '../services/PicturesAPI';
import scrollPageDown from '../scrollPageDown';
import styles from './App.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

class App extends Component {
    state = {
        searchQuery: '',
        page: 1,
        images: [],
        error:'',
        loading: false,
        showModal: false,
        largeImage: {},
    };

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.state;

        if (searchQuery !== prevState.searchQuery) {
            this.fetchImages()
                .catch(error => console.error(error),
                alert('Picture is not found, try again'))
                .finally(() => this.setState({ loading: false }));
        }
    }

    fetchImages = () => {
        const { searchQuery, page } = this.state;

        this.setState({ loading: true });

        return fetchPictures(searchQuery, page).then(images => {
            console.log(images);
            this.setState(prevState => ({
                images: [...prevState.images, ...images],
                page: prevState.page + 1,
            }));
        });
    };

    handlerFormSubmit = searchQuery =>
        this.setState({ searchQuery, page: 1, images: [] });

    handleOpenModal = largeImage => {
        this.setState({ largeImage });
        this.toggleModal();
    };

    handleOnLoadClick = () => {
        this.setState({ loading: true });
        this.fetchImages()
            .then(() => scrollPageDown())
            .catch(this.setState({ error: 'Picture not found' }))
            .finally(() => this.setState({ loading: false }));
    };

    toggleModal = () =>
        this.setState(({ showModal }) => ({ showModal: !showModal }));

    hideLoaderInModal = () => this.setState({ loading: false });

    render() {
        const {
            handlerFormSubmit,
            handleOpenModal,
            handleOnLoadClick,
            toggleModal,
            hideLoaderInModal,
        } = this;
        const { images, loading, showModal, largeImage } = this.state;

        return (
            <div className={styles.App}>
                <ToastContainer autoClose={3000} />
                <Searchbar onSubmit={handlerFormSubmit} />
                {loading && (  <Loader />)}
                {images.length !== 0 && (
                    <ImageGallery
                        images={images}
                        onOpenModal={handleOpenModal}
                    />
                )}
                {loading && !showModal && (
                    <Loader />
                )}
                {!loading && images[0] && (
                    
                    <Button onClick={handleOnLoadClick} text="Load more"/>
                   
                )}

                {showModal && (
                    <Modal onClose={toggleModal}>
                        {loading && ( <Loader  />)}
                        <img
                            src={largeImage.largeImageURL}
                            alt={largeImage.tags}
                            onLoad={hideLoaderInModal}
                        />
                    </Modal>
                )}
            </div>
        );
    }
}

export default App;