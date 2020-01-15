import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'

const imageSource = require('./sample.png')
const LiterataSemiBold = require('../../assets/fonts/Literata-SemiBold.ttf')
const ArialBlackSrc = require('../../assets/fonts/Arial-Black.ttf')
const ArialNarrowSrc = require('../../assets/fonts/Arial-Narrow.TTF')
const ArialBoldSrc = require('../../assets/fonts/Arial-Bold.ttf')
const ArialItalicSrc = require('../../assets/fonts/Arial-Italic.ttf')
const ArialItalicBoldSrc = require('../../assets/fonts/Arial-Italic-Bold.ttf')

Font.register({family : 'Literata-SemiBold', src : LiterataSemiBold})
Font.register({family : 'Arial-Black', src : ArialBlackSrc})
Font.register({family : 'Arial-Narrow', src : ArialNarrowSrc})
Font.register({family : 'Arial-Bold', src : ArialBoldSrc})
Font.register({family : 'Arial-Italic', src : ArialItalicSrc})
Font.register({family : 'Arial-Italic-Bold', src : ArialItalicBoldSrc})

const styles = StyleSheet.create({
    header : {
        flex : 0,
        borderBottomWidth : 1,
        flexDirection : 'row'
    },
    body : {
        flex : 1,
        flexDirection : 'column',
        flexWrap : 'wrap'
    },
    personalInfo : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 25
    },
    name : {
        fontFamily : 'Literata-SemiBold',
        color : '#757575',
        fontSize : '25pt'
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
        paddingLeft : '75pt',
        flexDirection : 'column',
        marginTop : 15
    },
    othersTitle : {
        fontFamily : 'Literata-SemiBold'
    },
    othersInsideContainer : {
        marginTop : 15,
        justifyContent : 'flex-start',
        alignItems : 'flex-start',
        flex : 0,
        borderLeftColor : 'gray',
        borderLeftWidth : 3,
        borderLeftStyle : 'dashed',
        paddingLeft : 15
    },
    othersInsideTextContainer : {
        width : '100%',
        flexDirection : 'row',
        flexGrow : 1, 
        flexShrink : 0
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
        fontSize : '14pt',
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
    }
})


class Private extends Component {

    convertUnicode = (unicode) => {
        return String.fromCharCode(parseInt(unicode,16))
    }
    
