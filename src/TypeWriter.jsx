import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'

function TypeWriter({size = 'normal', color, words, loop, lastWord, speed}) {

    return (
        <div className='App'>
            <p style={{ margin: 'auto 0', fontWeight: size, display: 'inline-block', alignContent: 'center', textAlign: 'center', color: color }}>
                <span style={{ color: color, fontWeight: 'bold' }}>
                    <Typewriter
                        words={words}
                        loop={loop}
                        cursor
                        cursorStyle='_'
                        typeSpeed={speed}
                        deleteSpeed={140}
                        delaySpeed={2500}
                    />
                </span>
                {lastWord}
            </p>
        </div>
    )
}

export default TypeWriter
