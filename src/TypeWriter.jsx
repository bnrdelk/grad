import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'

function TypeWriter(props) {

    return (
        <div className='App'>
            <p style={{ margin: 'auto 0', fontWeight: 'normal', fontSize: props.size, display: 'inline-block', alignContent: 'center', textAlign: 'center', color: props.color }}>
                <span style={{ color: props.color, fontWeight: 'bold' }}>
                    <Typewriter
                        words={props.words}
                        loop={props.loop}
                        cursor
                        cursorStyle='_'
                        typeSpeed={props.speed}
                        deleteSpeed={140}
                        delaySpeed={2500}
                    />
                </span>
                {props.lastWord}
            </p>
        </div>
    )
}

export default TypeWriter
