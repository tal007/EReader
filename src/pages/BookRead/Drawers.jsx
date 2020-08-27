import { useState } from 'react';
import {
  Drawer,
  List,
  Descriptions,
  Slider,
  Select,
  Input,
  message,
} from 'antd';
import { fonts } from './default-config';

const { Option } = Select;
const { Search } = Input;

const Drawers = ({
  bookInfo,
  cover,
  handleDrawer,
  jump,
  searchVisible,
  settinghVisible,
  listVisible,
  infoVisible,
  bookToc,
  setFontFamily,
  setFontSize,
  searchData,
  search,
  setData,
}) => {
  const [searchText, setSearchText] = useState('');

  function recursionToc(toc) {
    const { subitems } = toc;
    if (subitems && subitems.length) {
      return (
        <List
          key={toc.id}
          header={<span className="list-header-text">{toc.label}</span>}
        >
          {subitems.map((subitem) => recursionToc(subitem))}
        </List>
      );
    }
    return (
      <List.Item key={toc.id} onClick={() => jump(toc.href)}>
        {toc.label}
      </List.Item>
    );
  }

  return (
    <>
      <Drawer
        width={350}
        title="搜索"
        placement="right"
        onClose={() => handleDrawer('searchVisible', false)}
        visible={searchVisible}
      >
        <Search
          placeholder="输入要搜索的内容"
          enterButton
          onSearch={(value) => {
            if (!value.length) {
              message.warning('请输入搜索内容');
              return;
            }
            setSearchText(value);
            search(value).then((result) => {
              setData('searchData', result);
            });
          }}
        />
        <List>
          {searchData.map((toc) => (
            <List.Item key={toc.cfi} onClick={() => jump(toc.cfi)}>
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: toc.excerpt.replace(
                    searchText,
                    `<strong class="keywords">${searchText}</strong>`
                  ),
                }}
              />
            </List.Item>
          ))}
        </List>
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
          {/* <Descriptions.Item label="主题">{bookInfo.creator}</Descriptions.Item> */}
        </Descriptions>
      </Drawer>
      <Drawer
        width={350}
        title="目录"
        placement="right"
        onClose={() => handleDrawer('listVisible', false)}
        visible={listVisible}
      >
        <List header={<span className="list-header-text">总目录</span>}>
          {bookToc.map((toc) => recursionToc(toc))}
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
          <img className="book-list-item-cover" src={cover} alt="cover" />
        </p>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="书名">{bookInfo.title}</Descriptions.Item>
          <Descriptions.Item label="作者">{bookInfo.creator}</Descriptions.Item>
          <Descriptions.Item label="语言">
            {bookInfo.language}
          </Descriptions.Item>
          <Descriptions.Item label="出版社">
            {bookInfo.publisher}
          </Descriptions.Item>
          <Descriptions.Item label="出版日期">
            {bookInfo.pubdate}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default Drawers;
