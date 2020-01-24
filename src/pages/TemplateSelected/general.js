import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'

const imageSource = require('./sample.png')
const LiterataSemiBold = require('../../assets/fonts/Literata-SemiBold.ttf')
const ArialBlackSrc = require('../../assets/fonts/Arial-Black.ttf')
const ArialNarrowSrc = require('../../assets/fonts/Arial-Narrow.TTF')
const ArialBoldSrc = require('../../assets/fonts/Arial-Bold.ttf')
const ArialItalicSrc = require('../../assets/fonts/Arial-Italic.ttf')
const ArialItalicBoldSrc = require('../../assets/fonts/Arial-Italic-Bold.ttf')

const LiterataBoldItalic = require('../../assets/fonts/Literata-BoldItalic.ttf')
const LiterataSemiBoldItalic = require('../../assets/fonts/Literata-SemiBoldItalic.ttf')

Font.register({family : 'Literata-SemiBold', src : LiterataSemiBold})
Font.register({family : 'Arial-Black', src : ArialBlackSrc})
Font.register({family : 'Arial-Narrow', src : ArialNarrowSrc})
Font.register({family : 'Arial-Bold', src : ArialBoldSrc})
Font.register({family : 'Arial-Italic', src : ArialItalicSrc})
Font.register({family : 'Arial-Italic-Bold', src : ArialItalicBoldSrc})
Font.register({family : 'Literata-BoldItalic', src : LiterataBoldItalic})
Font.register({family : 'Literata-SemiBoldItalic', src : LiterataSemiBoldItalic})


const TNR = require('../../assets/fonts/TNR.ttf')
const TNRItalic = require('../../assets/fonts/TNR-Italic.ttf')
const TNRBold = require('../../assets/fonts/TNR-Bold.ttf')
const TNRBoldItalic = require('../../assets/fonts/TNR-Bold-Italic.ttf')

Font.register({family : 'TNR', src : TNR})
Font.register({family : 'TNR-Italic', src : TNRItalic})
Font.register({family : 'TNR-Bold', src : TNRBold})
Font.register({family : 'TNR-Bold-Italic', src : TNRBoldItalic})

const styles = StyleSheet.create({
    header : {
        flex : 0,
        borderBottomWidth : 1,
        flexDirection : 'row'
    },
    body : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap'
    },
    personalInfo : {
        flex : 1,
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
        padding : 25
    },
    name : {
        fontFamily : 'Literata-SemiBold',
        color : '#757575',
        fontSize : '28pt'
    },
    lastname : {
        fontFamily : 'Literata-SemiBold',
        color : '#388E3C',
        fontSize : '28pt'
    },
    otherDetails : {
        color : '#757575',
        fontSize : '10pt'
    },
    email : {
        color : '#388E3C',
        fontFamily : 'Arial-Black',
        fontSize : '10pt'
    },
    objectivesContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        width : '90%',
        padding : '10pt 75pt'
    },
    objectives : {
        fontSize : '14pt',
        textAlign : 'justify',
        color : '#757575'
    },
    othersContainer : {
        flexDirection : 'column',
        marginTop : 15,
        borderWidth : 1,
        flex : 1
    },
    othersTitle : {
        fontFamily : 'TNR-Bold'
    },
    othersInsideContainer : {
        marginTop : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
        flex : 1
    },
    othersInsideTextContainer : {
        width : '100%',
        flexDirection : 'row'
    },
    othersInsideTextLabel : {
        fontFamily : 'Arial-Bold',
        color : '#388E3C',
        fontSize : '14pt'
    },
    othersInsideTextContent : {
        flex : 1,
        fontSize : '14pt',
        marginLeft : 10,
        fontFamily : 'Arial-Bold'
    },
    workStartEndData : {
        flex : 1,
        fontSize : '14pt',
        fontFamily : 'Arial-Bold',
        color : 'gray'
    },
    workCompanyName : {
        fontSize : '12pt',
        // fontFamily : 'Arial-Bold',
        color : 'gray'
    },
    workJobLocation : {
        fontSize : '14pt',
        fontFamily : 'Arial-Italic',
        color : 'gray'
    },
    workSubValues : {
        fontSize : '12pt',
        fontFamily : 'Arial-Italic',
        color : 'gray'
    },
    generalProfileTitle :{
        fontSize : '20pt',
        fontFamily : 'TNR-Bold',
        color : '#647C64',
        marginTop : 5
    }
})


class General extends Component {

    convertUnicode = (unicode) => {
        return String.fromCharCode(parseInt(unicode,16))
    }
    
    multilistMapper = (multilist) =>  multilist.map( list =>  {
        
        const { id, inputs, allow} = list

        return inputs.reduce( (result,acc) => {
            const { name, value, sub, subValues } = acc
            
            return sub ? {...result, [name] : subValues, id, allow} : {...result, [name] : value, id,allow}
        },{})
    })

