import { Row } from 'antd';
import { BookListContext } from '@comp/Layout';
import BookItem from './BookItem';

class Home extends React.Component {
  render() {
    return (
      <BookListContext.Consumer>
        {(books) => {
          console.log(books);
          return (
            <Row className="book-list-container">
              {books.map((data) => (
                <BookItem key={data.id} data={data} />
              ))}
            </Row>
          );
        }}
      </BookListContext.Consumer>
    );
  }
}
export default Home;
