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
        fontFamily : 'Arial-Bold',
        color : '#666600'
    },
    busTitleBlk : {
        fontSize : '14pt',
        fontFamily : 'Arial-Black'
    }
})


class Business extends Component {

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

       const { multilist : work_multilist = []  } = this.props.data['Work Experiences/Trainings'] || {}
       let { multilist : educ_multilist = []  } = this.props.data['Education'] || {}
        educ_multilist = this.multilistMapper(educ_multilist)

       let { multilist : skill_multilist = []  } = this.props.data['Skills & Abilities'] || {}
       skill_multilist = this.multilistMapper(skill_multilist)

       let { multilist : exp_multilist = []  } = this.props.data['Experience'] || {}
       exp_multilist = this.multilistMapper(exp_multilist)

       let { multilist : proj_multilist = []  } = this.props.data['Projects'] || {}
       proj_multilist = this.multilistMapper(proj_multilist)

       console.log('@Mappy',exp_multilist)
       const { multilist : let_multilist = []  } = this.props.data['Licensure Examination for Teachers (LET)'] || {}
        return (
            <Document title={`${this.props.selected} Template`}>
                <Page size='LETTER' style={{paddingBottom : '25pt', flex : 1, flexDirection : 'row', flexWrap : 'wrap'}}>
                    <View style={[styles.header,{flex : 1, flexBasis : '100%'}]}>
                        <View style={styles.personalInfo}>
                            <Text style={styles.name}>{fullname.toUpperCase()}</Text>
                            <Text style={styles.otherDetails}>{`${address}`}</Text>
                            <Text style={styles.otherDetails}>{email}</Text>
                            <Text style={[styles.otherDetails,{fontSize : '14pt'}]}>{contact_number}</Text>
                        </View>
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <Image style={{width : '2in', height : '2in'}}
                                src={picture || './sample.png'}
                                />
                        </View> 
                    </View>
                    <View style={{flex : 1, flexBasis : '100%'}}>
                        <View style={{padding : 25,paddingRight : 35, flexDirection : 'column'}}>
                            <View style={{flexDirection : 'row', width : '100%'}}>
                                <View style={{flex : 1, alignItems : 'flex-end'}}>
                                    <Text style={styles.busTitle}>OBJECTIVE |</Text>
                                </View>
                                <View style={{flex : 3, alignItems : 'stretch', paddingLeft : 10}}>
                                    <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{objective}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexBasis : '100%'}}>
                        <View  style={{padding : 20, flexDirection : 'column'}}>
                            <View style={{flexDirection : 'row', width : '100%'}}>
                                <View style={{flex : 1, alignItems : 'flex-end'}}>
                                    <Text style={styles.busTitle}>PROFILE |</Text>
                                </View>
                                <View style={{flex : 3, alignItems : 'stretch', paddingLeft : 10}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <Text style={{textOverflow : 'break-word',fontFamily : 'Arial-Bold', fontSize : '14pt'}}>AGE: </Text>
                                        <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{age}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', marginTop : 10}}>
                                        <Text style={{textOverflow : 'break-word',fontFamily : 'Arial-Bold', fontSize : '14pt'}}>BIRTHDATE: </Text>
                                        <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{birthdate}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', marginTop : 10}}>
                                        <Text style={{textOverflow : 'break-word',fontFamily : 'Arial-Bold', fontSize : '14pt'}}>BIRTHPLACE: </Text>
                                        <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{placeofbirth}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', marginTop : 10}}>
                                        <Text style={{textOverflow : 'break-word',fontFamily : 'Arial-Bold', fontSize : '14pt'}}>RELIGION: </Text>
                                        <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{religion}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', marginTop : 10}}>
                                        <Text style={{textOverflow : 'break-word',fontFamily : 'Arial-Bold', fontSize : '14pt'}}>NATIONALITY: </Text>
                                        <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{nationality}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', marginTop : 10}}>
                                        <Text style={{textOverflow : 'break-word',fontFamily : 'Arial-Bold', fontSize : '14pt'}}>CIVIL STATUS: </Text>
                                        <Text style={{textOverflow : 'break-word', fontSize : '14pt'}}>{civil_status}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{flex : 1, flexBasis : '100%'}}>
                        <View  wrap={false} style={{flexDirection : 'row', marginTop : 25, flexWrap : 'nowrap'}}>
                            <View style={{flex : 1, alignItems : 'flex-end', flexWrap : 'nowrap'}}>
                                <Text style={[styles.busTitle,{flex : 1}]}>SKILLS & ABILITIES |</Text>
                            </View>
                            <View style={{flex : 3, paddingLeft : 10, flexWrap : 'nowrap'}}>
                                {
                                    skill_multilist &&
                                    skill_multilist.map( (skill,key) => {
                                        const {id, skill_name, skill_details = []} = skill
                                        return <View wrap={false} key={key} style={{flexDirection : 'column', marginTop : 5, flexWrap : 'nowrap'}}>
                                                    <Text style={{textOverflow : 'break-word', fontFamily : 'Arial-Bold', fontSize : '14pt'}}>{skill_name.toUpperCase()}: </Text>
                                                    <View style={{flexDirection : 'column', marginLeft : 5}}>
                                                        {
                                                            skill_details &&
                                                            skill_details.map( detail => {
                                                                return <Text key={detail.id} style={{textOverflow : 'break-word', fontFamily : 'Arial-Narrow',fontSize : '14pt', color : 'gray'}}>• {detail.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%'}}>
                        <View wrap={false} style={{flexDirection : 'row', flex : 1, marginTop : 25, flexWrap : 'wrap'}}>
                            <View style={{flex : 1, alignItems : 'flex-end', flexWrap : 'wrap'}}>
                                <Text style={[styles.busTitle,{flex : 1}]}>EXPERIENCE |</Text>
                            </View>
                            <View style={{flex : 3, paddingLeft : 10, flexWrap : 'nowrap'}}>
                                {
                                    exp_multilist ?
                                    exp_multilist.map( (exp,key) => {
                                        const {
                                            id, 
                                            job_title = '',
                                            company_name = '', 
                                            start_date = '',
                                            end_date = '',
                                            job_responsibilities = []
                                        } = exp
                                        return <View wrap={false} key={key} style={{flex:1,flexDirection : 'column', 
                                        justifyContent : 'flex-start', alignItems : 'flex-start', marginTop : 5, alignContent : 'flex-start', flexWrap : 'nowrap'}}>
                                                    <View style={{flexDirection : 'row', flexWrap : 'wrap', width : '100%', paddingRight : 10}}>
                                                        <Text style={{fontFamily : 'Arial-Bold', fontSize : '14pt'}}>{job_title}</Text>
                                                        <Text style={{fontSize : '14pt', marginLeft : 5}}>{company_name}</Text>
                                                    </View>
                                                    <View style={{flex: 1,flexDirection : 'row', flexWrap : 'nowrap'}}>
                                                        <Text style={{fontSize : '14pt', color : 'gray'}}>{start_date} - {end_date}</Text>
                                                    </View>
                                                    <View  style={{flex: 1,flexDirection : 'column', marginLeft : 5, paddingRight : 10, width : '100%'}}>
                                                        {
                                                            job_responsibilities &&
                                                            job_responsibilities.map( detail => {
                                                                return <Text key={detail.id} style={{textOverflow : 'break-word', fontSize : '14pt'}}>• {detail.value}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                    }) : <View style={{flexDirection : 'column', marginTop : 5, flexWrap : 'nowrap'}}></View>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%'}}>
                        <View wrap={false} style={{flexDirection : 'row', flex : 1, marginTop : 25, flexWrap : 'nowrap'}}>
                            <View style={{flex : 1, alignItems : 'flex-end'}}>
                                <Text style={[styles.busTitle,{flex : 1}]}>EDUCATION |</Text>
                            </View>
                            <View style={{flex : 3, alignItems : 'stretch', paddingLeft : 10, flexWrap : 'nowrap'}}>
                                {
                                    educ_multilist &&
                                    educ_multilist.map( (exp,key) => {
                                        const {
                                            id, 
                                            school_name = '',
                                            school_location = '', 
                                            degree = '',
                                            major = '',
                                            gpa = ''
                                        } = exp
                                        return <View wrap={false} key={key} style={{flexDirection : 'column', marginTop : 5, flexWrap : 'nowrap'}}>
                                                    <View debug style={{flexDirection : 'row', flexWrap : 'wrap'}}>
                                                        <Text style={{fontFamily : 'Arial-Bold', fontSize : '14pt'}}>{school_name.toUpperCase()}, </Text>
                                                        <Text style={{fontSize : '14pt'}}>{school_location.toUpperCase()}</Text>
                                                    </View>
                                                    <View style={{flexDirection : 'row'}}>
                                                        <Text style={{textOverflow : 'break-word',fontSize : '14pt',color : 'gray'}}>{degree.toUpperCase()}
                                                        { (major.toLowerCase().trim() === 'n/a' || major.toLowerCase().trim() === '') ? '' : ` IN ${major.toUpperCase()}`} </Text>
                                                    </View>
                                                    <View style={{flexDirection : 'row'}}>
                                                        <Text style={{fontSize : '14pt'}}>{gpa}</Text>
                                                    </View>
                                                </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 1, flexBasis : '100%'}}>
                        <View wrap={false} style={{flexDirection : 'row', flex : 1, marginTop : 15, flexWrap : 'nowrap'}}>
                            <View style={{flex : 1, alignItems : 'flex-end'}}>
                                <Text style={[styles.busTitle,{flex : 1}]}>PROJECTS |</Text>
                            </View>
                            <View style={{flex : 3, alignItems : 'stretch', paddingLeft : 10}}>
                                {
                                    proj_multilist &&
                                    proj_multilist.map( (proj,key) => {
                                        const {
                                            id, 
                                            project_description = '',
                                            link_project = ''
                                        } = proj
                                        return <View wrap={false} key={key} style={{flexDirection : 'column', marginTop : 5}}>
                                                    <Text style={{fontSize : '14pt'}}>{project_description} ({link_project})</Text>
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



export default Business

