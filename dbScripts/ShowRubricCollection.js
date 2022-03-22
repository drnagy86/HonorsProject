
db = connect( "mongodb://localhost/rubricDB")
 
// ObjectId("622a47a1c561dd12ae155afc")
db.rubrics.insertOne({
    name: 'Writing Rubric',
    description: 'A rubric to help with ESL learning.',
    rubricCreator: 'Derrick'
},{
    subject_id : 'ESL'
})

//ObjectId("622a47dcc561dd12ae155afd")
db.rubrics.insertOne({
    name: 'K-Reading Rubric',
    description: 'Evaluate a student\'s beginning reading skills.',
    rubricCreator: 'Derrick'
},{
    subject_id : 'Reading'
})

// ObjectId("622a4a5cc561dd12ae155afe")
db.rubrics.insertOne({
    name: 'K-Reading Rubric',
    description: 'Evaluate a student\'s beginning reading skills.',
    rubricCreator: 'Derrick'
},{
    subject_id : 'Reading'
},{
    subject_id : 'Writing'
})


// ObjectId("622a53060fef6ce95c73cb0b")
db.rubrics.insertOne({
    name: 'Add Subject Test',
    description: 'Evaluate a student\'s beginning reading skills.',
    rubricCreator: 'D',
    subjects: {
        subject_id : 'Reading'
    }
})

// ObjectId("622a60250fef6ce95c73cb0c")
db.rubrics.insertOne({
    name: 'Test with multiple subjects',
    description: 'Test description.',
    rubricCreator: 'D',
    subjects: [{
        subject_id : 'Reading'
    }, {
        subject_id : 'Writing'
    }]
})

//ObjectId("622a65c80fef6ce95c73cb0d")
db.rubrics.insertOne({
    name: '2 - Test with multiple subjects',
    description: 'Test description.',
    rubricCreator: 'D',
    subjects: [{
        subject_id : 'reading'
    }, {
        subject_id : 'writing'
    }]
})

printjson(db.rubrics.find({}));