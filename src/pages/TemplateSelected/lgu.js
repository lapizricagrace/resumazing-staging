import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'


const ArialBlackSrc = require('../../assets/fonts/Arial-Black.ttf')
const ArialBoldSrc = require('../../assets/fonts/Arial-Bold.ttf')
const ArialNarrowSrc = require('../../assets/fonts/Arial-Narrow.TTF')
const ArialNarrowBoldItalicSrc = require('../../assets/fonts/Arial-Narrow-Bold-Italic.TTF')
const ArialItalicSrc = require('../../assets/fonts/Arial-Italic.ttf')
const ArialItalicBoldSrc = require('../../assets/fonts/Arial-Italic-Bold.ttf')
const Arial = require('../../assets/fonts/Arial.ttf')

Font.register({family : 'Arial', src : Arial})
Font.register({family : 'Arial-Bold', src : ArialBoldSrc})
Font.register({family : 'Arial-Black', src : ArialBlackSrc})
Font.register({family : 'Arial-Narrow', src : ArialNarrowSrc})
Font.register({family : 'Arial-Narrow-Bold-Italic', src : ArialNarrowBoldItalicSrc})
Font.register({family : 'Arial-Italic', src : ArialItalicSrc})
Font.register({family : 'Arial-Italic-Bold', src : ArialItalicBoldSrc})

const LGUFooter = require('../../assets/images/lgu-footer.PNG')

const styles = StyleSheet.create({
    container : {
        borderWidth: 3,
        borderColor : 'black',
        flex : 1,
        display : 'flex',
        flexDirection : 'column'
    },
    header : {
        padding : '3px'
    },
    smallText : {
        fontSize : '9pt',
        fontFamily : 'Arial-Narrow'
    },
    mainTitle : {
        justifyContent : 'center',
        alignItems : 'center',
        padding : '15pt'
    },
    mainTitleText : {
        fontSize : '20pt',
        fontWeight : 'black',
        fontFamily : 'Arial-Black'
    },
    subTitle : {
        justifyContent : 'space-between',
        flexDirection : 'row',
        borderBottomWidth : 3,
        alignContent : 'flex-start',
        alignItems : 'baseline'
    },
    verySmallText : {
        fontSize : '9pt',
        fontFamily : 'Arial-Narrow',
        marginLeft : 5,
        letterSpacing : '0.3pt'
    },
    csIDMainContainer : {
        borderWidth : 1,
        flexDirection : 'row',
        justifyContent: 'center'
    },
    csIDLabelContainer : {
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'baseline',
        padding : 3
    },
    csIDLabel : {
        fontSize : '9pt',
        fontFamily : 'Arial-Narrow'
    },
    csIDContent : {
        fontSize : '9pt',
        fontFamily : 'Arial-Narrow',
        textAlign : 'right'
    },
    textLabels : {
        fontSize : '8pt',
        fontFamily : 'Arial-Narrow',
        textAlign : 'center'
    },
    textContent : {
        fontSize : '9pt',
        fontFamily : 'Arial'
    }
})


class LGU extends Component {

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
        const checkBox = "0x2610"
        const { 
            cs_id_no = '',
            pi_surname = '',
            pi_first_name = '',
            pi_middle_name = '',
            pi_name_extension = '',
            pi_date_of_birth = '',
            pi_place_of_birth = '',
            pi_sex = '',
            pi_civil_status = '',
            pi_citizenship = '',
            pi_height = '',
            pi_weight = '',
            pi_blood_type = '',
            pi_gsis_id_no = '',
            pi_pagibig_id_no = '',
            pi_philhealth_no = '',
            pi_sss_no = '',
            pi_residential_address = '',
            pi_res_zipcode = '',
            pi_res_telephone_no = '',
            pi_permanent_address = '',
            pi_perm_zipcode = '',
            pi_perm_telephone_no = '',
            pi_email_address = '',
            pi_cellphone_no = '',
            pi_agency_employment_no = '',
            pi_tin = ''
         } = this.props.data['Personal Information'] || {}


         const {
            spouse_surname = '',
            spouse_first_name = '',
            spouse_middle_name = '',
            spouse_occupation = '',
            spouse_employer = '',
            spouse_business_address = '',
            spouse_telephone_no = '',
            father_surname = '',
            father_firstname = '',
            father_middlename = '',
            mother_surname = '',
            mother_firstname = '',
            mother_middlename = ''

         } = this.props.data['Family Background I'] || {}

