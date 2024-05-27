import 'dart:convert';
import 'package:http/http.dart' as http;

class Mahasiswa {
  int id_siswa;
  String nama_siswa;
  String email;
  String jenis_kelamin;

  Mahasiswa({required this.id_siswa, required this.nama_siswa, required this.email, required this.jenis_kelamin});

  factory Mahasiswa.fromJson(Map<String, dynamic> json){
    return Mahasiswa(
      id_siswa: json['id_siswa'] ?? "",
      nama_siswa: json['nama_siswa'],
      email: json['email'],
      jenis_kelamin: json['jenis_kelamin'],

    );
  }

  static Future<List<Mahasiswa>> getMahasiswa(int idPosisi) async {
    Uri url = Uri.parse('http://103.127.135.153:5000/api/posisi/$idPosisi');
    var apiResult = await http.get(url);
    var jsonData = json.decode(apiResult.body) as List<dynamic>;

    // Mengubah List<dynamic> menjadi List<Perusahaan>
    List<Mahasiswa> mahasiswa =
        List<Mahasiswa>.from(jsonData.map((x) => Mahasiswa.fromJson(x)));

    return mahasiswa;
  }
}