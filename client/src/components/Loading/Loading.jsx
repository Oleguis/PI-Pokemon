import React from "react";
import './loading.css'

export default function Loading({movible, centro}) {
    
    let pokeBall = movible ? 'pokeBall rotateBall' : 'pokeBall';
    if (centro) pokeBall += ' centro';

    // let pokeTamaño = tamaño ? tamaño : '3'    
    return (
        <div className={pokeBall} > 
            <div className="centraLine"></div>
            <div className="centralCircle1"></div>
            <div className="centralCircle2"></div>
        </div>
    )
}