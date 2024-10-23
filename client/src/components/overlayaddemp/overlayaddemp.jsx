import React from 'react'
import './overlayaddemp.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function overlayaddemp({isOpen, onClose, children}) {

  const [position, setPosition] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('1');

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/authenticate/getposition', { withCredentials: true })
      setPosition(response.data)
      console.log(response.data)
    }
    fetchItems()
    console.log('item has been fetch')
  }, [])

  const [inputs, setInputs] = useState({
    emp_id:"",
    emp_name:"",
    password: "",
    emp_tel: "",
    position_id: ""
  })


  const handleChangeforCategory = (e) => {
    const selectedValue = e.target.value
    setSelectedCategory(selectedValue)       
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('emp_id', inputs.emp_id);
    formData.append('emp_name', inputs.emp_name);
    formData.append('password', inputs.password);
    formData.append('emp_tel', inputs.emp_tel);
    formData.append('position_id',selectedCategory)

    {/*console.log( inputs.emp_id)
    console.log(inputs.emp_name)
    console.log( inputs.password)
    console.log(inputs.emp_tel)
    console.log(selectedCategory)*/}
  //  alert(selectedCategory)

    const employeeData = {
      emp_id: inputs.emp_id,
      emp_name: inputs.emp_name,
      password: inputs.password,
      emp_tel: inputs.emp_tel,
      position_id: selectedCategory,
    }

    try {
      await axios.post("http://localhost:2000/api/authenticate/empregister",employeeData,{ withCredentials: true })
      console.log('Employee has been created', formData)
      window.location.reload()
      alert("Employee has been added");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    {isOpen ? (
      <>
        <div className="overlay">
            <div className="overlay-bg">
                <div className="overlay-container">
                    <div className="overlay-header">
                          <h3>เพิ่มพนักงาน</h3>
                          <a href="" onClick={onClose}>X</a>
                    </div>

                    <div className="overlay-add-container">
                        <div className="input-emp">
                            <label htmlFor="">รหัสพนักงาน</label>
                            <input type="text" name="emp_id" onChange={handleChange} />
                        </div>

                        <div className="input-emp">
                            <label htmlFor="">ชื่อพนักงาน</label>
                            <input type="text" name='emp_name' onChange={handleChange}/>
                        </div>

                        <div className="input-emp">
                            <label htmlFor="">รหัสผ่าน</label>
                            <input type="text" name='password' onChange={handleChange}/>
                        </div>

                        <div className="input-emp">
                            <label htmlFor="">เบอร์ติดต่อ</label>
                            <input type="text" name='emp_tel' onChange={handleChange}/>
                        </div>

                        <div className="input-emp">
                            <label htmlFor="">เบอร์ติดต่อ</label>                            
                                <select name="position_id" onClick={handleChangeforCategory} >
                                    {position.length > 0 ? (
                                      <>
                                        {position.map(item => ( 
                                          <option value={item.position_id}>{item.position}</option>
                                        ))} </>):(
                                          <p></p>
                                    )}
                                </select>
                        </div>

                        <div className="input-emp">
                            <button onClick={handleClick} type="submit">เพิ่มพนักงาน</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </>
    ):null}
    </>
  )
}

export default overlayaddemp