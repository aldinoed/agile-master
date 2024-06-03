import 'dart:convert';
import 'package:http/http.dart' as http;

class PosisiPerusahaan{
  int id_posisi;
  String nama_posisi;

  PosisiPerusahaan({required this.id_posisi, required this.nama_posisi});

  factory PosisiPerusahaan.fromJson(Map<String, dynamic> json) {
    return PosisiPerusahaan(
      id_posisi: json['id_posisi'],
      nama_posisi: json['nama_posisi'],
    );
  }

  static Future<List<PosisiPerusahaan>> getPosisi(int id_posisi) async {
    Uri url = Uri.parse('http://103.127.135.153:5000/api/posisi/$id_posisi');
    var apiResult = await http.get(url);
    var jsonData = json.decode(apiResult.body) as List<dynamic>;
    List<PosisiPerusahaan> posisiPerusahaan = [];
    for (var data in jsonData) {
      posisiPerusahaan.add(PosisiPerusahaan.fromJson(data));
    }

    return posisiPerusahaan;
  }
}