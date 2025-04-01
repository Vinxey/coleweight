import constants from "../util/constants"
register('chat', () => {
    constants.data.lastTruffle = Date.now
    constants.data.save()
}).setCriteria('&r&7You consumed a &r&6Refined Dark Cacao Truffle &r&7and gained &r&6+30&r&6☘ Global Fortune &r&7for &r&a60m&r&7!&r')