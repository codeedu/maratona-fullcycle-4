// @flow
import * as React from "react";
import * as yup from "../util/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useSnackbar } from "notistack";
import { Category } from "../models";
import { useParams } from "react-router-dom";
import { authHttp } from "../util/http";
export interface CategoryModalProps {
  show: boolean;
  onClose: (categoryCreated?: Category) => void;
}
const validationSchema = yup.object().shape({
  name: yup.string().label("Nome").required(),
});
export const CategorySaveModal: React.FC<CategoryModalProps> = (props) => {
  const { serverId } = useParams();
  const { show: showProp, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = React.useState(showProp);

  React.useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  const handleClose = (categoryCreated: Category) => {
    setShow(false);
    onClose(categoryCreated);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { data: category } = await authHttp.post(
        `/servers/${serverId}/categories`,
        data
      );
      enqueueSnackbar("Categoria cadastrada!");
      handleClose(category);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(JSON.stringify(e));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} id="addCategoryModal">
      <Modal.Body>
        <h2>Criar Categoria</h2>
        <form className="form-modal" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              type="text"
              name="name"
              placeholder="Nome da categoria"
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
