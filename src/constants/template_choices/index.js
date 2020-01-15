const CHOICES = {
    DEFAULT : 'LGU',
    LGU : [
        {
            name : 'Local Government Unit (LGU)',
            to : 'Local Government Unit (LGU)'
        },
        {
            name : 'Non-LGU Templates',
            to : 'NON_LGU'
        }
    ],
    NON_LGU : [
        {
            name : 'General Templates',
            to : 'General'
        },
        {
            name : 'Academic/Health Templates',
            to : 'Academic/Health'
        },
        // {
        //     name : 'Academic (Public School) Templates',
        //     to : 'Academic (Public School)'
        // },
        {
            name : 'Business Templates',
            to : 'Business'
        },
        // {
        //     name : 'Health Templates',
        //     to : 'Health'
        // },
        {
            name : 'IT/CS Templates',
            to : 'IT/CS'
        },
        {
            name : 'HM/Tourism Templates',
            to : 'HM/Tourism'
        },
        // {
        //     name : 'Psychology Templates',
        //     to : 'Psychology'
        // }
    ]
}

export default CHOICES