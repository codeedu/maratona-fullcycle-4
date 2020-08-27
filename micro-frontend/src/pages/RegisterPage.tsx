// @flow
import * as React from "react";
import * as yup from "../util/yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { http } from "../util/http";

const validationSchema = yup.object().shape({
  name: yup.string().label("Nome").required(),
  email: yup.string().label("E-mail").required(),
  password: yup.string().label("Senha").required(),
});

export const RegisterPage: React.FC = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('photo', data.photo[0]);
    formData.append('password', data.password);
    await http.post("/users", formData);
    enqueueSnackbar("Usuário cadastrado!");
    history.push('/login');
  };

  return (
    <div className="login">
      <img src="./img/logo.png" className="logo" alt="Logo Code Slack" />
      <div className="container-login">
        <h2>Criar uma conta</h2>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              type="text"
              name="name"
              placeholder="Name"
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.name && errors.name.message}
            </div>
          </div>
          <div className="form-group">
            <input
              className={"form-control"}
              type="file"
              name="photo"
              placeholder="Foto de perfil"
              ref={register}
              required
            />
          </div>
          <div className="form-group">
            <input
              className={"form-control" + (errors.email ? " is-invalid" : "")}
              type="email"
              name="email"
              placeholder="E-mail"
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.email && errors.email.message}
            </div>
          </div>
          <div className="form-group">
            <input
              className={
                "form-control" + (errors.password ? " is-invalid" : "")
              }
              type="password"
              name="password"
              placeholder="Senha"
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.password && errors.password.message}
            </div>
          </div>
          <button type="submit" className="btn-code-slack">
            Registrar-se
          </button>
          <small className="form-text">
            <Link to="/login" title="Login">
              Login
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};
