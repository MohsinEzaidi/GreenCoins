package com.mohsinezaidi.greencoins.data.model

/**
 * Enum representing different types of eco-friendly actions
 * Each action has an associated coin value
 */
enum class ActionType(val displayName: String, val coinsPerItem: Int) {
    RECYCLE_PLASTIC("Recycle Plastic", 5),
    RECYCLE_PAPER("Recycle Paper", 3),
    CLEANUP_EVENT("Clean-up Event", 20);

    companion object {
        fun fromDisplayName(name: String): ActionType? {
            return values().find { it.displayName == name }
        }
    }
}