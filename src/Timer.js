import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton'
import SettingButton from './SettingButton'
import { useContext, useState, useEffect, useRef } from 'react';
import SettingContext from './SettingContext';
import './App.css';

const red = '#f54e4e'
const green = '#4aec8c'



function Timer(){
    const settingsInfo = useContext(SettingContext);

    const [isPaused, setisPsused] = useState(true);
    const [mode, setMode] = useState('work') 
    const [secondLeft, setSecondLeft] =  useState(0);

    const secondLeftRef = useRef(secondLeft)
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode(){
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes * 60 )
        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondLeft(nextSeconds)
        secondLeftRef.current = nextSeconds
    }

    function tick() {
        secondLeftRef.current--;
        setSecondLeft(secondLeftRef.current)
    }

    function initTimer(){
        setSecondLeft(settingsInfo.workMinutes * 60)
    }

    useEffect(() => {
        initTimer()


        const Interval = setInterval(()=> {
            if (isPausedRef.current) {
                return
            }
            if (secondLeftRef.current === 0) {
                return switchMode()
            }
            tick()
        }, 1000)

        return ()=> clearInterval(Interval)
    }, [settingsInfo]);


    const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60
    const percentage = Math.round(secondLeft / totalSeconds * 100);

    const minutes = Math.floor(secondLeft / 60);
    let seconds = secondLeft % 60;
    if(seconds < 10) seconds = '0'+ seconds


    return(
        <div>
            <CircularProgressbar className='propresbar' value={percentage} text={minutes + ':' + seconds} styles={buildStyles({rotation: 0, strokeLinecap: 'butt',
                textColor: '#fff',
                pathColor: mode === 'work' ? red : green,
                trailColor: 'rgba(255, 255, 255, .2)'
            
            })} />
            <div style={{marginTop: '20px'}}>
                {isPaused ? 
                <PlayButton onClick={()=> {setisPsused(false); isPausedRef.current = false}}/> :
                <PauseButton onClick={()=> {setisPsused(true); isPausedRef.current = true}}/>}
                
                
            </div>
            <div style={{marginTop: '20px'}}>
                <SettingButton onClick={()=> settingsInfo.setShowSettings(true)}/>
            </div>
        </div>
    )
}

export default Timer;