         let { multilist : children_multilist = [] } = this.props.data['Family Background II'] || {}
         children_multilist = this.multilistMapper(children_multilist)
         
         let { multilist : education_multilist = [] } = this.props.data['Educational Background (LGU)'] || {}
         education_multilist = this.multilistMapper(education_multilist)
         education_multilist = this.multilistMerge('level',education_multilist)

         let { multilist : civil_multilist = [] } = this.props.data['Civil Service Eligibility'] || {}
         civil_multilist = this.multilistMapper(civil_multilist)

         let { multilist : work_multilist = [] } = this.props.data['Work Experience'] || {}
         work_multilist = this.multilistMapper(work_multilist)
         
         let { multilist : voluntary_multilist = [] } = this.props.data['Voluntary Work or Involvement in Civic / Non-Government / People / Voluntary Organizations'] || {}
         voluntary_multilist = this.multilistMapper(voluntary_multilist)

         let { multilist : training_multilist = [] } = this.props.data['Training Programs'] || {}
         training_multilist = this.multilistMapper(training_multilist)
         
         let { multilist : other_i_multilist = [] } = this.props.data['Other Information I'] || {}
         other_i_multilist = this.multilistMapper(other_i_multilist)

         let { multilist : other_ii_multilist = [] } = this.props.data['Other Information II'] || {}
         other_ii_multilist = this.multilistMapper(other_ii_multilist)

         let { multilist : other_iii_multilist = [] } = this.props.data['Other Information III'] || {}
         other_iii_multilist = this.multilistMapper(other_iii_multilist)

         let { multilist : reference_multilist = [] } = this.props.data['References'] || {}
         reference_multilist = this.multilistMapper(reference_multilist)


         const {
            question_I = '',
            question_II = '',
            question_III = '',
            question_IV = '',
            question_V = '',
            question_VI = '',
            question_VII = '',
            question_VIII = '',
            question_IX = '',
            question_X = '',
            question_XI = ''
         } = this.props.data['Other Information IV']
         
         console.log('@Mapper',other_ii_multilist)
         console.log('@Propy',this.props.data)
        return (
            <Document title={`${this.props.selected} Template`}>
                <Page size='LEGAL'>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.smallText}>CS FROM 212 (Revised 2015)</Text>
                        </View>
                        <View style={styles.mainTitle}>
                            <Text style={styles.mainTitleText}>PERSONAL DATA SHEET</Text>
                        </View>
                        <View style={styles.subTitle}>
                            <View>
                                <Text style={styles.verySmallText}>
                                    {`Print legibly.  Mark appropriate boxes with a check mark and use separate sheet if necessary.`}
                                </Text>
                            </View>
                            
