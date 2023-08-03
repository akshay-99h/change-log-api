import prisma from "../db";

export const getAllUpdatePoints = async (req, res) => {
    try {
        const updatePoint = await prisma.updatePoint.findMany();
        res.json(updatePoint);
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while getting all update points.' })
    }
}

export const getOneUpdatePoint = async (req, res) => {
    const { id } = req.params;
    try {
        const updatePoint = await prisma.updatePoint.findUnique({ where: { id } });
        res.json(updatePoint);
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while getting one update point.' })
    }
}

export const updateUpdatePoint = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatePoint = await prisma.updatePoint.update({
            where: { id },
            data: { name, description }
        });
        res.json(updatePoint);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ message: "Error while updating all update points" });
    }
}

export const updateAllUpdatePoints = async (req, res) => {
    try {
        const update = await prisma.update.findUnique({
            where: {
                id: req.body.updateId,
            }
        })

        if (!update) {
            res.json({ data: `An update with ID:${req.body.updateId} does not exist. Please check if the ID you entered is correct and try again.` })
        }

        const updatePoint = await prisma.updatePoint.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                updatedAt: new Date(),
                update: { connect: { id: update.id } }
            }
        });
        return res.sendStatus(201).end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ message: "Error while updating all update points" });
    }
}

export const deleteUpdatePoint = async (req, res) => {
    const { id } = req.params;
    try {
        const updatePoint = await prisma.updatePoint.delete({ where: { id } });
        res.json(updatePoint);
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Error while deleting update point.' })
    }
}