const {
    description
} = require('../package')

module.exports = {
    title: 'OpenCore 多引导',
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        },]
    ],
    base: '/OpenCore-Multiboot/',

	markdown: {
		extendMarkdown: md => {
			md.use(require('markdown-it-multimd-table'), {
				rowspan: true,
			});
		}
	},
    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/sumingyd/OpenCore-Multiboot',
		editLinks: true,
		editLinkText: '帮助我们改进此页!',
        logo: 'homepage.png',
        nav: [{
            text: '指南菜单',
            ariaLabel: 'Language Menu',
            items: [
            {
                text: 'OpenCore安装指南',
                link: 'https://sumingyd.github.io/OpenCore-Install-Guide/'
            },
            {
                text: 'OpenCore安装后',
                link: 'https://sumingyd.github.io/OpenCore-Post-Install/'
            },
            {
                text: '无线购买指南',
                link: 'https://sumingyd.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: '显卡购买指南',
                link: 'https://sumingyd.github.io/GPU-Buyers-Guide/'
            },
            {
                text: '避免购买指南',
                link: 'https://sumingyd.github.io/Anti-Hackintosh-Buyers-Guide/'
            }
            ]
        },
            /*
              {
                text: 'Github',
                link: 'https://github.com/sumingyd/OpenCore-Install-Guide'
              }
            */
        ],
        sidebar: [{
	            title: '多引导与OpenCore',
                collapsable: false,
                sidebarDepth: 0,
                children: [
                    '',
                ]
	        },
		{
            title: '适用于已经处理过多引导的有经验的用户',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['QUICK', 'Quick! I know what do, just tell me already HOW'],
            ]

        },
		{
            title: '多引导介绍',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/Intro/Def', 'What is it?'],
				['/Intro/Booting-part', 'UEFI? Legacy? CSM? What?'],
				['/Intro/disc', 'Disclaimer'],
            ]

        },
		{
            title: '多引导情况',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/empty/', 'Multibooting Situations'],
				{
            	collapsable: false,
            	sidebarDepth: 1,
	            children: [
	                ['/empty/samedisk', 'One disk - multiple OSes'],
					['/empty/diffdisk', 'Multiple disks - multiple OSes'],
	            ]
				},
				['/exist/', 'Existing Filled Disk'],
				{
            	collapsable: false,
            	sidebarDepth: 1,
	            children: [
	                ['/exist/data', 'On a filled non-OS related disk (Data disk)'],
					['/exist/os', 'On a filled OS related disk (Windows/Linux)'],
	            ]
				},
            ]

        },
		{
            title: 'OpenCore配置',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/oc/win', 'For Windows booting'],
				['/oc/linux', 'For Linux booting'],
				['/oc/duet', 'Installing OpenCore on a legacy system'],
				['https://sumingyd.github.io/OpenCore-Post-Install/multiboot/bootstrap.html', 'Using LauncherOption'],
				['https://sumingyd.github.io/OpenCore-Post-Install/multiboot/bootcamp.html', 'BootCamp installation'],
            ]

        },
    	],
    },
    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}
