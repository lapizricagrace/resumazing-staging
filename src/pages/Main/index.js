import React, { Component } from 'react'

import './style.css'
import CHOICES from  '../../constants/template_choices'
//import ANIMATE from '../../constants/animations'
import TemplateSelected from '../TemplateSelected'
const imgSource = require('../../assets/images/about_us.png')

export default class Main  extends Component{
    
    constructor(props){
        super(props)
        
        //localStorage.clear()
        

        this.fileUpload =  React.createRef()
        this.state = {
            showTemplates : false,
            choice : CHOICES.DEFAULT,
            selected : '',
            toggleAboutUs :false
        }
    }

    toggleTemplates = () => {
        this.setState({
            showTemplates : !this.state.showTemplates
        })
    }

    handleTemplateChoice = (to) => {
        if(!!CHOICES[to]){
            this.setState({
                choice : to
            })
        }else{
            this.setState({
                selected : to
            })
        }
    }

    handleSession = () => {
        this.setState({
            selected : localStorage.getItem('lastChanged')
        })
    }

    handleChosenFile = async (e) => {
        const file = e.target.files[0]
        const fileType = file.type.split('/')[1]
        if(fileType !== 'json'){
            alert('Not a json file')
            return
        }
        const json = await this.loadJson(file)
        const { selected = '', data = {} } = json

        console.log('@Parsed',json)
        if(!selected){
            alert('Invalid data')
            return
        }
        console.log('@Selected',selected)
        localStorage.setItem(selected,JSON.stringify(data))
        this.setState({
            selected
        })
    }

    loadJson = (file) => new Promise((resolve,reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(JSON.parse(reader.result))
        reader.readAsText(file)
    })

    toggleAboutUs = () => {
        this.setState({
            toggleAboutUs : !this.state.toggleAboutUs
        })
    }


    render(){

        return (
            <div className='main-container'>
                <div className='main-body'>
                    <div className='left'>
                        <div className='header'>
                            <h1>RESUMAZING</h1>
                        </div>
                        <div className='body'>
                            {
                                this.state.showTemplates &&
                                <div className={'previous-btn'}><button onClick={() => {
                                    if(this.state.showTemplates && this.state.choice === CHOICES.DEFAULT){
                                        this.toggleTemplates()
                                    }else{
                                        this.handleTemplateChoice(CHOICES.DEFAULT)
                                    }
                                }}>Back</button></div>
                            }
                            {
                                this.state.showTemplates ? 
                                <div className={'templates'}>
                                    {
                                        CHOICES[this.state.choice].map( (choice, key) => <button onClick={() => this.handleTemplateChoice(choice.to)} key={key}>{choice.name}</button> )
                                    }
                                </div>
                                :
                                <div className='choices'>
                                    {
                                        localStorage.getItem('lastChanged') && <button onClick={this.handleSession}>Continue Session</button>
                                    }

                                    <button id={'json'} onClick={() => {
                                        this.fileUpload.current.click()
                                    }}>Import .json File</button>
                                    <input style={{display : 'none'}} accept={"*.json"} type={'file'} ref={this.fileUpload} onChange={this.handleChosenFile}/>
                                    <button onClick={() => {
                                        localStorage.clear()
                                        this.toggleTemplates()
                                        
                                    }}>Create New Resume</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='right'>

                    </div>
                </div>
                <div className='main-footer'>
                    <h5>RESUMAZING (2019)</h5>
                    <button onClick={this.toggleAboutUs}>About Us</button>
                </div>
                {
                    this.state.selected !== '' ?
                    <TemplateSelected 
                        to={this.handleTemplateChoice}
                        selected={this.state.selected}
                    /> : null
                }
                {
                    this.state.toggleAboutUs ? 
                    <div className={'about-us-container'}>
                        <button onClick={this.toggleAboutUs} style={{alignSelf : 'flex-end', marginRight : '50px'}}>X</button>
                        <img src={imgSource} alt="ABOUT US" width={'90%'} height={'90%'} />
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}