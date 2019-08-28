BEGIN;

INSERT INTO bookmarks (name, description, url, rating)
VALUES
('Youtube', 'a website for watching videos', 'http://www.youtube.com', 4),
('Google', 'the best search engine around', 'http://www.google.com', 5),
('Reddit', 'the front page of the internet', 'http://www.reddit.com', 1),
('Your homepage', 'a website', 'http://www.yoursite.com', 3);

COMMIT;