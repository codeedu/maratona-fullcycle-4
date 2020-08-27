// @flow
import * as React from "react";
import * as yup from "../util/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useSnackbar } from "notistack";
import { Channel } from "../models";
import { authHttp } from "../util/http";
export interface ChannelModalProps {
  show: boolean;
  categoryId: string;
  onClose: (channelCreated?: Channel) => void;
}
const validationSchema = yup.object().shape({
  name: yup.string().label("Nome").required(),
});
export const ChannelSaveModal: React.FC<ChannelModalProps> = (props) => {
  const { show: showProp, onClose, categoryId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = React.useState(showProp);

  React.useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  const handleClose = (channelCreated: Channel) => {
    setShow(false);
    onClose(channelCreated);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { data: channel } = await authHttp.post(
        `/categories/${categoryId}/channels`,
        data
      );

      enqueueSnackbar("Canal cadastrado!");
      handleClose(channel);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(JSON.stringify(e));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} id="addChannelModal">
      <Modal.Body>
        <h2>Criar Canal</h2>
        <form className="form-modal" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              type="text"
              name="name"
              placeholder="Nome do canal"
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.name && errors.name.message}
            </div>
          </div>
          <button type="submit" className="btn-code-slack">
            Criar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
