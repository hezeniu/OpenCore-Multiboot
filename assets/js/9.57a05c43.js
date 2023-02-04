(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{280:function(e,t,o){e.exports=o.p+"assets/img/msinfo.dca0625d.png"},281:function(e,t,o){e.exports=o.p+"assets/img/linuxefivar.76d4999a.png"},322:function(e,t,o){"use strict";o.r(t);var s=o(10),a=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"uefi-systems"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#uefi-systems"}},[e._v("#")]),e._v(" UEFI Systems")]),e._v(" "),t("p",[e._v("Ever since UEFI, the disk default partition map format is GPT (GUID Partition Table), which added support for more than 2TB of disk size and more than 4 partitions that was the limit of MBR while still keeping a backward compatibility with MBR for legacy systems. If your computer (prebuilt) came with Windows 8 (2012 and later), then your disk is probably partitioned as GPT.")]),e._v(" "),t("p",[e._v("Usually, 2012+ computers that came with Windows 8 would have a UEFI firmware (some OEMs released Windows 7 releases alongside those, so make sure yours has UEFI), and this is a newly spread firmware type (that was in development since the 2000s) and was already deployed on Apple computers ever since the intel switch (but their own heavily modified firmware, it's called EFI and not UEFI for the lack of universality). This new firmware has some new features like Secure Boot, help with faster booting, hardware passthrough, graphical interface with mouse support (and more). To know more about UEFI and Secure Boot check this writeup by Osy86 "),t("a",{attrs:{href:"https://osy.gitbook.io/hac-mini-guide/details/secure-boot",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),t("OutboundLink")],1),e._v(". Basically, a UEFI boot goes something like this:")]),e._v(" "),t("ul",[t("li",[e._v("UEFI Firmware loads up")]),e._v(" "),t("li",[e._v("Loads its integrated drivers and services")]),e._v(" "),t("li",[e._v("Reads the boot menu entries and start loading the first boot entry\n"),t("ul",[t("li",[e._v("If failed starts the next one")])])]),e._v(" "),t("li",[e._v("Loads the bootloader\n"),t("ul",[t("li",[e._v("OS is loaded after that.")])])])]),e._v(" "),t("p",[e._v('Usually, the said "bootloader" is contained somewhere in the disk, and that somewhere is called a '),t("strong",[e._v("EFI Partition")]),e._v(". You can find this named different things like ESP (EFI System Partition), SYSTEM, EFI, BOOT and so on. This partition is "),t("strong",[e._v("FAT32")]),e._v(" formatted and flagged as "),t("strong",[e._v("EF00")]),e._v(" in MBR or "),t("strong",[e._v("C12A7328-F81F-11D2-BA4B-00A0C93EC93B")]),e._v(" GUID in GPT. This partition contains usually the EFI applications (like an OS bootloader) in it that are loaded at boot by the UEFI firmware (remember this as it is important for later for recovery).")]),e._v(" "),t("h1",{attrs:{id:"legacy-csm-systems"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#legacy-csm-systems"}},[e._v("#")]),e._v(" Legacy/CSM Systems")]),e._v(" "),t("p",[e._v("Contrary to UEFI, Legacy systems are older and much more mature (dating back to the first IBM PCs). They're certainly a lot more limited and slower than UEFI on the same system but hold better compatibility with a lot of OSes (even macOS in some rare cases). Computer pre-2012 usually have this type of firmware (some exceptions like servers and some professional laptops and so on that can also have UEFI, they're not reliable thought in that mode). The computer would usually come with a version of Windows that is older than Windows 8 with a hard drive that is less than 2TB. Some desktop users at this time would also install OSes in Legacy mode even if their motherboard supports the newer UEFI standard. This could create issues with multibooting later on.")]),e._v(" "),t("p",[e._v("These systems rely on another method of loading the bootloader. This piece of software is usually written in the first sectors of the disk (formatted as MBR) called "),t("strong",[e._v("boot sector")]),e._v(", this sector is usually 512 or 4096 bytes big, the BIOS would then read the code, copy it to memory and then execute it, at that point an OS or Bootloader menu (like GRUB2) will show up:")]),e._v(" "),t("ul",[t("li",[e._v("BIOS Starts up")]),e._v(" "),t("li",[e._v("Reads the "),t("strong",[e._v("boot sector")])]),e._v(" "),t("li",[e._v("Loads the program into memory")]),e._v(" "),t("li",[e._v("Executes the program")]),e._v(" "),t("li",[e._v("Bootloader appears\n"),t("ul",[t("li",[e._v("The OS will boot now.")])])])]),e._v(" "),t("h1",{attrs:{id:"major-differences-between-the-systems"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#major-differences-between-the-systems"}},[e._v("#")]),e._v(" Major differences between the systems")]),e._v(" "),t("p",[e._v("We'll put them in a table to show the main differences:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th"),e._v(" "),t("th",[t("strong",[e._v("UEFI")])]),e._v(" "),t("th",[t("strong",[e._v("Legacy")])])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("Fast Boot")]),e._v(" "),t("td",[e._v("✅ (on most)")]),e._v(" "),t("td",[e._v("❌ (only some do, not a standard)")])]),e._v(" "),t("tr",[t("td",[e._v("Bootloader Chooser through the boot menu")]),e._v(" "),t("td",[e._v("✅ (on most)")]),e._v(" "),t("td",[e._v("❌ (only some do, not a standard)")])]),e._v(" "),t("tr",[t("td",[e._v("Secure Boot")]),e._v(" "),t("td",[e._v("✅ (on most)")]),e._v(" "),t("td",[e._v("❌ (only some do, not a standard)")])]),e._v(" "),t("tr",[t("td",[e._v("Add a bootloader without overwriting the others")]),e._v(" "),t("td",[e._v("✅ (on most)")]),e._v(" "),t("td",[e._v("❌ (only some do, not a standard)")])]),e._v(" "),t("tr",[t("td",[e._v("Supporting 2TB+ boot disks")]),e._v(" "),t("td",[e._v("✅ (hardware dependent)")]),e._v(" "),t("td",[e._v("❌ (requires GPT, which is supported on some Legacy systems, 2006+)")])]),e._v(" "),t("tr",[t("td",[e._v("Legacy Hardware Support")]),e._v(" "),t("td",[e._v("⚠️ (depends on which hardware, CSM switch should be possible)")]),e._v(" "),t("td",[e._v("✅ (hardware dependent)")])]),e._v(" "),t("tr",[t("td",[e._v("Easier maintenance (managing bootloaders and boot entries)")]),e._v(" "),t("td",[e._v("✅ (on most)")]),e._v(" "),t("td",[e._v("❌ (only some do, not a standard)")])]),e._v(" "),t("tr",[t("td",[e._v("OS Support")]),e._v(" "),t("td",[e._v("✅")]),e._v(" "),t("td",[e._v("✅")])])])]),e._v(" "),t("p",[e._v("Aside from Legacy hardware support (which is rare anyways nowadays), UEFI is the firmware to use when dual booting on newer hardware (2012+). But for legacy users, there is also a way to get some UEFI features but only through DUET (will be later discussed).")]),e._v(" "),t("h1",{attrs:{id:"detecting-which-firmware-you-re-using"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#detecting-which-firmware-you-re-using"}},[e._v("#")]),e._v(" Detecting which firmware you're using")]),e._v(" "),t("h2",{attrs:{id:"no-os"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#no-os"}},[e._v("#")]),e._v(" No OS")]),e._v(" "),t("p",[e._v("If your computer:")]),e._v(" "),t("ul",[t("li",[e._v("is from Ivy Bridge era (~2012) and later")]),e._v(" "),t("li",[e._v("has a Windows 8 Sticker")])]),e._v(" "),t("p",[e._v("Then it probably has "),t("strong",[e._v("UEFI system")]),e._v(", that said, it doesn't mean older generation motherboards do not, however with Windows 8 release, Microsoft standardized the UEFI specs for OEMs to get their certification (usually if you go with brand names like ASUS, Lenovo, HP, Dell... you're good to go).")]),e._v(" "),t("p",[e._v("Any older than the above and the chances of having a proper UEFI implementation diminishes and you're better off with a Legacy booting.")]),e._v(" "),t("h2",{attrs:{id:"on-windows"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#on-windows"}},[e._v("#")]),e._v(" On Windows")]),e._v(" "),t("p",[e._v("Open Run (Win + R) and type "),t("code",[e._v("msinfo32")]),e._v(", you will be greeted with this window:")]),e._v(" "),t("p",[t("img",{attrs:{src:o(280),alt:"MSINFO32 Window"}})]),e._v(" "),t("p",[e._v("Check "),t("strong",[e._v("BIOS Mode")]),e._v(", it will either say "),t("strong",[e._v("UEFI")]),e._v(" or "),t("strong",[e._v("Legacy")]),e._v(". Note that this is for Windows 8/10, if you're using Windows 7 or older, you're probably running it in Legacy mode.")]),e._v(" "),t("h2",{attrs:{id:"on-linux"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#on-linux"}},[e._v("#")]),e._v(" On Linux")]),e._v(" "),t("h3",{attrs:{id:"method-1"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#method-1"}},[e._v("#")]),e._v(" Method 1")]),e._v(" "),t("p",[e._v("On most Linux distributions, you can run")]),e._v(" "),t("p",[t("code",[e._v("ls /sys/firmware/efi")])]),e._v(" "),t("p",[t("img",{attrs:{src:o(281),alt:"img"}})]),e._v(" "),t("p",[e._v("If the folder exists, then you're running in UEFI mode. (screenshot credit: Scooby-Chan#7971)")]),e._v(" "),t("h3",{attrs:{id:"method-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#method-2"}},[e._v("#")]),e._v(" Method 2")]),e._v(" "),t("p",[e._v("You can also download and run "),t("code",[e._v("efibootmgr")]),e._v(" (available on most distributions) and you will either:")]),e._v(" "),t("ul",[t("li",[e._v("Get boot entries variables\n"),t("ul",[t("li",[e._v("Your system is running UEFI")])])]),e._v(" "),t("li",[e._v("or get an error message that EFI variables aren't supported\n"),t("ul",[t("li",[e._v("Your system is running in Legacy mode")])])])]),e._v(" "),t("hr"),e._v(" "),t("h1",{attrs:{id:"macos-in-all-of-this"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#macos-in-all-of-this"}},[e._v("#")]),e._v(" macOS in all of this")]),e._v(" "),t("p",[e._v("macOS requires some special treatment because Apple wants to (pampering their OS), and thus requires a set of rules to get it installed on any drive:")]),e._v(" "),t("ul",[t("li",[e._v("GPT formatted disk")]),e._v(" "),t("li",[e._v("EFI partition of at least 200MB")])]),e._v(" "),t("p",[e._v("With these two requirements in mind, you can theoretically just make them happen and you're good to go. If you understood what to do from these requirements and can do it on your own, you're good to go, if not, stay here to get more tips and tricks on how to properly fix this.")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("Next sections:")]),e._v(" "),t("p",[e._v("Cases:")]),e._v(" "),t("ul",[t("li",[e._v("No OS installed on the machine:\n"),t("ul",[t("li",[e._v("DB on same disk")]),e._v(" "),t("li",[e._v("DB on different disks")])])]),e._v(" "),t("li",[e._v("Already installed OS or existing data in the drive\n"),t("ul",[t("li",[e._v("Systems with native UEFI support: convert your legacy booting OS to a UEFI one\n"),t("ul",[t("li",[e._v("Linux")]),e._v(" "),t("li",[e._v("Windows")]),e._v(" "),t("li",[e._v("Systems with only Legacy booting only option:\n"),t("ul",[t("li",[e._v("DUET")])])])])])])])]),e._v(" "),t("p",[e._v("Good luck, and "),t("em",[t("strong",[e._v("BACKUP YOUR DATA")])]),e._v(".")])])}),[],!1,null,null,null);t.default=a.exports}}]);