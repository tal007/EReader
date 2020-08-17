import ThemeContext from './ThemeContext';

const FooterConsumer = () => (
  <ThemeContext.Consumer>
    {(value) => (
      <div>
        <h2>
          Context Consumer
          {value}
        </h2>
      </div>
    )}
  </ThemeContext.Consumer>
);

export default FooterConsumer;
