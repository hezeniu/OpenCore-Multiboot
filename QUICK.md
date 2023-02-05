# 快速指南没有废话

好吧，如果你对如何分区和引导多个操作系统很有经验，那么你需要查看以下内容:

* ***备份你的数据***，这很容易变成一个破坏性的操作。
* macOS 要求:
  * EFI分区(ESP)最小为200MB
  * GPT格式化的磁盘
  * UEFI系统(或DUET遗留系统，附带OpenCorePkg)
* 最好将OpenCore复制到同一磁盘的EFI中
  * **如果你使用的是旧系统**，请确保你运行了`BootInstall.command`
  * EFI分区**最好**需要位于**磁盘的开头**，以便在Windows下进行多重启动(请阅读OpenCore的configuration.pdf)
* 如果你已经在那个驱动器上有任何东西也没关系:
  * 你可以将其转换为GPT(如果它是MBR)并创建一个标志为十六进制`EF00`的EFI分区(例如使用gdisk或gparted并选择类型`EFI`<sup>(如果分区尚未格式化，则将显示)</sup>)
  * 将现有的EFI大小调整为**200MB** (windows通常限制新安装的EFI大小为100MB，一些linux发行版有更小或更高的大小，但通常小于200MB)
    * 建议:确保它稍微大一点，比如210MB或其他大小，以计算macOS/Linux/Windows上读取字节/位的差异。(1024的倍数而不是1000，反之亦然)
  * Windows 10 1709及之后版本有一个名为`mbr2gpt`的实用程序可以将Windows引导盘转换为UEFI
    * 这样做，双引导Windows 10和macOS在同一个驱动器上，无论启动模式是什么
      * 如果是遗留系统，你将无法访问windows，直到你安装OpenCore并从它引导windows
      * 当转换发生时，只要将计算机的固件设置(BIOS设置)配置为UEFI模式，UEFI系统就会直接启动
    * 这个实用程序可能因为某种原因无法转换设置，你可以手动执行以下操作:
      * 准备windows 10 USB安装程序
      * 使用linux发行版:
        * 磁盘转换为gpt (gdisk)
        * 创建resize/创建一个十六进制`EF00`或类型`efi`的新分区(gparted)
          * 确保在macOS上格式化大小为200MB
          * 您可以在此过程中创建另一个macOS分区
          * EFI最好是在磁盘的开头(OpenCore要求)
      * 启动windows安装程序:
        * 通过`diskpart`为EFI分区和Windows分区分配一个字母(谷歌diskpart分配字母)
        * 运行`bcdboot C:\Windows /s s: /f UEFI`(其中`C:`和`s:`是分配给Windows和EFI分区的分区字母，请阅读bcdboot手册)
      * 启动windows,希望没有什么坏了
  * 如果你使用的是linux，步骤和之前一样(只有200MB的EFI分区和放置macOS的地方)
* 确保磁盘没有S.M.A.R.T错误
* 不要在同一个磁盘上有多个EFI，每个磁盘**必须**只有**一个**EFI分区
* 操作系统安装顺序**无关紧要**
  * 然而，windows可能有点麻烦，所以在macOS之后安装它可能是一个挑战，linux不会带来这样的问题
  * 如果你碰巧发现了令人沮丧的windows垃圾，你可以:
    * 启动windows安装程序
    * 擦除你希望在NTFS上安装windows的分区(如预期的那样)
    * 在 [guide over at TenForums](https://www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html#Part2)上关注剩下的内容。
      * 您不需要MSR和Recovery，并且当磁盘上已经安装了东西时，您无法创建它们(归咎于windows安装程序)
        * 待办事项: 创建一个单独的windows恢复的方法，我找不到任何关于如何做的指南，以便windows可以原生识别它，如果你知道一个指南或知道如何做，用你的想法打开[a PR](https://github.com/dortania/OpenCore-Multiboot/) 或 [an issue](https://github.com/dortania/bugtracker)。

现在你已经掌握了所有这些信息，祝你好运。然而，如果你不确定，请参考下面的详细解释和细节，了解如何正确地做到这一点。
