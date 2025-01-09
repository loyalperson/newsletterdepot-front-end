import { useLocation } from 'react-router-dom';
import LeftBar from '../components/onBoarding/LeftBar'
import RightBar from '../components/onBoarding/RightBar'
import Thanks from '../components/onBoarding/Thanks'
import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';

export default function HomePage(){
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = params.get('email');
  const [isSubmitted, setIsSubmitted] = useState(false)
  const toast = useRef(null);
  
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 2000});
  }
  const showInfo = () => {
    toast.current.show({severity:'info', summary: 'Info', detail:'Message Content', life: 2000});
  }
  const showWarn = (content) => {
    toast.current.show({severity:'warn', summary: 'Warning', detail:content, life: 2000});
  }
  // console.log('========email=======', email)
  return (
    <div className="onboarding">
      {!isSubmitted? (
        <>
          <LeftBar />
          <RightBar email={email} setIsSubmitted={setIsSubmitted} showSuccess={showSuccess} showInfo={showInfo} showWarn={showWarn} />
        </>
        ):(
        <Thanks />
      )}
      <Toast ref={toast} />
    </div>
  )
}