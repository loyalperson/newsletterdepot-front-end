import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { RadioButton } from 'primereact/radiobutton';
import {sendUserInfo} from '../../api/index.js'
import { usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from '../Loader.js'

export default function RightBar({email, setIsSubmitted, showSuccess, showInfo, showWarn}){
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('First, tell us a little about yourself*')
  const [subDescription, setSubDescription] = useState(`e.g. "I'm the head of marketing at of a generative AI startup based in San Francisco."`)
  const [level_1, setLevel_1] = useState(1)
  const [level_2, setLevel_2] = useState(0)
  const [level_3, setLevel_3] = useState(0)
  const [isInputShown, setIsInputShown] = useState(2)
  const [isRadioShown, setIsRadioShown] = useState(0)
  const [summary, setSummary] = useState('')
  const [brief, setBrief] = useState('')
  const [clients, setClients] = useState([])
  const [company_operation, setCompany_operation] = useState('')
  const [news_types, setNews_types] = useState('')
  const [company_name, setCompany_name] = useState('')
  const [specific_publications, setSpecific_publications] = useState('')
  const [username, setUsername] = useState('')
  const [from_what, setFrom_what] = useState('')
  const [addition, setAddition] = useState('')
  const [work_email, setWork_email] = useState('')

  const nextHandler = async () => {
    if((level_1 !== 4 && level_1 !== 5 && level_1 !== 6 && !(level_1 === 2 && level_3 === 3)) && value === '') 
      return showWarn('This field is required!')
    if(level_1 === 7){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(value)) return showWarn('Please type the correct email address.')
    }
    if(level_1 === 8){
      setUsername(value);
      const response = await trackPromise(sendUserInfo({
        email, work_email, summary, brief, company_operation, news_types, clients, company_name, specific_publications, addition, username:value, from_what
      }))
      setIsSubmitted(true);
      console.log('========response========',response)
      return showSuccess();
    }
    if(level_1 !== 2){
      switch(level_1){
        case 1:
          setSummary(value)
          break;
        case 3:
          setCompany_name(value)
          break;
        case 4:
          setSpecific_publications(value)
          break;
        case 5:
          setAddition(value)
          break;
        case 6:
          setFrom_what(value)
          break;
        case 7:
          setWork_email(value)
          break;
        default:
      }
      setLevel_1(prev => prev + 1);
    }else{
      if(level_2=== 0){
        switch(level_3){
          case 0:
            if(value=== 'A'){
              setBrief('A');
              setLevel_3(1)
            }
            if(value=== 'B'){
              setBrief('B')
              setLevel_2(1)
            }
            break;
          case 1:
            setCompany_operation(value);
            setLevel_3(2)
            break;
          case 2:
            setNews_types(value);
            setLevel_1(3);
            setClients([]);
            break;
          default:
        }
      }else{
        let temp_clients;
        switch(level_3){
          case 0:
            if(value=== 'A'){
              setLevel_3(1)
            }
            if(value=== 'B')
            setLevel_2(0);
            setLevel_3(1);
            break
          case 1:
            if(clients.length < level_2){
              clients.push({name: value, summary: '', news_types: ''})
            }else{
              temp_clients= clients;
              temp_clients[level_2-1]['name']= value;
              setClients(temp_clients)
            }
            setLevel_3(2);
            break;
          case 2:
            temp_clients= clients;
            temp_clients[level_2-1]['summary']= value;
            setClients(temp_clients);
            setLevel_3(3)
            break;
          case 3:
            temp_clients= clients;
            temp_clients[level_2-1]['news_types']= value;
            setClients(temp_clients);
            setLevel_3(4)
            break;
          case 4:
            if(value=== 'A'){
              setLevel_2(prev => prev+ 1);
              setLevel_3(1)
            }
            if(value=== 'B')
              setLevel_1(3);
            break;
          default:
        }
      }
    }
  }

  const backHandler = () => {
    if(level_1=== 2){
      if(level_2=== 0){
        switch(level_3){
          case 0:
            setLevel_1(1)
            break;
          case 1:
            setLevel_3(0)
            break;
          case 2:
            setLevel_3(1)
        }
      }else{
        switch(level_3){
          case 0:
            setLevel_2(0);
            break
          case 1:
            if(level_2=== 1){
              setLevel_3(0)
            }else{
              setLevel_2(prev => prev - 1)
              setLevel_3(4)
            }
            break;
          case 2:
          case 3:
          case 4:
            setLevel_3(prev => prev - 1);
            break;
          default:
        }
      }
    }else if(level_1=== 3){
      setLevel_1(2)
      if(clients.length> 0){
        setLevel_2(clients.length)
        setLevel_3(4)
      }else{
        setLevel_2(0)
        setLevel_3(2)
      }
    }else{
      setLevel_1(prev => prev - 1)
    }
  }

  useEffect(()=>{
    switch(level_1){
      case 1:
        setTitle("First, tell us a little about yourself*");
        setSubDescription(`e.g. "I'm the head of marketing at of a generative AI startup based in San Francisco."`);
        setIsInputShown(2);
        setIsRadioShown(0);
        setValue(summary)
        break;
      case 2:
        if(level_2=== 0){
          switch(level_3){
            case 0:
              setTitle("How should we curate your daily news brief?*");
              setSubDescription(null);
              setIsInputShown(0);
              setIsRadioShown(1);
              setValue(brief);
              break;
            case 1:
              setTitle("What does your company do?*");
              setSubDescription(`Example:"Newsletter Depo is a media monitoring service that sends daily news roundups curated by AI."`);
              setIsInputShown(2);
              setIsRadioShown(0);
              setValue(company_operation);
              break;
            case 2:
              setTitle("What type of news is most relevant to you and your company?*");
              setSubDescription(`Example:"Generative AI, AI and tech in journalism, news trends, and big announcements in comms/adtech."`);
              setIsInputShown(2);
              setIsRadioShown(0);
              setValue(news_types);
              break;
            default:
          }
        }else{
          switch(level_3){
            case 0:
              setTitle("Great! Now we will go client by client and collect some of their info.");
              setSubDescription(`We will use this to monitor for media mentions and to create sections tailored to each client's industry.`);
              setIsInputShown(0);
              setIsRadioShown(2);
              setValue("A");
              break;
            case 1:
              setTitle(`What is this client's name?*`);
              setSubDescription(`Example: "Newsletter Depo"`);
              setIsInputShown(1);
              setIsRadioShown(0);
              clients.length>= level_2? setValue(clients[level_2-1]['name']): setValue('')
              break;
            case 2:
              setTitle(`What does this client do?*`);
              setSubDescription(`Example:"Newsletter Depo is a media monitoring service that sends daily news roundups curated by AI."`);
              setIsInputShown(2);
              setIsRadioShown(0);
              setValue(clients[level_2-1]['summary'])
              break;
            case 3:
              setTitle(`What type of news is most relevant to this client`);
              setSubDescription(`Example:"Generative AI, AI and tech in journalism, news trends, and big announcements in comms/adtech."`);
              setIsInputShown(2);
              setIsRadioShown(0);
              setValue(clients[level_2-1]['news_types'])
              break;
            case 4:
              setTitle(`Would you like to add another client?`);
              setSubDescription(`You can always add additional clients in the future by responding directly to any one of your daily briefs`);
              setIsInputShown(0);
              setIsRadioShown(3);
              setValue("A")
              break;
            default:
          }
        }
        break;
      case 3:
        setTitle(`What's the name of your company?*`);
        setSubDescription(`e.g. "Newsletter Depo"`);
        setIsInputShown(1);
        setIsRadioShown(0);
        setValue(company_name)
        break;
      case 4:
        setTitle(`Any specific publications you'd like to see included?`);
        setSubDescription(`We select stories from thousands of major news sources every day. If there are any specific trade pubs, local outlets, blogs, or newsletters that you'd like to see, let us know and we'll do our best to include them.`);
        setIsInputShown(2);
        setIsRadioShown(0);
        setValue(specific_publications)
        break;
      case 5:
        setTitle(`Is there anything else you'd like to see in your briefs?`);
        setSubDescription(`Ask for anything. We'll try our best to include it.`);
        setIsInputShown(2);
        setIsRadioShown(0);
        setValue(addition)
        break;
      case 6:
        setTitle(`How did you hear about Newsletter Depo?(optional)`);
        setSubDescription(`e.g. "From my friend"`);
        setIsInputShown(1);
        setIsRadioShown(0);
        setValue(from_what)
        break;
      case 7:
        setTitle(`What's your work email?*`);
        setSubDescription(`By providing your email, you agree to receive daily emails from the Newsletter Depo team. That's what we do, after all.`);
        setIsInputShown(1);
        setIsRadioShown(0);
        setValue(work_email)
        break;
      case 8:
        setTitle(`Finally...what's your name?*`);
        setSubDescription(`e.g. "Michael Jackson"`);
        setIsInputShown(1);
        setIsRadioShown(0);
        setValue(username)
        break;
    }
    console.log('levels', level_1, level_2, level_3)
  },[level_1, level_2, level_3])

  return (
    <div className="onboarding_right">
      <div style={{flex:1}}></div>
      <div style={{flex:5}}>
        <h1 style={{fontSize:'30px'}}>{title}</h1>
        <p style={{color:'#677b8b'}}>{subDescription}</p>
        {isInputShown===1 && <InputText placeholder={level_1!==7?'Type your answer here...':'name@example.com'} value={value} style={{width:'100%', marginBottom:'30px', marginTop:'30px'}} onChange={(e) => setValue(e.target.value)} />}
        {isInputShown===2 && <InputTextarea placeholder='Type your answer here...' autoResize value={value} style={{width:'100%', marginBottom:'30px', marginTop:'30px'}} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />}
        {isRadioShown>0 && 
          <div style={{marginBottom:'20px'}}>
            <div style={{display:'flex', alignItems:'baseline'}}>
              <RadioButton inputId='brief_A' name="category" value='A' onChange={() => setValue('A')} checked={value === 'A'} />
              <label htmlFor='brief_A' style={{marginLeft:'6px'}}>
                {isRadioShown===1 && <p>Business: News that's relevant to my company, career and industry</p>}
                {isRadioShown===2 && <p>Sounds great</p>}
                {isRadioShown===3 && <p>Yes, I want to add another client</p>}
              </label>
            </div>
            <div style={{display:'flex', alignItems:'baseline'}}>
              <RadioButton inputId='brief_B' name="category" value='B' onChange={() => setValue('B')} checked={value === 'B'} />
              <label htmlFor='brief_B' style={{marginLeft:'6px'}}>
                {isRadioShown===1 && <p>Agency: News about my clients and their industries</p>}
                {isRadioShown===2 && <p>Actually, I'd just like see news that's relevant to my company</p>}
                {isRadioShown===3 && <p>No, I am done for now</p>}
              </label>
            </div>
          </div>}
        <div style={{display:'flex'}}>
          <div style={{flex:1}}></div>
          <div style={{flex:0, display:'flex', gap:'10px'}}>
            {level_1> 1 && <Button severity='info' style={{gap:'10px'}} label="Back" onClick={backHandler} icon={<FaArrowLeftLong />} />}
            <Button severity='info' style={{ gap:'10px' }} onClick={nextHandler} >
              <span className='p-button-label p-c'>{level_1<8? 'Next': 'Submit'}</span>
              <FaArrowRightLong />
            </Button>
          </div>
        </div>
      </div>
      <Loader promiseTracker={usePromiseTracker} color={'#3F88C5'}/>
    </div>
  )
}