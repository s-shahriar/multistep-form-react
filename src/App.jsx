import jsPDF from "jspdf";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const formArray = [1,2,3,4,5];

  const [formNo, setFormNo] = useState(formArray[0]);

  const [state, setState] = useState({

    name:  "",
    dept : "",
    batch: "",
    univ : "",
    session : "",
    address : "",
    dist : "",
    po : "",
    thana : ""

  });

  const next = () => {
    if (formNo === 1 && state.name && state.dept && state.batch){
      setFormNo(formNo+1);
    }
    else if (formNo === 2 && state.univ && state.session && state.batch){
      setFormNo(formNo+1);
    }
    else if (formNo === 3 &&state.dist && state.po && state.thana) {
      setFormNo(formNo+1);
    }
    else {
      toast.error('Fillup all input field');
    }

  }

  const prev = () => {
    setFormNo(formNo-1);
  }

  const saveData = (e) =>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submit = () => {
    if(state.dist && state.po && state.thana){
      toast.success('Form Submit Success')
    } else {
      toast.error('Fillup all the required field');
    }
    setFormNo(formNo+1);
  }

  const submitAnother = () => {
    setFormNo(formArray[0]);
  }

  const { name, dept, address,po,session,thana,univ,batch,dist} = state;

  const extractObjectToPDF =() => {

    
    const pdf = new jsPDF();

    // Set the font size and style for the PDF content
    pdf.setFontSize(12);
    pdf.setFont('courier');

    // Set the x and y coordinates for the starting point of the content
    let x = 10;
    let y = 10;

      // Create an array of the object properties with their respective values
    const objectData = [
        `Name: ${name}`,
        `Department: ${dept}`,
        `Batch: ${batch}`,
        `University: ${univ}`,
        `Session: ${session}`,
        `Address: ${address}`,
        `District: ${dist}`,
        `Thana: ${thana}`,
        `Post: ${po}`
    ];


  objectData.forEach((line) => {
    pdf.text(x, y, line);
    y += 10;
  });

    pdf.save('Information.pdf');

  }





  return (

    
    <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">

      <ToastContainer />
    
        <div className="card w-screen rounded-md shadow-md bg-white p-5 md:w-2/3 lg:w-3/6">

        <div className='flex items-center justify-center'>

          {
            formArray.map((v, i) => 
            
            <>
            
            <div className={`w-8 my-3 text-white rounded-full
            ${formNo - 1 === i || formNo - 1 === i + 1 || formNo - 1 === i + 3 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}
            h-7 flex justify-center items-center`}>
              {v}
            </div>

            {
              i !== formArray.length - 1 && <div className={`w-[85px] h-[2px]
              ${formNo === i + 2 ||formNo === i+3 || formNo - 1 === i + 4 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}
              `}></div>
            }

            </>
            
            )
          }

        </div>


        {
          formNo === 1 &&
          
          <div> 
            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name"> Name </label>
                <input value={name} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="name" id="name" placeholder="Enter Your Name...."/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Department</label>
                <input value={dept} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="dept" id="dept" placeholder="Enter Your Department..."/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Batch</label>
                <input value={batch} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="number" name="batch" id="batch" placeholder="Enter Your Batch...."/>
            </div>

            <div className="mt-6 justify-center flex items-center">
                <button onClick={next} className="w-3/5 rounded-md border px-3 py-2 bg-slate-600 text-white">Proceed</button>
            </div>
          </div>
        
        }


          
        {
        
          formNo === 2 &&
        
          <div> 
            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name"> University Name </label>
                <input value={univ} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="univ" id="univ" placeholder="Enter University Name...."/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Session</label>
                <input value={session} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="session" id="session" placeholder="Enter Your Session..."/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Address</label>
                <textarea value={address} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" rows= "2" cols="3" name="address" id="address" placeholder="Enter Your Address...."/>
            </div>

            <div className="mt-6 gap-4 justify-center flex items-center">

                <button onClick={prev} className="w-1/3 rounded-md border px-3 py-2 bg-slate-600 text-white">Back</button>
                <button onClick={next} className="w-1/3 rounded-md border px-3 py-2 bg-slate-600 text-white">Next</button>

            </div>
          </div>

        }
        
        
        {
        
          formNo === 3 &&
          
          <div> 
            
            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name"> District </label>
                <input value={dist} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="dist" id="dist" placeholder="Enter Your District...."/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Thana</label>
                <input value={thana} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="thana" id="thana" placeholder="Enter Your Thana..."/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Post Office</label>
                <input value={po} onChange={saveData} className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="po" id="po" placeholder="Enter Your Post Office...."/>
            </div>

            <div className="mt-6 gap-4 justify-center flex items-center">
                <button onClick={prev} className="w-1/3 rounded-md border px-3 py-2 bg-slate-600 text-white">Back</button>
                <button onClick={next} className="w-1/3 rounded-md border px-3 py-2 bg-slate-600 text-white">Next</button>
            </div>
          </div>
        
        }

        {
        
          formNo === 4 &&
          
          <div> 
            <h1 className="mb-2 font-bold flex justify-center text-2xl">Review Your Data</h1>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name"> Name </label>
                <input className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="dist" id="dist" placeholder={name} readOnly/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">University</label>
                <input className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="thana" id="thana" readOnly placeholder={univ}/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Department</label>
                <input className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="po" id="po" placeholder={dept} readOnly/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Session</label>
                <input className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="po" id="po" placeholder={session} readOnly/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 font-bold"htmlFor="name">Address, Thana and Post Office</label>
                <input className="p-2 border border-slate-400 outline-0 focus:border-blue-500 rounded-md" type="text" name="po" id="po" placeholder={address+" : "+ thana+' : '+po} readOnly/>
            </div>

            <div className="mt-6 gap-4 justify-center flex items-center">

                <button onClick={prev} className="w-1/3 rounded-md border px-3 py-2 bg-slate-600 text-white">Back</button>
                <button onClick={submit} className="bg-blue-500 w-1/3 rounded-md border px-3 py-2 text-white">Submit</button>

            </div>
          </div>
          
        }


        {
        
          formNo === 5 &&
          
          <div>

            <div className="border border-blue-400 p-1.5 flex justify-center items-center gap-5">
              <label className="font-medium" htmlFor="pdf">Download As PDF</label>
              <button onClick={extractObjectToPDF} className="rounded-full bg-blue-400 px-4 py-2 font-bold text-white">Click Here</button>
            </div>

            <button onClick={submitAnother} className="flex justify-center items-center rounded-md bg-slate-600 px-4 py-1 mt-4 text-white m-auto">Submit Another</button>



          </div>
          

        }
 
        </div>
      
    </div>
  )
}

export default App
