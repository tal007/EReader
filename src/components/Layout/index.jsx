import { Layout } from 'antd';
import MySider from '../Sider';

const { Content } = Layout;

class MyLayout extends React.Component {
  render() {
    return (
      <Layout className="layout" style={{ margin: 20 }}>
        <MySider />
        <Layout>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
