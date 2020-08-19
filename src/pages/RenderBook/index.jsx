import { withRouter } from 'react-router-dom';

const RenderBookPage = (props) => {
  console.log(props);
  return <div onClick={props.history.goBack}>book</div>;
};

export default withRouter(RenderBookPage);
