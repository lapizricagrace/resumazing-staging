import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image, Link } from '@react-pdf/renderer'

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
Font.registerHyphenationCallback( word => [word])

const styles = StyleSheet.create({
    header : {
        flex : 0,
        flexDirection : 'row'
    },
    body : {
        flex : 1,
        flexDirection : 'column',
        flexWrap : 'wrap'
    },
    personalInfo : {
        flex : 2,
        justifyContent : 'flex-start',
        alignItems : 'flex-start',
        padding : 25
    },
    name : {
        fontFamily : 'Arial-Bold',
        color : '#666600',
        fontSize : '28pt'
    },
    otherDetails : {
        color : '#757575',
        fontSize : '14pt',
        marginTop : '10pt'
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
        width : '90%',
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
        flex : 0
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
    },
    busTitle : {
        fontSize : '14pt',
        fontFamily : 'Arial-Black',
        color : '#009933',
        marginBottom : '3pt'
    },
    busTitleBlk : {
        fontSize : '14pt',
        fontFamily : 'Arial-Black'
    }
})


class HMTourism extends Component {

    convertUnicode = (unicode) => {
        return String.fromCharCode(parseInt(unicode,16))
    }
    
    multilistMapper = (multilist) =>  multilist.map( list =>  {
        const { id, inputs} = list
        return inputs.reduce( (result,acc) => {
            const { name, value, sub, subValues } = acc
            console.log('@ACC',acc)
            return sub ? {...result, [name] : subValues, id} : {...result, [name] : value, id}
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
            
       let { multilist : educ_multilist = []  } = this.props.data['Education'] || {}
        educ_multilist = this.multilistMapper(educ_multilist)

       let { multilist : skill_multilist = []  } = this.props.data['Skills'] || {}
       skill_multilist = this.multilistMapper(skill_multilist)

       let { multilist : exp_multilist = []  } = this.props.data['Experience'] || {}
       exp_multilist = this.multilistMapper(exp_multilist)

       let { multilist : proj_multilist = []  } = this.props.data['Projects'] || {}
       proj_multilist = this.multilistMapper(proj_multilist)

       let { multilist : award_multilist = []  } = this.props.data['Awards (HM/Tourism)'] || {}
       award_multilist = this.multilistMapper(award_multilist)

           return (
            <Document title={`${this.props.selected} Template`}>
                <Page size='LETTER' style={{padding : '50pt', flex : 1, flexDirection : 'row', flexWrap : 'wrap', borderWidth : 1}}>
                    <View style={[styles.header,{flex : 1, flexBasis : '100%', borderTopWidth : 10, borderTopColor : '#66cc99', paddingTop : 10}]}>
                        <View style={[styles.personalInfo,{padding : 0}]}>
                            <Text style={[styles.name,{textAlign : 'left', color : '#333333'}]}>{fullname}</Text>
                            <Text style={[styles.otherDetails,{marginTop : 2, fontFamily : 'Arial-Bold', color : '#666666', fontSize : '12pt'}]}>{`${address}`}</Text>
                            <Text style={[styles.otherDetails,{marginTop : 2, fontFamily : 'Arial-Bold', color : '#666666', fontSize : '12pt'}]}>{email}</Text>
                            <Text style={[styles.otherDetails,{marginTop : 2, fontFamily : 'Arial-Bold', color : '#666666', fontSize : '12pt'}]}>{contact_number}</Text>
                        </View>
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <Image style={{width : '2in', height : '2in'}}
                                src={picture || './sample.png'}
                                />
                        </View> 
                    </View>
                    <View style={{flex : 1, flexBasis : '100%', marginBottom : 25}}>
                        <View style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={[styles.busTitle,{fontFamily : 'Arial-Black', fontSize : '14pt'}]}>OBJECTIVE</Text>
                            </View>
                            <View style={{padding : 10}}>
                                <Text style={{textAlign : 'justify', fontSize : '14pt', textIndent : '25pt'}}>{objective}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexBasis : '100%', marginBottom : 25}}>
                        <View style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={styles.busTitle}>PROFILE</Text>
                            </View>
                            <View style={{marginTop : 15}}>
                                <View style={{flexDirection : 'row'}}>
                                    <Text style={{textOverflow : 'break-word',fontFamily : 'Arial', fontSize : '13pt'}}>AGE: </Text>
                                    <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>{age}</Text>
                                </View>
                                <View style={{flexDirection : 'row', marginTop : 10}}>
                                    <Text style={{textOverflow : 'break-word',fontFamily : 'Arial', fontSize : '13pt'}}>BIRTHDATE: </Text>
                                    <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>{birthdate}</Text>
                                </View>
                                <View style={{flexDirection : 'row', marginTop : 10}}>
                                    <Text style={{textOverflow : 'break-word',fontFamily : 'Arial', fontSize : '13pt'}}>BIRTHPLACE: </Text>
                                    <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>{placeofbirth}</Text>
                                </View>
                                <View style={{flexDirection : 'row', marginTop : 10}}>
                                    <Text style={{textOverflow : 'break-word',fontFamily : 'Arial', fontSize : '13pt'}}>RELIGION: </Text>
                                    <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>{religion}</Text>
                                </View>
                                <View style={{flexDirection : 'row', marginTop : 10}}>
                                    <Text style={{textOverflow : 'break-word',fontFamily : 'Arial', fontSize : '13pt'}}>NATIONALITY: </Text>
                                    <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>{nationality}</Text>
                                </View>
                                <View style={{flexDirection : 'row', marginTop : 10}}>
                                    <Text style={{textOverflow : 'break-word',fontFamily : 'Arial', fontSize : '13pt'}}>CIVIL STATUS: </Text>
                                    <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>{civil_status}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{flex : 1, flexBasis : '100%', marginBottom : 25}}>
                        <View  wrap={false} style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={[styles.busTitle]}>SKILLS</Text>
                            </View>
                            <View style={{marginTop : 10}}>
                                {
                                    skill_multilist &&
                                    skill_multilist.map( (skill,key) => {
                                        const {id, skill_name, skill_details = []} = skill
                                        return <View wrap={false} key={key} style={{flexDirection : 'column', flexWrap : 'nowrap', marginBottom : 10}}>
                                                    <Text style={{fontFamily : 'Arial', fontSize : '13pt'}}>{skill_name.toUpperCase()}: </Text>
                                                    <View style={{flexDirection : 'column', marginLeft : 35, marginTop : 5}}>
                                                        {
                                                            skill_details &&
                                                            skill_details.map( detail => {
                                                                return <Text key={detail.id} style={{fontFamily : 'Arial',fontSize : '13pt'}}>•     {detail.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%', marginBottom : 25}}>
                        <View wrap={false} style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={[styles.busTitle]}>PROJECTS</Text>
                            </View>
                            <View style={{marginTop : 15}}>
                                {
                                    proj_multilist &&
                                    proj_multilist.map( (proj,key) => {
                                        const {
                                            id, 
                                            project_description = '',
                                            link_project = ''
                                        } = proj

                                        console.log('@Proje',proj)
                                        return <View wrap={false} key={key}  style={{flexDirection : 'column', marginLeft : 35, marginTop : 5}}>
                                                    <Text style={{fontSize : '13pt', fontFamily : 'Arial'}}>•     {project_description} ({link_project})</Text>
                                                </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%', marginBottom : 25}}>
                        <View wrap={false} style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={[styles.busTitle]}>EXPERIENCE</Text>
                            </View>
                            <View style={{marginTop : 10}}>
                                {
                                    exp_multilist ?
                                    exp_multilist.map( (exp,key) => {
                                        const {
                                            id, 
                                            job_title = '',
                                            company_name = '',
                                            job_location = '',
                                            start_date = '',
                                            end_date = '',
                                            job_responsibilities = []
                                        } = exp
                                        return <View wrap={false} key={key} style={{flex:1,flexDirection : 'column', 
                                        justifyContent : 'flex-start', alignItems : 'flex-start', marginTop : 10, alignContent : 'flex-start', flexWrap : 'nowrap'}}>
                                                    <View style={{flexDirection : 'row', flexWrap : 'nowrap', width : '100%'}}>
                                                        <Text style={{fontFamily : 'Arial-Bold', fontSize : '14pt'}}>{company_name}, {job_location}</Text>
                                                        <Text style={{fontSize : '14pt', marginLeft : 5, fontFamily : 'Arial-Italic-Bold', color : '#666666'}}> – {job_title}</Text>
                                                    </View>
                                                    <View style={{flex: 1,flexDirection : 'row', flexWrap : 'nowrap', marginTop : 5}}>
                                                        <Text style={{fontSize : '13pt', color : '#666666'}}>{start_date} - {end_date}</Text>
                                                    </View>
                                                    <View  style={{flex: 1,flexDirection : 'column', marginLeft : 25, flexWrap : 'nowrap', width : '100%', marginTop : 10}}>
                                                        {
                                                            job_responsibilities &&
                                                            job_responsibilities.map( detail => {
                                                                return <Text key={detail.id} style={{textOverflow : 'break-word', fontSize : '13pt'}}>• {detail.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                    }) : <View style={{flexDirection : 'column', marginTop : 5, flexWrap : 'nowrap'}}></View>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%', marginBottom : 25}}>
                        <View wrap={false} style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={[styles.busTitle]}>EDUCATION</Text>
                            </View>
                            <View style={{marginTop : 10}}>
                                {
                                    educ_multilist ?
                                    educ_multilist.map( (exp,key) => {
                                        const {
                                            id, 
                                            school_name = '',
                                            school_location = '',
                                            degree = '',
                                            major = '',
                                            school_year = '',
                                            gpa = ''
                                        } = exp
                                        return <View wrap={false} key={key} style={{flex:1, flexDirection : 'row', flexWrap : 'wrap', marginTop : 15}}>
                                                    <View style={{flex: 1, flexDirection : 'row', flexWrap : 'wrap' , flexBasis : '100%'}}>
                                                        <Text style={{fontFamily : 'Arial-Bold', fontSize : '13pt'}}>{school_name}, {school_location}</Text>
                                                        <Text style={{fontSize : '13pt', marginLeft : 5, fontFamily : 'Arial-Italic-Bold', color : '#666666'}}> – {degree} in {major}</Text>
                                                    </View>
                                                    <View style={{flex: 1,flexDirection : 'row', marginTop : 5, flexBasis : '100%'}}>
                                                        <Text style={{fontSize : '13pt', color : '#666666'}}>{school_year}</Text>
                                                    </View>
                                                    <View  style={{flex: 1,flexDirection : 'row', flexBasis : '100%', marginTop : 5}}>
                                                        <Text style={{textOverflow : 'break-word', fontSize : '13pt'}}>GPA: {gpa}</Text>
                                                    </View>
                                                </View>
                                    }) : <View style={{flexDirection : 'column', marginTop : 5, flexWrap : 'nowrap'}}></View>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%', marginBottom : 25}}>
                        <View  wrap={false} style={{flexDirection : 'column', width : '100%'}}>
                            <View>
                                <Text style={[styles.busTitle]}>AWARDS</Text>
                            </View>
                            <View style={{marginTop : 10}}>
                                {
                                    award_multilist &&
                                    award_multilist.map( (award,key) => {
                                        const {id, award_name, award_description = []} = award

                                        return <View wrap={false} key={key} style={{flexDirection : 'column', flexWrap : 'nowrap', marginBottom : 10, marginLeft : 15}}>
                                                    <Text style={{fontFamily : 'Arial', fontSize : '13pt'}}>● {award_name}</Text>
                                                    <View style={{flexDirection : 'column', marginLeft : 35, marginTop : 5}}>
                                                        {
                                                            award_description &&
                                                            award_description.map( detail => {
                                                                return <Text key={detail.id} style={{fontFamily : 'Arial',fontSize : '13pt'}}>○  {detail.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={[styles.body,{width : '100%', flexWrap : 'wrap', flexDirection : 'row', height : 10, paddingTop : 5, paddingBottom : 5, paddingLeft : 15}]}>
                          <Text style={{textAlign: 'left', flex : 1, fontSize : '14pt'}}>Character References are available upon request.</Text>
                    </View>
                </Page>
            </Document>
        )
    }
}



export default HMTourism