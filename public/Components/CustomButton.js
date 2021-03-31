const { isNil, isEmpty } = _;

const CustomButton = ({
  buttonText = "",
  className = "",
  onClick = () => {},
  render,
}) => render(buttonText, className, onClick);

export default CustomButton;
