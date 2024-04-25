import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/view/guide/guide.dart';
import 'dart:math';
import 'package:flutter_project/model/story.dart';
import 'package:flutter_project/view/list/list_intern.dart';
import 'package:readmore/readmore.dart';

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
      backgroundColor: Colors.white12,
      appBar: AppBar(
        backgroundColor: Colors.white12,
        flexibleSpace: Padding(
          padding: EdgeInsets.all(20.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Image(image: AssetImage('assets/home/logo1.png')),
              const Text(
                'Goship',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 30,
                    fontFamily: 'LibreBaskerville'),
              ),
              Container(
                  width: 50,
                  height: 50,
                  decoration:
                      BoxDecoration(borderRadius: BorderRadius.circular(10)),
                  child: Image(
                    image: AssetImage(
                      'assets/home/Profile_Photo1.png',
                    ),
                    fit: BoxFit.contain,
                  ))
            ],
          ),
        ),
      ),
      body: stories.isEmpty && perusahaan.isEmpty
          ? Center(child: CircularProgressIndicator())
          : Container(
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
                            return InkWell(
                              // Menggunakan InkWell
                              onTap: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                      builder: (context) => Listintern(
                                            idPerusahaan:
                                                perusahaan[count].id_perusahaan,
                                            namaPerusahaan: perusahaan[count]
                                                .nama_perusahaan,
                                          )), // Navigasi ke ListPerusahaan
                                );
                              },
                              child: Column(
                                children: [
                                  Container(
                                    margin: const EdgeInsets.all(8),
                                    width: 65,
                                    height: 60,
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(12),
                                        color: _lightColors[
                                            count % _lightColors.length]),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          perusahaan[count]
                                                  .jumlah_siswa
                                                  .toString() ??
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
                                      perusahaan[count].nama_perusahaan ??
                                          'No Data',
                                      overflow: TextOverflow.ellipsis,
                                      maxLines: 1,
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }),
                    ),
                  ),
                  Expanded(
                    child: CustomScrollView(slivers: [
                      SliverToBoxAdapter(
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
                              Container(
                                margin: EdgeInsets.only(top: 15),
                                child: const Text(
                                  "Where you're interested?",
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'DM Sans'),
                                ),
                              ),
                              Container(
                                  margin: EdgeInsets.only(bottom: 15),
                                  child: const Text(
                                      'Get an internship based on your interests!'))
                            ],
                          ),
                        ),
                      ),
                      SliverList(
                        delegate: SliverChildBuilderDelegate(
                            (BuildContext context, int index) {
                          return Container(
                            margin: EdgeInsets.only(bottom: 25),
                            width: 327,
                            height: 256,
                            decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(20)),
                            child: Padding(
                              padding: const EdgeInsets.all(20.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Container(
                                    margin: const EdgeInsets.only(bottom: 10),
                                    child: Row(
                                      children: [
                                        Container(
                                            margin: const EdgeInsets.only(
                                                right: 20),
                                            child: Image(
                                              image: AssetImage(stories[index]
                                                          .sex !=
                                                      'Perempuan'
                                                  ? 'assets/home/male.png'
                                                  : 'assets/home/female.png'),
                                              width: 70,
                                              height: 80,
                                            )),
                                        SizedBox(
                                          width: MediaQuery.of(context)
                                                  .size
                                                  .width /
                                              2,
                                          // he
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              SizedBox(
                                                width: MediaQuery.of(context)
                                                        .size
                                                        .width /
                                                    2,
                                                child: Text(
                                                  stories.isNotEmpty
                                                      ? stories[index].nama
                                                      : "No Data",
                                                  style: const TextStyle(
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      fontSize: 16,
                                                      fontFamily: 'DM Sans'),
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                ),
                                              ),
                                              SizedBox(
                                                width: MediaQuery.of(context)
                                                        .size
                                                        .width /
                                                    2,
                                                child: Text(
                                                  stories.isNotEmpty
                                                      ? stories[index]
                                                          .perusahaan
                                                      : "No Data",
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  style: const TextStyle(
                                                      fontSize: 13),
                                                ),
                                              ),
                                              SizedBox(
                                                width: MediaQuery.of(context)
                                                        .size
                                                        .width /
                                                    2,
                                                child: Text(
                                                    stories.isNotEmpty
                                                        ? stories[index].posisi
                                                        : "No Data",
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    style: const TextStyle(
                                                        fontSize: 13)),
                                              )
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    child: SingleChildScrollView(
                                      child: ReadMoreText(
                                        stories.isNotEmpty
                                            ? stories[index].post
                                            : "No Data",
                                        style: const TextStyle(
                                            fontSize: 16,
                                            fontFamily: 'DM Sans'),
                                        textAlign: TextAlign.justify,
                                        trimLines: 4,
                                        trimMode: TrimMode.Line,
                                        trimExpandedText: " Lebih sedikit ",
                                        trimCollapsedText:
                                            " Lihat selengkapnya ",
                                        moreStyle: const TextStyle(
                                            color: Colors.orange,
                                            fontWeight: FontWeight.w600),
                                        lessStyle: const TextStyle(
                                            color: Colors.orange,
                                            fontWeight: FontWeight.w600),
                                      ),
                                    ),
                                  )
                                ],
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