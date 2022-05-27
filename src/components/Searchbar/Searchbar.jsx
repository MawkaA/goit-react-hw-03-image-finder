import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

 class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        searchQuery: '',
    };

    handleSearchQueryChange = e => {
        this.setState({ searchQuery: e.target.value.toLowerCase() });
    };

    handleSubmit = e => {
        const { searchQuery } = this.state;
        const { onSubmit } = this.props;

        e.preventDefault();

        if (searchQuery.trim() === '') {
            return toast.error('Please,enter the correct request!', {
                position: 'top-left',
            });
        }

        onSubmit(searchQuery);
        this.setState({ searchQuery: '' });
    };

    render() {
        const { handleSearchQueryChange, handleSubmit } = this;
        const { searchQuery } = this.state;

        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <input
                        onChange={handleSearchQueryChange}
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={searchQuery}
                        placeholder="Search images and photos"
                    />
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>
                </form>
            </header>
        );
    }
}

export default Searchbar;