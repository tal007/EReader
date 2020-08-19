import { useState } from 'react';
import Epub from 'epubjs';
import BookItem from './BookItem';
import BookURL from '../../books/韭菜的自我修养李笑来首次公开投资原则.epub';

console.log(BookURL);
const Home = () => {
  const [cover, setCover] = useState('');

  console.log(Epub);
  const Book = new Epub('https://s3.amazonaws.com/moby-dick/moby-dick.epub');
  console.log(Book);
  // const timer = setTimeout(() => {
  //   if (cover) {
  //     clearTimeout(timer);
  //     return;
  //   }
  //   const url = Book.resources.replacementUrls[0];
  //   setCover(url);
  // }, 5000);

  return (
    <section className="all-books">
      <BookItem cover={cover} bookUrl={BookURL} />

      <div id="area" />
    </section>
  );
};

export default Home;
