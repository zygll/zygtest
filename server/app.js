/* eslint-disable no-console */
const express = require('express')
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const FileType = require('file-type')
const glob = require('glob')

const UPLOAD_DIR = path.resolve(__dirname, 'uploads')
const TEMP_DIR = path.resolve(__dirname, 'tmp')

app.use('/public', express.static('uploads'))

fs.ensureDirSync(UPLOAD_DIR)
fs.ensureDirSync(TEMP_DIR)

app.post('/upload', bodyParser.raw({ limit: '10mb' }), function (req, res) {
    const chunk = req.body
    const { identifier, index } = req.query
    console.log(`identifier ${identifier}, receive chunk index-${index}`)
    const chunkDir = path.resolve(TEMP_DIR, identifier)
    fs.ensureDirSync(chunkDir)
    fs.writeFileSync(`${chunkDir}/${identifier}-${index}`, chunk)
    res.send(
        JSON.stringify({
            tempFilePath: `${identifier}-${index}`
        })
    )
})





const mergeFiles = (chunkFilePaths, writeStream) => {
    return new Promise(resolve => {
        const pipeStream = () => {
            if (!chunkFilePaths.length) {
                writeStream.end('done')
                resolve()
                return
            }
            const filePath = chunkFilePaths.shift()
            const readSteam = fs.createReadStream(filePath)
            readSteam.pipe(writeStream, { end: false })
            readSteam.on('end', function () {
                fs.removeSync(filePath)
                pipeStream()
            })
        }
        pipeStream()
    })
}

app.get('/merge', async function (req, res) {
    const { identifier } = req.query
    console.log(`identifier ${identifier}, merge`)
    const chunkDir = path.resolve(TEMP_DIR, identifier)
    const chunkFiles = fs.readdirSync(chunkDir)
    chunkFiles.sort((a, b) => a.split('-')[1] - b.split('-')[1])
    const chunkFilePaths = chunkFiles.map(fileName => path.resolve(chunkDir, fileName))

    const targetFilePath = path.resolve(UPLOAD_DIR, identifier)
    const writeStream = fs.createWriteStream(targetFilePath)
    await mergeFiles(chunkFilePaths, writeStream)
    const { ext } = await FileType.fromFile(targetFilePath)
    fs.renameSync(targetFilePath, `${targetFilePath}.${ext}`)
    fs.removeSync(chunkDir)

    res.send(
        JSON.stringify({
            url: `${targetFilePath}.${ext}`
        })
    )
})

app.get('/list', async function (req, res) {
    const filePath = path.resolve(UPLOAD_DIR);
    // 收集所有的文件路径
    const arr = [];
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) return console.error('Error:(spec)', err)
        console.log(files, 'files');
        files.forEach((filename) => {
            //获取当前文件的绝对路径
            const filedir = path.join(filePath, filename);
            console.log(filedir, 'filedir');

            arr.push(filedir)
            // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
            // fs.stat(filedir, (eror, stats) => {
            //     console.log(stats, 'stats');
            //     if (eror) return console.error('Error:(spec)', err);
            //     // 是否是文件
            //     const isFile = stats.isFile();
            //     if (isFile) {

            //         // console.log(filedir, 'filedir')
            //         // 将所有的文件路径放在一个数组中
            //         arr.push(filedir)

            //         // 这块我自己处理了多余的绝对路径，第一个 replace 是替换掉那个路径，第二个是所有满足\\的直接替换掉
            //         // arr.push(filedir.replace('D:\\lh\\study\\jiaoshoujia\\vue\\generator-lh-vue\\generators\\app\\', '').replace(/\\/img, '/'))
            //         // 最后打印的就是完整的文件路径了

            //     }
            // })
        });
        console.log(arr, 'arr');
        res.send(
            JSON.stringify({
                arr
            })
        )
    });




})


app.get('/verify', function (req, res) {
    const { identifier } = req.query
    console.log(`identifier ${identifier}, verify`)
    const matchs = glob.sync(`${identifier}.*`, { cwd: UPLOAD_DIR })
    if (matchs.length) {
        res.send(
            JSON.stringify({
                needUpload: false,
                url: path.resolve(UPLOAD_DIR, matchs[0])
            })
        )
    } else {
        const chunkDir = path.resolve(TEMP_DIR, identifier)
        fs.ensureDirSync(chunkDir)
        const chunkFiles = fs.readdirSync(chunkDir)
        res.send(
            JSON.stringify({
                needUpload: true,
                uploadedChunks: chunkFiles.map(fileName => fileName.split('-')[1] * 1)
            })
        )
    }
})

const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('应用实例，访问地址为 http://%s:%s', host, port)
})