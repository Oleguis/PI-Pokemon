import React from 'react'
import Portal from '../Portal/Portal'
// import './Modal.css'

export default function Modal({children, toggle}) {

  // return (
  //   <Portal>
  //     <div style={styles.wrapper}>this is a test</div>
  //   </Portal>
  //   )
  return (
    <Portal>
      <div >
        <div style={styles.wrapper}>
          <button onClick={toggle}>X</button>
          <div>{children}</div>
        </div>
        <div onClick={toggle}/>
      </div>
    </Portal>
  )
}

const styles = {
  wrapper: {
    position: 'absolute',
    top:0,
    left:0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  window: {
    position: 'relative',
    backgound: '#fff',
    borderRadius: 5,
    padding: 15,
    boxShadow: '2px 2px 10px #00000030',
    zIndex: 10,
    minWin: 320,
  },
  closebtn: {
    position: 'absolute',
    top: 5,
    rigth: 5,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgound: '#000',
    opacity: 0.4,
  }
};