// @flow
import * as React from "react";
import { Modal } from "react-bootstrap";
import { useSnackbar } from "notistack";
export interface InviteServerProps {
  show: boolean;
  serverId?: string;
  onClose: () => void;
}

export const InviteLinkModal: React.FC<InviteServerProps> = (props) => {
  const { show: showProp, onClose, serverId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = React.useState(showProp);
  const inputRef = React.useRef() as React.MutableRefObject<any>;
  React.useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const copyInviteLink = async (data: any) => {
    var copyText = inputRef.current;

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
    enqueueSnackbar("Link copiado com sucesso.");
  };

  return (
    <Modal show={show} onHide={handleClose} id="addCategoryModal">
      <Modal.Body>
        <h2>Link de convite</h2>
        <form className="form-modal">
          <div className="form-group">
            <input
              className={"form-control"}
              type="text"
              name="invite_url"
              readOnly={true}
              value={`${window.location.origin}/invite/${serverId}`}
              ref={inputRef}
            />
          </div>
          <button
            type="button"
            className="btn-code-slack"
            onClick={copyInviteLink}
          >
            Copiar endereço
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
