'use strict';

var version  = '22.52.561.4';
var beta     = '';

var platform = require('os').platform();
var exec     = require('child_process').execSync;
var fs       = require('fs');
var wget     = require('node-wget');

function prepareLibrary (filePath) {
    try {
        fs.unlinkSync('./libs/' + filePath);
    } catch (e) {
        console.log('No previous file');
    }
    fs.renameSync(filePath, './libs/' + filePath);
    console.log('Library baked');
}

function handleDownloaded (error, data) {
    if (error) {
        console.error('Failed downloading file');
        console.error(error);
    } else {
        prepareLibrary(data.filepath);

        if( /darwin|linux/.test(platform) ){
            exec('mkdir ../../android/app/libs');
            exec('cp ./libs/xwalk_core_library-' + version + '.aar ../../android/app/libs/')
        }

        modifyGuide()
    }
}

function downloadLibrary () {
    var url = 'https://download.01.org/crosswalk/releases/crosswalk/android/maven2/org/xwalk/xwalk_core_library' + beta + '/' + version + '/xwalk_core_library' + beta + '-' + version + '.aar';
    console.log('Downloading file...');
    wget(url, handleDownloaded);
}

downloadLibrary();

function modifyGuide(){
    console.log('\x1b[32m','\n Success download depedencies. \n')
    console.log('\x1b[33m','For','\x1b[36m\x1b[1m','Linux-like OS','\x1b[33m','you can use')
    console.log('\x1b[34m','cat ./node_modules/react-native-webkit-webview/modify_java_project_steps')
    console.log('\x1b[33m','to show setps to modify project files.\n')
    console.log('\x1b[33m','For Windows,you should open README.md for further modify info.\n')
}