import { Col, Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DefaultImage from '@img/default.jpg';

const BookItem = ({ data }) => {
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
        src={coverUrl || DefaultImage}
        alt="cover"
      />
      <p className="book-list-item-name">{title}</p>
    </Col>
  );
};

export default BookItem;
