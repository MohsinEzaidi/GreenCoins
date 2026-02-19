package com.mohsinezaidi.greencoins.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mohsinezaidi.greencoins.data.model.Transaction
import com.mohsinezaidi.greencoins.data.repository.TransactionRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * ViewModel for Transaction History screen
 * Manages display of user transactions
 */
@HiltViewModel
class HistoryViewModel @Inject constructor(
    private val transactionRepository: TransactionRepository
) : ViewModel() {

    private val _historyState = MutableStateFlow<HistoryState>(HistoryState.Loading)
    val historyState: StateFlow<HistoryState> = _historyState.asStateFlow()

    private val _transactions = MutableStateFlow<List<Transaction>>(emptyList())
    val transactions: StateFlow<List<Transaction>> = _transactions.asStateFlow()

    /**
     * Load transaction history for a user
     */
    fun loadTransactions(userId: Long) {
        viewModelScope.launch {
            try {
                _historyState.value = HistoryState.Loading
                transactionRepository.getTransactionsByUserId(userId).collect { transactions ->
                    _transactions.value = transactions
                    _historyState.value = if (transactions.isEmpty()) {
                        HistoryState.Empty
                    } else {
                        HistoryState.Success(transactions)
                    }
                }
            } catch (e: Exception) {
                _historyState.value = HistoryState.Error(e.message ?: "Unknown error occurred")
            }
        }
    }
}

/**
 * Sealed class representing history screen states
 */
sealed class HistoryState {
    object Loading : HistoryState()
    object Empty : HistoryState()
    data class Success(val transactions: List<Transaction>) : HistoryState()
    data class Error(val message: String) : HistoryState()
}