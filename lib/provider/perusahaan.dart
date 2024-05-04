import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';

class PerusahaanProvider extends ChangeNotifier {
  List<Perusahaan> _perusahaan = [];
  List<Perusahaan> _filteredPerusahaan = [];
  String? _selectedYear;

  List<Perusahaan> get perusahaan => _perusahaan;
  List<Perusahaan> get filteredPerusahaan => _filteredPerusahaan;
  String? get selectedYear => _selectedYear;

  void setPerusahaan(List<Perusahaan> perusahaan) {
    print('Memasukkan data perusahaan');
    _perusahaan = perusahaan;
    _filterPerusahaan();
    notifyListeners();
  }

  void selectYear(String? year) {
    print('year = $year');
    _selectedYear = year;
    notifyListeners();
  }

  void filterByYear(String? year) {
    print('Filter by year: $year');
    _selectedYear = year;
    _filterPerusahaan();
    notifyListeners();
  }

  void searchPerusahaan(String query) {
    print('Mencari perusahaan dengan query: $query');
    if (query.isNotEmpty) {
      _filteredPerusahaan = _perusahaan.where((perusahaan) {
        bool perusahaanMatches = perusahaan.nama_perusahaan
            .toLowerCase()
            .contains(query.toLowerCase());
        bool posisiMatches = perusahaan.posisiPerusahaan.any((posisi) =>
            posisi.nama_posisi.toLowerCase().contains(query.toLowerCase()));
        return perusahaanMatches || posisiMatches;
      }).toList();
    } else {
      _filterPerusahaan();
    }
    notifyListeners();
  }

  void _filterPerusahaan() {
    print('Memfilter perusahaan berdasarkan tahun: $_selectedYear');
    if (_selectedYear == null) {
      _filteredPerusahaan = _perusahaan;
    } else {
      int selectedSemester = int.parse(_selectedYear!);
      _filteredPerusahaan = _perusahaan
          .where((perusahaan) => perusahaan.semester.contains(selectedSemester))
          .toList();
    }
  }
}
