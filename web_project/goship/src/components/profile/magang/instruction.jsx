import React from 'react';
import { bgprofile } from "../../../assets";

const Instruction = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="max-w-s bg-white border border-gray-200 rounded overflow-visible shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="relative max-w-full mx-auto">
            <img className="rounded-t-lg w-full md:h-24 xs:h-20 object-cover" src={bgprofile} alt="" />
            <div className="absolute inset-0 bg-gray-500 opacity-60 rounded-md"></div>
            <div className="absolute inset-0 flex py-4 px-10">
              <div className="border-l-2 border-orange pl-4">
                <h2 className="text-lg font-semibold text-white">Instruction for doing an internship (KP)</h2>
              </div>
            </div>
          </div>
          <div className="px-5 pt-5">
            <p className="mb-3 font-bold text-l text-black">
              1. Select the KP type
            </p>
            <ul style={{ textIndent: '1em' }}>
              <li className="mb-1">a. Regular</li>
              <li className="mb-1">b. IISMA via UP2AI Ms Lely and KUI Mr Iwan Syarif</li>
              <li className="mb-1">c. IGIP via UP2AI Ms Lely and KUI Mr Iwan Syarif</li>
            </ul>

            <p className="mb-3 font-bold text-l text-black">
              2. If you have a Regular KP, determine whether you are a group or individual when carrying out the KP.
            </p>
            <ul className="list-disc ml-6" style={{ paddingLeft: '1em' }}>
              <li className="mb-1">If you are in a group of up to 3 people, fill in the KP Submission Form in Online MIS (If in a group, then only the representative will fill it in)</li>
            </ul>

            <p className="mb-3 font-normal text-black text-overflow-ellipsis">
              <strong>3. Make a KP Proposal,</strong> Make a Cover Letter (letter number, and KDAEP designation to be handled via Ms Pipid), make a thank you letter when it is received (letter number and KDAEP designation to be managed via Ms Pipid), Farewell to the Supervisor before leaving for KP
            </p>

            <p className="mb-3 font-bold text-l text-black">4. Implementation of KP 6 Months</p>

            <p className="mb-3 font-normal text-black text-overflow-ellipsis">
              <strong>5. Making a KP Logbook, </strong> the file filled in is the progress of the KP book, photos uploaded can be daily activities at the company (free photos)
            </p>

            <p className="mb-3 font-bold text-l text-black">
              6. Preparation for KP Session
            </p>
            <ul className='mb-4' style={{ textIndent: '1em' }}>
              <li className="mb-1">a. ACC Supervisor </li>
              <li className="mb-1">b. KP Book </li>
              <li className="mb-1">c. KP Presentation (Indonesia) </li>
              <li className="mb-1">d. Advance in groups </li>
              <li className="mb-1">e. Collect Value from the Company </li>
              <li className="mb-1">f. Collect Mandiri Bank Account (KP funds) </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Instruction;
