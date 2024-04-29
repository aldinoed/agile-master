import 'dart:convert';
import 'package:flutter_project/model/posisi_intern.dart';
import 'package:http/http.dart' as http;

class Intern {
  final String nama_perusahaan;
  final String kota;
  final String provinsi;
  final String logo_perusahaan;
  final int jumlah_siswa_total;
  final List<PosisiPerusahaan> posisiPerusahaan;

  Intern({
    required this.nama_perusahaan,
    required this.kota,
    required this.provinsi,
    required this.logo_perusahaan,
    required this.jumlah_siswa_total,
    required this.posisiPerusahaan,
  });

  factory Intern.fromJson(Map<String, dynamic> json) {
    return Intern(
      nama_perusahaan: json['nama_perusahaan'],
      kota: json['kota'],
      provinsi: json['provinsi'],
      logo_perusahaan: json['logo_perusahaan'],
      jumlah_siswa_total: json['jumlah_siswa_total'],
      posisiPerusahaan: List<PosisiPerusahaan>.from(json['posisi'].map((x) => PosisiPerusahaan.fromJson(x))),
    );
  }

  static Future<List<Intern>> getIntern(int idPerusahaan) async {
    // Ganti URL dengan URL API Anda
    Uri url = Uri.parse('http://103.127.135.153:5000/api/perusahaan/$idPerusahaan');
    var apiResult = await http.get(url);
    var jsonData = json.decode(apiResult.body) as List<dynamic>;

    // Mengubah List<dynamic> menjadi List<Perusahaan>
    List<Intern> intern =
        List<Intern>.from(jsonData.map((x) => Intern.fromJson(x)));

    return intern;
  }
}
