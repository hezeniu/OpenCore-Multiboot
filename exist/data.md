
# 在一个已填充的非操作系统相关磁盘(数据磁盘)上

这很简单，基本上我们只需要为EFI(如果它还不存在的话)和我们的macOS系统腾出一些空间。

## 预防措施

* 备份您的数据
* 如果可能的话，断开或禁用系统中的任何其他磁盘/驱动器，因为它可能会干扰我们的进程。(只保留目标磁盘和/或引导操作系统磁盘，我们将从那里进行操作)
* 驱动器没有损坏或坏扇区
* 您的系统是纯UEFI设置，没有安装CSM/Legacy操作系统
* 电源输入稳定

## 这种情况适用

* 一个包含与windows、linux或macOS无关数据的磁盘
* 一个曾经用于操作系统的磁盘，现在只是数据

---

首先，我们需要知道我们使用的是哪种分区方案，大多数小于1TB的新驱动器通常是MBR格式化的(一些1TB的驱动器仍然是这样)，而更大的驱动器是GPT分区的。正如我们之前看到的，macOS **需要** GPT并且不能没有它。

注意:我们不谈论MBR补丁，这是一个坏主意，真的不应该存在，因为它没有任何意义，大多数2006年以上的计算机可以很容易地引导一个GPT驱动器没有太多问题。

## 检查磁盘分区方案

#### Windows系统

* 打开磁盘管理器
* 右键单击目标驱动器> *属性*
  ![img](../images/ex-data/mbvm.png)
* 进入“卷”，选中“分区样式”
  * **MBR**驱动器将显示:

    ![image-20200825010342403](../images/ex-data/mbr_disk.png)
  * **GPT**驱动器将显示:

    ![image-20200825010434237](../images/ex-data/gpt_disk.png)

#### Linux系统

* 如果还没有安装`gdisk`，请下载并安装

* 运行`lsblk`来列出你的磁盘和分区，并检查目标磁盘的标识符(例如:`/dev/sda`或`/dev/nvme0n1`)

* 运行`sudo gdisk -l <disk_identifier>`(例如:`sudo gdisk -l /dev/sda`)

  * **MBR**磁盘将输出:

    ```sh
    Partition table scan:
      MBR: MBR only
      BSD: not present
      APM: not present
      GPT: not present
    ```

  * **GPT**磁盘将输出:

    ```sh
    Partition table scan:
      MBR: protective
      BSD: not present
      APM: not present
      GPT: present
    ```

#### macOS系统

* 运行 `diskutil list`

* 检查目标驱动器

  * **MBR** 磁盘将具有:

    ```sh
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:     FDisk_partition_scheme                        *SIZE GB   diskX
    ```

  * **GPT** 磁盘将具有:

    ```sh
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *SIZE GB   diskX
    ```

## 转换MBR到GPT

**注意**:如果您的驱动器**已经是GPT**，则**跳过此部分**。

#### 破坏性转换

这个方法会销毁磁盘上的所有数据，让你重新开始工作。**仅当磁盘中的数据不重要或已经备份时才使用它!使用此方法，您的数据将被删除**

你可以使用任何你选择的分区工具销毁数据，或者你可以启动你用OpenCore安装指南制作的macOS安装程序，选择磁盘并格式化它。您可以查看[在同一磁盘上的双启动](../empty/samedisk.md) 部分以获取更多信息。你不需要继续阅读本节的其余部分。

#### 无损转换

这种方法有更高的机会保持数据完整，**但这并不意味着你可以忽略备份数据。备份您的数据!**

我们将使用在任何linux发行版上运行的`gdisk`，我强烈不建议使用Windows或macOS gdisk执行此操作，因为它可能会破坏了解Windows和macOS磁盘处理与linux的区别。你可以使用像`gparted`这样的USB发行版(轻量级iso/ USB镜像)来操作，也可以使用手头的任何发行版磁盘(arch、Ubuntu、Fedora…)。

* 根据发行版下载/安装`gdisk`

* 运行`lsblk`来检查目标驱动器标识符

* 运行`sudo gdisk <identifier>`(例如:`sudo gdisk /dev/sda`)

* 如果你的磁盘是MBR，你会看到:

  ```sh
  Partition table scan:
    MBR: MBR only
    BSD: not present
    APM: not present
    GPT: not present
  
  
  ***************************************************************
  Found invalid GPT and valid MBR; converting MBR to GPT format.
  THIS OPERATION IS POTENTIALLY DESTRUCTIVE! Exit by typing 'q' if
  you don't want to convert your MBR partitions to GPT format!
  ***************************************************************
  
  
  Command (? for help):
  ```

* 输入`w`并按Enter/Return

* 按`y`进行确认

* 你就完成了。

