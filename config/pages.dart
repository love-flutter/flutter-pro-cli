import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:{{file_name}}';

// @todo
void main() {
  testWidgets('test {{file_name}}', (WidgetTester tester) async {
     final Widget testWidgets = {{class_name}}();
      await tester.pumpWidget(
          new MaterialApp(
              home: testWidgets
          )
      );

      expect(find.byWidget(testWidgets), findsOneWidget);
  });
}