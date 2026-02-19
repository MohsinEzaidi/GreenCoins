package com.mohsinezaidi.greencoins.data.model

/**
 * Domain model representing a transaction
 */
data class Transaction(
    val id: Long = 0,
    val userId: Long,
    val type: TransactionType,
    val description: String,
    val amount: Int,
    val timestamp: Long = System.currentTimeMillis()
)

enum class TransactionType {
    EARN,
    REDEEM
}