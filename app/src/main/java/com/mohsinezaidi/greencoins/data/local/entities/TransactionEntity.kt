package com.mohsinezaidi.greencoins.data.local.entities

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey
import com.mohsinezaidi.greencoins.data.model.Transaction
import com.mohsinezaidi.greencoins.data.model.TransactionType

/**
 * Room entity for Transaction table
 * Includes foreign key relationship with User
 */
@Entity(
    tableName = "transactions",
    foreignKeys = [
        ForeignKey(
            entity = UserEntity::class,
            parentColumns = ["id"],
            childColumns = ["userId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["userId"])]
)
data class TransactionEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val type: String, // EARN or REDEEM
    val description: String,
    val amount: Int,
    val timestamp: Long = System.currentTimeMillis()
)

/**
 * Extension function to convert TransactionEntity to domain Transaction model
 */
fun TransactionEntity.toTransaction(): Transaction {
    return Transaction(
        id = id,
        userId = userId,
        type = TransactionType.valueOf(type),
        description = description,
        amount = amount,
        timestamp = timestamp
    )
}

/**
 * Extension function to convert domain Transaction model to TransactionEntity
 */
fun Transaction.toEntity(): TransactionEntity {
    return TransactionEntity(
        id = id,
        userId = userId,
        type = type.name,
        description = description,
        amount = amount,
        timestamp = timestamp
    )
}