                            <View style={styles.csIDMainContainer}>
                                <View style={styles.csIDLabelContainer}>
                                    <Text style={styles.csIDLabel}>1. CS ID No.</Text>
                                </View>
                                <View  style={{width : '130pt', borderWidth : 1, justifyContent : 'center', alignItems : 'center'}}>
                                    <Text  style={[styles.csIDContent,{textAlign : 'center', width : '100%'}]}>{cs_id_no || '(to be filled up by CSC)'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex : 1}}>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>I. PERSONAL INFORMATION</Text>
                            </View>
                            <View style={{borderWidth : 1}}>
                                <View style={{flexDirection : 'row'}}>
                                    <View style={{flex:0, borderWidth : 1, width : 125, borderBottomWidth : 0, padding : 2}}>
                                        <Text style={styles.textLabels}>2. SURNAME</Text>
                                    </View>
                                    <View style={{flex : 1, borderWidth : 1}}>
                                        <Text style={styles.textContent}>{pi_surname}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection : 'row'}}>
                                    <View style={{flex:0, borderWidth : 1, width : 125, borderBottomWidth : 0, borderTopWidth : 0, padding : 2}}>
                                        <Text style={styles.textLabels}>FIRST NAME</Text>
                                    </View>
                                    <View style={{flex : 1, borderWidth : 1}}>
                                        <Text style={styles.textContent}>{pi_first_name}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection : 'row'}}>
                                    <View style={{flex:0, borderWidth : 1, width : 125, borderTopWidth : 0, padding : 2}}>
                                        <Text style={styles.textLabels}>MIDDLE NAME</Text>
                                    </View>
                                    <View style={{flex : 1, borderWidth : 1, flexDirection : 'row'}}>
                                        <View style={{flex : 1}}>
                                            <Text style={styles.textContent}>{pi_middle_name}</Text>
                                        </View>
                                        <View style={{flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, width : 125}}>
                                                <Text style={styles.textLabels}>3. NAME EXTENSION (e.g. Jr., Sr.)</Text>
                                            </View>
                                            <View style={{width : 60, borderWidth : 1}}>
                                                <Text style={styles.textContent}>{pi_name_extension}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{borderWidth : 1, flexDirection : 'row'}}>
                                    <View style={{flex : 1,borderWidth : 1, flexShrink : 0, flexDirection : 'column'}}>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>4. DATE OF BIRTH (mm/dd/yyyy)</Text>
                                            </View>
                                            <View style={{width : 100, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_date_of_birth}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>5. PLACE OF BIRTH</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_place_of_birth}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>6. SEX</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_sex}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>7. CIVIL STATUS</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_civil_status}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>8. CITIZENSHIP</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_citizenship}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>9. HEIGHT (m)</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_height}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>10. WEIGHT (kg)</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_weight}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>11. BLOOD TYPE</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>"{pi_blood_type}"</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>12. GSIS ID NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_gsis_id_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>13. PAGIBIG ID NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_pagibig_id_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>14. PHILHEALTH NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_philhealth_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>15. SSS NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_sss_no}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex : 1,borderWidth : 1, flexShrink : 0, flexDirection : 'column'}}>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100, borderBottom : 0}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>16. RESIDENTIAL ADDRESS</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_residential_address}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100, borderTop : 0, borderBottom : 0}}>
                                                <Text style={[styles.textLabels,{textAlign : 'right'}]}>ZIP CODE</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_res_zipcode}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100, borderTop : 0}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>17. TELEPHONE NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_res_telephone_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100, borderBottom : 0}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>18. PERMANENT ADDRESS</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_permanent_address}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100, borderTop : 0, borderBottom : 0}}>
                                                <Text style={[styles.textLabels,{textAlign : 'right'}]}>ZIP CODE</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_perm_zipcode}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100, borderTop : 0}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>19. TELEPHONE NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_perm_telephone_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>20. E-MAIL ADDRESS</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_email_address}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>21. CELLPHONE NO. (if any)</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_cellphone_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>22. AGENCY EMPLOYEE NO.</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_agency_employment_no}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                <Text style={[styles.textLabels,{textAlign : 'left'}]}>23. TIN</Text>
                                            </View>
                                            <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                <Text style={styles.textContent}>{pi_tin}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>II. FAMILY BACKGROUND</Text>
                            </View>
                            <View style={{borderWidth : 1}}>
                                    <View style={{borderWidth : 1, flexDirection : 'row'}}>
                                        <View style={{flex : 1,borderWidth : 1, flexShrink : 0, flexDirection : 'column'}}>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderBottomWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>24. SPOUSE'S SURNAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1}}>
                                                    <Text style={styles.textContent}>{spouse_surname}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderBottomWidth : 0, borderTopWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>FIRST NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1}}>
                                                    <Text style={styles.textContent}>{spouse_first_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderTopWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>MIDDLE NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1}}>
                                                        <Text style={styles.textContent}>{spouse_middle_name}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{flex :1, flexDirection : 'row'}}>
                                                <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'left'}]}>Occupation</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                    <Text style={styles.textContent}>{spouse_occupation}</Text>
                                                </View>
                                            </View>
                                            <View style={{flex :1, flexDirection : 'row'}}>
                                                <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'left'}]}>EMPLOYER/BUS. NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                    <Text style={styles.textContent}>{spouse_employer}</Text>
                                                </View>
                                            </View>
                                            <View style={{flex :1, flexDirection : 'row'}}>
                                                <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'left'}]}>BUSINESS ADDRESS</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                    <Text style={styles.textContent}>{spouse_business_address}</Text>
                                                </View>
                                            </View>
                                            <View style={{flex :1, flexDirection : 'row'}}>
                                                <View style={{borderWidth : 1, padding : 3, width : 100}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'left'}]}>TELEPHONE NO.</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, padding : 3}}>
                                                    <Text style={styles.textContent}>{spouse_telephone_no}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderBottomWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>26. FATHER'S SURNAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1}}>
                                                    <Text style={styles.textContent}>{father_surname}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderBottomWidth : 0, borderTopWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>FIRST NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1}}>
                                                    <Text style={styles.textContent}>{father_firstname}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderTopWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>MIDDLE NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1}}>
                                                        <Text style={styles.textContent}>{father_middlename}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderBottomWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>27. MOTHER'S MAIDEN SURNAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1}}>
                                                    <Text style={styles.textContent}>{mother_surname}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderBottomWidth : 0, borderTopWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>FIRST NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1}}>
                                                    <Text style={styles.textContent}>{mother_firstname}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <View style={{flex:0, borderWidth : 1, width : 100, borderTopWidth : 0, padding : 2}}>
                                                    <Text style={[styles.textLabels,{textAlign : 'right'}]}>MIDDLE NAME</Text>
                                                </View>
                                                <View style={{flex : 1, borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1}}>
                                                        <Text style={styles.textContent}>{mother_middlename}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    <View style={{flex : 1,borderWidth : 1, flexShrink : 0, flexDirection : 'column'}}>
                                        <View style={{flex :1, flexDirection : 'row', flexGrow : 0}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textLabels]}>25. NAME OF CHILD</Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={styles.textLabels}>DATE OF BIRTH (mm/dd/yyyy)</Text>
                                            </View>
                                        </View>
                                        {
                                            children_multilist &&
                                            children_multilist.map( (child,key) => {
                                                    const { id, child_name, date_of_birth } = child
                                                return <View key={key} style={{flex :1, flexDirection : 'row', flexGrow : 0}}>
                                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                                <Text style={[styles.textContent]}>{child_name}</Text>
                                                            </View>
                                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>{date_of_birth}</Text>
                                                            </View>
                                                        </View>
                                            })
                                        }
                                        {/* <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View>
                                        <View style={{flex :1, flexDirection : 'row'}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent]}></Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>   /   /   </Text>
                                            </View>
                                        </View> */}
                                    </View>
                                </View>
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>III. EDUCATIONAL BACKGROUND</Text>
                            </View>
                            <View style={{borderWidth : 1, flexDirection : 'column', flexGrow : 1}}>
                                <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%'}}>
                                        <View style={{flex : 1, flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                28. LEVEL
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            NAME OF SCHOOL (Write in full)
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            DEGREE COURSE (Write in full)
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            YEAR GRADUATED (If graduated)
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                HIGHEST GRADE/ LEVEL/ UNITS EARNED (if not graduated)
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', flexWrap : 'wrap'}}>
                                            <View style={{flex : 1, flexBasis : '100%', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                        INCLUSIVE DATES OF ATTENDANCE
                                                </Text>
                                            </View>
                                            <View style={{flexDirection : 'row',flex : 1, flexBasis : '100%'}}>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>FROM</Text>
                                                    </View>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>TO</Text>
                                                    </View>
                                            </View>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                SCHOLARSHIP/ ACADEMIC HONORS RECEIVED
                                        </Text>
                                        </View>
                                </View>
                                {
                                    education_multilist && 
                                    Object.keys(education_multilist).map( (level,key) => {
                                        return <View key={key} wrap={false} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center'}}>
                                                        <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center'}]}>
                                                            {level}
                                                        </Text>
                                                    </View>
                                                    <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                        {
                                                            education_multilist[level].map((data,key) => {

                                                                const { 
                                                                    school_name, 
                                                                    degree_course, 
                                                                    year_graduated,
                                                                    highest_grade,
                                                                    educ_lgu_from,
                                                                    educ_lgu_to,
                                                                    academic_honors
                                                                 } = data
                                                               return <View key={key} style={{flexDirection : 'row', flexGrow : 1}}>
                                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, flexDirection : 'row', justifyContent : 'center'}}>
                                                                            
                                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                                                    {school_name}
                                                                                                </Text>
                                                                            </View>
                                                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                           
                                                                            <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                                {degree_course}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                            
                                                                            <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                                {year_graduated}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', flexDirection : 'row'}}>
                                                                        
                                                                            <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                                {highest_grade}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                                                                            <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                                    {educ_lgu_from}
                                                                                </Text>
                                                                            </View>
                                                                            <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                                    {educ_lgu_to}
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center',flexDirection : 'column', alignItems : 'center'}}>
                                                                            {
                                                                                academic_honors &&
                                                                                academic_honors.map( (name,key) => {
                                                                                    return <View key={key} style={{flex : 1, width : '100%', borderWidth : 1}}>
                                                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                                                {name.value}
                                                                                            </Text>
                                                                                    </View>
                                                                                })
                                                                            }
                                                                        </View>
                                                        </View>
                                                            })
                                                        }
                                                    </View>
                                            </View>
                                    })
                                }
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'center'}}>(Continue on separate sheet if necessary)</Text>
                            </View>
                            <View style={{borderWidth : 1, padding : 1, borderBottomWidth : 5}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'right'}}>Page 1 of 4</Text>
                            </View>
                        </View>
                    </View>
                </Page>
                <Page size='LEGAL'>
                    <View style={styles.container}>
                        <View style={{flex : 1}}>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>IV. CIVIL SERVICE ELIGIBILITY</Text>
                            </View>
                            <View style={{borderWidth : 1, flexDirection : 'column', flexGrow : 1}}>
                                <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%'}}>
                                        <View style={{flex : 1, flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER SPECIAL LAWS/ CES/ CSEE
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            RATING
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            DATE OF EXAMINATION / CONFERMENT
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            PLACE OF EXAMINATION / CONFERMENT
                                        </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', flexWrap : 'wrap'}}>
                                            <View style={{flex : 1, flexBasis : '100%', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                    LICENSE (if applicable)
                                                </Text>
                                            </View>
                                            <View style={{flexDirection : 'row',flex : 1, flexBasis : '100%'}}>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>NUMBER</Text>
                                                    </View>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>DATE OF RELEASE</Text>
                                                    </View>
                                            </View>
                                        </View>
                                </View>
                                {
                                    civil_multilist && 
                                    civil_multilist.map( (data,key) => {
                                        const { 
                                            career_service, 
                                            date_examination, 
                                            date_release,
                                            license_number,
                                            place_examination,
                                            rating
                                         } = data
                                        return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                        <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, flexDirection : 'row', justifyContent : 'center'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                                    {career_service}
                                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                    {rating}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                    {date_examination}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', flexDirection : 'row'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                    {place_examination}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {license_number}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {date_release}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                            </View>
                                    })
                                }
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'center'}}>(Continue on separate sheet if necessary)</Text>
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>V.  WORK EXPERIENCE (Include private employment.  Start from your current work)</Text>
                            </View>
                            <View style={{borderWidth : 1, flexDirection : 'column', flexGrow : 1}}>
                                <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%'}}>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', flexWrap : 'wrap'}}>
                                            <View style={{flex : 1, flexBasis : '100%', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                    30. INCLUSIVE DATES (mm/dd/yyyy)
                                                </Text>
                                            </View>
                                            <View style={{flexDirection : 'row',flex : 1, flexBasis : '100%'}}>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>From</Text>
                                                    </View>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>To</Text>
                                                    </View>
                                            </View>
                                        </View>
                                        <View style={{flex : 1, flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                DEPARTMENT / AGENCY / OFFICE / COMPANY (Write in full)
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                MONTHLY
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                SALARY GRADE & STEP INCREMENT (Format "00-0")
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                STATUS OF APPOINTMENT
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            GOV'T SERVICE (Yes / No)
                                            </Text>
                                        </View>
                                        
                                </View>
                                {
                                    work_multilist && 
                                    work_multilist.map( (data,key) => {
                                        const { 
                                            from, 
                                            to, 
                                            position_title,
                                            department,
                                            monthly_salary,
                                            salary_grade,
                                            status_appointment,
                                            government_service
                                         } = data
                                        return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                        <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {from}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {to}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, flexDirection : 'row', justifyContent : 'center'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                                    {position_title}
                                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                    {department}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                    {monthly_salary}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, justifyContent : 'center', flexDirection : 'row'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                    {salary_grade}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, justifyContent : 'center', flexDirection : 'row'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                    {status_appointment}
                                                                </Text>
                                                            </View>
                                                            
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, justifyContent : 'center', flexDirection : 'row'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                    {government_service}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                            </View>
                                    })
                                }
                            </View>
                            <View style={{borderWidth : 1, padding : 1, borderBottomWidth : 5}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'right'}}>Page 2 of 4</Text>
                            </View>
                        </View>
                    </View>
                </Page>
                <Page size='LEGAL'>
                    <View style={styles.container}>
                        <View style={{flex : 1}}>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>
                                VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S
                                </Text>
                            </View>
                            <View style={{borderWidth : 1, flexDirection : 'column', flexGrow : 1}}>
                                <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%'}}>
                                        <View style={{flex : 1, flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            NAME & ADDRESS OF ORGANIZATION (Write in full)
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', flexWrap : 'wrap'}}>
                                            <View style={{flex : 1, flexBasis : '100%', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                INCLUSIVE DATES (mm/dd/yyyy)
                                                </Text>
                                            </View>
                                            <View style={{flexDirection : 'row',flex : 1, flexBasis : '100%'}}>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>From</Text>
                                                    </View>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>To</Text>
                                                    </View>
                                            </View>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                NUMBER OF HOURS
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                POSITION / NATURE OF WORK
                                            </Text>
                                        </View>
                                        
                                </View>
                                {
                                    voluntary_multilist && 
                                    voluntary_multilist.map( (data,key) => {
                                        const { 
                                            name_address_organization, 
                                            from,
                                            to,
                                            number_hours,
                                            nature_work,
                                         } = data
                                        return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                        <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, flexDirection : 'row', justifyContent : 'center'}}>
                                                            
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                                    {name_address_organization}
                                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {from}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {to}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                    {number_hours}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                    {nature_work}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                            </View>
                                    })
                                }
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'center'}}>(Continue on separate sheet if necessary)</Text>
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>VII.  TRAINING PROGRAMS (Start from the most recent training.)</Text>
                            </View>
                            <View style={{borderWidth : 1, flexDirection : 'column', flexGrow : 1}}>
                                <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%'}}>
                                        
                                        <View style={{flex : 1, flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5,flexWrap : 'wrap', flexDirection : 'column'}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold', flex : 1, textAlign : 'center'}]}>
                                                32. TITLE OF SEMINAR/CONFERENCE/
                                            </Text>
                                            <Text style={[{fontFamily : 'Arial-Bold',fontSize : '8pt', flex : 1, textAlign : 'center'}]}>
                                            WORKSHOP/SHORT COURSES (Write in full)
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row', flexWrap : 'wrap'}}>
                                            <View style={{flex : 1, flexBasis : '100%', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                     INCLUSIVE DATES (mm/dd/yyyy)
                                                </Text>
                                            </View>
                                            <View style={{flexDirection : 'row',flex : 1, flexBasis : '100%'}}>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>From</Text>
                                                    </View>
                                                    <View style={{ flex :1, borderWidth : 1 }}>
                                                        <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>To</Text>
                                                    </View>
                                            </View>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                NUMBER OF HOURS
                                            </Text>
                                        </View>
                                        <View style={{flex : 1,flexBasis : '14.3%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                            <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                            CONDUCTED/ SPONSORED BY (Write in full)
                                            </Text>
                                        </View>
                                </View>
                                {
                                    training_multilist && 
                                    training_multilist.map( (data,key) => {
                                        const { 
                                            title_seminar, 
                                            training_from, 
                                            training_to,
                                            number_hours,
                                            conducted
                                         } = data
                                        return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                    <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                        <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                                    {title_seminar}
                                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1, justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {training_from}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ flex :1, borderWidth : 1, flexDirection : 'row', height : '100%', justifyContent : 'center' }}>
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textAlign : 'center',textOverflow : 'break-word'}]}>
                                                                        {training_to}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow', textAlign : 'center', flex : 1, textOverflow : 'break-word'}]}>
                                                                    {number_hours}
                                                                </Text>
                                                            </View>
                                                            <View style={{flex : 1,flexBasis : '16.7%', borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                
                                                                <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                    {conducted}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                            </View>
                                    })
                                }
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'center'}}>(Continue on separate sheet if necessary)</Text>
                            </View>
                            <View style={{borderWidth : 1, padding : 1}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt'}}>VIII.  OTHER INFORMATION</Text>
                            </View>
                            <View style={{flexDirection : 'row', flex : 1}}>
                                <View style={{borderWidth : 1, flexDirection : 'column', flex : 1}}>
                                    <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%', height : 50}}>
                                            
                                            <View style={{flex : 1,borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                    SPECIAL SKILLS / HOBBIES:
                                                </Text>
                                            </View>
                                    </View>
                                    {
                                        other_i_multilist && 
                                        other_i_multilist.map( (data,key) => {
                                            const { 
                                                special_skills
                                            } = data
                                            return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                        <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                            <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                                <View style={{flex : 1, borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                    
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                        {special_skills}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                </View>
                                        })
                                    }
                                </View>
                                <View style={{borderWidth : 1, flexDirection : 'column', flex : 1}}>
                                    <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%', height: 50}}>
                                            
                                            <View style={{flex : 1, borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                NON-ACADEMIC DISTINCTIONS / RECOGNITION: (Write in full)
                                                </Text>
                                            </View>
                                    </View>
                                    {
                                        other_ii_multilist && 
                                        other_ii_multilist.map( (data,key) => {
                                            const { 
                                                recognition
                                            } = data
                                            return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                        <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                            <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                                <View style={{flex : 1, borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                    
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                        {recognition}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                </View>
                                        })
                                    }
                                </View>
                                <View style={{borderWidth : 1, flexDirection : 'column', flex : 1}}>
                                    <View wrap={false} style={{borderWidth : 1, flexDirection : 'row', width : '100%', height: 50}}>
                                            
                                            <View style={{flex : 1, borderWidth : 1, justifyContent : 'center', alignItems : 'center', padding : 5}}>
                                                <Text style={[styles.textLabels,{fontFamily : 'Arial-Bold'}]}>
                                                MEMBERSHIP IN ASSOCIATION/ORGANIZATION (Write in full)
                                                </Text>
                                            </View>
                                    </View>
                                    {
                                        other_iii_multilist && 
                                        other_iii_multilist.map( (data,key) => {
                                            const { 
                                                organization
                                            } = data
                                            return <View wrap={false} key={key} style={{borderWidth : 1, flexDirection : 'row'}}>
                                                        <View style={{flex : 1, flexDirection : 'column', flexBasis : 'auto', flexGrow : 1}}>
                                                            <View style={{flexDirection : 'row', flexGrow : 1}}>
                                                                <View style={{flex : 1, borderWidth : 1,flexDirection : 'row', justifyContent : 'center'}}>
                                                                    
                                                                    <Text style={[styles.textContent,{fontFamily : 'Arial-Narrow',flex : 1, textOverflow : 'break-word', textAlign : 'center'}]}>
                                                                        {organization}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                </View>
                                        })
                                    }
                                </View>
                            </View>
                            
                            <View style={{borderWidth : 1, padding : 1, borderBottomWidth : 5}}>
                                <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'right'}}>Page 3 of 4</Text>
                            </View>
                        </View>
                    </View>
                </Page>
                <Page size='LEGAL'>
                    <View style={[styles.container]}>

                        <View style={{width : '100%', flexDirection : 'column', borderWidth : 1}}>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderBottomWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>36. Are you related by consanguinity or affinity to any of the following : </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    a. Within the third degree (for National Government Employees): appointing authority, recommending authority, chief of office/bureau/department or person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text  style={[styles.textContent,{textOverflow : 'break-word'}]}>{question_I}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    b. Within the fourth degree (for Local Government Employees): appointing authority or recommending authority where you will be appointed?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_II}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width : '100%', flexDirection : 'column', borderWidth : 1}}>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                        37 a. Have you ever been formally charged?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_III}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    b. Have you ever been guilty of any administrative offense?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_IV}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width : '100%', flexDirection : 'column', borderWidth : 1}}>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    38. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_V}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width : '100%', flexDirection : 'column', borderWidth : 1}}>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    39. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract, AWOL or phased out, in the public or private sector?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_VI}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width : '100%', flexDirection : 'column', borderWidth : 1}}>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    40. Have you ever been a candidate in a national or local election (except Barangay election)?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_VII}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width : '100%', flexDirection : 'column', borderWidth : 1}}>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderBottomWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    a. Are you a member of any indigenous group?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_VIII}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    b. Are you differently abled?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_IX}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-start', borderWidth : 1, borderTopWidth : 0, borderBottomWidth : 0}}>
                                <View style={{flex : 2,borderTopWidth : 0, borderRightWidth : 1, padding : 10}}>
                                    <Text style={[styles.textLabels,{textAlign : 'left', fontSize : '12pt'}]}>
                                    c. Are you a solo parent?
                                    </Text>
                                </View>
                                <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 10}}>
                                    <Text style={styles.textContent}>{question_X}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width : '100%', flexDirection : 'row'}}>
                            <View style={{flex : 2, flexDirection : 'column'}}>
                                <View style={{borderWidth : 1, padding : 5, width : '100%'}}>
                                    <Text style={{fontFamily : 'Arial-Narrow', fontSize : '11pt'}}>
                                        42. REFERENCES (Person not related by consanguinity or affinity to applicant / appointee)
                                    </Text>
                                </View>
                                <View style={{flex : 1, width : '100%',borderWidth : 1, flexShrink : 0, flexDirection : 'column'}}>
                                        <View style={{flex :1, flexDirection : 'row', flexGrow : 0}}>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={[styles.textLabels]}>NAME</Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={styles.textLabels}>ADDRESS</Text>
                                            </View>
                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                <Text style={styles.textLabels}>TEL. NO.</Text>
                                            </View>
                                        </View>
                                        {
                                            reference_multilist &&
                                            reference_multilist.map( (reference,key) => {
                                                    const { id, reference_name, reference_address, reference_telephone } = reference
                                                return <View key={key} style={{flex :1, flexDirection : 'row', flexGrow : 0}}>
                                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                                <Text style={[styles.textContent]}>{reference_name}</Text>
                                                            </View>
                                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>{reference_address}</Text>
                                                            </View>
                                                            <View style={{borderWidth : 1, padding : 3, flex : 1}}>
                                                                <Text style={[styles.textContent,{textAlign : 'center'}]}>{reference_telephone}</Text>
                                                            </View>
                                                        </View>
                                            })
                                        }
                                </View>
                                <View style={{borderWidth : 1, padding : 5, width : '100%'}}>
                                    <Text style={{fontFamily : 'Arial-Narrow', fontSize : '11pt', textIndent : '15pt'}}>
                                        43. I declare under oath that this Personal Data Sheet has been accomplished by me, and is a true, correct and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines.
                                    </Text>
                                    <Text style={{fontFamily : 'Arial-Narrow', fontSize : '11pt', textIndent : '15pt', marginTop : 2}}>
                                        I also authorize the agency head / authorized representative to verify / validate the contents stated herein.  I trust that  this information shall remain confidential.
                                    </Text>
                                </View>
                            </View> 
                            <View style={{padding : 15}}>
                                <View style={{borderWidth : 3, padding : 15, height : '4.5cm', width : '3.5cm',flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
                                        
                                        <Text style={[styles.textContent, {flex : 1, textAlign : 'center', textOverflow : 'break-word', fontSize : '7pt'}]}>
                                            ID picture taken within 
                                            the last  6 months
                                            3.5 cm. X 4.5 cm
                                            (passport size)
                                        </Text>
                                        <Text  style={[styles.textContent, {flex : 1, textAlign : 'center', textOverflow : 'break-word', fontSize : '7pt'}]}>
                                        Computer generated 
                                            or xerox copy of picture 
                                            is not acceptable
                                        </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width : '100%', flexDirection : 'row', flex : 1}}>
                            <Image style={{flex : 1, height : '2in'}} src={LGUFooter}/>
                        </View>
                        <View style={{borderWidth : 1, padding : 1, borderBottomWidth : 5}}>
                            <Text style={{fontFamily : 'Arial-Narrow-Bold-Italic', fontSize : '11pt', textAlign : 'right'}}>Page 4 of 4</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }
}



export default LGU

