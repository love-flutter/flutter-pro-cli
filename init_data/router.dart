import 'package:flutter/material.dart';

/// 处理APP内的跳转
class Router {
//  static const homePage = 'app://';

  /// 根据url处理获得需要跳转的action页面以及需要携带的参数
  Widget _getPage(String url) {
//    // @todo
//    if (url.startsWith('https://') || url.startsWith('http://')) {
//      return WebViewPage(url);
//    } else {
//      Map urlParseRet = _parseUrl(url);
//      switch (urlParseRet['action']) {
//        case homePage:
//          return homePage();
//      }
//    }
//    return null;
  }

  /// 执行页面跳转
  Router.push(BuildContext context, String url) {
    Navigator.push(context, MaterialPageRoute(builder: (context) {
      return _getPage(url);
    }));
  }

  /// 解析跳转的url，并且分析其内部参数
  Map _parseUrl(String url) {
    int placeIndex = url.indexOf('?');

    if (placeIndex < 0) {
      return {'action': url, 'params': null};
    }

    String action = url.substring(0, placeIndex);
    String paramStr = url.substring(placeIndex + 1);

    if (paramStr == null) {
      return {'action': action, 'params': null};
    }

    Map params = {};
    List<String> paramsStrArr = paramStr.split('&');

    for (String singleParamsStr in paramsStrArr) {
      List singleParamsArr = singleParamsStr.split('=');
      params[singleParamsArr[0]] = singleParamsArr[1];
    }
    return {'action': action, 'params': params};
  }
}
