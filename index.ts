import { PrismaClient, User } from '@prisma/client'
import express from 'express'
import { StandardResponse } from './utils/responses/responses.js'
import user from './router/user.js'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use('/users', user)

app.get('/', (req, res) => {
    res.json( StandardResponse() )
})



app.listen(3000, () => {
    console.log('App running at port 3000')
})