(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{325:function(_,v,n){"use strict";n.r(v);var i=n(10),o=Object(i.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"快速指南没有废话"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#快速指南没有废话"}},[_._v("#")]),_._v(" 快速指南没有废话")]),_._v(" "),v("p",[_._v("好吧，如果你对如何分区和引导多个操作系统很有经验，那么你需要查看以下内容:")]),_._v(" "),v("ul",[v("li",[v("em",[v("strong",[_._v("备份你的数据")])]),_._v("，这很容易变成一个破坏性的操作。")]),_._v(" "),v("li",[_._v("macOS 要求:\n"),v("ul",[v("li",[_._v("EFI分区(ESP)最小为200MB")]),_._v(" "),v("li",[_._v("GPT格式化的磁盘")]),_._v(" "),v("li",[_._v("UEFI系统(或DUET遗留系统，附带OpenCorePkg)")])])]),_._v(" "),v("li",[_._v("最好将OpenCore复制到同一磁盘的EFI中\n"),v("ul",[v("li",[v("strong",[_._v("如果你使用的是旧系统")]),_._v("，请确保你运行了"),v("code",[_._v("BootInstall.command")])]),_._v(" "),v("li",[_._v("EFI分区"),v("strong",[_._v("最好")]),_._v("需要位于"),v("strong",[_._v("磁盘的开头")]),_._v("，以便在Windows下进行多重启动(请阅读OpenCore的configuration.pdf)")])])]),_._v(" "),v("li",[_._v("如果你已经在那个驱动器上有任何东西也没关系:\n"),v("ul",[v("li",[_._v("你可以将其转换为GPT(如果它是MBR)并创建一个标志为十六进制"),v("code",[_._v("EF00")]),_._v("的EFI分区(例如使用gdisk或gparted并选择类型"),v("code",[_._v("EFI")]),v("sup",[_._v("(如果分区尚未格式化，则将显示)")]),_._v(")")]),_._v(" "),v("li",[_._v("将现有的EFI大小调整为"),v("strong",[_._v("200MB")]),_._v(" (windows通常限制新安装的EFI大小为100MB，一些linux发行版有更小或更高的大小，但通常小于200MB)\n"),v("ul",[v("li",[_._v("建议:确保它稍微大一点，比如210MB或其他大小，以计算macOS/Linux/Windows上读取字节/位的差异。(1024的倍数而不是1000，反之亦然)")])])]),_._v(" "),v("li",[_._v("Windows 10 1709及之后版本有一个名为"),v("code",[_._v("mbr2gpt")]),_._v("的实用程序可以将Windows引导盘转换为UEFI\n"),v("ul",[v("li",[_._v("这样做，双引导Windows 10和macOS在同一个驱动器上，无论启动模式是什么\n"),v("ul",[v("li",[_._v("如果是遗留系统，你将无法访问windows，直到你安装OpenCore并从它引导windows")]),_._v(" "),v("li",[_._v("当转换发生时，只要将计算机的固件设置(BIOS设置)配置为UEFI模式，UEFI系统就会直接启动")])])]),_._v(" "),v("li",[_._v("这个实用程序可能因为某种原因无法转换设置，你可以手动执行以下操作:\n"),v("ul",[v("li",[_._v("准备windows 10 USB安装程序")]),_._v(" "),v("li",[_._v("使用linux发行版:\n"),v("ul",[v("li",[_._v("磁盘转换为gpt (gdisk)")]),_._v(" "),v("li",[_._v("创建resize/创建一个十六进制"),v("code",[_._v("EF00")]),_._v("或类型"),v("code",[_._v("efi")]),_._v("的新分区(gparted)\n"),v("ul",[v("li",[_._v("确保在macOS上格式化大小为200MB")]),_._v(" "),v("li",[_._v("您可以在此过程中创建另一个macOS分区")]),_._v(" "),v("li",[_._v("EFI最好是在磁盘的开头(OpenCore要求)")])])])])]),_._v(" "),v("li",[_._v("启动windows安装程序:\n"),v("ul",[v("li",[_._v("通过"),v("code",[_._v("diskpart")]),_._v("为EFI分区和Windows分区分配一个字母(谷歌diskpart分配字母)")]),_._v(" "),v("li",[_._v("运行"),v("code",[_._v("bcdboot C:\\Windows /s s: /f UEFI")]),_._v("(其中"),v("code",[_._v("C:")]),_._v("和"),v("code",[_._v("s:")]),_._v("是分配给Windows和EFI分区的分区字母，请阅读bcdboot手册)")])])]),_._v(" "),v("li",[_._v("启动windows,希望没有什么坏了")])])])])]),_._v(" "),v("li",[_._v("如果你使用的是linux，步骤和之前一样(只有200MB的EFI分区和放置macOS的地方)")])])]),_._v(" "),v("li",[_._v("确保磁盘没有S.M.A.R.T错误")]),_._v(" "),v("li",[_._v("不要在同一个磁盘上有多个EFI，每个磁盘"),v("strong",[_._v("必须")]),_._v("只有"),v("strong",[_._v("一个")]),_._v("EFI分区")]),_._v(" "),v("li",[_._v("操作系统安装顺序"),v("strong",[_._v("无关紧要")]),_._v(" "),v("ul",[v("li",[_._v("然而，windows可能有点麻烦，所以在macOS之后安装它可能是一个挑战，linux不会带来这样的问题")]),_._v(" "),v("li",[_._v("如果你碰巧发现了令人沮丧的windows垃圾，你可以:\n"),v("ul",[v("li",[_._v("启动windows安装程序")]),_._v(" "),v("li",[_._v("擦除你希望在NTFS上安装windows的分区(如预期的那样)")]),_._v(" "),v("li",[_._v("在 "),v("a",{attrs:{href:"https://www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html#Part2",target:"_blank",rel:"noopener noreferrer"}},[_._v("guide over at TenForums"),v("OutboundLink")],1),_._v("上关注剩下的内容。\n"),v("ul",[v("li",[_._v("您不需要MSR和Recovery，并且当磁盘上已经安装了东西时，您无法创建它们(归咎于windows安装程序)\n"),v("ul",[v("li",[_._v("待办事项: 创建一个单独的windows恢复的方法，我找不到任何关于如何做的指南，以便windows可以原生识别它，如果你知道一个指南或知道如何做，用你的想法打开"),v("a",{attrs:{href:"https://github.com/dortania/OpenCore-Multiboot/",target:"_blank",rel:"noopener noreferrer"}},[_._v("a PR"),v("OutboundLink")],1),_._v(" 或 "),v("a",{attrs:{href:"https://github.com/dortania/bugtracker",target:"_blank",rel:"noopener noreferrer"}},[_._v("an issue"),v("OutboundLink")],1),_._v("。")])])])])])])])])])]),_._v(" "),v("p",[_._v("现在你已经掌握了所有这些信息，祝你好运。然而，如果你不确定，请参考下面的详细解释和细节，了解如何正确地做到这一点。")])])}),[],!1,null,null,null);v.default=o.exports}}]);