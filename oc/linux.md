# Linux下的双启动

## 方法A: OpenLinuxBoot

OpenCore现在包含一个驱动程序`OpenLinuxBoot.efi`，它应该使Linux的双启动更加容易。

使用它的步骤是:

 1. 安装Linux就像你通常会做的那样，例如从一个.iso镜像烧录到一个可移动的USB驱动器启动- OpenLinuxBoot.efi不涉及这个阶段
 2. 添加`OpenLinuxBoot.efi`和`ext4_x64.efi`到你的`config.plist`和`Drivers`部分
 3. 确保在`config.plist`中启用了`RequestBootVarRouting`和`LauncherOption`;也建议启用`HideAuxiliary`以隐藏旧的Linux内核，除非你需要看到它们(你可以通过按空格来在OpenCore启动菜单中显示辅助条目)
 4. 重新启动进入OpenCore，安装的Linux现在应该刚刚出现
 5. 再也不要用Grub了

如果您以前使用过下面的方法B或C，您将需要删除这些设置，以避免在OpenCore启动菜单中看到您的Linux发行版两次。

有关OpenLinuxBoot如何工作以及其他故障排除指导的进一步信息，请参阅OpenCore Configuration.pdf文档中的OpenLinuxBoot部分。

## 方法B:链加载EFI引导加载器(GRUB2, Systemd-boot)

#### 方法1:使用BlessOverride

如果Linux系统没有自动启动，请将以下内容添加到config.plist中:

```sh
Misc -> BlessOverride -> \EFI\arch\grubx64.efi
```

一些常见的Linux引导装载程序路径:

* `\EFI\arch\grubx64.efi`
* `\EFI\ubuntu\grubx64.efi`
* `\EFI\systemd\systemd\systemd-bootx64.efi`
* 检查你的发行版 ¯\\\_(ツ)_/¯

![](../images/linux-md/blessoverride.png)

#### 方法2:使用`efibootmgr`(推荐)

`efibootmgr`是一个在UEFI固件(前bios)中操作EFI引导管理器的程序。有了它，您可以创建新条目并添加您的linux引导管理器(GRUB2, systemd-boot，…)，以一种将其显示在OpenCore上的方式，并可以通过OC选择和设置为默认值(使用Ctrl + Enter选中它)。要做到这一点:

1. 了解您正在使用的引导加载程序/管理器(GRUB2或system -boot或其他)

2. **通过OpenCore引导到linux，你可能想要使用UEFI Shell为你的引导加载器/管理器执行EFI应用程序**

3. 找到你的引导程序/管理器的路径，通常它在EFI中(如果你正确地设置了它)

   1. 在linux安装的终端窗口中，运行`lsblk`(在大多数发行版中可用)

      ```shell
      $ lsblk
      NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
      ...
      sda            8:0    0 223.6G  0 disk
      ├─sda1         8:1    0   200M  0 part /boot/efi
      ├─sda2         8:2    0 116.3G  0 part
      └─sda3         8:3    0   107G  0 part /
      ...
      ```

      * 检查挂载点部分以获得系统根`/`分区(这里是`sda3`)
      * `/boot/efi`挂载了我的efi分区(如果你正确地将它添加到fstab中，你应该这样做)
      * 引导加载器/管理器在`/boot/efi`中
      * 在这种情况下，`/boot/efi`分区编号是`1`(它可以是`sda1`或`nvme0nXp1`或其他任何东西)，如果你的efi在另一个分区，请记住它是哪个编号

   2. 通过运行`cd/path/to/EFI`(例如`cd/boot/EFI`)来更改EFI分区所在的目录

   3. 一旦你进入，你通常会找到一个名为`EFI`的文件夹，其中包含`BOOT`和其他文件夹，其中一个文件夹**可能**包含你的bootloader/manager EFI应用程序二进制文件，通常在

      * `EFI/arch/grubx64.efi` - 用于使用grub2的Arch
      * `EFI/ubuntu/grubx64.efi` - 用于带有grub2的Ubuntu
      * `EFI/systemd/systemd-bootx64.efi` - 用于系统引导(Arch使用的路径)
      * `EFI/fedora/grubx64.efi` - 用于带有grub2的Fedora
      * 或运行 `find . -iname "grubx64.efi"` 或 `find . -iname "systemd-bootx64.efi"`在你的EFI文件夹中(你可以将文件名更改为你正在使用的任何名称)

   4. 保持注意的:

      * 二进制路径
      * 二进制文件的分区号
      * 二进制文件的磁盘路径(`/dev/sda`或`/dev/nvme0nX`)

