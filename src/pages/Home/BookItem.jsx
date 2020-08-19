import React from 'react';
// import DefaultImage from '../../img/default.jpg';

const BookItem = ({ cover, bookUrl }) => {
  const openBook = () => {
    window.open(`/read?bookUrl=${bookUrl}`);
  };
  return (
    <section className="book-item" onClick={openBook}>
      <img className="cover-image" src={cover} alt="cover" />
    </section>
  );
};

export default BookItem;
