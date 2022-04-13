
db = connect( "mongodb://localhost/rubricDB")
 
// db.dropDatabase()

db.users.insertOne(
	{
		_id : ObjectId("62337982dd76768c63cb9474"),
		email : 'test@company.com',
		givenName : 'Tess',
		familyName : 'Data',
		salt : 'b847ed51bd76f617ccefa3cad03072d6',
		hash : '8847edc1b1b9b1cff9d6fc417588a3f6fac497b3bbb7584b6f137d1591a10f5221037ea4d585896e9b57c22ebb09cba2368a73e78f99a355194bee1c4e9605b9'
	}
)

db.rubrics.insertOne(
	{
		_id : ObjectId("623378f7c6240ef7cb5882c6"),
		name : 'Writing Rubric',
		description : 'A rubric to evaluate writing.',
		rubricCreator : "test@company.com",
		active : true,
		subjects : [
			{
				subject_id : "ESL",
				description : "English as a Second Language",
			},
			{
				subject_id : "Writing",
				description : "The subject is writing",
			}
		],
		facets : [
			{
				_id : 'Perspective',
				description : 'See things from a different point of view, underlying assumptions, take a stance',
				criteria : [
					{
						_id : ObjectId("6239fc3405a0581f567ed76c"),
						content : 'Student shows excellent perspective about this area of knowledge',
						score: 4
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed76d"),
						content : 'Student shows above average perspective about this area of knowledge',
						score: 3
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed76e"),
						content : 'Student shows some perspective about this area of knowledge but not more than what is considered typical',
						score: 2
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed76f"),
						content : 'Student shows little perspective about this area of knowledge or has many misunderstandings.',
						score: 1
					},
				]
			},
			{
				_id : 'Empathy',
				description : 'Help students understand diversity of thought, feel for others',
				criteria : [
					{
						_id : ObjectId("6239fc3405a0581f567ed770"),
						content : 'Student shows excellent empathy about this area of knowledge',
						score: 4
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed771"),
						content : 'Student shows above average empathy about this area of knowledge',
						score: 3
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed772"),
						content : 'Student shows some empathy about this area of knowledge but not more than what is considered typical',
						score: 2
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed773"),
						content : 'Student shows little empathy about this area of knowledge or has many misunderstandings.',
						score: 1
					},
				]
			},
			{
				_id : 'Reveal self knowledge',
				description : 'Self-assess past and present work',
				criteria : [
					{
						_id : ObjectId("6239fc3405a0581f567ed774"),
						content : 'Student shows excellent self knowledge about this area of knowledge ',
						score: 4
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed775"),
						content : 'Student shows above average self knowledge about this area of knowledge',
						score: 3
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed776"),
						content : 'Student shows some self knowledge about this area of knowledge but not more than what is considered typical',
						score: 2
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed777"),
						content : 'Student reveals little self knowledge about this area of knowledge or has many misunderstandings.',
						score: 1
					},
				]
			},
			{
				_id : 'Explanation',
				description : 'The big idea in their own words, show work, explain reasoning, make a theory',
				criteria : [
					{
						_id : ObjectId("6239fc3405a0581f567ed77c"),
						content : 'Student gives an excellent explanation about this area of knowledge ',
						score: 4
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed77d"),
						content : 'Student shows above average knowledge about the subject',
						score: 3
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed77e"),
						content : 'Student gives some explanation about this area of knowledge but not more than what is considered typical',
						score: 2
					},
					{
						_id : ObjectId("6239fc3405a0581f567ed77f"),
						content : 'Student shows little knowledge or has many misunderstandings.',
						score: 1
					},
				]
			},
		]
	}
)

db.rubrics.insertOne(
	{
		_id : ObjectId("62337ac5a88faab14cda6c87"),
		name : 'General Speaking Evaluation Rubric',
		description : 'Evaluate a student\'s speaking skills.',
		rubricCreator : "test@company.com",
		active : true,
		subjects : [
			{
				subject_id : "ESL",
				description : "English as a Second Language",
			},
			{
				subject_id : 'Speaking',
				description : 'The subject covers speaking skills',
			}
		],
		facets : [
			{
				_id : 'Accuracy',
				description : 'Grammatical correctness appropriate for level'
			},
			{
				_id : 'Speaking',
				description : 'Fluent and correct pronunciation'
			},
			{
				_id : 'Vocabulary',
				description : 'Lexical resource variety and correctness'
			}
		]
	}
)


printjson(db.users.find({}));
printjson(db.rubrics.find({}));