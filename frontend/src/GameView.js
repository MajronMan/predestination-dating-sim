import React,  { Component }  from 'react';
import ReactDOM from 'react-dom';
import GiltView from './GiltView.js'
import DialogueBox from './DialogueBox.js'
import ActionBox from './ActionBox.js'
import './GameView.css'

class GameView extends React.Component {
    render() {
        return (
            <div className = "screen">
                <GiltView className = "gilt" />
                <DialogueBox className = "dialogues" />
                <ActionBox className = "actions" />
            </div>
        )
    }
}

export default GameView;