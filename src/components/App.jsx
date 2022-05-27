
import React,{Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { fetchPictures } from '../services/PicturesAPI';


import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';


function scrollPageDown() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    });
}


class App extends Component {
  state = {
      searchQuery: '',
      page: 1,
      images: [],
      loading: false,
      showModal: false,
      largeImage: {},
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (searchQuery !== prevState.searchQuery) {
        this.fetchImages()
            .catch(error => console.log(error))
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
toggleModal = () =>
this.setState(({ showModal }) => ({ showModal: !showModal }));

hideLoaderInModal = () => this.setState({ loading: false });

handleOnLoadClick = () => {
this.setState({ loading: true });
this.fetchImages()
    .then(() => scrollPageDown())
    .catch(error => console.log(error))
    .finally(() => this.setState({ loading: false }));
};


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
      <>
           <ToastContainer autoClose={3000} />
                <Searchbar onSubmit={handlerFormSubmit} />
                {loading && (
                    <Loader
                        className="spinner"
                        type="Circles"
                        color="#00BFFF"
                        height={300}
                        width={300}
                    />
                )}
                {images.length !== 0 && (
                    <ImageGallery
                        images={images}
                        onOpenModal={handleOpenModal}
                    />
                )}
                 {loading && !showModal && (
                    <Loader
                        className="spinner"
                        type="Circles"
                        color="#00BFFF"
                        height={300}
                        width={300}
                    />
                )}
                {!loading && images[0] && (
                    <Button onClick={handleOnLoadClick} />
                )}

                {showModal && (
                    <Modal onClose={toggleModal}>
                        {loading && (
                            <Loader
                                className="spinner"
                                type="Circles"
                                color="#00BFFF"
                                height={300}
                                width={300}
                            />
                        )}
                        <img
                            src={largeImage.largeImageURL}
                            alt={largeImage.tags}
                            onLoad={hideLoaderInModal}
                        />
                    </Modal>
                )}
      </>
  );
}
}


export default App;
