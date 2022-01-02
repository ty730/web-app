import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { collection, getFirestore, query, where, getDocs} from 'firebase/firestore'
import SignUp1 from "../assets/images/PlayerWelcome/SignUp1.png"
import SignUp2 from "../assets/images/PlayerWelcome/SignUp2.png"
import Vote from "../assets/images/PlayerWelcome/Vote1.png"
import Calendar from "../assets/images/PlayerWelcome/Complete1.svg"
import Top from '../assets/images/PlayerWelcome/Top.svg'
import './PlayerWelcome.scss'

export default function PlayerWelcome() {
    const history = useHistory(); 
    const [ loading, setLoading ] = useState(true);
    const [ challengerInfo, setChallengerInfo ] = useState(null);

    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")

    async function getDoc() {
        const db = getFirestore();
        const q = query(collection(db, "users"), where("inviteCode", "==", code))
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setChallengerInfo(doc.data())
        })
        setLoading(false)
    }
    
    useEffect(() => {
        getDoc()
      }, [loading]);

    
    return (
        loading === false ? 
        <div className="player-welcome">
            {console.log(challengerInfo)}
            <div className="top" align="center">
                <img src={Top}/>
            </div>
            <div className="main-content">
                <div>
                    <h2 className="heading"><u className="underline">Support</u> {challengerInfo.inviteCode}'s 8by8 Challenge!</h2>
                    <div align="center">
                        <img src={Calendar} />
                    </div>
                </div>
                <div className="text">
                    <p>
                        <b>
                            Help {challengerInfo.inviteCode} win their <u>8BY8 Challenge</u> by registering to vote or taking other actions to #stopasianhate!
                        </b>
                    </p>
                </div>
                <div>
                    <Button onClick={() => {history.push(`/actions?code=${code}`)}}>Get Started</Button>
                </div>
                <div align="center">
                    <p className="small-text">Already have an account? <a href="/signin">Sign In</a></p>
                </div>
                <div>
                    <h3 className="heading"><u className="underline">Here's how it works</u></h3>
                </div>
                <p className="subheading">
                    1. ALL WE NEED IS YOUR ACTION
                </p>
                <p className="text">
                    You can take any number of the available actions: register to vote, get election reminders, 
                    or take the 8by8 challenge yourself. Pick one to start.
                </p>
                <div className="image">
                        <img src={SignUp1} alt="8by8 Logo" />
                </div>
                <p className="subheading">
                    2. YOUR FRIEND WILL EARN A BADGE
                </p>
                <p className="text">
                    Any of the 3 actions will help your friend earn a badge, and get closer to winning the challenge.
                </p>
                <div className="image">
                        <img src={SignUp2} alt="8by8 Logo" />
                </div>
                <p className="subheading">
                    3. COME BACK AND TAKE MORE ACTIONS
                </p>
                <p className="text">
                    Whether it is to help the same friend or a different one, the more action you take, the better! 
                    Note that you can only help earn on badge per friend.     
                </p>
                <div className="image">
                        <img src={Vote} alt="8by8 Logo" />
                </div>
                <Button onClick={() => {history.push(`/actions?code=${code}`)}}>Get Started</Button>
                <p align="center" className="small-text">Already have an account? <a href="/signin">Sign In</a></p>
            </div>
            </div>
            : <h1>loading</h1>
    ) 
}