    multilistMerge = (key,data) => {

        return data.reduce((result,acc) => {
                
            if(result[acc[key]]){
                return {
                    ...result,
                    [acc[key]] : [
                        ...result[acc[key]],
                        {...acc}
                    ]
                }
            }

            return {...result, [acc[key]] : [{...acc}] }
        },{})
    }

    render(){
        

        const { 
            fullname = '', 
            objective = '', 
            address = '', 
            contact_number = '', email = '', age = '', 
            birthdate = '', placeofbirth = '', nationality = '', civil_status = '', religion = '', picture = '' } = this.props.data['Profile'] || {}

       const { multilist : work_multilist = []  } = this.props.data['Experience'] || {}
       const { multilist : training_multilist = []  } = this.props.data['Trainings'] || {}
       const { multilist : educ_multilist = []  } = this.props.data['Education'] || {}
       const { multilist : key_skill_multilist = []  } = this.props.data['Key Skills'] || {}
       const { multilist : communication_multilist = []  } = this.props.data['Communication'] || {}
       const { multilist : project_multilist = []  } = this.props.data['Projects'] || {}
       let { multilist : awards_multilist = []  } = this.props.data['Awards (General)'] || {}
       awards_multilist = this.multilistMapper(awards_multilist)

       let { multilist : other_multilist = [], section_header: other_section_header = 'Other Information'  } = this.props.data['Other Information'] || {}
       other_multilist = this.multilistMapper(other_multilist)


       const splitName = fullname.split(' ')
       
        return (
            <Document title={`${this.props.selected} Template`}>
                <Page size='LETTER' style={{flex : 1, flexDirection : 'column', flexWrap : 'wrap'}}>
                    <View fixed style={[styles.header,{width : '100%'}]}>
                        <View style={[styles.personalInfo,{width : '100%', alignItems : 'center'}]}>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={[styles.name]}>{splitName.filter( (name,key) =>  key !== (splitName.length-1)).join(' ')} </Text>
                                <Text style={[styles.lastname]}>{splitName[splitName.length-1]}</Text>
                            </View>
                                <Text style={[styles.otherDetails,{fontSize : '14pt'}]}>{`${address}`}</Text>
                                <Text style={[styles.otherDetails,{fontSize : '14pt'}]}>{contact_number}</Text>
                                <Text style={[styles.otherDetails,{fontSize : '14pt'}]}>{email}</Text>
                        </View>
                    </View>      
                    <View style={[styles.body,{width : '100%', flexWrap : 'wrap', flexDirection : 'row'}]}>
                        <View style={{ width : '40%', height : '100%', flexDirection : 'column'}}>    
                            <View style={{width : '100%', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginTop : 10}}>
                                <Image style={{width : '2in', height : '2in'}}
                                    src={picture || './sample.png'}
                                    />
                            </View>
                            <View fixed wrap={false} style={{padding : 15}}>
                                <Text style={styles.generalProfileTitle}>Profile</Text>
                                <Text style={styles.workCompanyName}>{age}</Text>
                                <Text style={styles.workCompanyName}>{birthdate}</Text>
                                <Text style={styles.workCompanyName}>{placeofbirth}</Text>
                                <Text style={styles.workCompanyName}>{religion}</Text>
                                <Text style={styles.workCompanyName}>{nationality}</Text>
                                <Text style={styles.workCompanyName}>{civil_status}</Text>
                            </View>
                            <View wrap={false} style={{padding : 15}}>
                                <Text style={[styles.generalProfileTitle]}>Education</Text>
                                <View>
                                    {
                                        educ_multilist.length ?
                                        educ_multilist.filter(work => work.allow).map( (work,key) =>  {
                                            
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { level, school_name, degree, major, school_year, gpa, school_location } = mapper
                                            return (
                                                <View key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                    <Text style={{textDecoration : 'underline',fontSize : '12pt', fontFamily : 'Arial-Bold', width : '100%'}}>{level}</Text>
                                                    <Text style={{fontSize : '12pt', width : '100%'}}>{school_name}</Text>
                                                    <View style={{flexDirection : 'row', width : '100%'}}>
                                                        <Text style={{fontSize : '12pt'}}>{degree} {major !== '' ? `in ${major}` : ''}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                            <View wrap={false} style={{padding : 15}}>
                                <Text style={styles.generalProfileTitle}>Key Skills</Text>
                                <View>
                                    {
                                        key_skill_multilist.length ?
                                        key_skill_multilist.filter(work => work.allow).map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { key_skill_name = '', skill_details = [] } = mapper
                                            
                                            return (
                                                <View key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginBottom : 2}]}>
                                                    <View style={{flexDirection : 'row'}}>
                                                        <Text style={{fontSize : '12pt'}}>{key_skill_name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        
                        {/* RIGHT SIDE */}
                        <View style={{width : '60%',height : '100%',  borderWidth : 1,borderColor : '#647C64', borderBottomWidth : 0, borderLeftWidth : 5, flexDirection : 'column', flexWrap : 'wrap'}}>
                            <View wrap={false} style={{width : '100%', padding : 15, borderBottomWidth : 1, borderBottomColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>Objective</Text>
                                <Text style={styles.workCompanyName}>{objective}</Text>
                            </View>
                            <View wrap={false} style={{width : '100%', padding : 15, borderTopWidth : 1, borderTopColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>Experience</Text>
                                <View>
                                    {
                                        work_multilist.length ?
                                        work_multilist.filter(work => work.allow).map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { start_date, end_date, job_title, company_name, job_location, job_responsibilities = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                    
                                                    <View style={{flexDirection : 'column'}}>
                                                        <Text style={styles.workJobLocation}>{start_date} - {end_date}, {job_location}</Text>
                                                        <Text style={styles.workCompanyName}>{job_title} · {company_name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                            <View wrap={false} style={{width : '100%', padding : 15, borderTopWidth : 1, borderTopColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>Trainings</Text>
                                <View>
                                    {
                                        training_multilist.length ?
                                        training_multilist.filter(work => work.allow).map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { start_date, end_date, training_title, location, training_responsibilities = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                    
                                                    <View style={{flexDirection : 'column'}}>
                                                        <Text style={styles.workJobLocation}>{start_date} - {end_date}, {location}</Text>
                                                        <Text style={styles.workCompanyName}
                                                        >{training_title}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                            <View style={{width : '100%', padding : 15, borderTopWidth : 1, borderTopColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>Communication</Text>
                                <View>
                                    {
                                        communication_multilist.length ?
                                        communication_multilist.filter(work => work.allow).map( (work,key) =>  {
                                            const {id, inputs,order } = work
                                            console.log('@Order',order)
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { communication_skill = '', skill_details = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                    <View style={{flexDirection : 'row'}}>
                                                        <Text style={{fontSize : '12pt'}}>{communication_skill}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                            <View style={{width : '100%', padding : 15, borderTopWidth : 1, borderTopColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>Project</Text>
                                <View>
                                    {
                                        project_multilist.length ?
                                        project_multilist.filter(work => work.allow).map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { project_name, project_description, link_project, tools_used = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{marginTop : 10}]}>
                                                    <View style={{flexGrow : 1, flexShrink : 0, flex : 0}}>
                                                        <Text style={{fontSize : '14pt'}}>{project_name} ({link_project})</Text>
                                                        <Text style={{fontSize : '12pt', marginLeft : 15}}>• {project_description}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                            <View style={{width : '100%',padding : 15, borderTopWidth : 1, borderTopColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>Awards</Text>
                                <View>
                                    {
                                        awards_multilist.length ?
                                        awards_multilist.filter(work => work.allow).map( (mapper,key) =>  {
                                            const {id, award_name, award_description = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{marginTop : 10}]}>
                                                    <View style={{flexGrow : 1, flexShrink : 0, flex : 0}}>
                                                        <Text style={{fontSize : '14pt'}}>{award_name}</Text>
                                                        {
                                                            award_description &&
                                                            award_description.map( info => <View style={{marginLeft : 15}}>
                                                                <Text style={{fontSize : '12pt'}} key={info.id}>• {info.value}</Text>
                                                            </View>)
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                            <View wrap={false} style={{width : '100%',padding : 15, borderTopWidth : 1, borderTopColor : '#647C64'}}>
                                <Text style={styles.generalProfileTitle}>{other_section_header || 'Other Information'}</Text>
                                <View>
                                    {
                                        other_multilist.length ?
                                        other_multilist.filter( work => work.allow).map( (mapper,key) =>  {
                                            const {id, title, information_summary = [] } = mapper
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{marginTop : 10}]}>
                                                    <View style={{flexGrow : 1, flexShrink : 0, flex : 0}}>
                                                        <Text style={{fontSize : '14pt'}}>{title}</Text>
                                                        {
                                                            information_summary &&
                                                            information_summary.map( info => <View style={{marginLeft : 15}}>
                                                                <Text style={{fontSize : '12pt'}} key={info.id}>• {info.value}</Text>
                                                            </View>)
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.body,{width : '100%', flexWrap : 'wrap', flexDirection : 'row', height : 10, paddingTop : 5, paddingBottom : 5, paddingLeft : 15}]}>
                          <Text style={{textAlign: 'left', flex : 1, fontSize : '12pt'}}>Character References are available upon request.</Text>
                    </View>
                </Page>
            </Document>
        )
    }
}



export default General

