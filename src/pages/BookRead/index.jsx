/* eslint-disable prettier/prettier */
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Book as EBook } from 'epubjs';
import { getCoverURL } from '@util/bookUtil';
import DefaultImage from '@img/default.jpg';
import storage from '@util/storage';
import BookSkeleton from './BookSkeleton';
import Header from './Header';
import Drawers from './Drawers';

class BookRead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookReady: false,
      bookToc: [],
      searchVisible: false,
      settinghVisible: false,
      listVisible: false,
      infoVisible: false,
      metadata: {},
      cover: DefaultImage,
      searchData: [],
    };
  }

  componentDidMount() {
    const THIS = this;

    const bookUrl = window.location.search.slice(9);
    const book = new EBook(bookUrl);
    this.book = book;

    this.rendition = book.renderTo('read', {
      width: '100%',
      height: '100%',
    });

    book.ready
      .then(() => {
        const { toc } = book.navigation;
        const { metadata } = book.packaging;
        const { title } = metadata;
        const bookStorage = storage.get(title);
        this.setState({
          bookToc: toc,
          metadata,
        });
        if (bookStorage) {
          this.rendition.display(bookStorage);
        } else {
          this.rendition.display();
        }
      })
      .then(() => {
        getCoverURL(book, (result) => {
          THIS.setState({
            cover: result || DefaultImage,
            bookReady: true,
          });
        });
      });
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
  setData = (type, data) => {
    this.setState({
      [type]: data
    });
  }
  savePosition = () => {
    const { title } = this.state.metadata;
    const currentLocation = this.rendition.currentLocation();
    storage.set(title, currentLocation.start.cfi);
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
      this.rendition.prev().then(() => {
        this.savePosition();
      });
    }
  }

  nextPage() {
    if (this.rendition) {
      this.rendition.next().then(() => {
        this.savePosition();
      });
    }
  }
  jump(href) {
    const THIS = this;
    this.handleDrawer('listVisible', false);
    this.rendition.display(href).then(() => {
      THIS.savePosition();
    });
  }
  search(q) {
    const { spineItems } = this.book.spine;
    return Promise.all(
      spineItems.map((spineItem) => spineItem
          .load(this.book.load.bind(this.book))
          .then(spineItem.find.bind(spineItem, q))
          .finally(spineItem.unload.bind(spineItem)))
    // eslint-disable-next-line prefer-spread
    ).then((result) => Promise.resolve([].concat.apply([], result)));
  }

  render() {
    const {
      bookReady,
      bookToc,
      searchVisible,
      infoVisible,
      listVisible,
      settinghVisible,
      metadata,
      cover,
      searchData
    } = this.state;
    if (!bookReady) {
      return <BookSkeleton />;
    }
    return (
      <section className="book-read">
        <div className="read-wrapper">
          <div id="read" />
        </div>
        <Header
          bookInfo={metadata}
          handleDrawer={this.handleDrawer.bind(this)}
        />
        <div className="prev">
          <LeftCircleOutlined onClick={this.prevPage.bind(this)} />
        </div>
        <div className="next">
          <RightCircleOutlined onClick={this.nextPage.bind(this)} />
        </div>
        <Drawers
          bookInfo={metadata}
          cover={cover}
          searchData={searchData}
          search={this.search.bind(this)}
          setData={this.setData.bind(this)}
          handleDrawer={this.handleDrawer.bind(this)}
          jump={this.jump.bind(this)}
          searchVisible={searchVisible}
          settinghVisible={settinghVisible}
          listVisible={listVisible}
          infoVisible={infoVisible}
          bookToc={bookToc}
          setFontFamily={this.setFontFamily.bind(this)}
          setFontSize={this.setFontFamily.bind(this)}
        />
      </section>
    );
  }
}

export default BookRead;
