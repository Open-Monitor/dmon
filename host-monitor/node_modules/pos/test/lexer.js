var should = require('should');
var lexer = new (require('../lexer'))();

describe('Lexer#lex', function(){
  it('should tokenize dollar sign', function(){
    lexer
      .lex("I made $5.42 today.")
      .should.eql(['I', 'made', '$', '5.42', 'today', '.']);
  });

  it('should tokenize dollar sign when not followed by a number', function(){
    lexer
      .lex("I made $some today.")
      .should.eql(['I', 'made', '$', 'some', 'today', '.']);
  });

  it('should tokenize parentheses', function(){
    lexer
      .lex("I made $5.42 today (but it should have been more).")
      .should.eql(['I', 'made', '$', '5.42', 'today', '(', 'but', 'it', 'should', 'have', 'been', 'more', ')', '.']);
  });

  it('should tokenize hash', function(){
    lexer
      .lex("I'm fixing issue #6.")
      .should.eql(['I', '\'', 'm', 'fixing', 'issue', '#', '6', '.']);
  });

  it('should tokenize hash when not followed by a number', function(){
    lexer
      .lex("I'm fixing issue #tags.")
      .should.eql(['I', '\'', 'm', 'fixing', 'issue', '#', 'tags', '.']);
  });

  it('should tokenize times such as "10:00am".', function() {
    lexer.lex("It is now 10:00am").should.eql([
      "It", "is", "now", "10:00am"
    ]);
    lexer.lex("It is now 10:00 am").should.eql([
      "It", "is", "now", "10:00 am"
    ]);
    lexer.lex("It is now 10:00pm").should.eql([
      "It", "is", "now", "10:00pm"
    ]);
    lexer.lex("It is now 10:00 pm").should.eql([
      "It", "is", "now", "10:00 pm"
    ]);
    lexer.lex("It is now 10:00AM").should.eql([
      "It", "is", "now", "10:00AM"
    ]);
    lexer.lex("It is now 10:00PM").should.eql([
      "It", "is", "now", "10:00PM"
    ]);
  });

  it('should tokenize but keep email, ids, and urls in tact', function(){
    lexer
      .lex("my email is me@exampleabc.com, http://example.com and 19bdnznUXdHEOlp0Pnp9JY0rug6VuA2R3zK4AACdFzhE")
      .should.eql(['my','email','is','me@exampleabc.com', ',', 'http://example.com', 'and', '19bdnznUXdHEOlp0Pnp9JY0rug6VuA2R3zK4AACdFzhE']);

    lexer
      .lex("my share url is https://docs.google.com/spreadsheets/d/19bdnznUXdHEOlp0Pnp9JY0rug6VuA2R3zK4AACdFzhE/edit?usp=sharing")
      .should.eql(['my','share','url', 'is', 'https://docs.google.com/spreadsheets/d/19bdnznUXdHEOlp0Pnp9JY0rug6VuA2R3zK4AACdFzhE/edit?usp=sharing']);

  });
});
