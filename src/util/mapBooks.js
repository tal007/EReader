import bookDb from '@util/bookDb';

bookDb.init(() => {
  bookDb.getBooks((data) => {
    console.log('获取所有书籍');
    console.log(data);
    // 添加示例图书
    // const isInit = this.$storage.get('init', false);
    // if (!isInit) {
    //   this.$storage.set('init', true);
    //   this.addBookFromUrl('https://img1.yunser.com/epub/test.epub');
    // }
  });
});
