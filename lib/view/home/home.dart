import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'dart:math';
import 'package:flutter_project/model/story.dart';
import 'package:flutter_project/view/main_screen/main_screen.dart';
import 'package:carousel_slider/carousel_slider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Perusahaan> perusahaan = [];
  List<Story> stories = [];
  final _lightColors = [
    Color(0xFFD62828),
    Color(0xFF120B0B),
    Color(0xFF35C91C),
    Color(0xFF605B57),
  ];

  @override
  void initState() {
    try {
      super.initState();
      _loadStories();
      _loadPerusahaan();
    } catch (error) {
      print(error);
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content:
                const Text("Failed to fetch data. Please try again later."),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text("OK"),
              ),
            ],
          );
        },
      );
    }
  }

  Future<void> _loadPerusahaan() async {
    perusahaan = await Perusahaan.getPerusahaan();
    setState(() {
      perusahaan;
    });
  }

  Future<void> _loadStories() async {
    stories = await Story.getStory();
    setState(() {
      stories;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(250, 250, 254, 1),
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(250, 250, 254, 1),
        title: InkWell(
          onTap: () {
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(builder: (context) => MainScreen()),
            );
          },
          child: Align(
            alignment: Alignment.center,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Image.asset(
                  'assets/logo/logo-1.png',
                  height: 40,
                  width: 40,
                ),
                const SizedBox(width: 10),
                const Text(
                  'Goship',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'LibreBaskerville',
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          ),
        ),
        centerTitle: true,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CarouselSlider(
                  options: CarouselOptions(
                    height: 130,
                    enlargeCenterPage: true,
                    enableInfiniteScroll: true,
                  ),
                  items: [
                    'assets/home/hero1.png',
                    'assets/home/hero3.png',
                    'assets/home/hero2.png',
                  ].map((String item) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          width: MediaQuery.of(context).size.width,
                          child: Image.asset(
                            item,
                            fit: BoxFit.fill,
                          ),
                        );
                      },
                    );
                  }).toList(),
                ),
                SizedBox(height: 24), // Space between carousel and text
                const Text(
                  "Where you're interested?",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontFamily: 'DM Sans',
                    fontSize: 18,
                  ),
                ),
                SizedBox(height: 2),
                const Text(
                  'Get an internship based on your interests!',
                  style: TextStyle(
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: CustomScrollView(
              slivers: [
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                      return Padding(
                        padding: const EdgeInsets.only(
                            left: 24,
                            right: 24,
                            bottom: 24), // Adjust vertical padding
                        child: Card(
                          elevation: 6,
                          shadowColor: Color(0xFFF77D00).withOpacity(0.2),
                          child: Container(
                            height: 180,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(
                                  12), // Set border radius
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Column(
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        margin:
                                            const EdgeInsets.only(right: 20),
                                        child: ClipRRect(
                                          borderRadius:
                                              BorderRadius.circular(12),
                                          child: Image.asset(
                                            stories[index].sex != 'Perempuan'
                                                ? 'assets/home/male.png'
                                                : 'assets/home/female.png',
                                            width: 80,
                                            height: 80,
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              stories.isNotEmpty
                                                  ? stories[index].nama
                                                  : "No Data",
                                              style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 14,
                                                fontFamily: 'DM Sans',
                                              ),
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                            Text(
                                              stories.isNotEmpty
                                                  ? stories[index].perusahaan
                                                  : "No Data",
                                              style:
                                                  const TextStyle(fontSize: 12),
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                            Text(
                                              stories.isNotEmpty
                                                  ? stories[index].posisi
                                                  : "No Data",
                                              style:
                                                  const TextStyle(fontSize: 12),
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 10),
                                  Text(
                                    stories.isNotEmpty
                                        ? stories[index].post
                                        : "No Data",
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontFamily: 'DM Sans',
                                    ),
                                    maxLines: 3,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                    childCount: stories.length,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
