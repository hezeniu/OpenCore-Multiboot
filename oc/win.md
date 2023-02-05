# Windows下的双启动

* OpenCore目前**不支持**基于MBR的Windows安装，你需要将其转换为GPT。

#### 解决方案1:如果不能自动拾取Windows，请将以下内容添加到config.plist中

```sh
Misc -> BlessOverride -> \EFI\Microsoft\Boot\bootmgfw.efi
```

* **注意**:从OpenCore 0.5.9开始，不再需要指定该参数。OpenCore应该会自动接收这个条目

![](../images/win-md/blessoverride.png)

#### 解决方案2:要使Windows被拾取，请从Windows内部启动到恢复模式

* **确保你从OpenCore启动windows**
  * 加载OpenCore后，按空格> OpenShell(确保在工具和配置中有它)
  * 运行 `map -r -b`
  * 查找您的EFI驱动器(通常在第一行，如果您是多盘用户，请注意，可能有许多EFI驱动器)
  * 运行 `FSX:\EFI\Microsoft\Boot\bootmgfw.efi` 其中X是带有windows引导加载程序的efi分区的编号
* **确保将RequestBootVarRouting设置为True**
* 打开具有管理员权限的CMD/PS
* 运行 `shutdown /r /o /t 0`
  * 这将重新启动您的windows系统立即进入高级启动菜单
* 选择“故障排除>命令提示符”
* 它将重新启动到WinRE，你将进入命令提示符
* 一旦进入
  * 运行 `diskpart`
  * 加载完成后，发送 `list vol`
  * 寻找您的Windows驱动器号
    * 它可能没有`C`字母，但请确保你检查了大小和其他指向它的指示
    * 如果你不能，只要写下挂载的字母与(NTFS)文件系统，然后逐一探索它们，以检查它是否是你的windows安装
  * 查找您的EFI分区
    * 它应该显示为`hidden`或`system`，通常为100-200MB(有些OEM安装会将其放大到500MB)
      * 发送`sel vol X`，其中X是EFI分区号
    * 如果你有疑问
      * 发送 `list disk`
      * 识别你的Windows磁盘
      * 发送`sel disk X`，其中X是安装Windows的磁盘
      * 发送 `list part`
      * 检查分区，通常EFI应该有100-200MB(有些OEM安装会把它放大到500MB)
      * 发送`sel part X`，其中X是EFI分区号
    * 无论哪种方式，发送`assign letter=S`
      * S可以是A/B/Y/X之外的任何值，也可以是在它之前的列表中已经赋值的任何字母
  * 发送`exit`命令关闭diskpart并返回到命令提示符
  * 运行 `bcdboot X:\Windows /s S: /f UEFI`
    * [bcdboot](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di) 是一个在EFI或根系统分区(任选)安装Windows引导加载程序的实用程序
    * `X:\Windows`是Windows安装文件夹的路径，其中X是Windows分区的挂载字母
    * `/s S:`是接收引导加载程序的目标磁盘，在我们的例子中，它是EFI分区
    * `/f UEFI`指定引导加载器的类型(UEFI引导加载器)
    * 这将复制一个新的boottmgfw.efi文件，并添加一个新的NVRAM启动项，希望现在会出现在OpenCore启动菜单上。
* 如果一切都运行没有任何错误，键入`exit`，它应该返回到高级引导菜单(或重启)
* 重新启动并检查是否添加了Windows引导项
