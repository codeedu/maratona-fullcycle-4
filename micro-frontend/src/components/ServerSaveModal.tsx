// @flow
import * as React from "react";
import * as yup from "../util/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useSnackbar } from "notistack";
import { Server } from "../models";
import { authHttp } from "../util/http";
export interface ServerModalProps {
  show: boolean;
  onClose: (serverCreated?: Server) => void;
}
const validationSchema = yup.object().shape({
  name: yup.string().label("Nome").required(),
});
export const ServerSaveModal: React.FC<ServerModalProps> = (props) => {
  const { show: showProp, onClose } = props;
  //const axios = useAxios();
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = React.useState(showProp);

  React.useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  const handleClose = (serverCreated: Server) => {
    setShow(false);
    onClose(serverCreated);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    try {
      const { data: server } = await authHttp.post("/servers", formData);

      enqueueSnackbar("Grupo cadastrado!");
      handleClose(server);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(JSON.stringify(e));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} id="addgroupModal">
      <Modal.Body>
        <h2>Criar Grupo</h2>
        <form className="form-modal" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              type="text"
              name="name"
              placeholder="Nome do grupo"
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.name && errors.name.message}
            </div>
          </div>
          <div className="form-group">
            <input
              className={"form-control" + (errors.logo ? " is-invalid" : "")}
              type="file"
              name="logo"
              placeholder="Logo"
              ref={register}
              required
            />
          </div>
          <button type="submit" className="btn-code-slack">
            Criar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
