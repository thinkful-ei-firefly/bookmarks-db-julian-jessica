require('dotenv').config()
const knex = require('knex')
const bookmarksService = require('../src/BookmarksService')
const testData = require('./testData')
const app = require('../src/app')

describe('Bookmarks services', () => {

  let db

  before('establishing db link' , () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect form db' , () => db.destroy())

  afterEach('cleanup', () => db('bookmarks').truncate())

  beforeEach('seed db', () => {
    return db
      .into('bookmarks')
      .insert(testData)
  })


  describe('get all bookmarks', () => {
    it('returns an array', () => {
      return bookmarksService.getAllBookmarks(db)
      .then(bookmarks => {
        expect(bookmarks).to.be.an('array') 
      })
    })
  })

  describe('get bookmark by ID', () => {
    it('should return an array containing one item' , () => {
      return bookmarksService.getBookmarkById(db, 2)
      .then(bookmarks => {
        expect(bookmarks.length).to.eql(1)
      })
    })
  })

  describe('posts a new bookmark', () => {
    it('should insert a new bookmark', () => {
      const obj = {name: 'x', url: 'www', description: 'y', rating: 1};
      return bookmarksService.postNewBookmark(db, obj)
      .then(bookmarks => {
        expect(bookmarks[0]).to.have.all.keys('id','name','url','description','rating')
      })
    })
  })

  describe('delete bookmarks by ID', () => {
    it('should delete the bookmark with this ID', () => {
      const id = 1;
      let expected;

      bookmarksService.getAllBookmarks(db)
        .then(res => {
          expected = res.filter(item => item.id !== id);
        });

        return bookmarksService.deleteBookmarkById(db, id)
        .then(() => bookmarksService.getAllBookmarks(db))
        .then(allItems => {
          expect(allItems).to.eql(expected)      
        })
      })
    })
  
})