    render(){
        

        const { 
            fullname = '', 
            objective = '', 
            address = '', 
            contact_number = '', email = '', age = '', 
            birthdate = '', placeofbirth = '', nationality = '', civil_status = '', religion = '', picture = '' } = this.props.data['Profile'] || {}

       const { multilist : work_multilist = []  } = this.props.data['Work Experiences/Trainings'] || {}
       const { multilist : educ_multilist = []  } = this.props.data['Educational Background'] || {}
       const { multilist : skill_multilist = []  } = this.props.data['Skills'] || {}
       const { multilist : let_multilist = []  } = this.props.data['Professional Licensure Examination'] || {}
        return (
            <Document title={`${this.props.selected} Template`}>
                <Page size='LETTER' style={{paddingBottom : '25pt', flex : 1, flexDirection : 'row', flexWrap : 'wrap'}}>
                    <View style={[styles.header,{flex : 1, flexBasis : '100%'}]}>
                        <View style={styles.personalInfo}>
                            <Text style={styles.name}>{fullname.toUpperCase()}</Text>
                            <Text style={styles.otherDetails}>{`${address}`}  · {contact_number}</Text>
                            <Text style={styles.email}>{email}</Text>
                        </View>
                        <View>
                        <Image style={{width : '2in', height : '2in'}}
                                src={picture || './sample.png'}
                                />
                        </View>
                    </View>    
                    <View style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View style={styles.objectivesContainer}>
                                <Text style={styles.objectives}>{objective}</Text>
                            </View>
                            <View style={styles.othersContainer}>
                                <Text style={styles.othersTitle}>PROFILE</Text>
                                <View style={[styles.othersInsideContainer]}>
                                    <View style={[styles.othersInsideTextContainer]}>
                                        <Text style={styles.othersInsideTextLabel}>AGE:</Text>
                                        <Text style={styles.othersInsideTextContent}>{age}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>BIRTHDATE:</Text>
                                        <Text style={styles.othersInsideTextContent}>{birthdate}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>BIRTHPLACE:</Text>
                                        <Text style={styles.othersInsideTextContent}>{placeofbirth}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>RELIGION:</Text>
                                        <Text style={styles.othersInsideTextContent}>{religion}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>NATIONALITY:</Text>
                                        <Text style={styles.othersInsideTextContent}>{nationality}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>CIVIL STATUS:</Text>
                                        <Text style={styles.othersInsideTextContent}>{civil_status}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View wrap={false} style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View wrap={false} style={[styles.othersContainer, {width : '100%'}]}>
                                <Text style={styles.othersTitle}>EXPERIENCE</Text>
                                <View style={[styles.othersInsideContainer,{flexWrap : 'nowrap'}]}>
                                    {
                                        work_multilist.length ?
                                        work_multilist.map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { start_date, end_date, job_title, company_name, job_location, job_responsibilities = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                    <View style={{width : '100%'}}>
                                                        <Text style={[styles.workStartEndData]}>{start_date} - {end_date}</Text>
                                                    </View>
                                                    <View style={{width:'100%', flexDirection : 'column', flexWrap : 'nowrap'}}>
                                                        
                                                        <View style={{flexDirection : 'row', width : '100%' ,flexWrap : 'wrap', paddingRight : 15}}>
                                                            <Text style={styles.othersInsideTextLabel}>{job_title}, </Text>
                                                            <Text style={styles.workCompanyName}>{company_name}, </Text>
                                                            <Text style={styles.workJobLocation}>{job_location}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        {
                                                            job_responsibilities && 
                                                            job_responsibilities.map( resp => {
                                                                return <Text style={styles.workSubValues} key={resp.id}>· {resp.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                    
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        <View wrap={false} style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View style={[styles.othersContainer, {width : '100%', flexShrink : 0}]}>
                                <Text style={styles.othersTitle}>EDUCATION</Text>
                                <View style={styles.othersInsideContainer}>
                                    {
                                        educ_multilist.length ?
                                        educ_multilist.map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { school_level, school_name, degree, major, school_year, gpa, school_location } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column',marginTop : '5pt',
                                                flexShrink : 1}]}>
                                                    <View style={{flexGrow : 2, flexShrink : 0}}>
                                                        <Text style={[styles.workStartEndData]}>{school_year}</Text>
                                                    </View>
                                                    
                                                    <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                        <View>
                                                            <Text> </Text>
                                                        </View>
                                                        <Text style={styles.othersInsideTextLabel}>{degree} {major}, </Text>
                                                        <Text style={styles.workCompanyName}>{school_name}</Text>
                                                    </View>
                                                    
                                                    <View style={{flexGrow : 1}}>
                                                        <Text style={styles.workJobLocation}>GPA: {gpa}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        <View wrap={false} style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View style={[styles.othersContainer,{width : '100%'}]}>
                                <Text style={styles.othersTitle}>SKILLS</Text>
                                <View style={styles.othersInsideContainer}>
                                    {
                                        skill_multilist.length ?
                                        skill_multilist.map( (work,key) =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { skill_name = '', skill_details = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '5pt'}]}>
                                                    <View style={{flexGrow : 1}}>
                                                        <Text style={styles.othersInsideTextLabel}>{skill_name}</Text>
                                                    </View>
                                                    <View style={{flexGrow : 1}}>
                                                        {
                                                            skill_details && 
                                                            skill_details.map( resp => {
                                                                return <Text style={styles.othersInsideTextContent} key={resp.id}>• {resp.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        
                        <View wrap={false} style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                        <View style={styles.othersContainer}>
                            <Text style={styles.othersTitle}>Professional Licensure Examination</Text>
                            <View style={styles.othersInsideContainer}>
                                {
                                    let_multilist.length ?
                                    let_multilist.map( (work,key) =>  {
                                        const {id, inputs } = work
                                        const mapper = inputs.reduce( (result,acc) => {
                                            const { name, value, sub, subValues } = acc
                                             

                                            return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                        },{})
                                        const { passing_rate = '', ratings = [] } = mapper
                                        
                                        return (
                                            <View key={key} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                <View style={{flexDirection : 'row'}}>
                                                    <Text style={styles.othersInsideTextLabel}>{passing_rate}</Text>
                                                </View>
                                                <View>
                                                    {
                                                        ratings && 
                                                        ratings.map( resp => {
                                                            return <Text style={styles.othersInsideTextContent} key={resp.id}>• {resp.value}</Text>
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        )
                                    }) : null
                                }
                            </View>
                        </View>
                        
                    {/* <View style={[styles.body,{width : '100%',flex : 1, flexGrow : 1, flexDirection : 'row', justifyContent : 'center', flexWrap : 'wrap'}]}>
                        <View style={{flex : 1, flexBasis : '100%', borderWidth: 1, flexWrap : 'nowrap'}}>
                            <View style={styles.objectivesContainer}>
                                <Text style={styles.objectives}>{objective}</Text>
                            </View>
                            <View style={styles.othersContainer}>
                                <Text style={styles.othersTitle}>PROFILE</Text>
                                <View style={[styles.othersInsideContainer]}>
                                    <View style={[styles.othersInsideTextContainer]}>
                                        <Text style={styles.othersInsideTextLabel}>AGE:</Text>
                                        <Text style={styles.othersInsideTextContent}>{age}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>BIRTHDATE:</Text>
                                        <Text style={styles.othersInsideTextContent}>{birthdate}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>BIRTHPLACE:</Text>
                                        <Text style={styles.othersInsideTextContent}>{placeofbirth}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>RELIGION:</Text>
                                        <Text style={styles.othersInsideTextContent}>{religion}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>NATIONALITY:</Text>
                                        <Text style={styles.othersInsideTextContent}>{nationality}</Text>
                                    </View>
                                    <View style={styles.othersInsideTextContainer}>
                                        <Text style={styles.othersInsideTextLabel}>CIVIL STATUS:</Text>
                                        <Text style={styles.othersInsideTextContent}>{civil_status}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View wrap={false} style={[styles.othersContainer, {width : '100%'}]}>
                                <Text style={styles.othersTitle}>EXPERIENCE</Text>
                                <View style={[styles.othersInsideContainer,{flexWrap : 'nowrap'}]}>
                                    {
                                        work_multilist.length ?
                                        work_multilist.map( work =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { start_date, end_date, job_title, company_name, job_location, job_responsibilities = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={id} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                    <View style={{width : '100%'}}>
                                                        <Text style={[styles.workStartEndData]}>{start_date} - {end_date}</Text>
                                                    </View>
                                                    <View style={{width:'100%', flexDirection : 'column', flexWrap : 'nowrap'}}>
                                                        
                                                        <View style={{flexDirection : 'row', width : '100%' ,flexShrink : 0}}>
                                                            <Text style={styles.othersInsideTextLabel}>{job_title}, </Text>
                                                            <Text style={styles.workCompanyName}>{company_name}, </Text>
                                                            <Text style={styles.workJobLocation}>{job_location}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        {
                                                            job_responsibilities && 
                                                            job_responsibilities.map( resp => {
                                                                return <Text style={styles.workSubValues} key={resp.id}>· {resp.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                    
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View style={[styles.othersContainer, {width : '100%', flexShrink : 0}]}>
                                <Text style={styles.othersTitle}>EDUCATION</Text>
                                <View style={styles.othersInsideContainer}>
                                    {
                                        educ_multilist.length ?
                                        educ_multilist.map( work =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { school_level, school_name, degree, major, school_year, gpa, school_location } = mapper
                                            
                                            return (
                                                <View wrap={false} key={id} style={[styles.othersInsideTextContainer,{flexDirection : 'column',marginTop : '5pt',
                                                flexShrink : 1}]}>
                                                    <View style={{flexGrow : 2, flexShrink : 0}}>
                                                        <Text style={[styles.workStartEndData]}>{school_year}</Text>
                                                    </View>
                                                    
                                                    <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                        <View>
                                                            <Text> </Text>
                                                        </View>
                                                        <Text style={styles.othersInsideTextLabel}>{degree} {major}, </Text>
                                                        <Text style={styles.workCompanyName}>{school_name}</Text>
                                                    </View>
                                                    
                                                    <View style={{flexGrow : 1}}>
                                                        <Text style={styles.workJobLocation}>GPA: {gpa}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{flex : 1, flexBasis : '100%', flexWrap : 'nowrap'}}>
                            <View style={[styles.othersContainer,{width : '100%'}]}>
                                <Text style={styles.othersTitle}>SKILLS</Text>
                                <View style={styles.othersInsideContainer}>
                                    {
                                        skill_multilist.length ?
                                        skill_multilist.map( work =>  {
                                            const {id, inputs } = work
                                            const mapper = inputs.reduce( (result,acc) => {
                                                const { name, value, sub, subValues } = acc
                                                

                                                return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                            },{})
                                            const { skill_name = '', skill_details = [] } = mapper
                                            
                                            return (
                                                <View wrap={false} key={id} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '5pt'}]}>
                                                    <View style={{flexGrow : 1}}>
                                                        <Text style={styles.othersInsideTextLabel}>{skill_name}</Text>
                                                    </View>
                                                    <View style={{flexGrow : 1}}>
                                                        {
                                                            skill_details && 
                                                            skill_details.map( resp => {
                                                                return <Text style={styles.othersInsideTextContent} key={resp.id}>• {resp.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View>
                        </View>
                        
                        
                        <View style={styles.othersContainer}>
                            <Text style={styles.othersTitle}>Professional Licensure Examination</Text>
                            <View style={styles.othersInsideContainer}>
                                {
                                    let_multilist.length ?
                                    let_multilist.map( work =>  {
                                        const {id, inputs } = work
                                        const mapper = inputs.reduce( (result,acc) => {
                                            const { name, value, sub, subValues } = acc
                                             

                                            return sub ? {...result, [name] : subValues} : {...result, [name] : value}
                                        },{})
                                        const { passing_rate = '', ratings = [] } = mapper
                                        
                                        return (
                                            <View key={id} style={[styles.othersInsideTextContainer,{flexDirection : 'column', marginTop : '10pt'}]}>
                                                <View style={{flexDirection : 'row'}}>
                                                    <Text style={styles.othersInsideTextLabel}>{passing_rate}</Text>
                                                </View>
                                                <View>
                                                    {
                                                        ratings && 
                                                        ratings.map( resp => {
                                                            return <Text style={styles.othersInsideTextContent} key={resp.id}>• {resp.value}</Text>
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        )
                                    }) : null
                                }
                            </View>
                        </View> */}
                    </View>
                    <View style={[styles.body,{width : '100%', flexWrap : 'wrap', flexDirection : 'row', height : 10, paddingTop : 5, paddingBottom : 5, paddingLeft : 15}]}>
                          <Text style={{textAlign: 'left', flex : 1, fontSize : '14pt'}}>Character References are available upon request.</Text>
                    </View>    
                </Page>
            </Document>
        )
    }
}



export default Private

