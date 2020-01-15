const FORMS = [
    {
        name : 'Profile',
        types : ['textarea','text'],
        inputs : [
            {
                label : 'Choose Picture',
                name: 'picture',
                type: 'textarea',
                placeholder : 'Choose picture',
                file : true
            },
            {
                label : 'Objective',
                name: 'objective',
                type: 'textarea',
                placeholder : 'State your career objectives'
            },
            {
                label : 'Full Name',
                name : 'fullname',
                type : 'text',
                placeholder : 'John Smith'
            },
            {
                label : 'Address',
                name : 'address',
                type : 'text',
                placeholder : 'New York, NY',
                fullwidth : true
            },
            {
                label : 'Contact Number',
                name : 'contact_number',
                type : 'text',
                placeholder : '0912345678'
            },
            {
                label : 'E-mail',
                name : 'email',
                type : 'text',
                placeholder : 'sample@mail.com'
            },
            {
                label : 'Age',
                name : 'age',
                type : 'text',
                placeholder : '22 Y.O.'
            },
            {
                label : 'Birth Date',
                name : 'birthdate',
                type : 'text',
                placeholder : 'May 12, 1997'
            },
            {
                label : 'Place of Birth',
                name : 'placeofbirth',
                type : 'text',
                placeholder : 'New York, NY'
            },
            {
                label : 'Religion',
                name : 'religion',
                type : 'text',
                placeholder : 'Roman Catholic'
            },
            {
                label : 'Nationality',
                name : 'nationality',
                type : 'text',
                placeholder : 'Filipino'
            },
            {
                label : 'Civil Status',
                name : 'civil_status',
                type : 'text',
                placeholder : 'Single / Married / Widowed'
            }
        ]
    },
    {
        name : 'Educational Background',
        types : ['multilist'],
        inputs : [
            {
                label : 'School Level',
                name : 'level',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'College / High School'
            },
            {
                label : 'School Name',
                name : 'school_name',
                type: 'multilist',
                order: 2,
                placeholder : 'La Salle University'
            },
            {
                label : 'Degree',
                name : 'degree',
                type: 'multilist',
                order: 3,
                placeholder : 'Bachelor of Science / High School'
            },
            {
                label : 'Major',
                name : 'major',
                type: 'multilist',
                order: 4,
                placeholder : 'Computer Science / NA'
            },
            {
                label : 'School Year',
                name : 'school_year',
                type: 'multilist',
                order : 5,
                placeholder : '2013 - 2017'
            },
            {
                label : 'GPA',
                name : 'gpa',
                type: 'multilist',
                order : 6,
                placeholder : '2.75'
            }
        ]
    },
    {
        name : 'Work Experiences/Trainings',
        types : ['multilist'],
        inputs : [
            {
                label : 'Company Name',
                name : 'company_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Google'
            },
            {
                label : 'Job Title',
                name : 'job_title',
                type: 'multilist',
                order: 2,
                placeholder : 'Software Engineer'
            },
            {
                label : 'Job Location',
                name : 'job_location',
                type: 'multilist',
                order: 3,
                placeholder : 'Mountain View, CA'
            },
            {
                label : 'Start Date',
                name : 'start_date',
                type: 'multilist',
                order: 4,
                placeholder : 'May 2015'
            },
            {
                label : 'End Date',
                name : 'end_date',
                type: 'multilist',
                order : 5,
                placeholder : 'May 2017 / Present / Etc'
            }
        ]
    },
    {
        name : 'Key Skills',
        types : ['multilist'],
        inputs : [
            {
                label : 'Key Skill Name',
                name : 'key_skill_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Software Testing / Etc'
            }
        ]
    },
    {
        name : 'Communication',
        types : ['multilist'],
        inputs : [
            {
                label : 'Communication Skills',
                name : 'communication_skill',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'State your communication skills'
            }
        ]
    },
    {
        name : 'Skills',
        types : ['multilist'],
        inputs : [
            {
                label : 'Skill Name',
                name : 'skill_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Programming Languages'
            },
            {
                label : 'Skill Details',
                name : 'skill_details',
                type : 'multilist',
                order: 2,
                placeholder : 'C++',
                sub : true,
                subType : 'input'
            }
        ]
    },
    {
        name : 'Awards',
        types : ['multilist'],
        inputs : [
            {
                label : 'Award Name',
                name : 'award_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Super Hacker'
            },
            {
                label : 'Award Date',
                name : 'award_date',
                type: 'multilist',
                order: 2,
                placeholder : 'May 2015'
            },
            {
                label : 'Awarder',
                name : 'awarder',
                type: 'multilist',
                order: 3,
                placeholder : 'HackerNY'
            },
            {
                label : 'Summary',
                name : 'summary',
                type : 'multilist',
                order: 6,
                placeholder : 'Recognized for creating the most awesome project',
                sub : true,
                subType : 'basic-textarea'
            }
        ]
    },
    {
        name : 'Awards (General)',
        types : ['multilist'],
        inputs : [
            {
                label : 'Award Name',
                name : 'award_name',
                type : 'multilist',
                order : 1,
                placeholder : 'Outstanding Performer'
            },
            {
                label : 'Award Description',
                name : 'award_description',
                type : 'multilist',
                order: 6,
                placeholder : 'Describe this award',
                sub : true,
                subType : 'textarea'
            }
        ]
    },
    {
        name : 'Other Information',
        types : ['multilist'],
        inputs : [
            {
                label : 'Section Header',
                name : 'section_header',
                type : 'multilist',
                order : 1,
                placeholder : 'Other Information',
                fullwidth : true
            },
            {
                label : 'Title',
                name : 'title',
                type : 'multilist',
                order : 2,
                placeholder : 'Outstanding Performer'
            },
            {
                label : 'Information Summary',
                name : 'information_summary',
                type : 'multilist',
                order: 6,
                placeholder : 'Summary...',
                sub : true,
                subType : 'textarea'
            }
        ]
    },
    {
        name : 'Awards (HM/Tourism)',
        types : ['multilist'],
        inputs : [
            {
                label : 'Award Name',
                name : 'award_name',
                type : 'multilist',
                order : 1,
                placeholder : 'Outstanding Performer'
            },
            {
                label : 'Award Description',
                name : 'award_description',
                type : 'multilist',
                order: 6,
                placeholder : 'Describe this award',
                sub : true,
                subType : 'textarea'
            }
        ]
    },
    {
        name : 'Projects',
        types : ['multilist'],
        inputs : [
            {
                label : 'Project Name',
                name : 'project_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Piper Chat'
            },
            {
                label : 'Project Description',
                name : 'project_description',
                type: 'multilist',
                order: 2,
                placeholder : 'A video chat app with great picture quality'
            },
            {
                label : 'Link to Project',
                name : 'link_project',
                type: 'multilist',
                order: 3,
                placeholder : 'http://piperchat.com'
            }
        ]
    },
    {
        name : 'Professional Licensure Examination',
        types : ['multilist'],
        inputs : [
            {
                label : 'National Rate',
                name : 'passing_rate',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : '48.03% NATIONAL PASSING RATE'
            },
            {
                label : 'Ratings',
                name : 'ratings',
                type : 'multilist',
                order: 2,
                placeholder : 'TOP NOTCHER (93. 20 % RATINGS)',
                sub : true,
                subType : 'input'
            }
        ]
    },
    {
        name : 'Personal Information',
        types : ['text'],
        inputs : [
            {
                label : 'CS ID No.',
                name : 'cs_id_no',
                type : 'text',
                placeholder : '(to be filled up by CSC)'
            },
            {
                label : 'Surname',
                name : 'pi_surname',
                type : 'text',
                placeholder : 'Dujali'
            },
            {
                label : 'First Name',
                name : 'pi_first_name',
                type : 'text',
                placeholder : 'Nicasio'
            },
            {
                label : 'Middle Name',
                name : 'pi_middle_name',
                type : 'text',
                placeholder : 'Dionela'
            },
            {
                label : 'Name Extension',
                name : 'pi_name_extension',
                type : 'text',
                placeholder : 'Jr.'
            },
            {
                label : 'Date of Birth',
                name : 'pi_date_of_birth',
                type : 'text',
                placeholder : 'mm/dd/yyyy'
            },
            {
                label : 'Place of Birth',
                name : 'pi_place_of_birth',
                type : 'text',
                placeholder : 'Bunawan, Agusan del Sur'
            },
            {
                label : 'Sex',
                name : 'pi_sex',
                type : 'text',
                placeholder : 'Male / Female'
            },
            {
                label : 'Civil Status',
                name : 'pi_civil_status',
                type : 'text',
                placeholder : 'Single / Married / Etc. /Others, specify'
            },
            {
                label : 'Citizenship',
                name : 'pi_citizenship',
                type : 'text',
                placeholder : 'Filipino'
            },
            {
                label : 'Height (m)',
                name : 'pi_height',
                type : 'text',
                placeholder : '1.55 m'
            },
            {
                label : 'Weight (kg)',
                name : 'pi_weight',
                type : 'text',
                placeholder : '56 kg'
            },
            {
                label : 'Blood Type',
                name : 'pi_blood_type',
                type : 'text',
                placeholder : 'A'
            },
            {
                label : 'GSIS ID NO.',
                name : 'pi_gsis_id_no',
                type : 'text',
                placeholder : '81020600292'
            },
            {
                label : 'PAGIBIG ID NO.',
                name : 'pi_pagibig_id_no',
                type : 'text',
                placeholder : '0901-327379-03'
            },
            {
                label : 'PHILHEALTH NO.',
                name : 'pi_philhealth_no',
                type : 'text',
                placeholder : '14-00005-7727-0'
            },
            {
                label : 'SSS NO.',
                name : 'pi_sss_no',
                type : 'text',
                placeholder : '1006285323'
            },
            {
                label : 'Residential Location Information',
                type : 'text',
                labelOnly : true
            },
            {
                label : 'Residential Address',
                name : 'pi_residential_address',
                type : 'text',
                placeholder : 'Blk 8 Lot 2 Villa Hermosa Housing Project',
                fullwidth : true
            },
            {
                label : 'Zip Code',
                name : 'pi_res_zipcode',
                type : 'text',
                placeholder : '7000'
            },
            {
                label : 'Telephone No.',
                name : 'pi_res_telephone_no',
                type : 'text',
                placeholder : 'none'
            },
            {
                label : 'Permanent Location Information',
                type : 'text',
                labelOnly : true
            },
            {
                label : 'Permanent Address',
                name : 'pi_permanent_address',
                type : 'text',
                placeholder : 'Pilot Entrance Road, Purok Santan-B, San Jose Dist., Pagadian City',
                fullwidth : true
            },
            {
                label : 'Zip Code',
                name : 'pi_perm_zipcode',
                type : 'text',
                placeholder : '7016'
            },
            {
                label : 'Telephone No.',
                name : 'pi_perm_telephone_no',
                type : 'text',
                placeholder : 'none'
            },
            {
                label : 'E-mail Address',
                name : 'pi_email_address',
                type : 'text',
                placeholder : 'pinknblu_you@yahoo.com'
            },
            {
                label : 'Cellphone No.',
                name : 'pi_cellphone_no',
                type : 'text',
                placeholder : '0998-2073-416'
            },
            {
                label : 'Agency Employment No.',
                name : 'pi_agency_employment_no',
                type : 'text',
                placeholder : '1030'
            },
            {
                label : 'TIN',
                name : 'pi_tin',
                type : 'text',
                placeholder : '931-371-804'
            }
        ]
    },
    {
        name : 'Family Background I',
        types : ['text'],
        inputs : [
            {
                label : `Spouse's Information`,
                labelOnly : true,
                type: 'text'
            },
            {
                label : 'Surname',
                name : 'spouse_surname',
                type : 'text',
                placeholder : 'Comique'
            },
            {
                label : 'First Name',
                name : 'spouse_first_name',
                type : 'text',
                placeholder : 'Saturnino Jr.'
            },
            {
                label : 'Middle Name',
                name : 'spouse_middle_name',
                type : 'text',
                placeholder : 'Gloria'
            },
            {
                label : 'Occupation',
                name : 'spouse_occupation',
                type : 'text',
                placeholder : 'none'
            },
            {
                label : 'Employer / Bus. Name',
                name : 'spouse_employer',
                type : 'text',
                placeholder : 'n/a'
            },
            {
                label : 'Business Address',
                name : 'spouse_business_address',
                type : 'text',
                placeholder : 'n/a'
            },
            {
                label : 'Telephone No.',
                name : 'spouse_telephone_no',
                type : 'text',
                placeholder : 'n/a'
            },
            {
                label : `Father's Name`,
                labelOnly : true,
                type: 'text'
            },
            {
                label : 'Surname',
                name : 'father_surname',
                type : 'text',
                placeholder : 'Zuasola'
            },
            {
                label : 'First Name',
                name : 'father_firstname',
                type : 'text',
                placeholder : 'Quirino, Sr.'
            },
            {
                label : 'Middle Name',
                name : 'father_middlename',
                type : 'text',
                placeholder : 'none'
            },
            {
                label : `Mother's Maiden Name`,
                labelOnly : true,
                type: 'text'
            },
            {
                label : 'Surname',
                name : 'mother_surname',
                type : 'text',
                placeholder : 'Carreon'
            },
            {
                label : 'First Name',
                name : 'mother_firstname',
                type : 'text',
                placeholder : 'Gloria'
            },
            {
                label : 'Middle Name',
                name : 'mother_middlename',
                type : 'text',
                placeholder : 'Sabate'
            }
        ]
    },
    {
        name : 'Family Background II',
        types : ['multilist'],
        inputs : [
            {
                label : 'Name of Child',
                name : 'child_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : '(Write full name)'
            },
            {
                label : 'Date of Birth',
                name : 'date_of_birth',
                type : 'multilist',
                order : 2,
                placeholder : '(mm/dd/yyyy)'
            }
        ]
    },
    {
        name : 'Educational Background (LGU)',
        types : ['multilist'],
        inputs : [
            {
                label : 'Level',
                name : 'level',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'College / High School / Elementary / Secondary / Etc'
            },
            {
                label : 'Name of School',
                name : 'school_name',
                type: 'multilist',
                order: 2,
                placeholder : '(write in full)',
                fullwidth : true
            },
            {
                label : 'Degree Course',
                name : 'degree_course',
                type: 'multilist',
                order: 3,
                placeholder : '(write in full)',
                fullwidth : true
            },
            {
                label : 'Year Graduated',
                name : 'year_graduated',
                type: 'multilist',
                order: 4,
                placeholder : '(write in full)'
            },
            {
                label : 'Highes Grade Level / Units Earned',
                name : 'highest_grade',
                type: 'multilist',
                order : 5,
                placeholder : '9 Units / Graduated'
            },
            {
                label : 'Inclusive Dates of Attendance',
                type: 'multilist',
                labelOnly : true,
                order : 6
            },
            {
                label : '(From)',
                name : 'educ_lgu_from',
                type: 'multilist',
                order : 7,
                placeholder : '1987'
            },
            {
                label : '(To)',
                name : 'educ_lgu_to',
                type: 'multilist',
                order : 8,
                placeholder : '1993'
            },
            {
                label : 'Scholarship / Academic Honors Received',
                name : 'academic_honors',
                type: 'multilist',
                order : 9,
                placeholder : 'n/a',
                sub : true,
                subType : 'input'
            }
        ]
    },
    {
        name : 'Civil Service Eligibility',
        types : ['multilist'],
        inputs : [
            {
                label : 'CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER SPECIAL LAWS/ CES/ CSEE',
                name : 'career_service',
                type : 'multilist',
                order : 1,
                placeholder : 'Professional Board Examination For Teacher',
                fullwidth : true
            },
            {
                label : 'Rating',
                name : 'rating',
                type: 'multilist',
                order: 2,
                placeholder : '78.35%'
            },
            {
                label : 'DATE OF EXAMINATION / CONFERMENT',
                name : 'date_examination',
                type: 'multilist',
                order: 3,
                placeholder : '22/11/87'
            },
            {
                label : 'PLACE OF EXAMINATION / CONFERMENT',
                name : 'place_examination',
                type: 'multilist',
                order: 4,
                placeholder : 'Zamboanga City',
                fullwidth : true
            },
            {
                label : 'License Number (if applicable)',
                name : 'license_number',
                type: 'multilist',
                order : 5,
                placeholder : 'N/A'
            },
            {
                label : 'Date of Release (if applicable)',
                name : 'date_release',
                type: 'multilist',
                order : 6,
                placeholder : 'mm/dd/yyyy'
            }
        ]
    },
    {
        name : 'Work Experience',
        types : ['multilist'],
        inputs : [
            {
                label : 'Include private. employment. Start from your current work.',
                type : 'multilist',
                labelOnly : true
            },
            {
                label : 'Inclusive Dates (From)',
                name : 'from',
                type: 'multilist',
                order: 1,
                placeholder : '18/03/2016'
            },
            {
                label : 'Inclusive Dates (To)',
                name : 'to',
                type: 'multilist',
                order: 3,
                placeholder : 'To Present'
            },
            {
                label : 'POSITION TITLE (write in full)',
                name : 'position_title',
                type: 'multilist',
                order: 4,
                placeholder : 'Senior Probation Officer II',
                fullwidth : true
            },
            {
                label : 'DEPARTMENT / AGENCY / OFFICE / COMPANY (Write in full)',
                name : 'department',
                type: 'multilist',
                order : 5,
                placeholder : 'Parole and Probation Administration, Region IX',
                fullwidth : true
            },
            {
                label : 'MONTHLY SALARY',
                name : 'monthly_salary',
                type: 'multilist',
                order : 6,
                placeholder : '33,452'
            },
            {
                label : 'SALARY GRADE & STEP INCREMENT (Format "00-0")',
                name : 'salary_grade',
                type: 'multilist',
                order : 7,
                placeholder : '18-1'
            },
            {
                label : 'STATUS OF APPOINTMENT',
                name : 'status_appointment',
                type: 'multilist',
                order : 8,
                placeholder : 'Permanent'
            },
            {
                label : `GOV'T SERVICE (Yes / No)`,
                name : 'government_service',
                type: 'multilist',
                order : 9,
                placeholder : 'Yes'
            }
        ]
    },
    {
        name : 'Voluntary Work or Involvement in Civic / Non-Government / People / Voluntary Organizations',
        types : ['multilist'],
        inputs : [
            {
                label : 'Name & Address of Organization',
                name : 'name_address_organization',
                type: 'multilist',
                order: 1,
                placeholder : 'General Parent Teachers Association / Zamboanga City',
                fullwidth : true
            },
            {
                label : 'Inclusive Dates (From)',
                name : 'from',
                type: 'multilist',
                order: 3,
                placeholder : '03/20/1996'
            },
            {
                label : 'Inclusive Dates (To)',
                name : 'to',
                type: 'multilist',
                order: 3,
                placeholder : '03/20/1998'
            },
            {
                label : 'Number of Hours',
                name : 'number_hours',
                type: 'multilist',
                order: 4,
                placeholder : '4'
            },
            {
                label : 'Position / Nature of Work',
                name : 'nature_work',
                type: 'multilist',
                order : 5,
                placeholder : 'President/Concreting and Fensing of School',
                fullwidth : true
            }
        ]
    },
    {
        name : 'Training Programs',
        types : ['multilist'],
        inputs : [
            {
                label : 'Start from the most recent training',
                type: 'multilist',
                labelOnly : true
            },
            {
                label : 'TITLE OF SEMINAR/CONFERENCE/WORKSHOP/SHORT COURSES (Write in full)',
                name : 'title_seminar',
                type: 'multilist',
                order: 1,
                placeholder : 'Public Safety Basic Recruit Course CL 4-94',
                fullwidth : true
            },
            {
                label : 'Inclusive Dates (From)',
                name : 'training_from',
                type: 'multilist',
                order: 3,
                placeholder : '03/20/1996'
            },
            {
                label : 'Inclusive Dates (To)',
                name : 'training_to',
                type: 'multilist',
                order: 4,
                placeholder : '03/20/1998'
            },
            {
                label : 'Number of Hours',
                name : 'number_hours',
                type: 'multilist',
                order: 4,
                placeholder : '40'
            },
            {
                label : 'CONDUCTED/ SPONSORED BY (Write in full)',
                name : 'conducted',
                type: 'multilist',
                order: 4,
                placeholder : 'PPSC, Jail Service Training Center',
                fullwidth : true
            }
        ]
    },
    {
        name : 'Other Information I',
        types : ['multilist'],
        inputs : [
            {
                label : 'Special Skills / Hobbies',
                name : 'special_skills',
                type: 'multilist',
                order: 1,
                placeholder : 'Typing, Counseling, farming, Speech Writing',
                fullwidth : true
            }
        ]
    },
    {
        name : 'Other Information II',
        types : ['multilist'],
        inputs : [
            {
                label : 'NON-ACADEMIC DISTINCTIONS / RECOGNITION: (Write in full)',
                name : 'recognition',
                type: 'multilist',
                order: 1,
                placeholder : 'Leadership Medal-Phil. Public Safety College (BJMP)',
                fullwidth : true
            }
        ]
    },
    {
        name : 'Other Information III',
        types : ['multilist'],
        inputs : [
            {
                label : 'MEMBERSHIP IN ASSOCIATION/ORGANIZATION (Write in full)',
                name : 'organization',
                type: 'multilist',
                order: 1,
                placeholder : 'Probation & Parole Officers League of the Philippines Incorporated',
                fullwidth : true
            }
        ]
    },
    {
        name : 'Other Information IV',
        types : ['textarea'],
        inputs : [
            {
                label : 'Are you related by consanguinity or affinity to any of the following :',
                labelOnly : true,
                type: 'textarea'
            },
            {
                label : 'a. Within the third degree (for National Government Employees): appointing authority, recommending authority, chief of office/bureau/department or person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed?',
                name : 'question_I',
                type : 'textarea',
                order: 1,
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : 'b. Within the fourth degree (for Local Government Employees): appointing authority or recommending authority where you will be appointed?',
                name : 'question_II',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : 'a. Have you been formally charged?',
                name : 'question_III',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : 'b. Have you ever been guilty of any administrative offense?',
                name : 'question_IV',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : 'Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?',
                name : 'question_V',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : 'Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract, AWOL or phased out, in the public or private sector?',
                name : 'question_VI',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : 'Have you ever been a candidate in a national or local election (except Barangay election)?',
                name : 'question_VII',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, give details'
            },
            {
                label : `Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:`,
                type : 'textarea',
                labelOnly : true
            },
            {
                label : 'a. Are you a member of any indigenous group?',
                name : 'question_VIII',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, please specify'
            },
            {
                label : 'b. Are you differently abled?',
                name : 'question_IX',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, please specify'
            },
            {
                label : 'c. Are you a solo parent?',
                name : 'question_X',
                type : 'textarea',
                placeholder : 'YES / NO / If YES, please specify'
            }
        ]
    },
    {
        name : 'References',
        types : ['multilist'],
        inputs : [
            {
                label : 'Person not related by consanguinity or affinity to applicant / appointee',
                labelOnly : true,
                type : 'multilist'
            },
            {
                label : 'Name',
                name : 'reference_name',
                type: 'multilist',
                order: 2,
                placeholder : 'Director Tarcisia A. Tampos'
            },
            {
                label : 'Address',
                name : 'reference_address',
                type: 'multilist',
                order: 3,
                placeholder : 'Divisoria, Zamboanga City',
                fullwidth : true
            },
            {
                label : 'Telephone No.',
                name : 'reference_telephone',
                type: 'multilist',
                order: 4,
                placeholder : '925-0127',
                fullwidth : true
            }
        ]
    },
    {
        name : 'Education',
        types : ['multilist'],
        inputs : [
            {
                label : 'School Level',
                name : 'level',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'College / High School'
            },
            {
                label : 'School Name',
                name : 'school_name',
                type: 'multilist',
                order: 2,
                placeholder : 'La Salle University'
            },
            {
                label : 'School Location',
                name : 'school_location',
                type: 'multilist',
                order: 2,
                placeholder : 'La Salle St., Ozamiz City'
            },
            {
                label : 'Degree',
                name : 'degree',
                type: 'multilist',
                order: 3,
                placeholder : 'Bachelor of Science / High School'
            },
            {
                label : 'Major',
                name : 'major',
                type: 'multilist',
                order: 4,
                placeholder : 'Computer Science / NA'
            },
            {
                label : 'School Year',
                name : 'school_year',
                type: 'multilist',
                order : 5,
                placeholder : '2013 - 2017'
            },
            {
                label : 'GPA',
                name : 'gpa',
                type: 'multilist',
                order : 6,
                placeholder : '2.75'
            }
        ]
    },
    {
        name : 'Experience',
        types : ['multilist'],
        inputs : [
            {
                label : 'Company Name',
                name : 'company_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Google'
            },
            {
                label : 'Job Title',
                name : 'job_title',
                type: 'multilist',
                order: 2,
                placeholder : 'Software Engineer'
            },
            {
                label : 'Job Location',
                name : 'job_location',
                type: 'multilist',
                order: 3,
                placeholder : 'Mountain View, CA'
            },
            {
                label : 'Start Date',
                name : 'start_date',
                type: 'multilist',
                order: 4,
                placeholder : 'May 2015'
            },
            {
                label : 'End Date',
                name : 'end_date',
                type: 'multilist',
                order : 5,
                placeholder : 'May 2017 / Present / Etc'
            }
        ]
    },
    {
        name : 'Trainings',
        types : ['multilist'],
        inputs : [
            {
                label : 'Training Title',
                name : 'training_title',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Soldier in Training'
            },
            {
                label : 'Location',
                name : 'location',
                type: 'multilist',
                order: 3,
                placeholder : 'Mountain View, CA'
            },
            {
                label : 'Start Date',
                name : 'start_date',
                type: 'multilist',
                order: 4,
                placeholder : 'May 2015'
            },
            {
                label : 'End Date',
                name : 'end_date',
                type: 'multilist',
                order : 5,
                placeholder : 'May 2017 / Present / Etc'
            }
        ]
    },
    {
        name : 'Skills & Abilities',
        types : ['multilist'],
        inputs : [
            {
                label : 'Skill Name',
                name : 'skill_name',
                type : 'multilist',
                main : true,
                order : 1,
                placeholder : 'Programming Languages'
            },
            {
                label : 'Skill Details',
                name : 'skill_details',
                type : 'multilist',
                order: 2,
                placeholder : 'C++',
                sub : true,
                subType : 'input'
            }
        ]
    }
]

export default FORMS