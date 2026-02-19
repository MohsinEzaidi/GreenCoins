package com.mohsinezaidi.greencoins.domain.usecase

import com.mohsinezaidi.greencoins.data.model.Reward
import com.mohsinezaidi.greencoins.data.model.Transaction
import com.mohsinezaidi.greencoins.data.model.TransactionType
import com.mohsinezaidi.greencoins.data.repository.TransactionRepository
import com.mohsinezaidi.greencoins.data.repository.UserRepository
import javax.inject.Inject

/**
 * Use case for redeeming a reward
 * Encapsulates business logic for checking balance and deducting coins
 */
class RedeemRewardUseCase @Inject constructor(
    private val userRepository: UserRepository,
    private val transactionRepository: TransactionRepository
) {

    /**
     * Execute the use case
     * @param userId ID of the user redeeming the reward
     * @param reward Reward to be redeemed
     * @return Result with success or error message
     */
    suspend operator fun invoke(
        userId: Long,
        reward: Reward
    ): Result<String> {
        return try {
            // Get current user
            val user = userRepository.getUserById(userId)
                ?: return Result.failure(IllegalStateException("User not found"))

            // Check if user has enough coins
            if (user.coinBalance < reward.coinCost) {
                return Result.failure(IllegalStateException("Insufficient coins"))
            }

            // Deduct coins
            val newBalance = user.coinBalance - reward.coinCost
            userRepository.updateCoinBalance(userId, newBalance)

            // Create transaction record
            val transaction = Transaction(
                userId = userId,
                type = TransactionType.REDEEM,
                description = "Redeemed: ${reward.name}",
                amount = reward.coinCost,
                timestamp = System.currentTimeMillis()
            )
            transactionRepository.addTransaction(transaction)

            Result.success("Successfully redeemed ${reward.name}")
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}