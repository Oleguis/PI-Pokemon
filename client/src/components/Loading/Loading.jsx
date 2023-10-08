import React from "react";
import './loading.css'

export default function Loading({movible, centro}) {
    
    let pokeBall = movible ? 'pokeBall_l rotateBall_l' : 'pokeBall_l';
    if (centro) pokeBall += ' centro_l';

    // let pokeTamaño = tamaño ? tamaño : '3'    
    return (
        <div className="divLoadingPpal">
            <div className="divLoaddingSecond">
                <div className={pokeBall} > 
                    <div className="centraLine_l"></div>
                    <div className="centralCircle1_l"></div>
                    <div className="centralCircle2_l"></div>
                </div>
                <div className="divMensajeLeyendo">
                    <h3>Leyendo datos .....</h3>
                    <div className="divLoading"></div>
                </div>
            </div>
        </div>
    )
}