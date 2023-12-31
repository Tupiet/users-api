import { Prisma, PrismaClient, User } from "@prisma/client";
import express from "express";
import { ZodError, z } from 'zod'
import { StandardResponse } from "../utils/responses/responses.js";
import { PrismaClientValidationError } from "@prisma/client/runtime/library.js";

const router = express.Router()
const prisma = new PrismaClient()

const User = z.object({
    firstname: z.string(),
    lastname: z.string(),
    city: z.string(),
    age: z.number()
})

/**
 * GET
 * Returns all the users, only with the id, firstname and lastname.
 */
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({ 
        select: { id: true, firstname: true, lastname: true } 
    })
    res.json(users)
})

/**
 * GET
 * Returns the user with the specified id, with all the data.
 */
router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const scheme = z.coerce.number()
        scheme.parse(id)
        const user = await prisma.user.findFirst({ where: { id } })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

/**
 * POST
 * Creates an user with the provided data.
 */
router.post('/', async (req, res) => {
    const body: Prisma.UserCreateInput = req.body

    try {
        User.parse(body)
        // Create the user in the DB
        const user = await prisma.user.create({ data: body })
        // Send a message telling that everything is OK
        res.json( StandardResponse(user) )
    } catch (error) {
        if (error instanceof ZodError) {
            res.json(error)
        }
        else {
            res.json({ ok: false, error: 'Unknown error' })
        }
    }
})

/**
 * PUT
 * Updates the data of the user with the specified id. 
 * You can send all the data, or only the needed.
 */
router.put('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        z.coerce.number().parse(id)

        const body: Prisma.UserUpdateInput = req.body
        const user = await prisma.user.update({ where: { id }, data: body })
        res.json( StandardResponse(user) )
    } catch (error) {
        if (error instanceof PrismaClientValidationError) {
            res.json({ ok: false, error: 'Incorrect data' })
        } else if (error instanceof ZodError) {
            res.json(error)
        } else {
            res.json(error)
        }
    }
})

/**
 * DELETE
 * Delete the user with the specified id.
 */
router.delete('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        z.coerce.number().parse(id)

        const user = await prisma.user.delete({ where: { id } })
        res.json( StandardResponse(user) )
    } catch (error) {
        if (error instanceof PrismaClientValidationError) {
            res.json({ ok: false, error: 'Incorrect data' })
        } else if (error instanceof ZodError) {
            res.json(error)
        } else {
            res.json(error)
        }
    }
})

export default router
