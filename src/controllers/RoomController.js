const Database = require ("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = ''

        let isRoom = true 
        while(isRoom){
            // Gera o número da sala
        for(var i = 0; i < 6; i++){
            roomId += Math.floor(Math.random()*10).toString()      
        }
        
        // Verificar se esse numero ja existe
    const roomExistIds = await db.all(`SELECT id FROM rooms`)

    isRoom =  roomExistIds.some(roomExistId => roomExistId === roomId )
    if (! isRoom){
        // Ele insere a sala no banco
    await db.run(`INSERT INTO rooms (
        id,
        pass
    ) VALUES (
        ${parseInt(roomId)},
        ${pass}
    )`)
        }
    }  
    
    await db.close()

        res.redirect(`/room/${roomId}`)
    },

     async open(req,res){
        const db = await Database()
         const roomId = req.params.room
         const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
         const questionRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

         res.render("room", {roomId : roomId, questions: questions, questionRead: questionRead})

     } ,
     
     enter(req, res){
        const roomId =  req.body.roomId

        res.redirect(`/room/${roomId}`)
     }
}