package com.mohsinezaidi.greencoins.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mohsinezaidi.greencoins.data.model.User
import com.mohsinezaidi.greencoins.data.repository.UserRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * ViewModel for Home screen
 * Manages user data and coin balance
 */
@HiltViewModel
class HomeViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {

    private val _homeState = MutableStateFlow<HomeState>(HomeState.Loading)
    val homeState: StateFlow<HomeState> = _homeState.asStateFlow()

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    /**
     * Load user data by ID
     */
    fun loadUser(userId: Long) {
        viewModelScope.launch {
            try {
                _homeState.value = HomeState.Loading
                userRepository.getUserByIdFlow(userId).collect { user ->
                    if (user != null) {
                        _currentUser.value = user
                        _homeState.value = HomeState.Success(user)
                    } else {
                        _homeState.value = HomeState.Error("User not found")
                    }
                }
            } catch (e: Exception) {
                _homeState.value = HomeState.Error(e.message ?: "Unknown error occurred")
            }
        }
    }

    /**
     * Refresh user data
     */
    fun refreshUser(userId: Long) {
        loadUser(userId)
    }
}

/**
 * Sealed class representing home screen states
 */
sealed class HomeState {
    object Loading : HomeState()
    data class Success(val user: User) : HomeState()
    data class Error(val message: String) : HomeState()
}