import { Layout, Button, Menu } from 'antd';
import {
  PlusOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const MySider = () => {
  console.log('MySider loaded');
  return (
    <Sider className="custom-sider">
      <Button
        className="import"
        type="primary"
        icon={<PlusOutlined />}
        block
        size="large"
      >
        添加图书
      </Button>
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
};

export default MySider;
