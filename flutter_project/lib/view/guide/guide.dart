import 'package:flutter/material.dart';

class Guide extends StatelessWidget {
  const Guide({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(250, 250, 254, 1),
      appBar: AppBar(
        flexibleSpace: const Padding(
          padding: EdgeInsets.all(20.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image(image: AssetImage('assets/home/LOGO1.png')),
              Text(
                'Goship',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 30,
                    fontFamily: 'LibreBaskerville'),
              ),
              Image(image: AssetImage('assets/home/ProfilePhoto.png'))
            ],
          ),
        ),
      ),
      body: Container(
        child: Column(
          children: [
            SizedBox(height: 10),
            Center(
              child: Container(
                width: MediaQuery.of(context).size.width * 0.85,
                margin: EdgeInsets.symmetric(vertical: 20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: Color.fromARGB(255, 255, 255, 255),
                ),
                child: Column(  
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(12),
                          topRight: Radius.circular(12),
                        ),
                        image: DecorationImage(
                          image: AssetImage('assets/guide/image21.png'),
                          fit: BoxFit.cover,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Color.fromARGB(255, 37, 36, 36)
                                .withOpacity(0.9),
                            blurRadius: 8,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 0.0),
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: Image.asset(
                                  'assets/guide/Headline.png',
                                  width: 20,
                                  height: 45,
                                  fit: BoxFit.contain,
                                ),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(right: 5.0),
                            child: Align(
                              alignment: Alignment.bottomCenter,
                              child: Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: Text(
                                  'Instructions for \ndoing an internship (KP)',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      height: MediaQuery.of(context).size.height / 1.7,
                      child: ListView.builder(
                        itemBuilder: (context, index) {
                          return Container(
                            child: Text(
                              '1. Select the KP type:\n      a. Regular\n      b. IISMA via UP2AI Ms Lely and KUI Mr Iwan Syarif\n      c. IGIP via UP2AI Ms Lely and KUI Mr Iwan Syarif\n\n2. If you have a Regular KP, determine whether you are a group or individual when carrying out the KP. \n       If you are in a group of up to 3 people, fill in the KP Submission Form in Online MIS (If in a group, then only the representative will fill it in)\n\n3. Make a KP Proposal, Make a Cover Letter (letter number, and KDAEP designation to be handled via Ms Pipid), make a thank you letter when it is received (letter number and KDAEP designation to be managed via Ms Pipid), Farewell to the Supervisor before leaving for KP\n\n4. Implementation of KP 6 Months\n\n5. Making a KP Logbook, the file filled in is the progress of the KP book, photos uploaded can be daily activities at the company (free photos)\n\n6. Preparation for KP Session\n        a. ACC Supervisor\n        b. KP Book\n        c. KP Presentation (Indonesia)\n        d. advance in groups\n        e. Collect Value from the Company\n       f. Collect Mandiri Bank Account (KP funds)',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.black,
                              ),
                            ),
                          );
                        },
                        padding: EdgeInsets.all(20),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
