import { Row } from 'antd';
import { jsonFiles } from '@util/mapBooks';
import BookItem from './BookItem';

const Home = () => (
  <Row className="book-list-container">
    {jsonFiles.map((BookURL) => (
      <BookItem key={BookURL} BookURL={BookURL} />
    ))}
  </Row>
);

export default Home;
