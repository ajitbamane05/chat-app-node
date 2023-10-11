const RoomMemberService = require('../service/roomMemberService')

async function getMemberships(req, res) {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({ message: "User Id not provided" })
    }
    try {
        const memberships = await RoomMemberService.getMemberships(userId)
        return res.status(200).json(memberships)
    }
    catch (error) {
        return res.status(400).json({ message: "Error while retriving membership", error: error.message })
    }
}

async function deleteMemberships(req, res) {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({ message: "User Id not provided" })
    }
    try {
        const membershipsDeleted = RoomMemberService.deleteMemberships(userId)
        return res.status(200).json({message:"Memberships Deleted Successfully"})
    }
    catch (error) {
        return res.status(400).json({ message: "Error while deleting memberships", error: error.message })
    }
}

module.exports = {
    getMemberships,deleteMemberships
}