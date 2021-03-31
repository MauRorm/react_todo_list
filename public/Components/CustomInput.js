const { isNil, isEmpty } = _;

const CustomInput = (props) => {
  const {
    value,
    onChange,
    onBlur,
    placeholder,
    id,
    textFieldColor,
    errorText,
    maxlength,
  } = props;
  return (
    <div className="form__group field">
      <input
        id={id}
        type="input"
        maxlength={maxlength ? maxlength : 500}
        className={
          isNil(errorText) === false && isEmpty(errorText) === false
            ? "form__field error_text_border"
            : "form__field"
        }
        style={{
          color: textFieldColor,
        }}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        autoComplete="false"
        onChange={(event) => {
          onChange(event, event.target.value);
        }}
        onBlur={(event) => {
          onBlur(event, event.target.value);
        }}
      />
      <label
        onClick={() => {
          document.getElementById(id).focus();
        }}
        for="name"
        className={
          isNil(errorText) === false && isEmpty(errorText) === false
            ? "form__label error_text_label"
            : "form__label"
        }
      >
        {placeholder}
      </label>
      <p style={{ color: "red" }} className="clear-marging-p">
        {errorText}
      </p>
    </div>
  );
};

export default CustomInput;