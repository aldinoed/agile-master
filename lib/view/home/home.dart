import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'dart:math';
import 'package:flutter_project/model/story.dart';
import 'package:flutter_project/view/list/page_detail_mahasiswa.dart';
import 'package:flutter_project/view/main_screen/main_screen.dart';
import 'package:carousel_slider/carousel_slider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Story> stories = [];
  final _lightColors = [
    Color(0xFFD62828),
    Color(0xFF120B0B),
    Color(0xFF35C91C),
    Color(0xFF605B57),
  ];

  @override
  void initState() {
    super.initState();
    stories =
        _loadStories().timeout(const Duration(seconds: 5)).catchError((e) {
      if (e is TimeoutException) {
        // Terjadi timeout saat mengambil data
        showCustomDialog(context, 'Timeout',
            'Terjadi timeout saat mengambil data. Silakan coba lagi nanti.',
            'assets/home/timeout.png');
      } else {
        // Terjadi error lainnya
        showCustomDialog(context, 'Error',
            'Terjadi error saat mengambil data. Silakan coba lagi nanti.',
            'assets/home/error.png');
      }
      return [];
    });
  }

  Future<List<Story>> _loadStories() async {
    try {
      return await Story.getStory();
    } catch (e) {
      throw e; // Lempar ulang error agar bisa ditangkap di initState
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(250, 250, 254, 1),
      appBar: AppBar(
        scrolledUnderElevation: 0,
        backgroundColor: Color.fromRGBO(250, 250, 254, 1),
        title: InkWell(
          
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
                  "Dimana tempat yang cocok untukmu?",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontFamily: 'DM Sans',
                    fontSize: 18,
                  ),
                ),
                SizedBox(height: 2),
                const Text(
                  'Dapatkan tempat magang sesuai minat Anda!',
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
                  left: 24, right: 24, bottom: 24), // Adjust vertical padding
              child: GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => PageDetailMahasiswa(
                        id_siswa: stories[index].id_siswa
                      ),
                    ),
                  );
                },
                child: Card(
                  elevation: 6,
                  shadowColor: Color(0xFFF77D00).withOpacity(0.2),
                  child: Container(
                    height: 180,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12), // Set border radius
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Row(
                            children: [
                              Container(
                                margin: const EdgeInsets.only(right: 20),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(12),
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
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    stories.isNotEmpty ? stories[index].nama : "Tidak Ada Data",
                                    style: const TextStyle(
                                      color: Color(0xFFF77F00),
                                      fontStyle: FontStyle.italic,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                      fontFamily: 'DM Sans',
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 5),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Icon(Icons.business, size: 12),
                                      const SizedBox(width: 5),
                                      Expanded(
                                        child: Text(
                                          stories.isNotEmpty ? stories[index].perusahaan : "Tidak Ada Data",
                                          style: const TextStyle(fontSize: 12),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 5),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Icon(Icons.work_outline, size: 12),
                                      const SizedBox(width: 5),
                                      Expanded(
                                        child: Text(
                                          stories.isNotEmpty ? stories[index].posisi : "Tidak Ada Data",
                                          style: const TextStyle(fontSize: 12),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),

                            ],
                          ),
                          SizedBox(height: 10),
                          Text(
                            stories.isNotEmpty ? stories[index].post : "Tidak Ada Data",
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
