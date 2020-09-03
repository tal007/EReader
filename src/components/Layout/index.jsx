/* eslint-disable implicit-arrow-linebreak */
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import bookDb from '@util/bookDb';
import MySider from '../Sider';

const { Content } = Layout;

const { pathname } = window.location;
const containerStyle =
  pathname === '/read' ? { height: '100%' } : { height: '100%', padding: 20 };

export const BookListContext = React.createContext('BookListContext');
class MyLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const _this = this;
    bookDb.init(() => {
      bookDb.getBooks((data) => {
        console.log('获取所有书籍');
        console.log(data);
        _this.setState({ books: data });
      });
    });
  }

  setBooks = (data) => {
    this.setState({ books: data });
  };

  render() {
    const { children } = this.props;
    return (
      <BookListContext.Provider
        value={{ books: this.state.books, setBooks: this.setBooks }}
      >
        <Layout className="layout" style={containerStyle}>
          <Route
            path="/"
            exact
            component={() => <MySider setBooks={this.setBooks} />}
          />
          <Layout>
            <Content>
              {React.Children.map(
                children,
                (child) =>
                  React.cloneElement(child, {
                    setBooks: this.setBooks,
                  })
                // eslint-disable-next-line function-paren-newline
              )}
            </Content>
          </Layout>
        </Layout>
      </BookListContext.Provider>
    );
  }
}

export default MyLayout;
