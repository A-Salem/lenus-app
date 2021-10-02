const expect = require('chai').expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

describe('GraphQL', () => {

    it('Returns all English meals', (done) => {
      request.post('/graphql')
      .send({
        query: `{
          meal(locale:"en-US"){
            id, locale, name, procedure_text, coach_owned, created_at
          }
        }`
      })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);

          for (const meal of res.body.data.meal) {
            expect(meal).to.have.property('id');
            expect(meal).to.have.property('locale');
            expect(meal.locale).to.equal('en-US');
            expect(meal).to.have.property('name');
            expect(meal).to.have.property('procedure_text');
            expect(meal).to.have.property('coach_owned');
            expect(meal).to.have.property('created_at');
          }

          done();
      });
    });

    it('Returns all Danish meals', (done) => {
      request.post('/graphql')
      .send({
        query: `{
          meal(locale: "da-DK") {
            id, locale, name, procedure_text, coach_owned, created_at
          }
        }`
      })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);

          for (const meal of res.body.data.meal) {
            expect(meal).to.have.property('id');
            expect(meal).to.have.property('locale');
            expect(meal.locale).to.equal('da-DK');
            expect(meal).to.have.property('name');
            expect(meal).to.have.property('procedure_text');
            expect(meal).to.have.property('coach_owned');
            expect(meal).to.have.property('created_at');
          }

          done();
      });
    });

    it('Returns all coach owned meals', (done) => {
      request.post('/graphql')
        .send({
          query: `{
          meal(coach_owned: true) {
            id, locale, name, procedure_text, coach_owned, created_at
          }
        }`
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          for (const meal of res.body.data.meal) {
            expect(meal).to.have.property('id');
            expect(meal).to.have.property('locale');
            expect(meal).to.have.property('name');
            expect(meal).to.have.property('procedure_text');
            expect(meal).to.have.property('coach_owned');
            expect(meal.coach_owned).to.equal(true);
            expect(meal).to.have.property('created_at');
          }

          done();
        });
    });

    it('Returns all not coach owned meals', (done) => {
      request.post('/graphql')
      .send({
        query: `{
          meal(coach_owned: false) {
            id, locale, name, procedure_text, coach_owned, created_at
          }
        }`
      })
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);

          for (const meal of res.body.data.meal) {
            expect(meal).to.have.property('id');
            expect(meal).to.have.property('locale');
            expect(meal).to.have.property('name');
            expect(meal).to.have.property('procedure_text');
            expect(meal).to.have.property('coach_owned');
            expect(meal.coach_owned).to.equal(false);
            expect(meal).to.have.property('created_at');
          }

          done();
      });
    });

});