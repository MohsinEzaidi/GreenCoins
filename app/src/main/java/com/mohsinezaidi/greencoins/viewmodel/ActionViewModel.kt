package com.mohsinezaidi.greencoins.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mohsinezaidi.greencoins.data.model.ActionType
import com.mohsinezaidi.greencoins.domain.usecase.AddActionUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * ViewModel for Add Action screen
 * Handles eco-friendly action submission and coin earning
 */
@HiltViewModel
class ActionViewModel @Inject constructor(
    private val addActionUseCase: AddActionUseCase
) : ViewModel() {

    private val _actionState = MutableStateFlow<ActionState>(ActionState.Idle)
    val actionState: StateFlow<ActionState> = _actionState.asStateFlow()

    private val _selectedActionType = MutableStateFlow(ActionType.RECYCLE_PLASTIC)
    val selectedActionType: StateFlow<ActionType> = _selectedActionType.asStateFlow()

    private val _quantity = MutableStateFlow("1")
    val quantity: StateFlow<String> = _quantity.asStateFlow()

    /**
     * Update selected action type
     */
    fun updateActionType(actionType: ActionType) {
        _selectedActionType.value = actionType
        // For Clean-up Event, quantity is always 1
        if (actionType == ActionType.CLEANUP_EVENT) {
            _quantity.value = "1"
        }
    }

    /**
     * Update quantity
     */
    fun updateQuantity(quantity: String) {
        _quantity.value = quantity
    }

    /**
     * Submit action and earn coins
     */
    fun submitAction(userId: Long) {
        viewModelScope.launch {
            _actionState.value = ActionState.Loading
            try {
                val quantityInt = _quantity.value.toIntOrNull()
                if (quantityInt == null || quantityInt <= 0) {
                    _actionState.value = ActionState.Error("Please enter a valid quantity")
                    return@launch
                }

                val result = addActionUseCase(
                    userId = userId,
                    actionType = _selectedActionType.value,
                    quantity = quantityInt
                )

                result.fold(
                    onSuccess = { coinsEarned ->
                        _actionState.value = ActionState.Success(coinsEarned)
                    },
                    onFailure = { error ->
                        _actionState.value = ActionState.Error(error.message ?: "Unknown error")
                    }
                )
            } catch (e: Exception) {
                _actionState.value = ActionState.Error(e.message ?: "Unknown error occurred")
            }
        }
    }

    /**
     * Reset action state
     */
    fun resetActionState() {
        _actionState.value = ActionState.Idle
        _quantity.value = "1"
    }
}

/**
 * Sealed class representing action submission states
 */
sealed class ActionState {
    object Idle : ActionState()
    object Loading : ActionState()
    data class Success(val coinsEarned: Int) : ActionState()
    data class Error(val message: String) : ActionState()
}