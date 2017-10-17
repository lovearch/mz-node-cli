/**************************************
 * prod：发外网打包、压缩、加MD5、代码检查
 ***************************************/

// optimize压缩、加MD5
fis.media('prod')
    //js 压缩
    .match('/{resources,node_modules}/**.{js,es,vue,es6,ts,tsx,jsx}', {
        optimizer: fis.plugin('uglify-js', {
            compress: {
                drop_console: true
            }
        })
    })
    //css 压缩
    .match('/{resources,node_modules}/**.{css,less,sass}', {
        optimizer: fis.plugin('clean-css')
    })
    /*.match(/resources\/.*(-|\.)min\.(js|css)$/i, { // min.js/css 不压缩
            optimizer: false
        })*/
    //资源文件添加 hash
    .match('/{resources,node_modules}/**.{jpg,png,gif,bmp,jpeg,webp}', {
        useHash: true
    }).match('/resources/static/**', { // static 目录不作 md5 处理
        useHash: false,
        optimizer: false,
        isMod: false
    }).match('/resources/static/require/**', { // require.js 需要 md5
        useHash: true
    }).match('/resources/{app,comm,common,js}/**.{js,es,vue,es6,ts,tsx,jsx}', {
        useHash: true
    }).match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                ignore: [ //排除掉下面的文件不打包
                    'resources/static/**'
                ],
                js: '/resources/pkg/js/mznode_${hash}.js',
                css: '/resources/pkg/css/mznode_${hash}.css'
            },
            resoucemap: '/resources/pkg/map_${hash}.js'
        })
    });

// 发布时，不 release demo
fis.match('demo/**', {
    release: false
});
