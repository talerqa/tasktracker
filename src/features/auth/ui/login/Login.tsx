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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <FormControl>
            <FormLabel>
              <p className={s.textInfo}>
                Use common test account credentials or get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} className={s.link} target={"_blank"} rel="noreferrer">
                  here
                </a>
              </p>
              <p className={s.text}>
                {" "}
                Email: <span className={s.dataText}> free@samuraijs.com</span>
              </p>
              <p className={s.text}>
                Password: <span className={s.dataText}> free</span>
              </p>
            </FormLabel>
            <FormGroup>
              <TextField
                color={formik.touched.email && formik.errors.email ? "error" : "secondary"}
                variant="outlined"
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
              <TextField
                color={formik.touched.password && formik.errors.password ? "error" : "secondary"}
                variant="outlined"
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
              <FormControlLabel
                label={"Remember me"}
                className={s.formControl}
                control={
                  <Checkbox
                    color="success"
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#A2A2A223",
                  boxShadow: "black 0 0 5px",
                  fontWeight: "700",
                  marginTop: "15px",
                  color: "rgb(0, 0, 0)",
                }}
                variant="outlined"
                size="large"
                type={"submit"}
                className={s.button}
                disabled={!(formik.isValid && formik.dirty)}
                color={"primary"}
              >
                Login
              </Button>
              {captcha && (
                <>
                  <img src={`${captcha}`} alt="" />
                  <TextField
                    color="secondary"
                    variant="outlined"
                    label="captcha"
                    margin="normal"
                    {...formik.getFieldProps("captcha")}
                  />
                  <p className={s.error}>{formik.errors.captcha}</p>
                </>
              )}
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </div>
  );
};
