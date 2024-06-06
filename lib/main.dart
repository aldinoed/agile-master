import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_project/provider/perusahaan.dart';
import 'package:flutter_project/tracker_service.dart';
import 'package:flutter_project/view/splash_screen/splash_screen.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await (TrackerService()).track("on-open-app", {}, withDeviceInfo: true);
  runApp(
    ChangeNotifierProvider(
      create: (_) => PerusahaanProvider(),
      child: GoShip(),
    ),
  );
  await (TrackerService()).track("on-load-app", {}, withDeviceInfo: true);

  WidgetsBinding.instance?.addPostFrameCallback((_) async {
    await (TrackerService()).track("on-close-app", {}, withDeviceInfo: false);
  });
}

class GoShip extends StatelessWidget {
  const GoShip({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen()
    );
  }
}