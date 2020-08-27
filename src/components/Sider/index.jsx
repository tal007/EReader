import { Layout, Button, Menu } from 'antd';
import {
  PlusOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { remote } from 'electron';
import bookDb from '@util/bookDb';
import Epub from 'epubjs';
import { getCoverURL } from '@util/bookUtil';

const { Sider } = Layout;

class MySider extends React.PureComponent {
  addBook = async () => {
    const _this = this;
    const result = await remote.dialog.showOpenDialog({
      title: '请选择 .epub 文件',
      filters: [
        {
          name: 'epub',
          extensions: ['epub'],
        },
      ],
    });
    const bookpath = result.filePaths[0];
    const book = new Epub(bookpath);

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
              bookpath,
            },
            () => {
              bookDb.getBooks((data) => {
                _this.props.setBooks(data);
              });
            }
          );
        });
      });
    });
  };
  render() {
    return (
      <Sider className="custom-sider">
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
        <h2 className="label">书架</h2>
        <Menu defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<SmileOutlined />}>
            全部图书
          </Menu.Item>
          <Menu.Item key="2" icon={<MehOutlined />}>
            未分类
          </Menu.Item>
          <Menu.Item key="3" icon={<FrownOutlined />}>
            管理
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default MySider;
