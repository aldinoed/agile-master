import React, { useEffect, useState } from 'react'
import Buttonreset from './reset'
import Buttonsave from './save'
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Formprofile = () => {
      const navigate = useNavigate();
      const id = localStorage.getItem('id');
      const [oriFullName, setOriFullName] = useState('');
      const [oriNrp, setOriNrp] = useState('');
      const [oriEmail, setOriEmail] = useState('');
      const [oriPhone, setOriPhone] = useState('');
      const [oriStudyYear, setOriStudyYear] = useState('');
      const [oriStudyProgram, setOriStudyProgram] = useState('');
      const [fullName, setFullName] = useState('');
      const [nrp, setNrp] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [studyYear, setStudyYear] = useState('');
      const [studyProgram, setStudyProgram] = useState('');
      const [loaded, setLoaded] = useState(false)

      async function fetchData() {
            try {
                  const response = await axios.get('http://localhost:5000/api/user/' + id);
                  setFullName(response.data[0].nama_siswa)
                  setNrp(response.data[0].nrp)
                  setEmail(response.data[0].email)
                  setPhone(response.data[0].no_telp)
                  setStudyYear(response.data[0].semester)
                  setStudyProgram(response.data[0].prodi)
                  setLoaded(true)
                  console.log('completed')

            } catch (error) {
                  console.error('Error fetching user data:', error);
            }
      }
      useEffect(() => {
            fetchData();



      }, [])
      useEffect(() => {
            if (loaded === true) {
                  setOriFullName(fullName);
                  setOriNrp(nrp);
                  setOriEmail(email);
                  setOriPhone(phone);
                  setOriStudyYear(studyYear);
                  setOriStudyProgram(studyProgram);
            }

      }, [loaded]);

      useEffect(() => {
            setLoaded(true)
      })

      useEffect(() => {
            // if (studyProgram !== '' && studyYear !== '' && city !== '' && province !== '' && studyProgram !== '' && address !== '' && nrp !== '' && fullName !== ''){
            // }
            setLoaded(true)

      }, [])

      // Function to handle form field changes

      // Function to reset form fields
      const handleReset = (e) => {
            e.preventDefault();
            setFullName(oriFullName)
            setNrp(oriNrp)
            setEmail(oriEmail)
            setPhone(oriPhone)
            setStudyYear(oriStudyYear)
            setStudyProgram(oriStudyProgram)
      };
      const handleSubmit = async (e) => {
            e.preventDefault();

            const data = {
                  nama: fullName,
                  email: email,
                  phone: phone,
                  id: id
            }
            try {
                  const response = await axios.post(`http://localhost:5000/api/user-profile/update`, data);

                  navigate('/student-profile')
                  // if (response.data.user.is_first_auth === 1) {
                  //     Swal.fire({
                  //         title: 'Behasil!',
                  //         text: response.data.message,
                  //         icon: "success",

                  //     })
                  // } else {
                  //     Swal.fire({
                  //         title: 'Berhasil!',
                  //         text: response.data.message,
                  //         icon: "success",
                  //     })
                  // }
            } catch (error) {
                  console.log(error)
            }
      }
      return (
            loaded == false ? <>halo</> : <>

            </>
      )
}

export default Formprofile