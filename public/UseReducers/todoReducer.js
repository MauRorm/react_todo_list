const initialFormState = {
    titleR: null,
    titleErrorTextR: null,
    messageR: null,
    messageErrorTextR: null,
    taskIdR: null,
  };
  
  function init() {
    return initialFormState;
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case "setTitle":
        return {
          titleR: action.data,
          titleErrorTextR: state.titleErrorTextR,
          messageR: state.messageR,
          messageErrorTextR: state.messageErrorTextR,
          taskIdR: state.taskIdR,
          operationTypeR: state.operationTypeR,
          isOpenModal: state.isOpenModal,
          isOpenModalDelete: state.isOpenModalDelete,
        };
      case "setSTitleErrorText":
        return {
          titleR: state.titleR,
          titleErrorTextR: action.data,
          messageR: state.messageR,
          messageErrorTextR: state.messageErrorTextR,
          taskIdR: state.taskIdR,
          operationTypeR: state.operationTypeR,
          isOpenModal: state.isOpenModal,
          isOpenModalDelete: state.isOpenModalDelete,
        };
      case "setMessage":
        return {
          titleR: state.titleR,
          titleErrorTextR: state.titleErrorTextR,
          messageR: action.data,
          messageErrorTextR: state.messageErrorTextR,
          taskIdR: state.taskIdR,
          operationTypeR: state.operationTypeR,
          isOpenModal: state.isOpenModal,
          isOpenModalDelete: state.isOpenModalDelete,
        };
      case "setMessageErrorText":
        return {
          titleR: state.titleR,
          titleErrorTextR: state.titleErrorTextR,
          messageR: state.messageR,
          messageErrorTextR: action.data,
          taskIdR: state.taskIdR,
          operationTypeR: state.operationTypeR,
          isOpenModal: state.isOpenModal,
          isOpenModalDelete: state.isOpenModalDelete,
        };
      case "setTaskId":
        return {
          titleR: state.titleR,
          titleErrorTextR: state.titleErrorTextR,
          messageR: state.messageR,
          messageErrorTextR: state.messageErrorTextR,
          taskIdR: action.data,
          operationTypeR: state.operationTypeR,
          isOpenModal: state.isOpenModal,
          isOpenModalDelete: state.isOpenModalDelete,
        };
      case "setOperationType":
        return {
          titleR: state.titleR,
          titleErrorTextR: state.titleErrorTextR,
          messageR: state.messageR,
          messageErrorTextR: state.messageErrorTextR,
          taskIdR: state.taskIdR,
          operationTypeR: action.data,
          isOpenModal: state.isOpenModal,
          isOpenModalDelete: state.isOpenModalDelete,
        };
        case "setIsOpenModal":
          return {
            titleR: state.titleR,
            titleErrorTextR: state.titleErrorTextR,
            messageR: state.messageR,
            messageErrorTextR: state.messageErrorTextR,
            taskIdR: state.taskIdR,
            operationTypeR: state.operationTypeR,
            isOpenModal: action.data,
            isOpenModalDelete: state.isOpenModalDelete,
          };
          case "setIsOpenModalDelete":
            return {
              titleR: state.titleR,
              titleErrorTextR: state.titleErrorTextR,
              messageR: state.messageR,
              messageErrorTextR: state.messageErrorTextR,
              taskIdR: state.taskIdR,
              operationTypeR: state.operationTypeR,
              isOpenModal: state.isOpenModal,
              isOpenModalDelete: action.data,
            };
      case "clearAll":
        return init();
      default:
        throw new Error();
    }
  }

  export {
    initialFormState,
    init,
    reducer,
  }