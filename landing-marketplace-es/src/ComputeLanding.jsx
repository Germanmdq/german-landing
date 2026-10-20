import React,{useEffect,useRef} from 'react';

export default function ComputeLanding(){
  const frame=useRef(null);
  useEffect(()=>{
    const onMessage=(e)=>{ if(e.data?.type==='socai-open-models') window.location.hash='modelos'; };
    window.addEventListener('message',onMessage);
    return()=>window.removeEventListener('message',onMessage);
  },[]);
  return <iframe ref={frame} title="SOCA" src="/socai-compute.html" style={{position:'fixed',inset:0,width:'100%',height:'100%',border:0,background:'#050608',zIndex:99999}} />;
}
