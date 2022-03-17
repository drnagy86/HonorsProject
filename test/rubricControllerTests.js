const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = require('../app');

let Rubric = require('../app_api/models/rubrics');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
// used this resource
// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai


// parent block
describe('Rubrics', () => {



    // beforeEach((done) => { //Before each test, empty the database
    //     Rubric.remove({},(err) => {
    //         done();
    //     });
    // });

    describe('/GET rubric', () => {
        it('it should GET all rubrics', done => {
            chai.request(server)
                .get('/rubrics')
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST rubric', () => {
        it('should not Post a rubric without a name', function () {
            let rubric = {
                name : "",
                description : "description",
                rubricCreator : "creator"
            }
            chai.request(server)
                .post('/rubric')
                .send(rubric)
                .end((err, res) => {
                    res.should.have.status(404);
                });

        });

        it('should POST a rubric', (done => {
            let rubric = {
                name : "rubric name",
                description : "description",
                rubricCreator : "creator"
            }
            chai.request(server)
                .post('/rubrics')
                .send(rubric)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.rubric.should.have.property('rubric name');
                    res.body.rubric.should.have.property('description');
                    res.body.rubric.should.have.property('creator');

                });
        }));
    });
    // test /GET/:id route
    // describe('/GET/:id rubric', () => {
    //     it('should GET a rubric by id', (done) => {
    //         let rubric = {
    //             name : "rubric name",
    //             description : "description",
    //             rubricCreator : "creator"
    //         };
    //         rubric.save((err, rubric) => {
    //             chai.request(server)
    //                 .get('/rubrics/' + rubric.id)
    //                 .send(rubric)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.rubric.should.have.property('rubric name');
    //                     res.body.rubric.should.have.property('description');
    //                     res.body.rubric.should.have.property('creator');
    //                     res.body.rubric.should.have.property('_id').eql(rubric.id);
    //                    done();
    //                 });
    //         })
    //     });
    // })




});


// test to see if this works
// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });

