module.exports={

    configureWebpack:{
        resolve:{
            alias:{
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
                'utils':'@/utils',
            }
        }
    },
    // devServer: { // 环境配置
    //     host: '0.0.0.0',
    //     public: '192.169.33.45:8080',
    //     port: '8080',
    //     https: false,
    //     disableHostCheck: true,
    //     open: false // 配置自动启动浏览器

    // }
}