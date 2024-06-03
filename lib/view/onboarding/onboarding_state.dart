import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

class OnboardingState with ChangeNotifier {
  int onBoardingNumber = 0;
  List<String> imagePath = [
    'assets/onboarding/step1.png',
    'assets/onboarding/step2.png',
    'assets/onboarding/step3.png'
  ];
  List<String> listTitle = [
    'List Perusahaan',
    'Detail Perusahaan',
    'Detail Mahasiswa'
  ];
  List<String> listDescription = [
    "Kumpulan perusahaan tempat magang kakak tingkat",
    "Informasi perusahaan dengan mahasiswa magangnya ",
    "Informasi detail kegiatan magang beserta kontaknya"
  ];

  String get title => listTitle[onBoardingNumber];
  String get description => listDescription[onBoardingNumber];
  String get imageLocation => imagePath[onBoardingNumber];
  int get onBoardingPageNumber => onBoardingNumber;
  Color onBoardingIndicator(int value) {
    if (value == onBoardingNumber) {
      return Color(0xFFF77D00);
    } else {
      return Color.fromARGB(255, 226, 225, 225);
    }
  }

  set setOnBoardingNumber(String value) {
    if (value == 'next') {
      onBoardingNumber += 1;
      notifyListeners();
    } else if (value == 'back') {
      onBoardingNumber -= 1;
      notifyListeners();
    } else if (value == 'skip') {
      onBoardingNumber = 2;
      notifyListeners();
    }
  }
}
