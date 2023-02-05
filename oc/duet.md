# 在遗留系统上安装OpenCore

目前还没有官方支持的MBR/遗留的Windows安装，有计划，但不太可能很快看到:[添加MBR加载工具OpenCore](https://github.com/acidanthera/bugtracker/issues/912)

目前，有2个变通方案:

* 将Windows转换为基于GPT的驱动器(这意味着你每次都必须使用OpenCore启动)
* Chainload rEFInd确实有支持

对于后者:

1. [设置 rEFInd](https://www.rodsbooks.com/refind/installing.html)
2. 为rEFInd添加blesoverride路径(`\EFI\refind\refind_x64.efi`)
3. 启动 OpenCore
4. Chain-load rEFInd
5. 选择 Windows

![](../images/duet-md/blessoverride.png)
