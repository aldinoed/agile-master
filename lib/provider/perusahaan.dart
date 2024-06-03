import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';

class PerusahaanProvider extends ChangeNotifier {
  List<Perusahaan> _perusahaan = [];
  List<Perusahaan> _filteredPerusahaan = [];
  String? _selectedYear;
  String? _selectedProgram; // Property for selected program

  List<Perusahaan> get perusahaan => _perusahaan;
  List<Perusahaan> get filteredPerusahaan => _filteredPerusahaan;
  String? get selectedYear => _selectedYear;
  String? get selectedProgram => _selectedProgram;
  
void resetFilters() {
  _selectedYear = null;
  _selectedProgram = null;
  notifyListeners();
}

  void setPerusahaan(List<Perusahaan> perusahaan) {
    _perusahaan = perusahaan;
    resetFilters();
    _filterPerusahaan();
    notifyListeners();
  }

  void selectYear(String? year) {
    _selectedYear = year;
    _filterPerusahaan();
    notifyListeners();
  }

  void selectProgram(String? program) {
    _selectedProgram = program;
    _filterPerusahaan();
    notifyListeners();
  }

  void filterByYear(String? year) {
    _selectedYear = year;
    _filterPerusahaan();
    notifyListeners();
  }

  void filterByProgram(String? program) {
    _selectedProgram = program;
    _filterPerusahaan();
    notifyListeners();
  }

  void _filterPerusahaan() {
    if (_selectedYear == null && _selectedProgram == null) {
      _filteredPerusahaan = _perusahaan;
    } else {
      _filteredPerusahaan = _perusahaan.where((perusahaan) {
        bool yearMatches = _selectedYear == null || perusahaan.semester.contains(int.parse(_selectedYear!));
        bool programMatches = _selectedProgram == null || perusahaan.programs.contains(_selectedProgram);
        return yearMatches && programMatches;
      }).toList();
    }
  }

  void searchPerusahaan(String query) {
    if (query.isNotEmpty) {
      _filteredPerusahaan = _perusahaan.where((perusahaan) {
        return perusahaan.nama_perusahaan.toLowerCase().contains(query.toLowerCase()) ||
               perusahaan.posisiPerusahaan.any((posisi) => posisi.nama_posisi.toLowerCase().contains(query.toLowerCase()));
      }).toList();
    } else {
      _filterPerusahaan();
    }
    notifyListeners();
  }
}
