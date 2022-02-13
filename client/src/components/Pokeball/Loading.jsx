import React from "react";
import './loading.css'

export default function Loading(props) {
    
    let pokeBall = props.movible ? 'pokeBall rotateBall' : 'pokeBall'; 
    // let pokeTamaño = props.tamaño ? props.tamaño : '3'    
    return (
        <div className={pokeBall} > 
            <div className="centraLine"></div>
            <div className="centralCircle1"></div>
            <div className="centralCircle2"></div>
        </div>
    )
}