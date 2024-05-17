import 'package:http/http.dart' as http;
import 'dart:convert';

class Story {
  String id_post;
  String nama;
  String posisi;
  String post;
  String perusahaan;
  String sex;
  String createdAt;
  int id_siswa;


  Story(
      {required this.id_post,
      required this.nama,
      required this.posisi,
      required this.post,
      required this.perusahaan,
      required this.sex,
      required this.createdAt,
      required this.id_siswa});

  factory Story.createStoryObject(Map<String, dynamic> object) {
    return Story(
        id_post: object["id"].toString(),
        nama: object["nama"],
        posisi: object["posisi"],
        post: object["deskripsi_magang"],
        perusahaan: object["perusahaan"],
        sex: object["jenis_kelamin"],
        createdAt: object["created_at"],
        id_siswa: int.parse(object["id_siswa"].toString()));
  }

  static Future<List<Story>> getStory() async {
    Uri url = Uri.parse('http://103.127.135.153:5000/api/major-data');
    var apiResult = await http.get(url);
    var objectJson = json.decode(apiResult.body);
    Map<String, dynamic>? postsMap = objectJson['posts'];
    List<dynamic>? storiesData = postsMap?.values.toList();
    List<Story> stories = [];
    if (storiesData != null) {
      for (var storyData in storiesData) {
        stories.add(Story.createStoryObject(storyData as Map<String, dynamic>));
      }
    }

    return stories;
  }
}
