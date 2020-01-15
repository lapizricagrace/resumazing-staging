import React, { Component } from 'react'
import uuid from 'uuid'
import { PDFViewer } from '@react-pdf/renderer'
import './style.css'

import SideNav from '../../common/SideNav'
import Links from '../../constants/links'
import FORMS from '../../constants/forms'

import FormGenerator from '../../helper/FormGenerator'
import LGUDocument from './lgu'
import PrivateDocument from './academic_private'
import General from './general'
import Business from './business'
import HMTourism from './hm_tourism'
export default class TemplateSelected extends Component{

    constructor(props){
        super(props)

        this.state = {
            forms : {},
            links : [],
            active :'',
            generate : {},
            selected : this.props.selected || '',
            initialForms : {},
            hasGenerated : false,
            documentData : {}
        }

        
    }

    componentDidMount(){
        const navLinks = Links.find( link => link.name === this.state.selected)
        this.setLinks(navLinks.fillups)
    }

    setLinks = (forms,selected) => {
        const prevForm = {...this.state.forms}
        
        const createForm = JSON.parse(localStorage.getItem(this.state.selected)) || forms.map( form => {

            const findForm = FORMS.find(FORM => FORM.name === form )
            
            if(!!findForm){
                const { inputs, types } = findForm
                const labels = inputs.sort((a,b) => a.order - b.order).map( input => input.label)

                const createInputKeys = !!inputs ? inputs.reduce( (result,item) =>  {
                    return types.includes('multilist') ? {...result,[item.name] : '',multilist : [], labels, subValues : [] } :
                    {...result,[item.name] : ''} 
                },{}) : {}
                
                return {[form] : createInputKeys}
            }

            return {[form] : {}}
        })
        .reduce((result,item) => {
            return {...result,...item}
        },{})


        const [ initial ] = forms
        const generate = FORMS.find( form => form.name === initial )
        const newForms = {...prevForm,...createForm}

        this.setState({
            links : forms,
            forms : newForms,
            active : localStorage.getItem(`${this.state.selected}-active`) || initial,
            generate,
            initialForms : createForm
        })
    }

    handleSelectedNav = (link) => {
        const toGenerate = FORMS.find( form => form.name === link )
        localStorage.setItem(`${this.state.selected}-active`,link)
        this.setState({
            active : link,
            generate : toGenerate
        })
    }

    handleImage = (file) => new Promise((resolve,reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => resolve(reader.result)
    })

    handleFormChange = async (e,link) => {
        let name,value
        localStorage.setItem('lastChanged',this.state.selected)
        name = e.target.name
        value = e.target.value
        if(e.target.files && e.target.files.length){
            const result = await this.handleImage(e.target.files[0])
            name = 'picture'
            value = result
        }

        const newVal = {
            ...this.state.forms,
            [link] : {
                ...this.state.forms[link],
                [name] : value
            }
        }

         localStorage.setItem(this.state.selected,JSON.stringify(newVal))
         
         

        this.setState({
            forms : newVal
        })

    }

    

    handleInsertMultilist = (active,selected) => {
        const prevFormState = {...this.state.forms}
        const { multilist = [], subValues = [] } = prevFormState[active] || {}
        const id = uuid()

        let findForm = FORMS.find( form => form.name === active )
        findForm = findForm && findForm.inputs
        .map( input => {
            const findSubValues = subValues.filter( sub => sub.active === active)
            .find( sub => sub.name === input.name )

            if(findSubValues){
                return {
                    ...input,
                    value : prevFormState[active][input.name],
                    subValues : findSubValues.values
                }
            }

            return {
                ...input,
                value : prevFormState[active][input.name]
            }
        }) 

        

        let newValue = {
            ...prevFormState[active], 
            multilist : [...multilist,{id,inputs : findForm, order : 1, allow : true}],
            subValues : []
        }
        
        newValue = Object.keys(newValue).reduce( (result,val) => {

            if(typeof newValue[val] === 'string' && val !== 'section_header'){

                return {...result, [val] : ''}
            }

            return {...result, [val] : newValue[val]}
        },{})

        console.log('@NewVal',newValue)

        localStorage.setItem(this.state.selected,JSON.stringify(newValue))
        this.setState({
            forms : {
                ...prevFormState,
                [active] : newValue
            }
        })
    }

    handleRemoveMultilist = (active,id) => {
        const prevFormState = {...this.state.forms}
        const { multilist = [], subValues = [] } = prevFormState[active] || {}

        let findForm = multilist.filter( list => list.id !== id)

        

        const newValue = {
            ...prevFormState[active], 
            multilist : findForm
        }
    
        localStorage.setItem(this.state.selected,JSON.stringify(newValue))
        this.setState({
            forms : {...prevFormState,
                [active] : newValue
            }
        })
    }

    handleOrderMultilist = (active, id, order) => {

        const prevFormState = {...this.state.forms}
        const { multilist = [], subValues = [] } = prevFormState[active] || {}

        order = parseInt(order)

        let findForm = multilist.map( list => {
            if(list.id === id){
                return {...list, order}
            }

            return list
        }).sort((a,b) => a.order !== b.order && a.order - b.order)


        const newValue = {
            ...prevFormState[active], 
            multilist : findForm
        }

        localStorage.setItem(this.state.selected,JSON.stringify(newValue))
        
        this.setState({
            forms : {
                ...prevFormState,
                [active] : newValue
            }
        })

    }


