import 'dart:convert';
import 'package:flutter_project/model/posisi_perusahaan.dart';
import 'package:http/http.dart' as http;

class Perusahaan {
  final int id_perusahaan;
  final String nama_perusahaan;
  final String logo_perusahaan;
  final int jumlah_siswa;
  final List<PosisiPerusahaan> posisiPerusahaan;

  Perusahaan({
    required this.id_perusahaan,
    required this.nama_perusahaan,
    required this.logo_perusahaan,
    required this.jumlah_siswa,
    required this.posisiPerusahaan,
  });

  factory Perusahaan.fromJson(Map<String, dynamic> json) {
    return Perusahaan(
      id_perusahaan: json['id_perusahaan'],
      nama_perusahaan: json['nama_perusahaan'],
      logo_perusahaan: json['logo_perusahaan'] ?? '',
      jumlah_siswa: json['jumlah_siswa'],
      posisiPerusahaan: List<PosisiPerusahaan>.from(json['posisi'].map((x) => PosisiPerusahaan.fromJson(x))),
    );
  }

  static Future<List<Perusahaan>> getPerusahaan() async {
    // Ganti URL dengan URL API Anda
    Uri url = Uri.parse('http://103.127.135.153:5000/api/perusahaan');
    var apiResult = await http.get(url);
    var jsonData = json.decode(apiResult.body) as List<dynamic>;

    // Mengubah List<dynamic> menjadi List<Perusahaan>
    List<Perusahaan> perusahaan =
        List<Perusahaan>.from(jsonData.map((x) => Perusahaan.fromJson(x)));

    return perusahaan;
  }
}
