import { useState, useEffect } from 'react';
import { PageHeader, Button, Drawer } from 'antd';
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Epub from 'epubjs';

const BookRead = () => {
  const bookUrl = window.location.search.slice(9);
  const Book = new Epub(bookUrl);
  console.log(Book);
  const rendition = Book.renderTo('read', {
    width: '100%',
    height: '100%',
  });
  rendition.display();

  Book.getToc();

  const prevPage = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  const nextPage = () => {
    if (rendition) {
      rendition.next();
    }
  };

  useEffect(() => {
    function keydown(e) {
      const { keyCode } = e;
      setShowToolbar(false);
      setIsShowChapterList(false);
      switch (keyCode) {
        case 37:
        case 38:
          prevPage();
          break;
        case 39:
        case 40:
          nextPage();
          break;
        default:
      }
    }
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  const [showToolbar, setShowToolbar] = useState(false);
  let navigation;
  const handleShowToolbar = () => {
    if (!navigation) {
      navigation = Book.navigation.toc;
    }
    setIsShowChapterList(false);
    setShowToolbar(!showToolbar);
  };

  const [isShowChapterList, setIsShowChapterList] = useState(false);
  const showChapterList = () => {
    setIsShowChapterList(!isShowChapterList);
  };

  const jump = (href) => {
    setIsShowChapterList(false);
    setShowToolbar(false);
    rendition.display(href);
  };

  const [searchVisible, setSearchVisible] = useState(false);
  const [settinghVisible, setSettingVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const onSearchOpen = () => {
    setSearchVisible(true);
  };
  const onSearchClose = () => {
    setSearchVisible(false);
  };
  const onSettingOpen = () => {
    setSettingVisible(true);
  };
  const onSettingClose = () => {
    setSettingVisible(false);
  };
  const onListOpen = () => {
    setListVisible(true);
  };
  const onListClose = () => {
    setListVisible(false);
  };
  const onInfoOpen = () => {
    setInfoVisible(true);
  };
  const onInfoClose = () => {
    setInfoVisible(false);
  };

  return (
    <section className="book-read">
      <div className="read-wrapper">
        <div id="read" />
      </div>
      <PageHeader
        title="name"
        className="header"
        extra={[
          <Button shape="circle" type="primary" onClick={onSearchOpen}>
            <SearchOutlined />
          </Button>,
          <Button shape="circle" type="primary" onClick={onSettingOpen}>
            <SettingOutlined />
          </Button>,
          <Button shape="circle" type="primary" onClick={onListOpen}>
            <UnorderedListOutlined />
          </Button>,
          <Button shape="circle" type="primary" onClick={onInfoOpen}>
            <InfoCircleOutlined />
          </Button>,
        ]}
      />
      <div className="prev">
        <LeftCircleOutlined onClick={prevPage} />
      </div>
      <div className="next">
        <RightCircleOutlined onClick={nextPage} />
      </div>
      <Drawer
        title="search"
        placement="right"
        onClose={onSearchClose}
        visible={searchVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer
        title="settinghVisible"
        placement="right"
        onClose={onSettingClose}
        visible={settinghVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer
        title="listVisible"
        placement="right"
        onClose={onListClose}
        visible={listVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer
        title="infoVisible"
        placement="right"
        onClose={onInfoClose}
        visible={infoVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </section>
  );
};

export default BookRead;
