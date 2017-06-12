# react-native-webkit-webview

[![NPM](https://nodei.co/npm/react-native-webkit-webview.png?downloads=true&stars=true)](https://nodei.co/npm/react-native-webkit-webview/)


[![Build Status](https://travis-ci.org/react-native-china/react-native-webkit-webview.svg?branch=master)](https://travis-ci.org/react-native-china/react-native-webkit-webview)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
[![depedencies](https://david-dm.org/react-native-china/react-native-webkit-webview.svg)](https://github.com/react-native-china/react-native-webkit-webview)

Forked from [react-native-webview-crosswalk](https://github.com/jordansexton/react-native-webview-crosswalk)

Cross-platform Webview component,With better performance on android.

### Dependencies

`react-native >=0.32.0`, `react >= 15.3.0`

### Installation

* From the root of your React Native project

```shell
npm install react-native-webkit-webview --save
mkdir android/app/libs
cp node_modules/react-native-webkit-webview/libs/xwalk_core_library-22.52.561.4.aar android/app/libs/
```

### Include module in your Android project

* In `android/setting.gradle`

```diff
...
+ include ':CrosswalkWebView', ':app'
+ project(':CrosswalkWebView').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webkit-webview')
```

### Include libs in your Android project

* In `android/build.gradle`

```diff
...
allprojects {
    repositories {
        mavenLocal()
        jcenter()

+        flatDir {
+            dirs 'libs'
+        }
    }
}
```

* In `android/app/build.gradle`

```diff
...
dependencies {
  ...
+  compile (name: "xwalk_core_library-22.52.561.4", ext: "aar")
+  compile project(':CrosswalkWebView')
}
```

* Register package :

* In `android/app/src/main/java/com/YOUR_PROJECT_NAME/MainActivity.java`

```diff
+ import com.jordansexton.react.crosswalk.webview.CrosswalkWebViewPackage;

public class MainApplication extends Application implements ReactApplication {
  ......

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
+       new CrosswalkWebViewPackage()    // <--- add this line
    );
  }

  ......

}
```

#### Usage

```javascript
// DemoComponents.js
import React,{ Component } from 'react'
import { View,TouchableHighlight,Text } from 'react-native'
import WebkitView from 'react-native-webkit-webview'

import localDemoPage from './demoPage.html'

export default class DemoComponents extends Component{
  render(){
    return (
      <View>
        <TouchableHighlight onPress={ this.passMessageToWebpage }>
          <Text>Tell webpage some message</Text>
        </TouchableHighlight>
        <WebkitView
          source={ localDemoPage // local file usage} 
          source={{ uri:'http://www.demo.com/path' //link usage }}
          injectedJavascript="setTimeout(function(){document.write('WONDERFUL')},1000)"
          onMessage = { this.messageHandler }
          ref={ (webkitView) => { this.webkitView = webkitView } }
        />
      </View>
    )
  }

  passMessageToWebpage = () => {
    this.webkitView.postMessage('hello there')
  }

  messageHandler = (ev) => {
    console.log(ev)
  }
}
```

```html
<!-- demoPage.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script>
    window.addEventListener('message',(ev) => {
      console.log(ev);
    })
  </script>
</body>
</html>

```



## License
MIT
