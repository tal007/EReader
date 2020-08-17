class Layout extends React.Component {
  render() {
    return (
      <section className="layout" style={{ margin: 20 }}>
        {this.props.children}
      </section>
    );
  }
}

export default Layout;
