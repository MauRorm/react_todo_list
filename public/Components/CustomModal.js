const { isNil, isEmpty } = _;


const CustomModal = (props) => {

  const {
    width,
    height,
    onclickAccept,
  } = props;

  if (props.isOpenModal) {
    return (
      <div
        id="modal-container"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: "2",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            margin: "5% auto 0%",
            zIndex: "3",
            width: width ? width : "32em",
            height: height ? height : "20em",
            backgroundColor: "white",
            opacity: "1",
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>{props.title}</h3>

          {props.content}

          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 0,
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <div
              title={props.successButtonText}
              style={{
                margin: "24px 20px 0px",
              }}
            >
              <button
                className="success-button"
                onClick={() => {
                  props.onclickAccept();
                }}
              >
                <p className="clear-marging-p">{props.successButtonText}</p>
              </button>
            </div>

            <div
              title={props.closeButtonText}
              style={{
                margin: "24px 20px 0px",
              }}
            >
              <button
                className="cancel-button"
                onClick={() => {
                  props.onClose();
                }}
              >
                <p className="clear-marging-p">{props.closeButtonText}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CustomModal;

/*
  if (props.isOpenModal) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: "2",
          position: "fixed",
        }}
      >
        <div
          style={{
            margin: "5% auto 0%",
            zIndex: "3",
            width: "32em",
            height: "20em",
            backgroundColor: "white",
            opacity: "1",
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>{props.title}</h3>

          {props.content}

          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 0,
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <div
              title={props.successButtonText}
              style={{
                margin: "24px 20px 0px",
              }}
            >
              <div
                className="success-button"
                onClick={() => {
                  props.onClose();
                }}
              >
                <p className="clear-marging-p">{props.successButtonText}</p>
              </div>
            </div>

            <div
              title={props.closeButtonText}
              style={{
                margin: "24px 20px 0px",
              }}
            >
              <div
                className="cancel-button"
                onClick={() => {
                  props.onClose();
                }}
              >
                <p className="clear-marging-p">{props.closeButtonText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
*/