    handleAllowMultilist = (active, id, allow) => {
        console.log('@Allow',{active,id,allow})
        const prevFormState = {...this.state.forms}
        const { multilist = [], subValues = [] } = prevFormState[active] || {}


        let findForm = multilist.map( list => {
            if(list.id === id){
                return {...list, allow}
            }

            return list
        })


        const newValue = {
            ...prevFormState[active], 
            multilist : findForm
        }

        console.log('@NewVal',newValue)

        localStorage.setItem(this.state.selected,JSON.stringify(newValue))
        
        this.setState({
            forms : {
                ...prevFormState,
                [active] : newValue
            }
        })

    }

    handleInsertSubMultilist = (active,name,value) => {
        const prevFormState = {...this.state.forms}
        const { subValues = [], ...selectedForms } = prevFormState[active] || {}
        const id = uuid()

        const existing = subValues.find( sub => sub.name === name)
        
        let putValues
        let filterSub
        if(existing){
            putValues = {...existing, values : [...existing.values,{id,value}]}
            filterSub = subValues.filter( sub => sub.name !== name)
        }else{
            putValues = {active,name, values : [{id,value}]}
            filterSub = subValues
        }
        
        filterSub = [...filterSub,putValues]

        const newValue = {
            ...prevFormState[active],
            subValues : filterSub
        }


        
        this.setState({
            forms : {...prevFormState,
                [active] : newValue
            },
            
        })

    }

    

    handleRemoveSubMultilist = (active,name,id) => {
        const prevFormState = {...this.state.forms}
        const { subValues = []} = prevFormState[active] || {}


        const existing = subValues.find( sub => sub.name === name)
        
        let putValues
        let filterSub
        if(existing){
            let filterVal = [...existing.values].filter( val => val.id !== id)
            putValues = {...existing, values : filterVal}
            filterSub = subValues.filter( sub => sub.name !== name)
        }
        
        filterSub = [...filterSub,putValues]

        const newValue = {
            ...prevFormState[active],
            subValues : filterSub
        }

        
        this.setState({
            forms : {
                ...prevFormState,
                [active] : newValue
            }
        })

    }

    

    handleGenerate = () => {
        this.setState({
            hasGenerated : true
        })
    }

    handleMakeData = () => {
        this.setState({
            documentData : {...this.state.forms},
            hasGenerated : true
        })
    }

    handlePictureSelect = async (picture) => {
        const [ file ] = picture
        const result = await this.toBase64(file).catch( e => e)

        if(result instanceof Error){
            return;
        }
        
        this.setState({
            forms : {
                ...this.state.form,
                Profile : {
                    ...this.state.forms['Profile'],
                    picture : result
                }
            }
        })
    }

    toBase64 = (file) => new Promise((resolve,reject) => {

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    handleSaveToPC = () => {
        const fileData = JSON.stringify({"selected" : this.state.selected, data : this.state.forms});
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${this.state.selected}_template_${new Date().toLocaleDateString()}.json`;
        link.href = url;
        link.click();
      }


    render(){
        
        return (
            <div className='template-container'>
                
                <SideNav 
                    to={this.props.to}
                    links = {this.state.links}
                    navigate={this.handleSelectedNav}
                    active={this.state.active}
                    selected={this.props.selected}
                    generate={this.handleMakeData}
                    saveJson={this.handleSaveToPC}
                    />

                <div className='template-form'>
                    {
                        !!this.state.active && 
                        <FormGenerator 
                            create={this.state.links}
                            active={this.state.active}
                            change={this.handleFormChange}
                            value={this.state.forms}
                            generate={this.state.generate}
                            pictureSelect={this.handlePictureSelect}
                            multilist={{
                                insert : this.handleInsertMultilist,
                                remove : this.handleRemoveMultilist,
                                order : this.handleOrderMultilist,
                                allow : this.handleAllowMultilist
                            }}
                            subMultilist={this.handleInsertSubMultilist}
                            removeSubMutilist={this.handleRemoveSubMultilist}
                            hasGenerated={this.handleGenerate}
                        />
                    }
                </div>
                <div className='template-preview'>
                    {
                        this.state.hasGenerated &&
                        <PDFViewer style={{flex : 1, width: '100%', borderWidth : 1,height : '100%'}}>
                            {
                                (this.props.selected === 'HM/Tourism' || this.props.selected === 'Psychology' ) && this.state.hasGenerated ?
                                <HMTourism selected={this.props.selected} data={this.state.documentData}/> : 

                                this.props.selected === 'Academic/Health' && this.state.hasGenerated ?
                                <PrivateDocument selected={this.props.selected} data={this.state.documentData}/> : 

                                this.props.selected === 'General' && this.state.hasGenerated ?
                                <General selected={this.props.selected} data={this.state.documentData}/> :

                                (this.props.selected === 'Business' || this.props.selected === 'IT/CS') && this.state.hasGenerated ?
                                <Business selected={this.props.selected} data={this.state.documentData} />:

                                this.props.selected === 'Local Government Unit (LGU)' && this.state.hasGenerated ?
                                <LGUDocument selected={this.props.selected} data={this.state.documentData} /> : null
                            }
                        </PDFViewer>
                    }
                </div>
            </div>
        )
    }
}