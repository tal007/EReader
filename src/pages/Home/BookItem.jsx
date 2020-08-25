import { Col } from 'antd';
import { useState } from 'react';
import Epub from 'epubjs';
import { getCoverURL } from '@util/bookUtil';
import DefaultImage from '@img/default.jpg';

const BookItem = ({ BookURL }) => {
  const [cover, setCover] = useState('');
  const [bookName, setBookName] = useState('');
  const Book = new Epub(BookURL);
  getCoverURL(Book, (result) => {
    const { title } = Book.packaging.metadata;
    setCover(result);
    setBookName(title);
  });
  const openBook = () => {
    window.open(`/read?bookUrl=${BookURL}`);
  };
  return (
    <Col className="book-list-item" onClick={openBook}>
      <img
        className="book-list-item-cover"
        src={cover || DefaultImage}
        alt="cover"
      />
      <p className="book-list-item-name">{bookName}</p>
    </Col>
  );
};

export default BookItem;
