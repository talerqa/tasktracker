import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import { selectCaptcha, selectIsLoggedIn } from "features/auth/model/auth.selectors";
import s from "features/auth/ui/login/Login.module.css";
import { UseLogin } from "features/auth/lib/useLogin";

export const Login = () => {
  const { formik } = UseLogin();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const captcha = useSelector(selectCaptcha);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                disabled={!(formik.isValid && formik.dirty)}
                color={"primary"}
              >
                Login
              </Button>
              {captcha && (
                <>
                  <img src={`${captcha}`} alt="" />
                  <TextField label="captcha" margin="normal" {...formik.getFieldProps("captcha")} />
                </>
              )}
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
