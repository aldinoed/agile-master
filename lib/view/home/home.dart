import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'dart:math';
import 'package:flutter_project/model/story.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Perusahaan> perusahaan = [];
  List<Story> stories = [];
  final _lightColors = [
    Color(0xAE8C20FF),
    Colors.red,
    Colors.lightGreen,
    Colors.orange.shade300,
  ];

  @override
  void initState() {
    super.initState();
    _loadStories();
    _loadPerusahaan();
  }

  Future<void> _loadPerusahaan() async {
    try {
      perusahaan = await Perusahaan.getPerusahaan();
      setState(() {
        perusahaan;
      });
    } catch (e) {
      print(e);
    }
  }

  Future<void> _loadStories() async {
    try {
      stories = await Story.getStory();

      setState(() {
        stories;
      });
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white12,
      appBar: AppBar(
        backgroundColor: Colors.white12,
        flexibleSpace: const Padding(
          padding: EdgeInsets.all(20.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image(image: AssetImage('assets/home/LOGO1.png')),
              Text(
                'Goship',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 30,
                    fontFamily: 'LibreBaskerville'),
              ),
              Image(
                  width: 50,
                  height: 50,
                  image: AssetImage('assets/home/ProfilePhoto.png'))
            ],
          ),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(20.0),
        // decoration: const BoxDecoration(color: Color(0x1E1E1E)),
        child: Column(
          // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Align(
              alignment: Alignment.topCenter,
              child: Container(
                // padding: EdgeInsets.only(bottom: ),
                height: 115,
                child: ListView.builder(
                    itemCount: perusahaan.length,
                    scrollDirection: Axis.horizontal,
                    itemBuilder: (context, count) {
                      return Column(
                        children: [
                          Container(
                            margin: const EdgeInsets.all(8),
                            width: 65,
                            height: 60,
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                color:
                                    _lightColors[count % _lightColors.length]),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  perusahaan[count].jumlah_siswa.toString() ??
                                      'No Data',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'DM Sans',
                                      fontSize: 18,
                                      color: Colors.white),
                                ),
                                const Text(
                                  'orang',
                                  style: TextStyle(
                                      fontWeight: FontWeight.w500,
                                      fontFamily: 'DM Sans',
                                      fontSize: 14,
                                      color: Colors.white),
                                )
                              ],
                            ),
                          ),
                          SizedBox(
                            width: 70,
                            // height: 90,
                            child: Text(
                              perusahaan[count].nama_perusahaan ?? 'No Data',
                              overflow: TextOverflow.ellipsis,
                              maxLines: 1,
                            ),
                          ),
                        ],
                      );
                    }),
              ),
            ),
            Expanded(
              child: CustomScrollView(slivers: [
                SliverToBoxAdapter(
                  // shrinkWrap: true,
                  // primary: false,
                  // physics: const NeverScrollableScrollPhysics(),

                  child: Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                            width: MediaQuery.of(context).size.width,
                            child: const Image(
                              image: AssetImage('assets/home/hero1.png'),
                              fit: BoxFit.fill,
                            )),
                        const Text(
                          "Where you're interested?",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontFamily: 'DM Sans'),
                        ),
                        const Text('Get an internship based on your interests!')
                      ],
                    ),
                  ),
                ),
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                      (BuildContext context, int index) {
                    return Container(
                      width: 327,
                      height: 280,
                      child: Card(
                        shadowColor: Colors.transparent,
                        color: Colors.white,
                        margin: const EdgeInsets.only(bottom: 25),
                        child: Container(
                          width: 327,
                          height: 250,
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(20)),
                          child: Padding(
                            padding: const EdgeInsets.all(20.0),
                            child: Column(
                              children: [
                                Container(
                                  margin: const EdgeInsets.only(bottom: 20),
                                  child: Row(
                                    children: [
                                      Container(
                                          margin:
                                              const EdgeInsets.only(right: 20),
                                          child: Image(
                                            image: AssetImage(
                                                stories[index].sex !=
                                                        'Perempuan'
                                                    ? 'assets/home/male.png'
                                                    : 'assets/home/female.png'),
                                            width: 90,
                                            height: 80,
                                          )),
                                      SizedBox(
                                        width: 200,
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            SizedBox(
                                              child: Text(
                                                stories.isNotEmpty
                                                    ? stories[index].nama
                                                    : "No Data",
                                                style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 16,
                                                    fontFamily: 'DM Sans'),
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                            Text(
                                              stories.isNotEmpty
                                                  ? stories[index].perusahaan
                                                  : "No Data",
                                              overflow: TextOverflow.ellipsis,
                                              style:
                                                  const TextStyle(fontSize: 13),
                                            ),
                                            Text(
                                                stories.isNotEmpty
                                                    ? stories[index].posisi
                                                    : "No Data",
                                                overflow: TextOverflow.ellipsis,
                                                style: const TextStyle(
                                                    fontSize: 13))
                                          ],
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                                Text(
                                  stories.isNotEmpty
                                      ? stories[index].post
                                      : "No Data",
                                  style: const TextStyle(
                                      fontSize: 16, fontFamily: 'DM Sans'),
                                  overflow: TextOverflow.ellipsis,
                                  softWrap: true,
                                  maxLines: 4,
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    );
                  }, childCount: stories.length),
                )
              ]),
            )
          ],
        ),
      ),
    );
  }
}
