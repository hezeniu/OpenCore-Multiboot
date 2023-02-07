(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{282:function(s,t,a){s.exports=a.p+"assets/img/disku1.ffad0f5f.png"},283:function(s,t,a){s.exports=a.p+"assets/img/disku2.c0c2657c.png"},328:function(s,t,a){"use strict";a.r(t);var i=a(10),r=Object(i.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"在同一个磁盘上进行双启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在同一个磁盘上进行双启动"}},[s._v("#")]),s._v(" 在同一个磁盘上进行双启动")]),s._v(" "),t("p",[s._v("基本上，你只有一个空磁盘，并且你想要在其中安装多个操作系统，"),t("strong",[s._v("如果有其他磁盘也没关系")]),s._v("，因为本节只会关注一个磁盘。")]),s._v(" "),t("h2",{attrs:{id:"预防措施"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#预防措施"}},[s._v("#")]),s._v(" 预防措施")]),s._v(" "),t("ul",[t("li",[s._v("备份您的数据")]),s._v(" "),t("li",[s._v("如果可能，断开或禁用系统中的任何其他磁盘/驱动器，因为它可能会干扰安装过程(特别是windows的)")]),s._v(" "),t("li",[s._v("驱动器没有损坏或坏扇区")]),s._v(" "),t("li",[s._v("电源输入稳定")])]),s._v(" "),t("h2",{attrs:{id:"这种情况适用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#这种情况适用"}},[s._v("#")]),s._v(" 这种情况适用")]),s._v(" "),t("ul",[t("li",[s._v("你已经安装了macOS")]),s._v(" "),t("li",[s._v("你有一个没有安装操作系统的空磁盘")])]),s._v(" "),t("hr"),s._v(" "),t("p",[s._v("首先，建议按照这个顺序将操作系统安装在一个空的驱动器上(虽然后面会注意到这无关紧要):")]),s._v(" "),t("ol",[t("li",[s._v("macOS")]),s._v(" "),t("li",[s._v("其他操作系统")])]),s._v(" "),t("p",[s._v("并确保:")]),s._v(" "),t("ol",[t("li",[s._v("使用macOS磁盘实用程序格式化磁盘")]),s._v(" "),t("li",[s._v("不要用MSDOS格式化第二个分区")]),s._v(" "),t("li",[s._v("你有一个OpenCore u盘")])]),s._v(" "),t("p",[s._v("事情是这样的:")]),s._v(" "),t("h3",{attrs:{id:"安装macos时"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装macos时"}},[s._v("#")]),s._v(" 安装macOS时")]),s._v(" "),t("ol",[t("li",[s._v("将整个磁盘格式化为GPT，这将确保macOS安装程序将创建macOS所需的必要的200MB EFI分区(否则，APFS/HFS将不会格式化分区)。\n"),t("img",{attrs:{src:a(282),alt:"Disk Utility in macOS Installer, select View > All Drives"}})]),s._v(" "),t("li",[s._v("完成后，选择“分区”，按“"),t("strong",[s._v("+")]),s._v("”并选择其他分区的大小，“格式”必须是“Mac OS Extended”或“APFS”(否则，macOS将把驱动器转换为hMBR，这会破坏Windows安装)。\n"),t("img",{attrs:{src:a(283),alt:"You can add as many partitions as you like, Remember their sizes"}})]),s._v(" "),t("li",[s._v("点击应用，让它做它自己的事情:\n"),t("ul",[t("li",[s._v("注意:在某些macOS版本/设置上，磁盘实用程序可能会突然崩溃，并让你回到主菜单，不要惊慌("),t("s",[s._v("这肯定有帮助")]),s._v(")，只是等待一两分钟，然后打开磁盘实用程序，检查是否完成格式化。")])])]),s._v(" "),t("li",[s._v("完成后，你可以在你选择的分区上安装macOS并继续。")])]),s._v(" "),t("h4",{attrs:{id:"注意"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[s._v("#")]),s._v(" 注意")]),s._v(" "),t("ul",[t("li",[s._v("如果你已经安装了macOS，你仍然可以执行上述操作，但不要使用bootcamp assistant。\n"),t("ul",[t("li",[s._v("BootCamp assistant将为Windows安装程序添加我们不需要的额外驱动程序。")])])])]),s._v(" "),t("h3",{attrs:{id:"对于其他人"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对于其他人"}},[s._v("#")]),s._v(" 对于其他人")]),s._v(" "),t("h4",{attrs:{id:"windows"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[s._v("#")]),s._v(" Windows")]),s._v(" "),t("p",[s._v("当它被安装为第二个操作系统时，Windows可能有点烦人(就像某种侮辱，或者只是微软没有意识到除了Windows /s之外还有其他操作系统)。创建windows安装程序(在另一台计算机上使用windows创建磁盘工具或"),t("a",{attrs:{href:"https://rufus.ie",target:"_blank",rel:"noopener noreferrer"}},[s._v("Rufus"),t("OutboundLink")],1),s._v(")")]),s._v(" "),t("p",[s._v("如果Windows在安装过程中出现任何问题，请引导回安装程序，删除安装程序所创建的MSR/Recovery/Windows分区(可能有更多，请确保您没有删除macOS或其他操作系统分区)，并遵循"),t("a",{attrs:{href:"https://www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("TenForums"),t("OutboundLink")],1),s._v(" 关于如何使用"),t("code",[s._v("dism")]),s._v("工具手动安装Windows的指南。")]),s._v(" "),t("h4",{attrs:{id:"linux"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux"}},[s._v("#")]),s._v(" Linux")]),s._v(" "),t("p",[s._v("与Windows不同，Linux可以很简单。流行的linux发行版允许自定义磁盘分区，只需将空白分区格式化为EXT4(或您喜欢的任何其他FS)，并确保选择相同的EFI分区用于安装引导加载程序(这不应该“删除”任何形式的OpenCore)和安装。其他发行版(如Arch)无论如何都会手动执行此操作，只需遵循初学者指南中的标准过程(无需格式化EFI，因为它已经格式化为FAT32)并继续执行。就个人而言，我建议不要为arch安装其他引导加载程序(如systemd-boot或grub)，因为OpenCore可以引导具有EFISTUB支持的linux内核，如果您喜欢使用单独的引导加载程序，则可以按您的方式进行，它不会改变任何东西。")])])}),[],!1,null,null,null);t.default=r.exports}}]);