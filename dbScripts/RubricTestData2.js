
db = connect( "mongodb://localhost/rubricDB")
 
db.dropDatabase()

db.users.insertOne(
	// {
	// 	_id : ObjectId("62337982dd76768c63cb9474"),
	// 	email : 'derrick@company.com',
	// 	givenName : 'Derrick',
	// 	familyName : 'Nagy',
	// 	salt : 'b847ed51bd76f617ccefa3cad03072d6',
	// 	hash : '8847edc1b1b9b1cff9d6fc417588a3f6fac497b3bbb7584b6f137d1591a10f5221037ea4d585896e9b57c22ebb09cba2368a73e78f99a355194bee1c4e9605b9'
	// }

	{
		_id: ObjectId("6273ffe205bbe590d98c707b"),
		active: true,
		givenName: 'Tess',
		familyName: 'Data',
		email: 'test@company.com',
		salt: '2d41854e75be01eb7ba68483458de7c3',
		hash: '581fd931de88a54bd907e0ab1d7d1e301903c9175edb29cc96db6caa4d4fab73d6413ac8cc1d670ebcb3f9f66fb8f39080a851d0e6df9c71d6149ed49d019658',
		__v: 0
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
				_id : ObjectId("626eba698de867957b332b2b"),
				name : 'Perspective',
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
				_id : ObjectId("626eba698de867957b332b2c"),
				name : 'Empathy',
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
				_id : ObjectId("626eba698de867957b332b2d"),
				name : 'Reveal self knowledge',
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
				_id : ObjectId("626eba698de867957b332b2e"),
				name : 'Explanation',
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
//
// db.rubrics.insertOne(
// 	{
// 		_id : ObjectId("62337ac5a88faab14cda6c87"),
// 		name : 'General Speaking Evaluation Rubric',
// 		description : 'Evaluate a student\'s speaking skills.',
// 		rubricCreator : "test@company.com",
// 		active : true,
// 		subjects : [
// 			{
// 				subject_id : "ESL",
// 				description : "English as a Second Language",
// 				criteria : [
// 					{
//
// 					}
// 				]
// 			},
// 			{
// 				subject_id : 'Speaking',
// 				description : 'The subject covers speaking skills',
// 			}
// 		],
// 		facets : [
// 			{
// 				_id : ObjectId("626eba698de867957b332b2f"),
// 				name : 'Accuracy',
// 				description : 'Grammatical correctness appropriate for level',
// 				criteria: [
// 					{
// 						_id: ObjectId("6239fc3405a0581f567ed78a"),
// 						content: 'Student shows above average grammatical correctness for their level. Very few mistakes, easy to understand. Natural',
// 						score: 3
// 					},
// 					{
// 						_id: ObjectId("6239fc3405a0581f567ed78b"),
// 						content: 'Student shows average grammatical correctness for their level. Some mistakes but generally able to understand.',
// 						score: 2
// 					},
// 					{
// 						_id: ObjectId("6239fc3405a0581f567ed78c"),
// 						content: 'Student shows below average grammatical correctness for their level. Errors lead to issues with communication.',
// 						score: 1
// 					}
// 				]
// 			},
// 			{
// 				_id : ObjectId("626eba698de867957b332b30"),
// 				name : 'Speaking',
// 				description : 'Fluent and correct pronunciation',
// 				criteria:
// 					[
// 						{
// 							_id: ObjectId("6239fc3405a0581f567ed78d"),
// 							content: 'Student shows above average fluency for their level. Very few mistakes, easy to understand. Natural',
// 							score: 3
// 						},
// 						{
// 							_id: ObjectId("6239fc3405a0581f567ed78e"),
// 							content: 'Student shows average fluency for their level. Some mistakes but generally able to understand.',
// 							score: 2
// 						},
// 						{
// 							_id: ObjectId("6239fc3405a0581f567ed78f"),
// 							content: 'Student shows below average fluency for their level. Errors lead to issues with communication.',
// 							score: 1
// 						}
// 					]
// 			},
// 			{
// 				_id : ObjectId("626eba698de867957b332b31"),
// 				name : 'Vocabulary',
// 				description : 'Lexical resource variety and correctness',
// 				criteria:
// 					[
// 						{
// 							_id: ObjectId("6239fc3405a0581f567ed79a"),
// 							content: 'Student shows above average lexical resource for their level. Lots of variety. Natural',
// 							score: 3
// 						},
// 						{
// 							_id: ObjectId("6239fc3405a0581f567ed79b"),
// 							content: 'Student shows average lexical resource for their level. Some mistakes but generally able to be understood.',
// 							score: 2
// 						},
// 						{
// 							_id: ObjectId("6239fc3405a0581f567ed79c"),
// 							content: 'Student shows below average lexical resource for their level. Errors lead to issues with communication.',
// 							score: 1
// 						}
// 					]
// 			}
// 		]
// 	}
// )


printjson(db.users.find({}));
printjson(db.rubrics.find({}));