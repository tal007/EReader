import { Layout, Menu } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import AddBooks from '@comp/AddBooks';

const { Sider } = Layout;

class MySider extends React.PureComponent {
  render() {
    return (
      <Sider className="custom-sider">
        <AddBooks setBooks={this.props.setBooks.bind(this)} />
        <h2 className="label">书架</h2>
        <Menu defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<SmileOutlined />}>
            全部图书
          </Menu.Item>
          <Menu.Item key="2" icon={<MehOutlined />}>
            未分类
          </Menu.Item>
          <Menu.Item key="3" icon={<FrownOutlined />}>
            管理
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default MySider;
