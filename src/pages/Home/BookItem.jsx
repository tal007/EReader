import { useState } from 'react';
import { Col, Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
  const deleteBook = (event) => {
    event.preventDefault();
    event.stopPropagation();
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此书么',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <Col className="book-list-item" onClick={openBook}>
      <Button
        onClick={deleteBook}
        className="delete"
        shape="circle"
        icon={<DeleteOutlined />}
      />
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
