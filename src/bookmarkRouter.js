'use strict';
const express = require('express');

const bookmarkRouter = express.Router();
const bodyParser = express.json();
const BookmarksService = require('./BookmarksService');

bookmarkRouter
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db');
    return BookmarksService.getAllBookmarks(db)
      .then(bookmarks => res.json(bookmarks))
      .catch(next);
  });

bookmarkRouter
  .route('/:id')
  .get((req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    return BookmarksService.getBookmarkById(db, id)
      .then(bookmarks => res.json(bookmarks))
      .catch(next);
  });

bookmarkRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    const db = req.app.get('db');    
    const { name, description, url, rating=1 } = req.body;
    
    if(!name) {
      return res
        .status(400)
        .json({error: {message: 'Title is required'}});
    }

    if(!url) {
      return res
        .status(400)
        .json({error: {message: 'URL is required'}});
    }

    if(!url.includes('http://')) {
      return res
        .status(400)
        .json({error: {message: 'URL must contain http://'}});
    }

    const newBookmark = { 
      name,
      description,
      url,
      rating
    };

    return BookmarksService.postNewBookmark(db, newBookmark)
      .then(bookmark => res.json(bookmark))
      .catch(next);


  });

bookmarkRouter
  .route('/:id')
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    return BookmarksService.deleteBookmarkById(db, id)
      .then(response => res.json(response));

  });

module.exports = bookmarkRouter;