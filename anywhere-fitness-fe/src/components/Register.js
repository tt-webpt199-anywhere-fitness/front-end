import React from 'react';
import axios from 'axios';
import { useState } from 'react';


export default function Register(){
    const [initialValue, setInitialValue] = useState({
        user_name: "",
        email_address: "",
        password: "",
        fitness_interests: ""

    })

    const onChange = e => {
        e.persist()
        let value = e.target.type === "radio" ? e.target.checked : e.target.value
        setInitialValue({
            ...initialValue, 
            [e.target.name] : value
        })
    }


    const onSubmit = e => {
        e.preventDefault()
        axios.post(`https://reqres.in/api/users`, initialValue)
        .then(res => {
            console.log(res.data)
        })
        .catch(error => console.log(error))
    }


    return(
        <div>
            <form onSubmit={onSubmit}>
              <div>
               <label for="user_name"> Enter Name </label>
               <input 
                 type="text"
                 name="user_name"
                 id="user_name"
                 placeholder='enter your name'
                 onChange={onChange}
                 value={initialValue.user_name}
               />

               
    
    
               <label for="email_address"> Email Address </label>  
               <input 
                  type="text"
                  name="email_address"
                  id="email_address"
                  placeholder='enter your email address'
                  onChange={onChange}
                  value={initialValue.email_address}
                />
    
               <div>
                  <label for="password"> Password </label>
                    <input
                     name="password" 
                     id="password" 
                     onChange={onChange} 
                     value={initialValue.password}
                    />
              
                </div>

                <div>
                  <label for="interests"> Fitness Interests </label>
                    <select
                     name="interests" 
                     id="interests" 
                     onChange={onChange} 
                     value={initialValue.fitness_interests}
                     >
                      <option value="">---Select One---</option>
                      <option value="yoga"> Yoga </option>
                      <option value="weights"> Weights </option>
                      <option value="cardio"> Cardio </option>
                      <option value=""></option>
                    </select>
                  
                </div>
    
            <div>
                <button> Submit </button>
            </div>
            
             
              </div>
            
          </form>
        </div>
    )
}