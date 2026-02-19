package com.mohsinezaidi.greencoins.domain.usecase

import com.mohsinezaidi.greencoins.data.model.ActionType
import com.mohsinezaidi.greencoins.data.model.Transaction
import com.mohsinezaidi.greencoins.data.model.TransactionType
import com.mohsinezaidi.greencoins.data.repository.TransactionRepository
import com.mohsinezaidi.greencoins.data.repository.UserRepository
import javax.inject.Inject

/**
 * Use case for adding an eco-friendly action and earning coins
 * Encapsulates business logic for coin calculation and transaction creation
 */
class AddActionUseCase @Inject constructor(
    private val userRepository: UserRepository,
    private val transactionRepository: TransactionRepository
) {

    /**
     * Execute the use case
     * @param userId ID of the user performing the action
     * @param actionType Type of action (Recycle Plastic, Paper, or Clean-up Event)
     * @param quantity Quantity of items (1 for Clean-up Event)
     * @return Result with coins earned or error message
     */
    suspend operator fun invoke(
        userId: Long,
        actionType: ActionType,
        quantity: Int
    ): Result<Int> {
        return try {
            // Validate quantity
            if (quantity <= 0) {
                return Result.failure(IllegalArgumentException("Quantity must be greater than 0"))
            }

            // Calculate coins earned
            val coinsEarned = if (actionType == ActionType.CLEANUP_EVENT) {
                actionType.coinsPerItem // Fixed coins for event
            } else {
                actionType.coinsPerItem * quantity
            }

            // Get current user
            val user = userRepository.getUserById(userId)
                ?: return Result.failure(IllegalStateException("User not found"))

            // Update user's coin balance
            val newBalance = user.coinBalance + coinsEarned
            userRepository.updateCoinBalance(userId, newBalance)

            // Create transaction record
            val transaction = Transaction(
                userId = userId,
                type = TransactionType.EARN,
                description = "${actionType.displayName} x$quantity",
                amount = coinsEarned,
                timestamp = System.currentTimeMillis()
            )
            transactionRepository.addTransaction(transaction)

            Result.success(coinsEarned)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}