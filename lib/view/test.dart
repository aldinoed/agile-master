import 'package:flutter/material.dart';

import 'package:flutter/material.dart';

class CustomBottomNavBar extends StatefulWidget {
  final int currentIndex;
  // final ValueChanged<int> onTap;
  final List<Widget> screens;

  const CustomBottomNavBar({
    Key? key,
    required this.currentIndex,
    // required this.onTap,
    required this.screens,
  }) : super(key: key);

  @override
  State<CustomBottomNavBar> createState() => _CustomBottomNavBarState();
}

class _CustomBottomNavBarState extends State<CustomBottomNavBar> {
  Color onPressed = Colors.orange;
  Color notPressed = Colors.grey;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        IndexedStack(
          index: widget.currentIndex,
          children: widget.screens,
        ),
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: ClipPath(
            clipper: _BottomNavBarClipper(),
            child: Container(
              height: 80,
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: const Offset(0, -3),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Row(
                    children: [
                      MaterialButton(
                        onPressed: () {
                          setState(() {
                            // widget.onTap(0);
                            onPressed = Colors.orange;
                            notPressed = Colors.grey;
                          });
                        },
                        child: Column(
                          children: [
                            Icon(Icons.home_filled, color: widget.currentIndex == 0 ? onPressed : notPressed),
                            Text(
                              'Home',
                              style: TextStyle(color: widget.currentIndex == 0 ? onPressed : notPressed),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      MaterialButton(
                        onPressed: () {
                          setState(() {
                            // widget.onTap(1);
                            onPressed = widget.currentIndex == 1 ? Colors.orange : Colors.grey;
                            notPressed = widget.currentIndex == 1 ? Colors.grey : Colors.orange;
                          });
                        },
                        child: Column(
                          children: [
                            Icon(
                              Icons.book,
                              color: widget.currentIndex == 1 ? onPressed : notPressed,
                            ),
                            Text(
                              'Guide',
                              style: TextStyle(color: widget.currentIndex == 1 ? onPressed : notPressed),
                            )
                          ],
                        ),
                      )
                    ],
                  )
                ],
              ),
            ),
          ),
        ),
        Positioned(
          bottom: 20,
          right: MediaQuery.of(context).size.width / 2 - 30,
          child: FloatingActionButton(
            elevation: 3,
            onPressed: () {
              // Tambahkan logika untuk menangani tap pada FloatingActionButton
            },
            shape: const CircleBorder(),
            backgroundColor: Colors.orange,
            child: const Icon(Icons.add),
          ),
        ),
      ],
    );
  }
}

class _BottomNavBarClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.moveTo(size.width / 2 - 30, 0);
    path.quadraticBezierTo(size.width / 2 - 30, 20, size.width / 2, 40);
    path.quadraticBezierTo(size.width / 2 + 30, 20, size.width / 2 + 30, 0);
    path.lineTo(size.width, 0);
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) {
    return true;
  }
}