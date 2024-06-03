import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'package:flutter_project/view/home/home.dart';
import 'package:flutter_project/view/list/list_perusahaan.dart';
import 'package:connectivity/connectivity.dart';

Future<bool> checkInternetConnection() async {
  var connectivityResult = await Connectivity().checkConnectivity();
  return connectivityResult != ConnectivityResult.none;
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int currentTab = 0;
  List<Widget> screens = [
    const HomePage(),
    const Guide(),
    const ListPerusahaan()
  ];
  final PageStorageBucket pageStorageBucket = PageStorageBucket();
  Widget currentScreen = HomePage();
  Color onPressed = Color(0xFFF77D00);
  Color notPressed = Color(0xFFC0C0C0);
  bool iconPressed = true;

  @override
  Widget build(BuildContext context) {
    // bool showFab = MediaQuery.of(context).viewInsets.bottom != 0;
    return Scaffold(
      extendBody: true,
      resizeToAvoidBottomInset: false,
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
                        notPressed = Color(0xFFC0C0C0);
                      });
                    },
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.home_filled,
                            color: currentTab == 0 ? onPressed : notPressed),
                        Text(
                          'Beranda',
                          style: TextStyle(
                              color: currentTab == 0 ? onPressed : notPressed),
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
                        notPressed = Color(0xFFC0C0C0);
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
                          'Petunjuk',
                          style: TextStyle(
                              color: currentTab == 1 ? onPressed : notPressed),
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
      floatingActionButton: Visibility(
        //visible: !showFab,
        child: FloatingActionButton(
          elevation: 3,
          onPressed: () {
            setState(() {
              currentScreen = const ListPerusahaan();
              currentTab = 2;
              onPressed = const Color(0xFFF77D00);
              notPressed = Color(0xFFC0C0C0);
            });
          },
          shape: const CircleBorder(),
          backgroundColor: onPressed,
          child: Image.asset(
            'assets/home/center.png',
            height: 24,
            width: 24,
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: FutureBuilder<bool>(
        future: checkInternetConnection(),
        builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator();
          } else {
            if (snapshot.hasError) {
              return Center(
                child: Text('Error: ${snapshot.error}'),
              );
            } else {
              if (snapshot.data == true) {
                return Stack(
                  children: [
                    PageStorage(
                      bucket: pageStorageBucket,
                      child: currentScreen,
                    ),
                  ],
                );
              } else {
                return AlertDialog(
                  backgroundColor: Colors.transparent,
                  contentPadding: EdgeInsets.zero,
                  content: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24.0),
                      boxShadow: [
                        BoxShadow(
                          color: Color(0xFFF77D00).withOpacity(0.2),
                          spreadRadius: 2,
                          blurRadius: 6,
                          offset: Offset(0, 0),
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(top: 24),
                          child: Image.asset(
                            'assets/home/no_internet.png',
                            width: 120,
                            height: 120,
                          ),
                        ),
                        SizedBox(height: 16),
                        RichText(
                          textAlign: TextAlign.center,
                          text: TextSpan(
                            children: [
                              TextSpan(
                                text: 'Maaf, ',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                ),
                              ),
                              TextSpan(
                                text: 'gagal memuat',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFFF77D00),
                                ),
                              ),
                              TextSpan(
                                text: ' halaman ini',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                ),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(height: 8),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: Text(
                            'Periksa koneksi internet Anda dan coba lagi.',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.black, // Content color
                            ),
                          ),
                        ),
                        SizedBox(height: 8),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.only(
                              bottomLeft: Radius.circular(24),
                              bottomRight: Radius.circular(24),
                            ),
                            color: Colors.white,
                          ),
                          child: TextButton(
                            onPressed: () {
                              SystemNavigator.pop();
                            },
                            child: const Text(
                              'OK',
                              style: TextStyle(
                                color: Color(0xFFF77D00),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 16),
                      ],
                    ),
                  ),
                );

                // return AlertDialog(
                //   title: const Text('No Internet Connection'),
                //   content: const Text(
                //       'Please check your internet connection and try again.'),
                //   actions: [
                //     TextButton(
                //       onPressed: () {
                //         SystemNavigator.pop();
                //       },
                //       child: const Text('OK'),
                //     ),
                //   ],
                // );
              }
            }
          }
        },
      ),
    );
  }
}
