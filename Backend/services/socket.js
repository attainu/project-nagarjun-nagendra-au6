//var Group = require("../models/group");
var Chat = require("../models/chat");
var User = require("../models/user");
var fs = require('fs');
var path = require('path');
// this is for socket connect.
module.exports = async (server) => {
    try {
        // there we connect socket.
        var io = require('socket.io').listen(server);
        io.on('connection', (socket) => {
            socket.on('join', (groupId) => {
                socket.join(groupId);
            });
            socket.on('user-join', async (userId) => {
                try {
                    const socketId = socket.id;
                    socket.broadcast.emit("user-join", { userId, socketId });
                    await User.updateOne({ _id: userId }, { socketId });
                } catch (error) {
                    console.log(error);
                }
            })
            // this is for socket for single chat .
            socket.on('one-2-one', async (data) => {
                try {
                    data.chatId = data.sender > data.receiver ? data.sender + '-' + data.receiver : data.receiver + '-' + data.sender;
                    var newMessage = await new Chat(data).save();
                    socket.emit('one-2-one', newMessage);
                    io.to(data.socketId).emit('one-2-one', newMessage);
                } catch (error) {
                    console.log(error);
                }
            })
            // this is for file upload single chat.
            socket.on('single-fileupload', async (data) => {
                console.log(data)
                try {
                    data.chatId = data.sender > data.receiver ? data.sender + '-' + data.receiver : data.receiver + '-' + data.sender;
                    const fileNameArr = data.fileName.split('.');
                    const fileType = fileNameArr[fileNameArr.length - 1];
                    const fileName = Date.now().toString() + '.' + fileType;
                    fs.writeFileSync(path.join(__dirname, '../', 'uploads', fileName), data.file)
                    data.file = fileName;
                    var newMessage = await new Chat(data).save();
                    socket.emit('one-2-one', newMessage);
                    io.to(data.socketId).emit('one-2-one', newMessage);
                } catch (error) {
                    console.log(error)

                }
            })
            // this is for connect for group chat.
            socket.on('message', async (data) => {
                var newMessage = await new Chat(data).save();
                io.to(data.groupId).emit('message', newMessage);
            })
            // this is for file upload file in group chat.
            socket.on('fileupload', async (data) => {
                const fileNameArr = data.fileName.split('.');
                const fileType = fileNameArr[fileNameArr.length - 1];
                const fileName = Date.now().toString() + '.' + fileType;
                fs.writeFileSync(path.join(__dirname, '../', 'uploads', fileName), data.file)
                data.file = fileName;
                var newMessage = await new Chat(data).save();
                io.to(data.groupId).emit('message', newMessage);
            })
        })
    } catch (error) {
        console.log('socket error', error);
    }



}