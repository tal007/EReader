import { PageHeader, Button, Tooltip } from 'antd';
import {
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const Header = ({ bookInfo, handleDrawer }) => (
  <PageHeader
    title={bookInfo.title}
    className="header"
    extra={[
      <Tooltip title="搜索" key="search">
        <Button
          shape="circle"
          type="primary"
          onClick={() => handleDrawer('searchVisible', true)}
        >
          <SearchOutlined />
        </Button>
      </Tooltip>,
      <Tooltip title="设置" key="setting">
        <Button
          shape="circle"
          type="primary"
          onClick={() => handleDrawer('settinghVisible', true)}
        >
          <SettingOutlined />
        </Button>
      </Tooltip>,
      <Tooltip title="目录" key="list">
        <Button
          shape="circle"
          type="primary"
          onClick={() => handleDrawer('listVisible', true)}
        >
          <UnorderedListOutlined />
        </Button>
      </Tooltip>,
      <Tooltip title="图书信息" key="info">
        <Button
          shape="circle"
          type="primary"
          onClick={() => handleDrawer('infoVisible', true)}
        >
          <InfoCircleOutlined />
        </Button>
      </Tooltip>,
    ]}
  />
);

export default Header;
