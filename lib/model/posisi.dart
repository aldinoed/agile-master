import 'dart:convert';
import 'package:http/http.dart' as http;

class Posisi {
  int id_posisi;
  String nama_siswa;
  String email;

  Posisi({required this.id_posisi, required this.nama_siswa, required this.email});

  factory Posisi.fromJson(Map<String, dynamic> json) {
    return Posisi(
      id_posisi: json['id_posisi'],
      nama_siswa: json['nama_siswa'],
      email: json['email'],
    );
  }

  static Future<List<Posisi>> getPosisi(int id_posisi) async {
    Uri url = Uri.parse('http://103.127.135.153:5000/api/posisi/$id_posisi');
    var apiResult = await http.get(url);
    var jsonData = json.decode(apiResult.body) as List<dynamic>;
    List<Posisi> posisi = [];
    for (var data in jsonData) {
      posisi.add(Posisi.fromJson(data));
    }

    return posisi;
  }
}
