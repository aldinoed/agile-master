import 'package:flutter/material.dart';

import 'package:flutter_project/view/splash_screen/splash_screen.dart';

void main() {
  runApp(const GoShip());
}

class GoShip extends StatelessWidget {
  const GoShip({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen()
    );
  }
}