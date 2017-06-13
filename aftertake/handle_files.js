var os = require('os')
var platform = os.platform();
const { exec } = require('child_process');

switch(platform){
	case 'darwin':;
	case 'linux':
		exec('mkdir android/app/libs');
		exec('cp node_modules/react-native-webkit-webview/libs/xwalk_core_library-22.52.561.4.aar android/app/libs/')
	break;
	case 'win32':
		exec('mkdir android\app\libs');
		exec(`copy node_modules\react-native-webkit-webview\libs\\xwalk_core_library-22.52.561.4.aar android\app\libs`)
	;
}