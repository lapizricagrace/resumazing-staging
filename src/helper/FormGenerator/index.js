import React, { Component } from 'react'


import FORMS from '../../constants/forms'

import './style.css'

export default class FormGenerator extends Component{

    constructor(props){
        super(props)

        this.state = {
            addedForms : []
        }
    }



    handleAddedForm = (objs) => {
        this.setState({
            addedForms : [...this.state.addedForms,objs]
        })
    }

    render(){
        const findForm = FORMS.find( form => form.name === this.props.active )
        const { multilist = [], subValues = [], labels = [] } = this.props.value[this.props.active] || {}
        return (
            <div className={'form-generator-container'}>
                <div className={'form-header'}>
                    <h2>{this.props.active}</h2>
                </div>
                {
                    this.props.value[this.props.active]['multilist'] &&
                    <div className={'form-list-container'}>
                        <div className={'form-list-wrapper'}>
                            {
                                multilist.length > 0 &&
                                <table>
                                        <tr>
                                            <th>Show</th>
                                            <th>Order</th>
                                            {
                                                labels
                                                .filter( label => label !== 'Section Header' )
                                                .map( (label,key) => <th key={key}>{label}</th> )
                                            }
                                            <th>Actions</th>
                                        </tr>
                                        {
                                            multilist.map( (list,key) => {
                                                let { id, inputs, order, allow } = list
                                                order = order || key

                                                return <tr key={id}>
                                                            <td>
                                                                <input 
                                                                    type={'checkbox'} 
                                                                    checked={allow} 
                                                                    onChange={
                                                                        (e) => this.props.multilist.allow(this.props.active,id,e.target.checked)
                                                                    }
                                                                    />
                                                            </td>
                                                            <td>
                                                                <select 
                                                                    value={order} 
                                                                    onChange={ (e) => 
                                                                        this.props.multilist.order(this.props.active,id,e.target.value)
                                                                        }>
                                                                    {
                                                                        Array(multilist.length)
                                                                        .fill()
                                                                        .map((v, k) => {
                                                                            return <option value={k+1}>{k+1}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </td>
                                                            {
                                                                inputs.filter( input => input.label !== 'Section Header' ).map( input => {

                                                                    return <td>{input.value}</td>
                                                                })
                                                            }
                                                            <td>
                                                                <button onClick={() => this.props.multilist.remove(this.props.active,id)}>x</button>
                                                            </td>
                                                        </tr>
                                            })
                                        }
                                </table>
                                
                            }
                        </div>
                    </div>
                }
                <div className={'form-container'}>
                    {
                        !!findForm && (findForm.name === this.props.active) ?
                        findForm.types.map( (type,typeKey) => {
                            const getInputByType = findForm.inputs.filter( input => input.type === type)

                            if(type === 'text' || type === 'textarea'){
                                const createTextElements =  getInputByType.map( (input, inputKey) => {
                                    const { type, label, name, placeholder, file, labelOnly, fullwidth } = input
                                    let element = null
                                    if(type === 'text'){
                                    element = labelOnly ? 
                                                            <div key={inputKey} className='form-group label-only'>
                                                                <label>{label}</label>
                                                            </div>
                                                            :
                                                            <div key={inputKey} className={'form-group'+(fullwidth ? ' fullwidth' : '')}>
                                                                <label>{label}</label>
                                                                <input 
                                                                    onChange={(e) => this.props.change(e,this.props.active)} 
                                                                    value={this.props.value[this.props.active][name]}
                                                                    type={type} 
                                                                    name={name} 
                                                                    placeholder={placeholder}/>
                                                            </div>
                                    }
                                    else if(type === 'textarea'){

                                    element = file ? 
                                                <div key={inputKey} className='form-group'>
                                                    <label></label>
                                                    <div><img style={{width : '2in', height : '2in'}} src={this.props.value[this.props.active][name] || ''} alt="2x2 Image Only"/></div>
                                                    <input 
                                                        onChange={(e) => this.props.change(e,this.props.active)}
                                                        type={'file'} 
                                                        name={name}
                                                        placeholder={placeholder}/>
                                                </div>:
                                                labelOnly ?
                                                <div key={inputKey} className='form-group label-only'>
                                                                <label>{label}</label>
                                                            </div> :
                                                <div key={inputKey} className='form-group'>
                                                                <label>{label}</label>
                                                                <textarea 
                                                                    onChange={(e) => this.props.change(e,this.props.active)} 
                                                                    value={this.props.value[this.props.active][name]}
                                                                    type={type} 
                                                                    name={name} 
                                                                    placeholder={placeholder}/>
                                                            </div>
                                    }
    
                                    return element
                                })

                                return createTextElements
                            }

                            else if(type === 'multilist'){
                                    return <div key={typeKey} className={'form-group multilist'}>
                                        <div className={'multilist-container'}>
                                            {
                                                getInputByType.map( (input,inputKey) => {
                                                    const { label, main, name, placeholder, sub, subType, labelOnly, fullwidth } = input
                                                    
                                                    
                                                    let element
                                                    if(labelOnly){
                                                        element = <div className={'multilist-group label-only'}>
                                                                        <label>{label}</label>
                                                                    </div>
                                                    }
                                                    else if(sub){
                                                        let inputs = subValues.filter(sub => sub.active === this.props.active)
                                                        .find(sub => sub.name === name)
                                                        
                                                        const { values = [] } = inputs || {}
                                                        element = <div className={'multilist-group'+(main ? ' title' : '')+' sub'}>
                                                                
                                                                <div className={'sub-group-list'}>
                                                                    {
                                                                        values &&
                                                                        values.map( input => {
                                                                            return <div key={input.id}>
                                                                                <p>{input.value}</p>
                                                                                <button onClick={() => {

                                                                                    this.props.removeSubMutilist(
                                                                                        this.props.active,
                                                                                        name,
                                                                                        input.id
                                                                                    )
                                                                                }}>-</button>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className={'sub-group'}>
                                                                    <label>{label}</label>
                                                                    <div className={'sub-group-form'}>
                                                                        {
                                                                            subType === 'textarea' || subType === 'basic-textarea' ?
                                                                            <textarea 
                                                                            onChange={(e) => this.props.change(e,this.props.active)} 
                                                                            value={this.props.value[this.props.active][name]}
                                                                            type={type} 
                                                                            name={name} 
                                                                            placeholder={placeholder}/>
                                                                            :
                                                                            <input 
                                                                            onChange={(e) => this.props.change(e,this.props.active)} 
                                                                            value={this.props.value[this.props.active][name]}
                                                                            type={'text'} 
                                                                            name={name}
                                                                            placeholder={placeholder}/>
                                                                        }
                                                                        {
                                                                            subType !== 'basic-textarea' &&
                                                                            <div className={'sub-group-actions'}>
                                                                                <button onClick={
                                                                                    () => this.props.subMultilist(
                                                                                        this.props.active,
                                                                                        name,
                                                                                        this.props.value[this.props.active][name]
                                                                                        )
                                                                                }>+</button>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                    }else{
                                                        element = <div className={'multilist-group'+(main ? ' title' : '')+(fullwidth ? ' fullwidth' : '')}>
                                                                <label>{label}</label>
                                                                <input 
                                                                    onChange={(e) => this.props.change(e,this.props.active)} 
                                                                    value={this.props.value[this.props.active][name]}
                                                                    type={'text'} 
                                                                    name={name}
                                                                    placeholder={placeholder}/>
                                                            </div>
                                                    }

                                                    return element
                                                    
                                                })
                                            }
                                        </div>
                                    </div>
                            }else{
                                return null
                            }
                            
                        })
                        : <div>NO FORM YET</div>
                    }
                    {
                    this.props.value[this.props.active]['multilist'] && 
                    <button onClick={() => this.props.multilist.insert(this.props.active,this.props.selected)}>Add More</button>
                    }
                </div>
            </div>
        )
    }
}