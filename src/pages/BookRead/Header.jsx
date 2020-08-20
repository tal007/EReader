import { PageHeader, Button, Drawer } from 'antd';
import {
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const Header = () => (
  <PageHeader
    title="name"
    className="header"
    extra={[
      <Button shape="circle" type="primary">
        <SearchOutlined />
      </Button>,
      <Button shape="circle" type="primary">
        <SettingOutlined />
      </Button>,
      <Button shape="circle" type="primary">
        <UnorderedListOutlined />
      </Button>,
      <Button shape="circle" type="primary">
        <InfoCircleOutlined />
      </Button>,
    ]}
  />
);

export default Header;
