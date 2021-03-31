import CustomModal from "../Components/CustomModal";
import ContextProfile from "../ContextStore/contextProfile";
import Todo from "/Components/Todo";

const { useState, useContext } = React;
const { isNil } = _;

const Home = (props) => {
  const profileContextData = useContext(ContextProfile);

  const [isOpenModal, setisOpenModal] = useState(true);

  const { profile } = profileContextData;

  return (
    <div className="home_container">
      <CustomModal
        isOpenModal={isOpenModal}
        title={"Bienvenido"}
        width="19em"
        height="8em"
        content={
          <div>
            <h3 className="text_align">
              {isNil(profile) === false && profile.userfullName}
            </h3>
          </div>
        }
        successButtonText={"Aceptar"}
        closeButtonText={"Cancelar"}
        onclickAccept={() => {
          setisOpenModal(false);
        }}
        onClose={() => {
          setisOpenModal(false);
        }}
      />
      <Todo />
    </div>
  );
};

export default Home;
