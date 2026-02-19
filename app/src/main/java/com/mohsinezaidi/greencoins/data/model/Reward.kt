package com.mohsinezaidi.greencoins.data.model

/**
 * Data class representing a reward that can be redeemed
 */
data class Reward(
    val id: Int,
    val name: String,
    val description: String,
    val coinCost: Int,
    val icon: String = "☕" // Emoji as simple icon for MVP
)

/**
 * Predefined list of available rewards
 */
object RewardsList {
    val rewards = listOf(
        Reward(
            id = 1,
            name = "Free Coffee",
            description = "Redeem a free coffee at participating cafes",
            coinCost = 50,
            icon = "☕"
        ),
        Reward(
            id = 2,
            name = "10% Discount",
            description = "Get 10% off on your next eco-product purchase",
            coinCost = 30,
            icon = "🎫"
        ),
        Reward(
            id = 3,
            name = "Mobile Recharge",
            description = "₹100 mobile recharge voucher",
            coinCost = 100,
            icon = "📱"
        )
    )
}