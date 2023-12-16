const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'v95292xy_pubg',
    password: 'pubg-TMT-dev-12',
    database: 'v95292xy_pubg'
});

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('db connection!')
    }
})

app.listen(3306, () => console.log(`server started in port 3306`));

app.get('/api', (req, res) => {
    res.send('server work');
});

// client - 3000, backend - 8000

let dbDataTour
db.query("SELECT * FROM tournaments", (err, result, field) => {
    dbDataTour = result;
});
app.get('/tour/', (req, res) => {
    res.send(dbDataTour);
})

let dbDataTourId
db.query("SELECT * FROM tournaments WHERE `tournaments`.`id` = 1", (err, result, field) => {
    dbDataTourId = result;
});
app.get('/tour/:id', (req, res) => {
    res.send(dbDataTourId);
})

let dbDataNews;
db.query("SELECT * FROM news", (err, result, field) => {
    dbDataNews = result;
});
app.get('/news', (req, res) => {
    res.send(dbDataNews);
})

let dbDataScam;
db.query("SELECT * FROM scam", (err, result, field) => {
    dbDataScam = result;
});
app.get('/scam', (req, res) => {
    res.send(dbDataScam);
})

let dbDataRating;
db.query("SELECT * FROM rating", (err, result, field) => {
    dbDataRating = result;
});
app.get('/rating', (req, res) => {
    res.send(dbDataRating);
})

app.post('/tour', (req, res) => {
    let data = [req.body.id, req.body.nameTourAdd, req.body.nameOrgAdd, req.body.teamsAdd, req.body.prizepoolAdd, req.body.guaranteeAdd, req.body.openRegAdd, req.body.linkAdd, req.body.imageAdd, req.body.currencyAdd, req.body.inviteAdd, req.body.regionCISAdd, req.body.regionEUAdd, req.body.closeRegAdd]
    db.query('INSERT INTO `tournaments` (`id`, `name`, `org-name`, `teams`, `prizepool`, `guarantee`, `openReg`, `link`, `image`, `currency`, `invite`, `regionCis`, `regionEu`, `closeReg`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    });
})

app.post('/tourdel', (req, res) => {
    let delId = [req.body.delId]
    db.query('DELETE FROM tournaments WHERE `tournaments`.`id` = ?', delId, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    })
});

app.post('/news', (req, res) => {
    let data = [req.body.id, req.body.titleAdd, req.body.descriptionAdd, req.body.newsUrlAdd, req.body.imageAdd]
    db.query('INSERT INTO `news` (`id`, `title`, `description`, `newsUrl`, `image`) VALUES (?, ?, ?, ?, ?)', data, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    });
})

app.post('/newsdel', (req, res) => {
    let delId = [req.body.delId]
    db.query('DELETE FROM news WHERE `news`.`id` = ?', delId, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    })
});

app.post('/scam', (req, res) => {
    let data = [req.body.id, req.body.nameOrgAdd, req.body.linkAdd, req.body.imageAdd]
    db.query('INSERT INTO `scam` (`id`, `nameOrg`, `link`, `image`) VALUES (?, ?, ?, ?)', data, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    });
})

app.post('/scamdel', (req, res) => {
    let delId = [req.body.delId]
    db.query('DELETE FROM scam WHERE `scam`.`id` = ?', delId, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    })
});

app.post('/ratingdel', (req, res) => {
    let delId = [req.body.delId]
    db.query('DELETE FROM rating WHERE `rating`.`id` = ?', delId, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    })
});

app.post('/rating', (req, res) => {
    let data = [req.body.nameUp, req.body.tourUp, req.body.prizeUp, req.body.commUp, req.body.id]
    db.query('UPDATE `rating` SET `orgName` = ?, `tour` = ?, `prize` = ?, `comm` = ? WHERE `rating`.`id` = ?', data, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    });
});

app.post('/addrating', (req, res) => {
    let data = [req.body.id, req.body.nameAdd, req.body.tourAdd, req.body.prizeAdd, req.body.commAdd]
    db.query('INSERT INTO `rating` (`id`, `name`, `tour`, `prize`, `comm`) VALUES (?, ?, ?, ?, ?)', data, (err, results, fields) => {
        !err ? res.json(results) : res.json(err);
    });
})
