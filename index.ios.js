import React,{ Component } from 'react'
import {
	WebView
} from 'react-native'
import invariant from 'fbjs/lib/invariant';

export default class CrosswalkWebView {
	render(){
		return (
			<WebView
				onMessage={ this.props.onMessage }
				injectedJavaScript={ this.props.injectedJavaScript }
			/>
		)
	}

	injectJavaScript = () => {
		invariant(false,`You are not allowed to use injectJavascript directly to keep same with android platform.Define functions and call them with postMessage method. `)
	}
}
