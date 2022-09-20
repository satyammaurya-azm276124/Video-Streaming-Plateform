const fs = require('fs');
const path = require('path');
const { Shows } = require('../models/shows');
const { VIDEO_DIR } = require('../constants');


async function listAPI(req, res) {
    const shows = await Shows.find();
    res.json({"shows": shows}).end();
}


async function detailAPI(req, res) {
    const show = await Shows.findOne({_id: req.params.id});
    res.json({"show": show}).end(); 
}


// sends a response stream for video
async function streamAPI(req, res) {
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const range = req.headers.range; //206 - Partial content sent by server
    console.log(range);
    if(!range) {
        res.status(400).send('Requires Range Header');
    }
    const show = await Shows.findOne({_id: req.params.id});
    const videPath = path.join(VIDEO_DIR, show.path);
    const videoSize = fs.statSync(videPath).size;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videPath, { start, end }); //Open the file and read the data present in it
    videoStream.pipe(res); // read the outputstream and connect it with the inputstream
}


module.exports = {
    listAPI,
    detailAPI,
    streamAPI,
}
