(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{282:function(t,e,a){t.exports=a.p+"assets/img/disku1.ffad0f5f.png"},283:function(t,e,a){t.exports=a.p+"assets/img/disku2.c0c2657c.png"},327:function(t,e,a){"use strict";a.r(e);var o=a(10),i=Object(o.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"dualbooting-on-the-same-disk"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dualbooting-on-the-same-disk"}},[t._v("#")]),t._v(" Dualbooting on the same disk")]),t._v(" "),e("p",[t._v("Basically, you only have one empty disk and you want to install multiple OSes to it, it "),e("em",[t._v("does not matter if there are other disks")]),t._v(", as this section will only take care of one disk.")]),t._v(" "),e("h2",{attrs:{id:"precautions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#precautions"}},[t._v("#")]),t._v(" Precautions")]),t._v(" "),e("ul",[e("li",[t._v("BACKUP YOUR DATA")]),t._v(" "),e("li",[t._v("If possible, disconnect or disable any other disk/drive in your system, as it may interfere with the install procedure (especially windows')")]),t._v(" "),e("li",[t._v("The drive isn't corrupted or have bad sectors")]),t._v(" "),e("li",[t._v("Stable power input")])]),t._v(" "),e("h2",{attrs:{id:"situation-this-applies-for"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#situation-this-applies-for"}},[t._v("#")]),t._v(" Situation this applies for")]),t._v(" "),e("ul",[e("li",[t._v("You already have macOS installed")]),t._v(" "),e("li",[t._v("You have an empty disk with no OS installed")])]),t._v(" "),e("hr"),t._v(" "),e("p",[t._v("To start, it is recommended to install the OSes on an empty drive with this order (although it will be noted later that it doesn't matter):")]),t._v(" "),e("ol",[e("li",[t._v("macOS")]),t._v(" "),e("li",[t._v("Any other OS")])]),t._v(" "),e("p",[t._v("and make sure to:")]),t._v(" "),e("ol",[e("li",[t._v("Format the disk with macOS disk utility")]),t._v(" "),e("li",[t._v("NOT to format the second partitions with MSDOS")]),t._v(" "),e("li",[t._v("Have an OpenCore USB disk with you")])]),t._v(" "),e("p",[t._v("Here is how it goes:")]),t._v(" "),e("h3",{attrs:{id:"while-installing-macos"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#while-installing-macos"}},[t._v("#")]),t._v(" While installing macOS")]),t._v(" "),e("ol",[e("li",[t._v("Format your whole disk to GPT, this will ensure that macOS installer will create the necessary 200MB EFI partition that macOS requires (otherwise, APFS/HFS will not format the partition)\n"),e("img",{attrs:{src:a(282),alt:"Disk Utility in macOS Installer, select View > All Drives"}})]),t._v(" "),e("li",[t._v('Once done, select "Partition", press "'),e("strong",[t._v("+")]),t._v('" and choose the size of the other partition(s), "Format" MUST be '),e("code",[t._v("Mac OS Extended")]),t._v(" or "),e("code",[t._v("APFS")]),t._v(" (otherwise, macOS will convert the drive to hMBR which will break Windows installation).\n"),e("img",{attrs:{src:a(283),alt:"You can add as many partitions as you like, Remember their sizes"}})]),t._v(" "),e("li",[t._v("Hit Apply and let it do its thing:\n"),e("ul",[e("li",[t._v("NOTE: on some macOS releases/setups, the disk utility may suddenly crash and send you back to the main menu, DO NOT PANIC ("),e("s",[t._v("that sure helps")]),t._v("), just wait for a minute or two then open disk utility back and check if the formatting is done.")])])]),t._v(" "),e("li",[t._v("Once done, you can install macOS on the partition of your choosing and continue along.")])]),t._v(" "),e("h4",{attrs:{id:"note"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#note"}},[t._v("#")]),t._v(" Note")]),t._v(" "),e("ul",[e("li",[t._v("You can still do the above if you have macOS already installed, do NOT use bootcamp assistant.\n"),e("ul",[e("li",[t._v("BootCamp assistant will add extra drivers to the Windows installer that we do not need.")])])])]),t._v(" "),e("h3",{attrs:{id:"for-the-others"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#for-the-others"}},[t._v("#")]),t._v(" For the others")]),t._v(" "),e("h4",{attrs:{id:"windows"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[t._v("#")]),t._v(" Windows")]),t._v(" "),e("p",[t._v("Windows can be a bit of a bitch when it comes to installing it as a second OS (like some kind of insult or just Microsoft doesn't realize that there are other OSes than Windows /s). Create your windows installer (on another computer with the windows creation disk utility or "),e("a",{attrs:{href:"https://rufus.ie",target:"_blank",rel:"noopener noreferrer"}},[t._v("Rufus"),e("OutboundLink")],1),t._v(")")]),t._v(" "),e("p",[t._v("In case Windows has any issues while installing, boot back to the installer, remove the MSR/Recovery/Windows partitions that the installer made (there may be more, make sure you do not delete macOS or other OSes partitions), and follow "),e("a",{attrs:{href:"https://www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("this guide over at TenForums"),e("OutboundLink")],1),t._v(" on how to install windows manually using the "),e("code",[t._v("dism")]),t._v(" tool.")]),t._v(" "),e("h4",{attrs:{id:"linux"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#linux"}},[t._v("#")]),t._v(" Linux")]),t._v(" "),e("p",[t._v("Linux can be straightforward, unlike Windows. Popular linux distros allow custom disk partitioning, just format the blank partition to EXT4 (or whatever other FS you prefer) and make sure you choose the same EFI partition for where the bootloader will be installed (this should NOT \"delete\" OpenCore in any shape or form) and install. Other distros (like Arch) would do that manually anyway, just follow the standard procedure from the beginner guide (without formatting the EFI, because it's already formatted to FAT32) and follow through. Personally, I would recommend not to install other bootloaders (like systemd-boot or grub) for the likes of arch because OpenCore can boot linux kernels that have EFISTUB support, if you do however like using a separate bootloader, you can have it your way, it doesn't change anything.")])])}),[],!1,null,null,null);e.default=i.exports}}]);