import { Drawer, List, Descriptions, Slider, Select } from 'antd';
import { fonts } from './default-config';

const { Option } = Select;

const Drawers = ({
  bookInfo,
  handleDrawer,
  jump,
  searchVisible,
  settinghVisible,
  listVisible,
  infoVisible,
  bookToc,
  setFontFamily,
  setFontSize,
}) => (
  <>
    <Drawer
      width={350}
      title="搜索"
      placement="right"
      onClose={() => handleDrawer('searchVisible', false)}
      visible={searchVisible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <Drawer
      width={350}
      title="设置"
      placement="right"
      onClose={() => handleDrawer('settinghVisible', false)}
      visible={settinghVisible}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="字体大小">
          <Slider
            step={2}
            max={36}
            min={12}
            defaultValue={16}
            onChange={setFontSize.bind(this)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="字体">
          <Select
            labelInValue
            defaultValue={{ value: 'heiti' }}
            style={{ width: 120 }}
            onChange={setFontFamily.bind(this)}
          >
            {fonts.map((font) => (
              <Option value={font.name} key={font.name}>
                {font.cname}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label="主题">{bookInfo.author}</Descriptions.Item>
      </Descriptions>
    </Drawer>
    <Drawer
      width={350}
      title="目录"
      placement="right"
      onClose={() => handleDrawer('listVisible', false)}
      visible={listVisible}
    >
      <List>
        {bookToc.map((toc) => (
          <List.Item key={toc.id} onClick={() => jump(toc.href)}>
            {toc.label}
          </List.Item>
        ))}
      </List>
    </Drawer>
    <Drawer
      width={350}
      title="图书信息"
      placement="right"
      onClose={() => handleDrawer('infoVisible', false)}
      visible={infoVisible}
    >
      <p>
        <img
          className="book-list-item-cover"
          src={bookInfo.cover}
          alt="cover"
        />
      </p>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="书名">{bookInfo.name}</Descriptions.Item>
        <Descriptions.Item label="作者">{bookInfo.author}</Descriptions.Item>
        <Descriptions.Item label="语言">{bookInfo.language}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  </>
);

export default Drawers;
