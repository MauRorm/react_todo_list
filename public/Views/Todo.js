import useFetch from "../CustomHooks/Fetch";
import CustomButton from "/Components/CustomButton";
import CustomModal from "../Components/CustomModal";
import CustomInput from "../Components/CustomInput";
import API_CONSTANTS from "../GlobalConstants/apiConstants";
import VALIDATION_CONSTANTS from "../GlobalConstants/validationConstants";

const { useState, useEffect, useContext } = React;

const { isNil, isEmpty } = _;
import ContextSession from "../ContextStore/contextSession";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Todo = (props) => {
  const [isGetTodo, setIsGetTodo] = useState(false);
  const [isPostTodo, setIsPostTodo] = useState(false);
  const [isPatchTodo, setIsPatchTodo] = useState(false);
  const [isDeleteTodo, setIsDeleteTodo] = useState(false);

  const sessionContextData = useContext(ContextSession);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [operationType, setOperationType] = useState(null);

  const [title, setTitle] = useState(null);
  const [titleErrorText, setTitleErrorText] = useState(null);

  const [message, setMessage] = useState(null);
  const [messageErrorText, setMessageErrorText] = useState(null);

  const [taskId, setTaskId] = useState(null);

  const OPTIONS = {
    headers: {
      Authorization: `Bearer ${sessionContextData.tokenSession}`,
    },
  };

  const [todoList] = useFetch(
    API_CONSTANTS.API_TODO,
    "get",
    null,
    OPTIONS,
    isGetTodo,
    setIsGetTodo
  );

  const [taskInserted] = useFetch(
    API_CONSTANTS.API_TODO,
    "post",
    {
      id: uuidv4(),
      title,
      message,
    },
    OPTIONS,
    isPostTodo,
    setIsPostTodo
  );

  const [taskUpdated] = useFetch(
    `${API_CONSTANTS.API_TODO}${taskId}`,
    "put",
    {
      id: taskId,
      title,
      message,
    },
    OPTIONS,
    isPatchTodo,
    setIsPatchTodo
  );
  const [taskDeleted] = useFetch(
    `${API_CONSTANTS.API_TODO}${taskId}`,
    "delete",
    null,
    OPTIONS,
    isDeleteTodo,
    setIsDeleteTodo
  );

  useEffect(() => {
    setIsGetTodo(true);
  }, []);

  const onclearState = ()=>{
    setIsGetTodo(true);
    setIsOpenModal(false);
    setTitle("");
    setTitleErrorText("");
    setMessage("");
    setMessageErrorText("");
    setOperationType(null);
    setTaskId(null);
  }

  useEffect(() => {
    onclearState();
  }, [taskInserted]);

  useEffect(() => {
    onclearState();
  }, [taskUpdated]);

  useEffect(() => {
    setIsGetTodo(true);
    setIsOpenModalDelete(false);
    setTaskId(null);
  }, [taskDeleted]);

  const validateData = (title, message) => {
    let isSuccess = true;
    if (isNil(title) || isEmpty(title)) {
      setTitleErrorText(VALIDATION_CONSTANTS.REQUIRE_FIELD);
      isSuccess = false;
    }
    if (isNil(message) || isEmpty(message)) {
      isSuccess = false;
      setMessageErrorText(VALIDATION_CONSTANTS.REQUIRE_FIELD);
    }
    return isSuccess;
  };

  const onSendTask = () => {
    const isCompletedForm = validateData(title, message);
    if (isCompletedForm) {
      if (operationType === "add") {
        setIsPostTodo(true);
      } else {
        setIsPatchTodo(true);
      }
    }
    return null;
  };

  const onDeleteTask = () => {
    setIsDeleteTodo(true);
  };

  return (
    <div>
      <div>
        <CustomModal
          isOpenModal={isOpenModal}
          title={operationType === "add" ? "Añadir tarea" : "Actualizar tarea"}
          width="32em"
          height="15em"
          content={
            <div>
              <div className="input_div_form">
                <CustomInput
                  id="title"
                  value={title}
                  maxlength={15}
                  errorText={titleErrorText}
                  placeholder="Título"
                  textFieldColor={"#0c0b0b"}
                  onChange={(event, value) => {
                    setTitleErrorText("");
                    setTitle(value);
                  }}
                  onBlur={(event, value) => {}}
                />
              </div>
              <br />
              <div className="input_div_form">
                <CustomInput
                  id="message"
                  maxlength={55}
                  value={message}
                  errorText={messageErrorText}
                  placeholder="Mensaje"
                  textFieldColor={"#0c0b0b"}
                  onChange={(event, value) => {
                    setMessageErrorText("");
                    setMessage(value);
                  }}
                  onBlur={(event, value) => {}}
                />
              </div>
            </div>
          }
          successButtonText={"Aceptar"}
          closeButtonText={"Cancelar"}
          onclickAccept={onSendTask}
          onClose={() => {
            setTaskId(null);
            setOperationType(null);
            setIsOpenModal(false);
            setTitle("");
            setTitleErrorText("");
            setMessage("");
            setMessageErrorText("");
          }}
        />
        <CustomModal
          isOpenModal={isOpenModalDelete}
          title={"Eliminar tarea"}
          width="18em"
          height="7em"
          content={
            <div style={{ textAlign: "center" }}>
              <p>¿Está seguro que desea eliminar la tarea?</p>
            </div>
          }
          successButtonText={"Aceptar"}
          closeButtonText={"Cancelar"}
          onclickAccept={onDeleteTask}
          onClose={() => {
            setIsOpenModalDelete(false);
            setTaskId(null);
          }}
        />
        <div style={{ display: "inline-block" }}>
          <CustomButton
            render={(buttonText, className, onClick) => (
              <button className={className} onClick={onClick}>
                {buttonText}
              </button>
            )}
            onClick={() => {
              setOperationType("add");
              setIsOpenModal(true);
            }}
            className="success-button center-button"
            buttonText="Añadir tarea +"
          />
        </div>
        <br />
        <hr />
        {isNil(todoList) === false && isEmpty(todoList.result) === false ? (
          todoList.result.map((item) => {
            return (
              <div>
                <div className="todo_list_div">
                  <p className="clear-marging-p todo_list_title_div">
                    Título: {item.title}
                  </p>
                  <p className="clear-marging-p todo_list_message_div">
                    Mensaje: {item.message}
                  </p>
                  <CustomButton
                    render={(buttonText, className, onClick) => (
                      <button className={className} onClick={onClick}>
                        {buttonText}
                      </button>
                    )}
                    onClick={() => {
                      setTaskId(item.id);
                      setOperationType("update");
                      setIsOpenModal(true);
                      setTitle(item.title);
                      setMessage(item.message);
                    }}
                    className="success-button todo_list_button_div"
                    buttonText="Actualizar tarea"
                  />
                  &nbsp;&nbsp;
                  <CustomButton
                    render={(buttonText, className, onClick) => (
                      <button className={className} onClick={onClick}>
                        {buttonText}
                      </button>
                    )}
                    onClick={() => {
                      setTaskId(item.id);
                      setIsOpenModalDelete(true);
                    }}
                    className="cancel-button todo_list_button_div"
                    buttonText="Eliminar tarea"
                  />
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          <h3 className="text_align">Añade una tarea para comenzar</h3>
        )}
      </div>
    </div>
  );
};

export default Todo;
