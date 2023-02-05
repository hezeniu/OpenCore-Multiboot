# 使用Bootstrap.efi

因此，在OpenCore 0.5.8及更新版本中，我们在EFI/OC/Bootstrap文件夹中获得了一个整洁的小文件，名为Bootstrap. EFI。这允许我们做的是将OpenCore添加到我们主板的引导菜单，并防止Windows或Linux试图覆盖BOOTx64.efi文件的问题，这可能在更新期间发生，并完全删除引导OpenCore的任何方式。

## 准备

首先，我们需要以下东西:

* [OpenCore 0.5.8 或更新版本](https://github.com/acidanthera/OpenCorePkg/releases)
  * 确认你已经安装了EFI/OC/Bootstrap/Bootstrap. EFI
* config.plist 设置:
  * Misc -> Security -> BootProtect -> Bootstrap
  * UEFI -> Quirks -> RequestBootVarRouting -> True
* [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases)
  * 与OpenCore绑定
  * 请记住将此添加到EFI/OC/Tools和config.plist -> Misc -> Tools
  * 主要用于故障排除
  
## Booting

So once you've got the prerequisites out of the way, we're ready to boot! So what the first boot with these settings enabled is to create a new boot option in our BIOS(Boot9696) and every boot after this will update the entry making sure it's correct. This now allows us to either remove BOOTx64.efi or not worry about it when other OSes overwrite this file.

If no new boot option is created, you can go down and follow the troubleshooting steps on manually adding it. But triple check the above settings are correct on your system.
  
## Troubleshooting

This is mainly as a mini-guide in case BootProtect doesn't work or you'd like to do it manually.

* [Verify Bootstrap entry was applied](#verify-bootstrap-entry-was-applied)
* [Removing Bootstrap entry from BIOS](#removing-bootstrap-entry-from-bios)

### Verify Bootstrap entry was applied

For those wanting to verify that the entry was applied in OpenCore, enabling logging(see [OpenCore Debugging](/troubleshooting/debug.md)) and check for entries similar to these:

```sh
OCB: Have existing option 1, valid 1
OCB: Boot order has first option as the default option
```

### Removing Bootstrap entry from BIOS

Because the Bootstrap entry is a protected entry when resetting NVRAM, you'll need to set certain settings:

* Misc -> Security -> AllowNvramReset -> true
* Misc -> Security -> BootProtect -> None

Once these 2 are set in your config.plist, you can next reboot into the OpenCore picker and select the `Reset NVRAM` entry
