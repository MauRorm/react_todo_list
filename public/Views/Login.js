import useFetch from "../CustomHooks/Fetch";
import CustomInput from "../Components/CustomInput";
import ContextSession from "../ContextStore/contextSession";
import ContextProfile from "../ContextStore/contextProfile";
import API_CONSTANTS from "../GlobalConstants/apiConstants";
import VALIDATION_CONSTANTS from "../GlobalConstants/validationConstants";

const { useState, useEffect, useContext } = React;
const { isNil, isEmpty } = _;

const Login = (props) => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [userNameErrorText, setUserNameErrorText] = useState(null);
  const [passwordErrorText, setPasswordErrorText] = useState(null);
  const { setIsSession, setTokenSession } = useContext(ContextSession);
  const { setProfile } = useContext(ContextProfile);

  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);

  const [loginData] = useFetch(
    API_CONSTANTS.API_POST_LOGIN,
    "post",
    {
      email: isNil(userName) ? userName : userName.trim(),
      password: isNil(password) ? password : password.trim(),
    },
    {},
    shouldFetch,
    setShouldFetch
  );

  const OPTIONS = {
    headers: {
      Authorization: isNil(loginData) ? "" : `Bearer ${loginData.access_token}`,
    },
  };

  const [userData] = useFetch(
    API_CONSTANTS.API_GET_PROFILE,
    "get",
    null,
    OPTIONS,
    shouldFetchProfile,
    setShouldFetchProfile
  );

  useEffect(() => {
    if (loginData !== null) {
      if (loginData.isError === false) {
        setTokenSession(loginData.access_token);
        setShouldFetchProfile(true);
      } else {
        alert(loginData.message);
      }
    }
  }, [loginData]);

  useEffect(() => {
    if (userData !== null) {
      if (userData.isError === false) {
        setProfile(userData.result[0]);
        setIsSession(true);
        props.history.push("/home");
      }
    }
  }, [userData]);

  const onClickLogin = () => {
    const isCompletedForm = validateLoginData(userName, password);
    if (isCompletedForm) {
      setShouldFetch(true);
    }
    return null;
  };

  const validateLoginData = (user, pass) => {
    let isSuccess = true;
    if (isNil(user) || isEmpty(user)) {
      setUserNameErrorText(VALIDATION_CONSTANTS.REQUIRE_FIELD);
      isSuccess = false;
    }
    if (isNil(password) || isEmpty(password)) {
      isSuccess = false;
      setPasswordErrorText(VALIDATION_CONSTANTS.REQUIRE_FIELD);
    }
    return isSuccess;
  };

  return (
    <div className="login_container">
      <div className="login_form">
        <br />
        <div className="input_div_form">
          <CustomInput
            id="user"
            value={userName}
            errorText={userNameErrorText}
            placeholder="Usuario"
            textFieldColor={"#0c0b0b"}
            onChange={(event, value) => {
              setUserNameErrorText("");
              setUserName(value);
            }}
            onBlur={(event, value) => {}}
          />
        </div>
        <div className="input_div_form">
          <CustomInput
            id="pass"
            errorText={passwordErrorText}
            value={password}
            placeholder="Password"
            textFieldColor={"#0c0b0b"}
            onChange={(event, value) => {
              setPassword(value);
              setPasswordErrorText("");
            }}
            onBlur={(event, value) => {}}
          />
        </div>
        <br />
        <div className="full_width_div">
          <button
            className="success-button center-button"
            onClick={onClickLogin}
          >
            Iniciar sesión
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Login;
