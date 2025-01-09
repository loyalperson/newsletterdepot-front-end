import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import {updateUserInfo} from '../api/index.js'
import { Toast } from 'primereact/toast';
import { usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from '../components/Loader.js'

export default function UpdateInfoPage(){
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [value, setValue] = useState('')
  const toast = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false)

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Successfully submitted!', life: 3000});
  }
  const showInfo = () => {
    toast.current.show({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
  }
  const showWarn = (content) => {
    toast.current.show({severity:'warn', summary: 'This field is required.', detail:content, life: 3000});
  }
  const showError = (title, content) => {
    toast.current.show({severity:'error', summary: title, detail:content, life: 3000});
  }

  useEffect(()=>{
    if(!id)
      return alert(`You can't view this page!`)
  },[])

  const submitHandler = async () => {
    if(value.length){
      try{
        const response = await trackPromise(updateUserInfo({id: id, updated_info: value}));
        console.log('======response========', response)
        setIsSubmitted(true)
      }catch{
        return showError('Invalid user!', `The user doesn't exist. You should register firstly!`);
      }
    }else {
      return showWarn();
    }
  }

  return (
    <div style={{height:'100vh', paddingTop:'200px', background:'#eef3fd'}}>
      <div className="update_info">
        {!isSubmitted? (
          <div>
            <p style={{marginBottom:'10px'}}>Please leave message here to get news email updated.</p>
            <InputTextarea placeholder='I hope...' autoResize value={value} style={{width:'100%', marginBottom:'10px'}} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
            <div>
              <Button severity='info' style={{float:'right'}} label="Submit" onClick={submitHandler} />
            </div>
          </div>
        ): (
          <div style={{textAlign:'center'}}>
            <p style={{fontSize:'21px'}}>Thank you for your feedback!</p>
            <p style={{fontSize:'21px'}}>We'll incorporate it in the next newsletter for you.</p>
          </div>
        )}
        <Toast ref={toast} />
      </div>
      <Loader promiseTracker={usePromiseTracker} color={'#3F88C5'}/>
    </div>
  )
}