import 'package:flutter/material.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'package:flutter_project/view/home/home.dart';
import 'package:flutter_project/view/list/list_perusahaan.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int currentTab = 0;
  List<Widget> screens = [const HomePage(), const Guide(), const Listperusahaan()];
  final PageStorageBucket pageStorageBucket = PageStorageBucket();
  Widget currentScreen = HomePage();
  Color onPressed = Colors.orange;
  Color notPressed = Colors.grey;
  bool iconPressed = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomAppBar(
            color: Colors.white,
            elevation: 0,
            shape: CircularNotchedRectangle(),
            notchMargin: 10.0,
            child: Container(
              height: 40,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Row(
                    children: [
                      MaterialButton(
                        onPressed: () {
                          setState(() {
                            currentScreen = HomePage();
                            currentTab = 0;
                            onPressed = const Color(0xFFF77D00);
                            notPressed = Colors.grey;
                          });
                        },
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.home_filled, color: currentTab == 0 ? onPressed : notPressed),
                            Text(
                              'Home',
                              style: TextStyle(color: currentTab == 0 ? onPressed : notPressed),
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
                            currentScreen = Guide();
                            currentTab = 1;
                            onPressed = const Color(0xFFF77D00);
                            notPressed = Colors.grey;
                          });
                        },
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.book,
                              color: currentTab == 1 ? onPressed : notPressed,
                            ),
                            Text(
                              'Guide',
                              style: TextStyle(color: currentTab == 1 ? onPressed : notPressed),
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
      backgroundColor: Colors.white70.withOpacity(0.95),
      floatingActionButton: FloatingActionButton(
        elevation: 3,
        onPressed: () {
          setState(() {
            currentScreen = const Listperusahaan();
            currentTab = 2;
            onPressed = const Color(0xFFF77D00);
            notPressed = Colors.grey;
          });
        },
        shape: const CircleBorder(),
        backgroundColor: onPressed,
        child: const Image(
          image: AssetImage('assets/home/center.png'),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body:
      // Stack(
      //   children: [
          PageStorage(
            bucket: pageStorageBucket,
            child: currentScreen,
          ),
          // Positioned(
          //   bottom: -15,
          //   left: 0,
          //   right: 0,
          //   child: BottomAppBar(
          //     color: Colors.white,
          //     elevation: 3,
          //     shape: CircularNotchedRectangle(),
          //     notchMargin: 10.0,
          //     child: Container(
          //       height: 40,
          //       child: Row(
          //         mainAxisAlignment: MainAxisAlignment.spaceAround,
          //         children: [
          //           Row(
          //             children: [
          //               MaterialButton(
          //                 onPressed: () {
          //                   setState(() {
          //                     currentScreen = HomePage();
          //                     onPressed = Colors.orange;
          //                     notPressed = Colors.grey;
          //                   });
          //                 },
          //                 child: Column(
          //                   children: [
          //                     Icon(Icons.home_filled, color: onPressed),
          //                     Text(
          //                       'Home',
          //                       style: TextStyle(color: onPressed),
          //                     )
          //                   ],
          //                 ),
          //               ),
          //             ],
          //           ),
          //           Row(
          //             children: [
          //               MaterialButton(
          //                 onPressed: () {
          //                   setState(() {
          //                     currentScreen = Guide();
          //                     currentTab = 1;
          //                     onPressed = Colors.grey;
          //                     notPressed = Colors.orange;
          //                   });
          //                 },
          //                 child: Column(
          //                   children: [
          //                     Icon(
          //                       Icons.book,
          //                       color: notPressed,
          //                     ),
          //                     Text(
          //                       'Guide',
          //                       style: TextStyle(color: notPressed),
          //                     )
          //                   ],
          //                 ),
          //               )
          //             ],
          //           )
          //         ],
          //       ),
          //     ),
          //   ),
          // ),
          // Positioned(
          //   bottom: 60, // Menggeser FloatingActionButton ke atas
          //   right: MediaQuery.of(context).size.width / 2 - 30,
          //   child: FloatingActionButton(
          //     elevation: 3,
          //     onPressed: () {
          //       setState(() {
          //         currentScreen = Listperusahaan();
          //       });
          //     },
          //     shape: const CircleBorder(),
          //     backgroundColor: Colors.orange,
          //     child: const Image(
          //       image: AssetImage('assets/home/center.png'),
          //     ),
          //   ),
          // ),
        // ],
      // ),
    );
  }
}
