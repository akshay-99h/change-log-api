// import exp from "constants";
import prisma from "../db"

export const getOneUpdate = async (req, res) => {
    try {
        const update = await prisma.update.findUnique({
            where: {
                id: req.params.id,
            }
        })

        res.json({ data: update });
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while getting update.' })
    }
}

export const getUpdates = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id,
            },
            include: {
                updates: true
            }
        })
        const updates = products.reduce((allUpdates, products) => {
            return [...allUpdates, ...products.updates]
        }, [])

        res.json({ data: updates })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while getting updates.' })
    }
}

export const createUpdate = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.body.productId,
            }
        })

        if (!product) {
            res.json({ data: `A product with ID:${req.body.productId} does not exist. Please check if the ID you entered is correct and try again.` })
        }

        const update = await prisma.update.create({
            data: {
                title: req.body.title,
                body: req.body.body,
                product: { connect: { id: product.id } }
            }
        })

        res.json({ data: update })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while creating update.' })
    }
}

export const updateUpdate = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.body.id,
            },
            include: {
                updates: true
            }
        })
        const updates = products.reduce((allUpdates, products) => {
            return [...allUpdates, ...products.updates]
        }, [])

        const match = updates.find(update => update.id === req.params.id);

        if (!match) {
            res.json({ message: "nope" })
        }
        const update = await prisma.update.update({
            where: {
                id: req.params.id,
            },
            data: req.body
        })

        res.json({ data: update })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while updating update.' })
    }
}

export const deleteUpdate = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.body.id,
            },
            include: {
                updates: true
            }
        })
        const updates = products.reduce((allUpdates, products) => {
            return [...allUpdates, ...products.updates]
        }, [])

        const match = updates.find(update => update.id === req.params.id);

        if (!match) {
            res.json({ message: "nope" })
        }

        const deleted = await prisma.update.delete({
            where: {
                id: req.params.id,
            }
        })

        res.json({ data: deleted });
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while deleting update.' })
    }
}