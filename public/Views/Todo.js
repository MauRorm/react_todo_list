import useFetchTwo from "../CustomHooks/Fetch";
import CustomButton from "/Components/CustomButton";
import CustomModal from "../Components/CustomModal";
import CustomInput from "../Components/CustomInput";
import API_CONSTANTS from "../GlobalConstants/apiConstants";
import VALIDATION_CONSTANTS from "../GlobalConstants/validationConstants";
import {
  initialFormState, init, reducer,
} from '../UseReducers/todoReducer';

const { useEffect, useContext, useReducer } = React;

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
  const [state, dispatch] = useReducer(reducer, initialFormState, init);
  const {
    titleR,
    titleErrorTextR,
    messageR,
    messageErrorTextR,
    taskIdR,
    operationTypeR,
    isOpenModal,
    isOpenModalDelete,
  } = state;

  const sessionContextData = useContext(ContextSession);

  const OPTIONS = {
    headers: {
      Authorization: `Bearer ${sessionContextData.tokenSession}`,
    },
  };

  const [todoList, getApiTodoList] = useFetchTwo();

  const [taskInserted, postApiAddTaskToList] = useFetchTwo();

  const [taskUpdated, putApiUpdateTaskToList] = useFetchTwo();

  const [taskDeleted, deleteApiTaskToList] = useFetchTwo();

  useEffect(() => {
    getApiTodoList("get", API_CONSTANTS.API_TODO, OPTIONS);
  }, []);

  const onclearState = () => {
    dispatch({ type: "clearAll" });
  };

  const validateData = (title, message) => {
    let isSuccess = true;
    if (isNil(title) || isEmpty(title)) {
      dispatch({
        type: "setSTitleErrorText",
        data: VALIDATION_CONSTANTS.REQUIRE_FIELD,
      });
      isSuccess = false;
    }
    if (isNil(message) || isEmpty(message)) {
      isSuccess = false;
      dispatch({
        type: "setMessageErrorText",
        data: VALIDATION_CONSTANTS.REQUIRE_FIELD,
      });
    }
    return isSuccess;
  };

  const onSendTask = async () => {
    const isCompletedForm = validateData(titleR, messageR);
    if (isCompletedForm) {
      if (operationTypeR === "add") {
        await postApiAddTaskToList("post", API_CONSTANTS.API_TODO, OPTIONS, {
          id: uuidv4(),
          title: titleR,
          message: messageR,
        });
        onclearState();
        getApiTodoList("get", API_CONSTANTS.API_TODO, OPTIONS);
      } else if (operationTypeR === "update") {
        putApiUpdateTaskToList(
          "put",
          `${API_CONSTANTS.API_TODO}${taskIdR}`,
          OPTIONS,
          {
            id: taskIdR,
            title: titleR,
            message: messageR,
          }
        );
        onclearState();
        getApiTodoList("get", API_CONSTANTS.API_TODO, OPTIONS);
      }
    }
    return null;
  };

  const onDeleteTask = async () => {
    await deleteApiTaskToList(
      "delete",
      `${API_CONSTANTS.API_TODO}${taskIdR}`,
      OPTIONS
    );
    onclearState();
    getApiTodoList("get", API_CONSTANTS.API_TODO, OPTIONS);
  };

  return (
    <div>
      <div>
        <CustomModal
          isOpenModal={isOpenModal}
          title={operationTypeR === "add" ? "Añadir tarea" : "Actualizar tarea"}
          width="32em"
          height="15em"
          content={
            <div>
              <div className="input_div_form">
                <CustomInput
                  id="title"
                  value={titleR}
                  maxlength={15}
                  errorText={titleErrorTextR}
                  placeholder="Título"
                  textFieldColor={"#0c0b0b"}
                  onChange={(event, value) => {
                    dispatch({ type: "setTitle", data: value, count: 2 });
                    dispatch({ type: "setSTitleErrorText", data: "" });
                  }}
                  onBlur={(event, value) => {}}
                />
              </div>
              <br />
              <div className="input_div_form">
                <CustomInput
                  id="message"
                  maxlength={55}
                  value={messageR}
                  errorText={messageErrorTextR}
                  placeholder="Mensaje"
                  textFieldColor={"#0c0b0b"}
                  onChange={(event, value) => {
                    dispatch({ type: "setMessage", data: value });
                    dispatch({ type: "setMessageErrorText", data: "" });
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
            onclearState();
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
            onclearState();
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
              dispatch({ type: "setOperationType", data: "add" });
              dispatch({ type: "setIsOpenModal", data: true });
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
                      dispatch({ type: "setTaskId", data: item.id });
                      dispatch({ type: "setOperationType", data: "update" });
                      dispatch({ type: "setIsOpenModal", data: true });
                      dispatch({
                        type: "setTitle",
                        data: item.title,
                        count: 4,
                      });
                      dispatch({ type: "setMessage", data: item.message });
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
                      dispatch({ type: "setTaskId", data: item.id });
                      dispatch({ type: "setIsOpenModalDelete", data: true });
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
