// material-ui
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

  return (
    <>
      <img src={require('./b.png')} alt={`TrueVisory`} style={{ height: " 53px", display: "block", marginLeft: "46px", marginRight: "auto" }} />
    </>
  );
};

export default Logo;
