import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'dart:math';
import 'package:flutter_project/model/story.dart';
import 'package:flutter_project/view/main_screen/main_screen.dart';

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
              mainAxisSize: MainAxisSize
                  .min, // Memastikan konten dalam Row sesempit mungkin
              children: <Widget>[
                Image.asset(
                  'assets/logo/logo-1.png',
                  height: 40,
                  width: 40,
                ),
                const SizedBox(width: 10), // Memberi jarak antara logo dan teks
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