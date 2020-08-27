import { Col, Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DefaultImage from '@img/default.jpg';
import bookDb from '@util/bookDb';

const BookItem = ({ data, setBooks }) => {
  const { title, coverUrl, bookpath } = data;
  const openBook = () => {
    window.open(`/read?bookUrl=${bookpath}`);
  };
  const deleteBook = (event) => {
    event.preventDefault();
    event.stopPropagation();
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此书么',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        bookDb.init(() => {
          bookDb.deleteBook(data.id, () => {
            bookDb.getBooks((newdata) => {
              setBooks(newdata);
            });
          });
        });
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
        src={coverUrl || DefaultImage}
        alt="cover"
      />
      <p className="book-list-item-name">{title}</p>
    </Col>
  );
};

export default BookItem;
