import React, {useEffect, useState} from 'react'

function Form({openOrHidedModal, funcSetAuth}) {

const [formValues, setFormValues] = useState({userName: '', password: ''});


  function inputChangeHandler(event) {
    setFormValues({...formValues,
      [event.target.name]: event.target.value.trim()
    })
  }

  

  async function sendValues (event) {
    event.preventDefault()

    let response = await fetch('http://test-alpha.reestrdoma.ru/api/login/', {
        method: 'post',
        body: JSON.stringify({"username": formValues.userName, "password": formValues.password}),
        headers: {
            'content-type': 'application/json'
        }
      })

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа
      let json = await response.json();
      console.log(json.data)
      localStorage.setItem('access', json.data.token.access)
      localStorage.setItem('refresh', json.data.token.refresh)
      openOrHidedModal();
      funcSetAuth(true)
    } else {
      alert("Ошибка HTTP: " + response.status);
    }

  }



  return (
    <>
      <div className="authentication">
      <h1 className="text">Введите логин и пароль</h1>
        <form action="#" id='auth'>
            <input type="text" onChange={event=>inputChangeHandler(event)} name="userName" placeholder="Email"/>
            <input type="text" onChange={event=>inputChangeHandler(event)} name="password" placeholder="Password"/>
            <button onClick={event=>sendValues(event)}>Отправить</button> 
          </form>
      </div>
    </>
  )
}

export default Form;
