# 在不同磁盘上进行双引导

我不会在这部分花太多时间，因为这是最简单的部分:

* 在其中一个磁盘上安装macOS
* 在另一个磁盘上安装其他操作系统
* 在macOS磁盘EFI上安装/拷贝OpenCore
* 你可以出发了

需要记住的事情:

* 当涉及到多磁盘设置时，Windows可能是一个贱人(当它看到大量磁盘上的大量EFI分区时，它会崩溃)
* 如果发生上述情况，请禁用/断开所有其他磁盘并像往常一样安装windows
  * 对于笔记本电脑来说，这可能是一种痛苦，你可以按照[来自TenForums的指南](https://www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html)手动安装windows
  * 确保你选择了合适的磁盘
* 如果你想在一个磁盘上启动多个操作系统，你仍然可以参考其他情况。
* 确保OpenCore在macOS的同一个磁盘上，以便于更容易的故障排除和更清晰的设置
  