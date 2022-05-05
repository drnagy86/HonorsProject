db = connect("mongodb://localhost/rubricDB")

// db.dropDatabase()

// db.users.insertOne(
// 	{
// 		_id : ObjectId("62337982dd76768c63cb9474"),
// 		email : 'derrick@company.com',
// 		givenName : 'Derrick',
// 		familyName : 'Nagy',
// 		salt : 'b847ed51bd76f617ccefa3cad03072d6',
// 		hash : '8847edc1b1b9b1cff9d6fc417588a3f6fac497b3bbb7584b6f137d1591a10f5221037ea4d585896e9b57c22ebb09cba2368a73e78f99a355194bee1c4e9605b9'
// 	}
// )

db.rubrics.insertOne(
    {
        name: 'Writing Rubric',
        description: 'A rubric to evaluate writing.',
        rubricCreator: "test@company.com",
        active: true,
        subjects: [
            {
                subject_id: "ESL",
                description: "English as a Second Language",
            },
            {
                subject_id: "Writing",
                description: "The subject is writing",
            }
        ],
        facets: [
            {
                name: 'Perspective',
                description: 'See things from a different point of view, underlying assumptions, take a stance',
                criteria: [
                    {
                        content: 'Student shows excellent perspective about this area of knowledge',
                        score: 4
                    },
                    {
                        content: 'Student shows above average perspective about this area of knowledge',
                        score: 3
                    },
                    {
                        content: 'Student shows some perspective about this area of knowledge but not more than what is considered typical',
                        score: 2
                    },
                    {
                        content: 'Student shows little perspective about this area of knowledge or has many misunderstandings.',
                        score: 1
                    },
                ]
            },
            {
                name: 'Empathy',
                description: 'Help students understand diversity of thought, feel for others',
                criteria: [
                    {
                        content: 'Student shows excellent empathy about this area of knowledge',
                        score: 4
                    },
                    {
                        content: 'Student shows above average empathy about this area of knowledge',
                        score: 3
                    },
                    {
                        content: 'Student shows some empathy about this area of knowledge but not more than what is considered typical',
                        score: 2
                    },
                    {
                        content: 'Student shows little empathy about this area of knowledge or has many misunderstandings.',
                        score: 1
                    },
                ]
            },
            {
                name: 'Reveal self knowledge',
                description: 'Self-assess past and present work',
                criteria: [
                    {
                        content: 'Student shows excellent self knowledge about this area of knowledge ',
                        score: 4
                    },
                    {
                        content: 'Student shows above average self knowledge about this area of knowledge',
                        score: 3
                    },
                    {
                        content: 'Student shows some self knowledge about this area of knowledge but not more than what is considered typical',
                        score: 2
                    },
                    {
                        content: 'Student reveals little self knowledge about this area of knowledge or has many misunderstandings.',
                        score: 1
                    },
                ]
            },
            {
                name: 'Explanation',
                description: 'The big idea in their own words, show work, explain reasoning, make a theory',
                criteria: [
                    {
                        content: 'Student gives an excellent explanation about this area of knowledge ',
                        score: 4
                    },
                    {
                        content: 'Student shows above average knowledge about the subject',
                        score: 3
                    },
                    {
                        content: 'Student gives some explanation about this area of knowledge but not more than what is considered typical',
                        score: 2
                    },
                    {
                        content: 'Student shows little knowledge or has many misunderstandings.',
                        score: 1
                    },
                ]
            },
        ]
    }
)

db.rubrics.insertOne(
    {
        name: 'General Speaking Evaluation Rubric',
        description: 'Evaluate a student\'s speaking skills.',
        rubricCreator: "test@company.com",
        active: true,
        subjects: [
            {
                subject_id: "ESL",
                description: "English as a Second Language"
            },
            {
                subject_id: 'Speaking',
                description: 'The subject covers speaking skills'
            }
        ],
        facets: [
            {
                name: 'Accuracy',
                description: 'Grammatical correctness appropriate for level',
                criteria: [
                    {
                        content: 'Student shows above average grammatical correctness for their level. Very few mistakes, easy to understand. Natural',
                        score: 3
                    },
                    {
                        content: 'Student shows average grammatical correctness for their level. Some mistakes but generally able to understand.',
                        score: 2
                    },
                    {
                        content: 'Student shows below average grammatical correctness for their level. Errors lead to issues with communication.',
                        score: 1
                    }
                ]
            },
            {
                name: 'Speaking',
                description: 'Fluent and correct pronunciation',
                criteria:
                    [
                        {
                            content: 'Student shows above average fluency for their level. Very few mistakes, easy to understand. Natural',
                            score: 3
                        },
                        {
                            content: 'Student shows average fluency for their level. Some mistakes but generally able to understand.',
                            score: 2
                        },
                        {
                            content: 'Student shows below average fluency for their level. Errors lead to issues with communication.',
                            score: 1
                        }
                    ]
            },
            {
                name: 'Vocabulary',
                description: 'Lexical resource variety and correctness',
                criteria:
                    [
                        {
                            content: 'Student shows above average lexical resource for their level. Lots of variety. Natural',
                            score: 3
                        },
                        {
                            content: 'Student shows average lexical resource for their level. Some mistakes but generally able to be understood.',
                            score: 2
                        },
                        {
                            content: 'Student shows below average lexical resource for their level. Errors lead to issues with communication.',
                            score: 1
                        }
                    ]
            }
        ]
    }
)


printjson(db.users.find({}));
printjson(db.rubrics.find({}));