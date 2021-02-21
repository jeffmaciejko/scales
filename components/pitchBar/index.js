import React, { useRef, useEffect } from "react";
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber'

export const PitchBar = ({sound}) => {
    const mesh = useRef(Array.from({length:6}).map(React.createRef));
    console.log(mesh);
    const analyser = useRef();
    const listener = useRef();
    const audio = useRef();
    const context = useRef();
    const source = useRef();

    useEffect(
        () => {
            listener.current = new THREE.AudioListener();
            audio.current = new THREE.Audio( listener.current );
            context.current = listener.current.context;
            source.current = context.current.createMediaStreamSource( sound );
            audio.current.setNodeSource( source.current );
            listener.current.gain.disconnect();
            analyser.current = new THREE.AudioAnalyser(audio.current, 64); 
        },
        []
    );

    useFrame(() => {
        if (analyser.current) {
            const data = analyser.current.getFrequencyData();
            console.log(mesh)
            mesh.current.forEach(( freq, index ) => {
                mesh.current[index].current = 'test';
            //     mesh.current[index].current.material.color.setRGB(freq / 100, 0, 0);
            //     mesh.current[index].current.scale.y = (data / 100) * 2; 
            });
        }
    });
    
    return(
        <>
            {Array(6).fill().map( (item, index) =>
                <mesh ref={mesh.current[index]} args={[1, 1, 1]} position={[index, 0, 0]}>
                    <boxBufferGeometry args={[0.05, index, 0.5]} translate={index * 2, 1, 1} />
                    <meshStandardMaterial color='pink' />
                </mesh>
            )}
        </>
    )
    // return null;
}