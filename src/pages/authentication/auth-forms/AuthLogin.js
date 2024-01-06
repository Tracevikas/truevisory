import React from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { login } from 'store/reducers/Auth/signIn';
import { useDispatch } from 'react-redux';

const AuthLogin = () => {

  const [getValue, setValue] = React.useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    setValue({ ...getValue, [name]: value });
  }
  const dispatch = useDispatch();
  const checkValidation = () => {
    const _errors = errors;
    let isValidate = true;
    const emailRegex = new RegExp("^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w+)+$");
    if (!getValue.email || getValue.email.trim() == "") {
      _errors.email = 'Email is Required';
      isValidate = false;
    } else if (!emailRegex.test(getValue.email.trim())) {
      _errors.email = "Please Enter a Valid Email";
      isValidate = false;
    } else _errors.email = ""
    if (!getValue.password || getValue.password.trim() == "") {
      _errors.password = 'Password is Required';
      isValidate = false;
    } else _errors.password = ""
    setErrors({ ..._errors });
    return isValidate;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkValidation()) {
      alert('fail')
    } else {
      dispatch(login(getValue))
    }
  }

  return (<form noValidate onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <InputLabel htmlFor="email-login">Email Address</InputLabel>
          <OutlinedInput
            id="email-login"
            type="email"
            value={getValue.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter email address"
            fullWidth
            error={Boolean(errors.email)}
          />
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.email}
            </FormHelperText>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <InputLabel htmlFor="password-login">Password</InputLabel>
          <OutlinedInput
            fullWidth
            error={Boolean(errors.password)}
            id="-password-login"
            type={showPassword ? 'text' : 'password'}
            value={getValue.password}
            name="password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Enter password"
          />
          {errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {errors.password}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid> */}
      {errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>{errors.submit}</FormHelperText>
        </Grid>
      )}
      <Grid item xs={12}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
            Login
          </Button>
        </AnimateButton>
      </Grid>
      {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
    </Grid>
  </form>
  );
};

export default AuthLogin;
