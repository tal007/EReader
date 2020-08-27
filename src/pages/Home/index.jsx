import { Row, Empty } from 'antd';
import { BookListContext } from '@comp/Layout';
import BookItem from './BookItem';

class Home extends React.Component {
  render() {
    return (
      <BookListContext.Consumer>
        {(bookObject) => {
          if (bookObject.books.length === 0) {
            return (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="没有图书哦，快点击左上角添加一本书吧"
              />
            );
          }
          return (
            <Row className="book-list-container">
              {bookObject.books.map((data) => (
                <BookItem
                  key={data.id}
                  data={data}
                  setBooks={bookObject.setBooks}
                />
              ))}
            </Row>
          );
        }}
      </BookListContext.Consumer>
    );
  }
}
export default Home;
