import React, { useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { PitchBar } from '../../components/pitchBar'

const freeformPage = () => {
    const [micDataReady, setMicDataReady] = useState(false);
    const [micData, setMicData ] = useState(null);
    const sound = useRef(micData);

    function startMic(startMicProp) {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(mediaStream) {
            setMicData(mediaStream);
            setTimeout(() => {
                setMicDataReady(true);
            }, 500);
        })
        .catch(setTimeout(() => {
                console.log('error');
            }, 500));
    }
    
    function stopMic(stopMicProp) {
        console.log(micData);
        micData.getAudioTracks().forEach(track => {
            console.log(track);
            track.stop();
        });
        setMicDataReady(false);
    }

    return (
        <div className="container" styes={{height:'100%'}}>
            <h1>Freeform Page</h1>
            <button onClick={() => startMic()}>
                Start Mic
            </button>
            <button onClick={() => stopMic()}>
                Stop Mic
            </button>
            <Canvas>
                <ambientLight intensity={0.5} color={0x4e4e4e} />
                {/* <pointLight position={[10, 10, 10]} /> */}
                {micDataReady === true ? <PitchBar sound={micData} /> : null }
            </Canvas>
        </div>
    )
}

export default freeformPage;