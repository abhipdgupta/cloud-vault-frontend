import PropTypes from 'prop-types';

const Label = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className="text-gray-600 text-lg font-semibold">
      {text}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Label;
