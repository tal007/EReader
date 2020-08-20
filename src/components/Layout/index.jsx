import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import MySider from '../Sider';

const { Content } = Layout;

const { pathname } = window.location;
const containerStyle =
  pathname === '/read' ? { height: '100%' } : { height: '100%', padding: 20 };
class MyLayout extends React.Component {
  render() {
    return (
      <Layout className="layout" style={containerStyle}>
        <Route path="/" exact component={MySider} />
        <Layout>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
