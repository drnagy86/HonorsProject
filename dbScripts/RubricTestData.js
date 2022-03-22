
db = connect( "mongodb://localhost/rubricDB")
 
db.dropDatabase()

db.users.insertOne(
{
	email: 'test@company.com',
	givenName : 'Tess',
	familyName : 'Data',
    salt: 'b847ed51bd76f617ccefa3cad03072d6',
    hash: '8847edc1b1b9b1cff9d6fc417588a3f6fac497b3bbb7584b6f137d1591a10f5221037ea4d585896e9b57c22ebb09cba2368a73e78f99a355194bee1c4e9605b9'
}
)


db.subjects.insertOne(
{
	subject_id : 'ESL',
	description : 'English as a Second Language'
}
)

db.subjects.insertOne(
{
	subject_id : 'Writing',
	description : 'The subject is writing'
}
)


db.rubrics.insertOne(
{
    name: 'Writing Rubric',
    description: 'A rubric to evaluate writing.',
    rubricCreator: 'Derrick',
	subjects : 
	[
		{
			subject_id : 'ESL',
			description : 'English as a Second Language'
		}
		,
		{
			subject_id : 'Writing',
			description : 'The subject is writing'
		}
	],
	facets : 
	[
		{
			_id : 'Explanation',
			description : 'The big idea in own words, shows work, explains reasoning, makes a theory'
		}
		,
		{
			_id : 'Interpretation',
			description : 'Makes sense of topic'
		}
		,
		{
			_id : 'Application',
			description : 'Understands who to authentically use knowledge and skills in new situations'
		}
		,
		{
			_id : 'Perspective',
			description : 'Sees things from a different point of view or underlying assumption, takes a stance'
		}
		,
		{
			_id : 'Empathy',
			description : 'Understands diversity of thought, feels for others'
		}
		,
		{
			_id : 'Self-Knowledge',
			description : 'Self-assesses past and present work'
		}
	]
	
}
)

db.rubrics.insertOne(
{
    name: 'K-Reading Rubric',
    description: 'Evaluate a student\'s beginning reading skills.',
    rubricCreator: 'Derrick',
	subjects : 
	[
		{
			subject_id : 'Reading',
			description : 'The subject is reading'
		}
		,
		{
			subject_id : 'Reading Fluency',
			description : 'The rubric subject is reading fluency'
		}
	]
}
)

db.rubrics.insertOne(
{
    name: 'General Speaking Evaluation Rubric',
    description: 'Evaluate a student\'s speaking skills.',
    rubricCreator: 'Derrick',
	subjects : 
	[
		{
			subject_id : 'Speaking',
			description : 'The subject covers speaking skills'
		}
		,
		{
			subject_id : 'ESL',
			description : 'English as a Second Language'
		}
	],
	facets : 
	[
		{
			_id : 'Accuracy',
			description : 'Grammatical correctness appropriate for level'
		}
		,
		{
			_id : 'Speaking',
			description : 'Fluent and correct pronunciation'
		}
		,
		{
			_id : 'Vocabulary',
			description : 'Lexical resource variety and correctness'
		}
	]
}
)

printjson(db.rubrics.find({}));