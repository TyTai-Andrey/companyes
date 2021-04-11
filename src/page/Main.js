import React, {useState, useEffect} from 'react'

import Form from '../components/Form';


function Main() {


  const [modalVisible, setModalVisible] = useState(false);
  const [auth, setAuth] = useState(localStorage.getItem('access') || false);
  const [ad, setAd] = useState(false)
  const [house, setHouse] = useState([])
  const [housesInfo, setHousesInfo] = useState([])


  const [dataCompany , setDataCompany] = useState(false);
  

  // if (localStorage.getItem('access') !== null && localStorage.getItem('refresh') !== null) {
  //     setAuth(true)
  // }

  function getCompanyes () {
    if (localStorage.getItem('access') !== null && localStorage.getItem('refresh') !== null) {
      (async()=>{
      let response = await fetch('http://test-alpha.reestrdoma.ru/api/reestrdoma/companies/', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        })

      if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа
        let json = await response.json();
        console.log(json.data)
        setDataCompany(json.data);
        getHouse({value: json.data[0].id}, 1, 1)
      } else {
        alert("Ошибка HTTP: " + response.status);
      }


    })()}
    

  }


  useEffect(()=>{

    if (localStorage.getItem('access') !== null && localStorage.getItem('refresh') !== null) {
      getCompanyes()
    }}, [auth])

  


      // http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/${company_id}/?page=${page}&perPage=${perPage}


      

    //   fetch('http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/1452/?page=2&perPage=1',{
    //   method: 'get',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('access')}`
    //   }
    // })
    //     .then(response => response.json())
    //     .then(commits => console.log(commits));
      
  let classesAuth = ['auth']

  if (!modalVisible) {
    classesAuth.push("no")
  }

function getHouse (company,page,perPage) {


        
        if (+company.value !== +house.company) {

          (async()=>{
            let response = await fetch(`http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/${company.value}/?page=${page}&perPage=${perPage}`,{
              method: 'get',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
              }
            })

            if (response.ok) { // если HTTP-статус в диапазоне 200-299
              // получаем тело ответа
              let json = await response.json();
              console.log(json)
              setHouse(json.data);
              setHousesInfo(json.links)
            } else {
              alert("Ошибка HTTP: " + response.status);
            }


          })()

          // fetch(`http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/${company.value}/?page=${page}&perPage=${perPage}`,{
          //   method: 'get',
          //   headers: {
          //     'Authorization': `Bearer ${localStorage.getItem('access')}`
          //   }
          // })
          //   .then(response => response.json())
          //   .then(commits => {json = commits})
          //   console.log(json)

          //   setHouse(json['data'])

        }
            console.log(house)

        
      }
  

  function modalAuth (argument) {
    setModalVisible(prev => !prev)
  }

  function exit () {
    setAuth(false);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh')
  }



  const arr = new Array(housesInfo.lastPage).fill(' ')

  return (
  	<>
      <header>
        <nav>
          <ul>
            <li>Что-то</li>
            <li>Что-то</li>
            <li>Что-то</li>
          </ul>
        </nav>
        {
          (!auth) ? <div className="btn" onClick={modalAuth}><span>Войти</span></div> :  <div className="btn" onClick={exit}><span>Выйти</span></div>
        }
        
      </header>
      <section className="main">
        {
          (auth) ? 
          <div className="selectCompany">
            <select name="companyes" id="companyes" onClick={event=>getHouse(event.target, 1, 1)}>
                { 
                  (dataCompany)? dataCompany.map((i,index)=><option key={i.id} value={i.id} >{i.name}</option>) : null 
                } 
            </select>
            <div className="flat">

              {
                house.map((i)=> <div key={i.id}><p>{i.address}</p><p>{i.reestrFlatCount}</p><p>{i.createdAt}</p></div>)
              }


             
            </div>
        
          </div> : <h1>Необходимо зарегистрироваться</h1>
        }
         {
          (auth) ?    <ul className="row">
          <li onClick={()=>getHouse({value: house[0].company}, 1, 1)}>1</li>
            {

              arr.map((i, index) => {
                if (index+1 > housesInfo.currentPage && index+1 <= housesInfo.currentPage+5) {return <li key={`flat${index}`} onClick={()=>getHouse({value: house[0].company}, index+1, 1)}>{index+1}</li>} 
                if (index+1 == housesInfo.lastPage) { return <><li key={`flat-1`}>. . .</li><li key={`flat${index}`} onClick={()=>getHouse({value: house[0].company}, index+1, 1)}>{index+1}</li></>} 
              })
            }
        </ul> 
        : null 
      } 

      </section>











      <div className={classesAuth.join(" ")}>
        <div className="close" onClick={modalAuth}>&times;</div>
        <div className="test">
          <h1>Test value</h1>
          <p>User: superuser@mail.ru</p>
          <p>Pass: 11111111</p>
        </div>
          <Form openOrHidedModal={modalAuth} funcSetAuth={setAuth}/>
      </div>
    </>
  )
}

export default Main;
