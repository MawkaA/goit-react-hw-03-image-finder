import PropTypes from 'prop-types';
import css from './Button.module.css';
export default function Button({text, onClick }) {
    return (
        <div className={css.btnContainer}>
        <button className="Button" type="button" onClick={onClick}>
            {text}
        </button>
        </div>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};