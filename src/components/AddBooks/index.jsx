import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { remote } from 'electron';
import bookDb from '@util/bookDb';
import Epub from 'epubjs';
import { getCoverURL } from '@util/bookUtil';

class AddBooks extends React.PureComponent {
  addBook = async () => {
    const _this = this;
    const result = await remote.dialog.showOpenDialog({
      title: '请选择 .epub 文件',
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: 'epubs',
          extensions: ['epub'],
        },
      ],
    });
    const { filePaths } = result;
    filePaths.forEach((filePath) => {
      const book = new Epub(filePath);
      book.ready.then(() => {
        const { toc } = book.navigation;
        const { metadata } = book.packaging;
        const { title } = metadata;

        getCoverURL(book, (coverUrl) => {
          bookDb.init(() => {
            bookDb.addBook(
              {
                id: `${new Date().getTime()}`,
                title,
                toc,
                metadata,
                coverUrl,
                filePath,
              },
              () => {
                bookDb.getBooks((data) => {
                  console.log(data);
                  _this.props.setBooks(data);
                });
              }
            );
          });
        });
      });
    });
  };
  render() {
    return (
      <Button
        className="import"
        type="primary"
        icon={<PlusOutlined />}
        block
        size="large"
        onClick={this.addBook.bind(this)}
      >
        添加图书
      </Button>
    );
  }
}
export default AddBooks;
