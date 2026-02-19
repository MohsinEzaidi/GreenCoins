package com.mohsinezaidi.greencoins.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mohsinezaidi.greencoins.data.model.Reward
import com.mohsinezaidi.greencoins.data.model.RewardsList
import com.mohsinezaidi.greencoins.data.model.User
import com.mohsinezaidi.greencoins.data.repository.UserRepository
import com.mohsinezaidi.greencoins.domain.usecase.RedeemRewardUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * ViewModel for Rewards screen
 * Manages reward redemption and user balance
 */
@HiltViewModel
class RewardsViewModel @Inject constructor(
    private val redeemRewardUseCase: RedeemRewardUseCase,
    private val userRepository: UserRepository
) : ViewModel() {

    private val _rewardsState = MutableStateFlow<RewardsState>(RewardsState.Idle)
    val rewardsState: StateFlow<RewardsState> = _rewardsState.asStateFlow()

    private val _rewards = MutableStateFlow(RewardsList.rewards)
    val rewards: StateFlow<List<Reward>> = _rewards.asStateFlow()

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    /**
     * Load user data
     */
    fun loadUser(userId: Long) {
        viewModelScope.launch {
            try {
                userRepository.getUserByIdFlow(userId).collect { user ->
                    _currentUser.value = user
                }
            } catch (e: Exception) {
                _rewardsState.value = RewardsState.Error(e.message ?: "Unknown error")
            }
        }
    }

    /**
     * Redeem a reward
     */
    fun redeemReward(userId: Long, reward: Reward) {
        viewModelScope.launch {
            _rewardsState.value = RewardsState.Loading
            try {
                val result = redeemRewardUseCase(userId, reward)

                result.fold(
                    onSuccess = { message ->
                        _rewardsState.value = RewardsState.Success(message)
                    },
                    onFailure = { error ->
                        _rewardsState.value = RewardsState.Error(error.message ?: "Unknown error")
                    }
                )
            } catch (e: Exception) {
                _rewardsState.value = RewardsState.Error(e.message ?: "Unknown error occurred")
            }
        }
    }

    /**
     * Reset rewards state
     */
    fun resetRewardsState() {
        _rewardsState.value = RewardsState.Idle
    }

    /**
     * Check if user can afford a reward
     */
    fun canAffordReward(reward: Reward): Boolean {
        return (_currentUser.value?.coinBalance ?: 0) >= reward.coinCost
    }
}

/**
 * Sealed class representing rewards screen states
 */
sealed class RewardsState {
    object Idle : RewardsState()
    object Loading : RewardsState()
    data class Success(val message: String) : RewardsState()
    data class Error(val message: String) : RewardsState()
}