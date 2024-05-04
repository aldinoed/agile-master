import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_project/provider/perusahaan.dart';
import 'package:flutter_project/view/splash_screen/splash_screen.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => PerusahaanProvider(),
      child: GoShip(),
    ),
  );
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