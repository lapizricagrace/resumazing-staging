import React, { Component } from 'react'

import './style.css'

const imgSource = require('../../assets/images/help_system.png')


export default class SideNav extends Component{
    state = {
        toggleHelp : false
    }

    toggleHelp = () => {
        this.setState({
            toggleHelp : !this.state.toggleHelp
        })
    }

    render(){

        return (
            <div className='sidenav-container'>
                <div className='sidenav-logo'>
                    <h3>RESUMAZING</h3>
                    <p>{this.props.selected} Template</p>
                </div>
                <div className='sidenav-links'>
                    {
                        this.props.links.map( (link,key) =>  
                            <button
                                onClick={() => this.props.navigate(link)} 
                                disabled={this.props.active === link} key={key}>{link}</button>
                        )
                    }
                </div>
                <div className={'sidenav-actions'}>
                    <div className='sidenav-generate'>
                        <button onClick={this.props.saveJson}>Save File</button>
                    </div>
                    <div className='sidenav-generate'>
                        <button onClick={this.props.generate}>Generate</button>
                    </div>
                </div>


                <div className='sidenav-previous'>
                    <button onClick={() => this.props.to('')}>Previous</button>
                </div>
                <div className='sidenav-help'>
                    <button onClick={this.toggleHelp}>Need help?</button>
                </div>
                {
                    this.state.toggleHelp ?
                    <div className={'help-container'}>
                        <button onClick={this.toggleHelp} style={{alignSelf : 'flex-end', marginRight : '50px'}}>X</button>
                        <img src={imgSource} alt="ABOUT US" width={'90%'} height={'90%'} />
                    </div> : null
                }
            </div>
        )
    }
}