对于那些想要其他方式(从GPT到MBR)的人，请遵循这个[答案](https://superuser.com/questions/1250895/converting-between-gpt-and-mbr-hard-drive-without-losing-data).

#### 验证

一旦你的驱动器被转换，按照上面的指示再次检查。您可能希望在验证之前重新启动计算机。

## 分区磁盘

一旦您转换(或已经格式化)您的磁盘为GPT，是时候为macOS分区和EFI分区重新分区了(如果没有的话)。

### 检查磁盘现有分区

只是因为磁盘现在是GPT分区，这并不意味着macOS将接受它，macOS的HFS Plus (Mac OS日志文件系统)或APFS将不接受格式化它，并将返回一个错误“MediaKit报告设备上没有足够的空间用于所请求的操作”，这是因为要么没有EFI分区，要么它不够大。无论哪种方式，如果您只是使用带有非操作系统数据的磁盘，很可能您没有该分区，我们将不得不创建一个。

话虽如此，我们仍然需要确定是否需要:

#### Windows 系统

* 打开磁盘管理器
* 检查目标磁盘
  * 如果您的磁盘已经包含一个EFI分区:(通常如果您的磁盘之前已经被GPT或格式化过)
    ![img](../images/ex-data/gpt_efi.png)
    * 你会看到一个描述`(EFI系统分区)`
    * 这个分区的大小通常在100MB到500MB之间(超过这个值就浪费存储空间了)
      * 如果它的大小<200MB， **扩展**分区到200MB(或更多一点)
      * 如果它的大小是>500MB， **收缩**分区到500MB(或200MB)，因为这是浪费空间
      * 如果你有多个`EF00`分区，这意味着你的分区很糟糕，你实际上只需要在整个系统中只有一个EFI分区(如果不是每个磁盘，实际上没有必要有多个EFI分区，没有意义)
  * 如果您的磁盘不包含EFI分区:
    ![img](../images/ex-data/gpt_noefi.png)

#### Linux  系统

* 根据发行版下载/安装`gdisk`

* 运行`lsblk`来检查目标驱动器标识符

* 运行`sudo gdisk <identifier>`(例如:`sudo gdisk /dev/sda`)

* W当gdisk启动时，发送`p`

  * 如果您的磁盘已经包含一个EFI分区:(通常如果您的磁盘之前已经被GPT或格式化过)

    ```sh
    Command (? for help): p
    Disk /dev/<identifier>: NUMBER sectors, SIZE GiB
    Model: SOME NAME
    Sector size (logical/physical): 512/512 bytes
    Disk identifier (GUID): SOME GUID
    Partition table holds up to 128 entries
    Main partition table begins at sector 2 and ends at sector 33
    First usable sector is 34, last usable sector is 976773134
    Partitions will be aligned on 8-sector boundaries
    Total free space is 10261 sectors (5.0 MiB)

    Number  Start (sector)    End (sector)  Size       Code  Name
       1            2048          800767   390.0 MiB   EF00  EFI          // We're interested in this
       2          800808       213967975   101.6 GiB   AF0A  
       ... // Other partitions
    ```

    * 你会发现一个带有代码`EF00`的分区，这意味着它被标记为EFI系统分区
      * EFI分区不需要是第一个，它可以在磁盘分区顺序的任何位置，它的`Code`是最重要的
    * 这个分区的大小通常在100MB到500MB之间(超过这个值就浪费存储空间了)
      * 如果它的大小小于200MB， **扩展**到200MB(或者更大)
      * 如果它的大小是>500MB，则**缩小**分区到500MB(或200MB)，因为这是对空间的浪费
      * 如果你有多个`EF00`分区，这意味着你的分区很糟糕，你实际上只需要在整个系统中只有一个EFI分区(如果不是每个磁盘，实际上没有必要有多个EFI分区，没有意义)

  * 如果你的磁盘不包含EFI分区:

    ```sh
    Command (? for help): p
    Disk /dev/<identifier>: NUMBER sectors, SIZE GiB
    Model: SOME NAME
    Sector size (logical/physical): 512/4096 bytes
    Disk identifier (GUID): SOME GUID
    Partition table holds up to 128 entries
    Main partition table begins at sector 2 and ends at sector 33
    First usable sector is 34, last usable sector is NUMBER
    Partitions will be aligned on 2048-sector boundaries
    Total free space is 2669 sectors (1.3 MiB)

    Number  Start (sector)    End (sector)  Size       Code  Name
       1            2048       250068991   119.2 GiB   0700  peepee       // a partition
       ... // Other partitions that are not EFIs
    ```

    * 没有`EF00`分区，这意味着我们需要创建一个

#### macOS  系统

* 运行 `diskutil list`

  * 你可以选择添加`diskX`， X作为目标磁盘的标识符，如果你不希望显示一个大的分区和磁盘列表，在大多数情况下，磁盘编号从系统启动到另一个，所以不要过度依赖它。

* 检查你的目标磁盘列表:

  * 如果您的磁盘包含EFI分区:

    ```sh
    /dev/diskX (does not matter):
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                         *SIZE*     diskX      // GPT disk
       1:                        EFI ESP                     209.7 MB   diskXs1    // Look for this
       2:                    FORMAT1 Part1                   *SIZE*     diskXs2    // a partition
         ... // Other stuff that aren't TYPE: EFI
    ```

    * 我们看到一个`TYPE`为`EFI`的分区，这意味着一个具有EFI分区的磁盘(如你所见，它是200MB)
    * 这个分区的大小通常在100MB到500MB之间(超过这个值就浪费存储空间了)
      * 如果它的大小小于200MB， **扩展**到200MB(或者更大)
      * 如果它的大小是>500MB，则**缩小**分区到500MB(或200MB)，因为这是对空间的浪费
      * 如果你有多个`EF00`分区，这意味着你的分区很糟糕，你实际上只需要在整个系统中只有一个EFI分区(如果不是每个磁盘，实际上没有必要有多个EFI分区，没有意义)

  * 如果你的磁盘不包含EFI分区:

    ```sh
    /dev/diskX (does not matter):
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                         *SIZE*     diskX      // GPT disk
       1:       Microsoft Basic Data poopoo                  128.0 GB   diskXs1    // a partition
         ... // Other stuff that aren't TYPE: EFI
    ```

    * 虽然磁盘是GPT，但没有`TYPE`为`EFI`的分区，这意味着我们需要创建一个。

### 如果你有一个EFI分区

祝贺你，你可以继续并为macOS划分你的磁盘，并在你的愉快的道路上，检查**macOS分区**部分。

### 如果你没有EFI分区

我们必须做一个，我们将使用的操作系统要么是Windows，要么是Linux (macOS是一种麻烦，不打算用它)。

#### Windows  系统

我们将使用一个名为`Minitool Partition Wizard`的磁盘管理软件，ngl，它看起来确实阴暗，有点像恶意软件(如果它是，也不会惊讶)。还有其他的替代品，比如`Easeus Partition Master`(看起来很像MPW🤔)和`AOMEI Partition Assistant`(看起来也像另外两个**🤔**)，还有更多，但这些都是最受欢迎的windows磁盘管理器。

##### 但是哪里是GpArTeD

我不推荐使用NTFS分区的Gparted的原因是它可能比Windows处理它时更容易破坏分区。我个人不需要处理太多损坏的NTFS分区(我做过一次或两次)，Windows肯定会修复它们，但很多用户报告使用Gparted无法恢复分区或数据，不是责怪Gparted，但使用Windows与自己的FS比希望NTFS -3g不搞破坏更安全，话虽如此，我将在“Linux”部分下面发布一个Gparted指南，如果你已经处理过Gparted，我想你可能知道该怎么做。

在本节中，我将使用MPW，其他工具也非常相似，也有非常相似的菜单，你可以继续使用它们。在这种情况下，我将使用一个外部磁盘进行分区，它不会改变内部磁盘的任何内容，对任何磁盘都是相同的过程。

* 下载你选择的~~恶意软件~~分区管理器(这里是MPW)

* 安装~~恶意软件~~分区管理器，并**关注他们安装的广告软件和额外的“应用”，Chrome, Opera，一些可疑的AV等等**

* 以管理员身份运行应用程序

* 右键单击目标磁盘的第一个分区并将其缩小200MB(甚至更多)
  ![Screenshot 2020-09-15 235910](../images/ex-data/mv-rsz.png)
  ![Screenshot 2020-09-16 000113](../images/ex-data/resizing.png)

  * 注意:因为是垃圾软件，下面是正确的操作方法:
    * 将尺寸视图从**GB**更改为**MB**
    * 选择分区大小，**按下键盘上的方向键**降低分区大小
    * 通常后面的空格会被填满
    * 当你达到目标(例如220MB)时，选择部分后面未分配的空间并**按下箭头键**
    * 你会看到未分配空间之前被填充
  * 注意2:移动大滑块只会产生奇怪的数字，它是垃圾，所以要处理它
  * 注意3:我不知道其他分区软件是否都是这样的垃圾

* 一旦完成，在软件显示的任何地方按apply(在这个版本中，它在Operation Pending列表下，旧版本的顶部有一个专用按钮，所以要仔细检查UI，因为它会随着时间的推移而变化)

  ![Screenshot 2020-09-16 002725](../images/ex-data/applypending.png)

* **这个过程需要一定的时间，这取决于你的硬盘上的数据，如果是SSD或hdd，在任何情况下都不要取消它，否则你的数据会被销毁。别怪我没提醒你!**

* *现在**第一个分区之前有一个空白的空间**，这个空间将被用来创建一个EFI分区

  * 由于MPW经理是混蛋，创建EFI分区现在是一项付费功能
  * 如果你有一个旧版本(9或更旧)，你可以免费使用它

* 操作完成后:

  * 以管理员权限打开CMD/PowerShell

  * 运行 `diskpart`

  * 执行以下命令:

    * `list disk`

      * 将显示您的磁盘，请仔细检查目标磁盘
      * 您可以查看磁盘管理器，因为磁盘编号是相同的

    * `sel disk X`

      * 其中X是目标磁盘号

    * `list part`

      * 将列出所选磁盘上的分区
      * 检查分区，因为它可以帮助你检查目标
      * 如果不是想要的磁盘，再次使用`sel disk X`并选择另一个并再次检查

    * `create partition efi`

      * 将创建一个EFI类型的新分区
      * 这将使它隐藏在系统中，只有管理员权限才能探索
      * 它会占据我们之前创建的所有空闲空间

    * `list part`

      * 你会看到一个类型为`System`的新分区
      * 大小应该大致匹配我们之前离开的那个

    * `format fs=fat32 label="EFI"`

      * 这将格式化该分区为FAT32并赋予它“EFI”标签
      * 注意:**在某些情况下**，windows会返回一个“设备还没有准备好”的错误，我不知道这是什么，但我们可以解决它
      * 修正注意事项:
        * 回到MPW
        * 右键点击EFI分区(应该也被检测为“EFI系统分区”)，选择**Format**
        * ![Screenshot 2020-09-16 002834](../images/ex-data/FormatEFI.png)
        * 按OK键完成。

    * 输出示例:

      ![Screenshot 2020-09-16 002720](../images/ex-data/diskpart_output.png)

* 一旦完成，您可以为macOS**进行**分区

#### 在Linux中(我的最爱)

我们将使用您最喜欢的工具Gparted，如果您正在使用parted/gpart，您正在寻找悲伤的一天。我们出发吧。

* 按照发行版说明安装`gparted`(或者使用gparted ISO)

* 运行 `gparted`

* 在右侧列表中选择目标磁盘

  ![image-20200917014041409](../images/ex-data/gparted_list_disk.png)

* 右键单击第一个分区，然后选择 **Resize/Move**

  ![image-20200917014201474](../images/ex-data/resize_gparted.png)

* 选择文本区域之前的空闲空间，并按**向上箭头键**，直到你达到所需的大小，然后点击 Resize/Move

  ![image-20200917014513781](../images/ex-data/resize_menu_gp.png)

  * 请注意，如果超过所需的大小，然后减去额外的数量，它**将被移动到分区后面的空闲空间**，在这种情况下，只需在新大小区域上按`+`，直到后面的空间为零，继续增加更多将减少前面的空闲空间(逻辑，对吧?别搞得太乱，谢谢)

* 您将得到这个错误，按OK，如果您有多个分区，这很重要，但通常大多数现代操作系统(在UEFI上)对这个问题很有弹性(通过使用uuid而不是分区编号)

  ![image-20200917014846172](../images/ex-data/gp_warning.png)

* 右键单击未分配的分区并选择 New
  ![image-20200917015144211](../images/ex-data/new_part_gp.png)

* 在 *Create new Partition* 框中，设置以下内容，然后按 Add

  * Partition name (分区名(可以命名为EFI，没有关系))
  * Label (标签(可以叫EFI,没关系))
  * File system: **FAT32**
  * ![image-20200917015338264](../images/ex-data/new_part_efi_gp.png)

* 按下工具栏上的绿色复选标记应用更改并确认
  ![Screen Shot 2020-09-17 at 01.54.56](../images/ex-data/apply_changes_gp.png)
  ![image-20200917015813671](../images/ex-data/confirm_apply.png)

* **这个过程需要一定的时间，这取决于你的硬盘上的数据，如果是SSD或硬盘，在任何情况下都不要取消它，否则你的数据会被毁掉。别怪我没提醒你!**
  ![image-20200917020004696](../images/ex-data/gp_progress.png)

* 完成后，右键单击新创建的EFI分区并选择“Manage Flags”
  ![image-20200917020200810](../images/ex-data/mng_flags.png)

* 选择`esp`， gparted将自动选择`boot`，保持这个状态

  ![image-20200917020305683](../images/ex-data/flags.png)

* 它会立即完成，检查你的标志
  ![image-20200917020438739](../images/ex-data/flags_check.png)

  * 你也可以在`gdisk`中查看`EF00`

* 一旦完成，你可以进入**macOS分区**
  