4. 在你的linux系统中安装`efibootmgr`(它通常内置在ubuntu中，但是需要在arch上安装)

5. 安装完成后，以**sudoer/超级用户**的身份运行(或者使用sudo)

   ```sh
   efibootmgr -c -L "Linux" -l "\EFI\pathto\filex64.efi" -d "/dev/sda" -p 1
   ```

   * `-c`: 创建
   * `-L "Linux"`: 标记引导条目(你可以将其更改为你想要的任何内容)
   * `-l "\EFI\pathto\filex64.efi"`: 加载器文件路径，必须是UEFI固件可以使用的格式，这意味着路径为`\`，而不是你在unix中找到的`/`
   * 磁盘路径以便`efibootmgr`知道UEFI固件应该从哪个磁盘读取文件，如果你使用的是NVMe，可以是`/dev/nvme0nX` (X是数字)
   * `-p 1`: 指向我们之前找到的分区编号，如果您的EFI分区是第一个，则可以省略此值

6. 重启并检查OpenCore， **你会发现一个名为`EFI`的新条目**，可能有很多，因为它也可以指向其他引导条目，这是OpenCore设计的，而不是bug。

**注意:**

这可以用于你想要添加到UEFI引导管理器的**任何EFI应用程序**。

## 方法C:链式加载内核(必须支持EFISTUB)

一些linux内核构建启用了EFISTUB配置,这使得它们UEFI固件可加载的像一个常规UEFI应用程序(整洁,对吧?),我们可以使用这个特性OpenCore和让它加载内核作为EFI应用程序同时传递启动参数和其他信息。

### 1. 识别你的根分区

我们首先需要确定你的根分区和它的UUID/PARTUUID，这些信息将帮助我们指向内核/系统根分区的正确位置。

#### 1. 你的内核和系统根在同一个分区中:(在本例中使用Arch)

* 在linux安装的终端窗口中，运行`lsblk`(在大多数发行版中可用)

  ```shell
  $ lsblk
  NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
  ...
  sda            8:0    0 223.6G  0 disk
  ├─sda1         8:1    0   200M  0 part /boot/efi
  ├─sda2         8:2    0 116.3G  0 part
  └─sda3         8:3    0   107G  0 part /
  ...
  ```

  * 检查挂载点部分以获得系统根`/`分区(这里是`sda3`)
  * `/boot/efi`挂载了我的efi分区(如果你正确地将它添加到fstab中，你应该这样做)
  * 内核和initramfs存储在`/boot`中，它是我的主系统根分区的一部分

* 现在我们需要知道哪个UUID/PARTUUID，运行 `blkid | grep -i <system_root_partition>` , 例如: `blkid | grep -i sda3` (必须是root用户)

  ```shell
  # blkid | grep -i sda3
  /dev/sda3: UUID="3d4768d7-d33e-4f9f-a821-e80eba22ca62" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="a1073e53-c768-4ce5-89ad-b558669bdb89"
  ```

  * 你会得到你的UUID/PARTUUID，将它们保存在某处。

* 探索`/boot`并列出你的文件，你应该能找到你的内核和initramfs

  ```shell
  $ cd /boot
  $ ls -l
  total 51698
  drwxr-xr-x 7 root root    34304 Jan  1  1970 efi
  drwxr-xr-x 6 root root     4096 Sep 18 19:42 grub
  -rw-r--r-- 1 root root 10144696 Sep 22 23:31 initramfs-linux.img
  -rw-r--r-- 1 root root 32047033 Sep 22 23:32 initramfs-linux-fallback.img
  -rw-r--r-- 1 root root  3161088 Jun 16 17:50 intel-ucode.img
  -rw-r--r-- 1 root root  7541344 Sep 22 23:31 vmlinuz-linux
  ```

  * 我的内核命名为`vmlinuz-linux`， initramfs-linux.img是它的初始ramfs，还有一个备用img，还有`intel-ucode.img`来缓解垃圾英特尔
    * 如果你使用的是AMD，你可能还会看到`AMD-ucode.img`
    * 其他一些发行版可能会将这些镜像存储在其他地方，请检查您的发行版以及它如何处理CPU ucode固件

* 重启到OpenCore，按空格键，它应该会显示更多的选项，其中一个应该是OpenShell.efi。如果您没有，请下载OpenCore zip，并从OC/Tools中获取它，并将其添加到您的配置plist中，ProperTree可以通过OC快照做到这一点。

#### 2. 您的内核位于EFI分区中

如果你正在使用systemd-boot，确保你把内核安装在你的EFI分区中，systemd UEFI引导加载程序可以检测和加载你的内核:基本上要确保它在一个FAT32分区中*，你的EFI分区应该已经是*。

### 2. 识别你的UEFI路径和设备

* 在shell中

  * 运行`map -r -b`来列出你所有的设备(-b打断滚动)

    * `BLKX:` '是扫描的所有分区/磁盘

    * `FSX:` 是所有**可探索**的文件系统

    * `PciRoot(0x0)/Pci(AxB,CxD)/Sata` 或 `Nvme` 是您的驱动器类型(Nvme或ahci)

    * `HD(X,GPT,<PARTUUID>,...)` 或 `HD(X,MBR)` 是你的硬盘分区，其中`X`是一个数字，GPT /MBR是磁盘分区方案，然后是PARTUUID

    * 例子:

      ```shell
      Mapping table
            FS0: Alias(s):HD0a0a1:;BLK1:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(1,GPT,4C86153F-3A91-4328-878A-807A8FA944A1,0x28,0x64000)
            FS1: Alias(s):HD0a0a2:;BLK3:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)/VenMedia(BE74FCF7-0B7C-49F3-9147-01F4042E6842,1D89CBABD1BB094B87762CDCDC3168F6)
            FS2: Alias(s):HD0a0a2:;BLK4:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)/VenMedia(BE74FCF7-0B7C-49F3-9147-01F4042E6842,43B537EA89133A48A9640D5A373D2982)
            FS4: Alias(s):HD0a0a2:;BLK6:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)/VenMedia(BE74FCF7-0B7C-49F3-9147-01F4042E6842,9FEEB42E4604B44BB4CB39A9D6F41DB8)
            FS5: Alias(s):HD0a0a2:;BLK7:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)/VenMedia(BE74FCF7-0B7C-49F3-9147-01F4042E6842,EDB22B3A8A95AC4B9A66E4E287559689)
            FS6: Alias(s):HD0a0a2:;BLK8:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)/VenMedia(BE74FCF7-0B7C-49F3-9147-01F4042E6842,FA8B4C241BA35347B093F2E560B563EA)
            FS3: Alias(s):HD0a0a2:;BLK5:
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)/VenMedia(BE74FCF7-0B7C-49F3-9147-01F4042E6842,93DFEA9BE3D44D4CBE5A8A4F978348D2)
           BLK0: Alias(s):
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)
           BLK2: Alias(s):
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(2,GPT,B186A074-AE41-495C-BAF3-04AD655A73FB,0x64028,0xE8B0C90)
           BLK9: Alias(s):
                PciRoot(0x0)/Pci(0x1F,0x2)/Sata(0x0,0x0,0x0)/HD(3,GPT,A1073E53-C768-4CE5-89AD-B558669BDB89,0xE914CB8,0xE8B0C90)
      ```

      * `BLK0` `BLK0`似乎是磁盘块，因为它的路径没有显示任何分区编号或UUID
        * 这是合乎逻辑的，因为固件首先查找的是磁盘，而不是它的分区
      * 我有BLK1/BLK2/BLK9，这是我的3个主要分区
        * 因为我从OpenCore加载了APFS驱动程序，因此显示了新的BLK设备，因此添加了更多的分区，实际上只是APFS容器分区，这些可以忽略
        * 它们可以被忽略的原因是，你可以看到它们具有相同的PARTUUID，而且我们不在这里讨论这些分区
      * FS0似乎是BLK1，这是我的EFI分区，也是FAT32格式，OC所在的位置
        * 在多盘设置中，FS0:可以是UEFI固件首先检测到的任何内容，但这并不意味着OC总是在FS0中，在这些情况下FS0:可以指向USB设备或SATA设备。通常，大多数固件会遵循这个设置来读取/查找分区:USB > SATA > NVME，这不是一个规范，因为其他一些固件可以做其他事情(它也可以取决于引导顺序设置)。
        * 检查你的linux内核是否存在(在系统启动的情况下)
          * `cd FSX:`
          * `ls`
          * 用你的眼睛和大脑细胞
        * 在执行任何操作之前，请确保正确地读取了分区位置
      * FS0/BLK2/BLK9都位于SATA驱动器中(这是我这个示例设备的主引导驱动器)
        * 这将匹配linux将设备读取为`sdX`而不是`nvmeXnX`
        * 在NVMe驱动的情况下，你看到的是` NVMe `而不是`Sata`
      * BLK9的PARTUUID匹配我的根文件系统`a1073e53-c768-4ce5-89ad-b558669bdb89`
        * 但是记住它是大写的!
      * BLK1和BLK2有它们可探索的`FSX`，这意味着UEFI固件可以从它们中探索和读取文件，然而BLK9是一个ext4分区，这意味着UEFI需要一个合适的驱动程序来加载其内容。

  * 识别你的EFI分区(在这个例子中是FS0:)

    * 运行 `map -r > FSX:\drives_map.txt`
      * 这将运行`map`并将输出保存到FSX:在名为`drives_map.txt`的文件中
      * 注意，UEFI固件使用windows风格的路径斜杠' \ '而不是' / '

* 重启到包含ProperTree的macOS/Linux发行版

### 3. 将启动项添加到OpenCore的配置文件中

* 如果:

  * 你的内核在系统分区中:
    * 为您的文件系统下载合适的UEFI驱动程序:
      * 下载 [rEFInd](https://sourceforge.net/projects/refind/)
        * 解压zip
        * 探索提取的zip >重新查找> drivers_x64
        * 你会发现以下驱动因素:
          * ext4
          * ext2
          * btrfs
        * 选择您想要的UEFI驱动程序并将其复制到OC > Drivers中
        * 将其添加到您的config.plist 中(你可以使用 ProperTree > File > OC Snapshot)
  * 你的内核在你的EFI分区(systemdboot)，你不需要设置任何fs驱动程序

* (可选)如果您使用GRUB2，请确保获得`grub.cfg`的副本以获取内核参数

* 在你的plist编辑器中打开config.plist(推荐ProperTree)，在Misc > Entries下，创建一个类型为“Dictionary”的新子元素:

  | Key       | Type    | 说明                                                        | Notes                                                        |
  | --------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | Comment   | String  | 不管你想在这里写什么，我猜它只是一个评论，哈哈 | -                                                            |
  | Enabled   | Boolean | `True`/`ON`/`1`                                              | -                                                            |
  | Name      | String  | 你想要的操作系统的名称                                     | 你想做什么都行                                     |
  | Path      | String  | **Template:**<br />PciRoot(**your_ids**)/Pci(**your_ids**)/.../**Type**(**your_ids**)/HD(**X**,**SCH**,**PARTUUID**,**stuff,from_map**)/\\*path*\\*to*\\*kernel*<br />**Example:**<br />PciRoot(**0x0**)/Pci(**0x1D,0x0**)/Pci(**0x0,0x0**)/**NVMe**(**0x1,9B-64-50-F1-5C-38-25-00**)/HD(**6**,**GPT**,**608DA4F8-DA9E-4792-829F-A4CF4E5B8B82**,**0x2C431800**,**0x3B10800**)/*\boot\vmlinuz-linux* | *检查下面的*                                                |
  | Arguments | String  | **模板:**<br />initrd=\path\to\rd.img\if\used *other_kernel_arguments*<br />**例子:**<br />initrd=\boot\intel_ucode.img initrd=\boot\initramfs-linux.img root=PARTUUID=608da4f8-da9e-4792-829f-a4cf4e5b8b82 ro quiet intel_iommu=on iommu=pt | *检查下面的*                                                |
  | Auxiliary | Boolean | `False`/`NO`/`0`                                             | - False: 总是显示<br />- True: 隐藏直到你按空格<br />- 需要Misc\Boot\HideAuxiliary=True，如果设置为True |

  * **路径说明:**
    * **your_ids**: 来自地图文本文件
    * **Type**: NVMe/SATA
    * **X**: 分区号
    * **SCH**: 磁盘方案(GPT/MBR)
    * **PARTUUID**
    * **stuff,from_map**: 从地图中获取它们
    * *\path\to\kernel*: 它是内核二进制文件的路径
    * **TL;DR: 从map文本文件中复制分区路径.**
      * 注意1:使用反斜杠' \ '表示*内核路径*，这是UEFI固件处理文件路径的方式
      * 注意2:使用常规斜杠`/`作为*PciRoot路径*，如示例和模板中所示
  * **参数说明:**
    * 你可以添加任意数量的`initrd=`(如果你使用linux，你应该知道为什么以及如何添加)
    * 你的其他参数与任何其他引导加载程序中的参数相同，你可以直接在配置中添加/删除/修改

* 附注

  * 你可以使用与上面相同的方案添加其他efi文件或uefi可加载文件(如systemdboot efi, Windows bootmgfw.efi…)
  * **你不能用Ctrl+Enter**将它设置为默认启动选项，所以每次你想启动它时都必须选择它
