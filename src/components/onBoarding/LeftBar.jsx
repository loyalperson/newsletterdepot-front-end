import { FaCircleCheck } from "react-icons/fa6";

export default function LeftBar(){
  // console.log('========email=======', email)
  return (
    <div className="onboarding_left">
      <div style={{flex:1.5}}>
        <img src='logo.png' alt='logo' width={110} />
      </div>
      <div style={{flex:6}}>
        <h2 style={{marginBottom:'50px', fontSize:'25px'}}>Create your free account in less than 60 seconds (we timed it!)</h2>
        <div>
          <div style={{display:'flex'}}>
            <FaCircleCheck color='white' size={20} style={{marginTop:'8px'}}/>
            <p style={{margin:'6px'}}>&nbsp;Worldwide news and top stories from over 40,000 sources in 50+ countries.</p>
          </div>
          <div style={{display:'flex', alignItems:'center'}}>
            <FaCircleCheck color='white' size={17} />
            <p style={{margin:'6px'}}>&nbsp;Over 1 million new articles are indexed per week.</p>
          </div>
          <div style={{display:'flex'}}>
            <FaCircleCheck color='white' size={17} style={{marginTop:'9px'}}/>
            <p style={{margin:'6px'}}>&nbsp;We provide daily & weekly newsletters to over 250+ customers.</p>
          </div>
        </div>
      </div>
      <div style={{flex:1}}>
        <div style={{marginBottom:'10px'}}>
          <p style={{fontSize:'16px',marginBottom:'0px'}}>Get your dynamic & tailored newsletter every morning </p>
          <p style={{fontSize:'16px',marginTop:'3px'}}>delivered to your inbox, alongside customers like:</p>
        </div>
        <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
          <div style={{fontSize:'28px'}}>Google</div>
          <div style={{fontSize:'36px', fontWeight:'bold'}}>BCG</div>
          <div style={{marginTop:'14px'}}>BNP PARIBAS</div>
          <div style={{fontSize:'28px'}}>SAP</div>
        </div>
      </div>
    </div>
  )
}