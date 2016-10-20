/**************************************
* 文件解析、加载
***************************************/
// npm install -g fis-parser-less
// npm install -g fis3-postprocessor-autoprefixer
// 解析 less
fis.match('*.less', {
    parser: fis.plugin('less'),
    postprocessor : fis.plugin("autoprefixer", {
        "browsers": ['Firefox >= 36', 'Safari >= 8', 'Explorer >= 9', 'Chrome >= 41', "ChromeAndroid >= 4.0"],
        "flexboxfixer": true,
        "gradientfixer": true
    }),
    rExt: '.css'
});

// npm i -g fis-parser-node-sass
// 用 node-sass 解析
/*fis.match('*.scss', {
    rExt: 'css',
    parser: [
        fis.plugin('node-sass', {
            include_paths: [
                'static/scss'
            ] || []
        })
    ],
    postprocessor: fis.plugin('autoprefixer')
});*/

// npm install -g fis-parser-es6-babel
// npm install -g fis-parser-babel-5.x
// 解析 es6 和 react 文件
fis.match('/resources/**.{es,es6,jsx}', {
    rExt: '.js',
    parser: fis.plugin('babel-5.x', {
        //plugins: ["transform-runtime"],
        //blacklist: ['regenerator'],
        //optional: ["es7.decorators"],
        stage: 0,
        sourceMaps: true
    })
    //parser: fis.plugin('babel-6.x', {})
    //parser: fis.plugin('es6-babel')
});

// app 目录 js 文件也 babel 编译
fis.match('/resources/{app,js,modules, lib/vuex}/**.js', {
    rExt: '.js',
    parser: fis.plugin('babel-5.x', {
        stage: 0,
        sourceMaps: true
    })
});

// npm install -g fis-parser-vue
// 解析 vue 文件
fis.set('project.fileType.text', 'vue');
fis.match('*.vue', {
    rExt: '.js',
    parser: fis.plugin('vue')
});
