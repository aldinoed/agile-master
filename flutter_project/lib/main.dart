import 'package:flutter/material.dart';
import 'package:flutter_project/view/list/list_perusahaan.dart';


void main() {
  runApp(const GoShip());
}

class GoShip extends StatelessWidget {
  const GoShip({super.key});


  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Listperusahaan(),
    );
  }
}
