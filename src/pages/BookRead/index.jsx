import { PageHeader, Button, Drawer, List, Tooltip } from 'antd';
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Epub from 'epubjs';

class BookRead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookToc: [],
      searchVisible: false,
      settinghVisible: false,
      listVisible: false,
      infoVisible: false,
    };
  }

  componentDidMount() {
    const THIS = this;
    const bookUrl = window.location.search.slice(9);
    const Book = new Epub(bookUrl);
    this.rendition = Book.renderTo('read', {
      width: '100%',
      height: '100%',
    });
    this.rendition.display();
    setTimeout(() => {
      const { toc } = Book.navigation;
      THIS.setState({
        bookToc: toc,
      });
    }, 100);
    window.addEventListener('keydown', this.keydown);
  }
  onSearchOpen = () => {
    this.setState({ searchVisible: true });
  };
  onSearchClose = () => {
    this.setState({ searchVisible: false });
  };
  onSettingOpen = () => {
    this.setState({ settinghVisible: true });
  };
  onSettingClose = () => {
    this.setState({ settinghVisible: false });
  };
  onListOpen = () => {
    this.setState({ listVisible: true });
  };
  onListClose = () => {
    this.setState({ listVisible: false });
  };
  onInfoOpen = () => {
    this.setState({ infoVisible: true });
  };
  onInfoClose = () => {
    this.setState({ infoVisible: false });
  };
  keydown(e) {
    const { keyCode } = e;
    switch (keyCode) {
      case 37:
      case 38:
        this.prevPage();
        break;
      case 39:
      case 40:
        this.nextPage();
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
    } = this.state;
    return (
      <section className="book-read">
        <div className="read-wrapper">
          <div id="read" />
        </div>
        <PageHeader
          title="name"
          className="header"
          extra={[
            <Tooltip title="搜索">
              <Button
                key="search"
                shape="circle"
                type="primary"
                onClick={this.onSearchOpen}
              >
                <SearchOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="设置">
              <Button
                key="setting"
                shape="circle"
                type="primary"
                onClick={this.onSettingOpen}
              >
                <SettingOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="目录">
              <Button
                key="list"
                shape="circle"
                type="primary"
                onClick={this.onListOpen}
              >
                <UnorderedListOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="图书信息">
              <Button
                key="info"
                shape="circle"
                type="primary"
                onClick={this.onInfoOpen}
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
          onClose={this.onSearchClose}
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
          onClose={this.onSettingClose}
          visible={settinghVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <Drawer
          width={350}
          title="目录"
          placement="right"
          onClose={this.onListClose}
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
          onClose={this.onInfoClose}
          visible={infoVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </section>
    );
  }
}
// const BookRead = () => {
//   const [showToolbar, setShowToolbar] = useState(false);
//   let navigation;
//   const handleShowToolbar = () => {
//     if (!navigation) {
//       navigation = Book.navigation.toc;
//     }
//     setIsShowChapterList(false);
//     setShowToolbar(!showToolbar);
//   };

//   const [isShowChapterList, setIsShowChapterList] = useState(false);
//   const showChapterList = () => {
//     setIsShowChapterList(!isShowChapterList);
//   };

//   );
// };

export default BookRead;
