import { join } from "path"
import prisma from "../db"

// get all products
export const getProducts = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                products: true
            }
        })

        res.json({ data: user.products })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while getting products.' })
    }
}

// get a single product
export const getOneProduct = async (req, res) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                id: req.params.id,
                belongsToId: req.user.id,
            }
        })

        res.json({ data: [product] })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while getting product.' })
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });

        res.json({ data: product });
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while creating product.' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updated = await prisma.product.update({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id,
                }
            },
            data: {
                name: req.body.name,
            }
        });

        res.json({ data: updated });
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while updating product.' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id,
                }
            }
        });

        res.json({ data: deleted });
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while deleting product.' })
    }
}