import React, {useEffect} from 'react'
import './App.css';
import Main from './page/Main';

function App() {

  
// const status = response => {
//     if (response.status !== 200) {
//       return Promise.reject(new Error(response.statusText))
//     }
//     return Promise.resolve(response)
//   }
//   const json = response => {
//     console.log(response.headers.get('content-type'));
//     return response.json()
//   }

  
//   useEffect ( ()=>{
//      fetch('http://test-alpha.reestrdoma.ru/api/login/', {
//     method: 'post',
//     body: JSON.stringify({"username": "superuser@mail.ru", "password": "11111111"}),
//     headers: {
//         'content-type': 'application/json'
//     }
//   })

//     .then(status)
//     .then(json)
//     .then(data => {
//       console.log('data', data);
//     })
//     .catch(error => {
//       console.log('error', error);
//     })
//     console.log('')
//   }
   
//     )


  return (
    <>
      <Main/>
    </>
  )
}

export default App;
