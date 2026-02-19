package com.mohsinezaidi.greencoins.data.repository

import com.mohsinezaidi.greencoins.data.local.dao.TransactionDao
import com.mohsinezaidi.greencoins.data.local.entities.toEntity
import com.mohsinezaidi.greencoins.data.local.entities.toTransaction
import com.mohsinezaidi.greencoins.data.model.Transaction
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Repository for managing transaction data
 * Acts as a single source of truth for transaction-related operations
 */
@Singleton
class TransactionRepository @Inject constructor(
    private val transactionDao: TransactionDao
) {

    /**
     * Add a new transaction
     */
    suspend fun addTransaction(transaction: Transaction): Long {
        return transactionDao.insertTransaction(transaction.toEntity())
    }

    /**
     * Get all transactions for a user as Flow
     */
    fun getTransactionsByUserId(userId: Long): Flow<List<Transaction>> {
        return transactionDao.getTransactionsByUserId(userId)
            .map { entities -> entities.map { it.toTransaction() } }
    }

    /**
     * Get all transactions for a user (synchronous)
     */
    suspend fun getTransactionsByUserIdSync(userId: Long): List<Transaction> {
        return transactionDao.getTransactionsByUserIdSync(userId)
            .map { it.toTransaction() }
    }

    /**
     * Get transaction by ID
     */
    suspend fun getTransactionById(transactionId: Long): Transaction? {
        return transactionDao.getTransactionById(transactionId)?.toTransaction()
    }

    /**
     * Delete a transaction
     */
    suspend fun deleteTransaction(transactionId: Long) {
        transactionDao.deleteTransaction(transactionId)
    }
}