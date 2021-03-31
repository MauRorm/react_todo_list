import ContextSession from "../ContextStore/contextSession";

const { useEffect, useContext } = React;
const Header = (props) => {
  const { userfullName } = props.profile;

  const { setIsSession } = useContext(ContextSession);

  useEffect(() => {}, []);

  return (
    <div id="header" className="header_container">
      <div className="header_username_div">
        <p>Bienvenido {userfullName}</p>
      </div>
      <div title="Cerrar sesión" className="close_session_div">
        <button
          className="cancel-button"
          onClick={() => {
            setIsSession(false);
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Header;
