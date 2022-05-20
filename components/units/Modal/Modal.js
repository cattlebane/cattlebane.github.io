import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className="modal-backdrop" onClick={props.onClose}></div>;
};

const ProfileInputOverlay = (props) => {
  return <div className="modal">{props.content}</div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={() => {
            props.onClose();
          }}
        />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ProfileInputOverlay content={props.content} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default Modal;
