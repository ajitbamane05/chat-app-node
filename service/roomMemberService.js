const RoomMemberAccessor = require('../accessor/roomMemberAccessor')


function getMemberships(userId) {
    return RoomMemberAccessor.getMemberships(userId)
}

function deleteMemberships(userId) {
    return RoomMemberAccessor.deleteMemberships(userId)
}

function createRoomMembers(memberIds, roomId) {
    return RoomMemberAccessor.createRoomMembers(memberIds, roomId)
}

function createRoomAdmin(userId, roomId) {
    return RoomMemberAccessor.createRoomAdmin(userId, roomId)
}

function deleteRoomMembers(roomId) {
    return RoomMemberAccessor.deleteRoomMembers(roomId)
}


module.exports = {
    getMemberships, deleteMemberships, createRoomMembers, createRoomAdmin, deleteRoomMembers
}