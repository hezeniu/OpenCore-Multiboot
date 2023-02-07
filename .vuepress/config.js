const {
    description
} = require('../package')

module.exports = {
    title: 'OpenCore 多重引导',
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
        repo: 'https://github.com/sumingyd/OpenCore-Multiboot',
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: true,
        lastUpdated: '上次更新',
        logo: 'homepage.png',
        nav: [
            {
                text: '指南菜单',
                items: [
                    {
                        text: 'OpenCore安装',
                        link: 'https://sumingyd.github.io/OpenCore-Install-Guide/'
                    },
                    {
                        text: 'OpenCore安装后',
                        link: 'https://sumingyd.github.io/OpenCore-Post-Install/'
                    },
                    {
                        text: 'OpenCore多重引导',
                        link: 'https://sumingyd.github.io/OpenCore-Multiboot/'
                    },
                    {
                        text: '开始使用ACPI',
                        link: 'https://sumingyd.github.io/Getting-Started-With-ACPI/'
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
                    },
                ]
            },
            { text: 'QQ群', link: 'https://jq.qq.com/?_wv=1027&k=liYHt5VH' },
        ],
        sidebar: [{
            title: '多重引导与OpenCore',
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
                ['QUICK', '快!我知道该做什么，告诉我怎么做就好'],
            ]

        },
        {
            title: '多重引导介绍',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/Intro/Def', '它是什么?'],
                ['/Intro/Booting-part', 'UEFI? Legacy? CSM? 是什么?'],
                ['/Intro/disc', '免责声明'],
            ]

        },
        {
            title: '多重引导情况',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/empty/', '多重引导情况'],
                {
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['/empty/samedisk', '一个磁盘-多个操作系统'],
                        ['/empty/diffdisk', '多个磁盘-多个操作系统'],
                    ]
                },
                ['/exist/', '已充满数据的磁盘'],
                {
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['/exist/data', '在已充满数据的非操作系统相关磁盘(数据磁盘)上'],
                        ['/exist/os', '在一个充满操作系统相关的磁盘上(Windows/Linux)'],
                    ]
                },
            ]

        },
        {
            title: 'OpenCore配置',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['/oc/win', '关于Windows引导'],
                ['/oc/linux', '关于Linux启动'],
                ['/oc/duet', '在legacy系统上安装OpenCore'],
                ['https://sumingyd.github.io/OpenCore-Post-Install/multiboot/bootstrap.html', '使用启动器选项'],
                ['https://sumingyd.github.io/OpenCore-Post-Install/multiboot/bootcamp.html', 'BootCamp安装'],
            ]

        },
        ],
    },
    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        ['@vuepress/back-to-top', true],//开启右下角返回顶层图标
        ['@vuepress/nprogress', true],//这个插件将会在你切换页面的时候，在顶部显示进度条。
        ['vuepress-plugin-smooth-scroll', true],//在你的 VuePress 站点中使用平滑滚动。
        ['vuepress-plugin-fulltext-search', true],//基于 Headers 的搜索插件
        ['@vuepress/medium-zoom', {
            selector: ".theme-succinct-content :not(a) > img",
            options: {
                background: 'var(--bodyBgColor)'
            }
        }
        ],//这个插件将会使你的图片支持点击缩放。
        ['@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        }
        ],//页面滚动时自动激活侧边栏链接的插件
    ]
}
