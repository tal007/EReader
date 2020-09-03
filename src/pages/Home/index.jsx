import { Row, Empty } from 'antd';
import { BookListContext } from '@comp/Layout';
import AddBooks from '@comp/AddBooks';
import BookItem from './BookItem';

class Home extends React.PureComponent {
  render() {
    return (
      <BookListContext.Consumer>
        {(bookObject) => {
          if (bookObject.books.length === 0) {
            return (
              <>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="没有图书哦，快点击按钮添加图书吧"
                />
                <div style={{ maxWidth: 300, margin: '0 auto' }}>
                  <AddBooks setBooks={this.props.setBooks} />
                </div>
              </>
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
