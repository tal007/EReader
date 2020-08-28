一个 Epub格式的图书的阅读器，目前仅具有基本的功能，且只有windows，因为mac上面自带的阅读就很棒了。

采用技术：React + electron + antdesigh + indexDB

目前使用的是读取本地的 epub 文件，数据只保存了封面以及title，阅读的时候会再读取一次文件，所以不要移动文件位置，如果移动了需要重新导入。

