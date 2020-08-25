import {
  PageHeader,
  Button,
  Drawer,
  List,
  Tooltip,
  Descriptions,
  Slider,
  Select,
} from 'antd';
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Book as EBook } from 'epubjs';
import { getCoverURL } from '@util/bookUtil';
import DefaultImage from '@img/default.jpg';
import { fonts, fontSize } from './default-config';

const { Option } = Select;

class BookRead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookToc: [],
      searchVisible: false,
      settinghVisible: false,
      listVisible: false,
      infoVisible: false,
      bookInfo: {
        name: '未知',
        cover: DefaultImage,
        author: '未知',
        language: 'zh-CN',
      },
    };
  }

  componentDidMount() {
    const THIS = this;
    const bookUrl = window.location.search.slice(9);
    const Book = new EBook(bookUrl);
    getCoverURL(Book, (result) => {
      const { title, creator, language } = Book.packaging.metadata;
      const { toc } = Book.navigation;
      THIS.setState({
        bookInfo: {
          name: title,
          cover: result,
          author: creator,
          language,
        },
        bookToc: toc,
      });
    });
    this.rendition = Book.renderTo('read', {
      width: '100%',
      height: '100%',
    });
    console.log(this.rendition);
    this.rendition.display();
    window.addEventListener('keydown', this.keydown.bind(this));
  }
  setFontSize(size) {
    this.rendition.themes.fontSize(`${size}px`);
  }
  setFontFamily(family) {
    this.rendition.themes.font(family.label);
  }
  handleDrawer = (type, show) => {
    this.setState({
      [type]: show,
    });
  };
  keydown(e) {
    const THIS = this;
    const { keyCode } = e;
    switch (keyCode) {
      case 37:
      case 38:
        THIS.prevPage();
        break;
      case 39:
      case 40:
        THIS.nextPage();
        break;
      default:
    }
  }
  prevPage() {
    if (this.rendition) {
      this.rendition.prev();
    }
  }

  nextPage() {
    if (this.rendition) {
      this.rendition.next();
    }
  }
  jump(href) {
    this.rendition.display(href);
  }

  render() {
    const {
      bookToc,
      searchVisible,
      infoVisible,
      listVisible,
      settinghVisible,
      bookInfo,
    } = this.state;
    return (
      <section className="book-read">
        <div className="read-wrapper">
          <div id="read" />
        </div>
        <PageHeader
          // title={bookInfo.name}
          title={bookInfo.na}
          className="header"
          extra={[
            <Tooltip title="搜索" key="search">
              <Button
                shape="circle"
                type="primary"
                onClick={() => this.handleDrawer('searchVisible', true)}
              >
                <SearchOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="设置" key="setting">
              <Button
                shape="circle"
                type="primary"
                onClick={() => this.handleDrawer('settinghVisible', true)}
              >
                <SettingOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="目录" key="list">
              <Button
                shape="circle"
                type="primary"
                onClick={() => this.handleDrawer('listVisible', true)}
              >
                <UnorderedListOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="图书信息" key="info">
              <Button
                shape="circle"
                type="primary"
                onClick={() => this.handleDrawer('infoVisible', true)}
              >
                <InfoCircleOutlined />
              </Button>
            </Tooltip>,
          ]}
        />
        <div className="prev">
          <LeftCircleOutlined onClick={this.prevPage.bind(this)} />
        </div>
        <div className="next">
          <RightCircleOutlined onClick={this.nextPage.bind(this)} />
        </div>
        <Drawer
          width={350}
          title="搜索"
          placement="right"
          onClose={() => this.handleDrawer('searchVisible', false)}
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
          onClose={() => this.handleDrawer('settinghVisible', false)}
          visible={settinghVisible}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="字体大小">
              <Slider
                step={2}
                max={36}
                min={12}
                defaultValue={16}
                onChange={this.setFontSize.bind(this)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="字体">
              <Select
                labelInValue
                defaultValue={{ value: 'heiti' }}
                style={{ width: 120 }}
                onChange={this.setFontFamily.bind(this)}
              >
                {fonts.map((font) => (
                  <Option value={font.name} key={font.name}>
                    {font.cname}
                  </Option>
                ))}
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="主题">
              {bookInfo.author}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>
        <Drawer
          width={350}
          title="目录"
          placement="right"
          onClose={() => this.handleDrawer('listVisible', false)}
          visible={listVisible}
        >
          <List>
            {bookToc.map((toc) => (
              <List.Item key={toc.id} onClick={() => this.jump(toc.href)}>
                {toc.label}
              </List.Item>
            ))}
          </List>
        </Drawer>
        <Drawer
          width={350}
          title="图书信息"
          placement="right"
          onClose={() => this.handleDrawer('infoVisible', false)}
          visible={infoVisible}
        >
          <p>
            <img
              className="book-list-item-cover"
              src={bookInfo.cover || DefaultImage}
              alt="cover"
            />
          </p>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="书名">{bookInfo.name}</Descriptions.Item>
            <Descriptions.Item label="作者">
              {bookInfo.author}
            </Descriptions.Item>
            <Descriptions.Item label="语言">
              {bookInfo.language}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>
      </section>
    );
  }
}

export default BookRead;
