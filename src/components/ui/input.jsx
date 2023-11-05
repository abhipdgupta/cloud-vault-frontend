import PropTypes from "prop-types";
const Input = ({ id, name, type, placeholder = "", value, onChange ,hidden=false ,...rest }) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl mb-4 ${hidden?'hidden':null}`}
      {...rest}
    />
  );
};
Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  hidden:PropTypes.bool,
  rest:PropTypes.any
};
export default Input;
